import type { CommonResponse } from "../xhr";
export interface OrderResponse<T extends OrderRecord> extends CommonResponse {
  data: T;
  code: string;
  status: number;
}
export interface OrderRecord {
  data: Order;
  success: boolean;
  message: string;
}
export interface book {
  ID: number;
  BookName: string;
  Author: string;
  Content: string;
  Img: string;
  Audio: string;
  Price: number;
  IsHot: boolean;
  IsNew: boolean;
  IsBestSeller: boolean;
  IsSale: boolean;
  IsFree: boolean;
  Status: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export interface item {
  Id: number,
  Quantity: number,
  TotalAmount: number,
  Book: book,
  CreatedAt: Date,
  UpdatedAt: Date

}
export interface cart {
  Id: number,
  TotalPrice: number,
  IsCurrent: boolean,
  Items: item
  Status: number,
  CreatedAt: Date,
  UpdatedAt: Date
}

export interface Order {
  Id: number,
  UserId: string,
  CartId: number,
  Cart: cart
  status: number,
  CreatedAt: Date,
  UpdatedAt: Date
}
