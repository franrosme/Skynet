import { resolversProyecto } from '../models/project/resolvers.js';
import { resolversUsuario } from '../models/user/resolvers.js';

export const resolvers = [
  resolversUsuario,
  resolversProyecto,
];