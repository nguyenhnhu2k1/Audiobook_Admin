<template>
  <!-- <h1>{{ order }}</h1> -->
  <div class="w-full bg-slate-100">
    <div class="my-10 md:mx-[10%] mx-10">
      <div class="border-2 border-green-700 bg-white px-5 py-2 rounded-lg">
        <div class="flex mb-6">
          <div class="basis-2/3 text-lg text-gray-700 flex md:flex-row flex-col">
            <span
              >Chi tiết đơn hàng<span class="text-red-600"> #{{ order.Id }} </span>
            </span>

            <span
              class="font-semibold"
              :class="order.status === 0 ? 'text-orange-600' : 'text-green-600'"
            >
              -
              {{
                order.status === 0
                  ? "Đơn Hàng Đang Chờ Xử Lý"
                  : order.status === 1
                  ? "Đơn Hàng Thành Công"
                  : ""
              }}
            </span>
          </div>
          <span class="basis-1/3 text-gray-500"
            >Ngày đặt hàng: {{ dayCreate.substring(0, 10) }}</span
          >
        </div>

        <div class="flex mb-6">
          <div class="basis-2/3">
            <h1 class="text-lg">THÔNG TIN NGƯỜI NHẬN</h1>
            <p class="font-bold">{{ getUser.FullName }}</p>
            <p>Điện Thoại: {{ getUser.Phone }}</p>
          </div>
          <div class="basis-1/3">
            <p>Hình Thức thanh toán</p>
            <p class="text-sm">Thanh toán chuyển khoản</p>
          </div>
        </div>
      </div>
      <div
        class="flex border rounded-md m-1 bg-white"
        v-for="(book, index) in Items"
        :key="index"
      >
        <img class="basis-1/6 w-[10%] m-3 rounded-md" :src="book.Book.Img" alt="" />
        <div class="basis-4/6">
          <p class="mt-3 text-lg font-semibold">{{ book.Book.BookName }}</p>
          <p class="text-sm ml-5">-{{ book.Book.Author }}-</p>
        </div>
        <p class="basis-1/6 my-auto text-orange-600 text-lg">
          {{
            book.Book.Price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || ""
          }}
        </p>
      </div>
      <div class="flex justify-end mr-9 text-2xl mt-5">
        <img
          class="w-6 mx-2"
          src="https://cdn-icons-png.flaticon.com/512/10454/10454660.png"
          alt=""
        />
        Thành tiền:
        <span class="mx-2 text-red-700 font-bold">{{
          Total.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }) || ""
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      orderID: this.$route.params.idOrder,
      order: {},
      dayCreate: "",
      Items: [],
      Total: 0,
    };
  },
  async mounted() {
    await this.getOrderByID(this.orderID);
    this.order = await this.getOrder;
    await this.getUserByID(this.order.UserId);
    this.dayCreate = this.order.CreatedAt;
    this.Items = this.order.Cart.Items;
    this.Total = this.order.Cart.TotalPrice;
  },
  computed: {
    ...mapGetters(["getOrder", "getUser"]),
  },
  methods: {
    ...mapActions(["getOrderByID", "getUserByID"]),
  },
};
</script>

<style></style>
