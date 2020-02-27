import { Schema, model } from "mongoose";
import { IUserModel, IUserDocument, IUser } from './user.interface'
import { hashSync, compareSync } from 'bcrypt';



const UsersSchema: Schema<IUserDocument> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 16 }
});

UsersSchema.pre('save', function (this: IUserDocument) {
    if (this.isNew || this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }

});

UsersSchema.methods.comparePassword = function (this: IUserDocument, password: string) {
    return compareSync(password, this.password);

}

export default model<IUserDocument, IUserModel>('users', UsersSchema);