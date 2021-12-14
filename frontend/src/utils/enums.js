const Enum_Rol = {
  Administrador: 'Administrador',
  Estudiante: 'Estudiante',
  Lider: 'Líder',
};

const Enum_EstadoUsuario = {
  Pendiente: 'Pendiente',
  Autorizado: 'Autorizado',
  No_Autorizado: 'No_autorizado',
};

const Enum_EstadoProyecto = {
  Activo: 'Activo',
  Inactivo: 'Inactivo'
};
const Enum_FaseProyecto = {
  Iniciado: 'Iniciado',
  En_Desarrollo: 'En_Desarrollo',
  Terminado: 'Terminado',
  Null: 'Null'
};
const Enum_EstadoInscripcion = {
  Aceptada: 'Aceptada',
  Rechazada: 'Rechazada',
  Pendiente:'Pendiente'
}
export { Enum_Rol, Enum_EstadoUsuario, Enum_EstadoProyecto, Enum_FaseProyecto, Enum_EstadoInscripcion  };
