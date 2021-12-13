import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Skynet1.png';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.error===null) {
        setToken(dataMutation.login.token);
        navigate('/');
       
      }else{
        toast.error(dataMutation.login.error);
       
      }
    }
  }, [dataMutation, setToken, navigate]);
  useEffect(() => {
    if (mutationError) {
      toast.error('Error al ingresar', mutationError);
      
    }
  }, [mutationError]);



  return (
    <div className="bg-gray-300 w-full h-full p-6" >
      <ToastContainer />
      
	<div className="bg-white w-full lg:w-1/3 mx-auto rounded-lg lg:my-20 px-4 py-4 shadow-lg">
  <div className="container-img">  
      <img src= {logo} alt="logo" />
      </div>
  <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
  <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
            <Input  className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" name='email' type='email' label='Correo' required={true} />
            <Input className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"  name='clave' type='password' label='Contraseña' required={true} />
            <ButtonLoading
            className="text-white py-3 rounded-lg w-full font-bold text-xl tracking-wider"
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text='Iniciar Sesión'
            />
          </form>
		
			<hr className="" />
      
		<div className="flex justify-center my-6">
    <span>¿No tienes una cuenta?</span>
          <Link to='/auth/register'>
            <span className='text-blue-700'>Regístrate</span>
          </Link>
			
		</div>
	</div>
</div>
   


  );
};

export default Login;
