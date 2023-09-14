import './SearchError.css';

function SearchError({ message }) {
  // console.log('message', message);

  // if (message === null) {}

  return (
    <p className="search-error">
      { message || 'При загрузке данных произошла ошибка ***'}
    </p>
  );
}

export default SearchError;
