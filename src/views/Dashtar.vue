<template>
  <div class="max-w-full">
    <div class="flex-layout-main">
      <div class="ph lg:w-1/3" v-for="(frame, index) of frameViews" :key="index">
        <div class="font-b frame-views center text-white" :class="frame.bg">
          <span class="" v-html="frame.icon"></span>
          <p class="pt-3">{{ frame.name }}</p>
          <p>{{ frame.value }}</p>
        </div>
      </div>
    </div>

    <div class="flex-layout-main">
      <div class="ph lg:w-1/4" v-for="(status, index) of statusOrder" :key="index">
        <div class="frame-views center text-lg p-4">
          <div
            class="mx-auto border-2 bg-blue-200 w-12 h-12 border-blue-900 rounded-full"
            v-html="status.icon"
          ></div>
          <p>{{ status.name }}</p>
          <p class="text-bold">{{ status.value }}</p>
        </div>
      </div>
    </div>

    <div class="flex-layout-main">
      <div class="ph lg:w-1/2">
        <p class="font-b">Theo Dõi Đơn Hàng Gần Đây</p>
        <div class="sale-order">
          <ul class="flex flex-row gap-4 m-8 border-b-2">
            <li>
              <button
                @click="showSales"
                :class="isShowSales ? 'underline-btn decoration-sky-400' : ''"
              >
                Sản Phẩm
              </button>
            </li>
            <li>
              <button
                @click="showOrders"
                :class="isShowSales == false ? 'underline-btn decoration-orange-400' : ''"
              >
                Đơn Hàng
              </button>
            </li>
          </ul>
        </div>
        <canvas v-show="isShowSales" id="sales"></canvas>
        <canvas v-show="isShowSales == false" id="orders"></canvas>
      </div>

      <div class="p-5 lg:w-1/2">
        <p class="font-b">Sản Phẩm Bán Chạy</p>
        <div class="sale-order m-8">
          <canvas id="best-products" class="lg:mx-12 mx:4"></canvas>
        </div>
      </div>
    </div>

    <h1 class="text-bold mx-28 mb-8">Tất Cả Đơn Hàng</h1>

    <div class="md:mx-28 mx-10">
      <div class="w-full overflow-x-scroll">
        <table class="w-full border-2 ring-slate-300 ring-2">
          <thead class="border-b-2 bg-slate-300">
            <tr class="font-medium">
              <td class="px-2 py-4 min-w-[50px]">ID</td>
              <td class="md:w-36 min-w-[145px]">TÊN NGƯỜI DÙNG</td>
              <td class="text-center min-w-[230px]">MẶT HÀNG</td>
              <td class="min-w-[63px] text-center">GIÁ</td>
              <td class="min-w-[110px] text-center">THÀNH TIỀN</td>
              <td class="min-w-[107px]">THỜI GIAN</td>
              <td class="min-w-[152px]">TRẠNG THÁI</td>
              <td class="min-w-[77px] text-center">CHI TIẾT</td>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="hiddenMang === true ? 'hidden' : ''"
              v-for="(wait, index) in getListWaiting[0]"
              :key="index"
            >
              <td class="px-3 py-3">
                {{ wait.Id }}
              </td>
              <td class="px-1">{{ wait.user.Username }}</td>
              <td class="py-5">
                <p
                  v-for="(book, index) in wait.Cart.Items"
                  :key="index"
                  class="font-semibold"
                >
                  {{ book.Book.BookName }}
                </p>
              </td>
              <td class="">
                <p v-for="(book, index) in wait.Cart.Items" :key="index">
                  {{
                    book.Book.Price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }) || ""
                  }}
                </p>
              </td>
              <td class="text-center">
                {{
                  wait.Cart.TotalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || ""
                }}
              </td>
              <td>
                {{ wait.CreatedAt.substring(0, 10) }}
              </td>
              <td
                :class="
                  wait.status === 0
                    ? 'text-orange-700'
                    : wait.status === 1
                    ? 'text-green-700'
                    : 'text-red-700'
                "
                class="font-semibold"
              >
                {{
                  wait.status === 0
                    ? "Đang chờ xác nhận"
                    : wait.status === 1
                    ? "Đơn hàng thành công"
                    : "Đơn hàng đã hủy"
                }}
              </td>
              <td class="px-1">
                <router-link :to="`orderdetail/${wait.Id}`">
                  <svg
                    class="mx-auto"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="layout-nextpage flex lg:flex-row flex-col my-10">
        <span class="showing basis-1/3">
          SHOWING
          {{ firstOrder + 1 }}
          -
          {{ Math.min(firstOrder + amountOrderOnTable, lengthArr) }}
          OF
          {{ lengthArr }}
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
              <li v-for="(p, index) in pagesNumberOrders" :key="index">
                <buttonSlideComp
                  @click="btnVisibleOrders(p)"
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
  </div>
