// services/aksesCepatService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api"; // base API

export const getAksesCepat = async () => {
  try {
    const response = await axios.get(`${API_URL}/akses-cepat`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
