import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Loader from "../Loader/Loader";

function SavedMovies({
  films,
  handleSearch,
  searchQuery, setSearchQuery,
  isToggle, setIsToggle,
}) {
  return (
    <main className="saved-movies main">
      <SearchForm
        handleSearch={handleSearch}

        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isToggle={isToggle}
        setIsToggle={setIsToggle}
      />
      <MoviesCardList page='saved-movies' films={films} />
      <Loader />
    </main>
  );
}

export default SavedMovies;
