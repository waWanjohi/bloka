import Vue from "vue";
import VueRouter from "vue-router";
import Popup from "../popup/Popup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Popup",
    component: Popup,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
