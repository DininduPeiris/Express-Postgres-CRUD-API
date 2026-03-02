import { NextFunction, Request, Response } from "express";

// Centralized error handling
const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err.stack);
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message,
  });
};

export default errorHandling;
