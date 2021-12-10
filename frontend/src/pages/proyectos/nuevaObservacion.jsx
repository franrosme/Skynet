import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { VER_AVANCE } from 'graphql/proyectos/queries';
import { ADD_OBSERVACION } from 'graphql/proyectos/mutations';

export default function NuevaObservacion (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario=props._id;
  var { _id } = useParams();
  const idAvance= _id;
 

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(VER_AVANCE, {
    variables: {idUsuario, idAvance},
  });


  const [AddObservacion, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(ADD_OBSERVACION);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    const arr =[]
    for (const property in formData) {
      if(property.includes("E")){
        arr.push(formData[property])
        delete formData[property];
        //console.log(`${property}: ${formData[property]}`);
      }
     
    }
    arr.push(formData.observacionesDelLider);
    const observacionesDelLider=arr;
    AddObservacion({
      variables: { idUsuario, idAvance, observacionesDelLider},
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Nueva observacion agregada correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error agregando la observacion');
    }

    if (queryError) {
      toast.error('Error consultando avance');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;



const imprimir = []
  queryData.VerAvance.forEach((u) => {
    if(u.avance.length > 0){
      
    u.avance.forEach((x)=> {
    
    imprimir.push({
      "nombre":u.nombre,
      "_id":x._id,
    "fecha":x.fecha, 
    "descripcion":x.descripcion, 
    "observacionesDelLider":x.observacionesDelLider
  
  })
   
     })
    
   }
  })
  console.log("query data: "+ imprimir)
  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos/avances'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Nueva Observacion</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >{imprimir.map((x) => {
        return( 
        
        <div key={x._id}>
          <strong>Nombre Proyecto: </strong>{x.nombre}
         
       
         <strong> fecha: </strong>{x.fecha}
      
        
         <strong>descripcion: </strong> {x.descripcion}
         <h1>observaciones del lider:</h1>
      { x.observacionesDelLider.length>0 ? (
        x.observacionesDelLider.map((u, index) => {
          return(
          <Input as="textarea"
          type='text'
          name={`E${index}`}
          defaultValue={u}
          required={true}
        />)})
              
      ):(<div></div>)}
          
        <Input 
          type='text'
          name='observacionesDelLider'
          required={true}
        />    
        </div>);
         
         
         
       
      })}
     
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

