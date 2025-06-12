import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



let toastIntervalId = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";
}

function hideToast() {
  const toast = document.getElementById("toast");
  toast.style.display = "none";
}

function monitorInternetConnection() {
  if (!navigator.onLine) {
    showToast("❌ No Internet Connection");
    toastIntervalId = setInterval(() => {
      if (!navigator.onLine) {
        showToast("❌ Still offline. Please connect to the internet.");
      } else {
        clearInterval(toastIntervalId);
        showToast("✅ Internet connection restored!");
        setTimeout(hideToast, 3000); // hide after 3 seconds
      }
    }, 5000);
  }

  window.addEventListener("offline", () => {
    if (!toastIntervalId) {
      showToast("❌ You are offline.");
      toastIntervalId = setInterval(() => {
        if (navigator.onLine) {
          clearInterval(toastIntervalId);
          toastIntervalId = null;
          showToast("✅ Internet reconnected!");
          setTimeout(hideToast, 3000);
        } else {
          showToast("❌ Still offline. Please connect.");
        }
      }, 5000);
    }
  });

  window.addEventListener("online", () => {
    if (toastIntervalId) {
      clearInterval(toastIntervalId);
      toastIntervalId = null;
      showToast("✅ Internet is back!");
      setTimeout(hideToast, 2000);
    }
  });
}

// Run on page load
window.addEventListener("load", monitorInternetConnection);
window.addEventListener("load", fetchLatestInvoiceNumber);


document.getElementById("saveBtn").addEventListener("click", function () {
  console.log(" toastIntervalId : " +toastIntervalId);
  if (toastIntervalId == null) {
    // Your code here
   console.log(" toastIntervalId !== null - " +toastIntervalId !== null);
    saveInvoice();
  }else{
    console.log(" toastIntervalId !== null - " +toastIntervalId !== null);
    alert("No internet");
  }
});

document.getElementById("getAll").addEventListener("click", getAllInvoices);
document.getElementById("getByInvoice").addEventListener("click", fetchByInvoice);
 document.getElementById("qty").addEventListener("change", function () {
    recalculate();
  });


    //  https://script.google.com/macros/s/AKfycbzHvwNyP_yB8MdEI3rEA8T__0RI-EdIJMXVjjg3jxhbgosftF8t3sHnnqJKvOGo8E9GjA/exec

//     function saveInvoice() {

//       const invoiceData = {
//         companyAddress: "NEAR VISHAL SUPER MART ,KISAN COLL. RD, PO+PS SOHSARAI, BIHAR SHARIF, NALANDA, 803118",
//         // gstin: document.getElementById('gstin').value,
//         gstin: "10KHYPD2397L1ZO",
//         mobile: "8825148565",
//         pan: "KHYPD2397L",
//         email: "evelectricdrive@gmail.com",
//         invoiceNumber: document.getElementById('invoiceNumber').value,
//         invoiceDate: document.getElementById('invoiceDate').value,
//         billTo: document.getElementById('bill-to-address').value,
//         billMobile: document.getElementById('bill-mobile').value,
//         billPan: document.getElementById('bill-pan').value,
//         billEmail: document.getElementById('bill-email').value,
//         billAadhar: document.getElementById('bill-aadhar').value,
//         modelNo: document.getElementById('model-no').value,
//         ChassisNo: document.getElementById('chassis-no').value,
//         MotorNo: document.getElementById('motor-no').value,
//         BatteryNo: document.getElementById('battery-no').value,
//         hsn: document.getElementById('hsn').value,
//         qty: document.getElementById('qty').value,
//         rate: document.getElementById('rate').value,
//         Gst : document.getElementById('gst').value,
//         tax: document.getElementById('tax').value,
//         amount: document.getElementById('amount').value,
//         // total: document.getElementById('total').value,
//         // received: document.getElementById('received').value,
//         // balance: document.getElementById('balance').value,
//         // taxable: document.getElementById('taxable').value,
//         // cgst: document.getElementById('cgst').value,
//         // sgst: document.getElementById('sgst').value,
//         // taxTotal: document.getElementById('taxTotal').value,
//         // inWords: document.getElementById('inWords').value
//       };
// //  modelNo,ChassisNo,MotorNo,BatteryNo,hsnqty,rate,Gst ,tax,amount,
//       console.log(invoiceData);

