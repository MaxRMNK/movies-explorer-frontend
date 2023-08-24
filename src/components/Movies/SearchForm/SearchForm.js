import './SearchForm.css';

function handleSubmit(e) {
  e.preventDefault();
  console.log('поиск');
}

function handleClick(e) {
  // e.preventDefault();
  console.log('клик');
}

function SearchForm() {
  return (
    <section className="search">
      <form action="#" className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__container">

          <div className="search__container-input">
            <input
              className="search__input"
              type="text"
              id="name"
              name="name"
              placeholder="Фильм"
              spellCheck="true"
            />
            <button type="submit" name="Search" className="search__button button" />
          </div>

          <div className="search__container-toggle">
            <label className="search__label">
              <input className="search__checkbox" placeholder="Короткометражки" type="checkbox" />
              <div className="search__toggle" onClick={handleClick}></div>
              <span className="search__toggle-label">Короткометражки</span>
            </label>
          </div>

        </div>
      </form>
    </section>
  );
}

export default SearchForm;
