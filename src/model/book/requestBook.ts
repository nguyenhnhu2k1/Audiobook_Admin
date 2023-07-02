export interface SaveBookRequest {
  Audio: string,
  Author: string,
  BookCategory: [string], 
  BookName: string,
  Content: string,
  Img: string,
  IsBestSeller: boolean,
  IsFree: boolean,
  IsHot: boolean,
  IsNew: boolean,
  IsSale: boolean,
  Price: number,
  Status: number
}
export interface updateBookRequest {
  id: number,
  body: {
    Audio: string,
    Author: string,
    BookCategory: [string], //
    BookName: string,
    Content: string,
    Img: string,
    IsBestSeller: boolean,
    IsFree: boolean,
    IsHot: boolean,
    IsNew: boolean,
    IsSale: boolean,
    Price: number,
    Status: number
  }
}
export interface deleteBookRequest {
  id: number,
}
export interface getBookByIDRequest {
  id: number,
}
