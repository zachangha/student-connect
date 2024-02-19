import Header from "../header.js";
import lukeImage from "..images/luke.jpg"

function App() {
  return (
    <div className="bigBox">
      <div className="aboutMe">
      <img src={lukeImage} alt="Luke Thilgen" /> 
      <h1> Luke Thilgen </h1>
      <h2> Back End Lead </h2>
      </div>
    </div>
  );
}

export default App;
