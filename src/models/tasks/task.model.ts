import { Schema, SchemaOptions, model } from "mongoose";
import { ITaskDocument, ITask, ITaskModel } from "./task.interface";

const options: SchemaOptions = {
    timestamps: true
}
const TasksSchema: Schema<ITaskDocument> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, options);


export default model<ITaskDocument, ITaskModel>('tasks', TasksSchema);