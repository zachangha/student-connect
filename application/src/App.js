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
import V2Nav from "./component/v2Nav.js";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <Router>
      <ThemeProvider theme={themes}>
        <V2Nav />
      </ThemeProvider>
      <RoutesWrapper />
    </Router>
  );
}

// Create a theme instance.
const themes = createTheme({
  palette: {
    primary: {
      main: "#556cd6", // A blue shade
    },
    secondary: {
      main: "#19857b", // A teal shade
    },
    error: {
      main: "#ff1744", // A red shade
    },
    background: {
      default: "#fff", // White background by default
      paper: "#f5f5f5", // Light grey for paper elements
    },
  },
  typography: {
    fontFamily: ['"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
    h1: {
      fontSize: "2.2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    // Customizing MUI components globally
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners for buttons
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#556cd6", // Matching the primary color
        },
      },
    },
  },
});

function RoutesWrapper() {
  const location = useLocation();
  const authRoutes = ["/login", "/register"];

  return (
    <>
      {/* {!authRoutes.includes(location.pathname) && <Navbar />} */}
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
