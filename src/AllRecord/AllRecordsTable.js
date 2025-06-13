

import React, { useEffect, useState } from 'react';

const AllRecordsTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://script.google.com/macros/s/AKfycbxOJRcuQ7O8eYHlSZGwukrNXMikcxCc1kLny_sqbNzgCqgrmhVP1ptJcD_3RmBqHSDkOg/exec?mode=allrecords";

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
    <div className="p-4 sm:p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-4">All Invoices</h2>

      {loading ? (
        <p>Loading records...</p>
      ) : records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="overflow-x-auto border rounded shadow max-h-[80vh]">
          <table className="w-full table-auto bg-white border border-gray-300">
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
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRecordsTable;
