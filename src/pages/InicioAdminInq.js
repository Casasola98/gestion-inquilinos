import React, { useState, useEffect } from "react";
import '../css/Home.css';

function InicioAdminInq(props) {
    const { isLogin, setIsLogin } = props;
    const tipoUsuario = localStorage.getItem('tipoUsuario');
  
    if (!isLogin) {
      window.location.href = '/login';
      return null; // Redirigir, por lo que no es necesario continuar
    }
  
  return (
    <div className="home">
      <h1 className="title">Sistema de Alquileres</h1>
      <h2>
        Bienvenido {tipoUsuario === 'inquilino' ? 'inquilino' : 'usuario'}
      </h2>
      {tipoUsuario === 'inquilino' && (
        <div className="menu">
          <div className="menu-row">
            <a className="option-link" href="/pagosInq">
              Pagos
            </a>
            <a className="option-link" href="/mantenimientoInq">
              Mantenimiento
            </a>
          </div>
          <div className="menu-row">
            <a className="option-link" href="/opcionesComInq">
              Comunicación
            </a>
            <a className="option-link" href="/reporteInq">
              Reporte
            </a>
          </div>
          <div className="menu-row">
            <a className="option-link" href="/opcionesAlq">
              Alquileres
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default InicioAdminInq;
