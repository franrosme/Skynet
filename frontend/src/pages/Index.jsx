import React from 'react';
import logo from '../assets/estrellas.jpg';
import { useQuery} from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';


function Index (props) {
  
  return (
    <div>
    <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'></h1>

    <div>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <img src= {logo} alt="logo"object-fit/>
      </div>
    </div>
    </div>
  );
};

export default Index;
