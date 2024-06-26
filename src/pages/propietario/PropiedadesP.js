import React, { useState, useEffect } from "react";
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "ID Propiedad", type: "number" },
      { label: "Tipo de Propiedad", type: "text" },
      { label: "Tamaño", type: "text" },
      { label: "Descripción", type: "text" },
      { label: "Precio", type: "number" },
      { label: "Dirección", type: "text" },
      { label: "Número de Habitaciones", type: "number" },
      { label: "Estado", type: "number", extraLabel: "1: Disponible 2:Ocupado 3:En mantenimiento" },
      { label: "Gastos Adicionales", type: "number" }
    ];

    return (
      <div className="propiedades">
        <h1 className="title">Visualizar propiedades</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID Propiedad</th>
              <th>Tipo</th>
              <th>Tamaño</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Dirección</th>
              <th>Num Habitaciones</th>
              <th>Estado</th>
              <th>Gastos adicionales</th>
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
          </tbody>
        </table>
        <div className="register-section">
          <h2 className="title">Registrar</h2>
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
            Registrar
          </button>
          <button className="option-link" type="button">
            Editar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home"></div>
  );
}

export default PropiedadesP;
