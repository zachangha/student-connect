import Header from "../header.js";
import "../styles/zach.css";
import zachImage from "../images/zach.jpg";

function App() {
  return (
    <div className="container">
      <div className="about-me">
      <img src={zachImage} alt="Zach Angha" />
      <h1> Zach Angha </h1>
      <h2> Git Master </h2>
      
    </div>
    </div>
  );
}

export default App;
