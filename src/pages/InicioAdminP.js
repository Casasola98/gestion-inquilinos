import React, { useState, useEffect } from "react";
import '../css/Home.css';

function InicioAdminP() {
  // Carga el tipo de usuario que en el login se guardo en el localStorage dentro de la variable tipoUsuario
  const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem('tipoUsuario'));

  // Si el usuario no es propietario, redirigir o mostrar mensaje
  useEffect(() => {
    if (tipoUsuario !== 'propietario') {
      window.location.href = '/no-access'; // Redirigir a una página de acceso denegado
    }
  }, [tipoUsuario]);

  if (tipoUsuario === 'propietario') {
    return (
      <div className="home">
        <h1 className="title">Opciones para Propietarios</h1>
        <div className="menu">
          <div className="menu-row">
            <a className="option-link" href="/opcionesP">
              Propiedades
            </a>
            <a className="option-link" href="/opcionesAme">
              Amenidades
            </a>
          </div>
          <div className="menu-row">
            <a className="option-link" href="/opcionesInqP">
              Inquilinos
            </a>
            <a className="option-link" href="/opcionesCom">
              Comunicaciones
            </a>
          </div>
          <div className="menu-row">
            <a className="option-link" href="/mantenimientoP">
              Mantenimiento
            </a>
            <a className="option-link" href="/reporteP">
              Reportes
            </a>
          </div>
          <div className="menu-row">
            <a className="option-link" href="/alquileresP">
              Alquileres
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home">
        <h1>No tiene acceso a esta página</h1>
      </div>
    );
  }
}

export default InicioAdminP;