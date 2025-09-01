import React, { useEffect, useState } from "react";
import RateInput from "../Input/RateInput";
import { numberToWords } from '../utils/numberToWords';
import html2pdf from 'html2pdf.js';


let fetchedInvoiceData = {}; // Stores latest fetched data




const HomePage = () => {


  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
 
    const [billAddress, setBillAddress] = useState('');


  const handleBillAddressChange = (e) => {

    const value = e.target.value.trim();
    console.log("value : " +fetchedInvoiceData.billTo);
  setBillAddress(e.target.value);

  setIsSaveEnabled(value !== '');
};




  const [isEditable, setIsEditable] = useState(true);
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  

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
      ControllerNo: document.getElementById('Controller').value,

      hsn: document.getElementById('hsn').value,
      qty: document.getElementById('qty').value,
      rate: document.getElementById('rate').value,
      Gst: document.getElementById('gst').value,
      tax: document.getElementById('tax').value,
      amount: document.getElementById('amount').value,
      received: document.getElementById('received').value,
      balance: document.getElementById('balance').value
    };



    console.log(invoiceData);
    localStorage.setItem('invoice', JSON.stringify(invoiceData));

    fetch("https://script.google.com/macros/s/AKfycbzACOJbNcT-ufvTUkVqpP2MSBysTI1csreBZPDaPJG-UpBteXQ25eePxvB35UE7xu_aUg/exec", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        mode: "invoice",
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
        ControllerNo: invoiceData.ControllerNo,
        hsn: invoiceData.hsn,
        qty: invoiceData.qty,
        rate: invoiceData.rate,
        Gst: invoiceData.Gst,
        tax: invoiceData.tax,
        amount: invoiceData.amount,
        receivedAmount: invoiceData.received,
        balanceAmount: invoiceData.balance

        //"balance" is database column name : right balance in above variable name 

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
       // alert("Fetch Error: " + error.message);
      });

    alert('Invoice saved locally.');


  };



// const downloadPDF = () => {
//   const element = document.getElementById("root"); // your printable content
// const invoiceNumber= document.getElementById('invoiceNumber').value;
//   if (!element) {
//     alert("Invoice content is not available yet.");
//     return;
//   }

//   // 🔻 Step 1: Hide unwanted elements
//   const elementsToHide = document.querySelectorAll('.no-print, .button-group, #saveBtn');
//   elementsToHide.forEach(el => el.style.display = 'none');

//   // ✅ Step 2: Force opacity of .container to 1
//   const containerEls = element.querySelectorAll(".container");
//   const originalOpacities = [];
//   containerEls.forEach(el => {
//     originalOpacities.push(el.style.opacity); // store original
//     el.style.opacity = "1";
//   });

//   // 🔄 Step 3: Generate PDF
//   const options = {
//     margin: 0.2,
//     // filename: `invoice_${Date.now()}.pdf`,
//     filename: `Invoice_${invoiceNumber}_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.pdf`,

//     image: { type: 'jpeg', quality: 1 },
//     html2canvas: { scale: 2, useCORS: true },
//     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//   };

//   html2pdf().set(options).from(element).save()
//     .then(() => {
//       // ✅ Step 4: Restore hidden elements
//       elementsToHide.forEach(el => el.style.display = '');

//       // ✅ Step 5: Restore original container opacity
//       containerEls.forEach((el, index) => {
//         el.style.opacity = originalOpacities[index] || '';
//       });
//     })
//     .catch(err => {
//       alert("PDF export failed");
//       elementsToHide.forEach(el => el.style.display = '');
//       containerEls.forEach((el, index) => {
//         el.style.opacity = originalOpacities[index] || '';
//       });
//     });
// };

