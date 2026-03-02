import pool from "../config/db.js";
import { UserRequestDto } from "../types/interfaces/requests/user-dto.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return result.rows[0];
};

export const createUserService = async (request: UserRequestDto) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [request.name, request.email],
  );
  return result.rows[0];
};

export const updateUserService = async (
  id: number,
  request: UserRequestDto,
) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [request.name, request.email, id],
  );
  return result.rows[0];
};

export const deleteUserService = async (id: number) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};
