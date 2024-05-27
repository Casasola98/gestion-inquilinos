import React, { useState, useEffect } from "react";
import logo from '../img/logo.svg';
import '../css/Home.css';

function Home(props) {
  const { isLogin, setIsLogin } = props;

  //Carga el tipo de usuario que en el login se guardo en el localStorage dentro de la variable tipoUsuario
  const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem('tipoUsuario'));

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    return (
      <div className="home">
        <h1 className="title">Sistema de Alquileres</h1>
        <h2>
          Bienvenido 
          {tipoUsuario == 'propietario' ? ' propietario, ' 
          : tipoUsuario == 'admin' ? ' administrador, ' 
          : ' inquilino, '} 
          {isLogin}
        </h2>
        {tipoUsuario == 'admin' && (
          <div className="menu">
            <div className="menu-row">
              <a className="option-link" href="">
                Inquilinos
              </a>
              <a className="option-link" href="">
                Comunicaciones
              </a>
            </div>
          </div>
        )}
        {tipoUsuario == 'propietario' && (
          <div className="menu">
            <div className="menu-row">
              <a className="option-link" href="/propiedadesP">
                Propiedades
              </a>
              <a className="option-link" href="/tableExample">
                Amenidades
              </a>
            </div>
            <div className="menu-row">
              <a className="option-link" href="">
                Inquilinos
              </a>
              <a className="option-link" href="">
                Comunicaciones
              </a>
            </div>
            <div className="menu-row">
              <a className="option-link" href="">
                Mantenimiento
              </a>
              <a className="option-link" href="">
                Reportes
              </a>
            </div>
          </div>
        )}
        {tipoUsuario == 'inquilino' && (
          <div className="menu">
            <div className="menu-row">
              <a className="option-link" href="">
                Propiedades
              </a>
              <a className="option-link" href="">
                Amenidades
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
  else {
    return (
      <div className="home"></div>
    );
  }
}

export default Home;
