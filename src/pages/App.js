import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './Home';
import Login from './Login';
import Pag404 from "./Pag404";
import TableExample from "./TableExample";
import PropiedadesP from "./propietario/PropiedadesP";

import Header from '../components/Header';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const onStorage = () => {
      setIsLogin(localStorage.getItem('user'));
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="App">
      <Header isLogin={isLogin} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          <Route
            path="/login"
            element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          <Route
            path="/propiedadesP"
            element={<PropiedadesP isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          <Route
            path="/tableExample"
            element={<TableExample isLogin={isLogin} setIsLogin={setIsLogin} />}
          ></Route>
          <Route
            path="*"
            element={<Pag404 />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
