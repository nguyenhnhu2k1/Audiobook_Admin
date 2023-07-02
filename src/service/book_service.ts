import { ApiClient } from ".";
import { useCookies } from "vue3-cookies";
import type { BookRecord, BookResponse } from "@/model/book/book";

class BookService extends ApiClient {
    public getBookByID(data: getBookByIDRequest) {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        return this.$get<BookResponse<BookRecord>>(data.id, data,
            {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    public getBook() {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        return this.$get<BookResponse<BookRecord>>('all',
            {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    public saveBook(data: SaveBookRequest) {
        console.log(data);
        const { cookies } = useCookies()
        const token = cookies.get('token')
        return this.$post<BookResponse<BookRecord>>('save', data, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

    public updateBook(data: updateBookRequest) {
        const { cookies } = useCookies()
        const token = cookies.get('token')
        return this.$post<BookResponse<BookRecord>>(`${data.id}/update`, data.body, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

    public deleteBook(data: deleteBookRequest){
        const { cookies } = useCookies()
        const token = cookies.get('token') 
        console.log(data.id)
        return this.$delete<BookResponse<BookRecord>>(data.id, data, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }
}

export const bookService = new BookService("book");
