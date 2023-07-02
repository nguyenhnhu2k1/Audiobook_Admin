<template>
  <div class="text-center mx-5 sm:mx-28 md:mx-60">
    <h1 class="font-bold text-5xl mt-20">Đăng nhập admin</h1>

    <div class="flex flex-col items-center my-16">
      <hr class="bg-slate-600 h-px w-32" />
    </div>

    <div class="my-2">
      <div class="text-left ml-1 text-lg">
        <label>{{ nameLable }}</label>
      </div>
      <div>
        <input
          class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
          v-model="username"
          id="sign-up-email"
          type="search"
          :placeholder="placeholderName"
        />
      </div>
    </div>

    <div class="my-2">
      <div class="text-left ml-1 text-lg">
        <label for="sign-up-email">{{ passwordLable }}</label>
      </div>
      <div>
        <input
          class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
          id="sign-up-email"
          type="search"
          v-model="password"
          :placeholder="placeholderPassword"
          @keypress.enter="login()"
        />
      </div>
    </div>
    <input
      @click="login()"
      type="submit"
      value="Đăng nhập"
      class="bg-blue-400 text-white py-2 px-6 rounded-full mt-4 hover:bg-blue-500"
    />
  </div>
</template>

<style lang="postcss" scoped></style>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { authService } from "../service/auth_service";
import type { LoginRequest } from "../model/user/request";
import { mapGetters, mapMutations } from "vuex";

export default defineComponent({
  data() {
    return {
      nameLable: "Tên người dùng",
      placeholderName: "Nhập tên người dùng...",
      passwordLable: "Mật khẩu",
      placeholderPassword: "Nhập mật khẩu...",
      username: "",
      password: "",
    };
  },

  computed: {
    ...mapGetters(["globalOnLoggedFunc"]),
    ...mapMutations(["setGlobalBooleanTrue", "setGlobalBooleanFalse"]),
  },

  methods: {
    async login() {
      if (this.username == "" || this.password == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      const request: LoginRequest = {
        username: this.username,
        password: this.password,
      };
      try {
        const { data, status } = await authService.login(request);

        if (status === 200) {
          alert("Đăng nhập thành công");
          const d = data.Data;
          alert(d.FullName);
          const token = this.$cookies.set("token", d.Token);
          this.$cookies.set("userName", d.Username);

          if (this.$cookies.isKey("token")) {
            this.setGlobalBooleanTrue;
            console.log(this.globalOnLoggedFunc);
          }

          this.$router.push("/home");
        } else {
          alert("Đăng nhập thất bại");
        }
      } catch (err) {
        alert("Sai tài khoản hoặc mật khẩu");
        this.username = "";
        this.password = "";
      }
    },
  },
});
</script>
