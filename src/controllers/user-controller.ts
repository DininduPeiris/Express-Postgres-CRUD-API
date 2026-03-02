import { NextFunction, Response, Request } from "express";
import { UserRequestDto } from "../types/interfaces/requests/user-dto.js";
import { UserResponseDto } from "../types/interfaces/responses/user-dto.js";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/user-model.js";

// Standardized response function
const handleResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null,
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (
  req: Request<UserRequestDto>,
  res: Response<UserResponseDto>,
  next: NextFunction,
) => {
  const request:UserRequestDto = req.body;
  try {
    const newUser = await createUserService(request);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response<UserResponseDto[]>,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response<UserResponseDto>,
  next: NextFunction,
) => {
  try {
    const user = await getUserByIdService(Number(req.params.id));
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response<UserResponseDto>,
  next: NextFunction,
) => {
  const request:UserRequestDto = req.body;
  try {
    const updatedUser = await updateUserService(Number(req.params.id), request);
    handleResponse(res, 201, "User updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response<UserResponseDto>,
  next: NextFunction,
) => {
  try {
    const deletedUser = await deleteUserService(Number(req.params.id));
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (error) {
    next(error);
  }
};
