import bcrypt from "bcrypt";
import { config } from "../config";

import UserDao, { IUserModel } from "../daos/UserDao";
import { IUser } from "../models/User";
import {
  InvalidUsernameOrPasswordError,
  UnableToSaveUserError,
  UserDoesNotExistError,
} from "../utils/LibraryErrors";

export const register = async (user: IUser): Promise<IUserModel> => {
  const ROUNDS = config.server.rounds;
  try {
    const hashedPass = await bcrypt.hash(user.password, ROUNDS);
    const newUser = new UserDao({ ...user, password: hashedPass });
    return await newUser.save();
  } catch (error: any) {
    throw new UnableToSaveUserError(error.message);
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<IUserModel> => {
  const { email, password } = credentials;
  try {
    const user = await UserDao.findOne({ email });

    if (user) {
      const validPassword: boolean = await bcrypt.compare(
        password,
        user.password
      );
      if (validPassword) {
        return user;
      }
    }
    throw new InvalidUsernameOrPasswordError("Invalid username or password!");
  } catch (error: any) {
    throw error;
  }
};

export const findAllUsers = async (): Promise<IUserModel[]> => {
  try {
    const users = await UserDao.find();
    return users;
  } catch (error: any) {
    throw error;
  }
};

export const findUserById = async (userId: string): Promise<IUserModel> => {
  try {
    const user = await UserDao.findById(userId);
    if (user) return user;
    throw new UserDoesNotExistError("User does not exist!");
  } catch (error: any) {
    throw error;
  }
};

export const modifyUser = async (user: IUserModel): Promise<IUserModel> => {
  try {
    const { _id, ...updateFields } = user;
    const updatedUser = await UserDao.findByIdAndUpdate(
      user._id,
      { $set: { ...updateFields } },
      {
        new: true,
      }
    );
    if (updatedUser) return updatedUser;
    throw new UserDoesNotExistError(`user could not be found! ${user._id}`);
  } catch (error: any) {
    throw error;
  }
};

export const removeUser = async (userId: string): Promise<boolean> => {
  try {
    const deletedUser = await UserDao.findByIdAndDelete(userId);
    if (deletedUser) return true;
    throw new UserDoesNotExistError(`user could not be deleted! ${userId}`);
  } catch (error: any) {
    throw error;
  }
};
