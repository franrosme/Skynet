import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { CAMBIAR_ESTADO_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';

import {Enum_EstadoUsuario } from 'utils/enums';

export default function CambiarEstadoUsuario (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  var { _id } = useParams();
  var usuario= _id;
  _id=props._id;
  const rol=props.rol;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: {_id, usuario },
  });


  const [cambiarEstado, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CAMBIAR_ESTADO_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    if(formData.estado==="0"){
      formData.estado="Pendiente"
    }else if (formData.estado==="1"){
      formData.estado="Autorizado"}
    const estado =formData.estado;
    cambiarEstado({
      variables: { _id, usuario, estado },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
      setTimeout( function() { window.location.href = `/usuarios`; }, 5000 );
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
      setTimeout( function() { window.location.href = `/usuarios`; }, 5000 );
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
      setTimeout( function() { window.location.href = `/usuarios`; }, 5000 );
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;
console.log("query data: "+queryData)
  return (
    <div class="w-full">
    <Link to='/proyectos/'>
      <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
    </Link>
  <div class="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
  <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-6">
      <div class="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p class="text-3xl font-bold leading-7 text-center">Cambiar Estado Del Usuario</p>
          <form
      onSubmit={submitForm}
      onChange={updateFormData}
      ref={form}
      >
        <div class="md:flex items-center mt-12">
                    <div class="w-full md:w-1/2 flex flex-col">
                        <label class="font-semibold leading-none">Nombre del usuario:</label>
                        <span class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200"> {queryData.Usuario.nombre}</span>
                       
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label class="font-semibold leading-none">Email del usuario::</label>
                        <span class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200"> {queryData.Usuario.email}</span>
                        
                    </div>
                </div>
                <div class="md:flex items-center mt-12">
                    <div class="w-full md:w-1/2 flex flex-col">
                        <label class="font-semibold leading-none">Identificación del usuario::</label>
                        <span class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200"> {queryData.Usuario.idUsuario}</span>
                       
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                    <label class="font-semibold leading-none">Rol del usuario:</label>
                        <span class="leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-blue-100 border rounded border-gray-200"> {queryData.Usuario.rol}</span>
                    </div>
                </div>
              <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                      <label class="font-semibold leading-none">Estado del usuario:</label>
                      <DropDown
                  name='estado'
          defaultValue={Enum_EstadoUsuario[queryData.Usuario.estado]}
          required={true}
          options={rol==="Administrador" ?(Enum_EstadoUsuario):(['Pendiente','Autorizado'])}
        />
                  </div>
                  
              </div>
              <div class="md:flex items-center mt-8"></div>
           
                  
              <div class="flex items-center justify-center w-full">
              
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

