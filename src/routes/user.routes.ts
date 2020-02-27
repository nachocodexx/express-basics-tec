import { Router } from 'express';
import { Route } from '../interfaces';
import { getUsers, createUser, login } from '../controllers/user.controllers';
const router = Router();


router.get('/', getUsers);
router.post('/', createUser);
router.post('/auth', login);


export default { name: '/users', router } as Route;