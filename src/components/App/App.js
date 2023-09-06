import React from 'react';

import { Routes, Route, useNavigate } from "react-router-dom";

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

import films from "../../utils/db-films-lite";

// import * as auth from "../../utils/auth";
import { mainApi } from "../../utils/MainApi"
import { moviesApi } from "../../utils/MoviesApi";

const defaultUserInfo = {
  name: "Виталий",
  email: "pochta@yandex.ru",
};


// ------------------------------------------------------------------------


function App() {

  const navigate = useNavigate();

  // Стейт данных пользователя.
  // const [currentUser, setCurrentUser] = React.useState(defaultUserInfo); // раньше: userInfo
  const [userData, setUserData] = React.useState(defaultUserInfo);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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

  // ----------------------------------------------

  // Проверка токена
  function checkAuth() {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);

        setUserData({
          name: res.name,
          email: res.email,
        });
        // navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  // Регистрация
  function handleRegister(value) {
    // setIsLoading(true);
    // debugger;
    mainApi.registerUser(value)
    .then((res) => {
      console.log('Регистрация - handleRegister, res:', res);
      // console.log('Регистрация - handleRegister, value:', value);
      // setSuccessAuth(true);

      handleLogin({
        email: value.email,
        password: value.password
      });

      // navigate('/signup', { replace: true });
    })
    .catch((err) => {
      // setSuccessAuth(false);
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      // setIsLoading(false);
      // setInfoTooltipOpen(true);
    })
  }

  // Авторизация
  function handleLogin(value) {
    // console.log('Авторизация handleLogin, value: ', value);
    // setIsLoading(true);
    mainApi.loginUser(value)
    .then((data) => {
      if(data.token) {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);

        navigate('/movies', { replace: true });
      }
    })
    .catch((err) => {
      // setSuccessAuth(false);
      // setInfoTooltipOpen(true);
      console.log(err);
    })
    .finally(() => {
      // setIsLoading(false);
      // console.log( localStorage.getItem('jwt') );
    })
  }

  // Выход
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUserData({});
    navigate('/', { replace: true });
  }


  function handleUpdateUser(userInfo) {
    // setIsLoading(true);
    mainApi.setUserInfo(userInfo)
      .then(() => {
        setUserData({
          // ...userData,
          name: userInfo.name,
          email: userInfo.email,
        });
        // closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

  // -------------------------------

  React.useEffect(() => {
    checkAuth();
    console.log('checkAuth useEffect');
  }, []);

  React.useEffect(() => {
    if(isLoggedIn) {
      mainApi.setToken();
    }
    console.log('isLoggedIn => setToken useEffect:', isLoggedIn);
  }, [isLoggedIn]);



  // -----------------------------------------------------------------------------------------------------

  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <Header isLoggedIn={isLoggedIn} />
          <Main />
          <Footer />
        </>} />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} />} />

        <Route path="/movies" element={<>
          <Header isLoggedIn={isLoggedIn} />
          <Movies
            films={films}
            // films={searchMovies}
            handleSearch={handleSearch}

            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isToggle={isToggleMovies}
            setIsToggle={setIsToggleMovies}
            />
          <Footer />
        </>} />
        <Route path="/saved-movies" element={<>
          <Header isLoggedIn={isLoggedIn} />
          <SavedMovies
            films={filmsSaved}

            searchQuery={searchQuerySavedMovies}
            setSearchQuery={setSearchQuerySavedMovies}
            isToggle={isToggleSavedMovies}
            setIsToggle={setIsToggleSavedMovies}
          />
          <Footer />
        </>} />
        <Route path="/profile" element={<>
          <Header isLoggedIn={isLoggedIn} />
          <Profile
            onSignOut={handleSignOut}
            userData={userData}
            onUpdateUser={handleUpdateUser}
          />
        </>} />

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
    </>
  );
}

export default App;
