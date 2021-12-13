import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
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
 window.location.href = `/proyecto/${idProyecto}`; 
    }
    
   
    
  };
  useEffect(() => {
    if (mutationData) {
      toast.success('Se realizó la inscripción correctamente');
     
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error realizando la inscripción');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }

  }, [idProyecto, mutationError]);

  return (
    <div className="w-full">
    <Link to={`/proyecto/${idProyecto}`}>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
  <div className="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
  <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-6">
      <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p className="text-3xl font-bold leading-7 text-center">Inscribirse</p>
          <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      >
              <div className="md:flex items-center mt-8">
                    <div className="w-full flex flex-col">
                      <label className="font-semibold leading-none">¿Desea inscribirse al proyecto?</label>
                      <DropDown
          
          name='respuesta'
          required={true}
          options={['Si','No']}
        />
                  </div>
                  
              </div>
              <div className="md:flex items-center mt-8"></div>
           
                  
              <div className="flex items-center justify-center w-full">
              
              <ButtonLoading
       
        loading={mutationLoading}
        text='Confirmar'
      />
                  
              </div>
          </form>
      </div>
  </div>
 </div>
  );
};

