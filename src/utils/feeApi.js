import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const MODES_REQUIRING_TXN = new Set(['upi', 'card', 'cheque']);

/** Normalize term-pending-fees payload into payable terms + totals. */
export const normalizeTermPendingFees = (raw = {}) => {
  const payableTerms = Array.isArray(raw.payable_terms)
    ? raw.payable_terms
    : Array.isArray(raw.terms)
      ? raw.terms
      : Array.isArray(raw.fee_terms)
        ? raw.fee_terms
        : [];

  const normalizedPayable = payableTerms
    .map((term) => {
      const pending = Number(term.pending_amount) || 0;
      const termNumber = term.term ?? term.turn;
      const academicYearName = term.academic_year_name || term.academic_year?.name || '';
      const label =
        term.label ||
        `${academicYearName ? `${academicYearName} — ` : ''}Term ${termNumber} (₹${pending.toFixed(2)} pending)`;

      return {
        fee_term_id: term.fee_term_id || term.id || null,
        academic_year_id:
          term.academic_year_id ||
          term.academic_year?.id ||
          null,
        academic_year_name: academicYearName,
        term: termNumber,
        pending_amount: pending,
        amount: Number(term.amount) || 0,
        paid_amount: Number(term.paid_amount) || 0,
        label,
      };
    })
    .filter((term) => term.pending_amount > 0.01);

  const overallPending =
    raw.overall_pending_fees ??
    raw.overall_pending ??
    normalizedPayable.reduce((sum, t) => sum + t.pending_amount, 0);

  return {
    payable_terms: normalizedPayable,
    academic_years: Array.isArray(raw.academic_years) ? raw.academic_years : [],
    overall_pending_fees: Number(overallPending) || 0,
    overall_paid_fees: Number(raw.overall_paid_fees ?? raw.overall_paid ?? 0) || 0,
    overall_committed_fees:
      Number(raw.overall_committed_fees ?? raw.overall_committed ?? 0) || 0,
    // Legacy shape used by student details tables
    terms: Array.isArray(raw.terms)
      ? raw.terms
      : Array.isArray(raw.academic_years)
        ? raw.academic_years.flatMap((year) =>
            (year.terms || []).map((term) => ({
              ...term,
              academic_year_name: year.name || year.academic_year_name,
              academic_year_id: year.id || year.academic_year_id,
            }))
          )
        : normalizedPayable,
    raw,
  };
};

export const fetchTermPendingFees = async (studentId) => {
  const response = await axios.get(
    `${API_BASE_URL}/masters/students/${studentId}/term-pending-fees/`,
    { headers: authHeaders() }
  );
  const data = response.data?.data ?? response.data ?? {};
  return normalizeTermPendingFees(data);
};

/** Build POST /masters/fees/ payload from selected payable term. Never invent year/turn. */
export const buildFeePaymentPayload = ({
  studentId,
  amount,
  paymentDate,
  paymentMode,
  transactionNumber,
  bankAccountId,
  payableTerm,
}) => {
  if (!payableTerm?.fee_term_id) {
    throw new Error('fee_term_id is required from the selected payable term');
  }
  if (!payableTerm?.academic_year_id) {
    throw new Error('academic_year_id is required from the selected payable term');
  }
  if (payableTerm.term === undefined || payableTerm.term === null || payableTerm.term === '') {
    throw new Error('turn/term is required from the selected payable term');
  }

  const payload = {
    student: studentId,
    amount: parseFloat(amount),
    payment_date: paymentDate,
    turn: parseInt(payableTerm.term, 10),
    fee_term_id: payableTerm.fee_term_id,
    academic_year_id: payableTerm.academic_year_id,
    payment_mode: paymentMode,
  };

  if (MODES_REQUIRING_TXN.has(paymentMode)) {
    payload.transaction_number = transactionNumber;
  }

  if (paymentMode !== 'cash' && bankAccountId) {
    payload.bank_account = bankAccountId;
  }

  return payload;
};

