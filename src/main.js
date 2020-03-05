/*
  TODO:
  * SOLID
  * styles refactor
  * 
*/

import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import VueI18n from 'vue-i18n'

import './assets/css/styles.scss'

import App from "./App";
import routes from "./router/routes";
import store from "./store";

import {localization} from './i18n'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faRocket,
  faRubleSign,
  faLink,
  faMapMarkerAlt,
  faClock,
  faInfoCircle,
  faEnvelope,
  faKey,
  faCheckCircle,
  faTimesCircle,
  faLongArrowAltLeft
} from "@fortawesome/free-solid-svg-icons";

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueI18n);

library.add(
  faRocket,
  faRubleSign,
  faLink,
  faMapMarkerAlt,
  faClock,
  faInfoCircle,
  faEnvelope,
  faKey,
  faCheckCircle,
  faTimesCircle,
  faLongArrowAltLeft
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

const i18n = new VueI18n({
  locale: 'ru', 
  messages: localization, 
})

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  mode: "history"
});

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  i18n,
  store,
  beforeCreate() {
    // init store and subscribe to updates
    // console.log(this.$t("message.hello"))
    this.$store.commit("updateStore");
    // add some kind of data reactivity
    window.addEventListener("storage", () => this.$store.commit("updateStore"));
  }
});
