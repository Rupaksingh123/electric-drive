

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//(maxSessionTime = 15 * 60 * 1000)
const AutoLogout = (maxSessionTime = 30 * 60 * 1000) => {
  const [timeLeft, setTimeLeft] = useState(null); // ms
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 🔁 trigger re-check
  const navigate = useNavigate();

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn || !loginTime) return;

    const interval = setInterval(() => {
     // const elapsed = Date.now() - Number(loginTime);
     const elapsed = Date.now() - Number(localStorage.getItem('loginTime')); // 👈 always read fresh value
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
  }, //[navigate, maxSessionTime]);
  [navigate, maxSessionTime, refreshTrigger]); // 👈 watch `refreshTrigger`


   const refreshSession = () => {
    const newLoginTime = Date.now();
    localStorage.setItem('loginTime', newLoginTime.toString());
    setRefreshTrigger((prev) => prev + 1); // 🔁 trigger interval to re-run
  };

  // return timeLeft;
  return { timeLeft, setTimeLeft,refreshSession  };
};

export default AutoLogout;
