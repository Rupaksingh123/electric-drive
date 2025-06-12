import React, { useState } from 'react';

function RateInput() {
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(1);
  const [gst, setGst] = useState(1);
  const [tax, setTax] = useState(0);
  const [amount, setAmount] = useState(0);

  const recalculate = (newQty, newRate, newGst) => {
    const baseAmount = newQty * newRate;
    const gstPercent = newGst;
    const totalTax = (baseAmount * gstPercent) / 100;
    const totalAmount = baseAmount + totalTax;

    setTax(totalTax.toFixed(2));
    setAmount(totalAmount.toFixed(2));
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
                const val = Number(e.target.value);
                setQty(val);
                recalculate(val, rate, gst);
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
                const val = Number(e.target.value);
                setRate(val);
                recalculate(qty, val, gst);
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
                const val = Number(e.target.value);
                setGst(val);
                recalculate(qty, rate, val);
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

export default RateInput;
