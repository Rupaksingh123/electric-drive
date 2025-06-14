import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();




const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxvKm5b9J0qszWGTp5YZjqD7f10AyJ_4xh2xNC4rtIHWM1jg6KXiEQ-AFOKBLOnGI0cNw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode: 'login',
        username: username,
        password: password
      })
    });

    const data = await response.json(); // Parse the response as JSON

    console.log("Login response:", data); // ✅ Logs response from Apps Script

    if (data.success) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginTime',Date.now().toString());
      navigate('/');
    } else {
      console.log("Login failed:", data.message);
      setError('Invalid username or password');
    }

  } catch (err) {
    console.error("Fetch error:", err);
    setError('Login failed. Try again.');
  }
};




  return (
    // <div className="p-8 max-w-md mx-auto">
    //   <h2 className="text-2xl font-bold mb-4">Login</h2>
    //   <form onSubmit={handleLogin} className="space-y-4">
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       className="border p-2 w-full"
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       className="border p-2 w-full"
    //       required
    //     />
    //     <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
    //     {error && <p className="text-red-500">{error}</p>}
    //   </form>
    // </div>


  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
    <div style={{border: '1px solid green',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',padding: '30px',borderRadius: '10px',backgroundColor: 'white',color: 'green',fontSize: '20px',fontWeight: 'bold'}}>
    <h2 class="text-2xl font-bold mb-4">Login</h2>
     {/* <form class="space-y-4">
      <input placeholder="Username" class="border p-2 w-full" required="" type="text" value="" />
      <input
           type="password"
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           className="border p-2 w-full"
           required
         />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2">Login</button>
      </form> */}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div></div>
 


  );
};

export default LoginPage;
