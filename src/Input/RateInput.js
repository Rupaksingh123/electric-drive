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

    setTax(totalTax.toFixed(1));
    setAmount(totalAmount.toFixed(1));
  };

  const handleQtyChange = (e) => {
    const val = Number(e.target.value);
    setQty(val);
    recalculate(val, rate, gst);
  };

  const handleRateChange = (e) => {
    const val = Number(e.target.value);
    setRate(val);
    recalculate(qty, val, gst);
  };

  const handleGstChange = (e) => {
    const val = Number(e.target.value);
    setGst(val);
    recalculate(qty, rate, val);
  };

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
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
            <div className="item-details" style={{width: '230px'}}>
              <span>Model No:</span> <input type="text" id="model-no" />
              <span>Chassis No:</span> <input type="text" id="chassis-no" />
              <span>Motor No:</span> <input type="text" id="motor-no" />
              <span>Battery No:</span> <input type="text" id="battery-no" />
            </div>
          </td>
          





          <td><input className="hsn" value="87116020" readOnly /></td>
          <td>
            <input
              type="number"
              value={qty}
              onChange={handleQtyChange}
              className="qty" 
            />
          </td>
          <td>
            <input
              type="number"
              value={rate}
              onChange={handleRateChange}
              className="rate"
            />
          </td>
          <td>
            <input
              type="number"
              value={gst}
              onChange={handleGstChange}
              className="gst"
            />
          </td>
          <td><input type="text" value={tax} readOnly className="tax" /></td>
          <td><input type="text" value={amount} readOnly className="amount" /></td>
        </tr>
      </tbody>
    </table>
  );
}

export default RateInput;
