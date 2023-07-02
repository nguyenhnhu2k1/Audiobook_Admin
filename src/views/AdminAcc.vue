<template>
  <div class="my-5 mx-[5%] sm:mx-[15%] md:mx-[22%] lg:mx-[30%]">
    <h1 class="font-bold text-5xl my-20 text-left">Thông tin tài khoản</h1>

    <div class="">
      <table class="text-left">
        <colgroup>
          <col span="1" class="w-[200px]" />
        </colgroup>
        <tr>
          <th>{{ userNameLable }}</th>
          <td>{{ userName }}</td>
        </tr>
        <tr>
          <th>{{ passwordLable }}</th>
          <td>{{ password }}</td>
        </tr>
        <tr>
          <th>{{ phoneLable }}</th>
          <td>{{ phone }}</td>
        </tr>
        <tr>
          <th>{{ fullNameLable }}</th>
          <td>{{ fullName }}</td>
        </tr>
        <tr>
          <th>{{ ageLable }}</th>
          <td>{{ age }}</td>
        </tr>
        <tr>
          <th>{{ emailLable }}</th>
          <td>{{ email }}</td>
        </tr>
        <tr>
          <th>{{ addressLable }}</th>
          <td>{{ address }}</td>
        </tr>
      </table>
    </div>

    <div>
      <input
        @click="editInfo()"
        type="submit"
        value="Chỉnh sửa thông tin"
        class="bg-gray-800 text-white py-2 px-6 rounded-full mt-4 hover:bg-gray-900 cursor-pointer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { authService } from "../service/auth_service";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["globalOnLoggedFunc"]),
  },

  data() {
    return {
      userNameLable: "Tên người dùng:",
      passwordLable: "Mật khẩu:",
      phoneLable: "Số điện thoại:",
      fullNameLable: "Tên đầy đủ:",
      ageLable: "Tuổi",
      emailLable: "Email:",
      addressLable: "Địa chỉ:",

      userName: "",
      password: "********",
      phone: "",
      fullName: "",
      age: 0,
      email: "",
      address: "",
    };
  },

  mounted() {
    console.log(this.globalOnLoggedFunc);
    this.setupInfo();
  },

  methods: {
    async setupInfo() {
      try {
        if (this.$cookies.isKey("token")) {
          const { data, status } = await authService.getProfile();
          if (status == 200) {
            const d = data.Data;
            this.userName = d.Username;
            this.phone = d.Phone;
            this.fullName = d.FullName;
            this.age = d.Age;
            this.email = d.Email;
            this.address = d.Address;
          } else {
            alert("Lấy thông tin người dùng thất bại");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    editInfo() {
      this.$router.push("/updateadmin");
    },
  },
};
</script>

<style scoped></style>
