import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";
import Loader from "../Loader/Loader";
import Preloader from "../../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";

function MoviesCardList({
    films,
    isLoading,
    page,
    handleAddBookmark, handleDelBookmark, handleCheckBookmark,
    // moviesInBookmarks,
    message, setMessage, // Ошибки при поиске фильмов
  }) { // (props)

  // const noFilm = films.length < 1 && console.log(films)
  // {isLoading ? (
  //   <Preloader />
  // ) : (

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
            (films.length < 12 ? '' :
              <Loader />
            )
          }
        </>)
      )}

    </section>
  );
}

export default MoviesCardList;



// // 5:14
// return (
//   <section className="movies-card-list">

//     {/* { isLoading ? (
//       <Preloader />
//     ) : ( <> */}
//       <div className="elements">
//         {(films.length < 1) ? (
//           <p>Ничего не найдено</p>
//         ) : (
//           films.map((film) => (
//             <MoviesCard key={film.movieId} film={film} page={page} />
//           ))
//         )}
//       </div>
//       <Loader />
//     {/* </>) } */}

//   </section>
// );
