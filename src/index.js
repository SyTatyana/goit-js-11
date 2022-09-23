import './sass/main.scss';
import Notiflix from 'notiflix';
import { fetchImagens } from './js/fetch-images';
import { renderGallery } from './js/gallery-render';
import { scroll } from './js/scroll';

const form = document.querySelector('.search-form');
const input = document.querySelector('.input');
const loadBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let name = '';

let pageNumber = 1;

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  pageNumber = 1;
  loadBtn.classList.add('is-hidden');
  e.preventDefault();
  name = input.value.trim();
  gallery.innerHTML = '';

  fetchImagens(name, pageNumber)
    .then(data => {
      console.log(data);
      if (!name) {
        Notiflix.Notify.failure('Please, write something');
      } else if (data.hits.length === 0) {
        mistaceFunction();
      } else {
        renderGallery(data.hits);
        countFounding(data.totalHits);
        scroll();
        if (data.hits.length >= 40) {
          loadBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

loadBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  pageNumber += 1;
  fetchImagens(name, pageNumber)
    .then(data => {
      console.log(data);
      renderGallery(data.hits);
      countFounding(data.totalHits);
      scroll();
      if (data.hits.length < 40) {
        loadBtn.classList.add('is-hidden');
        alertEndOfSearch();
      }
    })
    .catch(error => console.log(error));
}
function mistaceFunction() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please, try again.'
  );
}

function countFounding(pages) {
  Notiflix.Notify.success(`Hooray! We found ${pages} images.`);
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
