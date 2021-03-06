const userPicsContainer = document.querySelector('.pictures');

const closeDownloadError = () => {
  window.location.reload();
};

const createLoader = (onError) => fetch(
  'https://25.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .catch((err) => {
    userPicsContainer.appendChild(onError(err));
    document.querySelector('.error__button').addEventListener('click', closeDownloadError);
  });

const raiseDownloadError = () => {
  const fragment = document.createDocumentFragment();
  const downloadErrorTemplate = document.querySelector('#download-error').content;
  const templateElement = downloadErrorTemplate.querySelector('.error');
  const errorCopy = templateElement.cloneNode(true);
  errorCopy.querySelector('.error__title').textContent = 'Загрузка изображений неудачна';
  fragment.appendChild(errorCopy);
  return fragment;
};

export {raiseDownloadError};

const raiseUploadError = () => {
  const fragment = document.createDocumentFragment();
  const uploadErrorTemplate = document.querySelector('#error').content;
  const templateElement = uploadErrorTemplate.querySelector('.error');
  const errorCopy = templateElement.cloneNode(true);
  errorCopy.querySelector('.error__title').textContent = 'Не удалось отправить данные';
  fragment.appendChild(errorCopy);
  return fragment;
};

export {raiseUploadError};

const raiseUploadSuccess = () => {
  const fragment = document.createDocumentFragment();
  const downloadErrorTemplate = document.querySelector('#success').content;
  const templateElement = downloadErrorTemplate.querySelector('.success');
  const errorCopy = templateElement.cloneNode(true);
  fragment.appendChild(errorCopy);
  return fragment;
};

export {raiseUploadSuccess};

const imagesPromise = createLoader(raiseDownloadError);
export const loadImages = () => imagesPromise;
