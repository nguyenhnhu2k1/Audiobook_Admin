export interface SaveCategoryRequest {
    Description: string,
    Images: string,
    Name: string,
}

export interface updateCategoryRequest {
    id: number,
    body: {
        Description: string,
        Images: string,
        Name: string,
    }
}

export interface deleteCategoryRequest {
    id: number,
}

export interface getCategoryByIDRequest {
    id: number,
}