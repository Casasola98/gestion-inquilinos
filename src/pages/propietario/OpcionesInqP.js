import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Opciones.css';

function OpcionesInq(props) {
  const { isLogin, setIsLogin } = props;

  // Carga el tipo de usuario que en el login se guardo en el localStorage dentro de la variable tipoUsuario
  const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem('tipoUsuario'));
  const navigate = useNavigate();

  // Si nadie ha iniciado sesión, redirige a la ventana de login
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  return (
    <div className="opcionesP">
      <h1 className="title">Opciones de Inquilino</h1>
      <h2>
        
        {tipoUsuario === 'propietario' ? ' propietario, ' 
        : tipoUsuario === 'admin' ? ' administrador, ' 
        : ' inquilino, '} 
        {isLogin}
      </h2>
      {tipoUsuario === 'propietario' && (
        <div className="menu">
          <div className="menu-row">
            <a className="option-link" href="/visualizarSolicitudesP">
              Visualizar solicitudes 
            </a>
            <a className="option-link" href="/visualizarInq">
              Visualizar inquilinos
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpcionesInq;
