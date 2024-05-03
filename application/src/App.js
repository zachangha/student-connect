import React, { createContext, useState } from "react";
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
import AITutor from "./component/aiTutor.js";
import Profile from "./component/profile.js";
import Classes from "./component/classes.js";
import Footer from "./component/footer.js";
import AddClasses from "./component/addClasses.js";
import Course from "./component/course.js";
import Announcement from "./component/announcement.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./component/layout.js";

// Context for user authentication
const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // if users are not logged in they will not have access to all the routes and will be given a
  // blank page
  return (
    <Router>
      <ThemeProvider theme={ourTheme}>
        <AuthContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              {user ? (
                <>
                  {/* Routes available only to authenticated users */}
                  <Route path="home" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="aiTutor" element={<AITutor />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="addClasses" element={<AddClasses />} />
                  <Route path="classes" element={<Classes />} />
                  <Route path="members/:memberName" element={<MemberPage />} />
                  <Route path="course/:courseID" element={<Course />} />
                </>
              ) : (
                <>
                  {/* Publicly accessible routes */}
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="about" element={<About />} />
                </>
              )}
            </Route>
          </Routes>
          <Footer />
        </AuthContext.Provider>
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
