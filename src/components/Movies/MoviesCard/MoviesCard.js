// import { useState, useEffect, useId } from "react";

import './MoviesCard.css';

function MoviesCard({
    film,
    page,
    handleAddBookmark, handleDelBookmark, handleCheckBookmark,
    // moviesInBookmarks,
  }) {

  const bookmark = handleCheckBookmark(film);
  // let bookmark = moviesInBookmarks.some((item) => item.movieId === film.movieId);

  function bookmarkClick() {
    if (!bookmark) {
      handleAddBookmark(film);
    } else {
      handleDelBookmark(film);
    }
  }

  const bookmarkButtonClassName = ( `element__bookmark button
    ${ page === 'movies' && ( bookmark && 'element__bookmark_active' ) }
    ${ page === 'saved-movies' && 'element__bookmark_delete'}
    ` );
  const bookmarkButtonLabel = ( page === 'movies' & bookmark === false ? 'Добавить в закладки' : 'Удалить из закладок' );

  // Формат: 00:00
  // const hours = Math.trunc(duration/60);
  // const min = String(duration % 60).padStart(2, '0');
  // const time = `${hours}:${min}`;

  // Формат: 0ч 0м
  const time = `${Math.trunc(film.duration / 60)}ч ${film.duration % 60}м`;


  return (
    <article className="element">
      {/* { saved && setBookmark(true) } */}
      <div className="element__caption">
        <div className="element__heading">
          <h2 className="element__header" title={film.nameRU}>{film.nameRU}</h2>
          <p className="element__duration">{time}</p>
        </div>
        <button
          className={bookmarkButtonClassName}
          type="button"
          aria-label={bookmarkButtonLabel}
          onClick={bookmarkClick}
        />
      </div>
      <a href={film.trailerLink} className="element__link" target="_blank" rel="noreferrer noopener">
        {/* <img src={image.url} alt={nameRU} className="element__image" /> */}
        <img src={film.image} alt={film.nameRU} className="element__image" />
      </a>
    </article>
  );
}

export default MoviesCard;