</template>

<style lang="postcss" scoped>
.flex-layout-main {
  @apply flex lg:flex-row flex-col mx-24;
}
.font-b {
  @apply text-xl font-semibold;
}
.frame-views {
  @apply w-11/12 border-2 ring-2 ring-[#d5d6d7] rounded-2xl h-40;
}
.ph {
  @apply p-5 h-full;
}
.center {
  @apply py-6 text-center;
}
.text-bold {
  @apply text-xl font-bold;
}
.underline-btn {
  @apply underline underline-offset-[5px] decoration-2;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from "chart.js/auto";
import buttonSlideComp from "../components/buttonSlide.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  components: {
    buttonSlideComp,
  },
  data() {
    return {
      dateList: [],
      currentPage: 1,
      isShowSales: true,
      totalOrder: 0,
      saleInDay: 0,
      firstOrder: 0,
      visibleOrders: [],
      amountOrderOnTable: 8,
      pagesNumberOrders: [],
      index: 0,

      frameViews: [
        {
          name: "Doanh Thu Trong Ngày",
          value: 0,
          bg: "bg-[#04676e]",
          icon:
            '<svg class="w-10 mx-auto" viewBox="0 0 1024 1024" fill="#f8f7f7" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#f8f7f7"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z" fill=""></path><path d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z" fill=""></path></g></svg>',
        },
        {
          name: "Tổng Số Sách Đã Bán",
          value: 0,
          bg: "bg-[#3f83f8]",
          icon:
            '<svg class="w-10 mx-auto" fill="#ffffff" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1411.824 0c31.171 0 56.47 25.299 56.47 56.471v56.47h169.412c93.404 0 169.412 76.01 169.412 169.412V1920H113V282.353c0-93.402 76.009-169.412 169.412-169.412h169.411v-56.47c0-31.172 25.3-56.471 56.471-56.471 31.172 0 56.471 25.299 56.471 56.471v56.47h790.589v-56.47c0-31.172 25.299-56.471 56.47-56.471Zm169.413 1242.354h-338.823v338.823h338.823v-338.823Zm-451.766 0H790.647v338.823h338.824v-338.823Zm-451.765 0H338.882v338.823h338.824v-338.823Zm903.531-451.766h-338.823v338.824h338.823V790.588Zm-451.766 0H790.647v338.824h338.824V790.588Zm-451.765 0H338.882v338.824h338.824V790.588ZM451.823 225.882H282.412c-31.059 0-56.47 25.299-56.47 56.471v169.412h1468.234V282.353c0-31.172-25.411-56.471-56.47-56.471h-169.412v56.471c0 31.172-25.299 56.471-56.47 56.471s-56.47-25.299-56.47-56.471v-56.471H564.765v56.471c0 31.172-25.299 56.471-56.471 56.471-31.171 0-56.471-25.299-56.471-56.471v-56.471Z" fill-rule="evenodd"></path> </g></svg>',
        },
        {
          name: "Tổng Doanh Thu",
          value: 0,
          bg: "bg-[#0e9f6e]",
          icon:
            '<svg class="w-10 mx-auto" version="1.1" id="designs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .sketchy_een{fill:#ffffff;} </style> <path class="sketchy_een" d="M28.918,15.952c-0.051-0.378-0.272-0.697-0.592-0.902c-0.212-0.136-0.475-0.137-0.697-0.042 c-0.003-0.816,0-1.632-0.021-2.447c-0.021-0.915,0.029-1.829,0.063-2.742c0.012-0.301-0.181-0.561-0.44-0.689 c-0.023-0.344-0.047-0.688-0.077-1.031c-0.019-0.205-0.036-0.41-0.065-0.613c-0.006-0.04-0.011-0.08-0.017-0.12 c-0.015-0.106-0.063-0.289-0.123-0.37c-0.087-0.114-0.161-0.241-0.296-0.306c-0.099-0.047-0.194-0.093-0.302-0.108 c-0.105-0.016-0.213-0.016-0.319-0.028c-0.023-0.337-0.041-0.674-0.056-1.011c0.038-0.087,0.059-0.181,0.059-0.279 c0-0.395-0.329-0.718-0.72-0.722c-0.805-0.006-1.61,0.006-2.415-0.028c-0.724-0.03-1.447-0.072-2.174-0.087 c-1.527-0.028-3.057-0.017-4.586-0.028c-1.5-0.01-2.998-0.04-4.501-0.044c-0.733-0.001-1.466-0.015-2.198-0.015 c-0.706,0-1.413,0.013-2.118,0.062C6.545,4.457,5.757,4.635,5.041,4.947C4.342,5.249,3.714,5.851,3.497,6.593 c-0.059,0.203-0.089,0.41-0.116,0.621C3.358,7.385,3.338,7.56,3.358,7.732c0.025,0.215,0.06,0.423,0.117,0.629 C3.24,8.48,3.075,8.72,3.072,8.997c-0.01,0.798-0.006,1.595-0.021,2.391c-0.013,0.724-0.03,1.447-0.038,2.169 c-0.013,1.462-0.021,2.922,0,4.385c0.015,1.016,0.038,2.032,0.042,3.048c0.006,1.02,0.019,2.041-0.004,3.063 c-0.003,0.127,0.042,0.241,0.104,0.345c0.151,0.39,0.309,0.782,0.514,1.146c0.084,0.148,0.19,0.285,0.292,0.422 c0.095,0.125,0.192,0.249,0.289,0.372c0.148,0.188,0.37,0.336,0.568,0.463c0.442,0.289,0.957,0.473,1.476,0.564 c0.45,0.078,0.904,0.154,1.36,0.182c0.828,0.049,1.66,0.055,2.491,0.07c0.79,0.013,1.58,0.028,2.368,0.027 c0.805,0,1.608-0.009,2.412-0.004c0.807,0.008,1.612,0.032,2.419,0.015c0.832-0.015,1.662-0.049,2.493-0.061 c0.799-0.013,1.603-0.009,2.402-0.009c0.763,0,1.527,0,2.288-0.01c0.357-0.004,0.714,0,1.073,0.004 c0.376,0.004,0.752,0.008,1.13,0.002c0.257-0.003,0.481-0.131,0.633-0.319c0.193-0.138,0.33-0.351,0.325-0.6 c-0.017-0.86-0.008-1.72-0.017-2.581c-0.013-0.988,0.002-1.974,0.019-2.961c0.237-0.036,0.449-0.105,0.646-0.27 c0.439-0.368,0.543-0.999,0.589-1.538c0.029-0.334,0.029-0.67,0.042-1.006c0.021-0.513,0.046-1.031,0.028-1.546 C28.985,16.49,28.954,16.22,28.918,15.952z M7.703,8.835C7.706,8.762,7.71,8.688,7.694,8.613C7.69,8.594,7.687,8.574,7.683,8.555 c-0.02-0.306-0.01-0.614-0.007-0.922c1.463,0.042,2.927,0.043,4.392,0.05c0.754,0.004,1.508,0.023,2.262,0.042 c0.699,0.019,1.396,0.07,2.095,0.093c0.727,0.025,1.456,0.036,2.186,0.051c0.729,0.015,1.46,0.03,2.189,0.036 c0.742,0.006,1.485,0.013,2.226,0.015c0.653,0.002,1.307,0.03,1.96,0.034c0.242,0.001,0.483,0.01,0.723,0.028 c0.04,0.353,0.066,0.707,0.077,1.063c-0.389,0.008-0.779,0.004-1.166,0c-0.727-0.01-1.455-0.032-2.182-0.036 c-1.46-0.008-2.917-0.057-4.377-0.068c-1.553-0.011-3.105,0.002-4.658-0.053c-0.999-0.034-2-0.032-2.998-0.03 c-0.534,0-1.067,0.002-1.599-0.004C8.438,8.849,8.07,8.844,7.703,8.835z M27.418,19.574L27.418,19.574 c0.001-0.001,0.003-0.003,0.005-0.005C27.422,19.571,27.42,19.573,27.418,19.574z M27.224,16.425 c0.052,0.004,0.103,0.001,0.152-0.007c0.03,0.439,0.025,0.879,0.017,1.32c-0.004,0.279-0.009,0.558-0.015,0.839 c-0.003,0.273,0.001,0.546-0.024,0.817c-0.012,0.063-0.026,0.125-0.043,0.187c-0.277,0.014-0.557,0.005-0.833-0.002 c-0.336-0.008-0.672-0.011-1.008-0.011c-0.745,0-1.493,0.002-2.232-0.082c-0.225-0.04-0.443-0.097-0.657-0.176 c-0.215-0.102-0.412-0.22-0.603-0.358c-0.072-0.063-0.141-0.128-0.207-0.197c-0.04-0.062-0.075-0.125-0.109-0.19 c-0.035-0.094-0.067-0.189-0.093-0.288c-0.016-0.223-0.009-0.441,0.015-0.663c0.04-0.238,0.089-0.474,0.171-0.702 c0.027-0.053,0.056-0.103,0.087-0.152c0.038-0.038,0.076-0.075,0.116-0.109c0.076-0.047,0.154-0.09,0.235-0.13 c0.197-0.071,0.397-0.125,0.605-0.162c0.325-0.033,0.649-0.04,0.976-0.048c0.349-0.01,0.699-0.023,1.048-0.023 C25.624,16.284,26.427,16.364,27.224,16.425z M4.895,7.3c0.023-0.124,0.051-0.245,0.091-0.364C5.014,6.88,5.045,6.827,5.078,6.775 c0.087-0.098,0.18-0.19,0.279-0.276c0.127-0.087,0.259-0.159,0.399-0.226C6.231,6.092,6.73,5.979,7.23,5.903 C7.913,5.83,8.593,5.797,9.279,5.792c0.725-0.004,1.451-0.011,2.176-0.013c0.676,0,1.352,0.004,2.03,0.008 c0.811,0.004,1.624,0.009,2.436,0.004c1.523-0.009,3.046-0.013,4.569,0.017c0.729,0.015,1.456,0.03,2.186,0.078 c0.601,0.042,1.203,0.056,1.805,0.072c0.014,0.177,0.026,0.355,0.046,0.533c-0.067,0-0.134-0.002-0.201-0.001 c-1.424,0.009-2.848,0.03-4.273,0.009c-0.754-0.009-1.508-0.025-2.26-0.049c-0.712-0.021-1.422-0.027-2.133-0.055 c-0.727-0.029-1.453-0.059-2.18-0.068c-0.727-0.011-1.455-0.01-2.182-0.019c-1.356-0.021-2.712-0.07-4.066-0.127 c-0.009,0-0.018-0.001-0.027-0.001c-0.35,0-0.631,0.296-0.678,0.631c-0.211,0.135-0.361,0.359-0.36,0.623 c0.002,0.44,0.01,0.883,0.066,1.321C6.203,8.749,6.171,8.75,6.139,8.746C5.907,8.71,5.677,8.671,5.454,8.597 C5.382,8.56,5.314,8.519,5.246,8.473C5.21,8.441,5.177,8.408,5.145,8.372C5.091,8.285,5.046,8.196,5.004,8.104 C4.954,7.972,4.915,7.84,4.886,7.702C4.877,7.567,4.882,7.435,4.895,7.3z M24.46,25.97c-0.777,0.019-1.555,0.017-2.332,0.034 c-1.662,0.032-3.323,0.089-4.987,0.101c-0.771,0.004-1.544,0.021-2.315,0.015c-0.82-0.004-1.639-0.015-2.457-0.017 c-0.773-0.002-1.546,0.008-2.319,0.011c-0.832,0.002-1.669,0.006-2.497-0.076c-0.066-0.007-0.132-0.013-0.198-0.02 c-0.451-0.064-0.905-0.144-1.331-0.302c-0.17-0.084-0.334-0.177-0.49-0.284c-0.108-0.095-0.203-0.198-0.294-0.308 c-0.08-0.106-0.158-0.215-0.231-0.328c-0.079-0.126-0.141-0.265-0.201-0.402c-0.069-0.17-0.135-0.342-0.2-0.515 c-0.039-0.103-0.087-0.194-0.148-0.275c-0.01-1.288-0.01-2.575-0.027-3.861c-0.011-0.714-0.025-1.43-0.034-2.144 c-0.011-0.733-0.002-1.468-0.004-2.201C4.395,14.349,4.393,13.3,4.42,12.25c0.02-0.816,0.045-1.631,0.067-2.447 c0.048,0.03,0.095,0.063,0.143,0.09c0.399,0.22,0.845,0.275,1.289,0.329c0.372,0.046,0.746,0.066,1.122,0.08 c0.746,0.027,1.495,0.017,2.243,0.017c0.788,0,1.574-0.009,2.362-0.013c0.775-0.006,1.546,0.03,2.32,0.055 c0.746,0.023,1.493,0.023,2.241,0.023c0.775-0.002,1.551-0.008,2.326-0.006c0.76,0.002,1.519,0.047,2.277,0.093 c1.424,0.084,2.854,0.089,4.28,0.106c0.337,0.004,0.679,0,1.02-0.014c-0.021,1.427-0.002,2.855,0.004,4.282 c-0.467-0.022-0.934-0.055-1.402-0.06c-0.359-0.004-0.718-0.015-1.075-0.021c-0.036-0.001-0.071-0.001-0.107-0.001 c-0.398,0-0.791,0.038-1.186,0.09c-0.429,0.059-0.866,0.234-1.234,0.46c-0.275,0.169-0.469,0.395-0.663,0.648 c-0.122,0.159-0.194,0.384-0.262,0.566c-0.074,0.196-0.114,0.406-0.154,0.612c-0.103,0.528-0.152,1.063-0.042,1.595 c0.027,0.133,0.08,0.262,0.129,0.389c0.122,0.317,0.287,0.579,0.515,0.832c0.18,0.201,0.422,0.357,0.642,0.511 c0.142,0.099,0.298,0.18,0.456,0.253c0.224,0.101,0.456,0.207,0.697,0.266c0.427,0.106,0.873,0.141,1.312,0.165 c0.492,0.027,0.987,0.023,1.483,0.019c0.209-0.002,0.42-0.004,0.63-0.004c0.088,0,0.175,0.001,0.263,0.002 c-0.011,1.592,0.04,3.183,0.053,4.774C25.6,25.947,25.03,25.957,24.46,25.97z M24.132,17.865c0,0.431-0.359,0.791-0.791,0.791 c-0.431,0-0.791-0.359-0.791-0.791c0-0.431,0.359-0.791,0.791-0.791C23.772,17.074,24.132,17.434,24.132,17.865z"></path> </g></svg>',
        },
      ],
      statusOrder: [
        {
          name: "Tổng Số Đơn Hàng",
          value: 0,
          icon:
            '<svg class="w-7 mt-2 mx-auto" viewBox="0 -2 1028 1028" fill="#f40b0b" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#f40b0b"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M91.448447 896c-50.086957 0-91.428571-40.546584-91.428571-91.428571V91.428571C0.019876 41.341615 40.56646 0 91.448447 0h671.006211c50.086957 0 91.428571 40.546584 91.428572 91.428571v337.093168l-3.180124-0.795031c-13.515528-3.975155-26.236025-5.565217-40.546584-5.565217h-0.795031l-0.795031-2.385093h-2.385094V91.428571c0-23.055901-20.670807-43.726708-43.726708-43.726708H91.448447c-23.055901 0-43.726708 20.670807-43.726708 43.726708v713.142858c0 23.055901 20.670807 43.726708 43.726708 43.726708h352.198758l0.795031 0.795031c8.745342 11.925466 3.975155 20.670807 0.795031 27.031056-3.180124 5.565217-4.770186 9.540373 0.795031 15.10559l4.770186 4.770186H91.448447z" fill=""></path><path d="M143.125466 174.906832c-8.745342 0-15.900621-11.130435-15.900621-24.645962 0-13.515528 7.15528-24.645963 15.900621-24.645963h270.310559c8.745342 0 15.900621 11.130435 15.900621 24.645963 0 13.515528-7.15528 24.645963-15.900621 24.645962h-270.310559z" fill=""></path><path d="M413.436025 128h-270.310559c-7.15528 0-13.515528 9.540373-13.515528 22.26087s6.360248 22.26087 13.515528 22.260869h270.310559c7.15528 0 13.515528-9.540373 13.515528-22.260869s-5.565217-22.26087-13.515528-22.26087zM139.945342 302.111801c-7.15528 0-12.720497-10.335404-12.720497-24.645962s5.565217-24.645963 12.720497-24.645963h193.987577c7.15528 0 12.720497 10.335404 12.720497 24.645963s-5.565217 24.645963-12.720497 24.645962H139.945342z" fill=""></path><path d="M333.932919 255.204969H139.945342c-5.565217 0-9.540373 9.540373-9.540373 22.26087s3.975155 22.26087 9.540373 22.260869h193.987577c5.565217 0 9.540373-9.540373 9.540373-22.260869s-4.770186-22.26087-9.540373-22.26087zM734.628571 1024c-27.826087 0-58.037267-1.590062-96.993788-4.770186-56.447205-4.770186-108.124224-31.006211-158.211181-79.503106L253.634783 718.708075c-52.47205-50.881988-54.857143-117.664596-7.950311-168.546584 19.875776-20.670807 50.881988-33.391304 84.273292-33.391305 33.391304 0 63.602484 12.720497 82.68323 34.981367 0.795031 0.795031 2.385093 2.385093 5.565217 3.975155 0.795031 0.795031 2.385093 1.590062 3.180124 2.385093V451.57764v-52.47205c0-40.546584 0-81.888199 0.795031-122.434783 0.795031-60.42236 47.701863-106.534161 109.714286-106.534161h0.795031c59.627329 0 104.944099 43.726708 108.124224 103.354037 0.795031 13.515528 0.795031 27.826087 0 42.136646v18.285714h11.925466c41.341615 0 73.142857 14.310559 96.198757 44.52174 0.795031 1.590062 5.565217 3.180124 11.925466 3.180124 2.385093 0 4.770186 0 6.360249-0.795031 7.15528-0.795031 14.310559-1.590062 20.670807-1.590062 31.801242 0 59.627329 12.720497 83.478261 38.956521 3.975155 3.975155 12.720497 7.15528 20.670807 7.15528h3.180125c5.565217-0.795031 11.925466-1.590062 17.490683-1.590062 59.627329 0 107.329193 42.136646 108.124224 96.993789 2.385093 100.968944 3.975155 200.347826-7.15528 298.931677-13.515528 119.254658-77.118012 182.857143-201.142857 198.757764-23.055901 3.975155-49.291925 5.565217-77.913044 5.565217zM325.982609 562.086957c-16.695652 0-32.596273 6.360248-44.521739 17.490683-14.310559 14.310559-22.26087 31.006211-22.26087 49.291925 0 19.080745 8.745342 38.161491 24.645963 54.062112l30.21118 30.21118c65.987578 65.192547 134.360248 131.975155 202.732919 197.962733 33.391304 31.801242 71.552795 52.47205 113.689441 60.42236 32.596273 6.360248 65.192547 9.540373 96.993789 9.540373 28.621118 0 57.242236-2.385093 85.068323-7.950311 100.968944-18.285714 147.080745-66.782609 156.621118-160.596273 8.745342-89.838509 7.950311-182.062112 6.360248-271.10559v-14.310559c-0.795031-32.596273-23.850932-54.857143-56.447205-54.857143-8.745342 0-16.695652 1.590062-25.440993 4.770187V601.043478c0 11.130435 0 32.596273-22.26087 32.596274h-0.795031c-7.15528 0-12.720497-1.590062-15.900621-5.565218-6.360248-6.360248-7.15528-18.285714-7.15528-27.826087v-4.770186c0-36.571429 0.795031-73.937888 0-111.304348-0.795031-32.596273-23.850932-55.652174-55.652174-55.652174-7.950311 0-15.900621 1.590062-23.0559 3.975155v128.795031c0 11.130435-2.385093 19.875776-7.950311 25.440994-3.975155 3.975155-9.540373 6.360248-16.695652 6.360249h-0.795031c-21.465839-0.795031-21.465839-23.055901-21.465838-31.006211v-52.47205-66.782609c0-15.10559-6.360248-31.006211-18.285715-42.931677-11.130435-11.130435-26.236025-17.490683-41.341615-17.490683-6.360248 0-13.515528 0.795031-19.875776 3.180124V442.832298c0 27.031056 0 55.652174-1.590062 83.478261-0.795031 7.15528-7.15528 12.720497-13.515528 18.285714-2.385093 2.385093-5.565217 4.770186-7.950311 7.15528l-2.385093 2.385093-1.590062-3.975155c-1.590062-2.385093-3.975155-4.770186-6.360248-6.360249-4.770186-5.565217-10.335404-11.130435-13.515528-17.490683-2.385093-4.770186-1.590062-10.335404-1.590062-15.10559v-6.360249-69.167701c0-50.881988 0-103.354037-0.795032-155.031056 0-38.161491-24.645963-63.602484-60.42236-64.397516-38.956522 0-65.192547 27.826087-65.192546 68.372671v374.459627l-10.335404 6.360249-0.795031-1.590062c-7.15528-7.950311-15.10559-15.900621-22.26087-23.850932-16.695652-17.490683-34.186335-36.571429-51.677018-54.062112-15.900621-15.10559-35.776398-23.850932-56.447205-23.850931z" fill=""></path></g></svg>',
        },
        {
          name: "Đang Chờ Xử Lý",
          value: 0,
          icon:
            '<svg class="w-7 mt-2 mx-auto" fill="#6041d2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#6041d2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,12A11,11,0,0,1,17.882,2.7l1.411-1.41A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707l1.128-1.128A8.994,8.994,0,0,0,3,12a1,1,0,0,1-2,0Zm21-1a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9,8.9,8.9,0,0,1-4.42-1.166l1.127-1.127A1,1,0,0,0,8,17H4a1,1,0,0,0-1,1v4a1,1,0,0,0,.617.924A.987.987,0,0,0,4,23a1,1,0,0,0,.707-.293L6.118,21.3A10.891,10.891,0,0,0,12,23,11.013,11.013,0,0,0,23,12,1,1,0,0,0,22,11Z"></path></g></svg>',
        },
        {
          name: "Đơn Hàng Đã Hủy",
          value: 0,
          icon:
            '<svg class="w-8 mt-2 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#11ac38"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M11.9998 14H12.9998C14.0998 14 14.9998 13.1 14.9998 12V2H5.99976C4.49976 2 3.18977 2.82999 2.50977 4.04999" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 8H8" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 11H6" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 14H4" stroke="#00944f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
        },
        {
          name: "Đơn Hàng Thành Công",
          value: 0,
          icon:
            '<svg class="w-8 mt-2 mx-auto" fill="#08a119" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#08a119"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0M854.344 1157.975 583.059 886.69l-79.85 79.85 351.135 351.133L1454.4 717.617l-79.85-79.85-520.206 520.208Z" fill-rule="evenodd"></path> </g></svg>',
        },
      ],
      lengthArr: 0,
    };
  },
  async mounted() {
    await this.getStatusConfirmed();
    await this.getStatusWaiting();
    await this.getBook();
    this.totalOrder = 0;
    this.orderTotalFuntion();
    this.saleInDayFunction();
    this.WaitingOrder();
    await this.getBestSellerBook();
    this.lengthArr = this.getListWaiting[0].length;
    this.dateListFunction();
    //Chart
    const ctx = document.getElementById("sales");
    const data = {
      labels: [
        this.bookPurchases[3].dateDash,
        this.bookPurchases[2].dateDash,
        this.bookPurchases[1].dateDash,
        this.bookPurchases[0].dateDash,
      ], //hàng
      datasets: [
        {
          label: "Sản phẩm đã bán",
          data: [
            this.bookPurchases[3].purchases,
            this.bookPurchases[2].purchases,
            this.bookPurchases[1].purchases,
            this.bookPurchases[0].purchases,
          ], //so lieu bieu do
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    const saleOrder = new Chart(ctx, {
      type: "line",
      data: data,
    });

    const ctx1 = document.getElementById("best-products");
    const data1 = {
      labels: [
        this.bookIds[0].BookName,
        this.bookIds[1].BookName,
        this.bookIds[2].BookName,
      ],
      datasets: [
        {
          label: "Số lượng bán",
          data: [
            this.bookIds[0].purchases,
            this.bookIds[1].purchases,
            this.bookIds[2].purchases,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const bestProduct = new Chart(ctx1, {
      type: "doughnut",
      data: data1,
    });

    const ctx2 = document.getElementById("orders");
    const data2 = {
      labels: [
        this.orderPurchases[3].dateDash,
        this.orderPurchases[2].dateDash,
        this.orderPurchases[1].dateDash,
        this.orderPurchases[0].dateDash,
      ], //hàng
      datasets: [
        {
          label: "Đơn hàng đã bán",
          data: [
            this.orderPurchases[3].purchases,
            this.orderPurchases[2].purchases,
            this.orderPurchases[1].purchases,
            this.orderPurchases[0].purchases,
          ], //so lieu bieu do
          fill: false,
          borderColor: "#f1820f",
          backgroundColor: "#f1820f",
          tension: 0.1,
        },
      ],
    };
    const order = new Chart(ctx2, {
      type: "line",
      data: data2,
    });

    //getListWaiting[0],
    this.visibleOrders = this.getVisibleOrders();
    this.pagesNumberOrders = this.pageNumber();
  },
  computed: {
    ...mapGetters([
      "getNewOrders",
      "getListConfirmed",
      "getListWaiting",
      "getGeneralList",
      "getUser",
      "getBookList",
      "getBookByIDInState",
    ]),
    ...mapMutations(["setOrderTrue", "setOrderFalse"]),

    bookIds() {
      return this.getBookList.map((item) => ({
        ID: item.ID,
        BookName: item.BookName,
        purchases: 0,
      }));
    },
    bookPurchases() {
      return this.dateList.map((item) => ({
        dateDash: item,
        purchases: 0,
      }));
    },
    orderPurchases() {
      return this.dateList.map((item) => ({
        dateDash: item,
        purchases: 0,
      }));
    },
  },
  methods: {
    ...mapActions([
      "getStatusWaiting",
      "getStatusConfirmed",
      "getGeneral",
      "getUserByID",
      "putStatus",
      "getBook",
      "getBookByID",
      "updateBook",
    ]),

    dateListFunction() {
      const currentTime = new Date();
      this.dateList.push(currentTime.toISOString().substring(0, 10));
      const previousDate = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
      this.dateList.push(previousDate.toISOString().substring(0, 10));
      const previous2Date = new Date(currentTime.getTime() - 2 * 24 * 60 * 60 * 1000);
      this.dateList.push(previous2Date.toISOString().substring(0, 10));
      const previous3Date = new Date(currentTime.getTime() - 3 * 24 * 60 * 60 * 1000);
      this.dateList.push(previous3Date.toISOString().substring(0, 10));
      console.log(this.bookPurchases);
      this.getListConfirmed[0].forEach((list) => {
        for (let index = 0; index < this.bookPurchases.length; index++) {
          if (list.UpdatedAt.substring(0, 10) === this.bookPurchases[index].dateDash) {
            this.bookPurchases[index].purchases += list.Cart.Items.length;
          }
        }
      });
      this.getListConfirmed[0].forEach((list) => {
        for (let index = 0; index < this.orderPurchases.length; index++) {
          if (list.UpdatedAt.substring(0, 10) === this.orderPurchases[index].dateDash) {
            this.orderPurchases[index].purchases++;
          }
        }
      });
    },
    async getBestSellerBook() {
      this.getListWaiting[0].forEach((list) => {
        for (let index = 0; index < list.Cart.Items.length; index++) {
          for (let indexBookIds = 0; indexBookIds < this.bookIds.length; indexBookIds++) {
            if (list.Cart.Items[index].Book.ID === this.bookIds[indexBookIds].ID) {
              this.bookIds[indexBookIds].purchases++;
            }
          }
        }
      });

      this.bookIds.sort((a, b) => b.purchases - a.purchases);

      for (let i = 0; i < this.bookIds.length; i++) {
        let genresList = [];
        await this.getBookByID(this.bookIds[i].ID);
        let obj = this.getBookByIDInState;
        obj.BookCategory.forEach((genes) => {
          genresList.push(genes.ID);
        });
        obj.BookCategory = genresList;
        if (i < 8) {
          obj.IsBestSeller = true;
        } else obj.IsBestSeller = false;
        await this.updateBook(obj);
      }
      console.log(this.bookIds);
    },
    WaitingOrder() {
      let amount = 0;
      let cancel = 0;
      let finish = 0;
      this.getListWaiting[0].forEach((obj) => {
        if (obj.status === 0) {
          amount += 1;
        }
        if (obj.status === 2) {
          cancel += 1;
        }
        if (obj.status === 1) {
          finish += 1;
        }
      });
      this.statusOrder[0].value = this.getListWaiting[0].length;
      this.statusOrder[1].value = amount;
      this.statusOrder[2].value = cancel;
      this.statusOrder[3].value = finish;
    },
    saleInDayFunction() {
      let totalBook = 0;
      const currentTime = new Date().toISOString().substring(0, 10);
      this.getListConfirmed[0].forEach((obj) => {
        if (obj.UpdatedAt.substring(0, 10) === currentTime) {
          this.saleInDay += obj.Cart.TotalPrice;
        }
        totalBook += obj.Cart.Items.length;
      });
      this.frameViews[0].value = this.saleInDay.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      this.frameViews[1].value = totalBook;
    },
    orderTotalFuntion() {
      this.getListConfirmed[0].forEach((obj) => {
        this.totalOrder += obj.Cart.TotalPrice;
      });
      this.frameViews[2].value = this.totalOrder.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    showSales() {
      this.isShowSales = true;
    },
    showOrders() {
      this.isShowSales = false;
    },
    getVisibleOrders() {
      let start = this.firstOrder;
      let end = start + this.amountOrderOnTable;
      return this.getListWaiting[0].slice(start, end);
    },
    btnVisibleOrders(p) {
      this.currentPage = p;
      this.firstOrder = (this.currentPage - 1) * this.amountOrderOnTable;
      this.visibleOrders = this.getVisibleOrders();
    },
    prevSlide() {
      this.firstOrder = Math.max(0, this.firstOrder - this.amountOrderOnTable);
      this.currentPage = Math.max(1, (this.currentPage -= 1));
      this.visibleOrders = this.getVisibleOrders();
    },
    nextSlide() {
      const maxIndex = this.lengthArr - (this.lengthArr % this.amountOrderOnTable);
      this.firstOrder = Math.min(maxIndex, this.firstOrder + this.amountOrderOnTable);
      this.currentPage = Math.min(this.pagesNumberOrders.length, (this.currentPage += 1));
      this.visibleOrders = this.getVisibleOrders();
    },
    pageNumber() {
      let pageNum;
      if (this.lengthArr % this.amountOrderOnTable == 0) {
        pageNum = this.lengthArr / this.amountOrderOnTable;
      } else {
        pageNum = this.lengthArr / this.amountOrderOnTable + 1;
      }
      for (let i = 1; i <= pageNum; i++) {
        this.pagesNumberOrders.push(i);
      }
      return this.pagesNumberOrders;
    },
  },
});
</script>
