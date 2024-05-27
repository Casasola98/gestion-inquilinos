import { useRouteError } from "react-router-dom";

import logo from '../img/logo.svg';
import '../css/Error.css';

export default function Pag404() {
  return (
    <div className="error-body">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Oops!</h1>
      <p>La página no existe.</p>
    </div>
  );
}