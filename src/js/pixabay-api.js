//
import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '49441888-9a9fca759a65c9c8b8f6579f2';
const BASE_URL = 'https://pixabay.com/api/';

// const loader = document.querySelector('.loader'); // Додаємо селектор для індикатора завантаження

export async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    console.log(response.data);

    return response.data.hits;

    // loader.style.display = 'none'; // Сховуємо індикатор завантаження
  } catch (error) {
    console.error(`Error fetching images:`, error);
    throw error;
  }
}
