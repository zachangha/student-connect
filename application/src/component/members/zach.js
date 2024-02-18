import "../styles/aboutMe.css";
import zachImage from "../images/zach.jpg";

function App() {
  return (
    <div className="aboutContainer">
      <div className="about-me">
        <img src={zachImage} alt="Zach Angha" />
        <h1> Zach Angha </h1>
        <h2> Git Master </h2>
      </div>
    </div>
  );
}

export default App;
