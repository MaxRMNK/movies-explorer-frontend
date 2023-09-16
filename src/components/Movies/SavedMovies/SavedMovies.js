import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect } from "react";

function SavedMovies({
  films,
  setFiltredMoviesBookmarks, moviesInBookmarks,
  isLoading,
  handleSearch,
  isNew,

  handleAddBookmark, handleDelBookmark, handleCheckBookmark,

  message, //setMessage, // Ошибки при поиске фильмов

  searchQuery, setSearchQuery,
  // isToggle, setIsToggle,
}) {


  useEffect(() => {
    // console.log('sdfsdfsd');
    setFiltredMoviesBookmarks(moviesInBookmarks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <main className="saved-movies main">
      <SearchForm
        page='saved-movies'
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
    </main>
  );
}

export default SavedMovies;
