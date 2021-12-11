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
import { toast } from 'react-toastify';

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
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);
  useEffect(() => {
    if (mutationError) {
      toast.error('Error al ingresar', mutationError);
      
    }
  }, [mutationError]);



  return (
    <body className= 'bg-gray-500 w-full h-full'>
      <div className="container-img">  
        <div className='flex flex-col items-center justify-center w-full h-full p-10'>
        <img src= {logo} alt="logo"object-fit/>
          <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
          <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
            <Input name='email' type='email' label='Correo' required={true} />
            <Input name='clave' type='password' label='Contraseña' required={true} />
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text='Iniciar Sesión'
            />
          </form>
          <span>¿No tienes una cuenta?</span>
          <Link to='/auth/register'>
            <span className='text-blue-700'>Regístrate</span>
          </Link>
        </div>
        </div>
    </body>


  );
};

export default Login;
