import { ApiClient } from ".";
import { useCookies } from "vue3-cookies";
import type { CategoryRecord, CategoryResponse } from "@/model/category/category";

class CategoryService extends ApiClient {
    public getCategory() {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        return this.$get<CategoryResponse<CategoryRecord>>('all',
            {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
   
    public saveCategory(data: SaveCategoryRequest) {
        const { cookies } = useCookies()
        const token = cookies.get('token')
        console.log(data)
        return this.$post<CategoryResponse<CategoryRecord>>('save', data, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

    public updateCategory(data: updateCategoryRequest) {
        const { cookies } = useCookies()
        const token = cookies.get('token')
        return this.$post<CategoryResponse<CategoryRecord>>(`${data.id}/update`, data.body, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

    public deleteCategory(data: deleteCategoryRequest){
        const { cookies } = useCookies()
        const token = cookies.get('token') 
        console.log(data) ///
        return this.$delete<CategoryResponse<CategoryRecord>>(`${data.id}` ,data, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

    public getCategoryByID(data: getCategoryByIDRequest){
        const { cookies } = useCookies()
        const token = cookies.get('token') 
        return this.$get<CategoryResponse<CategoryRecord>>(`${data.id}` ,data, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

}

export const categoryService = new CategoryService("category-book");