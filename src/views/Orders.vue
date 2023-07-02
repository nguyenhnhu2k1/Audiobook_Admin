<template>
  <div class="font-sans">
    <h1 class="mx-12 my-6 text-lg font-bold text-gray-700">Đơn hàng</h1>
    <div class="mx-6">
      <!-- form-orders -->
      <form
        action=""
        class="mx-[72px] flex md:flex-row flex-col lg:gap-10 gap-10 md:gap-5 xl:gap-32 border border-gray-200 rounded-md px-5 py-8"
      >
        <div class="basis-1/3">
          <input
            v-model="userNameText"
            @keypress.enter.prevent="shareByUserName(userNameText)"
            type="text"
            placeholder="Tìm kiếm bằng Tên Người Dùng"
            class="h-12 w-full pl-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200 focus:bg-white"
          />
        </div>
        <div class="basis-1/3">
          <select
            v-model="text"
            class="h-12 w-full px-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200"
            @change="shareByStatus(text)"
          >
            <option value="All">Trạng thái</option>
            <option value="hoanthanh">Hoàn thành</option>
            <option value="chuahoanthanh">Chưa hoàn thành</option>
          </select>
        </div>
        <div class="basis-1/3">
          <select
            v-model="textOrder"
            @change="ShareByTime(textOrder)"
            class="h-12 w-full px-5 focus:outline-none border border-gray-200 rounded-md bg-slate-200"
          >
            <option value="" hidden>Đơn hàng gần đây</option>
            <option value="All">Tất cả đơn hàng</option>
            <option value="day">Đơn hàng trong ngày</option>
          </select>
        </div>
      </form>

      <!-- table-category -->
      <div class="w-full my-6 overflow-x-auto">
        <table class="w-full border-2 ring-slate-300 ring-2">
          <thead class="border-b-2 bg-slate-300">
            <tr class="font-medium">
              <td class="px-2 py-4 min-w-[42px]">ID</td>
              <td class="min-w-[110px]">NGƯỜI DÙNG</td>
              <td class="text-center min-w-[250px]">MẶT HÀNG</td>
              <td class="min-w-[63px] text-center">GIÁ</td>
              <td class="min-w-[110px] text-center">THÀNH TIỀN</td>
              <td class="min-w-[107px]">ĐẶT HÀNG</td>
              <td class="min-w-[107px]">HOÀN THÀNH</td>
              <td class="min-w-[152px]">TRẠNG THÁI</td>
              <td class="min-w-[110px]">HÀNH ĐỘNG</td>
              <td class="min-w-[77px] text-center">CHI TIẾT</td>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="hiddenMang === true ? 'hidden' : ''"
              v-for="(wait, index) in mang"
              :key="index"
            >
              <td class="px-3 py-3">
                {{ wait.Id }}
              </td>
              <td class="px-1">{{ wait.user.Username }}</td>
              <td class="py-5">
                <p
                  class="font-semibold"
                  v-for="(book, index) in wait.Cart.Items"
                  :key="index"
                >
                  {{ book.Book.BookName }}
                </p>
              </td>
              <td class="text-right">
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
              <td>
                {{ wait.UpdatedAt.substring(0, 10) }}
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
              <td class="justify-center">
                <button
                  :class="
                    wait.status === 1
                      ? 'disabled:true pointer-events-none opacity-50'
                      : 'disabled:false'
                  "
                  @click="putStatusFuntion(wait.Id, 2)"
                  class="w-7 mx-3"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png"
                    alt=""
                  />
                </button>
                <button
                  :class="
                    wait.status === 1
                      ? 'disabled:true pointer-events-none opacity-50'
                      : 'disabled:false'
                  "
                  @click="putStatusFuntion(wait.Id, 1)"
                  class="w-7"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8888/8888205.png"
                    alt=""
                  />
                </button>
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
            <tr
              :class="hiddenComfirm === true ? 'hidden' : ''"
              v-for="(conf, index) in getListConfirmed[0]"
              :key="index"
            >
              <td class="px-3 py-3">{{ conf.Id }}</td>
              <td class="px-1">{{ conf.user.Username }}</td>
              <td class="py-5">
                <p
                  v-for="(book, index) in conf.Cart.Items"
                  :key="index"
                  class="font-semibold"
                >
                  {{ book.Book.BookName }}
                </p>
              </td>
              <td class="">
                <p v-for="(book, index) in conf.Cart.Items" :key="index">
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
                  conf.Cart.TotalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || ""
                }}
              </td>
              <td>
                {{ conf.CreatedAt.substring(0, 10) }}
              </td>
              <td>
                {{ conf.UpdatedAt.substring(0, 10) }}
              </td>
              <td
                :class="
                  conf.status === 0
                    ? 'text-orange-700'
                    : conf.status === 1
                    ? 'text-green-700'
                    : 'text-red-700'
                "
                class="font-semibold"
              >
                {{
                  conf.status === 0
                    ? "Đang chờ xác nhận"
                    : conf.status === 1
                    ? "Đơn hàng thành công"
                    : "Đơn hàng đã hủy"
                }}
              </td>
              <td class="justify-center">
                <button
                  :class="
                    conf.status === 1
                      ? 'disabled:true pointer-events-none opacity-50'
                      : 'disabled:false'
                  "
                  class="w-7 mx-3"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png"
                    alt=""
                  />
                </button>
                <button
                  :class="
                    conf.status === 1
                      ? 'disabled:true pointer-events-none opacity-50'
                      : 'disabled:false'
                  "
                  class="w-7"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8888/8888205.png"
                    alt=""
                  />
                </button>
              </td>
              <td class="px-1">
                <router-link :to="`orderdetail/${conf.Id}`">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import buttonSlideComp from "../components/buttonSlide.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  components: {
    buttonSlideComp,
  },
  data() {
    return {
      shareObjUsername: [],
      statusCheckList: [],
      mangRong: [],
      userName: "",
      userComfirm: [],
      i: 0,
      hiddenMang: false,
      hiddenComfirm: false,
      text: "All",
      textOrder: "All",
    };
  },

  computed: {
    ...mapGetters(["getListConfirmed", "getListWaiting", "getGeneralList", "getUser"]),
    mang() {
      return this.mangRong;
    },
  },

  async mounted() {
    await this.getStatusWaiting();
    await this.getStatusConfirmed();
    await this.getGeneral();

    this.mangRong = this.getListWaiting[0];
    this.mangRong = this.mangRong.filter((item, index) => {
      return item.status === 0;
    });
  },

  methods: {
    ...mapActions([
      "getStatusWaiting",
      "getStatusConfirmed",
      "getGeneral",
      "getUserByID",
      "putStatus",
    ]),
    ShareByTime(text) {
      let find = 0;
      if (text === "All") {
        find = 2;
      } else {
        const currentTime = new Date().toISOString().substring(0, 10);
        this.shareObjUsername.splice(0, this.shareObjUsername.length);
        this.getListWaiting[0].forEach((obj) => {
          if (obj.CreatedAt.substring(0, 10) === currentTime) {
            this.shareObjUsername.push(obj);
            find = 1;
          }
        });
      }
      if (find == 1) {
        this.mangRong = this.shareObjUsername;
        this.hiddenComfirm = true;
      } else if (find == 2) {
        this.mangRong = this.getListWaiting[0];
        this.mangRong = this.mangRong.filter((item, index) => {
          return item.status === 0;
        });
        this.hiddenComfirm = false;
      } else {
        alert("Hôm nay chưa có đơn hàng");
        this.mangRong = this.shareObjUsername;
      }
    },
    shareByUserName(text) {
      let find = 0;
      this.shareObjUsername.splice(0, this.shareObjUsername.length);
      this.getListWaiting[0].forEach((obj) => {
        if (obj.user.Username.toLowerCase().includes(text.toLowerCase())) {
          this.shareObjUsername.push(obj);
          find = 1;
        }
      });
      if (text != "" && find == 1) {
        this.mangRong = this.shareObjUsername;
        this.hiddenComfirm = true;
      } else if (text == "") {
        this.mangRong = this.getListWaiting[0];
        this.mangRong = this.mangRong.filter((item, index) => {
          return item.status === 0;
        });
        this.hiddenComfirm = false;
      } else {
        this.mangRong = this.getListWaiting[0];
        this.mangRong = this.mangRong.filter((item, index) => {
          return item.status === 0;
        });
        this.hiddenComfirm = false;
        alert("Không tìm thấy tên người dùng");
      }
    },
    shareByStatus(text) {
      if (text === "hoanthanh") {
        this.hiddenMang = true;
        this.hiddenComfirm = false;
      } else if (text === "chuahoanthanh") {
        this.hiddenMang = false;
        this.hiddenComfirm = true;
      } else {
        this.hiddenMang = false;
        this.hiddenComfirm = false;
      }
    },

    async putStatusFuntion(idArr, statusArr) {
      const obj = {
        id: idArr,
        body: {
          Status: statusArr,
        },
      };
      this.i++;
      await this.putStatus(obj);
      await this.getStatusConfirmed();
      await this.getStatusWaiting();
      this.getListWaiting[this.i].forEach((obj) => {
        let total = 0;
        obj.Cart.Items.forEach((element) => {
          total += element.Book.Price;
        });
        obj.Cart.TotalPrice = total;
      });
      this.getListConfirmed[this.i].forEach((obj) => {
        let total = 0;
        obj.Cart.Items.forEach((element) => {
          total += element.Book.Price;
        });
        obj.Cart.TotalPrice = total;
      });
      console.log(this.getListWaiting);
      console.log(this.getListConfirmed);
      console.log(this.i);
      this.mangRong = this.getListWaiting[this.i];
      this.mangRong = this.mangRong.filter((item, index) => {
        return item.status === 0;
      });
      this.mang = this.mangRong;
      this.getListConfirmed[0] = this.getListConfirmed[this.i];
    },
  },
});
</script>

<style></style>
