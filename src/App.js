// import logo from "./logo.svg";
import "./App.css";
import VgForm from "./components/VgForm/VgForm.tsx";
// import $ from "jquery";

// Import your local Select2 file after jQuery is set
// import "./utils/select2_4.0.js"; // Adjust the path based on App.js location

function App() {
  // Attach jQuery to the global scope
  // window.jQuery = $;
  // window.$ = $;

  return (
    <div className="App">
      <VgForm />
    </div>
  );
}

export default App;