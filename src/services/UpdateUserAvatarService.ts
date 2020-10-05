import { getRepository } from 'typeorm';
import path from 'path';
import User from '../models/Users';
import uploadConfig from '../config/upload'
import fs from 'fs'

import AppError from '../errors/AppError'

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename}: Request): Promise<User>{
    const usersRepository = getRepository(User);
    
    const user = await usersRepository.findOne(user_id);

    if (!user){
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      //deletar avatar anterior
      //.join une dois caminhos 1º o q qr add 2º o q qr remover
      // stat tras status de uma rquivo, entao acaba verificando se ele existe
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExist){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);
    // .save ele verifica se o usuario tem ID, se ele não tiver, ele cria o usuario
    // se tiver ele atualiza o usuario
    return user;
  }
}

export default UpdateUserAvatarService;