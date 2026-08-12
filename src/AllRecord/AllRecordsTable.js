

import React, { useEffect, useState } from 'react';

const AllRecordsTable = () => {
//   BatteryNo: "dfbdbd"      , 'hsn', 'qty', 'rate','tax'
// ChassisNo: "gdfgdfg"  
// Gst: "10"
// MotorNo: "dfdfbd"
// amount: "600012.60"
// billAadhar: "jgjgj"
// billEmail: "dfgdfvd"
// billMobile: "53546"
// billPan: "dffhntujg"
// billTo: "dgdg"
// companyAddress: "NEAR VISHAL SUPER MART ,KISAN COLL. RD, PO+PS SOHSARAI, BIHAR SHARIF, NALANDA, 803118"
// email: "evelectricdrive@gmail.com"
// gstin: "10KHYPD2397L1ZO"
// hsn: "87116020"
// invoiceDate: "2025-05-30"
// invoiceNumber: "ED/25-26/-122"
// mobile: "8825148565"
// modelNo: "erterg"
// pan: "KHYPD2397L"
// qty: "1"
// rate: "545466"
// tax: "54546.60"



const columnHeaders = {
  invoiceNumber: "Invoice #",
  billTo: "Customer Name",
  Date: "Date",
  billMobile: "Mobile",
  billEmail: "Email",
  billPan: "PAN",
  billAadhar: "Aadhar",
  modelNo: "Model No",
  ChassisNo: "Chassis No",
  MotorNo: "Motor No",
  BatteryNo: "Battery No",
  ControllerNo: "Controller No",
  hsn: "HSN Code",
  qty: "Qty",
  rate: "Rate",
  Gst: "GST %",
  tax: "Tax ₹",
  amount: "Amount ₹",
  receivedAmount: "Received ₹",
  balanceAmount: "Balance ₹",
  companyAddress: "Company Address",
};




  const visibleColumns = ['invoiceNumber', 'billTo', 'Date', 'billMobile','billEmail','billPan','billAadhar', 'modelNo', 'ChassisNo', 'MotorNo','BatteryNo','ControllerNo', 'hsn', 'qty', 'rate','Gst','tax','amount','receivedAmount','balanceAmount','batterymonth'];
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedInvoice, setSelectedInvoice] = useState(null); //added

  const getWarrantyExpiry = (date, months) => {
  if (!date || !months) return "";

  const expiry = new Date(date);
  expiry.setMonth(expiry.getMonth() + Number(months));

  return expiry.toISOString().split("T")[0];
};

  //king
  // const API_URL =
  //"https://script.google.com/macros/s/AKfycbzwHKiRg0CTVtexeSmDdd6anwas2ahCmUvHObiFQVXeLiBTgrOSQkz3abolyjc37LZB6g/exec?mode=allrecords";
