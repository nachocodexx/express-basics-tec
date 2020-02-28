import { Request, Response } from "express";
import TasksModel from '../models/tasks/task.model';
import { createToken } from "../services/jwt.service";
import { ITask } from "../models/tasks/task.interface";
import taskModel from "../models/tasks/task.model";

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

export async function deleteTask(req: Request, res: Response) {
    try {
        const taskId: string = req.params.id;
        console.log(taskId);
        await taskModel.findByIdAndRemove(taskId).exec();

        res.status(200).send({ taskId, deleted: true });

    } catch (error) {

        res.status(error.status || 500).send({ message: error.message || 'Something went wrong :(' })
    }
}

export async function updatedTask(req: Request, res: Response) {
    try {
        const taskId: string = req.params.id;

        res.status(200).send({ taskId, updated: true });

    } catch (error) {

        res.status(error.status || 500).send({ message: error.message || 'Something went wrong :(' })
    }
}
