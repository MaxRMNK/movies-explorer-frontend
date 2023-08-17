import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({films, page}) { // (props)

  // const noFilm = films.length < 1 && console.log(films)

  return (
    <section className="movies-card-list elements">
      {
        (films.length < 1)
        ? <p>Ничего не найдено</p>
        : films.map((film) => (
          <MoviesCard key={film.id} film={film} page={page} />
        ))
      }
    </section>
  );
}

export default MoviesCardList;
