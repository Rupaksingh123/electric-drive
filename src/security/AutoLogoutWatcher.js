// AutoLogoutWatcher.js
import AutoLogout from './AutoLogout';

const AutoLogoutWatcher = () => {
  //const {timeLeft } = AutoLogout(); // Default: 30s timeout
 const { timeLeft, refreshSession } = AutoLogout(); // ✅ use renamed hook
  const seconds = timeLeft !== null ? Math.ceil(timeLeft / 1000) : null;
//for test
const minutes = Math.floor(timeLeft / 1000/ 60);
const seconds1 = minutes % 60;


 const handleExtend = () => {
    const newLoginTime = Date.now(); // reset now
    localStorage.setItem('loginTime', newLoginTime.toString());
      refreshSession(); // ✅ call function to extend
    alert('Session extended by 15 minutes');
  };



  return (
    <>



    {console.log("timeLeft: " + minutes + "m " + seconds1 + "s")}
      {seconds !== null && seconds <= 60 && (
        <div className="text-red-500 text-center no-print">
          Session expires in {seconds} second{seconds !== 1 ? 's' : ''}.
          <button
        onClick={handleExtend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Extend Session by 15 Minutes
      </button>
        </div>
      )}
    </>
  );
};

export default AutoLogoutWatcher;
