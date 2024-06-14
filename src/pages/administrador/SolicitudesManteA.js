import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';


const getFecha = (fecha) => {
	return `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`;
}

function MantenimientoP(props) {
  const { isLogin, setIsLogin } = props;
  const [properties, setProperties] = useState([]);

  
  //idSolicitud, Propiedad.idPropiedad, descripcionProblemaProblema, fechaSolicitud, estadoMantenimientoMantenimiento, prioridad, Proveedores.idProveedor, nombre, primerApellido, segundoApellido, especialidad, telefono FROM SolicitudMantenimiento JOIN Propiedad ON SolicitudMantenimiento.idPropiedad = Propiedad.idPropiedad JOIN PrioridadesPermitidas ON SolicitudMantenimiento.idPrioridad = PrioridadesPermitidas.idPrioridad JOIN Proveedores ON SolicitudMantenimiento.idProveedor = Proveedores.idProveedor JOIN estadoMantenimientosMantenimientoPermitidos ON idestadoMantenimientoMantenimiento = SolicitudMantenimiento.estadoMantenimiento WHERE Propiedad.cedulaPropietario = @cedulaUsuario
  if (!isLogin) {
    window.location.href = '/login';
  }

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarMantenimientosAdmin', { cedula: localStorage.getItem('user') })
      .then((response) => {
        setProperties(response.data.recordset);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  }, [isLogin]);

  
  if (isLogin) {
    return (
      <div className="propiedades">
        <h1 className="title">Solicitudes de mantenimiento</h1>
        <div className="table-contenedor">
          <table className="table">
            <thead>
              <tr>
                <th>ID Solicitud</th>
                <th>ID Propiedad</th>
                <th>Descripción</th>
                <th>Fecha de solicitud</th>
                <th>Estado del mantenimiento</th>
                <th>Prioridad</th>
                <th>ID Proveedor</th>
                <th>Nombre Proveedor</th>
                <th>Apellido 1 Proveedor</th>
                <th>Apellido 2 Proveedor</th>
                <th>Especialidad</th>
                <th>Teléfono Proveedor</th>
              </tr>
            </thead>
            <tbody>
              {properties?.map((property, index) => (
                <tr key={index}>
                  <td>{property.idSolicitud}</td>
                  <td>{property.idPropiedad}</td>
                  <td>{property.descripcionProblema}</td>
                  <td>{getFecha(new Date(property.fechaSolicitud))}</td>
                  <td>{property.prioridad}</td>
                  <td>{property.idProveedor}</td>
                  <td>{property.nombre}</td>
                  <td>{property.primerApellido}</td>
                  <td>{property.segundoApellido}</td>
                  <td>{property.especialidad}</td>
                  <td>{property.telefono}</td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div className="home"></div>
  );
}

export default MantenimientoP;
