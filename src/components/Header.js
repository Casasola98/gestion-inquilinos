import React, { useState, useEffect } from "react";
import '../css/Header.css';
import inmobiliaria from '../img/inmobiliaria.png';

function Header(props) {
  const { isLogin } = props;

  const cerrarSesion = () => {
    localStorage.removeItem('user');
  }

  return (
    <div className="Header">
      <a href="/">
        <img className='Header-logo' src={inmobiliaria} alt="Inmobiliaria" />
      </a>
      {isLogin && (
        <a className='Header-login' href='/' onClick={cerrarSesion}>Cerrar Sesion</a>
      )}
    </div>
  );
}

export default Header;