function downloadPDF(mode = "download") {
  const element = document.getElementById("root");
  if (!element) {
    alert("Invoice content is not available yet.");
    return;
  }

  // 🔻 Step 1: Hide unwanted elements
  const elementsToHide = document.querySelectorAll('.no-print, .button-group, #saveBtn, #getByInoviceDiv');
  const hiddenElements = [];
  elementsToHide.forEach(el => {
    hiddenElements.push({ el, display: el.style.display });
    el.style.display = 'none';
  });

  // 🔻 Step 2: Temporarily modify textarea style
  const billTo = document.getElementById("bill-to-address");
  let originalTextareaStyle = null;

  if (billTo) {
   

 billTo.style.height = '2.8em';                // ~2 lines depending on font
  billTo.style.overflow = 'hidden';
  billTo.style.whiteSpace = 'pre-wrap';         // ✅ allows wrapping
  billTo.style.resize = 'none';
  billTo.style.lineHeight = '1.4';
  billTo.style.fontSize = '12px';               // optional, to fit more content
  billTo.style.wordBreak = 'break-word';        // ✅ ensures word breaking if long words



    originalTextareaStyle = {
      height: billTo.style.height,
      overflow: billTo.style.overflow,
      resize: billTo.style.resize,
      whiteSpace: billTo.style.whiteSpace,
      textOverflow: billTo.style.textOverflow
    };

    
  }

  // 🔻 Step 3: Force opacity of .container to 1 (if needed)
  const containerEls = element.querySelectorAll(".container");
  const originalOpacities = [];
  containerEls.forEach(el => {
    originalOpacities.push(el.style.opacity);
    el.style.opacity = "1";
  });

  // 🔄 Step 4: Generate PDF
  const options = {
    margin: 0.2,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  const worker = html2pdf().set(options).from(element).toPdf();

  if (mode === "print") {
    worker.outputPdf('bloburl').then((blobUrl) => {
      const printWindow = window.open(blobUrl);
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.focus();
          printWindow.print();
        });
      }
    });
  } else {
    worker.save(`invoice_${Date.now()}.pdf`);
  }

  // ✅ Step 5: Restore everything after export
  worker.then(() => {
    hiddenElements.forEach(({ el, display }) => {
      el.style.display = display || '';
    });

    containerEls.forEach((el, index) => {
      el.style.opacity = originalOpacities[index] || '';
    });

    if (billTo && originalTextareaStyle) {
      Object.assign(billTo.style, originalTextareaStyle);
    }
  }).catch(() => {
    alert("PDF export failed.");

    hiddenElements.forEach(({ el, display }) => {
      el.style.display = display || '';
    });

    containerEls.forEach((el, index) => {
      el.style.opacity = originalOpacities[index] || '';
    });

    if (billTo && originalTextareaStyle) {
      Object.assign(billTo.style, originalTextareaStyle);
    }
  });
}



// const downloadPDF = (mode = "download") => {
//   const element = document.getElementById("root"); // your printable content

//   if (!element) {
//     alert("Invoice content is not available yet.");
//     return;
//   }

//   // 🔻 Step 1: Hide unwanted elements
//   const elementsToHide = document.querySelectorAll('.no-print, .button-group, #saveBtn, #getByInoviceDiv');
//   elementsToHide.forEach(el => el.style.display = 'none');

//   // 🔻 Step 2: Force opacity of .container to 1
//   const containerEls = element.querySelectorAll(".container");
//   const originalOpacities = [];
//   containerEls.forEach(el => {
//     originalOpacities.push(el.style.opacity);
//     el.style.opacity = "1";
//   });

//   // 🔻 Step 2.5: Limit textarea height for PDF only
// const billToTextareas = element.querySelectorAll('#bill-to-address');
// const originalStyles = [];

// billToTextareas.forEach((el) => {
//   originalStyles.push({
//     el,
//     height: el.style.height,
//     overflow: el.style.overflow,
//     resize: el.style.resize,
//   });

//   el.style.height = '2.8em';
//   el.style.overflow = 'hidden';
//   el.style.resize = 'none';
// });


//   // 🔄 Step 3: Generate PDF with html2pdf
//   const options = {
//     margin: 0.2,
//     image: { type: 'jpeg', quality: 1 },
//     html2canvas: { scale: 2, useCORS: true },
//     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//   };

//   const worker = html2pdf().set(options).from(element).toPdf();

//   if (mode === "print") {
//     worker.outputPdf('bloburl').then((blobUrl) => {
//       const printWindow = window.open(blobUrl);
//       if (printWindow) {
//         printWindow.addEventListener('load', () => {
//           printWindow.focus();
//           printWindow.print();
//         });
//       }
//     });
//   } else {
//     worker.save(`invoice_${Date.now()}.pdf`);
//   }

