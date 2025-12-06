import {Router} from 'express';
import {getUsers, createUser, loginUser, getCurrentUser, signOutUser} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const authRouter = Router ();

authRouter.get ('/', auth, getUsers);

authRouter.post ('/register', createUser);

authRouter.post ('/login', loginUser);

authRouter.get('/current', auth, getCurrentUser);

authRouter.post('/logout', auth, signOutUser);

export default authRouter;
