import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="section-title">Технологии</h2>
      <div className="techs__content">
        <p className="section-focus techs-focus">7 технологий</p>
        <p className="section-paragraph section-paragraph_center">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
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