//Main 
//https://script.google.com/macros/s/AKfycbw6n8zK9bO9_0_uzhQKp0OFQh0TUyEkD1yET2S6g6ccEZKsX-vwvosQLhDC_zsDN2uYBg/exec
const API_URL =
    "https://script.google.com/macros/s/AKfycbzokwoC8MZSERYjvvje9gzQptZ52Nka7Fj1DdK581cUEixhrGMoYpNla9PWJh-ikpFa4g/exec?mode=allrecords";


  // useEffect(() => {
  //   const fetchInvoices = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();

  //       if (data.success) {
  //         console.log("All Invoices:", data.data);
  //         setRecords(data.data);
  //       } else {
  //         alert("No invoices found.");
  //         setRecords([]);
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       alert("Error fetching invoices.");
  //       setRecords([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchInvoices();
  // }, []);
  useEffect(() => {
  const fetchInvoices = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log("All Invoices:", data.data);

        const updatedRecords = data.data.map((record) => {
          let warrantyExpiry = "";
          let warrantyStatus = "";

          if (record.Date && record.batterymonth) {
            const expiryDate = new Date(record.Date);

            expiryDate.setMonth(
              expiryDate.getMonth() + Number(record.batterymonth)
            );

            warrantyExpiry = expiryDate.toISOString().split("T")[0];

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            expiryDate.setHours(0, 0, 0, 0);

            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(
              diffTime / (1000 * 60 * 60 * 24)
            );

            if (diffDays < 0) {
              warrantyStatus = "EXPIRED";
            } else if (diffDays <= 30) {
              warrantyStatus = "EXPIRING SOON";
            } else {
              warrantyStatus = "ACTIVE";
            }
          }

          return {
            ...record,
            warrantyExpiry,
            warrantyStatus,
          };
        });

        // Show warranty information in console
        console.log("===== WARRANTY DETAILS =====");

        updatedRecords.forEach((record) => {
          console.log({
            invoice: record["Invoice #"],
            customer: record["Customer Name"],
            invoiceDate: record.Date,
            warrantyMonths: record.batterymonth,
            warrantyExpiry: record.warrantyExpiry,
            warrantyStatus: record.warrantyStatus,
          });
        });

        console.log("============================");

        setRecords(updatedRecords);
      } else {
        alert("No invoices found.");
        setRecords([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error fetching invoices.");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  fetchInvoices();
}, []);

  return (
    <div className=" ml-0 p-4">
      <h2 className="text-2xl font-bold mb-4">All Invoices</h2>

      {loading ? (
        <p>Loading records...</p>
      ) : records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="overflow-x-auto border rounded shadow max-h-[80vh]">
       

{/* <table className="min-w-full">
  <thead>
    <tr>
      {visibleColumns.map((key) => (
        <th key={key} className="py-2 px-4 border-b text-left whitespace-nowrap">
          {columnHeaders[key] || key}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {records.map((record, index) => (
      <tr key={index}>
        {visibleColumns.map((key) => (
          <td key={key} className="py-2 px-4 border-b whitespace-nowrap">
          
             {key === "Date"
      ? new Date(record[key]).toISOString().split("T")[0] 
      : record[key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table> */}

<table className="min-w-full">
  <thead>
    <tr>
      {visibleColumns.map((key) => (
        <th key={key} className="py-2 px-4 border-b text-left whitespace-nowrap" style={{ width: "120px", minWidth: "90px", maxWidth: "120px" }}>
          {columnHeaders[key] || key}
        </th>
      ))}
    </tr>
  </thead>
 

{/* 
  <tbody>
  {records.map((record, index) => (
    <tr key={index}>
      {visibleColumns.map((key) => (
        <td
          key={key}
          className="py-2 px-4 border-b whitespace-nowrap"
        >
          {key === "Date"
            ? new Date(record[key]).toISOString().split("T")[0]
            : key === "batterymonth"
            ? record[key] !== null &&
              record[key] !== undefined &&
              record[key] !== ""
              ? `${record[key]} Months`
              : ""
            : record[key]}
        </td>
      ))}
    </tr>
  ))}
</tbody>  */}
<tbody>
  {records.map((record, index) => (
    <tr key={index}>
      {visibleColumns.map((key) => (
        <td
          key={key}
          className="py-2 px-4 border-b whitespace-nowrap"
        >
          {key === "Invoice #" ? (
            <button
              onClick={() => setSelectedInvoice(record)}
              className="text-blue-600 hover:underline font-semibold"
            >
              {record[key]}
            </button>
          ) : key === "Balance ₹" ? (
            <span
              className={`inline-block px-3 py-1 rounded-md font-semibold ${
                Number(record[key]) > 10
                  ? "bg-yellow-300 text-black"
                  : "bg-green-300 text-black"
              }`}
            >
              {record[key] ?? ""}
            </span>
          ) : key === "Date" ? (
            record[key]
              ? new Date(record[key]).toISOString().split("T")[0]
              : ""
          ) : key === "batterymonth" ? (
            record[key] !== null &&
            record[key] !== undefined &&
            record[key] !== ""
              ? `${record[key]} Months`
              : ""
          ) : (
            record[key] ?? ""
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>

</table>

{selectedInvoice && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setSelectedInvoice(null)}
  >
    <div
      className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Invoice Details
        </h2>

        <button
          onClick={() => setSelectedInvoice(null)}
          className="text-gray-500 hover:text-red-600 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Details */}
      <div className="space-y-2">
        {Object.entries(selectedInvoice).map(([key, value]) => (
          <div
            key={key}
            className="flex border-b py-2"
          >
            <div className="font-semibold w-1/3">
              {key}
            </div>

            <div className="w-2/3 break-words">
              {value !== null &&
              value !== undefined &&
              value !== ""
                ? String(value)
                : "-"}
            </div>
          </div>
        ))}
      </div>

      {/* Close */}
      <div className="mt-5 text-right">
        <button
          onClick={() => setSelectedInvoice(null)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        </div>
      )}
    </div>
  );
};

export default AllRecordsTable;
