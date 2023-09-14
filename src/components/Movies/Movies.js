import './Movies.css';

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
// import Loader from "./Loader/Loader";
// import Preloader from "../Preloader/Preloader";
// import SearchError from "./SearchError/SearchError";

function Movies({
  films,
  isLoading,
  handleSearch, //handleCheckbox,

  handleAddBookmark, handleDelBookmark, handleCheckBookmark,
  // moviesInBookmarks,
  message, setMessage, // Ошибки при поиске фильмов

  searchQuery, setSearchQuery,
}) {
  return (
    <main className="movies main">
      <SearchForm
        handleSearch={handleSearch}

        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        page='movies'
        films={films}
        isLoading={isLoading}

        handleAddBookmark={handleAddBookmark}
        handleDelBookmark={handleDelBookmark}
        handleCheckBookmark={handleCheckBookmark}
        // moviesInBookmarks={moviesInBookmarks}

        message={message}
        // setMessage={setMessage}
      />
    </main>
  );
}

export default Movies;
