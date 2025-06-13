

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
  const visibleColumns = ['invoiceNumber', 'billTo', 'Date', 'billMobile','billEmail','billPan','billAadhar', 'modelNo', 'ChassisNo', 'MotorNo','BatteryNo', 'hsn', 'qty', 'rate','tax','companyAddress'];
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://script.google.com/macros/s/AKfycbyp3YkUdeHVKlHfsT9c6s5oIhNwgEGramHRwExXsV9uqsyfThLy_29Q_RMIwL6BAGViSg/exec?mode=allrecords";

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
          setRecords(data.data);
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
          {/* <table className="w-full table-auto bg-white border border-gray-300">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {Object.keys(records[0]).map((key) => (
                  <th key={key} className="py-2 px-4 border-b text-left whitespace-nowrap">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(record).map((val, i) => (
                    <td key={i} className="py-2 px-4 border-b whitespace-nowrap">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> */}



<table className="min-w-full">
  <thead>
    <tr>
      {visibleColumns.map((key) => (
        <th key={key} className="py-2 px-4 border-b text-left whitespace-nowrap">
          {key}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {records.map((record, index) => (
      <tr key={index}>
        {visibleColumns.map((key) => (
          <td key={key} className="py-2 px-4 border-b whitespace-nowrap">
            {record[key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


        </div>
      )}
    </div>
  );
};

export default AllRecordsTable;
