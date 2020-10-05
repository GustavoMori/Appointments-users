import { getRepository } from 'typeorm';
import User from '../models/Users';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError'

// sign = criar um token
// verify = recebe um token como parametro e vai utilizar a chave
interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password}: Request): Promise<Response>{
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({
      where: { email }
    });
    if (!user){ // !===NAO (variavel encontrada)
      throw new AppError('Incorrect email/password combination.', 401)
    }
    // user.password - senha criptografada
    // password - senha nao criptografada (tentativa do login)
    const passwordMatched = await compare(password, user.password);
    // compare compara uma senha não criptografada com uma criptografada
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    // Usuário autenticado
    const token = sign({  }, secret, {
      subject: user.id, // sempre será o ID do usuario
      expiresIn,
    });
    //nao pode colocar dados sensiveis dentro do sign

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;