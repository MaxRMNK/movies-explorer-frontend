import { useState } from "react";

import './Loader.css';

import Preloader from "../Preloader/Preloader"

function Loader() {

  const [load, setLoad] = useState(false);

  function moreClick(e) {
    // e.preventDefault();
    setTimeout(() => {
      setLoad(false);
      console.log('Возвращаю кнопку');
    }, 5000)

    setLoad(true);
    console.log('Показываю прелоадер 5 сек');
  }

  return (
    <section className="loader">
      { load
        ? <Preloader />
        : <button className="loader__more-button button" type="button" aria-label="Загрузить ещё" onClick={moreClick}>Ещё</button>
      }
    </section>
  );
}

export default Loader;
