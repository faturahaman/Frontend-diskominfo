// src/api/menuApi.js

// Definisikan URL base dari API Laravel Anda.
const API_BASE_URL = 'http://127.0.0.1:8000/api';


export const getMenus = () => { // <-- Pastikan 'export' dan nama 'getMenus' sudah benar
  return fetch(`${API_BASE_URL}/menus`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari server.');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Terjadi masalah saat mengambil data menu:', error);
      return [];
    });
};