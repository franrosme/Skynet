import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { GET_PROYECTO} from 'graphql/proyectos/queries';
import { Button } from "react-bootstrap";
import PrivateRoute from 'components/PrivateRoute';

import { toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';

export default function Proyecto (props) {
  const idUsuario = props._id;
  console.log("id Usuario"+idUsuario)
  var { _id } = useParams();
  const idProyecto = _id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: {idUsuario, idProyecto },
  });
  
  useEffect(() => {
    if (queryError) {
      toast.error('Error consultando los proyectos');
    }
  }, [queryError]);

  if (queryLoading) return <div>Cargando....</div>;
  return (
    <><PrivateComponent roleList={['Administrador']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
     

  <div id="pattern" class="pattern">
  	<div class="c">
      
			<div class="main">
      <h1 className="titulo"> {queryData.VerProyecto.nombre} </h1>
      
			</div>
			<div class="c2">


      
							<h4 class="blue">
								<span class="middle">Datos básicos</span>

							</h4>

							<div class="project-info">
								<div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-money-bill-wave fa-fw w3-xxlarge w3-margin-right"> </i>Presupuesto:</div>

									<div class="project-info-value">
										<span>$ {queryData.VerProyecto.presupuesto}</span>
									</div>
								</div>

								<div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-business-time fa-fw w3-xxlarge w3-margin-right"></i>fase:  </div>

									<div class="project-info-value">
										
										<span>{queryData.VerProyecto.fase}</span>
										
									</div>
								</div>

								<div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>estado: </div>

									<div class="project-info-value">
										<span>{queryData.VerProyecto.estado}</span>
									</div>
								</div>

								

								
							</div>

						

					
					



      
			</div>
			<div class="c3">
      <h4 class="blue">
								<span class="middle">Información Lider</span>

							</h4>

							<div class="project-info">
								<div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>

									<div class="project-info-value">
										<span>{queryData.VerProyecto.lider.nombre}</span>
									</div>
								</div>

								<div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>

									<div class="project-info-value">
										
										<span>{queryData.VerProyecto.lider.idUsuario}</span>
										
									</div>
								</div>

								<div class="project-info-row">
									<div class="project-info-name"><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>

									<div class="project-info-value">
										<span>{queryData.VerProyecto.lider.email}</span>
									</div>
								</div>

								

								
							</div>
      
			</div>
		</div>
	</div>

	
	<div class="container">	
		<section class="pattern-description">

    <div class="mah-accordion">
 
 <div class="half">
   <div class="tab">
     <input id="tab-one" type="checkbox" name="tabs" />
     <label for="tab-one">Objetivos</label>
     <div class="tab-content">
       
     <h3 class="blue"> <span class="middle">Objetivo General:</span></h3>
         <p>{queryData.VerProyecto.objetivosGenerales}</p>
         <h3 class="blue"> <span class="middle">Objetivos Especificos:</span></h3>
         
         {queryData && queryData.VerProyecto.objetivosEspecificos.length>0 ? (
              <>
                {queryData.VerProyecto.objetivosEspecificos.map((x) => {
                  return( <div key={x._id}>
                   <li>{x}</li>
                  </div>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No hay objetivos especificos</div>
            )}
            
             
     </div>
   </div>
   <div class="tab">
     <input id="tab-two" type="checkbox" name="tabs" />
     <label for="tab-two">Avances</label>
     <div class="tab-content">
    
     <div class="hr hr-8 dotted"></div>
       <div >
       <p>{queryData && queryData.VerProyecto.avance.length>0 ? (
              <>
                {queryData.VerProyecto.avance.map((x) => {
                  return( <div key={x._id}>
                      <h3 class="blue"> <span class="middle"><i class="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha:</span></h3>
                     <p>{x.fecha}</p>
                    
                     <h3 class="blue"> <span class="middle"><i class="fa fa-file-signature fa-fw w3-xxlarge w3-margin-right"> </i>Descripción:</span></h3>
                    <p>{x.descripcion}</p>
                   
                   <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                   
                   <h3 class="blue"> <span class="middle"><i class="fa fa-file-alt fa-fw w3-xxlarge w3-margin-right"> </i>Observaciones del Lider:</span></h3>
                   {x && x.observacionesDelLider.length>0 ? (
              <>
                {x.observacionesDelLider.map((x) => {
                  return( <div key={x._id}>
                   <li>{x}</li>
                  </div>);
                   
                   
                   
                 
                })}
                <Link to={`/proyectos/avances/observacion/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
              </>
            ) : (
              <div>No hay Observaciones</div>
            )}

                   <Link to={`/proyectos/avances/nuevaObservacion/${x._id}`}>
                        <i className='fas fa-plus-circle text-green-600 hover:text-green-400 cursor-pointer' />
                      </Link>
                                  
                      <div class="hr hr-8 dotted"></div>
                  </div>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No hay avances</div>
            )}
      
    </p>
       </div>  
   <div class="left_part">
         
       </div>
       <div class="right_part">
       <div class="btn buttonAdd" onClick={(e) => {
            e.preventDefault();
            
            window.location.href = '/proyectos/AgregarAvance/'+queryData.VerProyecto._id;
          } }> <i className='fas fa-plus-circle text-white-600 cursor-pointer' /> Agregar Avance
  </div> </div>      
     </div>
   </div>
   <div class="tab">
     <input id="tab-three" type="checkbox" name="tabs" />
     <label for="tab-three">Inscripciones</label>
     <div class="tab-content">
     <div class="hr hr-8 dotted"></div>
       <div >
       <p>{queryData && queryData.VerProyecto.inscripcion.length>0 ? (
              <>
                {queryData.VerProyecto.inscripcion.map((x) => {
                  return( <div key={x._id}>
                    <div class="left_part">
                    <h4 class="blue">
								<span class="middle">Información Estudiante</span></h4>
                <div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>

									<div class="project-info-value">
										<span>{x.estudiante.nombre}</span>
									</div>
								</div>

								<div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>

									<div class="project-info-value">
										
										<span>{x.estudiante.idUsuario}</span>
										
									</div>
								</div>

								<div class="project-info-row">
									<div class="project-info-name"><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>

									<div class="project-info-value">
										<span>{x.estudiante.email}</span>
									</div>
								</div>

                    
                    
                    </div>
                    <div class="right_part">
                    <h4 class="blue">
								<span class="middle">Información Inscripción</span></h4>
                <div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de ingreso:</div>

									<div class="project-info-value">
										<span>{x.fechaDeIngreso}</span>
									</div>
								</div>
                <div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de Egreso:</div>

									<div class="project-info-value">
										<span>{x.fechaDeEgreso}</span>
									</div>
								</div>
                <div class="project-info-row">
									<div class="project-info-name"> <i class="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>Estado:</div>

									<div class="project-info-value">
										<span>{x.estado}</span><span> <Link to={`/proyectos/inscripciones/estado/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link></span>
									</div>
								</div>
                   
                   
                   
                                    </div>               
                                    <div class="hr hr-8 dotted"></div>
                  </div>);
                  })}
              </>
            ) : (
              <div>No hay inscripciones</div>
            )}
      
    </p>
       </div>  
  
     </div>
   </div>
 </div>
</div>
    
		
			
		</section>
		<footer role="contentinfo">   
    <div class="btn buttonAdd" onClick={(e) => {
            e.preventDefault();
            
            window.location.href = 'proyectos/editar/' + idUsuario;
          } }> <i className='fas fa-plus-circle text-white-600 cursor-pointer' /> Editar Proyecto
  </div>
		</footer>
	</div>
     
      
  

      
     
      
     
     
    </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Estudiante']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyecto/inscripcion/'+queryData.VerProyecto._id;
      }}
>Inscribirse</Button>
      
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h2>Datos básicos </h2>
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h3>Presupuesto:</h3> <p>{queryData.VerProyecto.presupuesto} </p>
      <h3>fase: </h3><p>{queryData.VerProyecto.fase} </p>
      <h3>estado: </h3><p>{queryData.VerProyecto.estado} </p>
      <h2>Informacion Lider</h2>
      <h3>Nombre:</h3> <p>{queryData.VerProyecto.lider.nombre}</p>
      <h3>Identificacion: </h3><p>{queryData.VerProyecto.lider.idUsuario}</p>
      <h3>Email: </h3><p>{queryData.VerProyecto.lider.email}</p>
      
      <h3>Avances: </h3><p>{queryData && queryData.VerProyecto.avance ? (
              <>
                {queryData.VerProyecto.avance.map((x) => {
                  return( <div key={x._id}>
                    
                    <h2>fecha</h2> {x.fecha}
                    
                   <h2>descripcion </h2> {x.descripcion}
                   
                   <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                   <h2>observaciones </h2> {x.observacionesDelLider}
                                  
                    
                  </div>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No hay avances</div>
            )}
       <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyectos/AgregarAvance/'+queryData.VerProyecto._id;
      }}
>Agregar Avance</Button>
    </p>
     
    </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Lider']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyecto/inscripcion/'+queryData.VerProyecto._id;
      }}
>Inscribirse</Button>
      
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h2>Datos básicos </h2>
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h3>Presupuesto:</h3> <p>{queryData.VerProyecto.presupuesto} </p>
      <h3>fase: </h3><p>{queryData.VerProyecto.fase} </p>
      <h3>estado: </h3><p>{queryData.VerProyecto.estado} </p>
      <h2>Informacion Lider</h2>
      <h3>Nombre:</h3> <p>{queryData.VerProyecto.lider.nombre}</p>
      <h3>Identificacion: </h3><p>{queryData.VerProyecto.lider.idUsuario}</p>
      <h3>Email: </h3><p>{queryData.VerProyecto.lider.email}</p>
      
      <h3>Avances: </h3><p>{queryData && queryData.VerProyecto.avance ? (
              <>
                {queryData.VerProyecto.avance.map((x) => {
                  return( <div key={x._id}>
                    
                    <h2>fecha</h2> {x.fecha}
                    
                   <h2>descripcion </h2> {x.descripcion}
                   
                   <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                   <h2>observaciones </h2> {x.observacionesDelLider}
                                  
                    
                  </div>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No hay avances</div>
            )}
       <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyectos/AgregarAvance/'+queryData.VerProyecto._id;
      }}
>Agregar Avance</Button>
    </p>
     
    </div>
    </PrivateComponent>
  </>
  );
};
