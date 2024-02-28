import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./component/home.js";
import Navbar from "./component/navbar.js";
import About from "./component/about.js";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members/:memberName" element={<MemberPage />} />
        <Route path="/about" element={<About />} />{" "}
      </Routes>
    </Router>
  );
}

function MemberPage() {
  const { memberName } = useParams();
  const MemberComponent = React.lazy(() =>
    import(`./component/members/${memberName}`)
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemberComponent />
    </React.Suspense>
  );
}

export default App;
