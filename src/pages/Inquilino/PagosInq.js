import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar Axios
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin} = props;
  const [formData, setFormData] = useState({ 
    cedula: localStorage.getItem('user'), 
    idPago: "",
    monto: "",
    tipoPago : "",
    estadoPago: "",
    metodoPago: "",
  });
  
  useEffect(() => {
    if (!isLogin) {
      window.location.href = '/login';
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegister = () => {
    const {cedula, idPago, monto, tipoPago, estadoPago, metodoPago} = formData;
    axios.post('http://localhost:8080/registrarPago', {
      cedula: cedula,
      idPago: idPago,
      monto: monto,
      tipoPago: tipoPago,
      estadoPago: estadoPago,
      metodoPago: metodoPago,

    })
    .then((response) => {
      if (response.data.registrarPago) {
        alert("Registro exitoso");

      } else {
       
        alert("Error al registrar el pago");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      //alert("Error al conectar con el servidor");
    });
  };

    // Lista de etiquetas para los campos de texto y tipos
  const fields = [
      { label: "ID Pago:", type: "number", name: "idPago" },
      { label: "Monto:", type: "number", name: "monto" },
      { label: "Método de pago:", type: "number",extraLabel: "1: Efectivo 2: Tarjeta 3: Transferencia", name: "metodoPago"},
      { label: "Tipo de pago:", type: "number", extraLabel: "1: Alquiler 2: Servicios 3: Mantenimiento", name: "tipoPago" },
      { label: "Estado de pago:", type: "number", extraLabel: "1: Pendiente 2: Realizado 3:Atrasado", name: "estadoPago"}
  ];

    return (
      <div className="propiedades">
        <h1 className="title">Registrar pagos</h1>
        <div className="register-section">
          <div className="form-container">
            {fields.map((field, index) => (
               <div className="form-group" key={index}>
               <label htmlFor={`inputField${index}`}>{field.label}</label>
               <br />
               <input
                 type={field.type}
                 id={`inputField${index}`}
                 name={field.name}
                 className="inputBox"
                 placeholder={`Ingrese ${field.label}`}
                 value={formData[field.name]}
                 onChange={handleChange}
               />
               <br />
               {field.extraLabel && (
                  <>
                    <label htmlFor={`extraLabel${index}`} className="extraLabel">{field.extraLabel}</label>
                    <br />
                  </>
                )}
                <br />
             </div>
            ))}
          </div>
          <button className="option-link" type="button" onClick={handleRegister}>
            Registrar
          </button>
        </div>
      </div>
    );
  }


export default PropiedadesP;
