export const MESSAGES = {
  // Страница логина пользователя
  loginIncorrect: 'Вы ввели неправильный логин или пароль.', // 400 (+ 401 ???)
	loginErrorAuth: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.', // ???
	loginErrorToken: 'При авторизации произошла ошибка. Переданный токен некорректен.', // 401

  // Страница регистрации пользователя
  registerIncorrectEmail: 'Пользователь с таким email уже существует.', // 409
	registerErrorOther: 'При регистрации пользователя произошла ошибка.', // 500

  // Страница обновления профиля
  profileIncorrectEmail: 'Пользователь с таким email уже существует.', // 409
	profileErrorOther: 'При обновлении профиля произошла ошибка.', // 500

  // Поиск фильмов
  searchValidationError: 'Нужно ввести ключевое слово',
  searchIsEmpty: 'Ничего не найдено',
  searchServerError: `Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
                      Подождите немного и попробуйте ещё раз`,

  // Другое
  errorServer: '500 На сервере произошла ошибка.',
	errorNotFound: '404 Страница по указанному маршруту не найдена.',
}

// URL Для запроса к API для получения фильмов + Для формирования ссылок на картинки
export const BASE_URL_MOVIES = 'https://api.nomoreparties.co';

export const SHORT_FILM_DURATION = 40; // длительность короткометражного фильма

// Точки перехода (разрешения экрана) для вывода разного количества карточек
export const DESKTOP_MIN_WIDTH = '(min-width: 1279px)';
// export const TABLET_MIN_WIDTH = '(min-width: 902px)';
export const TABLET_MIN_WIDTH = '(min-width: 762px)';
export const MOBILE_MIN_WIDTH = '(min-width: 320px)';

// export const DESKTOP_MIN_WIDTH = '(min-width: 1280px)';
// export const TABLET_MIN_WIDTH = '(min-width: 762px)';
// export const MOBILE_MIN_WIDTH = '(min-width: 320px)';

// // Количество карточек которое нужно выводить изначально
export const LG_INITIAL_CARD_COUNT = 12; // 4 ряда по 3 карточки
export const MD_INITIAL_CARD_COUNT = 8; // 4 ряда по 2 карточки
export const SM_INITIAL_CARD_COUNT = 5; // 5 рядов по 1 карточке

// export const LG_INITIAL_CARD_COUNT = 3; // 4 ряда по 3 карточки
// export const MD_INITIAL_CARD_COUNT = 2; // 4 ряда по 2 карточки
// export const SM_INITIAL_CARD_COUNT = 1; // 5 рядов по 1 карточке

// Количество каточек, которое будет добавляться
export const LG_ROW_CARD_COUNT = 3; //
export const MD_ROW_CARD_COUNT = 2; //
export const SM_ROW_CARD_COUNT = 2; //
