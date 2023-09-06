// import { BASE_URL_MOVIES } from "./utils"

const baseUrlMovies = 'https://api.nomoreparties.co';

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const moviesApi = () => {
  return fetch(`${baseUrlMovies}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(getResponseData)
};
