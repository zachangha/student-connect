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
import AITutor from "./component/aiTutor.js";
import Profile from "./component/profile.js";
import Classes from "./component/classes.js";
import Footer from "./component/footer.js";
import Questions from "./component/qa.js";
import Reply from "./component/reply.js";
import AddClasses from "./component/addClasses.js";
import Course from "./component/course.js";
import Announcement from "./component/announcement.js";
import AnnouncementView from "./component/announcementview.js";
import QAView from "./component/qaview.js";
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
            <Route path="aiTutor" element={<AITutor />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addClasses" element={<AddClasses />} />
            <Route path="classes" element={<Classes />} />
            <Route path="QA" element={<Questions />} />
            <Route path="reply" element={<Reply />} />
            <Route path="members/:memberName" element={<MemberPage />} />
            <Route path={"course/:courseID"} element={<Course />} />
            <Route
              path={"course/:courseID/announcement"}
              element={<Announcement />}
            />
            <Route path={"course/:courseID/QA"} element={<Questions />} />
            <Route
              path={"course/:courseID/reply/:forumID"}
              element={<Reply />}
            />
            <Route
              path={"course/:courseID/view/:forumID"}
              element={<AnnouncementView />}
            />
            <Route
              path={"course/:courseID/viewQuestion/:forumID"}
              element={<QAView />}
            />
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
  const MemberComponent = React.lazy(
    () => import(`./component/members/${memberName}`),
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemberComponent />
    </React.Suspense>
  );
}

export default App;
