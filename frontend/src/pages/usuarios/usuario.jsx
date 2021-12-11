import React from 'react';
import {  Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import ButtonLoading from 'components/ButtonLoading';

export default function PerfilUsuario (props) {
  const _id=props._id;
  const usuario=_id;
  console.log('/usuarios/editar/'+usuario)
  const {
    data: queryData,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: {_id, usuario },
  });

  if (queryLoading) return <div>Cargando....</div>;
  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <div class="btn buttonAdd" onClick={(e) => {
            e.preventDefault();
            
            window.location.href='/usuarios/editar/'+usuario
          } }> <i className='fas fa-edit text-white-600 cursor-pointer' /> Editar
  </div>

  <div id="pattern" class="pattern">
        <div class="c">
          <div class="main">
            <h1 className="titulo"> Perfil del Usuario </h1>
        	</div>
          <hr/>
			    <div class="c2">
            <h4 class="blue"><span class="middle">Datos personales</span></h4>
            <div class="project-info">
            <div class="project-info-row">
              <div class="project-info-name"> <i className="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>
              <div class="project-info-value"><span>{queryData.Usuario.nombre}</span></div>
            </div>
            <div class="project-info-row">
              <div class="project-info-name"> <i class="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>
              <div class="project-info-value"><span>{queryData.Usuario.idUsuario}</span></div>
            </div>
            <div class="project-info-row">
              <div class="project-info-name"><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>
              <div class="project-info-value"><span>{queryData.Usuario.email}</span></div>
              </div>
              
           </div>
          </div>
        <div class="c3">
          <h4 class="blue"><span class="middle">Información</span></h4>
          <div class="project-info">
          <div class="project-info-row">
								<div class="project-info-name"> <i class="fa fa-business-time fa-fw w3-xxlarge w3-margin-right"></i>Rol:  </div>
                <div class="project-info-value"><span>{queryData.Usuario.rol}</span></div>
							</div>
              <div class="project-info-row">
								<div class="project-info-name"> <i class="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>estado: </div>
                <div class="project-info-value"><span>{queryData.Usuario.estado}</span></div>
							</div>
           
            </div>
          </div>
	      </div>
    	</div>
      
      

                     
    </div>
  );
};


