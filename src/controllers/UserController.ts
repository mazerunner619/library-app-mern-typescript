import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  removeUser,
  modifyUser,
} from "../services/UserService";
import { UserDoesNotExistError } from "../utils/LibraryErrors";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({ message: "fetched all users!", users });
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Unable to fetch users at the moment!",
        error: error.message,
      });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await findUserById(userId);
    res.status(200).json({ message: "fetched user", user });
  } catch (error: any) {
    if (error instanceof UserDoesNotExistError)
      res.status(404).json({ message: "User does not exist!" });
    else
      res
        .status(500)
        .json({
          message: "Unable to find user at the moment!",
          error: error.message,
        });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const upadtedUser = await modifyUser(user);
    res.status(200).json({ message: "User updated!", upadtedUser });
  } catch (error: any) {
    if (error instanceof UserDoesNotExistError)
      res.status(404).json({ message: "User does not exist!" });
    else
      res
        .status(500)
        .json({
          message: "Unable to update user at the moment!",
          error: error.message,
        });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await removeUser(userId);
    res.status(200).json({ message: "User removed!" });
  } catch (error: any) {
    if (error instanceof UserDoesNotExistError)
      res.status(404).json({ message: "User does not exist!" });
    else
      res
        .status(500)
        .json({
          message: "Unable to delete user at the moment!",
          error: error.message,
        });
  }
};
