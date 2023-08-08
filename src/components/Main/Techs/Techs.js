import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="main-page__title">Технологии</h2>
      <div className="techs__content">
        <h3 className="techs__header">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">MongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
