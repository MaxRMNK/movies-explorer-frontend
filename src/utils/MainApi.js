import { BASE_URL } from "./constants";

const apiConfig = {
  // baseUrl: 'api.diplom.maxrmnk.nomoredomains.xyz',
  // baseUrl: 'http://localhost:3001',
  baseUrl: BASE_URL,
  headers: {
    authorization: '',
    'Content-Type': 'application/json',
  },
}

/**
 * Вариант доработки:
 * Откорректировать методы здесь и их вызов в других компонентах, чтобы методы принимали не переменные, а объекты.
 * Например: "setUserInfo(name, about){..." => "setUserInfo({name, about}){..."
 * Зачем: Чтобы не беспокоиться о соблюдении порядка передачи значений
 */

class MainApi {
  constructor(options) {

    this._urlApi = options.baseUrl;
    this._headers = options.headers;
    this._headers['authorization'] = '';

    // this._headers['Authorization'] = `Bearer ${this._token}`;
    // this._token = localStorage.getItem('jwt');
    // Стало? В.Малий. 1:38:00
    // this._token = options.headers['authorization']; // Было
  }

  _getResponseData(res) {
    // console.log('MainApi._getResponseData:', res);
    if (!res.ok) {
      // console.log(res);
      // return Promise.reject(`Ошибка: ${res.status}`);
      return Promise.reject(res);
    }
    return res.json();
  }


  // ----------------------------------------------------------
  // ПОСЛЕ аутентификации добавляет токен к заголовкам запросов
  setToken() { // (token)
    this._token = localStorage.getItem('jwt');
    this._headers['authorization'] = `Bearer ${this._token}`;
  }
  // ----------------------------------------------------------

  // Регистрация пользователя (auth.js)
  registerUser({ name, email, password }) {
    return fetch(`${this._urlApi}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    })
      .then(this._getResponseData)
  };

  // Авторизация пользователя (auth.js)
  loginUser({ email, password }) {
    return fetch(`${this._urlApi}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then(this._getResponseData)
  };

  // Проверка токена (auth.js)
  // В ответе получает данные пользователя
  checkToken( token ) {
    // console.log('Auth.js, checkToken', token);
    return fetch(`${this._urlApi}/users/me`, {
      // method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResponseData)
  };

  // НЕОБХОДИМО Перепроверить добавление к запросам заголовка токена !!!
  // // получить данные пользователя (GET)
  // getUser() {
  //   return fetch(`${this._urlApi}/users/me`, {
  //     //method: 'GET',
  //     headers: this._headers,
  //   })
  //     .then(this._getResponseData);
  // }

  // заменить данные пользователя (PATCH)
  setUserInfo({ name, email }) { //changeUserInfo
    return fetch(`${this._urlApi}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(this._getResponseData);
  }

  // ----------------------------------------------------------


  // Получить сохраненные закладки (фильмы)
  getBookmarks() {
    return fetch(`${this._urlApi}/movies`, {
      //method: 'GET',
      headers: this._headers,
    })
      .then(this._getResponseData);
  }

  // Добавить фильм в закладки (POST)
  addBookmark(data) {
    return fetch(`${this._urlApi}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._getResponseData);
  }

  // Удалить фильм из закладок (DELETE)
  deleteBookmark(id) {
    return fetch(`${this._urlApi}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getResponseData);
  }

  // // "залайкать" карточку (PUT) + удалить лайк карточки (DELETE)
  // // Раньше метод назывался "setLikeCard", были те же аргументы + изменил условие с "if (!isLiked){..." на "if (isLiked){..."
  // changeLikeCardStatus(id, isLiked) {
  //   if (isLiked) {
  //     return fetch(`${this._urlApi}/cards/${id}/likes`, {
  //       method: 'PUT',
  //       headers: { ...this._headers, authorization: `Bearer ${this._token}`},
  //     })
  //       .then(this._getResponseData);
  //   } else {
  //     return fetch(`${this._urlApi}/cards/${id}/likes`, {
  //       method: 'DELETE',
  //       headers: this._headers,
  //     })
  //       .then(this._getResponseData);
  //   }
  // }

  // // Выводим информацию на страницу только если исполнились оба промиса -
  // // загрузка профиля пользователя и загрузка карточек.
  // getAllPageData() {
  //   return Promise.all([ this.getUser(), this.getInitialCards() ]);
  // }

}

export const mainApi = new MainApi( apiConfig );
