import { Request, Response } from "express";
import TasksModel from '../models/tasks/task.model';
import { createToken } from "../services/jwt.service";
import { ITask } from "../models/tasks/task.interface";

export async function getTasks(req: Request, res: Response) {
    try {
        const userId = res.locals.userId
        const tasks = await TasksModel.find({ userId });
        res.status(200).send({ tasks });
    } catch (error) {
        res.status(error.status || 500).send({ error: error.message || "Something went wrong :(" })
    }
}

export async function createTask(req: Request, res: Response) {
    try {
        const userId = res.locals.userId
        const data = { ...req.body, userId } as ITask;
        const task = await new TasksModel(data);
        await task.save();
        res.status(200).send({ taskId: task.id });

    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || 'Something went wrong :(' })
    }
}
