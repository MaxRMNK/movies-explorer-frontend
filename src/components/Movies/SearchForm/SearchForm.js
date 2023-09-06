import React from "react";

import './SearchForm.css';


// function handleClick(e) {
//   // e.preventDefault();
//   console.log('клик');
// }

function SearchForm({
  handleSearch,
  searchQuery, setSearchQuery,
  isToggle, setIsToggle,
}) {

  function handleSubmit(evt) {
    evt.preventDefault();

    handleSearch(searchQuery);

    // const {name, value} = evt.target.name;
    // setSearchQuery();
    // console.log('поиск 1', evt.target.name);
    // console.log('поиск 2', evt.target.value);
    console.log(searchQuery);
  }

  const handleChange = (evt) => {
    // const {name, value} = evt.target;
    setSearchQuery( evt.target.value );
  }

  function handleClick(e) {
    setIsToggle(!isToggle);
    // setIsToggle(e.target.checked);
    // console.log('клик 1', isToggle);
    // console.log('клик 2', e.target.checked);
  }

  // React.useEffect(() => {
  //   console.log('isToggle useEffect', isToggle);
  // }, [isToggle]);

  return (
    <section className="search">
      <form action="#" className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__container">

          <div className="search__container-input">
            <input
              className="search__input"
              id="search"
              name="search"
              type="text"
              minLength="2"
              maxLength="100"
              placeholder="Фильм"
              spellCheck="true"
              value={searchQuery}
              onChange={handleChange}
            />
            <button type="submit" name="Search" className="search__button button" />
          </div>

          <div className="search__container-toggle">
            <label className="search__label">
              <input
                className="search__checkbox"
                placeholder="Короткометражки"
                type="checkbox"
                checked={isToggle}
                onChange={handleClick}
              />
              <div className="search__toggle"></div>
              <span className="search__toggle-label">Короткометражки</span>
            </label>
          </div>

        </div>
      </form>
    </section>
  );
}

export default SearchForm;
