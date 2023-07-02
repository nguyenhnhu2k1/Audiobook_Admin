import type { CommonResponse } from "../xhr";

export interface CategoryResponse<T extends CategoryRecord> extends CommonResponse {
  data: T;
  code: string;
  status: number;
}

export interface CategoryRecord {
  data: Category;
  success: boolean;
  message: string;
}

export interface Category {
  Id: number;
  Name: string;
  Description: string;
  Images: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
