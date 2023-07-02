<template>
  <div class="header-layout bg-white w-full sticky top-0 z-30">
    <header class="max-w-full h-24">
      <nav class="flex flex-row mx-8 py-3">
        <div class="logo basis-2/3 fixed">
          <a href=""
            ><img class="w-60" src="../assets/admin-img/logo-header.jpg" alt=""
          /></a>
        </div>

        <div
          class="fixed transition-all duration-700 nana:right-3/4 nana:drop-shadow-none"
          :class="[hiddenMenus ? 'right-0' : 'right-[-2500px]']"
        >
          <div
            class="bg-white menus nana:border-none border-l-2 border-b-2 absolute top-20 right-0 nana:left-8 nana:top-3 flex flex-col nana:flex-row pr-10"
          >
            <a
              class="drop-shadow-lg flex lg:px-5 p-5 lg:items-center lg:min-w-[150px] hover:bg-slate-200 uppercase font-medium transition-colors duration-200"
              v-for="(menu, index) in meunus"
              :key="index"
              :href="menu.url"
            >
              {{ menu.name }}
            </a>
          </div>
        </div>

        <div class="notification basis-1/3 flex flex-row justify-end pt-5 fixed right-5">
          <div class="icon-header lg:flex gap-2">
            <button class="button-icon" @click="show = !show">
              <svg
                class="w-7"
                viewBox="0 0 24 24"
                fill="none"
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
                    d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z"
                    fill="#292D32"
                  ></path>
                  <path
                    d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z"
                    fill="#292D32"
                  ></path>
                </g>
              </svg>
              <!-- <img
                v-else
                class="w-7"
                src="https://cdn-icons-png.flaticon.com/512/8763/8763279.png"
                alt=""
              /> -->
            </button>

            <button class="button-icon mx-3" @click="infoUser">
              <svg
                class="w-7 icon flat-color"
                fill="#000000"
                viewBox="0 0 24 24"
                id="user"
                data-name="Flat Color"
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
                    id="primary"
                    d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z"
                    style="fill: #000000"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div
            class="fixed mr-14 top-[90px] border py-3 rounded-md shadow-md bg-white transition-all duration-700"
            v-if="show"
          >
            <div class="flex flex-row">
              <img
                class="w-6 ml-4 mr-2"
                src="https://cdn-icons-png.flaticon.com/512/1827/1827314.png"
                alt=""
              />
              <button @click="setOrderFalse">
                <router-link class="mr-4 cursor-pointer" to="/orders"
                  >Bạn có đơn hàng mới</router-link
                >
              </button>
            </div>
            <!-- <span v-else class="mx-4">Không có đơn hàng mới</span> -->
          </div>

          <!--show information user box-->
          <div
            v-if="showInfoUser"
            class="fixed top-[90px] border p-3 rounded-md shadow-md bg-white transition-all duration-700"
          >
            <p
              class="hover:text-green-700 font-medium text-gray-500 hover:bg-slate-200 h-9 px-4"
            >
              {{ username }}
            </p>
            <p
              class="hover:text-green-700 font-medium text-gray-500 hover:bg-slate-200 px-4 h-10"
            >
              <router-link to="/admin">Thông tin tài khoản admin</router-link>
            </p>
            <p
              class="hover:text-green-700 font-medium text-gray-500 hover:bg-slate-200 h-9 px-4"
              @click="logoutUser"
            >
              Log out
            </p>
          </div>

          <button
            @click="hiddenMenus = !hiddenMenus"
            class="group nana:hidden button-icon"
          >
            <span v-if="hiddenMenus == false" v-html="svgIconMenu"></span>
            <span v-else v-html="svgIconDelete"></span>
          </button>
        </div>
      </nav>
    </header>
  </div>
</template>

<style lang="postcss" scoped>
.button-icon {
  @apply border-2 rounded-full p-2 hover:bg-slate-200 transition-colors duration-200;
}
</style>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      previousLength: 0,
      show: false,
      showNotification: true,
      showInfoUser: false,
      hiddenMenus: false,
      username: "",
      svgIconDelete:
        '<svg class="w-7" fill="#000000" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"></path></g></svg>',
      svgIconMenu:
        '<svg class="w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11066)"> <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11066"> <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)"></rect> </clipPath> </defs> </g></svg>',
      meunus: [
        { name: "Thống Kê", url: "/home" },
        { name: "Sản Phẩm", url: "/products" },
        { name: "Thể Loại", url: "/category" },
        { name: "Đơn Hàng", url: "/orders" },
      ],
    };
  },
  computed: {
    ...mapGetters(["globalOnLoggedFunc", "getListWaiting", "getNewOrders"]),
    ...mapMutations(["setGlobalBooleanTrue", "setGlobalBooleanFalse", "setOrderFalse"]),
  },
  async mounted() {},
  methods: {
    ...mapActions(["getStatusWaiting", "getStatusConfirmed"]),
    logoutUser() {
      this.$cookies.remove("token");
      this.$cookies.remove("userName");
      this.$router.push("/");
    },
    infoUser() {
      this.showInfoUser = !this.showInfoUser;
      if (this.$cookies.isKey("token") && this.username == "") {
        this.username = this.$cookies.get("userName");
      }
    },
  },
});
</script>
