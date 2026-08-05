import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import bgImage from '../assets/fee_recepit.jpeg';

// Function to convert number to words
const numberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertLessThanThousand = (n) => {
    if (n === 0) return '';
    
    let words = '';
    
    if (n >= 100) {
      words += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    
    if (n >= 10) {
      if (n < 20) {
        words += teens[n - 10] + ' ';
        return words;
      }
      words += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    
    if (n > 0) {
      words += ones[n] + ' ';
    }
    
    return words;
  };

  if (num === 0) return 'Zero';

  let words = '';
  
  if (num >= 10000000) { // Crores
    words += convertLessThanThousand(Math.floor(num / 10000000)) + 'Crore ';
    num %= 10000000;
  }
  
  if (num >= 100000) { // Lakhs
    words += convertLessThanThousand(Math.floor(num / 100000)) + 'Lakh ';
    num %= 100000;
  }
  
  if (num >= 1000) { // Thousands
    words += convertLessThanThousand(Math.floor(num / 1000)) + 'Thousand ';
    num %= 1000;
  }
  
  words += convertLessThanThousand(num);
  
  return words.trim() + ' Rupees Only';
};

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
      fontWeight: 300
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 0,
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '51%',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '52%',
    minHeight: '100%',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '52%',
    padding: 20,
  },
  field: {
    position: 'absolute',
    fontSize: 10,
    fontFamily: 'Roboto',
    color: '#000000',
    fontWeight: 400,
  },
  // Adjusted positions for better visibility
  receiptNo: { top: 147.3, left: 200, width: 120 },
  admissionNo: { top: 170.6, left: 200, width: 120 },
  studentName: { top: 188, left: 200, width: 180 },
  fatherName: { top: 206, left: 200, width: 180 },
  groupCourse: { top: 224, left: 200, width: 180 },
  paymentMode: { top: 147.3, left: 490, width: 120 },
  transactionId: { top:  170.6, left: 490, width: 120 },
  paymentDate: { top:188, left: 440, width: 180 },
  term: { top: 253.2, left: 155, width: 240 },
  amount: { top: 253.2, left: 420, width: 120 },
  amount1: { top: 268 , left: 420, width: 120 },
  remainingBalance: { top:298, left: 506, width: 120 },
  amountInWords: { top: 298, left: 190, width: 400 },
});

const ReceiptOverlay = ({ data }) => {
  const {
    receiptNo = '',
    admissionNo = '',
    studentName = '',
    fatherName = '',
    group = '',
    batch = '',
    paymentMode = '',
    transactionId = '',
    feeDetails = [],
    paymentDate = '',
    term = '',
    amount = '',
    remainingBalance = ''
  } = data || {};

  const amountInWords = numberToWords(parseInt(amount));

  return (
    <View style={styles.content}>
      <Text style={{ ...styles.field, ...styles.receiptNo }}>{receiptNo}</Text>
      <Text style={{ ...styles.field, ...styles.admissionNo }}>{admissionNo}</Text>
      <Text style={{ ...styles.field, ...styles.studentName }}>{studentName}</Text>
      <Text style={{ ...styles.field, ...styles.fatherName }}>{fatherName}</Text>
      <Text style={{ ...styles.field, ...styles.groupCourse }}>{`${group} - ${batch}`}</Text>
      <Text style={{ ...styles.field, ...styles.paymentMode }}>{paymentMode}</Text>
      {transactionId && <Text style={{ ...styles.field, ...styles.transactionId }}>{transactionId}</Text>}
      <Text style={{ ...styles.field, ...styles.paymentDate }}>{paymentDate}</Text>
      <Text style={{ ...styles.field, ...styles.term }}>{`Tuition Fee Term - ${term}`}</Text>
      <Text style={{ ...styles.field, ...styles.amount }}>{amount}</Text>
      <Text style={{ ...styles.field, ...styles.amount1 }}>{amount}</Text>
      {remainingBalance && remainingBalance !== 'N/A' && <Text style={{ ...styles.field, ...styles.remainingBalance }}>{remainingBalance}</Text>}
      <Text style={{ ...styles.field, ...styles.amountInWords }}>{amountInWords}</Text>
    </View>
  );
};

const ReceiptPage = ({ data }) => (
  <View style={styles.page}>
    <View style={styles.container}>
      <Image style={styles.bgImage} src={bgImage} />
      <ReceiptOverlay data={data} />
    </View>
  </View>
);

const FeeReceipt = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ReceiptPage data={data} />
      </Page>
    </Document>
  );
};

export default FeeReceipt; 