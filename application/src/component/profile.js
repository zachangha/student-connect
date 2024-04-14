// import React from "react";
// import "./styles/homePage.css";
// import { Button, TextField } from "@mui/material";

// function App() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="bigBox">
//       {user && (
//         <div>
//           <h1>Username: {user.username}</h1>
//           <h1>Email: {user.email}</h1>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import "./styles/profile.css";


function getRandomColor() {
 const letters = '0123456789ABCDEF';
 let color = '#';
 for (let i = 0; i < 6; i++) {
   color += letters[Math.floor(Math.random() * 16)];
 }
 return color;
}


function stringAvatar(name) {
 return {
   sx: {
     bgcolor: getRandomColor(),
     width: '30vw',
     height: '30vw',
     position: 'fixed',
     transform: 'translate(50%, 30%)', // Center the avatar
     right: '0)', // Position at right with offset
     bottom: '0)', // Position at bottom with offset
   },
   children: name.charAt(0).toUpperCase(), // Get first letter and uppercase
 };
}




function BackgroundLetterAvatars({ userResponse }) {
 const [userName, setUserName] = useState(''); // State for user name


 useEffect(() => {
   if (userResponse) {
     const firstLetter = userResponse.firstName ? userResponse.firstName.charAt(0).toUpperCase() : '';
     setUserName(firstLetter);
   }
 }, [userResponse]); // Update state when userResponse changes
 const user = JSON.parse(localStorage.getItem("user"));
 return (
  
   <Stack>
     <Avatar {...stringAvatar(userName)} />
     <div className="userprof">
     <h1>Username: {user.username}</h1>
     </div>
     <div className="userprof1">
     <h1>Email: {user.email}</h1>
     </div>
     <div className="userprof2">
     <h1>Pronouns:  {user.pronouns}</h1>
     </div>
     <div className="userprof3">
     <h1>Role: {user.role}</h1>
     </div>
     <div className="userprof4">
     <h1>Classes:</h1>
     </div>
   </Stack>
 
 );
}
// function whatever() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="userpro">
//       <div className="user-info-container"></div>
//       {user && (
//         <div>
//           <h1>Username: {user.username}</h1>
//           <h1>Email: {user.email}</h1>
//         </div>
//       )}
//     </div>
//   );
// }


// function App() {
//   const user = JSON.parse(localStorage.getItem("user"));


//   return (
//     <div className="bigBox">
//       {user && (
//         <div>
//           <h1>Username: {user.username}</h1>
//           <h1>Email: {user.email}</h1>
//         </div>
//       )}
//     </div>
//   );
// }


export default BackgroundLetterAvatars;
