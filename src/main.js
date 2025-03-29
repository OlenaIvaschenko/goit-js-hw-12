import { renderImages } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';

// iziToast імпорт бібліотеки
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// SimpleLightbox імпорт бібліотеки
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iconCross from '../src/img/icon/cross-min.png';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('[name="search-text"]'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn:document.querySelector('.load-more')
};


let userRequest = null;
let currentPage = 1;
let totalPages = 0;
const perPage = 15;

const {form, input, gallery,loader, loadMoreBtn} = refs;

form.addEventListener("submit", onSearchSubmit)
loadMoreBtn.addEventListener('click', onLoadMoreClick);


//**Functions**

async function onSearchSubmit (event){
  
  event.preventDefault()
 
  //  console.log("onSearchSubmit result:", result);
  currentPage = 1;
  totalPages = 0;
  gallery.innerHTML = '';

   // Перевірка введеного тексту

  userRequest = input.value.trim();

  if (userRequest === '') {
    iziToast.error({
      title: 'Error:',
      message: 'Please fill in the search field before submitting!',
      position: 'topRight',
    });
    return;
  }
 // Приховуємо лоадер
 loader.classList.add('visually-hidden');

try {
      const { images, totalHits } = await fetchImages(userRequest, currentPage);


      renderImages(gallery, images);
      

      totalPages = Math.ceil(totalHits / perPage);

  
      if (totalPages > currentPage) {
        loadMoreBtn.classList.remove('visually-hidden');
      }
    }  catch (error) {

      console.error('Error:', error);
      }
  
      finally {
        loader.classList.add('visually-hidden');
        form.reset();
      }   
      
}

async function onLoadMoreClick() {
  currentPage += 1;
try{

  loadMoreBtn.classList.add('visually-hidden');
  loader.classList.remove('visually-hidden');

  const { images} = await fetchImages(userRequest, currentPage);

  renderImages(gallery, images);
  new SimpleLightbox('.gallery a').refresh();

const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });


    if (currentPage >= totalPages) {
      loadMoreBtn.classList.add('visually-hidden');
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.classList.remove('visually-hidden'); 
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loader.classList.add('visually-hidden');
  }

}



