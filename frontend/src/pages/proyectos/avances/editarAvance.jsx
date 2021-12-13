import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
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
      toast.success('Avance actualizado correctamente');
     setTimeout( function() { window.location.href = `/proyectos`; }, 5000 );
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error actualizando el avance');
      
     setTimeout( function() { window.location.href = `/proyectos`; }, 5000 );
    }

    if (queryError) {
      toast.error('Error consultando el avance');
      
     setTimeout( function() { window.location.href = `/proyectos`; }, 5000 );
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
  <Link to='/proyectos/avances'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
    
  <div className=" bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
  <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
      <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p className="text-3xl font-bold leading-7 text-center">Editar Avance</p>
          <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      >{imprimir.map((x) => {
        return(
          <div className="w-full flex flex-col mt-8">
            <label className="font-semibold leading-none">Descripción del Avance:</label>
  <input
       type='text'
       name='descripcion'
       defaultValue={x.descripcion}
       required={true}
       className="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-grey-100 border rounded border-gray-200"
     />
        </div>)
     
   })}
           
             
           <div className="flex items-center justify-center w-full">
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