export const createFeePayment = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/masters/fees/`, payload, {
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });
  return response.data?.data ?? response.data;
};

export const updateFeePayment = async (feeId, payload) => {
  const response = await axios.patch(`${API_BASE_URL}/masters/fees/${feeId}/`, payload, {
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });
  return response.data?.data ?? response.data;
};

export const deleteFeePayment = async (feeId) => {
  const response = await axios.delete(`${API_BASE_URL}/masters/fees/${feeId}/`, {
    headers: authHeaders(),
  });
  return response.data;
};

/**
 * Build query for GET /masters/fees-collection/payments/
 * period pills → period=; date picker → date=; ranges → start_date+end_date
 */
export const buildPaymentsQueryParams = ({
  period,
  date,
  startDate,
  endDate,
  academicYearId,
  paymentMode,
  studentId,
  batchId,
  batch,
  classNameId,
  q,
  admissionNo,
  paymentDate,
  page = 1,
  pageSize = 50,
} = {}) => {
  const params = {};

  if (period) params.period = period;
  if (date) params.date = date;
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;
  if (academicYearId) params.academic_year_id = academicYearId;
  if (paymentMode) params.payment_mode = paymentMode;
  if (studentId) params.student_id = studentId;
  if (batchId) params.batch_id = batchId;
  if (batch) params.batch = batch;
  if (classNameId) params.class_name_id = classNameId;
  if (q) params.q = q;
  if (admissionNo) params.admission_no = admissionNo;
  if (paymentDate) params.payment_date = paymentDate;
  if (page) params.page = page;
  if (pageSize) params.page_size = pageSize;

  return params;
};

export const fetchFeesCollectionPayments = async (query = {}) => {
  const params = buildPaymentsQueryParams(query);
  const response = await axios.get(`${API_BASE_URL}/masters/fees-collection/payments/`, {
    headers: authHeaders(),
    params,
  });

  const envelope = response.data?.data ?? response.data ?? {};
  return {
    summary: envelope.summary || null,
    count: envelope.count ?? (Array.isArray(envelope.results) ? envelope.results.length : 0),
    results: Array.isArray(envelope.results)
      ? envelope.results
      : Array.isArray(envelope)
        ? envelope
        : [],
    raw: response.data,
  };
};

export const downloadFeesCollectionExcel = async (query = {}) => {
  const params = { ...buildPaymentsQueryParams(query), export: 'excel' };
  const response = await axios.get(`${API_BASE_URL}/masters/fees-collection/payments/`, {
    headers: authHeaders(),
    params,
    responseType: 'blob',
  });

  const contentType = response.headers['content-type'] || '';
  if (contentType.includes('application/json')) {
    const text = await response.data.text();
    const parsed = JSON.parse(text);
    throw new Error(parsed.message || 'Failed to export excel');
  }

  return response.data;
};

export const paymentModeRequiresTxn = (mode) => MODES_REQUIRING_TXN.has(mode);

export const getOverallPendingFromTerms = (pendingData) => {
  if (!pendingData) return 0;
  if (pendingData.overall_pending_fees != null) {
    return Number(pendingData.overall_pending_fees) || 0;
  }
  const terms = pendingData.payable_terms || pendingData.terms || [];
  return terms.reduce((sum, term) => sum + (Number(term.pending_amount) || 0), 0);
};

const roundMoney = (value) => Math.round((Number(value) + Number.EPSILON) * 100) / 100;

/** Payable terms from the selected term onward (inclusive). */
export const getPayableTermsFrom = (payableTerms = [], startFeeTermId) => {
  if (!startFeeTermId) return [];
  const startIdx = payableTerms.findIndex(
    (term) => String(term.fee_term_id) === String(startFeeTermId)
  );
  if (startIdx < 0) return [];
  return payableTerms.slice(startIdx);
};

/** Max amount that can be paid starting from the selected term (waterfall). */
export const getMaxPayableFromTerm = (payableTerms = [], startFeeTermId) => {
  return roundMoney(
    getPayableTermsFrom(payableTerms, startFeeTermId).reduce(
      (sum, term) => sum + (Number(term.pending_amount) || 0),
      0
    )
  );
};

/**
 * Waterfall / advance allocation: fill the selected term first, then push
 * remainder into later payable terms in order.
 */
export const allocateAcrossTerms = (amount, payableTerms = [], startFeeTermId) => {
  const slice = getPayableTermsFrom(payableTerms, startFeeTermId);
  const maxPayable = roundMoney(
    slice.reduce((sum, term) => sum + (Number(term.pending_amount) || 0), 0)
  );

  let remaining = roundMoney(Number(amount) || 0);
  const allocations = [];

  for (const term of slice) {
    if (remaining <= 0.001) break;
    const pending = roundMoney(Number(term.pending_amount) || 0);
    if (pending <= 0.001) continue;
    const pay = roundMoney(Math.min(remaining, pending));
    if (pay > 0.001) {
      allocations.push({ payableTerm: term, amount: pay });
      remaining = roundMoney(remaining - pay);
    }
  }

  return { allocations, leftover: remaining, maxPayable };
};
