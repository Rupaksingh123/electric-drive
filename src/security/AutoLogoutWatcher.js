// AutoLogoutWatcher.js
import AutoLogout from './AutoLogout';

const AutoLogoutWatcher = () => {
  const timeLeft = AutoLogout(); // Default: 30s timeout

  const seconds = timeLeft !== null ? Math.ceil(timeLeft / 1000) : null;
//for test
const minutes = Math.floor(timeLeft / 1000/ 60);
const seconds1 = minutes % 60;




  return (
    <>
    {console.log("timeLeft: " + minutes + "m " + seconds1 + "s")}
      {seconds !== null && seconds <= 15 && (
        <div className="text-red-500 text-center no-print">
          Session expires in {seconds} second{seconds !== 1 ? 's' : ''}.
        </div>
      )}
    </>
  );
};

export default AutoLogoutWatcher;
