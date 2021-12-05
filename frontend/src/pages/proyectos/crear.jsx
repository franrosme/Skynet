import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';


export default function CrearProyecto (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario=props._id;
  var { _id } = useParams();




  const [EditarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    console.log(formData)
    const campos=formData
    campos.presupuesto= parseInt(campos.presupuesto)
    EditarProyecto({
      variables: { idUsuario, campos},
    });
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
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Crear Proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre Proyecto:'
          type='text'
          name='nombre'
          required={true}
        />
     
        <Input
          label='Objetivo General:'
          type='textarea'
          name='objetivosGenerales'
          required={true}
        />
         <Input
          label='Presupuesto:'
          type='number'
          name='presupuesto'
          required={true}
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

