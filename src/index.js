import NewFindingsApi from '/apiService.js';
import './sass/main.scss';
import makeOneImageNbs from './templates/image-card.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const refs = {
  gallery: document.querySelector('.gallery'),

  searchForm: document.getElementById('search-form'),

  btnLoadMore: document.querySelector('.load-more'),
};

function imagesNotFound() {
  error({
    text: 'Please enter something else',
  });
}

refs.btnLoadMore.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearch);

const newFindingsApi = new NewFindingsApi();

function onSearch(event) {
  refs.btnLoadMore.classList.add('is-hidden');
  event.preventDefault();
  newFindingsApi.query = event.currentTarget.elements.query.value;

  if (!newFindingsApi.query) {
    imagesNotFound();
    return;
  }

  newFindingsApi.resetPage();

  clearGallery();

  newFindingsApi.fetchArticles().then(hits => {
    if (hits.length === 0) {
      imagesNotFound();
      return;
    }

    randerImages(hits);
    refs.btnLoadMore.classList.remove('is-hidden');
  });
}

refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

function onBtnLoadMoreClick(event) {
  newFindingsApi.fetchArticles().then(hits => {
    randerImages(hits);
    const element = document.getElementById('btn-load-more');

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function randerImages(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', makeOneImageNbs(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
