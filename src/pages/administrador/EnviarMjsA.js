import React from "react";
import '../../css/Propiedades.css';

function Enviar(props) {
  const { isLogin } = props;

  // Si nadie ha iniciado sesión, lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "ID del mensaje:", type: "number" },
      { label: "Cédula del receptor:", type: "number" },
      { label: "Contenido:", type: "text" },
      { label: "Cédula del emisor:", type: "text" },

    ];

    return (
      <div className="comunicaciones">
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

export default Enviar;
