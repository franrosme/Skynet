import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/enums/tipos.js';
import { tiposUsuario } from '../models/user/tipos.js';
import { tiposProyecto } from '../models/project/tipos.js';
import { tiposAutenticacion } from './auth/types.js';

const tiposGlobales = gql`
  scalar Date
`;

export const types = [
  tiposGlobales,
  tiposEnums,
  tiposUsuario,
  tiposProyecto,
  tiposAutenticacion,
];