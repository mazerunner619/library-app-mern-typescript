import mongoose, {Schema, Document} from 'mongoose'
import {IUser} from '../models/User';

export interface IUserModel extends IUser, Document{};

const UserSchema = new Schema(
    {
        type: {type:String, required:true},
        firstName: {type:String, require:true},
        lastName: {type:String, require:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>("User", UserSchema);