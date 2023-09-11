import './Movies.css';

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Loader from "./Loader/Loader";

function Movies({
  films,
  handleSearch,
  isLoading,
  searchQuery, setSearchQuery,
  isToggle, setIsToggle,
}) {

  // console.log(films);

  return (
    <main className="movies main">
      <SearchForm
        handleSearch={handleSearch}

        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isToggle={isToggle}
        setIsToggle={setIsToggle}
      />
      <MoviesCardList page='movies' films={films} isLoading={isLoading} />
      <Loader />
    </main>
  );
}

export default Movies;
