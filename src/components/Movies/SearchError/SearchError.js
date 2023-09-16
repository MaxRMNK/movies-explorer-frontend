import './SearchError.css';

function SearchError({ message }) {
  // console.log('SearchError - message:', message);

  // if (message === null) {}

  return (
    <p className="search-error">
      { message || ' '}
    </p>
  );
}

export default SearchError;
