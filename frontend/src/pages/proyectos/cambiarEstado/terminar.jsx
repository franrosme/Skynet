import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { TERMINAR } from 'graphql/proyectos/mutations';

export default function TerminarProyecto (props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario = props._id;
  var { _id } = useParams();
  const idProyecto= _id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: {idUsuario, idProyecto },
  });
  
  const [terminarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(TERMINAR);

  const submitForm = (e) => {
    e.preventDefault();
    if(formData.respuesta==="0"){ 
      terminarProyecto({
        variables: { idUsuario, idProyecto},
      });}else{
        window.location.href = `/proyectos/`; 
      }
    
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto terminado correctamente');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error terminando el proyecto');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [queryError, mutationError, idProyecto]);

  if (queryLoading) return <div>Cargando....</div>;


  return (
    <div className="w-full">
    <Link to='/proyectos/'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
  <div className="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
  <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-6">
      <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p className="text-3xl font-bold leading-7 text-center">Terminar Proyecto</p>
          <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      >
              <div className="md:flex items-center mt-8">
                    <div className="w-full flex flex-col">
                      <label className="font-semibold leading-none">¿Desea terminar el proyecto {queryData.VerProyecto.nombre}?</label>
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

