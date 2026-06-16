import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from '../assets/logo1.png';

// Register fonts
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

Font.register({
  family: 'Noto Sans',
  src: 'https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNjXhFVZNyB.woff2'
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 15,
  },
  firstPage: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    width: '100%',
  },
  logo: {
    width: 35,
    height: 35,
    position: 'absolute',
    left: 0,
  },
  schoolInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  schoolName: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  schoolAddress: {
    fontSize: 8,
    fontFamily: 'Roboto',
    marginBottom: 2,
    color: '#666666',
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 6,
    color: '#1a1a1a',
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
  academicYear: {
    fontSize: 9,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 10,
    color: '#666666',
  },
  studentInfo: {
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    padding: 6,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  studentInfoRow: {
    flexDirection: 'row',
    marginBottom: 3,
    justifyContent: 'space-between',
  },
  studentInfoItem: {
    width: '48%',
  },
  studentInfoLabel: {
    fontSize: 8,
    fontFamily: 'Roboto',
    color: '#666666',
  },
  studentInfoValue: {
    fontSize: 8,
    fontFamily: 'Roboto',
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  table: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    paddingBottom: 3,
    marginBottom: 3,
    backgroundColor: '#f5f5f5',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  tableCell: {
    fontSize: 8,
    fontFamily: 'Roboto',
    padding: 3,
  },
  col1: { width: '10%' },
  col2: { width: '40%' },
  col3: { width: '15%' },
  col4: { width: '15%' },
  col5: { width: '10%' },
  col6: { width: '10%' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    borderTopStyle: 'solid',
    paddingTop: 3,
  },
  totalLabel: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginRight: 6,
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 34,
  },
  signature: {
    alignItems: 'center',
  },
  signatureLine: {
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    marginBottom: 3,
  },
  signatureText: {
    fontSize: 8,
    fontFamily: 'Roboto',
    color: '#666666',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'dashed',
    marginVertical: 30,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ReceiptPage = ({ data, isFirstPage }) => {
  const {
    studentName,
    admissionNo,
    className,
    section,
    fatherName,
    paymentDate,
    paided_amount,
    paymentMode,
    category,
    amount,
    academicYear = '2025-2026'
  } = data;

  const formatAmount = (value) => {
    // Remove any currency symbols and format to just numbers
    return value.replace(/[^0-9.]/g, '');
  };

  return (
    <View style={[styles.page, isFirstPage && styles.firstPage]}>
      {/* Header with Logo and School Info */}
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src={logo}
        />
        <View style={styles.schoolInfo}>
          <Text style={styles.schoolName}>Spoorthi Educational Institute</Text>
          <Text style={styles.schoolAddress}>123 School Street, City, State</Text>
        </View>
      </View>

      {/* Title and Academic Year */}
      <Text style={styles.title}>Miscellaneous Payment Receipt</Text>
      <Text style={styles.academicYear}>Academic Year: {academicYear}</Text>

      {/* Student Information Box */}
      <View style={styles.studentInfo}>
        <View style={styles.studentInfoRow}>
          <View style={styles.studentInfoItem}>
            <Text style={styles.studentInfoLabel}>Student Name:</Text>
            <Text style={styles.studentInfoValue}>{studentName}</Text>
          </View>
          <View style={styles.studentInfoItem}>
            <Text style={styles.studentInfoLabel}>Admission No:</Text>
            <Text style={styles.studentInfoValue}>{admissionNo}</Text>
          </View>
        </View>
        <View style={styles.studentInfoRow}>
          <View style={styles.studentInfoItem}>
            <Text style={styles.studentInfoLabel}>Class & Section:</Text>
            <Text style={styles.studentInfoValue}>{className} - {section}</Text>
          </View>
          <View style={styles.studentInfoItem}>
            <Text style={styles.studentInfoLabel}>Father's Name:</Text>
            <Text style={styles.studentInfoValue}>{fatherName}</Text>
          </View>
        </View>
        <View style={styles.studentInfoRow}>
          <View style={styles.studentInfoItem}>
            <Text style={styles.studentInfoLabel}>Payment Date:</Text>
            <Text style={styles.studentInfoValue}>{paymentDate}</Text>
          </View>
          <View style={styles.studentInfoItem}>
            <Text style={styles.studentInfoLabel}>Payment Mode:</Text>
            <Text style={styles.studentInfoValue}>{paymentMode}</Text>
          </View>
        </View>
      </View>

      {/* Fee Details Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.col1]}>S.No</Text>
          <Text style={[styles.tableCell, styles.col2]}>Category</Text>
          <Text style={[styles.tableCell, styles.col3]}>Amount</Text>
          <Text style={[styles.tableCell, styles.col4]}>CGST</Text>
          <Text style={[styles.tableCell, styles.col5]}>SGST</Text>
          <Text style={[styles.tableCell, styles.col6]}>Total</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.col1]}>1</Text>
          <Text style={[styles.tableCell, styles.col2]}>{category}</Text>
          <Text style={[styles.tableCell, styles.col3]}>{formatAmount(paided_amount)}</Text>
          <Text style={[styles.tableCell, styles.col4]}>0</Text>
          <Text style={[styles.tableCell, styles.col5]}>0</Text>
          <Text style={[styles.tableCell, styles.col6]}>{formatAmount(paided_amount)}</Text>
        </View>
      </View>

      {/* Total Amount */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalValue}>{formatAmount(paided_amount)}</Text>
      </View>

      {/* Signatures */}
      <View style={styles.signatures}>
        <View style={styles.signature}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Signature Of the Principal</Text>
        </View>
        <View style={styles.signature}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Signature Of the Accountant</Text>
        </View>
      </View>
    </View>
  );
};

const MiscReceipt = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ReceiptPage data={data} isFirstPage={true} />
      </Page>
    </Document>
  );
};

export default MiscReceipt; 