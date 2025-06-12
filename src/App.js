import logo from './logo.svg';
import './App.css';
import RateInput from './RateInput'; // ⬅️ Import your new component

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

  
   return (
    <table>
      <tbody>
        <RateInput /> {/* ⬅️ Use your custom component */}
      </tbody>
    </table>
  );
}

export default App;
