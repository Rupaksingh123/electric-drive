import React, { useEffect } from "react";
import RateInput from "../Input/RateInput";

const HomePage = () => {

  const monitorInternetConnection = () => {
  window.addEventListener('online', () => alert('Back online'));
  window.addEventListener('offline', () => alert('You are offline'));
};

const saveInvoice = () => {
  console.log("Saving invoice... (implement your logic here)");
  
  const invoiceData = {
    companyAddress: "NEAR VISHAL SUPER MART ,KISAN COLL. RD, PO+PS SOHSARAI, BIHAR SHARIF, NALANDA, 803118",
    gstin: "10KHYPD2397L1ZO",
    mobile: "8825148565",
    pan: "KHYPD2397L",
    email: "evelectricdrive@gmail.com",
    invoiceNumber: document.getElementById('invoiceNumber').value,
    invoiceDate: document.getElementById('invoiceDate').value,
    billTo: document.getElementById('bill-to-address').value,
    billMobile: document.getElementById('bill-mobile').value,
    billPan: document.getElementById('bill-pan').value,
    billEmail: document.getElementById('bill-email').value,
    billAadhar: document.getElementById('bill-aadhar').value,

    

    modelNo: document.getElementById('modelNo').value,
    ChassisNo: document.getElementById('ChassisNo').value,
    MotorNo: document.getElementById('MotorNo').value,
    BatteryNo: document.getElementById('BatteryNo').value,
    hsn: document.getElementById('hsn').value,
    qty: document.getElementById('qty').value,
    rate: document.getElementById('rate').value,
    Gst: document.getElementById('gst').value,
    tax: document.getElementById('tax').value,
    amount: document.getElementById('amount').value
  };


  
  console.log(invoiceData);
  localStorage.setItem('invoice', JSON.stringify(invoiceData));

  fetch("https://script.google.com/macros/s/AKfycbxOJRcuQ7O8eYHlSZGwukrNXMikcxCc1kLny_sqbNzgCqgrmhVP1ptJcD_3RmBqHSDkOg/exec", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      name: "Rupak",
      gstin: invoiceData.gstin,
      mobile: invoiceData.mobile,
      pan: invoiceData.pan,
      email: invoiceData.email,
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceDate: invoiceData.invoiceDate,
      billTo: invoiceData.billTo,
      billMobile: invoiceData.billMobile,
      billPan: invoiceData.billPan,
      billEmail: invoiceData.billEmail,
      billAadhar: invoiceData.billAadhar,
      modelNo: invoiceData.modelNo,
      ChassisNo: invoiceData.ChassisNo,
      MotorNo: invoiceData.MotorNo,
      BatteryNo: invoiceData.BatteryNo,
      hsn: invoiceData.hsn,
      qty: invoiceData.qty,
      rate: invoiceData.rate,
      Gst: invoiceData.Gst,
      tax: invoiceData.tax,
      amount: invoiceData.amount
    })
  })
    .then(async (response) => {
    if (!response.ok) {
      // Server responded with an HTTP error
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return response.json(); // or text() depending on your GAS output
  })
  .then(data => {
    console.log("Response from server:", data);
  })
     .catch(error => {
    console.error("Fetch failed:", error.message || error);
    alert("Fetch Error: " + error.message);
  });

  alert('Invoice saved locally.');


};

const fetchLatestInvoiceNumber = () => {
  console.log("Fetching latest invoice number...");
  fetch("https://script.google.com/macros/s/AKfycbxOJRcuQ7O8eYHlSZGwukrNXMikcxCc1kLny_sqbNzgCqgrmhVP1ptJcD_3RmBqHSDkOg/exec?mode=latest")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    if (data.success) {
      console.log("Latest Invoice:", data.latestInvoice);
    } else {
      console.warn("No invoice found.");
    }
  })
  .catch(err => {
    console.error("Error fetching invoice:", err.message);
  });

};

const getAllInvoices = () => {
  console.log("Fetching all invoices...");
};

