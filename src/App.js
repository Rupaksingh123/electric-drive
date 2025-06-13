
// import React, { useEffect, useState } from 'react';

// import AllRecordsTable from './AllRecord/AllRecordsTable';
// import Homepage from './Home/HomePage';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// function App() {
//   const [toast, setToast] = useState('');
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const updateConnection = () => {
//       setIsOnline(navigator.onLine);
//       if (!navigator.onLine) setToast("❌ You are offline");
//       else {
//         setToast("✅ Internet is back");
//         setTimeout(() => setToast(''), 2000);
//       }
//     };

//     window.addEventListener("online", updateConnection);
//     window.addEventListener("offline", updateConnection);
//     updateConnection(); // on load

//     return () => {
//       window.removeEventListener("online", updateConnection);
//       window.removeEventListener("offline", updateConnection);
//     };
//   }, []);



//  return (
//     <Router>
//       <div className="p-4 space-x-4">
//         {/* Navigation Links */}
//         <Link to="/" className="text-blue-600" className="no-print">Home</Link>
//         <Link to="/all-records" className="text-blue-600" className="no-print" >All Records</Link>
//       </div>

//       {/* Toast Message */}
//      {toast && <div id="toast" className="no-print">{toast}</div>}

//       {/* Route Views */}
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/all-records" element={<AllRecordsTable />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Home/HomePage';
import AllRecordsTable from './AllRecord/AllRecordsTable';
import LoginPage from './Home/LoginPage';
import ProtectedRoute from './Home/ProtectedRoute'; // This assumes you created ProtectedRoute.js
import './App.css';

function App() {
  const toast = null; // or your toast logic here

  return (
    <Router>
      <div className="p-4 space-x-4">
        {/* Navigation Links */}
        <Link to="/" className="text-blue-600 no-print">Home</Link>
        <Link to="/all-records" className="text-blue-600 no-print">All Records</Link>
      </div>

      {/* Toast Message */}
      {toast && <div id="toast" className="no-print">{toast}</div>}

      {/* Route Views */}
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-records"
          element={
            <ProtectedRoute>
              <AllRecordsTable />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
