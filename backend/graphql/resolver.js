import { UserModel } from '../models/user/userModel.js';
const resolvers = {
  Query: {
    Usuarios: async (parent, args) => {
      console.log('parent usuario', parent);
      const usuarios = await UserModel.find();
      return usuarios;
    }
  }
}
export { resolvers };