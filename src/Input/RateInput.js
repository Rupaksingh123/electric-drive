// RateInput.js
import React from 'react';
import React, { useState } from 'react';

function RateInput() {
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(1);
  const [gst, setGst] = useState(1);
  const [tax, setTax] = useState(0);
  const [amount, setAmount] = useState(0);

  const recalculate = () => {
    const baseAmount = qty * rate;
    const gstPercent = gst;
    const halfGST = (baseAmount * (gstPercent / 2)) / 100;
    const totalTax = (baseAmount * gstPercent) / 100;
    const totalAmount = baseAmount + totalTax;

    setTax(totalTax.toFixed(2));
    setAmount(totalAmount.toFixed(2));
    // You can also update grand total or other fields here
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>1</td>

          <td>
            <div className="item-details">
              <span>Model No:</span> <input type="text" id="model-no" />
              <span>Chassis No:</span> <input type="text" id="chassis-no" />
              <span>Motor No:</span> <input type="text" id="motor-no" />
              <span>Battery No:</span> <input type="text" id="battery-no" />
            </div>
          </td>

          <td><input className="hsn" id="hsn" value="87116020" readOnly /></td>

          <td>
            <input
              className="qty"
              id="qty"
              type="number"
              value={qty}
              onChange={(e) => {
                setQty(Number(e.target.value));
                recalculate();
              }}
            />
          </td>

          <td>
            <input
              className="rate"
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => {
                setRate(Number(e.target.value));
                recalculate();
              }}
            />
          </td>

          <td>
            <input
              className="gst"
              id="gst"
              type="number"
              value={gst}
              onChange={(e) => {
                setGst(Number(e.target.value));
                recalculate();
              }}
            />
          </td>

          <td><input className="tax" id="tax" value={tax} readOnly /></td>
          <td><input className="amount" id="amount" value={amount} readOnly /></td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
