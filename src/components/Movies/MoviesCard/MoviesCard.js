import { useState, useEffect } from "react";

import './MoviesCard.css';

function MoviesCard({film, page}) {
const {nameRU, duration, image, saved} = film; // id

const [bookmark, setBookmark] = useState(false);

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => { saved && setBookmark(true) }, []);

function bookmarkClick(e) {
  if (bookmark) {
    setBookmark(false);
  } else {
    setBookmark(true);
  }
}

// На разных страницах нужно подставлять разные функции или сделать проверку в рамках одной?
// function bookmarkDeleteClick(e) {
//   if (bookmark) {
//     setBookmark(false);
//   } else {
//     setBookmark(true);
//   }
// }

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
const time = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;

  return (
    <article className="element">
      {/* { saved && setBookmark(true) } */}
      <div className="element__caption">
        <div className="element__heading">
          <h2 className="element__header">{nameRU}</h2>
          <p className="element__duration">{time}</p>
        </div>
          <button className={bookmarkButtonClassName} type="button" aria-label={bookmarkButtonLabel} onClick={bookmarkClick} />
      </div>
      <a href="/" className="element__link" target="_blank" rel="noreferrer noopener">
        <img src={image.url} alt={nameRU} className="element__image" />
      </a>
    </article>
  );
}

export default MoviesCard;
