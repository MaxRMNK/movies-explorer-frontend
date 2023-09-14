import { BASE_URL_MOVIES } from "./constants";

// const baseUrlMovies = 'https://api.nomoreparties.co';

const getResponseData = (res) => {
  if (!res.ok) {
    // return Promise.reject(`Ошибка: ${res.status}`);
    return Promise.reject(res);
  }
  return res.json();
}

export const moviesApi = () => {
  return fetch(`${BASE_URL_MOVIES}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(getResponseData)
};
