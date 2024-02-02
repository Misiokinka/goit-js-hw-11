import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const containerLoader = document.getElementById('container-loader');
  removeLoader(containerLoader);

  const formSearching = document.getElementById('formSearching');
  const inputSearch = document.getElementById('inputSearch');
  const gallery = document.getElementById('gallery');

  const apiKey = '42167626-5dd4d1124df4d491f669cdb42';

  formSearching.addEventListener('submit', function (e) {
    e.preventDefault();

    addLoader(containerLoader);

    const searchResult = inputSearch.value.trim();
    if (!searchResult) {
      iziToast.error({
        title: 'Error',
        message: 'The field is not allowed to be empty ',
        position: 'topRight',
      });
      removeLoader(containerLoader);
      return;
    }

    const apiUrl = 'https://pixabay.com/api/';
    const requestData = {
      key: apiKey,
      q: searchResult,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 9,
    };

    fetch(`${apiUrl}?${new URLSearchParams(requestData)}`)
      .then(response => {
        if (!response.ok) {
          gallery.innerHTML = '';
          return iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
          gallery.innerHTML = '';
          return;
        }
        renderImages(data.hits);
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong. Please try again later.',
          position: 'topRight',
        });
      })
      .finally(() => {
        removeLoader(containerLoader);
      });
  });

  function removeLoader(containerLoader) {
    if (containerLoader) {
      containerLoader.style.display = 'none';
    }
  }

  function addLoader(containerLoader) {
    if (containerLoader) {
      containerLoader.style.display = 'block';
    }
  }
  function renderImages(images) {
    const newListImage = images.map(
      image =>
        `
        <div class="gallery-item">
      <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
          <img src="${image.webformatURL}" alt="${image.tags}" data-src="${image.largeImageURL}" data-caption="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
        </a>
        <div class="image-block">
      <div class="block-item">
        <p class="block-label">Likes:</p>
        <p class="block-value">${image.likes}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Views:</p>
        <p class="block-value">${image.views}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Comments:</p>
        <p class="block-value">${image.comments}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Downloads:</p>
        <p class="block-value">${image.downloads}</p>
      </div>
    </div>
    </div>
      `
    );

    gallery.innerHTML = newListImage.join('');

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  }
});
