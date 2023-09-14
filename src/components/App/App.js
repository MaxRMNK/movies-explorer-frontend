import React from 'react';

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// import './App.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../Movies/SavedMovies/SavedMovies";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
// import Preloader from "../Preloader/Preloader";
import PopupPreloader from "../PopupPreloader/PopupPreloader";

import { MESSAGES, BASE_URL_MOVIES } from "../../utils/constants";

import films from "../../utils/db-films-lite";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
// import * as auth from "../../utils/auth";
import { mainApi } from "../../utils/MainApi"
import { moviesApi } from "../../utils/MoviesApi";
import { searchMovies } from "../../utils/SearchMovies";

// const defaultUserInfo = {
//   name: "Виталий",
//   email: "pochta@yandex.ru",
// };


// ------------------------------------------------------------------------


function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({}); // Стейт данных пользователя

  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // пользователь авторизирован
  const [isLoading, setIsLoading] = React.useState(false); // данные загружаются
  const [isLoadingFilm, setIsLoadingFilm] = React.useState(false); // данные Фильмов загружаются
  const [isSending, setIsSending] = React.useState(false); // форма отправляется

  // Для вывода сообщений об ошибках
  const [messageError, setMessageError] = React.useState(null);
  const [messageProfile, setMessageProfile] = React.useState({ show: false, successful: true, text: '', });
  const [messageSearchMovies, setMessageSearchMovies] = React.useState(null);

  const [allMovies, setAllMovies] = React.useState([]); // Результат запроса к API Movies
  const [filtredMovies, setFiltredMovies] = React.useState([]); // Отфильтрованные фильмы
  // const [filtredMovies, setFiltredMovies] = React.useState( JSON.parse( localStorage.getItem('lastSearchMovies')) || [] ); // Отфильтрованные фильмы

  const [moviesInBookmarks, setMoviesInBookmarks] = React.useState([]); // Результат запроса к MainAPI - фильмы в Закладках
  const [filtredMoviesBookmarks, setFiltredMoviesBookmarks] = React.useState([]); // Отфильтрованные фильмы в Закладках

  // Поисковый запрос для "Фильмы"
  // const [searchQuery, setSearchQuery] = React.useState({
  //     text: localStorage.getItem('lastSearchQueryText') || '',
  //     checkbox: localStorage.getItem('lastSearchQueryCheckbox') || false,
  //   });
  const [searchQuery, setSearchQuery] = React.useState(
      JSON.parse(localStorage.getItem('savedSearchQuery')) ||
      { text: '', checkbox: false, }
    );
  // Поисковый запрос для "Сохраненные фильмы"
  const [searchQueryBookmarks, setSearchQueryBookmarks] = React.useState({
      text: '',
      checkbox: false,
    });





  // =========================================================================
  // --------------------------
  // Проверка токена
  function checkAuth() {
    const token = localStorage.getItem('jwt');

    if (token) {
      setIsLoading(true);

      mainApi.checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser({
          // ...currentUser,
          name: res.name,
          email: res.email,
        });
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log(`Ошбика ${err.status} - ${err.statusText}: ${MESSAGES.loginErrorToken}`);
        } else {
          // console.log(`Ошибка ${err.status} - ${err.statusText}`);
          console.log(`Ошибка ${err.status} - ${MESSAGES.errorServer}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }

  // --------------------------
  // Регистрация
  function handleRegister(value) {
    setIsSending(true); // Визуализация процесса отправки

    mainApi.registerUser(value)
    .then(() => { // res

      handleLogin({
        email: value.email,
        password: value.password
      });

    })
    .catch((err) => {
      if (err.status === 409) {
        setMessageError(MESSAGES.registerIncorrectEmail);
      } else {
        setMessageError(MESSAGES.registerErrorOther);
      }
      console.warn(err.statusText);
    })
    .finally(() => {
      setIsSending(false) // Визуализация процесса отправки
    })
  }

  // --------------------------
  // Авторизация
  function handleLogin(value) {
    setIsSending(true); // Визуализация процесса отправки

    mainApi.loginUser(value)
    .then((data) => {
      if(data.token) {
        setIsLoggedIn(true); // checkAuth дальше авторизирует, но без этого работает медленнее.

        localStorage.setItem('jwt', data.token);
        checkAuth();

        navigate('/movies', { replace: true });
      }
    })
    .catch((err) => {
      if (err.status === 400) {
        setMessageError(MESSAGES.loginIncorrect);
      } else if (err.status === 401) {
        setMessageError(MESSAGES.loginIncorrect);
      } else {
        setMessageError(MESSAGES.errorServer);
      }
      console.warn(err.statusText);
    })
    .finally(() => {
      setIsSending(false) // Визуализация процесса отправки
    })
  }

  // --------------------------
  // Обновление данных пользователя
  function handleUpdateUser(userData) {
    // console.log('handleUpdateUser - начало', userData);
    setIsSending(true); // Визуализация процесса отправки

    mainApi.setUserInfo(userData)
      .then(() => {
        setCurrentUser({
          // ...currentUser,
          name: userData.name,
          email: userData.email,
        });
        setMessageProfile({ show: true, successful: true, text: 'Данные профиля обновлены', });
        console.log('handleUpdateUser - then');
      })
      .catch((err) => {
        if (err.status === 409) {
          setMessageProfile({ show: true, successful: false, text: MESSAGES.profileIncorrectEmail, });
        } else {
          setMessageProfile({ show: true, successful: false, text: MESSAGES.profileErrorOther, });
        }
        // console.log('handleUpdateUser - catch');
        // console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        // console.log('handleUpdateUser - finally');
        setIsSending(false) // Визуализация процесса отправки
      });
  }

  // --------------------------
  // Выход
  function handleSignOut() {
    localStorage.removeItem('jwt');

    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/', { replace: true });

    // Добавить очистку localStorage загруженных фильмов и настроек поиска
  }



  // =========================================================================
  // --------------------------
  // Получить все фильмы с "Сервиса beatfilm-movies"
  function getMovies () {
    setIsLoadingFilm(true);
    // setIsLoading(true);

    moviesApi()
      .then((res) => {
        // const data = undefined;
        const data = res.map((item) => ({
          movieId: item.id,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
          country: item.country,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          image: `${BASE_URL_MOVIES}${item.image.url}`,
          thumbnail: `${BASE_URL_MOVIES}${item.image.formats.thumbnail.url}`,
          trailerLink: item.trailerLink,
        }));

        if (data) {
          setAllMovies(data);
          // localStorage.removeItem('savedDataMovies');
          // localStorage.setItem('savedDataMovies', JSON.stringify(data));

          // Чтобы убрать надпись оставить пробел или изменить условия в MoviesCardList или SearchError
          setMessageSearchMovies('Первый вход');
        } else {
          return Promise.reject({status: 500, statusText: "No Movies Data"});
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err.status} - ${MESSAGES.searchServerError}`);
        setMessageSearchMovies(MESSAGES.searchServerError);
      })
      .finally(() => {
        // setIsLoading(false);
        setIsLoadingFilm(false);
      })
  }


  // --------------------------
  // Поиск и фильтрация для Movies
  function handleSearch (search) {
    console.log('Пришел поисковый запрос:', search);

    setMessageSearchMovies(null); // Сброс ошибок предыдущего запроса

    // const localSearchQuery = JSON.parse(localStorage.getItem('savedSearchQuery'));

    // Если запрос пустой - обнуляется стейт с фильмами для вывода
    if (search.text === '') {
      setFiltredMovies([]);
      setMessageSearchMovies(MESSAGES.searchValidationError);
      return
    }

    // localStorage.setItem('lastSearchQueryText', search.text);
    // localStorage.setItem('lastSearchQueryCheckbox', search.checkbox);
    localStorage.setItem('savedSearchQuery', JSON.stringify(search));

    // searchMovies()

    // console.log('handleSearch allMovies', allMovies);

    if (allMovies.length >= 1) {
      const movieFilterResult = searchMovies( allMovies, search );

      if (movieFilterResult < 1) {
        setMessageSearchMovies(MESSAGES.searchIsEmpty);
      }

      localStorage.setItem('lastSearchMovies', JSON.stringify(movieFilterResult));
      setFiltredMovies(movieFilterResult.slice(0, 20));

      // console.log('allMovies useEffect', allMovies);
      console.log('movieFilterResult.length:', movieFilterResult);
    }
    else {
      console.log('handleSearch - НЕТ allMovies');

      setFiltredMovies([]);
      // setMessageSearchMovies(MESSAGES.searchIsEmpty); // Нужна другая ошибка?
    }

    // const localAllMovies = JSON.parse(localStorage.getItem('savedDataMovies'));
    // if (localAllMovies) {}
    // getMovies();
  }


    // --------------------------
  // Поиск и фильтрация для SavedMovies
  function handleSearchSavedMovies (search) {
    setMessageSearchMovies(null); // Сброс ошибок предыдущего запроса

    // Если запрос пустой - обнуляется стейт с фильмами для вывода
    // if (search.text === '') {
    //   setFiltredMoviesBookmarks([]);
    //   setMessageSearchMovies(MESSAGES.searchValidationError);
    //   return
    // }

    // Не нужно сохранять - все уже сохранилось через форму при отправке запроса
    // setSearchQueryBookmarks(search);

    if (moviesInBookmarks.length >= 1) {
      const movieFilterResult = searchMovies( moviesInBookmarks, search );

      if (movieFilterResult < 1) {
        setMessageSearchMovies(MESSAGES.searchIsEmpty);
      }

      // localStorage.setItem('lastSearchMovies', JSON.stringify(movieFilterResult));
      setFiltredMoviesBookmarks(movieFilterResult);

    } else { // Нет отфильтрованных фильмов - выводим все
      // setFiltredMoviesBookmarks([]);
      setFiltredMoviesBookmarks(moviesInBookmarks);

      // console.log('handleSearchSavedMovies - НЕТ moviesInBookmarks');
      // setMessageSearchMovies(MESSAGES.searchIsEmpty); // Нужна другая ошибка?
    }
  }

  // --------------------------
  // Получить фильмы из закладок
  function getMoviesFromBookmarks () {
    setIsLoadingFilm(true);

    mainApi.getBookmarks()
      .then((res) => {
        setMoviesInBookmarks(res);
      })
      .catch((err) => {
        if (err.status) {
          console.log(`Ошибка ${err.status} - ${MESSAGES.errorServer}`);
        } else {
          console.log('Ошибка:', err);
        }
      })
      .finally(() => {
        setIsLoadingFilm(false);
      })
  }

  // --------------------------
  // Добавить фильм в закладки
  function handleAddMovieInBookmark (filmData) {

    // console.log(filmData);
    mainApi.addBookmark(filmData)
      .then((res) => {
        // console.log('res', res);
        setMoviesInBookmarks([...moviesInBookmarks, res])
      })
      .catch((err) => {
        if (err.status) {
          console.log(`Ошибка ${err.status} - ${err.statusText}`);
        } else {
          // console.log('Ошибка:', err);
          console.log('Ошибка:', MESSAGES.errorServer);
        }
      })
  }

  // --------------------------
  // Удалить фильмы из закладок
  function handleDeleteMovieFromBookmark (filmData) {
    const movie = moviesInBookmarks.find((item) => item.movieId === filmData.movieId);

    // console.log('ID', id);
    mainApi.deleteBookmark(movie._id)
      .then(() => {
        setMoviesInBookmarks( moviesInBookmarks.filter( item => item._id !== movie._id ) );
      })
      .catch((err) => {
        if (err.status) {
          console.log(`Ошибка ${err.status} - ${err.statusText}`);
        } else {
          // console.log('Ошибка:', err);
          console.log('Ошибка:', MESSAGES.errorServer);
        }
      })
  }

  // --------------------------
  // Проверить наличие фильма в закладках (true/false)
  function handleCheckMovieInBookmark (filmData) {
    return moviesInBookmarks.some((item) => {
      return item.movieId === filmData.movieId
    });
  }

  // Запускается при монтировании страницы и изменении allMovies =>
  // Загружаются сохраненные в localStorage фильтрация и результаты
  // React.useEffect(() => {
  //   if (allMovies.length > 1) {
  //     setFiltredMovies(allMovies.slice(0, 3));
  //     // console.log('allMovies useEffect', allMovies);
  //   }
  //   else {
  //     setFiltredMovies([]);
  //   }
  // }, [ allMovies ]);


  // --------------------------



  // =========================================================================
  // useEffect
  // -------------------------------
  // При открытии страницы проверяет авторизацию (есть ли у пользователя токен) =>
  // Если "да", обновляет стейты "isLoggedIn" + "currentUser"
  React.useEffect(() => {
    checkAuth();

    // localStorage.removeItem('lastSearchQueryText');
    // localStorage.removeItem('lastSearchQueryCheckbox');
    localStorage.removeItem('savedSearchQuery');
    localStorage.removeItem('lastSearchMovies');

    // setFiltredMovies(JSON.parse(localStorage.getItem('lastSearchMovies')));

    // console.log('checkAuth useEffect');
  }, []);

  // Если пользователь авторизован:
  // + Добавляет токен в заголовки запросов к mainApi
  // + Загружает фильмы в стейт "allMovies"
  // + Загружает сохраненные фильмы в стейт "moviesFromBookmarks"
  React.useEffect(() => {
    if(isLoggedIn) {
      mainApi.setToken();
      getMovies();
      getMoviesFromBookmarks();
    }
  }, [ isLoggedIn ]);


  React.useEffect(() => {
    setFiltredMoviesBookmarks(moviesInBookmarks);
    console.log('444');
  }, [ moviesInBookmarks ]);

  // -------------------------------
  // Всякий мусор
  // -------------------------------

  // React.useEffect(() => {
  //   console.log('useEffect currentUser', currentUser);
  // }, [ currentUser ]);

  // Не нужно?
  // React.useEffect(() => {
  //   isLoading
  //   // console.log('checkAuth useEffect');
  // }, [setIsLoading]);


  // =========================================================================

  return (
    <CurrentUserContext.Provider value={currentUser}>
      { isLoading ? ( <PopupPreloader /> ) : ( <></>)}
      <Routes>
        <Route path="/" element={<>
          <Header isLoggedIn={isLoggedIn} />
          <Main />
          <Footer />
        </>} />

        <Route path="/signin" element={
        // isLoggedIn ? (
          <Login
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            isSending={isSending}
            message={messageError}
            setMessage={setMessageError}
          />
        // ) : (
        //   <Navigate to="/" replace />
        // )
        } />

        <Route path="/signup" element={
        // isLoggedIn ? (
          <Register
            isLoggedIn={isLoggedIn}
            handleRegister={handleRegister}
            isSending={isSending}
            message={messageError}
            setMessage={setMessageError}
          />
        // ) : (
        //   <Navigate to="/" replace />
        // )
        } />

        <Route path="/profile" element={
          <ProtectedRouteElement isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <Profile
              handleSignOut={handleSignOut}
              handleUpdateUser={handleUpdateUser}
              // currentUser={currentUser}

              isSending={isSending}
              message={messageProfile}
              setMessage={setMessageProfile}
            />
          </ProtectedRouteElement>
        } />

        <Route path="/movies" element={
          <ProtectedRouteElement isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <Movies
              // films={films}
              films={filtredMovies}

              handleSearch={handleSearch}

              handleAddBookmark={handleAddMovieInBookmark}
              handleDelBookmark={handleDeleteMovieFromBookmark}
              handleCheckBookmark={handleCheckMovieInBookmark}
              moviesInBookmarks={moviesInBookmarks}

              message={messageSearchMovies}
              setMessage={setMessageSearchMovies}

              // isLoading={isLoading}
              isLoading={isLoadingFilm}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              />
            <Footer />
          </ProtectedRouteElement>
        } />

        <Route path="/saved-movies" element={
          <ProtectedRouteElement isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies
              films={filtredMoviesBookmarks}

              handleSearch={handleSearchSavedMovies}

              handleAddBookmark={handleAddMovieInBookmark}
              handleDelBookmark={handleDeleteMovieFromBookmark}
              handleCheckBookmark={handleCheckMovieInBookmark}
              moviesInBookmarks={moviesInBookmarks}

              message={messageSearchMovies}
              setMessage={setMessageSearchMovies}

              // isLoading={isLoading}
              isLoading={isLoadingFilm}
              searchQuery={searchQueryBookmarks}
              setSearchQuery={setSearchQueryBookmarks}
            />
            <Footer />
          </ProtectedRouteElement>
        } />

        <Route path="*" element={<PageNotFound />} />
        {/* <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signup" replace />} /> */}
      </Routes>

      {/* {(
        location === '/' ||
        location === '/movies' ||
        location === '/saved-movies'
        ) &&
        <Footer />
      } */}
    </CurrentUserContext.Provider>
  );
}

export default App;
