import { renderImages } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';

// iziToast імпорт бібліотеки
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// SimpleLightbox імпорт бібліотеки
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iconCross from '../src/img/icon/cross-min.png';


let page = 1;     // Номер поточної сторінки
let query = '';   // Поточний пошуковий запит
const perPage = 15;

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


form.addEventListener('submit', async (event) => {
  
  event.preventDefault();
  // Перевірка введеного тексту
 query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }
 // Показуємо лоадер
 loader.classList.remove('visually-hidden');
 //Очищаємо галерею
 gallery.innerHTML = '';
  // Очищаємо поле вводу
  form.reset();
  
  page=1;

  try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);
    if (hits.length === 0) {
      iziToast.warning({ title: 'Oops!', message: 'No images found. Try again!' });
      return;
    }

    renderImages(hits);
    loadMoreBtn.classList.add('visually-hidden');

    if (page * perPage >= totalHits) {
      loadMoreBtn.classlist.remove('visually-hidden');
      iziToast.info({ title: 'End', message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images. Try again later!' });
  } finally {
    loader.classList.add('visually-hidden');
  }
});


loadMoreBtn.addEventListener('click', async () => {
page += 1;
loader.classList.remove('visually-hidden');
loadMoreBtn.classList.add('visually-hidden');

try {
  const { hits, totalHits } = await fetchImages(query, page, perPage);
  renderImages(hits);

  scrollPage();

  if (page * perPage >= totalHits) {
    loadMoreBtn.classlist.add('visually-hidden');
    iziToast.info({ title: 'End', message: "We're sorry, but you've reached the end of search results." });
  } else {
    loadMoreBtn.classList.remove('visually-hidden');
  }
} catch (error) {
  iziToast.error({ title: 'Error', message: 'Failed to fetch images. Try again later!' });
} finally {
  loader.classList.add('visually-hidden');
}
});

function scrollPage() {
const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
}



