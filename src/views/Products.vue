<template>
  <div class="mx-12 font-sans">
    <h1 class="my-6 text-lg font-bold text-gray-700">Sản Phẩm</h1>
    <div class="mx-6">
      <!-- form-product -->
      <form
        action=""
        class="flex md:flex-row flex-col lg:gap-10 gap-10 md:gap-5 border border-gray-200 rounded-md px-5 py-8 mx-auto"
      >
        <div class="basis-1/4">
          <input
            type="text"
            placeholder="Tìm kiếm tên sản phẩm"
            v-model="shareNames"
            @keypress.enter.prevent="shareBookFunc(shareNames)"
            class="h-12 w-full pl-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200 focus:bg-white"
          />
        </div>
        <div class="basis-1/4">
          <select
            v-model="text"
            class="h-12 w-full px-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200"
            @change="shareBookFuncBySelect(text)"
          >
            <option value="All" selected>Thể loại</option>
            <option v-for="(category, index) in getGenresList" :key="index">
              {{ category.Name }}
            </option>
          </select>
        </div>
        <div class="basis-1/4">
          <select
            v-model="selectFilter"
            class="h-12 w-full px-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200"
            @change="sortFuntion(selectFilter)"
          >
            <option value="All" hidden>Giá</option>
            <option value="lowtohigh">Từ thấp đến cao</option>
            <option value="hightolow">Từ cao đến thấp</option>
          </select>
        </div>
        <div class="basis-1/4">
          <btnAddComp name="Thêm Sản Phẩm" @click.prevent="showAddProducts" />
        </div>
      </form>
      <!-- table-product -->
      <div class="my-6 w-full overflow-x-auto">
        <table class="w-full border-2 ring-slate-300 ring-2">
          <thead class="border-b-2 bg-slate-300">
            <tr class="font-medium">
              <td class="pl-3 px-1 py-3">ID</td>
              <td class="px-1 min-w-[320px]">TÊN SẢN PHẨM</td>
              <td class="px-1 min-w-[200px]">TÊN TÁC GIẢ</td>
              <td class="px-1 min-w-[90px]">THỂ LOẠI</td>
              <td class="px-1 text-center min-w-[100px]">GIÁ</td>
              <td class="px-1 min-w-[110px]">KHUYẾN MÃI</td>
              <td class="px-1 text-center min-w-[100px]">CHI TIẾT</td>
              <td class="">HÀNH ĐỘNG</td>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="(product, index) in visibleProduct" :key="index">
              <td class="font-bold py-3 pl-3 px-1">
                {{ product.ID }}
              </td>
              <td class="px-1 text-lg font-semibold">{{ product.BookName }}</td>
              <td class="px-1">{{ product.Author }}</td>

              <td
                class="px-1 text-green-700 flex flex-col justify-between my-[30px]"
                v-for="(gen, index) in product.BookCategory"
                :key="index"
              >
                <div class="">
                  {{ gen.Name }}
                </div>
              </td>

              <td class="text-green-700 font-bold px-1 text-center">
                {{ product.Price }}
              </td>
              <td class="px-1"></td>
              <!-- detail_view -->
              <td class="px-1">
                <router-link :to="`products/${product.ID}`">
                  <img
                    class="w-6 mx-auto"
                    src="https://cdn-icons-png.flaticon.com/512/10099/10099497.png"
                    alt=""
                  />
                </router-link>
              </td>
              <td class="pr-[10px]">
                <button @click="showUpdate(getIDGenres(product), product.ID)">
                  <img
                    class="w-7 lg:mx-2"
                    src="src/assets/admin-img/edit-1-svgrepo-com.svg"
                    alt=""
                  />
                </button>
                <button @click="deleteObj(product.ID)">
                  <img
                    class="w-7"
                    src="src/assets/admin-img/delete-2-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex lg:flex-row flex-col">
        <span class="showing basis-1/3">
          SHOWING
          {{ firstProduct + 1 }}
          -
          {{ Math.min(firstProduct + amountProductOnTable, getBookList.length) }}
          OF
          {{ getBookList.length }}
        </span>
        <div class="page basis-2/3">
          <nav>
            <ul class="flex flex-row gap-6 justify-end">
              <li class="">
                <button @click="prevSlide">
                  <img
                    class="w-4 py-2"
                    src="../assets/admin-img/previous-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </li>
              <li v-for="(p, index) in pagesNumberProduct" :key="index">
                <buttonSlideComp
                  @click="btnVisibleProduct(p)"
                  :name="p"
                  :style="
                    p === currentPage ? 'background-color:#0e9f6e; color:white;' : ''
                  "
                />
              </li>
              <li class="">
                <button @click="nextSlide">
                  <img
                    class="w-4 py-2"
                    src="../assets/admin-img/next-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- add-products-form -->
    <div
      id="add-products-form"
      class="fixed top-0 h-screen z-40 lg:w-1/2 w-full overflow-y-scroll bg-white shadow-lg transition-all duration-500"
      :class="isShowAddProduct == false ? 'right-[-2500px]' : 'right-0'"
    >
      <!-- button-X -->
      <button
        @click.stop="handleX()"
        class="absolute left-auto right-0 mt-6 mr-6 border bg-slate-200 rounded-full p-1 hover:bg-slate-300"
      >
        <svg
          class="w-7"
          fill="#000000"
          viewBox="-3.5 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
            ></path>
          </g>
        </svg>
      </button>

      <!-- title-add-product -->
      <div class="mt-6 ml-6 z-40">
        <h1 class="text-xl font-semibold">
          {{ isShowEdit ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm" }}
        </h1>
        <p class="pb-6">
          {{ isShowEdit ? "Cập Nhật" : "Thêm" }} sản phẩm của bạn và những điều cần thiết
          ở đây
        </p>
      </div>

      <!-- add-icon -->
      <div class="flex flex-row mx-6">
        <label class="text-gray-800 basis-1/3 mt-2" for="">Hình ảnh sản phẩm</label>
        <input
          v-model="bookNew.Img"
          type="text"
          placeholder="Thêm hình ảnh sản phẩm"
          class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
        />
        <!-- <div
          class="border-2 border-gray-300 border-dashed w-full text-center lg:py-6 py-2 basis-2/3 px-5"
          role="button"
          tabindex="0"
        >
          <input accept="image/*" type="file" autocomplete="off" tabindex="-1" />
          <span class="mx-auto flex justify-center">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-3xl text-green-500"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="16 16 12 12 8 16"></polyline>
              <line x1="12" y1="12" x2="12" y2="21"></line>
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
              <polyline points="16 16 12 12 8 16"></polyline>
            </svg>
          </span>
          <p class="text-base">
            <font>Kéo hình ảnh của bạn vào đây</font>
          </p>
          <p class="text-xs text-gray-500">
            <font>(chỉ chấp nhận những hình ảnh có đuổi *.png và *.svg)</font>
          </p>
          <aside class="mt-4"></aside>
        </div> -->
      </div>

      <!-- add-product-name -->
      <div class="flex flex-row m-6 my-8">
        <label class="text-gray-800 basis-1/3 mt-3" for="">Tên sản phẩm</label>
        <input
          v-model="bookNew.BookName"
          type="text"
          placeholder="Thêm tên sản phẩm"
          class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
        />
      </div>

      <!-- add-author-name -->
      <div class="flex flex-row m-6 my-8">
        <label class="text-gray-800 basis-1/3 mt-3" for="">Tên tác giả</label>
        <input
          v-model="bookNew.Author"
          type="text"
          placeholder="Thêm tên tác giả"
          class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
        />
      </div>

      <!-- add-audiobook -->
      <div class="flex flex-row m-6 my-8">
        <label class="text-gray-800 basis-1/3 mt-3" for="">Audio Sách</label>
        <input
          v-model="bookNew.Audio"
          type="text"
          placeholder="Thêm Audio sách"
          class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
        />
      </div>

      <!-- add-product-category -->
      <div class="flex flex-row m-6 my-8">
        <label class="text-gray-800 basis-1/3 mt-3" for="">Thể loại sản phẩm</label>
        <!-- Lưu các thể loại đã chọn vào danh sách -->
        <select
          v-model="bookNew.BookCategory"
          @change="selectedGenresFunc(getIDCategrybyName(bookNew.BookCategory))"
          class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
        >
          <option value="All" hidden>Thể loại</option>
          <option v-for="(category, index) in getGenresList" :key="index">
            {{ category.Name }}
          </option>
        </select>
      </div>
      <div>
        <div
          v-for="(genres, index) in getGenresByIDGet"
          :key="index"
          class="border-2 border-green-700 max-w-[160px] px-8 rounded-md left-[35%] relative shadow-xl m-3"
        >
          <button
            class="absolute left-[130px] text-green-700 hover:text-red-700"
            @click="deleteCategory(index)"
          >
            x
          </button>
          <p>{{ genres.Name }}</p>
        </div>
      </div>

      <!-- add-product-price -->
      <div class="flex flex-row m-6 my-8">
        <label class="text-gray-800 basis-1/3 mt-3" for="">Giá sản phẩm</label>
        <input
          v-model="bookNew.Price"
          type="number"
          placeholder="Thêm giá sản phẩm"
          class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
        />
      </div>

      <!-- add-product-description -->
      <div class="flex flex-row m-6 my-8">
        <label class="text-gray-800 basis-1/3 mt-3" for="">Mô tả sản phẩm</label>
        <textarea
          v-model="bookNew.Content"
          class="w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
          name="description"
          rows="7"
          placeholder="Thêm chi tiết sản phẩm"
          @keypress.enter.prevent="handleBook"
        ></textarea>
      </div>

      <!-- add-product-discount -->
      <div class="flex flex-row m-6 my-8 pb-24">
        <label class="text-gray-800 basis-1/3" for="">Khuyến mãi</label>
        <!-- <input
          type="number"
          placeholder="Thêm khuyến mãi (%) nếu có"
          class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
        /> -->
        <form class="basis-2/3 text-center">
          <input
            v-model="bookNew.IsSale"
            class="mr-2"
            name="IsSale"
            type="radio"
            value="true"
          />Có
          <input
            v-model="bookNew.IsSale"
            class="ml-10 mr-2"
            name="IsSale"
            type="radio"
            value="false"
          />Không
        </form>
      </div>

      <!-- btn-cancel-add -->
      <div class="flex flex-row mx-6 fixed bottom-10 w-full lg:w-auto">
        <btnCancelComp class="basis-1/2 mx-6" name="Hủy Bỏ" />
        <btnAddComp
          @click.prevent="handleBook"
          class="basis-1/2 mx-6 mr-4"
          :name="buttonLabel"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import btnAddComp from "../components/btnAdd.vue";
import btnCancelComp from "../components/btn-cancel.vue";
import buttonSlideComp from "../components/buttonSlide.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default defineComponent({
  components: {
    btnAddComp,
    btnCancelComp,
    buttonSlideComp,
  },
  data() {
    return {
      selectFilter: "All",
      text: "All",
      IdArray: 0,
      isShowAddProduct: false,
      isShowEdit: false,
      firstProduct: 0,
      currentPage: 1,
      amountProductOnTable: 8,
      pagesNumberProduct: [],
      visibleProduct: [],
      shareObjBook: [],
      selectedGenres: [],
      bookNew: {
        ID: 0,
        Audio: "",
        Author: "",
        BookCategory: [],
        BookName: "",
        Content: "",
        Img: "",
        IsSale: false,
        IsBestSeller: false,
        IsFree: false,
        IsHot: false,
        IsNew: false,
        Status: 0,
        Price: 0,
      },
    };
  },
  async mounted() {
    await this.getBook();
    await this.getCategory();
    this.setOrderFalse;
    this.visibleProduct = this.getVisibleProduct();
    this.pagesNumberProduct = this.pageNumber();
  },
  computed: {
    ...mapGetters([
      "getGenresList",
      "getBookList",
      "getGenresByIDGet",
      "getListWaiting",
      "getNewOrders",
    ]),
    ...mapMutations(["setOrderTrue", "setOrderFalse"]),
    buttonLabel() {
      return this.isShowEdit ? "Cập nhật thể loại" : "Thêm Thể Loại";
    },
  },
  methods: {
    ...mapActions([
      "getCategory",
      "deleteGenresByIndex",
      "getBook",
      "saveBook",
      "deleteBook",
      "updateBook",
      "getCategoryByID",
      "deletegenresByID",
      "getStatusWaiting",
    ]),
    sortFuntion(select) {
      switch (select) {
        case "lowtohigh":
          this.getBookList.sort((a, b) => a.Price - b.Price);
          this.visibleProduct = this.getVisibleProduct();
          break;
        case "hightolow":
          this.getBookList.sort((a, b) => b.Price - a.Price);
          this.visibleProduct = this.getVisibleProduct();
          break;
      }
    },
    //them cac genres da chon vao mang
    deleteCategory(index) {
      this.deleteGenresByIndex(index);
      this.selectedGenres.splice(index, 1);
    },
    async selectedGenresFunc(idObj) {
      let find = 0;
      this.selectedGenres.forEach((obj) => {
        if (obj.id === idObj) find = 1;
      });

      if (find === 0) {
        let obj = { id: idObj };
        this.selectedGenres.push(obj);
        await this.getCategoryByID(idObj);
      }
      console.log(this.selectedGenres);
    },

    getIDCategrybyName(name) {
      const categoryObj = this.getGenresList.find((obj) => obj.Name === name);
      return categoryObj ? categoryObj.ID : null;
    },
    shareBookFunc(shareName) {
      let find = 0;
      console.log("shareName: " + shareName);
      this.shareObjBook.splice(0, this.shareObjBook.length);
      this.getBookList.forEach((objBook) => {
        if (objBook.BookName.toLowerCase().includes(shareName.toLowerCase())) {
          this.shareObjBook.push(objBook);
          find = 1;
          console.log("find: " + find);
        }
      });
      if (shareName != "" && find == 1) {
        this.visibleProduct = this.shareObjBook;
        console.log(this.shareObjBook);
      } else if (shareName == "") {
        this.visibleProduct = this.getVisibleProduct();
      } else {
        this.visibleProduct = this.getVisibleProduct();
        alert("Không tìm thấy thể loại");
      }
    },
    shareBookFuncBySelect(text) {
      let find = 0;
      if (text.localeCompare("All") === 0) {
        find = 2;
      } else {
        this.shareObjBook.splice(0, this.shareObjBook.length);
        this.getBookList.forEach((objBook) => {
          objBook.BookCategory.forEach((objCategory) => {
            if (text.toLowerCase() === objCategory.Name.toLowerCase()) {
              find = 1;
              this.shareObjBook.push(objBook);
            }
          });
        });
      }
      if (find == 1) {
        this.visibleProduct = this.shareObjBook;
      } else if (find == 2) {
        this.visibleProduct = this.getVisibleProduct();
      } else {
        alert("Không có sách trong thể loại này");
        this.visibleProduct = this.shareObjBook;
      }
    },
    handleX() {
      this.deletegenresByID();
      this.selectedGenres.splice(0, this.selectedGenres.length);
      this.isShowAddProduct = false;
      this.visibleProduct = this.getVisibleProduct();
      this.bookNew.Audio = "";
      this.bookNew.IsSale = false;
      this.bookNew.Author = "";
      this.bookNew.BookCategory = [];
      this.bookNew.BookName = "";
      this.bookNew.Content = "";
      this.bookNew.Img = "";
      this.bookNew.Price = "";
    },
    async deleteObj(id) {
      let result = confirm("Bạn có chắc chắn muốn xóa?");
      if (result) {
        await this.deleteBook(id);
        await this.getBook();
        this.visibleProduct = this.getVisibleProduct();
      } else {
        // Không xóa
      }
    },
    async handleBook() {
      if (this.isShowEdit === false) {
        if (
          this.bookNew.Audio != "" &&
          this.bookNew.Author != "" &&
          this.bookNew.BookCategory.length != 0 &&
          this.bookNew.BookName != "" &&
          this.bookNew.Content != "" &&
          this.bookNew.Img != "" &&
          this.bookNew.Price != ""
        ) {
          const obj = {
            Audio: this.bookNew.Audio,
            Author: this.bookNew.Author,
            BookCategory: this.selectedGenres,
            BookName: this.bookNew.BookName,
            Content: this.bookNew.Content,
            Img: this.bookNew.Img,
            IsSale: this.bookNew.IsSale,
            Price: this.bookNew.Price,
            IsBestSeller: false,
            IsFree: false,
            IsHot: false,
            IsNew: false,
            Status: 0,
          };
          await this.saveBook(obj);
          await this.getBook();
          this.visibleProduct = this.getVisibleProduct();
          this.isShowAddProduct = false;
          this.deletegenresByID();
          this.selectedGenres.splice(0, this.selectedGenres.length);
        } else {
          alert("Mời nhập đủ thông tin");
        }
        this.bookNew.Audio = "";
        this.bookNew.IsSale = false;
        this.bookNew.Author = "";
        this.bookNew.BookCategory = [];
        this.bookNew.BookName = "";
        this.bookNew.Content = "";
        this.bookNew.Img = "";
        this.bookNew.Price = "";
      } else {
        this.bookNew.BookCategory = [];
        let categorySelected = [];
        let bookCategoryList = [];
        // danhsachdachon
        this.selectedGenres.forEach((obj) => {
          categorySelected.push(obj.id);
          this.bookNew.BookCategory.push(obj.id);
        });
        // danhsachtheloaicuasach
        this.getBookList[this.IdArray].BookCategory.forEach((obj) => {
          bookCategoryList.push(obj.ID);
        });
        if (
          this.bookNew.Audio != this.getBookList[this.IdArray].Audio ||
          this.bookNew.Author != this.getBookList[this.IdArray].Author ||
          JSON.stringify(categorySelected) != JSON.stringify(bookCategoryList) ||
          this.bookNew.BookName != this.getBookList[this.IdArray].BookName ||
          this.bookNew.Content != this.getBookList[this.IdArray].Content ||
          this.bookNew.Img != this.getBookList[this.IdArray].Img ||
          this.bookNew.IsSale != this.getBookList[this.IdArray].IsSale ||
          this.bookNew.Price != this.getBookList[this.IdArray].Price
        ) {
          await this.updateBook(this.bookNew);
          alert("Cập nhật thể loại thành công: " + this.bookNew.BookName);
          this.isShowAddProduct = false;
          this.deletegenresByID();
          this.selectedGenres.splice(0, this.selectedGenres.length);
          this.bookNew.Audio = "";
          this.bookNew.IsSale = false;
          this.bookNew.Author = "";
          this.bookNew.BookCategory = [];
          this.bookNew.BookName = "";
          this.bookNew.Content = "";
          this.bookNew.Img = "";
          this.bookNew.Price = "";
          await this.getBook();
          this.visibleProduct = this.getVisibleProduct();
        } else alert("Không có cập nhật mới");
      }
    },
    async showUpdate(id, idObj) {
      if (this.getGenresByIDGet.length === 0) {
        await this.getBookList[this.IdArray].BookCategory.forEach((category) => {
          let obj = { id: category.ID };
          this.selectedGenres.push(obj);
          this.getCategoryByID(category.ID);
        });
      }
      this.isShowAddProduct = true;
      this.isShowEdit = true;
      this.bookNew.ID = idObj;
      this.bookNew.Audio = this.getBookList[id].Audio;
      this.bookNew.Author = this.getBookList[id].Author;
      this.bookNew.BookCategory = this.selectedGenres; //
      this.bookNew.BookName = this.getBookList[id].BookName;
      this.bookNew.Content = this.getBookList[id].Content;
      this.bookNew.Img = this.getBookList[id].Img;
      this.bookNew.IsBestSeller = this.getBookList[id].IsBestSeller;
      this.bookNew.IsFree = this.getBookList[id].IsFree;
      this.bookNew.IsHot = this.getBookList[id].IsHot;
      this.bookNew.IsNew = this.getBookList[id].IsNew;
      this.bookNew.IsSale = this.getBookList[id].IsSale;
      this.bookNew.Price = this.getBookList[id].Price;
      this.bookNew.Status = this.getBookList[id].Status;
    },
    getIDGenres(obj) {
      for (var i = 0; i < this.getBookList.length; i++)
        if (obj.BookName === this.getBookList[i].BookName) {
          this.IdArray = i;
          return i;
        }
    },
    showAddProducts() {
      this.isShowAddProduct = true;
      this.isShowEdit = false;
    },
    pageNumber() {
      let pageNum;
      if (this.getBookList.length % this.amountProductOnTable == 0) {
        pageNum = this.getBookList.length / this.amountProductOnTable;
      } else {
        pageNum = this.getBookList.length / this.amountProductOnTable + 1;
      }
      for (let i = 1; i <= pageNum; i++) {
        this.pagesNumberProduct.push(i);
      }
      return this.pagesNumberProduct;
    },
    getVisibleProduct() {
      let start = this.firstProduct;
      let end = start + this.amountProductOnTable;
      return this.getBookList.slice(start, end);
    },
    prevSlide() {
      this.firstProduct = Math.max(0, this.firstProduct - this.amountProductOnTable);
      this.currentPage = Math.max(1, (this.currentPage -= 1));
      this.visibleProduct = this.getVisibleProduct();
    },
    btnVisibleProduct(p) {
      this.currentPage = p;
      this.firstProduct = (this.currentPage - 1) * this.amountProductOnTable;
      this.visibleProduct = this.getVisibleProduct();
    },
    nextSlide() {
      const maxIndex =
        this.getBookList.length - (this.getBookList.length % this.amountProductOnTable);
      this.firstProduct = Math.min(
        maxIndex,
        this.firstProduct + this.amountProductOnTable
      );
      this.currentPage = Math.min(
        this.pagesNumberProduct.length,
        (this.currentPage += 1)
      );
      this.visibleProduct = this.getVisibleProduct();
    },
  },
});
</script>

<style></style>
