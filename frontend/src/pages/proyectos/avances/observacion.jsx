import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { VER_AVANCE } from 'graphql/proyectos/queries';
import { ADD_OBSERVACION } from 'graphql/proyectos/mutations';

export default function AgregarObservacion (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario=props._id;
  var { _id } = useParams();
  const idAvance= _id;
 

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(VER_AVANCE, {
    variables: {idUsuario,idAvance},
  });


  const [AddObservacion, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(ADD_OBSERVACION);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    const arr =[]
    for (const property in formData) {
      if(property.includes("E")){
        if(formData[property]!==""){
          arr.push(formData[property])}
        delete formData[property];
        
      }
     
    }
    const observacionesDelLider=arr;
    AddObservacion({
      variables: { idUsuario, idAvance, observacionesDelLider},
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Observaciones del Lider actualizadas correctamente');
      setTimeout( function() { window.location.href = `/proyectos/avances`; }, 5000 );
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando las observacioines del lider');
      
      setTimeout( function() { window.location.href = `/proyectos/avances`; }, 5000 );

    }

    if (queryError) {
      toast.error('Error consultando el avance');
      
      setTimeout( function() { window.location.href = `/proyectos/avances`; }, 5000 );
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
  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
  <Link to='/proyectos/avances'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
    
  <div className=" bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
  <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
      <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p className="text-3xl font-bold leading-7 text-center">Editar Observaciones del Lider</p>
          <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      >
        {imprimir.map((x) => {
        return( 
        
        <div key={x._id}>
          <div className="md:flex items-center mt-12">
                    <div className="w-full md:w-1/2 flex flex-col">
                    <label className="font-semibold leading-none">Nombre del Proyecto:</label>
                      <span className="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200">{x.nombre}</span>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label className="font-semibold leading-none">Fecha del Avance:</label>
                        <span className="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200">{x.fecha}</span>
                    </div>
                </div>
               
                  <div className="w-full flex flex-col mt-8">
                      <label className="font-semibold leading-none">Descripción del Avance:</label>
                      <span className="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200">{x.descripcion}</span>
                     
                  </div>
                  <div className="md:flex items-center mt-8">
                    <div className="w-full flex flex-col">
                        <label className="font-semibold leading-none">Observaciones del lider:</label>
                        { x.observacionesDelLider.length>0 ? (
        x.observacionesDelLider.map((u, index) => {
          return(
          <input 
          type='text'
          name={`E${index}`}
          defaultValue={u}
          className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
        />)})
              
      ):(<div></div>)}
        </div>
        
    </div>
        </div>);
         
         
         
       
      })}
              
             
             
              <div>
            
              </div>
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

