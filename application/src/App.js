import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./component/about";
import Home from "./component/home";
import Person1 from "./component/person1";
import Navbar from "./component/navbar";

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap your entire application with Router */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/person1" element={<Person1 />} />
      </Routes>
    </Router>
  );
}

export default App;
