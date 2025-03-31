import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/userServices";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState({ avatarUrl: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");

      const response = await fetchUserProfile(token);
      if (response.success) {
        setProfile({ avatarUrl: response.user.avatarUrl, bio: response.user.bio });
      }
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await updateUserProfile(token, profile.avatarUrl, profile.bio);
    if (response.success) {
      setMessage("Profile updated successfully!");
    } else {
      setMessage("Failed to update profile.");
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={profile.avatarUrl || "/default-avatar.png"}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-2 border-gray-300"
              />
            </div>

            <label className="block mb-2 text-sm font-medium">Avatar URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={profile.avatarUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            {message && <p className="text-green-500 text-center mb-2">{message}</p>}

            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
