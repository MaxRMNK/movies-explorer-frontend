import { Link } from "react-router-dom"; // useNavigate

import './PageNotFound.css';

function PageNotFound() {

  // const navigate = useNavigate();

  // const goHome = () => {
  //   navigate(-1, { replace: true });
  // };

  return (
    <main className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__header">404</h1>
        <p className="not-found__paragraph">Страница не найдена</p>
      </div>
      <Link to="/" className="not-found__link link">Назад</Link>
      {/* <button onClick={goHome} className="not-found__button">Назад</button> */}
    </main>
  );
}

export default PageNotFound;
