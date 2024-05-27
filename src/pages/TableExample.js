import React, { useState, useEffect } from "react";
import axios from 'axios';

import logo from '../img/logo.svg';
import '../css/TableExample.css';

function TableExample(props) {
  const { isLogin, setIsLogin } = props;
  const [dataExample, setData] = useState([]);
  const [autores, setAutores] = useState([]);
  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  useEffect(() => {
    axios.get('http://localhost:8080/autores').then((respuesta) => {
      //Se guarda el array de autores en la variable autores usando su funcion set
      //La lista de autores viene dentro de data en recordset
      setAutores(respuesta.data.recordset);
    });
  }, []);

  const cargarLibros = () => {
    axios.get('http://localhost:8080/libros').then((respuesta) => {
      setData(respuesta.data.recordset);
    })
  }

  const editarAutor = (ID_Autor) => {
    localStorage.setItem('autorEditar', ID_Autor);
    //Envia el sistema a la ventana asociada al link /editarPropiedadP
    window.location.href = '/editarPropiedadP';
  };

  const eliminarAutor = (ID_Autor) => {
    console.log(`Eliminando ${ID_Autor}`);

    //Ejemplo de post al backend
    axios.post('http://localhost:8080/libro', {
      ID_Author: ID_Autor
    }).then((respuesta) => {
      //Print temporal para ver como viene la respuesta del backend
      //La info SIEMPRE viene en data, ejemplo respuesta.data
      console.log("Respuesta", respuesta.data);
      //Este if revisa si el backend envió info en un dato llamado message
      //En el backend se define como se llama la estructura del JSON dentro de data donde se pasa la info
      //En casos donde el backend va a enviar un array con info para mostrar, SIEMPRE lo envia dentro de recordset, en este caso
      //vendria dentro de respuesta.data.recordset.
      if (respuesta.data.message) {
        
      }
    })
    console.log(`Editar ${ID_Autor}`);
  };

  if (isLogin) {
    return (
      <div className="table-example">
        <h1 className="title">Ejemplo de Tablas</h1>
        <h2>Autores</h2>
        {autores.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID_Autor</th>
                <th>Nombre</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {autores.map(function (autor, index) {
                return (
                  <tr key={index}>
                    <td>
                      {autor.ID_Autor}
                    </td>
                    <td>
                      {autor.Nombre}
                    </td>
                    <td>
                      <button className="table-btn" onClick={() => editarAutor(autor.ID_Autor)}>
                        Editar
                      </button>
                    </td>
                    <td>
                      <button className="table-btn" onClick={() => eliminarAutor(autor.ID_Autor)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
        <button className="link-test" onClick={cargarLibros}>Cargar libros</button>
        <h2>Libros</h2>
        {dataExample && dataExample.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID_Libro</th>
                <th>Titulo</th>
                <th>Genero</th>
                <th>Descripcion</th>
                <th>Autor</th>
              </tr>
            </thead>
            <tbody>
              {dataExample.map(function (data, index) {
                return (
                  <tr key={index}>
                    <td>
                      {data.ID_Libro}
                    </td>
                    <td>
                      {data.Titulo}
                    </td>
                    <td>
                      {data.Genero}
                    </td>
                    <td>
                      {data.Descripcion}
                    </td>
                    <td>
                      {data.Autor}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  else {
    return (
      <div className="home"></div>
    );
  }
}

export default TableExample;
