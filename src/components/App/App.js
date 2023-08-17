// import React from 'react';
// import { Navigate, useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";


import './App.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../Movies/SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";

import films from "../../utils/db-films-lite";

function App() {

  // const [isLoggedIn, setLoggedIn] = React.useState(true);
  const isLoggedIn = true;

  const location = useLocation().pathname;
  // console.log(location);
  const pathName = location.substring(1);

  const filmsSaved =  films.filter(function(film) {
    return film.saved === true;
  });
  // console.log(filmsSaved);

  //<React.Fragment></React.Fragment>
  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <Header isLoggedIn={isLoggedIn} pathName={pathName} />
          <Main />
          <Footer />
        </>} />
        <Route path="/movies" element={<>
          <Header isLoggedIn={isLoggedIn} pathName={pathName} />
          <Movies films={films} />
          <Footer />
        </>} />
        <Route path="/saved-movies" element={<>
          <Header isLoggedIn={isLoggedIn} pathName={pathName} />
          <SavedMovies films={filmsSaved} />
          <Footer />
        </>} />
        <Route path="/profile" element={<>
          <Header isLoggedIn={isLoggedIn} pathName={pathName} />
          <Profile />
        </>} />
        <Route path="/signin" element={<>
          <Header isLoggedIn={isLoggedIn} pathName={pathName} />
          <Login />
        </>} />
        <Route path="/signup" element={<>
          <Header isLoggedIn={isLoggedIn} pathName={pathName} />
          <Register />
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