//   // ✅ Step 4: Restore hidden elements and opacity
//   worker.then(() => {
//     elementsToHide.forEach(el => el.style.display = '');
//     containerEls.forEach((el, index) => {
//       el.style.opacity = originalOpacities[index] || '';
//     });
//     originalStyles.forEach(({ el, height, overflow, resize }) => {
//   el.style.height = height;
//   el.style.overflow = overflow;
//   el.style.resize = resize;
// });

//   }).catch(err => {
//     alert("PDF export failed");
//     elementsToHide.forEach(el => el.style.display = '');
//     containerEls.forEach((el, index) => {
//       el.style.opacity = originalOpacities[index] || '';
//     });
//   });
// };




  const updateInvoice = () => {

    const invoiceData = {
      invoiceNumber: document.getElementById('getinvoiceNumber').value,
      billTo: document.getElementById('bill-to-address').value,
      billPan: document.getElementById('bill-pan').value,
      billAadhar: document.getElementById('bill-aadhar').value,
      modelNo: document.getElementById('modelNo').value,
      ChassisNo: document.getElementById('ChassisNo').value,
      ControllerNo: document.getElementById('Controller').value,
      amount: document.getElementById('amount').value,
      balanceAmount: document.getElementById('balance').value,

      billMobile: document.getElementById('bill-mobile').value,
      billEmail: document.getElementById('bill-email').value,
      MotorNo: document.getElementById('MotorNo').value,
      BatteryNo: document.getElementById('BatteryNo').value,
      hsn: document.getElementById('hsn').value,
      qty: document.getElementById('qty').value,
      rate: document.getElementById('rate').value,
      Gst: document.getElementById('gst').value,
      tax: document.getElementById('tax').value,
      received: document.getElementById('received').value,
    };

    fetch("https://script.google.com/macros/s/AKfycbzACOJbNcT-ufvTUkVqpP2MSBysTI1csreBZPDaPJG-UpBteXQ25eePxvB35UE7xu_aUg/exec", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        mode: "updateInvoice",
        invoiceNumber: invoiceData.invoiceNumber,
        billTo: invoiceData.billTo,
        billPan: invoiceData.billPan,
        billAadhar: invoiceData.billAadhar,
        modelNo: invoiceData.modelNo,
        ChassisNo: invoiceData.ChassisNo,
        ControllerNo: invoiceData.ControllerNo,
        amount: invoiceData.amount,
        balanceAmount: invoiceData.balanceAmount,

        billMobile: invoiceData.billMobile,
        billEmail: invoiceData.billEmail,
        MotorNo: invoiceData.MotorNo,
        BatteryNo: invoiceData.BatteryNo,
        hsn: invoiceData.hsn,
        qty: invoiceData.qty,
        rate: invoiceData.rate,
        Gst: invoiceData.Gst,
        tax: invoiceData.tax,
        receivedAmount: invoiceData.received
      })
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Update response:", data);
        alert(data.status === "success" ? "Invoice updated successfully." : data.message);
      })
      .catch(error => {
        console.error("Error updating invoice:", error.message || error);
        alert("Update failed: " + error.message);
      });
  };

  function incrementInvoiceNumber(invoice) {
    const match = invoice.match(/(.*\/)(\d+)$/);
    if (!match) return invoice;

    const prefix = match[1];           // "ED/25-26/"
    const number = parseInt(match[2]); // 1
    const incremented = number + 1;
    const padded = String(incremented).padStart(match[2].length, '0'); // Preserve leading zeros

    return `${prefix}${padded}`;
  }

  const fetchLatestInvoiceNumber = () => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const invoiceDateInput = document.getElementById("invoiceDate");
    if (invoiceDateInput) {
      invoiceDateInput.value = today;
      console.log(today);
    }

    console.log("Fetching latest invoice number...");
    fetch("https://script.google.com/macros/s/AKfycbzACOJbNcT-ufvTUkVqpP2MSBysTI1csreBZPDaPJG-UpBteXQ25eePxvB35UE7xu_aUg/exec?mode=latest")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.success) {
          console.log("Latest Invoice:", data.latestInvoice);
          const nextInvoice = incrementInvoiceNumber(data.latestInvoice);
          document.getElementById('invoiceNumber').value = nextInvoice || "";
          console.log("next invoice no : " + nextInvoice);
        } else {
          console.warn("No invoice found.");
        }
      })
      .catch(err => {
        console.error("Error fetching invoice:", err.message);
      });

  };


  function populateFormFields(data, action) {
    console.log("data in populateForm :", data);

    const {
      billTo, billMobile, billPanNo, billEmail, billAadhar, BatteryNo, ChassisNo,
      Gst, MotorNo, amount, hsn, invoiceDate, modelNo, ControllerNo, qty, rate,
      tax, receivedAmount, balanceAmount
    } = data;


    const set = (id, val) => {
      const el = document.getElementById(id);
      if (action === "inner") {
        console.log("in inner "+el +" val "+val);
        if (el) el.innerHTML = val || '';
      } else {
        console.log("in else" +el +" val "+val);
        if (el) el.value = val || '';
      }
    };

    // console.log("befor convertion invoiceDate "+invoiceDate);


    const invoiceFormattedDate = new Date(invoiceDate).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

    document.getElementById("invoiceDate").value = invoiceFormattedDate;

    // console.log("after convertion invoiceFormattedDate "+invoiceFormattedDate);

    


    set('invoiceDate', invoiceFormattedDate);
    set('bill-to-address', billTo);
    set('bill-mobile', billMobile);
    set('bill-pan', billPanNo);
    set('bill-email', billEmail);
    set('bill-aadhar', billAadhar);
    set('Controller', ControllerNo);
    set('modelNo', modelNo);
    set('ChassisNo', ChassisNo);
    set('MotorNo', MotorNo);
    set('BatteryNo', BatteryNo);
    set('hsn', hsn);
    set('qty', qty);
    set('rate', rate);
    set('gst', Gst);
    set('tax', tax);
    set('amount', amount);
    set('grandTotal', amount);
    set('received', receivedAmount);
    set('balance', balanceAmount);

    const halfGst = Gst / 2;
    set('taxableVal', rate);
    set('cgst1', halfGst.toFixed(2) + '%');
    set('sgst1', halfGst.toFixed(2) + '%');
    set('cgst', tax / 2);
    set('sgstamt', tax / 2);
    set('tax1', tax);

    // In words
    document.getElementById('inWords').innerText = numberToWords(amount);

    // Status label
    const statusLabel = document.getElementById('status');
    if (statusLabel) {
      statusLabel.style.display = "inline-block";
      statusLabel.style.width = "100px";
      statusLabel.style.padding = "6px 12px";
      statusLabel.style.borderRadius = "6px";
      statusLabel.style.fontWeight = "bold";
      statusLabel.style.textAlign = "center";
      statusLabel.style.color = "white";
      statusLabel.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";

      if (balanceAmount != 0) {
        statusLabel.innerText = "Pending";
        statusLabel.style.backgroundColor = "#f39c12";
      } else {
        statusLabel.innerText = "Done";
        statusLabel.style.backgroundColor = "#2ecc71";
      }
    }
  }

  const fetchByInvoice = () => {
    let invoiceNumber = document.getElementById("getinvoiceNumber").value;
    fetch(`https://script.google.com/macros/s/AKfycbzACOJbNcT-ufvTUkVqpP2MSBysTI1csreBZPDaPJG-UpBteXQ25eePxvB35UE7xu_aUg/exec?invoiceNumber=${encodeURIComponent(invoiceNumber)}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchedInvoiceData = data.data;  // ✅ Store in global object
          document.getElementById("invoiceNumber").value = fetchedInvoiceData.invoiceNumber;
          console.log(" get data : "+fetchedInvoiceData.invoiceDate);
          populateFormFields(fetchedInvoiceData, "value"); // ✅ Reuse mapping function
          setShowControls(true); // If you're using this in React
        } else {
          setShowControls(false);   // hide edit + cancel buttons
          alert("Not found: " + data.message);
          document.getElementById("saveBtn").disabled = false;
        }
      })
      .catch(err => {
        console.error("Error fetching invoice:", err);
      });
  };


  const handleGetInvoice = () => {
    document.getElementById("saveBtn").disabled = true;
    setIsEditing(false);     // Initially in view mode
    setIsEditable(false);    // 🔐 Disable form until Edit is clicked
    fetchByInvoice();
    setShowControls(true);   // Show edit + cancel buttons
  };

  const handleEditClick = (e) => {
    console.log("Edit clicked");
    e.preventDefault();
    setIsEditing(true);      // Switch to editing mode
    setIsEditable(true);
    populateFormFields(fetchedInvoiceData, "value");
    document.getElementById('rate').innerHTML = fetchByInvoice.rate;
  };

  const handleUpdateClick = () => {
    console.log("in update");
    updateInvoice();
    // You can add actual update logic here (e.g., sending data to Google Apps Script)
    setIsEditing(false);     // Initially in view mode
    setIsEditable(false);    // 🔐 Disable form until Edit is clicked
    document.getElementById("saveBtn").disabled = true;

  };

  const handleCancelClick = () => {
    window.location.reload(); // Reset everything
  };

  
  function printPage() {
    // Temporarily adjust the textarea style before printing
    const billTo = document.getElementById('bill-to-address');
    const originalHeight = billTo.style.height;
    const originalOverflow = billTo.style.overflow;

    billTo.style.height = '2.8em';        // ~2 lines
    billTo.style.overflow = 'hidden';
    billTo.style.whiteSpace = 'pre-wrap';
    billTo.style.resize = 'none';
    billTo.style.lineHeight = '1.4';
    billTo.style.display = 'block';
    billTo.style.textAlign = 'left';

    // Trigger print
    window.print();

    // Revert style after printing
    setTimeout(() => {
      billTo.style.height = originalHeight;
      billTo.style.overflow = originalOverflow;
    }, 1000); // small delay to allow print dialog
  }





  useEffect(() => {
    monitorInternetConnection();

    document.getElementById("saveBtn").addEventListener("click", () => {
      if (navigator.onLine) {
        //saveInvoice();
         saveInvoice(); // save your invoice (e.g., to Google Sheet or DB)
         //downloadPDF();
   // window.print();      // then open the print dialog (you can save as PDF)
      } else {
        alert("No internet");
      }
    });

    fetchLatestInvoiceNumber();

    //get by Invoive Button dissable

    const input = document.getElementById("getinvoiceNumber");
    const button = document.getElementById("getByInvoice");

    console.log("btn:", button);

    if (button && input) {
      // Set initial style and disable button
      button.disabled = true;
      button.style.backgroundColor = "#ccc";
      button.style.cursor = "not-allowed";

      // Input event listener
      input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
          button.disabled = false;
          button.style.backgroundColor = "#0275d8";
          button.style.cursor = "pointer";
        } else {
          button.disabled = true;
          button.style.backgroundColor = "#ccc";
          button.style.cursor = "not-allowed";
        }
      });
    }


  }, []);

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="button-group">
        <button id="saveBtn"  disabled={!isSaveEnabled} >Save</button>
        <button class="no-print" onClick={printPage}>Print</button>

        <button onClick={downloadPDF}>Download Pdf</button>

        <label id="status" style={{ width: '100px' }}></label>
        {/* <button id="getAll" onClick={getAllInvoices}>Get All records</button> */}
      </div>



      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ margin: 0 }}>TAX INVOICE</h2>
          <p style={{ margin: 0, backgroundColor: 'lightgray', padding: '4px 10px', borderRadius: '4px', border: '1px solid #000' }}>
            ORIGINAL FOR RECIPIENT
          </p>
        </div>



        <div class="no-print" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            id="getinvoiceNumber"
            placeholder="ED/25-26/"
            style={{ width: '110px', padding: '4px' }}
            disabled={showControls} // disable after fetching
          />

          {!showControls && (
            <button
              id="getByInvoice"
              onClick={handleGetInvoice}
              style={{
                backgroundColor: '#0275d8',
                color: 'white',
                padding: '5px 10px'
              }}
            >
              Get By Invoice
            </button>
          )}

          {showControls && (
            <>
              {!isEditing ? (
                <button id="editButton"
                  onClick={handleEditClick}
                  style={{
                    backgroundColor: '#f0ad4e',
                    color: 'white',
                    padding: '5px 10px'
                  }}
                >
                  Edit
                </button>
              ) : (
                <button id="updateButton"
                  onClick={handleUpdateClick}
                  style={{
                    backgroundColor: '#5cb85c',
                    color: 'white',
                    padding: '5px 10px'
                  }}
                >
                  Update
                </button>
              )}

              <button id="cancelButton"
                onClick={handleCancelClick}
                style={{
                  backgroundColor: '#d9534f',
                  color: 'white',
                  padding: '5px 10px'
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>


      {/* Company Info */}
      <div className="container">
        <div className="left-div">
          <strong>ELECTRIC DRIVE</strong><br />
          <label id="companyAddress" style={{ fontSize: 13 }}>
            NEAR VISHAL SUPER MART, KISAN COLLAGE RD, PO+PS SOHSARAI, BIHAR SHARIF, NALANDA, 803118
          </label>

          <div className="contact-info">
            <div className="contact-item">
              <label>Mobile:</label>
              <label>9471696619 , 8825148565</label>
            </div>
            <div className="contact-item">
              <label>GSTIN:</label>
              <label>10KHYPD2397L1ZO</label>
            </div>
            <div className="contact-item">
              <label>Email:</label>
              <label id="email">evelectricdrive@gmail.com</label>
            </div>
            <div className="contact-item">
              <label>PAN Number:</label>
              <label>KHYPD2397L</label>
            </div>

          </div>
        </div>

        <div className="right-div">
          <div className="invoice-header">
            <div className="invoice-item">
              <label htmlFor="invoiceNumber" style={{ width: "123px" }}>Invoice No. :</label>
            </div>
            <div className="invoice-item">
              <input id="invoiceNumber" defaultValue="ED/25-26/001" disabled />

            </div>

          </div>

          <div className="invoice-inputs">

            <div className="invoice-item">
              <label htmlFor="invoiceDate">Date:</label>
            </div>
            <div className="invoice-item">
              <input type="date" id="invoiceDate" />
            </div>
          </div>
        </div>
      </div>

      {/* Bill To Info */}
      <div className="container" style={{
        marginTop: '20px',
        pointerEvents: isEditable ? 'auto' : 'none',
        opacity: isEditable ? 1 : 0.6,
        border: '1px solid #ccc',

        borderRadius: '5px',
      }}>
        <div className="left-div">
          <div className="contact-item">
            <label style={{ width: "65px" }}>Bill To: </label>
            {/* <textarea id="bill-to-address1"  style={{ width: "100%" }}  onChange={handleBillAddressChange}></textarea> */}
            {/* <textarea id="bill-to-address" style={{ width: "100%" }} value={billAddress} onChange={handleBillAddressChange} ></textarea> */}

              <textarea
        id="bill-to-address"
        style={{ width: "100%" }}
         value={billAddress}
        onChange={handleBillAddressChange}
      ></textarea>


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
          {/* <h2>Right Section (40%)</h2> */}
        </div>
      </div>

      <div id="details" className="container" style={{
        marginTop: '20px',
        pointerEvents: isEditable ? 'auto' : 'none',
        opacity: isEditable ? 1 : 0.6,
        border: '1px solid #ccc',

        borderRadius: '5px',
      }}>
        {/* <RateInput /> */}
        <RateInput initialData={fetchedInvoiceData} />
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
              IFSC Code: CBIN0284033<br />
              Account No: 5800208027<br />
              Bank: Central Bank of India, Kisan College BRANCH
            </td>
            <td style={{ width: "213px" }}>
              {/* <strong>Payment QR Code</strong><br />
              UPI ID: kumarvishvishal23@ybl<br />
              <img src="qr_placeholder.png" width="100" alt="QR Code" /> */}
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", textAlign: "left" }}>
              <strong>Terms and Conditions:</strong><br />
              1. Moter, Charger, Controller - One year Warranty, Battery – 15 Months Warranty. The responsibility of the warranty will be of the Company.<br />
              2. Goods once sold will not be taken back or exchanged.<br />
              3. All legal dispute shall not lie with Seller, Subject to Company jurisdiction only.<br />
              4. Home service is not available.

            </td>
            <td style={{ verticalAlign: "bottom", textAlign: "center", height: "100px",width: "213px" }}>
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
