import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";
import Loader from "../Loader/Loader";
import Preloader from "../../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";

function MoviesCardList({
    films,
    // handleClickMore,
    // summCards
    isLoading,
    page,
    handleAddBookmark, handleDelBookmark, handleCheckBookmark,
    // moviesInBookmarks,
    message, // setMessage, // Ошибки при поиске фильмов
    ...props
  }) {

  // console.log('films.length', films.length);
  // console.log('props.summCards', props.summCards);

  return (
    <section className="movies-card-list">

      { isLoading ? (
        <Preloader />
      ) : (
        (films.length < 1) ? (
        // (message) ? (
          <SearchError message={message} />
        ) : ( <>
          <div className="elements">
            {
              films.map((film) => (
                <MoviesCard
                  key={film.movieId}
                  film={film}
                  page={page}

                  handleAddBookmark={handleAddBookmark}
                  handleDelBookmark={handleDelBookmark}
                  handleCheckBookmark={handleCheckBookmark}
                  // moviesInBookmarks={moviesInBookmarks}
                 />
              ))
            }
          </div>
          { page === 'saved-movies' ? '' :
            (films.length >= props?.summCards ? '' :
              // <Loader />
              <Loader handleClickMore={props?.handleClickMore} />
            )
          }
        </>)
      )}

    </section>
  );
}

export default MoviesCardList;
