import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { GET_INSCRIPCION } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Enum_EstadoInscripcion } from 'utils/enums';
import { ESTADO_INSCRIPCION } from 'graphql/proyectos/mutations';

export default function EstadoInscripcion (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario=props._id;
  var { _id } = useParams();
  const idInscripcion= _id;
 

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_INSCRIPCION, {
    variables: {idUsuario, idInscripcion},
  });


  const [EditarEstado, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(ESTADO_INSCRIPCION);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    const estado=formData.estado;
    EditarEstado({
      variables: { idUsuario, idInscripcion, estado},
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Estado modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el estado de la inscripcion');
    }

    if (queryError) {
      toast.error('Error consultando la inscripcion');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;



const imprimir = []
  queryData.getInscripcion.forEach((u) => {
    console.log(u.inscripcion.length)
    if(u.inscripcion.length > 0){
      
    u.inscripcion.forEach((x)=> {
    if(x._id===idInscripcion){
    imprimir.push({
      "_id":x._id,
    "nombreP":u.nombre, 
    "nombreE":x.estudiante.nombre, 
    "idEstudiante":x.estudiante.idUsuario, 
    "estado":x.estado,
    "fechaDeEgreso":x.fechaDeEgreso,
    "fechaDeIngreso":x.fechaDeIngreso,
  
  })}
   
     })
    
   }
  })
  console.log("query data: "+ imprimir)
  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos/inscripciones'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Inscripcion</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >{imprimir.map((x) => {
        return( 
        
        <div key={x._id}>
          <strong>Nombre Proyecto: </strong>{x.nombreP}
          <strong>Nombre Estudiante: </strong>{x.nombreE}
       
         <strong> Identificacion Estudiante: </strong>{x.idEstudiante}
      
               
         <DropDown
          label='Estado de la inscripcion:'
          name='estado'
          defaultValue={Enum_EstadoInscripcion[x.estado]}
          required={true}
          options={Enum_EstadoInscripcion}
        />
              
        </div>);
         
         
         
       
      })}
     
        
        <ButtonLoading
          
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

