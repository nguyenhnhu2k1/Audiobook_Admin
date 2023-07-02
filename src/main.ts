import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import store from "./store/store";
import VueCookies from 'vue3-cookies'


const app = createApp(App);

app.use(router);

app.mount("#app");

app.use(store);
app.use(VueCookies);





