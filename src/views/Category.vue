<template>
  <div class="mx-12 font-sans">
    <h1 class="my-6 text-lg font-bold text-gray-700">Thể Loại</h1>
    <div class="mx-6">
      <!-- form-category -->
      <form
        action=""
        class="flex md:flex-row flex-col lg:gap-10 gap-10 md:gap-5 xl:gap-32 border border-gray-200 rounded-md px-5 py-8 mx-auto"
      >
        <div class="basis-2/5">
          <input
            type="text"
            placeholder="Tìm kiếm thể loại bằng tên"
            class="h-12 w-full pl-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200 focus:bg-white"
            v-model="shareName"
            @keypress.enter.prevent="shareGenresFunc(shareName)"
          />
        </div>
        <div class="basis-2/5">
          <select
            class="h-12 w-full px-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200"
            v-model="text"
            @change="shareGenresFuncBySelect(text)"
          >
            <option value="All">Tất cả thể loại</option>
            <option v-for="(category, index) in getGenresList" :key="index">
              {{ category.Name }}
            </option>
          </select>
        </div>
        <div class="basis-1/5">
          <btnAddComp name="Thêm Thể Loại" @click.prevent="ShowAddForm()" />
        </div>
      </form>

      <!-- table-category -->
      <div class="w-full my-6 overflow-x-auto">
        <table class="w-full border-2 ring-slate-300 ring-2">
          <thead class="border-b-2 bg-slate-300">
            <tr class="font-medium">
              <td class="px-4 py-4 md:w-48">ID</td>
              <td class="md:w-24">ICON</td>
              <td class="min-w-[150px] px-4">TÊN THỂ LOẠI</td>
              <td class="md:pl-10 px-4 min-w-[100px]">MÔ TẢ</td>
              <td class="min-w-[120px] text-center">HÀNH ĐỘNG</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(genres, index) in visibleGenres" :key="index">
              <td class="px-4 py-3 font-bold">{{ genres.ID }}</td>
              <td><img class="w-6" :src="genres.Images" /></td>
              <td class="px-4">{{ genres.Name }}</td>
              <td class="md:pl-10 p-4">{{ genres.Description }}</td>
              <td class="flex flex-row justify-center py-6">
                <button @click="showUpdate(getIDGenres(genres), genres.ID)">
                  <img
                    class="w-7"
                    src="src/assets/admin-img/edit-1-svgrepo-com.svg"
                    alt=""
                  />
                </button>
                <button @click="deleteObj(genres.ID)">
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
          {{ Math.min(firstGenres + 1, getGenresList.length) }}
          -
          {{ Math.min(firstGenres + 1 + amountGenresOnTable, getGenresList.length) }}
          OF
          {{ getGenresList.length }}
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
              <li v-for="(p, index) in pagesNumberGenres" :key="index">
                <buttonSlideComp
                  @click="btnVisibleGenres(p)"
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

    <!-- add-category-form-->
    <div
      id="add-genres-form"
      class="fixed top-0 h-screen z-40 lg:w-1/2 w-full overflow-y-scroll bg-white shadow-lg transition-all duration-500"
      :class="isShowAddForm == false ? 'right-[-2500px]' : 'right-0'"
    >
      <!-- button-X -->
      <button
        class="absolute left-auto right-0 mt-6 mr-6 border bg-slate-200 rounded-full p-1 hover:bg-slate-300"
        @click.stop="handleX()"
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

      <!-- title-add-category -->
      <div class="mt-6 ml-6 z-40">
        <h1 class="text-xl font-semibold">
          {{ this.isShowEdit ? "Cập Nhật Thể Loại" : "Thêm Thể Loại" }}
        </h1>
        <p class="pb-6">
          {{ this.isShowEdit ? "Cập nhật" : "Thêm" }} danh mục sản phẩm của bạn và những
          điều cần thiết ở đây
        </p>
      </div>

      <form>
        <!-- add-icon -->
        <div class="flex flex-row mx-6">
          <label class="text-gray-800 basis-1/3 mt-2" for="">Biểu tượng danh mục</label>
          <input
            type="text"
            placeholder="Thêm biểu tượng danh mục"
            class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
            v-model="categoryNew.Images"
          />
          <!-- <div
            class="border-2 border-gray-300 border-dashed w-full text-center lg:py-6 py-2 basis-2/3 px-5"
            role="button"
            tabindex="0"
          >
            <input accept="image/*" type="file" @change="handleImageUpload" />

            <span class="mx-auto flex justify-center">
              <img
                v-if="categoryNew.Images != ''"
                class="w-40 mx-auto my-2"
                :src="categoryNew.Images"
                alt=""
              />
              <svg
                v-else
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

        <!-- add-category-name -->
        <div class="flex flex-row m-6 my-12">
          <label class="text-gray-800 basis-1/3 mt-3" for="">Tên danh mục</label>
          <input
            type="text"
            placeholder="Thêm tên danh mục"
            class="h-12 w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
            v-model="categoryNew.Name"
            @keypress.enter.prevent="handleAdd"
          />
        </div>

        <!-- add-category-status -->
        <div class="flex flex-row m-6 my-8 pb-24">
          <label class="text-gray-800 basis-1/3 mt-3" for="">Mô tả thể loại</label>
          <textarea
            class="w-full pl-5 border border-gray-200 rounded-md bg-slate-200 focus:bg-white basis-2/3"
            name="description"
            rows="7"
            placeholder="Thêm chi tiết thể loại"
            v-model="categoryNew.Description"
            @keypress.enter.prevent="handleAdd"
          ></textarea>
        </div>

        <!-- btn-cancel-add -->
        <div class="flex flex-row mx-6 fixed bottom-10 w-full lg:w-auto">
          <btnCancelComp class="basis-1/2 mx-6" name="Hủy Bỏ" />
          <btnAddComp
            class="basis-1/2 mx-6 mr-4"
            :name="buttonLabel"
            @click.prevent="handleAdd"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import btnAddComp from "../components/btnAdd.vue";