//       localStorage.setItem('invoice', JSON.stringify(invoiceData));
//       // fetch('https://script.google.com/macros/s/AKfycbw4XGZHhQTwSUQ3eoflrQ8Hb8ZBr4OuuOksl0IIb7_s2ki79FnbZRrdbsQjAA4hVdqRDg/exec',{
//       //   method:"POST",
//       //   body:invoiceData
//       // }).then(res =>res.text()).then(invoiceData =>console.log("in fetch : "+invoiceData));

//       // fetch("https://script.google.com/macros/s/AKfycbyyJUOWzGUizuz2e0BZfcuoFzC3HVrRtjE6ViVVk2mYCdfelHaYt-bDSpCegSjVdoaWDA/exec", {
//       // fetch("https://script.google.com/macros/s/AKfycbwI94Tv7HIf4c3noYpgIa3R3IyLLwJXsnlhWvXzYqfi3pRd6N6IsBOjTcWrK9GDUg5wKg/exec", {
//       //   method: "POST",
//       //   mode: "cors",
//       //   headers: {
//       //     "Content-Type": "application/x-www-form-urlencoded"
//       //   },
//       //   body: new URLSearchParams({
//       // // companyName:"ELECTRIC DRIVE",
//       // //     companyAddress: invoiceData.companyAddress

//       //     //     gstin:invoiceData.gstin,
//       //     //      mobile:invoiceData.mobile ,
//       //     //      pan: invoiceData.pan,
//       //     //      email:invoiceData.email ,


//       //     // invoiceNumber: invoiceData.invoiceNumber,
//       //     // invoiceDate:invoiceData.invoiceDate
//       //     name:"Rupak",
//       //     amount:"1002"
//       //   })
//       // })
//       // .then(res => res.json())
//       // .then(data => console.log(data))
//       // .catch(err => console.error("Error:", err));

//       fetch("https://script.google.com/macros/s/AKfycbyCRGKqb0Byd6d7PXBM3NHYiPHkes5bupz4lBcPK-cnX736Xpm0rAF3OH79j1vjQ9HpKw/exec", {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: new URLSearchParams({
//           name: "Rupak",
//           //amount: "1002",
//           gstin: invoiceData.gstin,
//           mobile: invoiceData.mobile,
//           pan: invoiceData.pan,
//           email: invoiceData.email,


//           invoiceNumber: invoiceData.invoiceNumber,
//           invoiceDate: invoiceData.invoiceDate,

//           billTo: invoiceData.billTo,
//           billMobile: invoiceData.billMobile,
//           billPan: invoiceData.billPan,
//           billEmail: invoiceData.billEmail,
//           billAadhar: invoiceData.billAadhar,

//            modelNo :invoiceData. modelNo,
//            ChassisNo :invoiceData.ChassisNo ,
//            MotorNo :invoiceData.MotorNo ,
//            BatteryNo :invoiceData.BatteryNo ,
//            hsn:invoiceData.hsn,
//            qty :invoiceData.qty ,
//            rate :invoiceData.rate ,
//            Gst :invoiceData.Gst  ,
//            tax :invoiceData.tax ,
//            amount :invoiceData.amount ,


//         })
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log("Response from server:", data);
//         })
//         .catch(error => {
//           console.error("Error:", error);
//         });




//       alert('Invoice saved locally.');
//     }

function saveInvoice() {
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
    modelNo: document.getElementById('model-no').value,
    ChassisNo: document.getElementById('chassis-no').value,
    MotorNo: document.getElementById('motor-no').value,
    BatteryNo: document.getElementById('battery-no').value,
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
}

