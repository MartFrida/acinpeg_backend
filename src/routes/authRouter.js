import {Router} from 'express';

import {getUsers, createUser, loginUser, getCurrentUser, signOutUser} from '../controllers/userController.js';

const authRouter = Router ();

authRouter.get ('/', getUsers);

authRouter.post ('/register', createUser);

authRouter.post ('/login', loginUser);

authRouter.get('/current', getCurrentUser);

authRouter.post('/logout', signOutUser);

export default authRouter;