import buttonSlideComp from "../components/buttonSlide.vue";
import btnCancelComp from "../components/btn-cancel.vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  components: {
    btnAddComp,
    buttonSlideComp,
    btnCancelComp,
  },
  data() {
    return {
      text: "All",
      isShowAddForm: false,
      isShowEdit: false,
      firstGenres: 0,
      currentPage: 1,
      amountGenresOnTable: 8,
      pagesNumberGenres: [],
      visibleGenres: [],
      categoryNew: {
        ID: 0,
        Images: "",
        Name: "",
        Description: "",
      },
      IdArray: 0,
      shareObjGenres: [],
    };
  },
  async mounted() {
    await this.getCategory();
    this.visibleGenres = this.getVisibleGenres();
    this.pagesNumberGenres = this.pageNumber();
  },
  methods: {
    ...mapActions(["deleteCategory", "getCategory", "updateCategory", "saveCategory"]),

    async deleteObj(id) {
      let result = confirm("Bạn có chắc chắn muốn xóa?");
      if (result) {
        await this.deleteCategory(id);
        await this.getCategory();
        this.visibleGenres = this.getVisibleGenres();
      } else {
        // Không xóa
      }
    },

    shareGenresFuncBySelect(text) {
      let find = 0;
      this.shareObjGenres.splice(0, this.shareObjGenres.length);
      this.getGenresList.forEach((objGenres) => {
        if (text.toLowerCase() == objGenres.Name.toLowerCase()) {
          this.shareObjGenres.push(objGenres);
          find = 1;
          return;
        }
      });
      if (find === 1) {
        this.visibleGenres = this.shareObjGenres;
      } else {
        this.visibleGenres = this.getVisibleGenres();
      }
    },
    shareGenresFunc(shareName) {
      let find = 0;
      this.shareObjGenres.splice(0, this.shareObjGenres.length);
      this.getGenresList.forEach((objGenres) => {
        if (objGenres.Name.toLowerCase().includes(shareName.toLowerCase())) {
          this.shareObjGenres.push(objGenres);
          find = 1;
        }
      });
      if (shareName != "" && find == 1) {
        this.visibleGenres = this.shareObjGenres;
      } else if (shareName == "") {
        this.visibleGenres = this.getVisibleGenres();
      } else {
        this.visibleGenres = this.getVisibleGenres();
        alert("Không tìm thấy thể loại");
      }
    },
    handleX() {
      this.isShowAddForm = false;
      this.visibleGenres = this.getVisibleGenres();
      this.categoryNew.Images = "";
      this.categoryNew.Name = "";
      this.categoryNew.Description = "";
    },
    showUpdate(id, idObj) {
      this.isShowAddForm = true;
      this.isShowEdit = true;
      this.categoryNew.ID = idObj;
      this.categoryNew.Images = this.getGenresList[id].Images;
      this.categoryNew.Name = this.getGenresList[id].Name;
      this.categoryNew.Description = this.getGenresList[id].Description;
    },
    getIDGenres(obj) {
      for (var i = 0; i < this.getGenresList.length; i++)
        if (obj.Name === this.getGenresList[i].Name) {
          this.IdArray = i;
          return i;
        }
    },
    ShowAddForm() {
      this.isShowAddForm = true;
      this.isShowEdit = false;
    },
    pageNumber() {
      let pageNum;
      if (this.getGenresList.length % this.amountGenresOnTable == 0) {
        pageNum = this.getGenresList.length / this.amountGenresOnTable;
      } else {
        pageNum = this.getGenresList.length / this.amountGenresOnTable + 1;
      }
      console.log("num genresList: " + this.getGenresList.length);
      console.log("num visibleGenres: " + this.visibleGenres.length);
      4;

      for (let i = 1; i <= pageNum; i++) {
        this.pagesNumberGenres.push(i);
      }
      return this.pagesNumberGenres;
    },
    getVisibleGenres() {
      let start = this.firstGenres;
      let end = start + this.amountGenresOnTable;
      return this.getGenresList.slice(start, end);
    },
    prevSlide() {
      this.firstGenres = Math.max(0, this.firstGenres - this.amountGenresOnTable);
      this.currentPage = Math.max(1, (this.currentPage -= 1));
      this.visibleGenres = this.getVisibleGenres();
    },
    btnVisibleGenres(p) {
      this.currentPage = p;
      this.firstGenres = (this.currentPage - 1) * this.amountGenresOnTable;
      this.visibleGenres = this.getVisibleGenres();
    },
    nextSlide() {
      const maxIndex =
        this.getGenresList.length -
        (this.getGenresList.length % this.amountGenresOnTable);
      this.firstGenres = Math.min(maxIndex, this.firstGenres + this.amountGenresOnTable);
      this.currentPage = Math.min(this.pagesNumberGenres.length, (this.currentPage += 1));
      this.visibleGenres = this.getVisibleGenres();
    },
    async handleAdd() {
      if (this.isShowEdit === false) {
        const obj = {
          Images: this.categoryNew.Images,
          Name: this.categoryNew.Name,
          Description: this.categoryNew.Description,
        };
        if (
          this.categoryNew.Name != "" &&
          this.categoryNew.Images != "" &&
          this.categoryNew.Description != ""
        ) {
          await this.saveCategory(obj);
          await this.getCategory();
          this.visibleGenres = this.getVisibleGenres();
          this.isShowAddForm = false;
        } else {
          alert("Mời nhập đủ thông tin");
        }
        this.categoryNew.Images = "";
        this.categoryNew.Name = "";
        this.categoryNew.Description = "";
      } else {
        if (
          this.categoryNew.Name != this.getGenresList[this.IdArray].Name ||
          this.categoryNew.Images != this.getGenresList[this.IdArray].Images ||
          this.categoryNew.Description != this.getGenresList[this.IdArray].Description
        ) {
          await this.updateCategory(this.categoryNew);
          this.categoryNew.Images = "";
          this.categoryNew.Name = "";
          this.categoryNew.Description = "";
          await this.getCategory();
          this.visibleGenres = this.getVisibleGenres();
          this.isShowAddForm = false;
        } else {
          console.log(this.categoryNew);
          console.log(this.getGenresList[this.IdArray]);
          alert("Không có cập nhật mới");
          this.isShowAddForm = false;
        }
      }
    },

    // handleImageUpload(event) {
    //   const file = event.target.files[0];

    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.categoryNew.Images = reader.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
  },
  computed: {
    ...mapGetters(["getGenresList"]),
    buttonLabel() {
      return this.isShowEdit ? "Cập nhật thể loại" : "Thêm Thể Loại";
    },
  },
});
</script>

<style lang="postcss" scoped></style>
