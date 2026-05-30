import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import numberToWords from "./integerToString";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  headerRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'blue' },
  headerRight: { textAlign: 'right', alignItems: 'flex-end' },
  headerRightText: { color: 'blue' },
  row: { flexDirection: "row", marginBottom: 6 },
  label: { width: "35%", fontWeight: "bold" },
  colon: { width: "5%", fontWeight: "bold" },
  value: { width: "60%" },
  sectionTitle: { marginTop: 20, marginBottom: 8, fontSize: 14, fontWeight: 'bold' },
  table: { marginTop: 12, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  tableHeader: { fontWeight: 'bold' },
  col1: { width: "50%", textAlign: "center" },
  col2: { width: "50%", textAlign: "center" },
});

interface InvoiceProps {
  data: any; // Replace 'any' with a proper type for 'data', e.g., an interface describing the invoice data
}

const InvoicePdf: React.FC<InvoiceProps> = ({ data }) => {

  return (
    <Page style={styles.page}>
      <View style={styles.headerRow}>
        <View style={styles.headerRight}>
          <Text style={styles.headerRightText}>Dr. Hardavi Joshi</Text>
          <Text style={styles.headerRightText}>(BPT, DNHE)</Text>
          <Text style={styles.headerRightText}>GPC-20845</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Name of Patient</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Age of Patient</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.age} years</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Diagnosis</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.diagnosis}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Advised By</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.advisedBy}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Treatment Duration</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.treatmentDuration} days ({data.rangeFrom} – {data.rangeTo})</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Charge per Session</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>Rs. {data.chargePerSession}/-</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Payable Amount</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>Rs. {data.totalPayableAmount}/- {`(${numberToWords(data.totalPayableAmount)} Rupees Only)`}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.col1, { fontWeight: "bold" }]}>
            Date
          </Text>

          <Text style={[styles.col2, { fontWeight: "bold" }]}>
            Charges (Rs)
          </Text>
        </View>
        {data.sessions.map((s: any, i: number) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.col1}>{s.date}</Text>
            <Text style={styles.col2}>{s.amount}</Text>
          </View>
        ))}

        {/* Total row */}
        <View style={[styles.tableRow, { borderTop: '1px solid #000', paddingTop: 8, paddingBottom: 8 }]}> 
          <Text style={[styles.col1, { fontWeight: 'bold' }]}>Total</Text>
          <Text style={[styles.col2, { fontWeight: 'bold' }]}>Rs. {Number(data.totalPayableAmount).toLocaleString('en-IN')}/-</Text>
        </View>
      </View>
      
      <View style={{ marginTop: 16 }}>
        <Text>Thanking you</Text>
      </View>
    </Page>
  );
}

export default InvoicePdf;