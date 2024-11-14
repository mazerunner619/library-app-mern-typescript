import { Request, Response } from "express";
import { register, login } from "../services/UserService";
import { IUser } from "../models/User";
import { InvalidUsernameOrPasswordError } from "../utils/LibraryErrors";

export const handleRegister = async (req: Request, res: Response) => {
  const user: IUser = req.body!;
  try {
    const registeredUser = await register(user);
    res.status(200).json({
      message: "User register successful!",
      user: {
        _id: registeredUser._id,
        type: registeredUser.type,
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
      },
    });
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key error")) {
      res
        .status(409)
        .json({
          message: "user with email already exists!",
          error: error.message,
        });
    } else {
      res.status(500).json({
        message: "could not register user!",
        error: error.message,
      });
    }
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const credentials = req.body;
  try {
    const loggedId = await login(credentials);
    res.status(200).json({
      message: "user logged in!",
      user: {
        _id: loggedId._id,
        type: loggedId.type,
        email: loggedId.email,
        firstName: loggedId.firstName,
        lastName: loggedId.lastName,
      },
    });
  } catch (error: any) {
    if (error instanceof InvalidUsernameOrPasswordError) {
      res
        .status(401)
        .json({
          message: "Username of password incorrect!",
          error: error.message,
        });
    } else {
      res.status(500).json({
        message: "Unable to login!",
        error: error.message,
      });
    }
  }
};
