import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import Home from "./home";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/members/collins">Collins</Link>
          </li>
          <li>
            <Link to="/members/kao">kao</Link>
          </li>
          <li>
            <Link to="/members/luke">luke</Link>
          </li>
          <li>
            <Link to="/members/salvador">salvador</Link>
          </li>
          <li>
            <Link to="/members/sean">sean</Link>
          </li>
          <li>
            <Link to="/members/zach">zach</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
