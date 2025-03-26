import { renderImages } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';

// iziToast імпорт бібліотеки
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// SimpleLightbox імпорт бібліотеки
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iconCross from '../src/img/icon/cross-min.png';
//

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  console.log(query);

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  gallery.innerHTML = '';

  loader.classList.add('visible');
  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      iziToast.warning({
        title: `Oops!`,
        message: `No images found. Try again!`,
      });
    } else {
      renderImages(images);
    }
  } catch (error) {
    iziToast.error({
      title: `Error`,
      message: ` Failed to fetch images. Try again later!`,
    });
  } finally {
    loader.classList.remove('visible');
  }
});
