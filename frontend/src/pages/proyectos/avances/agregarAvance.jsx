import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { ADD_AVANCE } from 'graphql/proyectos/mutations';

export default function AgregarAvance (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  const idEstudiante=props._id;
  var { _id } = useParams();
  const idProyecto= _id;
 
  const [EditarEstado, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(ADD_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    const avance =  formData;
    EditarEstado({
      variables: { idEstudiante, idProyecto, avance},
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Avance agregado correctamente');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error agregando el avance');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [idProyecto, mutationError]);



  return (<div className='flew flex-col w-full h-full items-center justify-center p-10'>
  <Link to='/proyectos/avances'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
    
  <div class=" bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
  <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
      <div class="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p class="text-3xl font-bold leading-7 text-center">Agregar Avance</p>
          <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      >
         <div class="w-full flex flex-col mt-8">
                      <label class="font-semibold leading-none">Descripción del Avance:</label>
                      <input type='text'
          name='descripcion'
          required={true} class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-grey-100 border rounded border-gray-200"/>
                     
                  </div>
      
              
             
             
              <div>
            
              </div>
              <div class="flex items-center justify-center w-full">
              <ButtonLoading
          disabled={Object.keys(formData).length === 0}
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
