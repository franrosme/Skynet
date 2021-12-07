import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { VER_AVANCE } from 'graphql/proyectos/queries';
import { EDIT_AVANCE } from 'graphql/proyectos/mutations';

export default function EditarAvance (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  const idEstudiante=props._id;
  const idUsuario =idEstudiante;
  var { _id } = useParams();
  const idAvance= _id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(VER_AVANCE, {
    variables: {idUsuario,idAvance},
  });
  const [EditarEstado, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    const descripcion =  formData.descripcion;
    EditarEstado({
      variables: { idEstudiante, idAvance, descripcion},
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

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  const imprimir = [];
  queryData.VerAvance.forEach((u) => {
    
      
    u.avance.forEach((x)=> {
    
    imprimir.push({
      "_id":x._id,
    "nombre":u.nombre, 
    
    "fecha":x.fecha, 
    "descripcion":x.descripcion,
    "observacionesDelLider":x.observacionesDelLider,
  
  })
   
     })
    
   
  })


  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to={`/proyectos`}>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Avance</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
         {imprimir.map((x) => {
           return(
     <Input
          label='descripcion:'
          type='text'
          name='descripcion'
          defaultValue={x.descripcion}
          required={true}
          disabled
        />)
        
      })}
          {/*}
        <Input
          label='Nombre Proyecto:'
          type='text'
          name='nombre'
          defaultValue={queryData.getInscripcion.nombre}
          required={true}
          disabled
        />
     
        <Input
          label='Identificacion Estudiante:'
          type='text'
          name='idEstudiante'
          defaultValue={queryData.getInscripcion.inscripcion.idEstudiante}
          required={true}
          disabled
        />
        <Input
          label='Identificacion Estudiante:'
          type='text'
          name='idEstudiante'
          defaultValue={queryData.getInscripcion.inscripcion.idEstudiante}
          required={true}
          disabled
        />
         <DropDown
          label='Estado de la inscripcion:'
          name='estado'
          defaultValue={queryData.getInscripcion.inscripcion.estado}
          required={true}
          options={Enum_EstadoInscripcion}
        />
        
        {*/}
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};
