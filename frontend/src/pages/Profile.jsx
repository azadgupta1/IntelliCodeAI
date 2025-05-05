import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/userServices";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
    setMessage(response.success ? "✅ Profile updated successfully!" : "❌ Failed to update profile.");
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Edit Profile</h2>

        {loading ? (
          <p className="text-gray-300 text-center">Loading...</p>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={profile.avatarUrl || "/default-avatar.png"}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
              />
            </div>

            <label className="text-gray-400 text-sm font-semibold mb-1 block">Avatar URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={profile.avatarUrl}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <label className="text-gray-400 text-sm font-semibold mb-1 block">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
            />

            {message && (
              <p className="text-center mb-4 text-sm text-green-400 font-medium">{message}</p>
            )}

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md"
              disabled={saving}
            >
              {saving ? "Saving..." : "💾 Save Changes"}
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md"
            >
              ⬅ Back to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
