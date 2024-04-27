import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Landing from "./component/landingPage.js";
import Home from "./component/home.js";
import About from "./component/about.js";
import Login from "./component/login.js";
import Register from "./component/register.js";
import Messages from "./component/messages.js";
import Profile from "./component/profile.js";
import Classes from "./component/classes.js";
import Footer from "./component/footer.js";
import Questions from "./component/QA.js";
import AddClasses from "./component/addClasses.js";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./component/layout.js";

function App() {
  return (
    <Router>
      <ThemeProvider theme={ourTheme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />{" "}
            <Route path="Home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addClasses" element={<AddClasses />} />
            <Route path="classes" element={<Classes />} />
            <Route path="questions" element={<Questions />} />
            <Route path="members/:memberName" element={<MemberPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

const ourTheme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#fff",
      paper: "#f5f5f5",
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#556cd6",
        },
      },
    },
  },
});

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
