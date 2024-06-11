import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InicioAdminP from './InicioAdminP';
import InicioAdminInq from './InicioAdminInq';

import Home from './Home';
import Login from './Login';
import Pag404 from "./Pag404";
import TableExample from "./TableExample";
import RegistrarP from "./propietario/RegistrarP";
import RegistrarInq from "./propietario/RegistrarInq";
import AmenidadesAql from "./propietario/VisualizarAme";
 
import InquilinosP from "./propietario/InquilinosP";
import MantenimientoP from "./propietario/MantenimientoP";
import EnviarMjs from "./propietario/EnviarMjs";
import EnviarMjsInq from "./Inquilino/EnviarMjsInq";

import EnviadosP from "./propietario/EnviadosP";
import EnviadosInq from "./Inquilino/EnviadosInq";  
import RecibidosP from "./propietario/RecibidosP";
import RecibidosInq from "./Inquilino/RecibidosInq";

import ReporteP from "./propietario/ReporteP";
import AmenidadesP from "./propietario/AmenidadesP";

import OpcionesP from "./propietario/OpcionesP";
import OpcionesInqP from "./propietario/OpcionesInqP";
import OpcionesCom from "./propietario/OpcionesCom";
import OpcionesComInq from "./Inquilino/OpcionesComInq";
import OpcionesAme from "./propietario/OpcionesAme";
import OpcionesAlq from "./Inquilino/OpcionesAlq";
import SolicitarProp from "./Inquilino/SolicitarProp";
import SolicitarAme from "./Inquilino/SolicitarAme";


import VisualizarP from "./propietario/VisualizarP";
import VisualizarSolicitudesP from "./propietario/VisualizarSolicitudesP";
import VisualizarInq from "./propietario/VisualizarInq";
import VisualizarAlq from "./propietario/VisualizarInq";
import VisualizarAme from "./propietario/VisualizarAme";
import AlquileresP from "./propietario/AlquileresP";
import AlquilerInq from "./Inquilino/AlquilerInq";

import Registrar from "./Registrar";
import ReporteInq from "./Inquilino/ReporteInq";
import MantenimientoInq from "./Inquilino/MantenimientoInq";
import ComunicacionesInq from "./Inquilino/ComunicacionesInq";
import PagosInq from "./Inquilino/PagosInq";
import Header from '../components/Header';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const onStorage = () => {
      setIsLogin(localStorage.getItem('user'));
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="App">
      <Header isLogin={isLogin} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/login"
            element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/inicioAdminP"
            element={<InicioAdminP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/inicioAdminInq"
            element={<InicioAdminInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/opcionesP"
            element={<OpcionesP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/opcionesInqP"
            element={<OpcionesInqP  isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/opcionesComInq"
            element={<OpcionesComInq  isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/opcionesAme"
            element={<OpcionesAme  isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/opcionesAlq"
            element={<OpcionesAlq  isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/registrarP"
            element={<RegistrarP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/registrarInq"
            element={<RegistrarInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarP"
            element={<VisualizarP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarSolicitudesP"
            element={<VisualizarSolicitudesP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarInq"
            element={<VisualizarInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarAlq"
            element={<VisualizarAlq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarAme"
            element={<VisualizarAme isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/tableExample"
            element={<TableExample isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/inquilinosP"
            element={<InquilinosP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/mantenimientoP"
            element={<MantenimientoP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/enviaMjs"
            element={<EnviarMjs isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/enviarMjsInq"
            element={<EnviarMjsInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/enviadosP"
            element={<EnviadosP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/enviadosInq"
            element={<EnviadosInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/recibidosP"
            element={<RecibidosP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
         <Route
            path="/recibidosInq"
            element={<RecibidosInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/reporteP"
            element={<ReporteP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/amenidadesP"
            element={<AmenidadesP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/pagosInq"
            element={<PagosInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/registrar"
            element={<Registrar isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/reporteInq"
            element={<ReporteInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/mantenimientoInq"
            element={<MantenimientoInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/comunicacionesInq"
            element={<ComunicacionesInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/alquileresP"
            element={<AlquileresP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/alquileresInq"
            element={<AlquilerInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/solicitarProp"
            element={<SolicitarProp isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/solicitarAme"
            element={<SolicitarAme isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="*"
            element={<Pag404 />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
