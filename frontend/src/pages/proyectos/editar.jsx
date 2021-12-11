import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { GET_PROYECTO } from 'graphql/proyectos/queries';


export default function EditarProyecto (props) {
  var ex = 0;
   
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario=props._id;
  var { _id } = useParams();
  const idProyecto= _id;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: {idUsuario,idProyecto },
  });


  const [EditarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
  
    formData.presupuesto= parseInt(formData.presupuesto)
    const arr =[]
    
    for (const property in formData) {
      if(property.includes("E")){
        console.log(`${property}: ${formData[property]}`);
        arr.push(formData[property])
        delete formData[property];
        
      }
     
    }
    console.log(formData)
    console.log("----"+arr)
    formData.objetivosEspecificos= arr;
   
    const campos=formData
    EditarProyecto({
      variables: { idUsuario, idProyecto, campos},
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto actualizado correctamente');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error actualizando el proyecto');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
      
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
      setTimeout( function() { window.location.href = `/proyecto/${idProyecto}`; }, 5000 );
    }
  }, [queryError, mutationError, idProyecto]);

  if (queryLoading) return <div>Cargando....</div>;
  return (
    
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      
    <div class=" bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
    <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div class="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
            <p class="text-3xl font-bold leading-7 text-center">Editar Proyecto</p>
            <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        >
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                        <label class="font-semibold leading-none">Nombre del Proyecto:</label>
                        <input 
                        type='text'
                        name='nombre'
                        defaultValue={queryData.VerProyecto.nombre}
                        required={true} 
                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
                    </div>
                    
                </div>
                <div class="md:flex items-center mt-12">
                    <div class="w-full md:w-1/2 flex flex-col">
                        <label class="font-semibold leading-none">Presupuesto:</label>
                        <input 
                         type='number'
                         name='presupuesto'
                         defaultValue={queryData.VerProyecto.presupuesto}
                         required={true} 
                         className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                    </div>
                </div>
                <div>
                    <div class="w-full flex flex-col mt-8">
                        <label class="font-semibold leading-none">Objetivo General:</label>
                        <textarea
                        name='objetivosGenerales'
                        defaultValue={queryData.VerProyecto.objetivosGenerales}
                        required={true}
                        type="text"
                        className="h-20 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"></textarea>
                    </div>
                </div>
                <div>
                    <div class="w-full flex flex-col mt-8">
                        <label class="font-semibold leading-none">Objetivos Específicos:</label>
                      
                        { queryData.VerProyecto.objetivosEspecificos.length>0 ?(
                        queryData.VerProyecto.objetivosEspecificos.map((u, index) => {
          ex= index;
          return(
          <div key={u.index}>
            <input
            type='text'
            name={`E${index}`}
            defaultValue={u}
            required={true} 
            ex={index}
            className= "h-auto text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
            
</div>
        );

        })):(<input
          type='text'
          name={`E0`}
          required={true} 
          className= "h-auto text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>)
       

        }
        <div id="inputDiv"></div>
        <button onClick={(e) => {
          
            e.preventDefault();
            ex=ex+1;
            var parent = document.getElementById("inputDiv");

            var input = document.createElement("input");
            input.type= 'text'
            input.name = `E${ex}`; 
            input.className = "h-auto text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            parent.appendChild(input);
            
           
          }}> <i className='fas fa-plus-circle text-blue-600 hover:text-blue-400 cursor-pointer' /></button>
        
                    
                    
                    </div>
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

