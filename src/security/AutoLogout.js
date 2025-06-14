// // src/security/AutoLogout.js

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AutoLogout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loginTime = localStorage.getItem('loginTime');
//     const isLoggedIn = localStorage.getItem('isLoggedIn');

//     if (isLoggedIn && loginTime) {
//       const now = Date.now();
//       const sessionDuration = now - parseInt(loginTime);
//       const maxSession = 1 * 60 * 1000; // 15 minutes  min/sec/ms

//       if (sessionDuration > maxSession) {
//         // Expired: clear and redirect
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('loginTime');
//         //alert('Session expired. You have been logged out.');
//         // navigate('/login');
//          navigate('/login?sessionExpired=true');
//       } else {
//         // Still active: set timeout for remaining time
//         const timeout = setTimeout(() => {
//           localStorage.removeItem('isLoggedIn');
//           localStorage.removeItem('loginTime');
//           alert('Session expired. You have been logged out.');
//           navigate('/login');
//         }, maxSession - sessionDuration);

//         return () => clearTimeout(timeout);
//       }
//     }
//   }, []);

//   return null; // Nothing rendered
// };

// export default AutoLogout;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//(maxSessionTime = 15 * 60 * 1000)
const AutoLogout = (maxSessionTime = 30 * 1000) => {
  const [timeLeft, setTimeLeft] = useState(null); // ms
  const navigate = useNavigate();

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn || !loginTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - Number(loginTime);
      const remaining = maxSessionTime - elapsed;
      setTimeLeft(remaining);

      // If expired, logout and redirect
      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
        navigate('/login?sessionExpired=true');
      }
    }, 1000); // update every 1s

    return () => clearInterval(interval);
  }, [navigate, maxSessionTime]);

  return timeLeft;
};

export default AutoLogout;
