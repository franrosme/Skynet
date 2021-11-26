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

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className='flex flex-col h-full w-full items-center justify-center'>
      <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Nombre:' name='nombre' type='text' required />
          <Input label='Documento:' name='idUsuario' type='text' required />
          <DropDown label='Rol deseado:' name='rol' required={true} options={Enum_Rol} />
          <Input label='Correo:' name='email' type='email' required />
          <Input label='Contraseña:' name='clave' type='password' required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={false}
          text='Registrarme'
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to='/auth/login'>
        <span className='text-blue-700'>Inicia sesión</span>
      </Link>
    </div>
  );
};

export default Register;
