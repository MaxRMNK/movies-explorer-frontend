import { Link } from "react-router-dom";

import './Logo.css';

function Logo() {

  return (
    <Link to="/" className="logo link"><span className="logo__image"></span></Link>
  );
}

export default Logo;


