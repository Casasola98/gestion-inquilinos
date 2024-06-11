import React, { useState } from "react";
import '../css/Home.css';

function Home(props) {
  const { isLogin, setIsLogin } = props;

  // Carga el tipo de usuario que en el login se guardo en el localStorage dentro de la variable tipoUsuario
  const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem('tipoUsuario'));

  // Si nadie ha iniciado sesión lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    return (
      <div className="home">
        <h1 className="title">Sistema de Alquileres</h1>
        <h2>
          Bienvenido 
          {tipoUsuario === 'propietario' ? ' propietario, ' 
          : tipoUsuario === 'admin' ? ' administrador, ' 
          : ' inquilino, '} 
          {isLogin}
        </h2>
        {tipoUsuario === 'admin' && (
          <div className="menu">
            <div className="menu-row">
              <a className="option-link" href="/inicioAdminP">
                Propietarios
              </a>

            </div>
              <a className="option-link" href="/inicioAdminInq">
                Inquilinos
              </a>
          </div>
        )}
        {tipoUsuario === 'propietario' && (
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
          </div>
        )}
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
  } else {
    return (
      <div className="home"></div>
    );
  }
}

export default Home;
