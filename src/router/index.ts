import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import DashboardView from "../views/Dashtar.vue";
import CategoryView from "../views/Category.vue";
import ProductsView from "../views/Products.vue";
import OrdersView from "../views/Orders.vue";
import loginVue from "../views/Login.vue";
import BookVue from "../views/Book.vue";
import AdminAccVue from "../views/AdminAcc.vue";
import updateAdmin from "../views/updateAdmin.vue";
import OrderDetail from "../views/OrderDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/category",
      name: "category",
      component: CategoryView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsView,
    },

    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
    },

    {
      path: "/loginvue",
      name: "loginvue",
      component: loginVue,
    },
    {
      path: "/products/:idBook",
      name: "bookVue",
      component: BookVue,
    },
    {
      path: "/admin",
      name: "adminVue",
      component: AdminAccVue,
    },
    {
      path: "/updateadmin",
      name: "updateAdmin",
      component: updateAdmin,
    },
    {
      path: "/orderdetail/:idOrder",
      name: "orderDetail",
      component: OrderDetail,
    },
  ],
});

export default router;
