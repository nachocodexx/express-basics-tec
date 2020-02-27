import { Document, Model } from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    password: string;

}

export interface IUserDocument extends IUser, Document {
    comparePassword: (password: string) => boolean

}
export interface IUserModel extends Model<IUserDocument> {



}