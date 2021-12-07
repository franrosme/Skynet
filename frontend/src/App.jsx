import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Index from 'pages/Index';
import Page2 from 'pages/Page2';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import IndexUsuarios from 'pages/usuarios/index';
import IndexProyectos from 'pages/proyectos/index';
import Proyecto from 'pages/proyectos/proyecto';
import PerfilUsuario from 'pages/usuarios/usuario';
import EditarUsuario from 'pages/usuarios/editar';
import EditarProyecto from 'pages/proyectos/editar';
import CrearProyecto from 'pages/proyectos/crear';
import Inscripciones from 'pages/proyectos/inscripciones';
import EstadoInscripcion from 'pages/proyectos/estadoInscripcion';
import Avances from 'pages/proyectos/avances';
import 'styles/globals.css';
import 'styles/tabla.css';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';
import AgregarObservacion from 'pages/proyectos/observacion';
import AgregarAvance from 'pages/proyectos/agregarAvance';
import EditarAvance from 'pages/proyectos/editarAvance';
import Inscripcion from 'pages/proyectos/inscripcion';
import CambiarEstadoUsuario from 'pages/usuarios/cambiarEstado';
import  AprobarProyecto  from "pages/proyectos/cambiarEstado/aprobar";
import TerminarProyecto from "pages/proyectos/cambiarEstado/terminar"
import InactivarProyecto from 'pages/proyectos/cambiarEstado/inactivar';
import ReabrirProyecto from 'pages/proyectos/cambiarEstado/reabrir';
// import PrivateRoute from 'components/PrivateRoute';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        idUsuario: decoded.idUsuario,
        email: decoded.email,
        nombre: decoded.nombre,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<IndexUsuarios _id= {userData._id}/>} />
                <Route path='/usuario' element={<PerfilUsuario _id= {userData._id}/>} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario _id= {userData._id} />} />
                <Route path='/usuarios/cambiarEstado/:_id' element={<CambiarEstadoUsuario _id= {userData._id} />} />
                <Route path='/proyectos' element={<IndexProyectos _id= {userData._id}/>} />
                <Route path='/proyecto/:_id' element={<Proyecto _id= {userData._id}/>} />
                <Route path='/proyecto/inscripcion/:_id' element={<Inscripcion idUsuario= {userData._id} />} />
                <Route path='/proyectos/editar/:_id' element={<EditarProyecto _id= {userData._id} />} />
                <Route path='/proyectos/crear/:_id' element={<CrearProyecto _id= {userData._id} />} />
                <Route path='/proyectos/aprobar/:_id' element={<AprobarProyecto _id= {userData._id} />} />
                <Route path='/proyectos/inactivar/:_id' element={<InactivarProyecto _id= {userData._id} />} />
                <Route path='/proyectos/reabrir/:_id' element={<ReabrirProyecto _id= {userData._id} />} />
                <Route path='/proyectos/terminar/:_id' element={<TerminarProyecto _id= {userData._id} />} />
                <Route path='/proyectos/AgregarAvance/:_id' element={<AgregarAvance _id= {userData._id} />} />
                <Route path='/proyectos/EditarAvance/:_id' element={<EditarAvance _id= {userData._id} />} />
                <Route path='/proyectos/estado/:_id' element={<EditarProyecto _id= {userData._id} />} />
                <Route path='/proyectos/avances' element={<Avances  _id= {userData._id}/>} />
                <Route path='/proyectos/avances/observacion/:_id' element={<AgregarObservacion _id= {userData._id} />} />
                <Route path='/proyectos/inscripciones' element={<Inscripciones _id= {userData._id} />} />
                <Route path='/proyectos/inscripciones/estado/:_id' element={<EstadoInscripcion _id= {userData._id} />} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
