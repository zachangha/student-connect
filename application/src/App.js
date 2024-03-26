import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router-dom";
import Home from "./component/home.js";
import Navbar from "./component/navbar.js";
import About from "./component/about.js";
import Login from "./component/login.js";
import Register from "./component/register.js";
import Messages from "./component/messages.js";
import Profile from "./component/profile.js";
import Classes from "./component/classes.js";
import Footer from "./component/footer.js";

function App() {
  return (
    <Router>
      <RoutesWrapper />
    </Router>
  );
}

function RoutesWrapper() {
  const location = useLocation();
  const authRoutes = ["/login", "/register"];

  return (
    <>
      {!authRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members/:memberName" element={<MemberPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
      {!authRoutes.includes(location.pathname) && <Footer />}
    </>
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
