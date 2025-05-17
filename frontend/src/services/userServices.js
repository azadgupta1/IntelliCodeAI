import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, message: "Failed to fetch profile" };
  }
};


export const updateUserProfile = async (token, avatarUrl, bio) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/profile`,
        { avatarUrl, bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: "Failed to update profile" };
    }
  };