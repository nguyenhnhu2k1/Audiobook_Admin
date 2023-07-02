<template>
  <div>
    <div class="my-5 mx-[5%] sm:mx-[15%] md:mx-[22%] lg:mx-[30%]">
      <h1 class="font-bold text-5xl my-20 text-left">Cập nhật thông tin tài khoản</h1>

      <div class="">
        <table class="text-left">
          <colgroup>
            <col span="1" class="w-[200px]" />
            <!-- <col class=""> -->
          </colgroup>
          <tr>
            <th class="after:content-['*'] after:ml-0.5 after:text-red-500">
              {{ phoneLable }}
            </th>
            <td>
              <input
                class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                v-model="phone"
                type="search"
                :placeholder="placeHolderPhone"
                @keyup.enter="updateInfo()"
              />
            </td>
          </tr>
          <tr>
            <th class="after:content-['*'] after:ml-0.5 after:text-red-500">
              {{ fullNameLable }}
            </th>
            <td>
              <input
                class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                v-model="fullName"
                type="search"
                :placeholder="placeHolderFullName"
                @keyup.enter="updateInfo()"
              />
            </td>
          </tr>
          <tr>
            <th class="after:content-['*'] after:ml-0.5 after:text-red-500">
              {{ ageLable }}
            </th>
            <td>
              <input
                class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                v-model="age"
                id="sign-up-email"
                type="search"
                :placeholder="placeHolderAge"
                @keyup.enter="updateInfo()"
              />
            </td>
          </tr>
          <tr>
            <th class="after:content-['*'] after:ml-0.5 after:text-red-500">
              {{ emailLable }}
            </th>
            <td>
              <input
                class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                v-model="email"
                type="search"
                :placeholder="placeHolderEmail"
                @keyup.enter="updateInfo()"
              />
            </td>
          </tr>
          <tr>
            <th>{{ addressLable }}</th>
            <td>
              <input
                class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                v-model="address"
                type="search"
                :placeholder="placeHolderAddress"
                @keyup.enter="updateInfo()"
              />
            </td>
          </tr>
        </table>
      </div>

      <div>
        <input
          @click="updateInfo()"
          type="submit"
          value="Cập nhật thông tin"
          class="bg-gray-800 text-white py-2 px-6 rounded-full mt-4 hover:bg-gray-900 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { authService } from "../service/auth_service";
import type { editInfoRequest } from "../model/user/request";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["globalOnLoggedFunc"]),
  },

  mounted() {
    this.setupEditInfo();
  },

  data() {
    return {
      phoneLable: "Số điện thoại",
      placeHolderPhone: "Nhập số điện thoại...",
      fullNameLable: "Tên đầy đủ",
      placeHolderFullName: "Nhập tên đầy đủ...",
      ageLable: "Tuổi",
      placeHolderAge: "Nhập tuổi...",
      emailLable: "Email",
      placeHolderEmail: "Nhập email...",
      addressLable: "Địa chỉ",
      placeHolderAddress: "Nhập địa chỉ...",

      address: "",
      age: 0,
      email: "",
      fullName: "",
      password: "",
      phone: "",
      photo: "",
    };
  },

  methods: {
    validateAccount(): boolean {
      //form validation - kiểm tra rỗng
      if (this.phone == "" || this.fullName == "" || this.age == "" || this.email == "") {
        alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
        return false;
      }

      //kiểm tra số điện thoại
      if (isNaN(parseInt(this.phone))) {
        alert("Số điện thoại phải là kiểu số");
        return false;
      } else if (this.phone.length !== 10) {
        alert("Số điện thoại phải có 10 chữ số");
        return false;
      }

      //kiểm tra tuổi
      if (isNaN(parseInt(this.age))) {
        alert("Tuổi phải là kiểu số");
        return false;
      } else if (this.age.length <= 0) {
        alert("Tuổi không hợp lệ");
        return false;
      }

      //xác thuật email
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patternEmail.test(this.email)) {
        alert("Email không hợp lệ");
        return false;
      }

      return true;
    },

    async setupEditInfo() {
      try {
        if (this.$cookies.isKey("token")) {
          const { data, status } = await authService.getProfile();
          if (status == 200) {
            const d = data.Data;
            this.address = d.Address;
            this.age = d.Age;
            this.email = d.Email;
            this.fullName = d.FullName;
            this.phone = d.Phone;
            this.photo = d.Photo;
          } else {
            alert("Lấy thông tin người dùng thất bại");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateInfo() {
      console.log("updateInfo");

      if (!this.validateAccount()) {
        return;
      }

      const request: editInfoRequest = {
        address: this.address,
        age: parseInt(this.age),
        email: this.email,
        fullName: this.fullName,
        phone: this.phone,
        photo: this.photo,
      };

      try {
        const { data, status } = await authService.editInfo(request);
        console.log(data.Data);
        if (status == 200) {
          alert("Chỉnh sửa thông tin thành công");
          this.$router.push("/admin");
        } else {
          alert("Không thể chỉnh sửa thông tin người dùng");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
