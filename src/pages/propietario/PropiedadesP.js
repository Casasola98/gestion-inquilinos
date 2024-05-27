import React, { useState, useEffect } from "react";
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    return (
      <div className="propiedades">
        <h1 className="title">Propiedades</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
              <th>Example</th>
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
      </div>
    );
  }
  else {
    return (
      <div className="home"></div>
    );
  }
}

export default PropiedadesP;
