import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar Axios
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin, setIsLogin } = props;
  const [metodoPago, setMetodoPago] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [estadoPago, setEstadoPago] = useState("");

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "ID Pago:", type: "number" },
      { label: "Monto:", type: "number" },
      { label: "Método de pago:", type: "dropdown", options: ["Efectivo", "Tarjeta", "Transferencia"] },
      { label: "Tipo de pago:", type: "dropdown", options: ["Alquiler", "Servicios", "Mantenimiento"] },
      { label: "Estado de pago:", type: "dropdown", options: ["Pendiente", "Realizado", "Atrasado"] }
    ];

    const handleSelectChange = (index, value) => {
      switch (index) {
        case 2: // Método de pago
          setMetodoPago(value);
          break;
        case 3: // Tipo de pago
          setTipoPago(value);
          break;
        case 4: // Estado de pago
          setEstadoPago(value);
          break;
        default:
          break;
      }
    };

    function getFecha(date) {
      const dia = date.getDate().toString().padStart(2, '0'); 
      const mes = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const anio = date.getFullYear().toString(); 
    
      return `${dia}/${mes}/${anio}`;
    }
    // Función para enviar los datos al backend
    const registrarPago = async () => {
      const idPago = document.getElementById('inputField0').value;
      const monto = document.getElementById('inputField1').value;
      const cedula = localStorage.getItem('user');
      const fechaActual = new Date();
      const fechaPago = getFecha(fechaActual);

      const data = {
        cedula,
        idPago,
        monto,
        tipoPago,
        estadoPago,
        metodoPago
      };

      try {
        // Realizar la solicitud POST al backend utilizando Axios
        const response = await axios.post('/registrarPago', data);

        // Verificar la respuesta del servidor
        if (response.data.registrarPago) {
          // Registro exitoso
          alert('Pago registrado correctamente');
        } else {
          // Error al registrar
          alert('Error al registrar el pago');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar registrar el pago');
      }
    };

    return (
      <div className="propiedades">
        <h1 className="title">Registrar pagos</h1>
        <div className="register-section">
          <div className="form-container">
            {fields.map((field, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`inputField${index}`}>{field.label}</label>
                <br />
                {field.type === "dropdown" ? (
                  <select
                    id={`inputField${index}`}
                    className="inputBox"
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                    value={index === 2 ? metodoPago : index === 3 ? tipoPago : estadoPago}
                  >
                    <option value="" disabled hidden>Seleccione una opción</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={`inputField${index}`}
                    className="inputBox"
                    placeholder={`Ingrese ${field.label.toLowerCase()}`}
                  />
                )}
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
          <button className="option-link" type="button" onClick={registrarPago}>
            Registrar
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
