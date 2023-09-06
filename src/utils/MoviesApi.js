// import { BASE_URL_MOVIES } from "./utils"

const baseUrlMovies = 'https://api.nomoreparties.co/beatfilm-movies';

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const moviesApi = () => {
  return fetch(`${baseUrlMovies}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(getResponseData)
};
