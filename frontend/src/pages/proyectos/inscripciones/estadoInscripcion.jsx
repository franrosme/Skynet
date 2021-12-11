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
      
      setTimeout( function() { window.location.href = `/proyectos/inscripciones`; }, 5000 );
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el estado de la inscripcion');
      setTimeout( function() { window.location.href = `/proyectos/inscripciones`; }, 5000 );
    }

    if (queryError) {
      toast.error('Error consultando la inscripcion');
      setTimeout( function() { window.location.href = `/proyectos/inscripciones`; }, 5000 );
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
    <Link to='/proyectos/avances'>
          <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
        </Link>
      
    <div class=" bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
    <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div class="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
            <p class="text-3xl font-bold leading-7 text-center">Cambiar Estado De La Inscripción</p>
            <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        >
          {imprimir.map((x) => {
          return( 
          
          <div key={x._id}>
            <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                        <label class="font-semibold leading-none">Nombre del Proyecto:</label>
                        <span class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200">{x.nombreP}</span>
                    </div>
                    
                </div>
         
                  <div class="md:flex items-center mt-12">
                      <div class="w-full md:w-1/2 flex flex-col">
                      <label class="font-semibold leading-none">Nombre del Estudiante:</label>
                        <span class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200">{x.nombreE}</span>
                      </div>
                      <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                          <label class="font-semibold leading-none">Identificación del Estudiante: </label>
                          <span class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200">{x.idEstudiante}</span>
                      </div>
                  </div>
                 
                  
                    <div class="md:flex items-center mt-8">
                      <div class="w-full flex flex-col">
                          <label class="font-semibold leading-none">Estado de la inscripción:</label>
                          <DropDown
         
          name='estado'
          defaultValue={Enum_EstadoInscripcion[x.estado]}
          required={true}
          options={Enum_EstadoInscripcion}
        />
          </div>
          
      </div>
          </div>);
           
           
           
         
        })}
                
               
               
                <div>
              
                </div>
                <div class="flex items-center justify-center w-full">
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

