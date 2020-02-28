import { Router } from 'express';
import { Route } from '../interfaces';
import { createTask, getTasks, deleteTask, updatedTask } from '../controllers/task.controllers';
import { isAuth } from '../middlewares/auth.middleware';
const router = Router();


router.get('/', isAuth, getTasks);
router.post('/', isAuth, createTask);
router.delete('/:id', isAuth, deleteTask);
router.put('/:id', isAuth, updatedTask)
// router.post('/', createUser);
// router.post('/auth', login);


export default { name: '/tasks', router } as Route;