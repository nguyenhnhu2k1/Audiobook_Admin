export interface LoginRequest {
  //du lieu dn duoc gui len server
  username: string;
  password: string;
}

export interface editInfoRequest{
  address: string,
  age: number,
  email: string,
  fullName: string,
  password: string,
  phone: string,
  photo: string
}

export interface userByIDRequest{
  id: string,
}