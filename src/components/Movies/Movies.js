import './Movies.css';

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Loader from "./Loader/Loader";

function Movies({films}) {

  // console.log(films);

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList films={films} page='movies' />
      <Loader />
    </main>
  );
}

export default Movies;
