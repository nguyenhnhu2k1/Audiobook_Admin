import { categoryService } from '@/service/category_book';
import { createStore, createLogger } from 'vuex';
import { useCookies } from "vue3-cookies";
import { bookService } from '@/service/book_service';
import { orderService } from '@/service/order_service';
import { authService } from '@/service/auth_service';

const categoryList = {
  namespace: true,
  state: {
    genresList: [],
    genresByID: [],
  },

  getters: {
    getGenresByIDGet(state) {
      return state.genresByID;
    },
    getGenresList(state: { genresList: any; }) {
      return state.genresList;
    },
  },

  mutations: {
    setCategories: (state, categories) => {
      state.genresList = categories;
    },
    setGenresByID: (state, obj) => {
      state.genresByID.push(obj);
    },
    deletegenresByID(state) {
      state.genresByID.splice(0, state.genresByID.length)
    },
    deleteGenresByIndex(state, index) {
      state.genresByID.splice(index, 1);
    }

  },

  actions: {
    deleteGenresByIndex({ commit }, index) {
      commit('deleteGenresByIndex', index)
    },
    //xoa genresByID
    deletegenresByID({ commit }) {
      commit('deletegenresByID')
    },
    async getCategory({ commit }) {
      const { cookies } = useCookies();
      const { data, status } = await categoryService.getCategory();
      const d = data.Data;
      if (cookies.isKey("token")) {
        commit('setCategories', d);
      }

    },

    async saveCategory({ commit }, newItem) {
      const requestCategory: SaveCategoryRequest = {
        Description: newItem.Description,
        Images: newItem.Images,
        Name: newItem.Name,
      };
      try {
        const { data, status } = await categoryService.saveCategory(requestCategory);
        if (status === 200) {
          alert("Thêm thể loại thành công: " + data.Data.Name)
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateCategory({ commit }, updateItem) {
      const requestCategory: updateCategoryRequest = {
        id: updateItem.ID,
        body: {
          Description: updateItem.Description,
          Images: updateItem.Images,
          Name: updateItem.Name,
        }
      };
      try {
        const { data, status } = await categoryService.updateCategory(requestCategory);
        if (status === 200) {
          alert("Cập nhật thể loại thành công: " + data.Data.Name)
        }
      } catch (error) {
        console.log(error);

      }
    },

    async deleteCategory({ commit }, idArr) {
      const requestCategory: deleteCategoryRequest = {
        id: idArr,
      };
      try {
        const { data, status } = await categoryService.deleteCategory(requestCategory);
        if (status === 200) {
          alert("Đã xóa thành công");
        }
      } catch (error) {
        console.log(error)
      }

    },
    async getCategoryByID({ commit }, idArr) {
      const requestCategory: getCategoryByIDRequest = {
        id: idArr,
      };
      try {
        const { data, status } = await categoryService.getCategoryByID(requestCategory);
        if (status === 200) {
          commit("setGenresByID", data.Data);
        }
      } catch (error) {
        console.log(error)
      }

    },

  }

}

const book = {
  namespace: true,
  state: {
    bookList: [],
    bookByID: {},
  },
  getters: {
    getBookList(state) {
      return state.bookList;
    },

    getBookByIDInState(state) {
      return state.bookByID;
    },
  },
  mutations: {
    setBook: (state, book) => {
      state.bookList = book;
    },
    setBookByID: (state, book) => {
      state.bookByID = book;
    },
  },
  actions: {
    async getBookByID({ commit }, idBook) {
      const requestBook: getBookByIDRequest = {
        id: idBook,
      };
      try {
        const { data, status } = await bookService.getBookByID(requestBook);
        if (status === 200) {
          // alert("lay thanh cong")
          commit('setBookByID', data.Data);
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getBook({ commit }) {
      const { cookies } = useCookies();
      const { data, status } = await bookService.getBook();
      const d = data.Data;
      if (cookies.isKey("token")) {
        commit('setBook', d);
      }
    },
    async saveBook({ commit }, newItem) {
      const requestBook: SaveBookRequest = {
        Audio: newItem.Audio,
        Author: newItem.Author,
        BookCategory: newItem.BookCategory, //
        BookName: newItem.BookName,
        Content: newItem.Content,
        Img: newItem.Img,
        IsBestSeller: newItem.IsBestSeller,
        IsFree: newItem.IsFree,
        IsHot: newItem.IsHot,
        IsNew: newItem.IsNew,
        IsSale: newItem.IsSale,
        Price: newItem.Price,
        Status: newItem.Status,
      };
      try {
        const { data, status } = await bookService.saveBook(requestBook);
        if (status === 200) {
          alert("Thêm thể loại thành công: " + data.Data.BookName)
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateBook({ commit }, updateItem) {
      const requestBook: updateBookRequest = {
        id: updateItem.ID,
        body: {
          Audio: updateItem.Audio,
          Author: updateItem.Author,
          BookCategory: updateItem.BookCategory, //
          BookName: updateItem.BookName,
          Content: updateItem.Content,
          Img: updateItem.Img,
          IsBestSeller: updateItem.IsBestSeller,
          IsFree: updateItem.IsFree,
          IsHot: updateItem.IsHot,
          IsNew: updateItem.IsNew,
          IsSale: updateItem.IsSale,
          Price: updateItem.Price,
          Status: updateItem.Status,
        }
      };
      try {
        const { data, status } = await bookService.updateBook(requestBook);
        if (status === 200) {
        }
      } catch (error) {
        console.log(error);

      }
    },
    async deleteBook({ commit }, idArr) {
      const requestBook: deleteBookRequest = {
        id: idArr,
      };
      try {
        const { data, status } = await bookService.deleteBook(requestBook);
        if (status === 200) {
          alert("Đã xóa thành công");
        }
      } catch (error) {
        console.log(error)
      }

    },
  }
}

const user = {
  namespace: true,
  state: {
    globalOnLogged: false,
    userByID: {},
    userComfirmByID:[]
  },

  mutations: {
    setGlobalBooleanTrue(state) {
      state.globalOnLogged = true;
    },
    setGlobalBooleanFalse(state) {
      state.globalOnLogged = false;
    },
    setUserByID(state, obj) {
      state.userByID = obj
    },
    // setUserComfirmByID(state, obj){

    // }
  },
  actions: {
    async getUserByID({ commit }, idArr) {
      const request: userByIDRequest = {
        id: idArr,
      };
      try {
        const { data, status } = await authService.getUserByID(request);
        if (status === 200) {
          commit("setUserByID", data.Data)
        }
      } catch (error) {
        console.log(error)
      }

    },
  },
  getters: {
    globalOnLoggedFunc: state => state.globalOnLogged,
    getUser: state => state.userByID
  },

}

const order = {
  namespace: true,
  state: {
    listConfirmed: [],
    listWaiting: [],
    generalList: [],
    order: {},
  },
  getters: {
    getListConfirmed: state => state.listConfirmed,
    getListWaiting: state => state.listWaiting,
    getGeneralList: state => state.generalList,
    getOrder: state => state.order
  },
  mutations: {
    setStatusWaiting: (state, obj) => {
      state.listWaiting.push(obj)
      state.listWaiting[0].forEach(obj => {
        let total = 0;
        obj.Cart.Items.forEach(element => {
          total += element.Book.Price
        });
        obj.Cart.TotalPrice = total
      });      
    },
    setStatusConfirmed: (state, obj) => {
      state.listConfirmed.push(obj)
      state.listConfirmed[0].forEach(obj => {
        let total = 0;
        obj.Cart.Items.forEach(element => {
          total += element.Book.Price
        });
        obj.Cart.TotalPrice = total
      });
    },
    setGeneral: (state) => {
      state.generalList = state.listWaiting.concat(state.listConfirmed);
    },
    setOrderByID: (state, obj) =>{
      state.order = obj
      let total = 0;
      state.order.Cart.Items.forEach(element => {
        total += element.Book.Price
      });
      state.order.Cart.TotalPrice = total
    }
  },
  actions: {
    async putStatus({ commit }, obj) {
      const requestOrder: putStatusRequest = {
        id: obj.id,
        body: {
          Status: obj.body.Status,
        }
      };
      console.log(obj);
      try {
        const { data, status } = await orderService.putStatus(requestOrder);
        if (status === 200) {
          if (requestOrder.body.Status==1) {
            alert("Đơn Hàng " + data.Data.Id + " Đã Hoàn Thành")
          }
          else
            alert("Đơn Hàng " + data.Data.Id + " Đã Bị Hủy")

        }
      } catch (error) {
        console.log(error)
      }
    },
    async getStatusWaiting({ commit }) {
      const requestOrder: getStatusRequest = {
        status: 0,
      };
      try {
        const { data, status } = await orderService.getStatus(requestOrder);
        if (status === 200) {
          // alert("lay thanh cong")
          commit('setStatusWaiting', data.Data);
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getStatusConfirmed({ commit }) {
      const requestOrder: getStatusRequest = {
        status: 1,
      };
      try {
        const { data, status } = await orderService.getStatus(requestOrder);
        if (status === 200) {
          commit('setStatusConfirmed', data.Data);
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getGeneral({ commit }) {
      commit('setGeneral');

    },
    async getOrderByID({ commit }, IdArr) {
      const requestOrder: getOrderByIDRequest = {
        id: IdArr,
      };
      try {
        const { data, status } = await orderService.getOrderByID(requestOrder);
        if (status === 200) {
          // alert("lay thanh cong")
          commit('setOrderByID', data.Data);
        }
      } catch (error) {
        console.log(error)
      }
    },

  },
}
const newOrder = {
  namespace: true,
  state:{
    newOrders: false,
  },
  getters:{
    getNewOrders(state){
      return state.newOrders;
    }
  },
  mutations:{
    setOrderTrue(state){
      state.newOrders = true;
    },
    setOrderFalse(state){
      state.newOrders = false;
    }
  },
  actions:{

  }

}

export default createStore({
  plugins: [createLogger()],
  state: {},
  mutations: {},
  actions: {},
  modules: { categoryList, user, book, order, newOrder }
})