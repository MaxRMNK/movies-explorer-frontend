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

import { MESSAGES } from "../../utils/constants";

import films from "../../utils/db-films-lite";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
// import * as auth from "../../utils/auth";
import { mainApi } from "../../utils/MainApi"
import { moviesApi } from "../../utils/MoviesApi";

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
  const [isSending, setIsSending] = React.useState(false); // форма отправляется

  // Для вывода сообщений об ошибках
  const [messageError, setMessageError] = React.useState(null);
  // const [messageError, setMessageError] = React.useState(null);
  // const [messageRegister, setMessageRegister] = React.useState(null);
  const [messageProfile, setMessageProfile] = React.useState({ show: false, successful: true, text: '', });

  const [searchQuery, setSearchQuery] = React.useState(''); // Поисковый запрос для "Фильмы"
  const [searchQuerySavedMovies, setSearchQuerySavedMovies] = React.useState(''); // Поисковый запрос для "Сохраненные фильмы"
  const [isToggleMovies, setIsToggleMovies] = React.useState(true); // "Короткометражки" для "Фильмы"
  const [isToggleSavedMovies, setIsToggleSavedMovies] = React.useState(false); // "Короткометражки" для "Сохраненные фильмы"

  const [allMovies, setAllMovies] = React.useState([]); // Результат запроса API Movies
  const [searchMovies, setSearchMovies] = React.useState([]); // Результат запроса API Movies


  // ----------------------------------------------

  const filmsSaved = films.filter(function(film) {
    return film.saved === true;
  });
  // console.log(filmsSaved);


  function loadMovies () {
    setIsLoading(true);

    moviesApi()
      .then((res) => {
        setAllMovies(res.map((item) => ({
            movieId: item.id,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
            country: item.country,
            director: item.director,
            duration: item.duration,
            year: item.year,
            description: item.description,
            image: item.image.url,
            thumbnail: item.image.formats.thumbnail.url,
            trailerLink: item.trailerLink,
          }
        )))

        // setAllMovies(res);
        // console.warn('Фильмы загружены', res);
        // console.warn('Фильмы сохранены MOV', mov);
      })
      .catch((err) => {
        console.log('Фильмы не загрузились', err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  function handleSearch (search) {
    loadMovies();
    // if(allMovies === null) {
    //   console.log('новый запрос');
    //   await loadMovies(); // Загружаем фильмы
    // }
    // console.log('allMovies', allMovies);
    // await
  }

  // let movies = [];

  React.useEffect(() => {
    if (allMovies.length > 1) {
      setSearchMovies(allMovies.slice(0, 5));
      console.log('allMovies useEffect', allMovies);
    }
  }, [allMovies]);
  // Запускается при монтировании страницы и изменении allMovies

  // =========================================================================

  // --------------------------
  // Проверка токена
  function checkAuth() {
    const token = localStorage.getItem('jwt');
    // const token = ' ';
    // console.log('function checkAuth - старт', token);

    if (token) {
      setIsLoading(true);
      // console.log('function checkAuth - токен есть');

      mainApi.checkToken(token)
      .then((res) => {
        // console.log('function checkAuth - ушел запрос mainApi.checkToken');
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
        // console.log('function checkAuth - финальный запрос');
        setIsLoading(false);
      })
    }
    // console.log('function checkAuth - конец');
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
        setIsLoggedIn(true); // ХЗ надо ли. По идее checkAuth дальше авторизирует

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
    console.log('handleUpdateUser - начало', userData);
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

        console.log('handleUpdateUser - catch');
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        console.log('handleUpdateUser - finally');
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
  }


  // -------------------------------

  React.useEffect(() => {
    console.log('useEffect currentUser', currentUser);
  }, [ currentUser ]);

  React.useEffect(() => {
    checkAuth();
    // console.log('checkAuth useEffect');
  }, []);

  // React.useEffect(() => {
  //   issLoading
  //   // console.log('checkAuth useEffect');
  // }, [setIsLoading]);

  React.useEffect(() => {
    if(isLoggedIn) {
      mainApi.setToken();
    }
    // console.log('isLoggedIn => setToken useEffect:', isLoggedIn);
  }, [ isLoggedIn ]);



  // -----------------------------------------------------------------------------------------------------

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
              films={searchMovies}
              handleSearch={handleSearch}

              isLoading={isLoading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isToggle={isToggleMovies}
              setIsToggle={setIsToggleMovies}
              />
            <Footer />
          </ProtectedRouteElement>
        } />

        <Route path="/saved-movies" element={
          <ProtectedRouteElement isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies
              films={filmsSaved}

              searchQuery={searchQuerySavedMovies}
              setSearchQuery={setSearchQuerySavedMovies}
              isToggle={isToggleSavedMovies}
              setIsToggle={setIsToggleSavedMovies}
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
