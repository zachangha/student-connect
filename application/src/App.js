import "./about.css";

import { browserRouter, routes, route, BrowserRouter } from "react-router-dom";

import { about } from "./pages/about";
import { home } from "./pages/home";
import { person1 } from "./pages/person1";

function App() {
  return (
    <div>
      <browserRouter>
        <routes>
          <route index element={<home />}></route>
        </routes>
      </browserRouter>
    </div>
  );
}

export default App;
