import React, { useEffect } from 'react';
import Input from 'components/Input';
import { Enum_Rol } from 'utils/enums';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { REGISTRO } from 'graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';
import { ToastContainer, toast } from 'react-toastify';

import logo from '../../assets/Skynet1.png';

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [registro, { data: dataMutation, loading: loadingMutation, error: mutationError }] =
    useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.error===null) {
        setToken(dataMutation.registro.token);
        navigate('/');
       
      }else{
        toast.error(dataMutation.registro.error);
        setTimeout( function() { navigate('/auth/login'); }, 5000 );
      }
    }
     
  }, [dataMutation, setToken, navigate]);
  useEffect(() => {
    if (mutationError) {
      toast.error('Error al registrar');
      setTimeout( function() { navigate('/auth/login'); }, 5000 );
      
      
    }
  }, [mutationError, navigate]);

  return (
    <div className="bg-gray-300 p-6" >
     <ToastContainer />
	<div className="bg-white w-full lg:w-2/3 mx-auto rounded-lg lg:my-20 px-4 py-4 shadow-lg">
  <img src= {logo} alt="logo"/>
  <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
  <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <div className='grid grid-cols-2 gap-5'>
          <Input   className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" label='Nombre:' name='nombre' type='text' required />
          <Input  className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" label='Documento:' name='idUsuario' type='number' required />
          <DropDown label='Rol deseado:' name='rol' required={true} options={Enum_Rol} />
          <Input   className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"  label='Correo:' name='email' type='email' required />
          <Input  className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" label='Contraseña:' name='clave' type='password' required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          text='Registrarme'
        />
      </form>
      <div className="flex justify-center my-6">
      <span>¿Ya tienes una cuenta?</span>
			<Link to='/auth/login'>
        <span className="text-blue-500 text-sm">Inicia sesión</span>
      </Link>
		</div>
  
		
	</div>
</div>
      
  );
};

export default Register;
