import React, { useState, useEffect } from "react";
import { useHref } from "react-router-dom";
import axios from 'axios';

import logo from '../img/logo.svg';
import '../css/Login.css';

import Header from '../components/Header';

function Login(props) {
  const { isLogin, setIsLogin } = props;

  const [cedula, setCedula] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('admin');

  const [cedulaError, setCedulaError] = useState('');

  // Si hay una sesion iniciada, lo envia a la ventana de home.
  if (isLogin) {
    window.location.href = '/';
  }

  const registrar = () => {
    window.location.href = '/registrar';

  }

  const iniciarSesion = () => {
    if (cedula == '') {
      setCedulaError("Error ingrese su cédula");
      return;
    } 
    else {
      setCedulaError('');
    } 
    
    //Aca se conecta con la funcion del backend
    axios.post('http://localhost:8080/login', {
      cedula: cedula,
      rol: tipoUsuario,
      
    }).then((respuesta) => {     
      if (respuesta.data.existeUsuario) {
        localStorage.setItem('user', cedula);
        localStorage.setItem('tipoUsuario', tipoUsuario);
        setIsLogin(localStorage.getItem('user'));
      }
    })
  
  };
  
  return (
    <div className="login">
      <h1 className="title">
        Inicio de sesion
      </h1>
      <div className="login-form">
        <div className="inputContainer">
          <input
            type="number"
            value={cedula}
            placeholder="Ingrese su cedula"
            onChange={(ev) => setCedula(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{cedulaError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <select
            value={tipoUsuario}
            onChange={(ev) => setTipoUsuario(ev.target.value)}
            className="inputBox"
          >
            <option value="admin">Administrador</option>
            <option value="propietario">Propietario</option>
            <option value="inquilino">Inquilino</option>
          </select>
        </div>
        <br />
        <div className="inputContainer">
          <button className="option-link" type="button" onClick={iniciarSesion}>
            Ingresar
          </button>
          <br />
          <button className="option-link" type="button" onClick={registrar}>
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
