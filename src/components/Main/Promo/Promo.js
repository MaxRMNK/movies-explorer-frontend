import './Promo.css';

import NavTab from "../NavTab/NavTab";
// import Preloader from "../../Preloader/Preloader";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab />
      {/* <Preloader /> */}
    </section>
  );
}

export default Promo;
