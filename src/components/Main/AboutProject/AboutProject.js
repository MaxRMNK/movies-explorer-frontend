import './AboutProject.css';

function AboutProject() {
  return (
    <section id="project" className="project">
      <h2 className="main-page__title">О проекте</h2>
      <div className="project__container">
        <article className="project__content">
          <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
          <p className="project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="project__content">
          <h3 className="project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>

      <div className="project__timeline">
        <div className="project__time-section project__time-section_first">
          <div className="project__duration project__duration_blue">1 неделя</div>
          <p className="project__caption">Back-end</p>
        </div>
        <div className="project__time-section project__time-section_second">
          <div className="project__duration project__duration_grey">4 недели</div>
          <p className="project__caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
