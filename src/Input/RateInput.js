

// import React, { useState } from 'react';

// function RateInput() {
//   const [qty, setQty] = useState(1);
//   const [rate, setRate] = useState(1);
//   const [gst, setGst] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [received, setReceived] = useState(0);
//   const [balance, setBalance] = useState(0);

//   const handleCalc = (newQty, newRate, newGst) => {
//     const baseAmount = newQty * newRate;
//     const gstAmount = (baseAmount * newGst) / 100;
//     const totalAmount = baseAmount + gstAmount;

//     setTax(gstAmount.toFixed(2));
//     setAmount(baseAmount.toFixed(2));
//     setGrandTotal(totalAmount.toFixed(2));
//     setBalance((totalAmount - received).toFixed(2));
//   };

//   const handleReceivedChange = (e) => {
//     const rcv = Number(e.target.value);
//     setReceived(rcv);
//     setBalance((grandTotal - rcv).toFixed(2));
//   };

//   return (
//     <div >
//       <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th style={{ width: '30%' }}>Item</th>
//             <th>HSN</th>
//             <th>Qty</th>
//             <th>Rate</th>
//             <th>GST %</th>
//             <th>TAX</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>
//               <div>
//                 Model No: <input type="text" /><br />
//                 Chassis No: <input type="text" /><br />
//                 Motor No: <input type="text" /><br />
//                 Battery No: <input type="text" />
//               </div>
//             </td>
//             <td><input type="text" value="87116020" readOnly /></td>
//             <td>
//               <input
//                 type="number"
//                 value={qty}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   setQty(val);
//                   handleCalc(val, rate, gst);
//                 }}
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 value={rate}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   setRate(val);
//                   handleCalc(qty, val, gst);
//                 }}
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 value={gst}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   setGst(val);
//                   handleCalc(qty, rate, val);
//                 }}
//               />
//             </td>
//             <td><input type="text" value={tax} readOnly /></td>
//             <td><input type="text" value={amount} readOnly /></td>
//           </tr>
//           <tr>
//             <td colSpan="7" ><strong>Grand Total:</strong></td>
            
//             <td><input type="text" value={grandTotal} readOnly /></td>
//           </tr>
//           <tr>
//             <td colSpan="7" ><strong>Received Amount:</strong></td>
            
//             <td>
//               <input
//                 type="number"
//                 value={received}
//                 onChange={handleReceivedChange}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td colSpan="7" ><strong>Balance Amount:</strong></td>
            
//             <td><input type="text" value={balance} readOnly /></td>
//           </tr>
//         </tbody>
//       </table>


//       <table>
//     <tbody><tr>
//       <td rowspan="2">HSN/SAC</td>
//       <td rowspan="2">Taxable Value</td>
//       <td colspan="2">CGST</td>
//       <td colspan="2">SGST</td>
//       <td rowspan="2">Total Tax Amount</td>
//     </tr>
//     <tr>
//       <td>Rate</td>
//       <td>Amount</td>
//       <td>Rate</td>
//       <td>Amount</td>
//     </tr>
//     <tr>
      
//       <td><input type="text" value="87116020" /></td>
//       <td><input id="taxable" /></td>
//       <td><input id="cgst-rate" value="2.5%" /></td>
//       <td><input id="cgst" /></td>
//       <td><input id="sgst-rate" value="2.5%" /></td>
//       <td><input id="sgst" /></td>
//       <td><input id="taxTotal" /></td>
//     </tr>

//   </tbody></table>

    
//     </div>
//   );
// }

// export default RateInput;


import React, { useState, useEffect } from 'react';

function RateInput() {
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(1);
  const [gst, setGst] = useState(5);
  const [tax, setTax] = useState(0);
  const [amount, setAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [received, setReceived] = useState(0);
  const [balance, setBalance] = useState(0);

  const [cgstAmount, setCgstAmount] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [taxableValue, setTaxableValue] = useState(0);

  const handleCalc = (newQty, newRate, newGst) => {
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
  };

  const handleReceivedChange = (e) => {
    const rcv = Number(e.target.value);
    setReceived(rcv);
    setBalance((grandTotal - rcv).toFixed(2));
  };

  useEffect(() => {
    handleCalc(qty, rate, gst);
  }, []);

  return (
    <div>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th style={{ width: '35%' }}>Item</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST %</th>
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

              {/* Model No: <input id="modelNo" type="text" /><br />
              Chassis No: <input id="ChassisNo" type="text" /><br /> */}
              Motor No: <input id="MotorNo" type="text" /><br />
              Battery No: <input id="BatteryNo" type="text" />
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
              {/* <input id="rate"
                type="number"
                value={rate}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRate(val);
                  handleCalc(qty, val, gst);
                }}
              /> */}
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
              {/* <input id="gst"
                type="number"
                value={gst}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setGst(val);
                  handleCalc(qty, rate, val);
                }}
              /> */}
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
            <td><input type="text" value="87116020" readOnly /></td>
            <td><input type="text" value={taxableValue} readOnly /></td>
            <td><input type="text" value={(gst / 2).toFixed(2) + "%"} readOnly /></td>
            <td><input type="text" value={cgstAmount} readOnly /></td>
            <td><input type="text" value={(gst / 2).toFixed(2) + "%"} readOnly /></td>
            <td><input type="text" value={sgstAmount} readOnly /></td>
            <td><input type="text" value={tax} readOnly /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RateInput;
