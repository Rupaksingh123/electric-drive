// RateInput.js
import React from 'react';

function RateInput() {
  const recalculate = (e, field) => {
    const value = parseFloat(e.target.value) || 0;
    console.log(`Changed field: ${field}, Value: ${value}`);
    // Add your custom logic here, e.g. total calculation
  };

  return (
    <tr>
      <td>
        <input
          className="rate"
          id="rate"
          defaultValue="42857.14"
          onInput={(e) => recalculate(e, 'rate')}
        />
      </td>
      <td>
        <input
          className="gst"
          id="gst"
          defaultValue="5"
          onInput={(e) => recalculate(e, 'gst')}
        />
      </td>
    </tr>
  );
}

export default RateInput;
