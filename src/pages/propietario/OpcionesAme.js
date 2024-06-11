import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Opciones.css';

function OpcionesP(props) {
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
      <h1 className="title">Amenidades</h1>
      <h2>
        
        {tipoUsuario === 'propietario' ? ' propietario, ' 
        : tipoUsuario === 'admin' ? ' administrador, ' 
        : ' inquilino, '} 
        {isLogin}
      </h2>
      {tipoUsuario === 'propietario' && (
        <div className="menu">
          <div className="menu-row">
            <a className="option-link" href="/amenidadesP">
              Registrar amenidad
            </a>
            <a className="option-link" href="/visualizarAme">
              Visualizar amenidades
            </a>
          </div>

        </div>
      )}
    </div>
  );
}

export default OpcionesP;
