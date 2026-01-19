
import React, { useState, useEffect } from 'react';
import { numberToWords } from '../utils/numberToWords';
import { useCallback } from "react";



function RateInput( { initialData = {} } ) {

  

  console.log("🚀 initialData received in RateInput:", initialData);
  const [qty, setQty] = useState(initialData.qty || 1);
const [rate, setRate] = useState(initialData.rate || 1);
const [gst, setGst] = useState(initialData.Gst || 5);
const [tax, setTax] = useState(initialData.tax || 0);

  const [amount, setAmount] = useState(initialData.amount || 0);
  const [grandTotal, setGrandTotal] = useState(initialData.amount || 0);
  const [received, setReceived] = useState(initialData.receivedAmount || 0);
  const [balance, setBalance] = useState(initialData.balanceAmount || 0);

  const [cgstAmount, setCgstAmount] = useState(initialData.cgstAmount || 0);
  const [sgstAmount, setSgstAmount] = useState(initialData.sgstAmount || 0);
  const [taxableValue, setTaxableValue] = useState(initialData.amount || 0);



  // const handleCalc = (newQty, newRate, newGst) => {
  //   const baseAmount = newQty * newRate;
  //   const totalTax = (baseAmount * newGst) / 100;
  //   const totalAmount = baseAmount + totalTax;

  //   const cgst = (totalTax / 2).toFixed(2);
  //   const sgst = (totalTax / 2).toFixed(2);

  //   setTaxableValue(baseAmount.toFixed(2));
  //   setCgstAmount(cgst);
  //   setSgstAmount(sgst);
  //   setTax(totalTax.toFixed(2));
  //   setAmount(totalAmount.toFixed(2));
  //   setGrandTotal(totalAmount.toFixed(2));
  //   setBalance((totalAmount - received).toFixed(2));

  //   const inWords = numberToWords(Math.round(totalAmount));
  // document.getElementById("inWords").innerText = inWords;
  // };


const handleCalc = useCallback(
  (newQty, newRate, newGst) => {
    const baseAmount = newQty * newRate;
    const totalTax = (baseAmount * newGst) / 100;
    const totalAmount = baseAmount + totalTax;

    const cgst = (totalTax / 2).toFixed(2);
    const sgst = (totalTax / 2).toFixed(2);

    setTaxableValue(baseAmount.toFixed(2));
    setCgstAmount(cgst);
    setSgstAmount(sgst);
    setTax(totalTax.toFixed(2));
    setAmount(totalAmount.toFixed(2));
    setGrandTotal(totalAmount.toFixed(2));
    setBalance((totalAmount - received).toFixed(2));

    const inWords = numberToWords(Math.round(totalAmount));
    document.getElementById("inWords").innerText = inWords;
  },
  [received] // ✅ dependency (used inside function)
);


  useEffect(() => {
  if (initialData) {
    setQty(initialData.qty || 1);
    setRate(initialData.rate || 1);
    setGst(initialData.Gst || 5);
    setReceived(initialData.receivedAmount || 0);

setTax(initialData.tax || 0);

  setAmount(initialData.amount || 0);
  setGrandTotal(initialData.amount || 0);
  
  setBalance(initialData.balanceAmount || 0);
const c_s_gst = (initialData.tax / 2).toFixed(2);
  setCgstAmount(c_s_gst || 0);
  setSgstAmount(c_s_gst || 0);
  setTaxableValue(initialData.amount || 0);



  }
}, [initialData]);



  const handleReceivedChange = (e) => {
    const rcv = Number(e.target.value);
    setReceived(rcv);
    setBalance((grandTotal - rcv).toFixed(2));
  };

  // useEffect(() => {
  //   handleCalc(qty, rate, gst);
  // }, [gst, qty, rate, handleCalc]);
  useEffect(() => {
  handleCalc(qty, rate, gst);
}, [qty, rate, gst, handleCalc]);


  return (
    <div>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th style={{ width: '35%' }}>Item</th>
            <th>HSN</th>
            <th style={{ width: '46px' }}>Qty</th>
            <th>Rate</th>
            <th style={{ width: '46px' }}>GST %</th>
            <th>TAX</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <div class="form-row">
  <label for="modelNo">Model No:</label>
  <input id="modelNo" type="text" />
</div>

<div class="form-row">
  <label for="ChassisNo">Chassis No:</label>
  <input id="ChassisNo" type="text" />
</div>

              Motor No: <input id="MotorNo" type="text" /><br />
              Battery No. , Charger No.: <input id="BatteryNo" type="text" />
              <div class="form-row">
  <label for="Controller">Controller No:</label>
  <input id="Controller" type="text" />
</div>
            </td>
            <td><input id="hsn" type="text" value="87116020" readOnly /></td>
            <td>
              <input id="qty"
                type="number"
                value={qty}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQty(val);
                  handleCalc(val, rate, gst);
                }}
              />
            </td>
            <td>
              
              <input
  id="rate"
  type="number"
  value={rate === 0 ? '' : rate}
  onChange={(e) => {
    const val = e.target.value;
    if (val === '') {
      setRate(0); // or setRate('') if you want to handle it as empty
      handleCalc(qty, 0, gst);
    } else {
      const num = Number(val);
      setRate(num);
      handleCalc(qty, num, gst);
    }
  }}
/>

            </td>
            <td>
             
              <input
  id="gst"
  type="number"
  value={gst === 0 ? '' : gst}
  onChange={(e) => {
    const val = e.target.value;
    if (val === '') {
      setGst(0); // Optionally set to null or '' if you want to handle blank differently
      handleCalc(qty, rate, 0);
    } else {
      const num = Number(val);
      setGst(num);
      handleCalc(qty, rate, num);
    }
  }}
/>

            </td>
            <td><input id="tax" type="text" value={tax} readOnly /></td>
            <td><input id="amount" type="text" value={amount} readOnly /></td>
          </tr>
          <tr>
            <td colSpan="7"><strong>Grand Total:</strong></td>
            <td><input id="grandTotal" type="text" value={grandTotal} readOnly /></td>
          </tr>
          <tr>
            <td colSpan="7"><strong>Received Amount:</strong></td>
            <td>
              <input id="received"
                type="number"
                value={received}
                onChange={handleReceivedChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="7"><strong>Balance Amount:</strong></td>
            <td><input id="balance" type="text" value={balance} readOnly /></td>
          </tr>
        </tbody>
      </table>

      <br />

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th rowSpan="2">HSN/SAC</th>
            <th rowSpan="2">Taxable Value</th>
            <th colSpan="2">CGST</th>
            <th colSpan="2">SGST</th>
            <th rowSpan="2">Total Tax Amount</th>
          </tr>
          <tr>
            <th>Rate</th>
            <th>Amount</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input id='hsn' type="text" value="87116020" readOnly /></td>
            <td><input id='taxableVal' type="text" value={taxableValue} readOnly /></td>
            <td><input id='cgst1' type="text" value={(gst / 2).toFixed(2) + "%"} readOnly /></td>
            <td><input id='cgst' type="text" value={cgstAmount} readOnly /></td>
            <td><input id='sgst1' type="text" value={(gst / 2).toFixed(2) + "%"} readOnly /></td>
            <td><input id='sgstamt' type="text" value={sgstAmount} readOnly /></td>
            <td><input id='tax1' type="text" value={tax} readOnly /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RateInput;
