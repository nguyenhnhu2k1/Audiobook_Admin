export interface getStatusRequest {
  status: number,
}

export interface putStatusRequest {
  id: number,
  body:{
    Status: number,
  }
}

export interface getOrderByIDRequest {
  id: number
}