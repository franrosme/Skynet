import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';


export default function IndexUsuarios (props) {
  
   const _id = props._id;
   console.log("usuario :"+_id)
  
  const { data, error, loading } = useQuery(GET_USUARIOS, {
    variables: { _id }});
    useEffect(() => {
      if (error) {
        toast.error('Error consultando los usuarios');
      }
    }, [error]);
  if (loading) return <div>Cargando.... </div>;

  return (
    <PrivateRoute roleList={['Administrador','Lider']}>
    <><PrivateComponent roleList={['Administrador']}>
    <div className="container">  
      <h1 className="titulo"> Usuarios Registrados</h1>
      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
             <th>Nombre</th>
              <th>Email</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
           </tr>
          </thead>
          <tbody>
          {data && data.Usuarios ? (

              <>
                {data.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td><div><div className = "title-th" data-title = "Nombre: "></div>{u.nombre}</div></td>
                      <td><div><div  className = "title-th" data-title = "Email: "></div>{u.email}</div></td>
                      <td><div><div className = "title-th" data-title = "Identificación: "></div>{u.idUsuario}</div></td>
                      <td><div><div  className = "title-th" data-title = "Rol: "></div>{Enum_Rol[u.rol]}</div></td>
                      <td><div><div  className = "title-th" data-title = "Estado: "></div>{Enum_EstadoUsuario[u.estado]}
                      <Link to={`/usuarios/cambiarEstado/${u._id}`}>
                          <i className='userpen fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer text-align: right' />
                        </Link>
                      </div></td>
                      <td><div><div  className = "title-th" data-title = "Acciones: "></div>
                      <Link to={`/usuarios/editar/${u._id}`}>
                           <i className='userpen fas fa-edit text-blue-600 hover:text-blue-400 cursor-pointer display: inline' />
                        </Link></div></td>
                                         
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
     </div>
     </div> 
     
    </PrivateComponent>
    <PrivateComponent roleList={['Lider']}>
    <div className="container">  
      <h1 className="titulo"> Estudiantes Registrados</h1>
      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
             <th>Nombre</th>
              <th>Email</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
           </tr>
          </thead>
          <tbody>
          {data && data.Usuarios ? (

              <>
                {data.Usuarios.map((u) => {
                  if(u.rol==='Estudiante'){
                  return (
                    <tr key={u._id}>
                      <td><div><div className = "title-th" data-title = "Nombre: "></div>{u.nombre}</div></td>
                      <td><div><div  className = "title-th" data-title = "Email: "></div>{u.email}</div></td>
                      <td><div><div className = "title-th" data-title = "Identificación: "></div>{u.idUsuario}</div></td>
                      <td><div><div  className = "title-th" data-title = "Rol: "></div>{Enum_Rol[u.rol]}</div></td>
                      <td><div><div  className = "title-th" data-title = "Estado: "></div>{Enum_EstadoUsuario[u.estado]}
                     
                        <Link to={`/usuarios/cambiarEstado/${u._id}`}>
                        <i className='userpen fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer text-align: right' />
                      </Link>
                      
                      </div></td>
                      <td><div><div  className = "title-th" data-title = "Acciones: "></div>
                      <Link to={`/usuarios/editar/${u._id}`}>
                           <i className='userpen fas fa-edit text-blue-600 hover:text-blue-400 cursor-pointer display: inline' />
                        </Link></div></td>
                                         
                    </tr>
                  );}
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
     </div>
     </div> 
      </PrivateComponent></>
      </PrivateRoute>
  );
};


