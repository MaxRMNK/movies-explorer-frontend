import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

function MoviesCardList({films, isLoading, page}) { // (props)

  // const noFilm = films.length < 1 && console.log(films)
  // {isLoading ? (
  //   <Preloader />
  // ) : (

  return (
    <section className="movies-card-list elements">
      { isLoading ? (
        <Preloader />
        ) : (
          (films.length < 1) ? (
            <p>Ничего не найдено</p>
          ) : (
            films.map((film) => (
              <MoviesCard key={film.movieId} film={film} page={page} />
            ))
          )
        )

        // Было до добавления прелоадера:
        // ----------------------------------------
        // (films.length < 1) ? (
        //   <p>Ничего не найдено</p>
        // ) : (
        //   films.map((film) => (
        //     <MoviesCard key={film.movieId} film={film} page={page} />
        //   ))
        // )
      }
    </section>
  );
}

export default MoviesCardList;
