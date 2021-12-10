import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { INSCRIPCION } from 'graphql/proyectos/mutations';

import DropDown from 'components/Dropdown';


export default function Inscripcion (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  const idEstudiante=props.idUsuario;
  var { _id } = useParams();
  const idProyecto= _id;
 

  const [inscribirse, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(INSCRIPCION);

  const submitForm = (e) => {
    e.preventDefault();
    if(formData.respuesta==="0"){ 
    var inscripcion;

     inscripcion= {"estudiante":idEstudiante};
     
    inscribirse({
      variables: { idProyecto, inscripcion},
    });}
    else{
      console.log("no desea inscribirse")
    }
    
   
    
  };
  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

  }, [ mutationError]);

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to={`/proyecto/${idProyecto}`}>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Inscribirse</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
     <DropDown
          label='Estado de la inscripcion:'
          name='respuesta'
          required={true}
          options={['Si','No']}
        />
         
        <ButtonLoading
           text='Confirmar'
        />
      </form>
    </div>
  );
};

