import { Document, Model } from "mongoose";

export interface ITask {
    title: string;
    isDone?: boolean;
    description: string;
    userId: string;
}
export interface ITaskDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}
export interface ITaskModel extends Model<ITaskDocument> { }