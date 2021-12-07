import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Enum_EstadoInscripcion } from 'utils/enums';
import { APROBAR } from 'graphql/proyectos/mutations';

export default function AprobarProyecto (props) {
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
  
  const [aprobarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(APROBAR);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData.respuesta)
    if(formData.respuesta==="0"){ 
      aprobarProyecto({
        variables: { idUsuario, idProyecto},
      });}else{
        console.log("no desea aprobar el proyecto")
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

    if (queryError) {
      toast.error('Error consultando el usuario'+queryError);
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;


  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos/inscripciones'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Aprobar Proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        
        
        <h1> <strong>Nombre Proyecto: </strong>  {queryData.VerProyecto.nombre}</h1>
         
      
               
         <DropDown
          label='aprobar proyecto'
          name='respuesta'
          required={true}
          options={['Si','No']}
        />
              
        
         
         
         
       
     
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

