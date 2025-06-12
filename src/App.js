import logo from './logo.svg';
import './App.css';

function App() {
  // return (
  //   <div className="App">
  //     {/* <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header> */}
  //   </div>
  // );


   // Step 1: Function that will be called when input changes
  const recalculate = (e) => {
    const value = e.target.value;
    console.log("Input value:", value);  // Step 2: Show in console
    alert("You typed: " + value);        // Optional: Show alert
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enter Quantity:</h2>
      
      {/* Step 3: Input field with onChange handler */}
      <input
        type="number"
        className="qty"
        id="qty"
        defaultValue={1}
        onChange={recalculate}
      />
    </div>
  );

}

export default App;
