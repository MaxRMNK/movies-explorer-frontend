import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Loader from "../Loader/Loader";

function SavedMovies({films}) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList films={films} page='saved-movies' />
      <Loader />
    </main>
  );
}

export default SavedMovies;
