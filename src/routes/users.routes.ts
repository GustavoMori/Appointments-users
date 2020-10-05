import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import uploadConfig from '../config/upload'



const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  })

  delete user.password;

  return response.json(user);
});
// atualizar uma informação do usuario (put é para quando quer atualizar uma informação por completo)
usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;