// fetchInvoice("ED/25-26/-127");
function fetchByInvoice() {
  console.log("in fetcByInvoice");
  let invoiceNumber = document.getElementById("invoiceNumber").value;
  console.log("Fetched invoice invoiceNumber :", invoiceNumber);
  fetch(`https://script.google.com/macros/s/AKfycbxOJRcuQ7O8eYHlSZGwukrNXMikcxCc1kLny_sqbNzgCqgrmhVP1ptJcD_3RmBqHSDkOg/exec?invoiceNumber=${encodeURIComponent(invoiceNumber)}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("Invoice Data:", data.data);
      } else {
        console.warn("Not found:", data.message);
      }
    })
    .catch(err => {
      console.error("Error fetching invoice:", err);
    });
}


function getAllInvoices() {
  console.log("in get All records");
    const url = "https://script.google.com/macros/s/AKfycbxOJRcuQ7O8eYHlSZGwukrNXMikcxCc1kLny_sqbNzgCqgrmhVP1ptJcD_3RmBqHSDkOg/exec?mode=allrecords";

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (data.success) {
          console.log("All Invoices:", data.data);
          // Optional: Render the data in a table
          //renderInvoices(data.data);
        } else {
          alert("No invoices found.");
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        alert("Error fetching invoices.");
      });
  }


//   function fetchLatestInvoiceNumber() {
//   fetch("https://script.google.com/macros/s/AKfycbxOJRcuQ7O8eYHlSZGwukrNXMikcxCc1kLny_sqbNzgCqgrmhVP1ptJcD_3RmBqHSDkOg/exec?mode=latest")
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.success && data.latestInvoiceNumber) {
//         console.log("Latest Invoice Number:", data.latestInvoiceNumber);
//         // Example: set the invoice number input value
//         document.getElementById("invoiceNumber").value = data.latestInvoiceNumber;
//       } else {
//         alert("No invoice number found.");
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching latest invoice number:", error.message);
//       alert("Failed to fetch latest invoice number: " + error.message);
//     });
// }



function fetchLatestInvoiceNumber(){
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
}


    function recalculate(input) {
      console.log("in recalculate : "+ input);
      const row = input.closest('tr');
      const qty = parseFloat(row.querySelector('.qty').value) || 0;
      const rate = parseFloat(row.querySelector('.rate').value) || 0;
      const gstPercent = parseFloat(row.querySelector('.gst').value) || 0;
      const gsthalfrate = gstPercent / 2;
      const baseAmount = qty * rate;
      const halfGST = (baseAmount * (gstPercent / 2)) / 100;
      console.log("half gst " + halfGST + " , Gst %" + (gstPercent / 2) + " value " + gsthalfrate);
      const tax = (baseAmount * gstPercent) / 100;
      const amount = baseAmount + tax;

      row.querySelector('.tax').value = tax.toFixed(2);
      row.querySelector('.amount').value = amount.toFixed(2);

      //below tax fields  based on above
      document.getElementById('taxable').value = baseAmount.toFixed(2);
      document.getElementById('cgst').value = halfGST.toFixed(2);
      document.getElementById('sgst').value = halfGST.toFixed(2);
      document.getElementById('taxTotal').value = tax.toFixed(2);


      document.getElementById('cgst-rate').value = gsthalfrate;
      document.getElementById('sgst-rate').value = gsthalfrate;
      updateGrandTotal();
    }

    function updateRowNumbers() {
      const rows = document.querySelectorAll("#itemTable tbody tr");
      rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1;
      });
    }


    //updating
    function updateGrandTotal() {
      const amounts = document.querySelectorAll('.amount');
      let total = 0;
      amounts.forEach(input => {
        total += parseFloat(input.value) || 0;
      });
      document.getElementById('grandTotal').value = total.toFixed(2);
      updateBalance(); // 🔄 Update balance when grand total changes
      console.log("amount ;" + amounts + " , total" + total);
      document.getElementById('inWords').innerText = numberToWords(total);

    }


    function updateBalance() {
      console.log()
      const total = parseFloat(document.getElementById('grandTotal').value) || 0;
      const received = parseFloat(document.getElementById('receivedAmount').value) || 0;
      const balance = total - received;
      console.log("total : " + total + " , recived " + received + " , bala : " + balance);
      document.getElementById('balanceAmount').value = balance.toFixed(2);
    }

    //convert grandamout in word
    function numberToWords(num) {
      const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
        'Seventeen', 'Eighteen', 'Nineteen'
      ];
      const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

      function inWords(n) {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
        if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + inWords(n % 100) : '');
        if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + inWords(n % 1000) : '');
        if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + inWords(n % 100000) : '');
        return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + inWords(n % 10000000) : '');
      }

      const rounded = Math.floor(num);
      let words = inWords(rounded) + ' Rupees';

      return words + ' Only';
    }

