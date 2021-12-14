import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';


export default function CrearProyecto (props) {
  var ex =0;
  
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario=props._id;
  
  const [CrearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    const arr =[];
    
   for (const property in formData) {
      if(property.includes("E")){
        arr.push(formData[property])
        delete formData[property];
        
      }
     }
    formData.objetivosEspecificos= arr;
    const campos=formData
    campos.presupuesto= parseInt(campos.presupuesto)
    CrearProyecto({
      variables: { idUsuario, campos},
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto creado correctamente');
      setTimeout( function() { window.location.href = `/proyecto/${mutationData.crearProyecto._id}`; }, 5000 );
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error creando el proyecto');
      setTimeout( function() { window.location.href = `/proyecto/crear`; }, 5000 );
    }

  
  }, [ mutationError]);


  return (
  
<div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      
    <div className="h-96"></div>
    <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
            <p className="text-3xl font-bold leading-7 text-center">Crear Proyecto</p>
            <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        >
                <div className="md:flex items-center mt-8">
                    <div className="w-full flex flex-col">
                        <label className="font-semibold leading-none">Nombre del Proyecto:</label>
                        <input 
                        type='text'
                        name='nombre'
                        required={true} 
                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
                    </div>
                    
                </div>
                
                <div>
                    <div className="w-full flex flex-col mt-8">
                        <label className="font-semibold leading-none">Objetivo General:</label>
                        <textarea
                        name='objetivosGenerales'
                        required={true}
                        type="text"
                        className="h-20 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"></textarea>
                    </div>
                </div>
                <div>
                    <div className="w-full flex flex-col mt-8" id="inputDiv"   >
                        <label className="font-semibold leading-none">Objetivos Específicos:</label>
                      
                        <input
          type='text'
          name="E0"
          required={true} 
          className= "h-auto text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
       

       </div>
         <button onClick={(e) => {
                      ex=ex+1;
            var parent = document.getElementById("inputDiv");

            var input = document.createElement("input");
            input.type= 'text';
            input.name = `E${ex}`; 
            input.required= true;
            input.className = "h-auto text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            parent.appendChild(input);
            
           
          }}> <i className='fas fa-plus-circle text-blue-600 hover:text-blue-400 cursor-pointer' /></button>
        
                    
                    
                    
                </div>
                <div className="md:flex items-center mt-12">
                    <div className="w-full md:w-1/2 flex flex-col">
                        <label className="font-semibold leading-none">Presupuesto:</label>
                        <input 
                         type='number'
                         name='presupuesto'
                         required={true} 
                         className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                    </div>
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

