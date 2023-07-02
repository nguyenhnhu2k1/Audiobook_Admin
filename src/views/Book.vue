<template>
  <div class="m-10">
    <h1 class="text-2xl font-medium text-red-800">Thông Tin Sản Phẩm</h1>
    <!-- img_detail -->
    `
    <div class="flex nana:flex-row nana:gap-20 flex-col gap-3">
      <img
        :src="book.Img"
        alt=""
        class="md:w-[30%] w-[80%] object-contain my-5 rounded-md mx-5 flex-none"
      />
      <!-- detail -->
      <div class="mx-5">
        <h1 class="text-xl text-green-800 font-medium mb-5">{{ book.BookName }}</h1>
        <div class="flex gap-10 mb-5">
          <h2
            class="cursor-pointer font-semibold"
            @click="isShowDescribe = true"
            :class="
              isShowDescribe
                ? 'underline underline-offset-[5px] decoration-2 underline-btn decoration-sky-400'
                : ''
            "
          >
            Chi Tiết Sách
          </h2>

          <h2
            class="cursor-pointer font-semibold"
            @click="isShowDescribe = false"
            :class="
              isShowDescribe === false
                ? 'underline underline-offset-[5px] decoration-2 underline-btn decoration-orange-500 '
                : ''
            "
          >
            Giới thiệu sách
          </h2>
        </div>

        <div v-if="isShowDescribe" class="leading-10">
          <span class="font-semibold">Tác giả: </span>
          <span class=""> {{ book.Author }}</span>
          <br />
          <span class="mb-3 font-semibold">Thể Loại: </span>
          <span v-for="(gen, index) in book.BookCategory" :key="index"
            >{{ gen.Name + " " }}
          </span>
          <br />
          <span class="font-semibold">Giá: </span>
          <span class="text-xl text-green-700 font-semibold">{{ formattedPrice }}</span>
        </div>
        <div v-else>
          <p class="leading-10 md:w-full text-justify">{{ book.Content }}</p>
        </div>
      </div>
    </div>
    <!-- audio -->
    <div>
      <audio :src="book.Audio" controls class="md:w-[30%] w-[80%]"></audio>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      bookID: this.$route.params.idBook,
      book: {},
      isShowDescribe: true,
    };
  },
  async mounted() {
    await this.getBookByID(this.bookID);
    this.showBook;
  },
  computed: {
    ...mapGetters(["getGenresList", "getBookByIDInState"]),
    showBook() {
      this.book = this.getBookByIDInState;
    },
    formattedPrice() {
      if (this.book.Price !== undefined) {
        return this.book.Price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      } else {
        // console.log(this.book.Price);
        return "";
      }
    },
  },
  methods: {
    ...mapActions(["getCategory", "getBookByID"]),
  },
};
</script>

<style></style>
