import axios from "axios";

const API_URL = "http://localhost:8000/api"; // base API

export const getBanner = async () => {
  try {
    const response = await axios.get(`${API_URL}/banner`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};