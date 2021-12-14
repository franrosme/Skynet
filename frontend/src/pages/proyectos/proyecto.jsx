import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { GET_PROYECTO} from 'graphql/proyectos/queries';
import { toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';

export default function Proyecto (props) {
  const idUsuario = props._id;
  var EstudianteActivo = false;
  var inscripcionValida= false;
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
  <>
    <PrivateComponent roleList={['Administrador']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <div id="pattern" className="pattern">
        <div className="c">
          <div className="main">
            <h1 className="titulo"> {queryData.VerProyecto.nombre} </h1>
        	</div>
			    <div className="c2">
            <h4 className="blue"><span className="middle">Datos básicos</span></h4>
            <div className="project-info">
							<div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-money-bill-wave fa-fw w3-xxlarge w3-margin-right"> </i>Presupuesto:</div>
                <div className="project-info-value"><span>$ {queryData.VerProyecto.presupuesto}</span></div>
							</div>
              <div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-business-time fa-fw w3-xxlarge w3-margin-right"></i>fase:  </div>
                <div className="project-info-value"><span>{queryData.VerProyecto.fase}</span></div>
							</div>
              <div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>estado: </div>
                <div className="project-info-value"><span>{queryData.VerProyecto.estado}</span></div>
							</div>
           </div>
          </div>
        <div className="c3">
          <h4 className="blue"><span className="middle">Información Lider</span></h4>
          <div className="project-info">
            <div className="project-info-row">
              <div className="project-info-name"> <i className="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.nombre}</span></div>
            </div>
            <div className="project-info-row">
              <div className="project-info-name"> <i className="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.idUsuario}</span></div>
            </div>
            <div className="project-info-row">
              <div className="project-info-name"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.email}</span></div>
              </div>
            </div>
          </div>
	      </div>
    	</div>
    	<div className="container">	
	    	<section className="pattern-description">
          <div className="mah-accordion">
           <div className="half">
             <div className="tab">
              <input id="tab-one" type="checkbox" name="tabs" />
              <label for="tab-one">Objetivos</label>
              <div className="tab-content">
                <h3 className="blue"> <span className="middle">Objetivo General:</span></h3>
                <p>{queryData.VerProyecto.objetivosGenerales}</p>
                <h3 className="blue"> <span className="middle">Objetivos Especificos:</span></h3>
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
            <div className="tab">
              <input id="tab-two" type="checkbox" name="tabs" />
              <label for="tab-two">Avances</label>
              <div className="tab-content">
                <div className="hr hr-8 dotted"></div>
                {queryData && queryData.VerProyecto.avance.length>0 ? (
                  <>
                  {queryData.VerProyecto.avance.map((x) => {
                    return( <div key={x._id}>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha:</span></h3>
                      <p>{x.fecha}</p>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-file-signature fa-fw w3-xxlarge w3-margin-right"> </i>Descripción:</span></h3>
                      <p>{x.descripcion}</p>
                      <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-file-alt fa-fw w3-xxlarge w3-margin-right"> </i>Observaciones del Lider:</span></h3>
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
                      <div className="hr hr-8 dotted"></div>
                        </div>);
                       })}
                        </>
                      ) : (
                        <div>No hay avances</div>
                      )}
             
            </div>
            </div>
            <div className="tab">
              <input id="tab-three" type="checkbox" name="tabs" />
              <label for="tab-three">Inscripciones</label>
              <div className="tab-content">
              <div className="hr hr-8 dotted"></div>
              <div>
              {queryData && queryData.VerProyecto.inscripcion.length>0 ? (
                <>
                {queryData.VerProyecto.inscripcion.map((x) => {
                  return( <div key={x._id}>
                    <div className="left_part">
                    <h4 className="blue"><span className="middle">Información Estudiante</span></h4>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>
                      <div className="project-info-value"> <span>{x.estudiante.nombre}</span></div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>
                      <div className="project-info-value"><span>{x.estudiante.idUsuario}</span></div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>
                      <div className="project-info-value"><span>{x.estudiante.email}</span></div>
                    </div>
                  </div>
                  <div className="right_part">
                    <h4 className="blue"><span className="middle">Información Inscripción</span></h4>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de ingreso:</div>
                      <div className="project-info-value"><span>{x.fechaDeIngreso}</span> </div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de Egreso:</div>
                      <div className="project-info-value"> <span>{x.fechaDeEgreso}</span> </div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>Estado:</div>
                      <div className="project-info-value"><span>{x.estado}</span>
                      <span> <Link to={`/proyectos/inscripciones/estado/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link></span>
                    </div>
                   </div>
                  </div>               
                  <div className="hr hr-8 dotted"></div>
                  </div>);
                  })}
                  </>
                  ) : (
                    <div>No hay inscripciones</div>
                  )}
                </div>  
               </div>
            </div>
          </div>
          </div>
        </section>
          <footer role="contentinfo">   
           <div className="btn buttonAdd" onClick={(e) => {
             e.preventDefault();
             window.location.href = `/proyectos/editar/${idProyecto}`;} }> 
              <i className='fas fa-plus-circle text-white-600 cursor-pointer' /> Editar Proyecto
            </div>
          </footer>
          </div>
        </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Lider']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <div id="pattern" className="pattern">
        <div className="c">
          <div className="main">
            <h1 className="titulo"> {queryData.VerProyecto.nombre} </h1>
        	</div>
			    <div className="c2">
            <h4 className="blue"><span className="middle">Datos básicos</span></h4>
            <div className="project-info">
							<div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-money-bill-wave fa-fw w3-xxlarge w3-margin-right"> </i>Presupuesto:</div>
                <div className="project-info-value"><span>$ {queryData.VerProyecto.presupuesto}</span></div>
							</div>
              <div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-business-time fa-fw w3-xxlarge w3-margin-right"></i>fase:  </div>
                <div className="project-info-value"><span>{queryData.VerProyecto.fase}</span></div>
							</div>
              <div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>estado: </div>
                <div className="project-info-value"><span>{queryData.VerProyecto.estado}</span></div>
							</div>
           </div>
          </div>
        <div className="c3">
          <h4 className="blue"><span className="middle">Información Lider</span></h4>
          <div className="project-info">
            <div className="project-info-row">
              <div className="project-info-name"> <i className="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.nombre}</span></div>
            </div>
            <div className="project-info-row">
              <div className="project-info-name"> <i className="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.idUsuario}</span></div>
            </div>
            <div className="project-info-row">
              <div className="project-info-name"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.email}</span></div>
              </div>
            </div>
          </div>
	      </div>
    	</div>
    	<div className="container">	
	    	<section className="pattern-description">
          <div className="mah-accordion">
           <div className="half">
             <div className="tab">
              <input id="tab-one" type="checkbox" name="tabs" />
              <label for="tab-one">Objetivos</label>
              <div className="tab-content">
                <h3 className="blue"> <span className="middle">Objetivo General:</span></h3>
                <p>{queryData.VerProyecto.objetivosGenerales}</p>
                <h3 className="blue"> <span className="middle">Objetivos Especificos:</span></h3>
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
            <div className="tab">
              <input id="tab-two" type="checkbox" name="tabs" />
              <label for="tab-two">Avances</label>
              <div className="tab-content">
                <div className="hr hr-8 dotted"></div>
                {queryData && queryData.VerProyecto.avance.length>0 ? (
                  <>
                  {queryData.VerProyecto.avance.map((x) => {
                    return( <div key={x._id}>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha:</span></h3>
                      <p>{x.fecha}</p>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-file-signature fa-fw w3-xxlarge w3-margin-right"> </i>Descripción:</span></h3>
                      <p>{x.descripcion}</p>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-file-alt fa-fw w3-xxlarge w3-margin-right"> </i>Observaciones del Lider:</span></h3>
                      {x && x.observacionesDelLider.length>0 ? (
                        <>
                        {x.observacionesDelLider.map((i) => {
                          return( <div key={i._id}>
                            <li>{i}</li>
                            <Link to={`/proyectos/avances/observacion/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>                      
                          </div> );})
                          }
                        </>
                      ) : (
                        <div>No hay Observaciones</div>
                      )}
                       {queryData.VerProyecto.estado==="Activo" ?(
                         <>
                        
                      <Link to={`/proyectos/avances/nuevaObservacion/${x._id}`}>
                        <i className='fas fa-plus-circle text-green-600 hover:text-green-400 cursor-pointer' />
                      </Link></>):(<div></div>)}
                      <div className="hr hr-8 dotted"></div>
                        </div>);
                       })}
                        </>
                      ) : (
                        <div>No hay avances</div>
                      )}
                  
            </div>
            </div>
            <div className="tab">
              <input id="tab-three" type="checkbox" name="tabs" />
              <label for="tab-three">Inscripciones</label>
              <div className="tab-content">
              <div className="hr hr-8 dotted"></div>
              <div>
              {queryData && queryData.VerProyecto.inscripcion.length>0 ? (
                <>
                {queryData.VerProyecto.inscripcion.map((x) => {
                  return( <div key={x._id}>
                    <div className="left_part">
                    <h4 className="blue"><span className="middle">Información Estudiante</span></h4>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>
                      <div className="project-info-value"> <span>{x.estudiante.nombre}</span></div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>
                      <div className="project-info-value"><span>{x.estudiante.idUsuario}</span></div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>
                      <div className="project-info-value"><span>{x.estudiante.email}</span></div>
                    </div>
                  </div>
                  <div className="right_part">
                    <h4 className="blue"><span className="middle">Información Inscripción</span></h4>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de ingreso:</div>
                      <div className="project-info-value"><span>{x.fechaDeIngreso}</span> </div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de Egreso:</div>
                      <div className="project-info-value"> <span>{x.fechaDeEgreso}</span> </div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>Estado:</div>
                      <div className="project-info-value"><span>{x.estado}</span>
                     { queryData.VerProyecto.estado==="Activo" ?(
                      <span> <Link to={`/proyectos/inscripciones/estado/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link></span>):(<div></div>)}
                    </div>
                   </div>
                  </div>               
                  <div className="hr hr-8 dotted"></div>
                  </div>);
                  })}
                  </>
                  ) : (
                    <div>No hay inscripciones</div>
                  )}
                </div>  
               </div>
            </div>
          </div>
          </div>
        </section>
        {queryData.VerProyecto.estado==="Activo" ? (
          <footer role="contentinfo">   
          <div className="btn buttonAdd" onClick={(e) => {
            e.preventDefault();
             window.location.href = `/proyectos/editar/${idProyecto}`;} }> 
             <i className='fas fa-plus-circle text-white-600 cursor-pointer' /> Editar Proyecto
           </div>
         </footer>
        ):(<div></div>)}
          
          </div>
        </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Estudiante']}>
      {queryData.VerProyecto.estado==="Activo"?(
       (queryData.VerProyecto.inscripcion.length>0 ) ?(
         queryData.VerProyecto.inscripcion.forEach((x) => {
           
          if(x.estudiante._id===idUsuario && x.estado==="Aceptada" && x.fechaDeEgreso===null){
            EstudianteActivo=true;
            inscripcionValida=false;
         }
         else if (x.estudiante._id!==idUsuario){
          inscripcionValida=true;
         }
        else if(x.estudiante._id===idUsuario && x.fechaDeEgreso!==null){
          inscripcionValida=true;
        }
        else if(x.estudiante._id===idUsuario && x.estado==="Pendiente"){
          inscripcionValida=false;
        }

        })):(<div>{inscripcionValida=true}</div>)):(<div>{inscripcionValida=false}</div>)}
        
       { EstudianteActivo ? (<div>{inscripcionValida=false}</div>):(<div></div>)
        
      }
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      {inscripcionValida ? ( <div className="btn buttonAdd" onClick={(e) => {
              e.preventDefault();
               window.location.href = '/proyecto/inscripcion/' + idProyecto;} }> 
               <i className='fas fa-plus-circle text-white-600 cursor-pointer' /> Inscribirse
             </div>):(<div></div>)}
      <div id="pattern" className="pattern">
        <div className="c">
          <div className="main">
            <h1 className="titulo"> {queryData.VerProyecto.nombre} </h1>
        
           
         
          
          
            </div>
            
			    <div className="c2">
            <h4 className="blue"><span className="middle">Datos básicos</span></h4>
            <div className="project-info">
							<div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-money-bill-wave fa-fw w3-xxlarge w3-margin-right"> </i>Presupuesto:</div>
                <div className="project-info-value"><span>$ {queryData.VerProyecto.presupuesto}</span></div>
							</div>
              <div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-business-time fa-fw w3-xxlarge w3-margin-right"></i>fase:  </div>
                <div className="project-info-value"><span>{queryData.VerProyecto.fase}</span></div>
							</div>
              <div className="project-info-row">
								<div className="project-info-name"> <i className="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>estado: </div>
                <div className="project-info-value"><span>{queryData.VerProyecto.estado}</span></div>
							</div>
           </div>
          </div>
        <div className="c3">
          <h4 className="blue"><span className="middle">Información Lider</span></h4>
          <div className="project-info">
            <div className="project-info-row">
              <div className="project-info-name"> <i className="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.nombre}</span></div>
            </div>
            <div className="project-info-row">
              <div className="project-info-name"> <i className="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.idUsuario}</span></div>
            </div>
            <div className="project-info-row">
              <div className="project-info-name"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>
              <div className="project-info-value"><span>{queryData.VerProyecto.lider.email}</span></div>
              </div>
            </div>
          </div>
	      </div>
    	</div>
    	<div className="container">	
	    	<section className="pattern-description">
          <div className="mah-accordion">
           <div className="half">
             <div className="tab">
              <input id="tab-one" type="checkbox" name="tabs" />
              <label for="tab-one">Objetivos</label>
              <div className="tab-content">
                <h3 className="blue"> <span className="middle">Objetivo General:</span></h3>
                <p>{queryData.VerProyecto.objetivosGenerales}</p>
                <h3 className="blue"> <span className="middle">Objetivos Especificos:</span></h3>
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
            <div className="tab">
              <input id="tab-two" type="checkbox" name="tabs" />
              <label for="tab-two">Avances</label>
              <div className="tab-content">
                <div className="hr hr-8 dotted"></div>
                {queryData && queryData.VerProyecto.avance.length>0 ? (
                  <>
                  {queryData.VerProyecto.avance.map((x) => {
                    return( <div key={x._id}>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha:</span></h3>
                      <p>{x.fecha}</p>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-file-signature fa-fw w3-xxlarge w3-margin-right"> </i>Descripción:</span></h3>
                      <p>{x.descripcion}</p>
                      <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                      <h3 className="blue"> <span className="middle"><i className="fa fa-file-alt fa-fw w3-xxlarge w3-margin-right"> </i>Observaciones del Lider:</span></h3>
                      {x && x.observacionesDelLider.length>0 ? (
                        <>
                        {x.observacionesDelLider.map((x) => {
                          return( <div key={x._id}>
                            <li>{x}</li>
                            </div>);
                          })}
                          
                        </>
                      ) : (
                        <div>No hay Observaciones</div>
                      )}
                     
                      <div className="hr hr-8 dotted"></div>
                        </div>);
                       })}
                        </>
                      ) : (
                        <div>No hay avances</div>
                      )}
             <div className="left_part"></div>
             <div className="right_part">
                {EstudianteActivo ? (<div className="btn buttonAdd" onClick={(e) => {
               e.preventDefault();
               window.location.href = '/proyectos/AgregarAvance/'+queryData.VerProyecto._id;
               } }> <i className='fas fa-plus-circle text-white-600 cursor-pointer' /> Agregar Avance
            </div>):(<div></div>)}
             </div>      
            </div>
            </div>
            <div className="tab">
              <input id="tab-three" type="checkbox" name="tabs" />
              <label for="tab-three">Inscripciones</label>
              <div className="tab-content">
              <div className="hr hr-8 dotted"></div>
              <div>
              {queryData && queryData.VerProyecto.inscripcion.length>0 ? (
                <>
                {queryData.VerProyecto.inscripcion.map((x) => {
                  if(x.estudiante._id===idUsuario && x.estado==="Aceptada" && x.fechaDeEgreso===null){
                    EstudianteActivo="true";
                  }
                  return( <div key={x._id}>
                    <div className="left_part">
                    <h4 className="blue"><span className="middle">Información Estudiante</span></h4>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-user fa-fw w3-xxlarge w3-margin-right"> </i>Nombre:</div>
                      <div className="project-info-value"> <span>{x.estudiante.nombre}</span></div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-id-card fa-fw w3-xxlarge w3-margin-right"> </i>Identificacion:   </div>
                      <div className="project-info-value"><span>{x.estudiante.idUsuario}</span></div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i>Email: </div>
                      <div className="project-info-value"><span>{x.estudiante.email}</span></div>
                    </div>
                  </div>
                  <div className="right_part">
                    <h4 className="blue"><span className="middle">Información Inscripción</span></h4>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de ingreso:</div>
                      <div className="project-info-value"><span>{x.fechaDeIngreso}</span> </div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-calendar-alt fa-fw w3-xxlarge w3-margin-right"> </i>Fecha de Egreso:</div>
                      <div className="project-info-value"> <span>{x.fechaDeEgreso}</span> </div>
                    </div>
                    <div className="project-info-row">
                      <div className="project-info-name"> <i className="fa fa-receipt fa-fw w3-xxlarge w3-margin-right"> </i>Estado:</div>
                      <div className="project-info-value"><span>{x.estado}</span>
                      
                    </div>
                   </div>
                  </div>               
                  <div className="hr hr-8 dotted"></div>
                  </div>);
                  })}
                  </>
                  ) : (
                    <div>No hay inscripciones</div>
                  )}
                </div>  
               </div>
            </div>
          </div>
          </div>
        </section>
         
          </div>
        </div>
    </PrivateComponent>
  
  </>
  );
};
