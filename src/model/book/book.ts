import type { CommonResponse } from "../xhr";

export interface BookResponse<T extends BookRecord> extends CommonResponse {
    data: T;
    code: string;
    status: number;
}

export interface BookRecord {
    data: Book;
    success: boolean;
    message: string;
}

export interface Book {
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
    BookCategory: Category;
}

export interface Category {
    ID: number;
    Name: string;
    Description: string;
    Images: string;
    CreatedAt: Date;
    UpdatedAt: Date
}