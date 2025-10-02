import axios from 'axios';

// Konfigurasi instance axios dengan URL dasar dari API Laravel Anda.
// Ganti URL ini dengan URL backend Anda yang sebenarnya.
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // <-- GANTI DENGAN URL API ANDA
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mengambil semua album
export const getAlbums = () => apiClient.get('/albums');

// Fungsi untuk mengambil semua foto
export const getPhotos = () => apiClient.get('/galeri');

// Fungsi untuk mengambil semua video
export const getVideos = () => apiClient.get('/video');

// Fungsi untuk mengambil konten (foto & video) dari sebuah album spesifik
export const getAlbumContent = (albumId) => apiClient.get(`/album-content/${albumId}`);