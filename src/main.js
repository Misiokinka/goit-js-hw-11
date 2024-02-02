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
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
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
    gallery.innerHTML = '';

    images.forEach(image => {
      const card = document.createElement('div');
      card.className = 'gallery-item';

      card.innerHTML = `
      <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
          <img src="${image.webformatURL}" alt="${image.tags}" data-src="${image.largeImageURL}" data-caption="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
        </a>
        <div class="image-block">
      <div class="block-item">
        <p class="block-label">Likes:</p>
        <p class="block-value">${image.likes}</p>
      </div>
      <div class="block-item">
        <p class="block-item">Views:</p>
        <p class="block-item">${image.views}</p>
      </div>
      <div class="block-item">
        <p class="block-item">Comments:</p>
        <p class="block-item">${image.comments}</p>
      </div>
      <div class="block-item">
        <p class="block-item">Downloads:</p>
        <p class="block-item">${image.downloads}</p>
      </div>
    </div>
      `;

      gallery.appendChild(card);
    });

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  }
});
