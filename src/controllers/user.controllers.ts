import { Request, Response } from "express";
import UsersModel from '../models/users/user.model';
import { createToken } from "../services/jwt.service";

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await UsersModel.find();
        res.status(200).send({ users });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong :(" })
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const data = req.body;
        const user = await new UsersModel(data);
        const token = createToken(user._id);
        await user.save();
        res.status(200).send({ token, user });

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export async function login(req: Request, res: Response) {
    try {
        type Credentails = {
            username: string;
            password: string;
        }
        const data = req.body as Credentails;
        const user = await UsersModel.findOne({ username: data.username });
        if (!user) throw { message: `${data.username} does not exist`, status: 403 };
        else if (!user.comparePassword(data.password)) throw { message: `Password is incorrect`, status: 403 };

        const token = createToken(user._id);
        res.status(200).send({ token, user })

    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || 'Something went wrong :(' })
        // throw error; 
    }
}
