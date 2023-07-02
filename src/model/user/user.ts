import type { CommonResponse } from "../xhr";

export interface UserResponse<T extends UserRecord> extends CommonResponse {
  data: T;
  code: string;
  status: number;
}
export interface UserRecord {
  data: User;
  success: boolean;
  message: string;
}

export interface Role {
  Id: number;
  RoleName: string;
  Description: string;
}

export interface User {
  Id: String,
  Username: String,
  Email: String,
  Phone: String,
  Password: String,
  FullName: String,
  Age: number,
  Address: String,
  Photo: String,
  Status: number,
  RoleId: number,
  CreatedAt: Date,
  UpdatedAt: Date,
  Role: Role
  Token: String
}
