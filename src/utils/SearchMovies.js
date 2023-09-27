import { SHORT_FILM_DURATION } from "./constants";


const textFilter = ({ data, text }) => {
  return data.filter((item) =>
    item.nameRU.trim().toLowerCase().includes(text) ||
    item.nameEN.trim().toLowerCase().includes(text)
  );
};

const checkboxFilter = (data) => {
  return data.filter((item) => item.duration <= SHORT_FILM_DURATION);
};

export const searchMovies = ( data, query ) => {
  const text = query.text.trim().toLowerCase();
  const checkbox = query.checkbox;
  // console.log('-----------------');
  // console.log('searchMovies query:', query);
  // console.log('searchMovies text:', text);
  // console.log('searchMovies checkbox:', checkbox);

  if (checkbox === true) {
    return checkboxFilter(textFilter({ data, text }));
  } else {
    return textFilter({ data, text });
  }
}
