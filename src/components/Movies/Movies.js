import { useState, useEffect } from 'react';
import { useMediaQuery } from "../../hooks/useMediaQuery";

import './Movies.css';

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
// import Loader from "./Loader/Loader";
// import Preloader from "../Preloader/Preloader";
// import SearchError from "./SearchError/SearchError";

import { DESKTOP_MIN_WIDTH, TABLET_MIN_WIDTH, // MOBILE_MIN_WIDTH,
  LG_INITIAL_CARD_COUNT, MD_INITIAL_CARD_COUNT, SM_INITIAL_CARD_COUNT,
  LG_ROW_CARD_COUNT, MD_ROW_CARD_COUNT, SM_ROW_CARD_COUNT } from "../../utils/constants";

function Movies({
  films,
  isLoading,
  handleSearch, //handleCheckbox,

  handleAddBookmark, handleDelBookmark, handleCheckBookmark,
  // moviesInBookmarks,
  message, //setMessage, // Ошибки при поиске фильмов

  searchQuery, setSearchQuery,
}) {

  const [cards, setCards] = useState(films);

  const isDesktop = useMediaQuery(DESKTOP_MIN_WIDTH);
  const isTablet = useMediaQuery(TABLET_MIN_WIDTH);
  // const isPhone = useMediaQuery(MOBILE_MIN_WIDTH);

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT
    : (isTablet
      ? MD_ROW_CARD_COUNT
      : SM_ROW_CARD_COUNT);

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : (isTablet
      ? MD_INITIAL_CARD_COUNT
      : SM_INITIAL_CARD_COUNT);

  const [visibleCardCount, setVisibleCardCount] = useState(initialCardCount);

  // округление до ровного числа карточек в строке
  const roundedVisibleCardCount = isTablet ? (Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount) : visibleCardCount;

  const handleClickMore = () => { calculateCardCount(); };

  const calculateCardCount = () => {
    if (isDesktop) { return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT); }

    if (isTablet) { return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT); }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
  };

  // console.log('isTablet', isTablet);
  // console.log('isPhone', isPhone);
  // console.log('cardColumnCount', cardColumnCount);
  // console.log('roundedVisibleCardCount', roundedVisibleCardCount);
  // console.log(window.innerWidth);
  // debugger;

  useEffect(() => {
    setCards(films);
  }, [ films, cards ]);

  useEffect(() => {
    setVisibleCardCount(initialCardCount);
  }, [ searchQuery, initialCardCount ]);


  return (
    <main className="movies main">
      <SearchForm
        page='movies'
        handleSearch={handleSearch}

        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        page='movies'
        // films={films}
        // films={cards}
        films={cards?.slice(0, roundedVisibleCardCount)}
        // setCards={setCards}
        handleClickMore={handleClickMore}
        summCards={cards.length}

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
