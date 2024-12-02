import { config } from "../../config";
import UserDao, { IUserModel } from "../../daos/UserDao";
import { IUser } from "../../models/User";
import {
  findAllUsers,
  findUserById,
  login,
  modifyUser,
  register,
} from "../../services/UserService";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { InvalidUsernameOrPasswordError } from "../../utils/LibraryErrors";
import { commonError } from "../graphql";

export const handleRegister = async (parent: null, args: { body: IUser }) => {
  const user = args.body;
  try {
    const registeredUser = await register(user);
    return {
      _id: registeredUser._id,
      type: registeredUser.type,
      email: registeredUser.email,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
    };
  } catch (error: any) {
    console.log(error);
    let message = "something went wrong";
    let status = 500;
    let code = "Internal Server Error";

    if (error.message.includes("E11000 duplicate key error")) {
      status = 409;
      message = "user already exists!";
      code = "CONFLICT";
    }

    throw new GraphQLError(message, {
      extensions: {
        code,
        status,
      },
    });
  }
};

export const handleLogin = async (
  parent: {},
  args: {
    body: {
      email: string;
      password: string;
    };
  }
) => {
  const credentials = args.body;
  try {
    const loggedId = await login(credentials);
    return {
      _id: loggedId._id,
      type: loggedId.type,
      email: loggedId.email,
      firstName: loggedId.firstName,
      lastName: loggedId.lastName,
    };
  } catch (error: any) {
    // if (error instanceof InvalidUsernameOrPasswordError)
    throw new GraphQLError("something went wrong", {
      extensions: {
        status: 500,
        code: "NOT FOUND",
      },
    });
  }
};

export const getAllUsers = async () => {
  try {
    const users = await findAllUsers();
    return users;
  } catch (error: any) {
    throw commonError;
  }
};

export const getUserById = async (parent: {}, args: { id: string }) => {
  const { id } = args;
  try {
    const user = await findUserById(id);
    return user;
  } catch (error: any) {
    // if (error instanceof UserDoesNotExistError){}
    throw commonError;
  }
};

export const updateUser = async (parent: {}, args: { body: IUserModel }) => {
  const { body } = args;
  try {
    const upadtedUser = await modifyUser(body);
    console.log(upadtedUser);
    return upadtedUser;
  } catch (error: any) {
    // if (error instanceof UserDoesNotExistError)
    throw commonError;
  }
};
