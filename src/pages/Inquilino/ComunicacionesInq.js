import React, { useState, useEffect } from "react";
import '../../css/Propiedades.css';

function ComuInq(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "Cédula del receptor:", type: "number" },
      
      { label: "Contenido:", type: "text" },

    ];

    return (
      <div className="comunicaciones">
        <h1 className="title">Mensajes Recibidos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID del mensaje</th>
              <th>Cédula del emisor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Contenido</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
              <td>Mexico</td>
            </tr>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </tbody>
        </table>

        <h1 className="title">Mensajes Enviados</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID del mensaje</th>
              <th>Cédula del receptor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Contenido</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
              <td>Mexico</td>
            </tr>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </tbody>
        </table>

        <div className="register-section">
          <h2 className="title">Enviar mensaje</h2>
          <div className="form-container">
            {fields.map((field, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`inputField${index}`}>{field.label}</label>
                <br />
                <input
                  type={field.type}
                  id={`inputField${index}`}
                  className="inputBox"
                  placeholder={`Ingrese ${field.label.toLowerCase()}`}
                />
                <br />
                {field.extraLabel && (
                  <>
                    <label htmlFor={`extraLabel${index}`} className="extraLabel">{field.extraLabel}</label>
                    <br />
                  </>
                )}
              </div>
            ))}
          </div>
          <button className="option-link" type="button">
            Enviar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home"></div>
  );
}

export default ComuInq;
