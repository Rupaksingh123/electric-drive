// AutoLogoutWatcher.js
import AutoLogout from './AutoLogout';

const AutoLogoutWatcher = () => {
  const timeLeft = AutoLogout(); // Default: 30s timeout

  const seconds = timeLeft !== null ? Math.ceil(timeLeft / 1000) : null;

  return (
    <>
      {seconds !== null && seconds <= 15 && (
        <div className="text-red-500 text-center no-print">
          Session expires in {seconds} second{seconds !== 1 ? 's' : ''}.
        </div>
      )}
    </>
  );
};

export default AutoLogoutWatcher;
