//
import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '49441888-9a9fca759a65c9c8b8f6579f2';
const BASE_URL = 'https://pixabay.com/api/';

export let perPage = 15;

export async function fetchImages(query, currentPage=1) {
    

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage,
      },
    });

    const { hits, totalHits } = response.data;
    if (hits.length === 0) {
          iziToast.warning({ 
            title: 'No results!', 
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight', 
          });
             return { images: [], totalHits: 0 };

  }
  return { images: hits, totalHits: totalHits };
} catch (error) {
  console.error('Error:', error);
  return { images: [], totalHits: 0 };
}
}

  
