// import React from 'react';
// import { useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import './App.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

import films from "../../utils/db-films-lite";

function App() {
  const isLoggedIn = true;

  const location = useLocation();
  // console.log(location.pathname);

  const filmsSaved =  films.filter(function(film) {
    return film.saved === true;
  });
  // console.log(filmsSaved);

  //<React.Fragment></React.Fragment>
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies films={films} />} />
        <Route path="/saved-movies" element={<SavedMovies films={filmsSaved} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signup" replace />} />
      </Routes>
      {
        location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ?
        <Footer /> : ''
      }
    </>
  );
}

export default App;
