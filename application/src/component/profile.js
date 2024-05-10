import React, { useState, useEffect } from "react";
import "./styles/profile.css";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Load profile picture URL for the logged-in user from localStorage
    const profileImageUrl = localStorage.getItem(
      `profileImageUrl_${user.username}`,
    );
    setImageUrl(profileImageUrl || user.profilePicture || "");
    setSelectedImage(profileImageUrl || user.profilePicture || "");
  }, [user.username]);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageUrlSubmit = async () => {
    try {
      const response = await fetch("/api/profile-picture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          imageUrl: imageUrl,
        }),
      });
      if (response.ok) {
        setSelectedImage(imageUrl);

        localStorage.setItem(`profileImageUrl_${user.username}`, imageUrl);
      } else {
        console.error("Failed to update profile picture:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <div className="profile-container">
        <div className="image-section">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Profile Picture"
              style={{
                objectFit: "cover",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
              }}
            />
          )}
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          <button onClick={handleImageUrlSubmit}>Update Profile Picture</button>
          <h1>Role: {user.role}</h1>
        </div>

        <div className="user-info-container">
          <div className="user-info-box">
            <h1>Username: {user.username}</h1>
          </div>
          <div className="user-info-box">
            <h1>Email: {user.email}</h1>
          </div>
          <div className="user-info-box">
            <h1>Pronouns: {user.pronouns}</h1>
          </div>
          <div className="user-info-box">
            <h1>Karma points: {user.karmaPoints}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
