import axios from "axios";
const BASE_URL = "http://localhost:3000";

export const getUnreadNotifications = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/notification/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    return [];
  }
};

export const markNotificationsRead = async (userId) => {
  try {
    await axios.post(`${BASE_URL}/api/notification/mark-read/${userId}`);
  } catch (err) {
    console.error("Failed to mark notifications as read:", err);
  }
};
