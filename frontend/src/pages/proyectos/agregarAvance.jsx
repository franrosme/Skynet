import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Input from 'components/Input';
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
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error agregando el avance');
    }
  }, [mutationError]);



  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to={`/proyecto/${idProyecto}`}>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Agregar Avance</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
     <Input
          label='descripcion:'
          type='text'
          name='descripcion'
          required={true}
          disabled
        />
         
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};
