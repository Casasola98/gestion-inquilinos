import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Imports Administrador
import CrearPropiedadAdmin from "./administrador/CrearPropiedadAdmin";
import VisualizarPropiedadA from "./administrador/VisualizarPropiedadA";
import CrearAmenidad from "./administrador/CrearAmenidad";
import VisualizarAmenidad from "./administrador/VisualizarAmenidad";
import VisualizarSoliP from "./administrador/VisualizarSoliP";
import VisualizarSoliA from "./administrador/VisualizarSoliA";
import EnviarMjsA from "./administrador/EnviarMjsA";
import EnviadosA from "./administrador/EnviadosA";
import SolicitudesManteA from "./administrador/SolicitudesManteA";
import RegistrarPagoA from "./administrador/RegistrarPagoA";
import RegistrarSoliManteA from "./administrador/RegistrarSoliManteA";
import AlquilarP from "./administrador/AlquilarP";
import AlquilarA from "./administrador/AlquilarA";


// import InicioAdminP from './InicioAdminP';
// import InicioAdminInq from './InicioAdminInq';


//Imports iniciales
import Home from './Home';
import Login from './Login';
import Pag404 from "./Pag404";
import TableExample from "./TableExample";
import Registrar from "./Registrar";
import Header from '../components/Header';
import InicioAdmin from "./InicioAdmin";


//Imports propietario
import RegistrarP from "./propietario/RegistrarP";
import RegistrarInq from "./propietario/RegistrarInq";
import AmenidadesAql from "./propietario/VisualizarAme";
import MantenimientoP from "./propietario/MantenimientoP";
import InquilinosP from "./propietario/InquilinosP";
import EnviarMjs from "./propietario/EnviarMjs";
import EnviadosP from "./propietario/EnviadosP";
import RecibidosP from "./propietario/RecibidosP";
import ReporteP from "./propietario/ReporteP";
import AmenidadesP from "./propietario/AmenidadesP";
import OpcionesP from "./propietario/OpcionesP";
import OpcionesInqP from "./propietario/OpcionesInqP";
import OpcionesCom from "./propietario/OpcionesCom";
import OpcionesAme from "./propietario/OpcionesAme";
import OpcionesSoli from "./propietario/OpcionesSoli";
import VisualizarP from "./propietario/VisualizarP";
import VisualizarSolicitudesP from "./propietario/VisualizarSolicitudesP";
import VisualizarInq from "./propietario/VisualizarInq";
import VisualizarAlq from "./propietario/VisualizarInq";
import VisualizarAme from "./propietario/VisualizarAme";
import VisualizarSolicitudesA from "./propietario/VisualizarSolicitudesA";
import AlquileresP from "./propietario/AlquileresP";

//Imports inquilino
import EnviarMjsInq from "./Inquilino/EnviarMjsInq";
import EnviadosInq from "./Inquilino/EnviadosInq";  
import RecibidosInq from "./Inquilino/RecibidosInq";
import OpcionesComInq from "./Inquilino/OpcionesComInq";
import OpcionesAlq from "./Inquilino/OpcionesAlq";
import SolicitarProp from "./Inquilino/SolicitarProp";
import SolicitarAme from "./Inquilino/SolicitarAme";
import VisualizarAlquileres from "./Inquilino/VisualizarAlquileres";
import AlquilerInq from "./Inquilino/AlquilerInq";
import ReporteInq from "./Inquilino/ReporteInq";
import MantenimientoInq from "./Inquilino/MantenimientoInq";
import ComunicacionesInq from "./Inquilino/ComunicacionesInq";
import PagosInq from "./Inquilino/PagosInq";



function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const onStorage = () => {
      setIsLogin(localStorage.getItem('user'));
    };
  //  Asi se obtiene el usuario
  //   localStorage.getItem('user')

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="App">
      <Header isLogin={isLogin} />
      <Router>
        {/* hola */}
        <Routes> 
          <Route
            path="/"
            element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/login"
            element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          {/* <Route
            path="/inicioAdminP"
            element={<InicioAdminP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/inicioAdminInq"
            element={<InicioAdminInq isLogin={isLogin} setIsLogin={setIsLogin} />}
          /> */}
          <Route
            path="/opcionesP"
            element={<OpcionesP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
                    <Route
            path="/opcionesCom"
            element={<OpcionesCom isLogin={isLogin} setIsLogin={setIsLogin} />}
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
            path="/opcionesSol"
            element={<OpcionesSoli  isLogin={isLogin} setIsLogin={setIsLogin} />}
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
            path="/visualizarSolicitudesA"
            element={<VisualizarSolicitudesA isLogin={isLogin} setIsLogin={setIsLogin} />}
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
            path="/visualizarAlqInq"
            element={<VisualizarAlquileres isLogin={isLogin} setIsLogin={setIsLogin} />}
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
            path="/inicioAdmin"
            element={<InicioAdmin isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/crearPropiedadAdmin"
            element={<CrearPropiedadAdmin isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarPropiedadA"
            element={<VisualizarPropiedadA isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/crearAmeninidad"
            element={<CrearAmenidad isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarAmenidad"
            element={<VisualizarAmenidad isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarSoliP"
            element={<VisualizarSoliP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/visualizarSoliA"
            element={<VisualizarSoliA isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/enviarMjsA"
            element={<EnviarMjsA isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/enviadosA"
            element={<EnviadosA isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/solicitudesManteA"
            element={<SolicitudesManteA isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/registrarPagoA"
            element={<RegistrarPagoA isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/registrarSoliManteA"
            element={<RegistrarSoliManteA isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/alquilarP"
            element={<AlquilarP isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/alquilarA"
            element={<AlquilarA isLogin={isLogin} setIsLogin={setIsLogin} />}
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