const fetchByInvoice = () => {
  const invoice = document.getElementById("invoiceNumber").value;
  console.log("Fetch by invoice:", invoice);
};


  useEffect(() => {
    monitorInternetConnection();

    document.getElementById("saveBtn").addEventListener("click", () => {
      if (navigator.onLine) {
        saveInvoice();
      } else {
        alert("No internet");
      }
    });

    fetchLatestInvoiceNumber();
  }, []);

  return (
    <div>
      <div className="button-group">
        <button id="saveBtn">Save</button>
        <button onClick={() => window.print()}>Print</button>
        <button id="getAll" onClick={getAllInvoices}>Get All records</button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
        <h2 style={{ margin: 0 }}>TAX INVOICE</h2>
        <p style={{ margin: 0, backgroundColor: 'lightgray', padding: '4px 10px', borderRadius: '4px', border: '1px solid #000' }}>
          ORIGINAL FOR RECIPIENT
        </p>
      </div>

      {/* Company Info */}
      <div className="container">
        <div className="left-div">
          <strong>ELECTRIC DRIVE</strong><br />
          <label id="companyAddress" style={{ fontSize: 13 }}>
            NEAR VISHAL SUPER MART, KISAN COLL. RD, PO+PS SOHSARAI, BIHAR SHARIF, NALANDA, 803118
          </label>

          <div className="contact-info">
            <div className="contact-item">
              <label>Mobile:</label>
              <label>8825148565</label>
            </div>
            <div className="contact-item">
              <label>Email:</label>
              <label id="email">evelectricdrive@gmail.com</label>
            </div>
            <div className="contact-item">
              <label>PAN Number:</label>
              <label>KHYPD2397L</label>
            </div>
            <div className="contact-item">
              <label>GSTIN:</label>
              <label>10KHYPD2397L1ZO</label>
            </div>
          </div>
        </div>

        <div className="right-div">
          <div className="invoice-header">
            <div className="invoice-item">
              <label htmlFor="invoiceNumber">No. Invoice:</label>
            </div>
            <div className="invoice-item">
              <label htmlFor="invoiceDate">Date:</label>
            </div>
          </div>

          <div className="invoice-inputs">
            <div className="invoice-item">
              <input id="invoiceNumber" defaultValue="ED/25-26/-122" />
              <button id="getByInvoice" onClick={fetchByInvoice}>Get By Invoice</button>
            </div>
            <div className="invoice-item">
              <input type="date" id="invoiceDate" defaultValue="2025-05-30" />
            </div>
          </div>
        </div>
      </div>

      {/* Bill To Info */}
      <div className="container">
        <div className="left-div">
          <div className="contact-item">
            <label style={{ width: "65px" }}>Bill To: </label>
            <textarea id="bill-to-address" style={{ width: "100%" }}></textarea>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <label>Mobile:</label>
              <input id="bill-mobile" type="number" style={{ width: "120px" }} />
            </div>
            <div className="contact-item">
              <label>Email:</label>
              <input id="bill-email" />
            </div>
            <div className="contact-item">
              <label>PAN No.:</label>
              <input id="bill-pan" style={{ width: "130px" }} />
            </div>
            <div className="contact-item">
              <label style={{ width: "65px" }}>Aadhar:</label>
              <input id="bill-aadhar" style={{ width: "150px" }} />
            </div>
          </div>
        </div>
        <div className="right-div">
          <h2>Right Section (40%)</h2>
        </div>
      </div>

      <div id="details">
        <RateInput />
      </div>

      <p style={{ display: "flex", margin: 0 }}>
        <strong>Total Amount (in words):</strong>
        <label id="inWords" style={{ flex: 1, display: "flex", alignItems: "center" }}></label>
      </p>

      <table>
        <tbody>
          <tr>
            <td>
              <strong>Bank Details</strong><br />
              Name: ELECTRIC DRIVE<br />
              IFSC Code: KKBK0005661<br />
              Account No: 5448825666<br />
              Bank: Central Bank of India, Kisan College BRANCH
            </td>
            <td>
              <strong>Payment QR Code</strong><br />
              UPI ID: kumarvishvishal23@ybl<br />
              <img src="qr_placeholder.png" width="100" alt="QR Code" />
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", textAlign: "left" }}>
              <strong>Terms and Conditions:</strong><br />
              1. Goods once sold will not be taken back or exchanged<br />
              2. All disputes are subject to NALANDA jurisdiction only
            </td>
            <td style={{ verticalAlign: "bottom", textAlign: "center", height: "100px" }}>
              <p style={{ margin: 0 }}>
                Authorised Signatory<br />
                <strong>ELECTRIC DRIVE</strong>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <div id="toast" style={{ display: "none" }}></div>
    </div>
  );
};

export default HomePage;
