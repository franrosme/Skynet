import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { GET_PROYECTO} from 'graphql/proyectos/queries';
import useFormData from 'hooks/useFormData';

export default function Proyecto (props) {
  const idUsuario=props._id;
  const { form, formData, updateFormData } = useFormData(null);
  var { _id } = useParams();
  const idProyecto= _id;
  const {
    data: queryData,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: {idUsuario, idProyecto },
  });
  


  if (queryLoading) return <div>Cargando....</div>;
console.log("query data: "+queryData.VerProyecto)
  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h2>Datos básicos </h2>
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h3>Presupuesto:</h3> <p>{queryData.VerProyecto.presupuesto} </p>
      <h3>fase: </h3><p>{queryData.VerProyecto.fase} </p>
      <h3>estado: </h3><p>{queryData.VerProyecto.estado} </p>
      <h2>Informacion Lider</h2>
      <h3>Nombre:</h3> <p>{queryData.VerProyecto.lider.nombre}</p>
      <h3>Identificacion: </h3><p>{queryData.VerProyecto.lider.idUsuario}</p>
      <h3>Email: </h3><p>{queryData.VerProyecto.lider.email}</p>
      etc....
    </div>
  );
};
