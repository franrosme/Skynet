import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { REABRIR } from 'graphql/proyectos/mutations';

export default function ReabrirProyecto (props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario = props._id;
  console.log("id Usuario"+idUsuario)
  var { _id } = useParams();
  const idProyecto= _id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: {idUsuario, idProyecto },
  });
  
  const [reabrirProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(REABRIR);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData.respuesta)
    if(formData.respuesta==="0"){ 
      reabrirProyecto({
        variables: { idUsuario, idProyecto},
      });}else{
        console.log("no desea reabrir el proyecto")
      }
    
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto reabrierto correctamente');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error reabriendo el proyecto');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [queryError, mutationError, idProyecto]);

  if (queryLoading) return <div>Cargando....</div>;


  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos/inscripciones'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>reabrir Proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        
        
        <h1> <strong>Nombre Proyecto: </strong>  {queryData.VerProyecto.nombre}</h1>
         
      
               
         <DropDown
          label='reabrir proyecto'
          name='respuesta'
          required={true}
          options={['Si','No']}
        />
              
        
         
        <ButtonLoading
         
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

