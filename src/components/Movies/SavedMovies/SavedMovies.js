import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Loader from "../Loader/Loader";

function SavedMovies({
  films,
  isLoading,
  handleSearch,

  handleAddBookmark, handleDelBookmark, handleCheckBookmark,
  // moviesInBookmarks,
  message, setMessage, // Ошибки при поиске фильмов

  searchQuery, setSearchQuery,
  // isToggle, setIsToggle,
}) {
  return (
    <main className="saved-movies main">
      <SearchForm
        handleSearch={handleSearch}

        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        page='saved-movies'
        films={films}
        isLoading={isLoading}

        handleAddBookmark={handleAddBookmark}
        handleDelBookmark={handleDelBookmark}
        handleCheckBookmark={handleCheckBookmark}
        // moviesInBookmarks={moviesInBookmarks}

        message={message}
      />
      {/* <Loader /> */}
    </main>
  );
}

export default SavedMovies;
