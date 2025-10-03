// src/api/menuApi.js

const API_BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Mengambil struktur menu navigasi dari Laravel.
 */
export const getMenus = () => {
  return fetch(`${API_BASE_URL}/menus`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data menu dari server.");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Terjadi masalah saat mengambil data menu:", error);
      return [];
    });
};

export const searchNews = (query) => {
  // Encode query untuk memastikan karakter spesial aman di URL
  const encodedQuery = encodeURIComponent(query);

  return fetch(`${API_BASE_URL}/pages?menu_name=Berita&search=${encodedQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal melakukan pencarian berita.");
      }
      return response.json();
    })
    .then(data => {
      // Asumsikan data berita ada di dalam properti 'data'
      return data.data || [];
    })
    .catch((error) => {
      console.error(`Error saat mencari berita dengan query "${query}":`, error);
      return []; // Kembalikan array kosong jika terjadi error
    });
};

/**
 * [BARU] Mengambil daftar data konten, bisa difilter berdasarkan menu_id.
 * Contoh: /api/pages?menu_id=1
 */
export const getPageContent = (menuId) => {
  return fetch(`${API_BASE_URL}/pages?menu_id=${menuId}`)
    .then((response) => response.json())
    .catch((error) => ({ data: [] }));
};

/**
 * [BARU] Mengambil data konten berdasarkan nama menu.
 * Contoh: /api/pages?menu_name=Berita
 */
export const getContentByMenuName = (menuName) => {
  return fetch(`${API_BASE_URL}/pages?menu_name=${menuName}`)
    .then((response) => {
      if (!response.ok)
        throw new Error("Gagal mengambil data konten berdasarkan nama.");
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching content for menu "${menuName}":`, error);
      return { data: [] };
    });
};

/**
 * [BARU] Mengambil semua data agenda.
 */
export const getAgendas = () => {
  return fetch(`${API_BASE_URL}/agendas`)
    .then((response) => {
      if (!response.ok) throw new Error("Gagal mengambil data agenda.");
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching agendas:", error);
      return []; // Kembalikan array kosong jika error
    });
};

export const getAlbums = () => {
  return fetch(`${API_BASE_URL}/albums`)
    .then((response) => {
      if (!response.ok) throw new Error("Gagal mengambil data album.");
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching albums:", error);
      return [];
    });
};

/**
 * [BARU] Mengambil detail satu album beserta foto-fotonya.
 */
export const getAlbumDetails = (albumId) => {
  return fetch(`${API_BASE_URL}/albums/${albumId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Gagal mengambil detail album.");
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching details for album ${albumId}:`, error);
      return null;
    });
};

export const getVideos = () => {
  return fetch(`${API_BASE_URL}/videos`)
    .then((response) => {
      if (!response.ok) throw new Error("Gagal mengambil data video.");
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching videos:", error);
      return [];
    });
};
