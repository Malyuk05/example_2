import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import { asyncLocalStorage } from "../helpers";
import { isPossibleToAddAdvt } from "../helpers";
import _ from "lodash";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    ads: [],
    isNotificationShown: false,
    notificationContent: null
  },
  mutations: {
    updateStore(state) {
      if (localStorage.getItem("ads")) {
        state.ads = [...JSON.parse(localStorage.getItem("ads"))];
      }
    },
    loginUser(state, payload) {
      state.user = payload;
      localStorage.setItem("email", payload);
    },
    addAdvt(state, payload) {
      if (isPossibleToAddAdvt(state.ads, state.user)) {
        state.ads.push(...payload);
        // this.commit("updateStore");
        console.log("state.ads", state.ads);

        asyncLocalStorage
          .setItem(`ads`, JSON.stringify(state.ads))
          .then(() => asyncLocalStorage.getItem("ads"))
          .then(res => {
            console.log("Adv added: ", res);
          });
      } else {
        throw new Error("You can create only 5 Ad per day");
      }
    },
    changePublishState(state, { id, isPublished }) {
      let findIndex = _.findIndex(state.ads, i => i.id === id);

      state.ads[findIndex].isPublished = isPublished;
      asyncLocalStorage.setItem(`ads`, JSON.stringify(state.ads));
    },
    showPublishNotification(state, { published, ad }) {
      state.isNotificationShown = true;
      state.notificationContent = ad;
      setTimeout(() => this.commit("hidePublishNotification"), 5000);
    },
    hidePublishNotification(state) {
      state.isNotificationShown = false;
      state.notificationContent = null;
    }
  },
  actions: {
    [actions.USER_LOG_IN]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("loginUser", payload);
        resolve("log in");
      });
    },
    [actions.SET_ADVT]({ commit }, payload) {
      commit("addAdvt", payload);
    },
    [actions.CHANGE_PUBLISH_STATE]({ commit }, payload) {
      commit("changePublishState", payload);
    },
    [actions.SHOW_NOTIFICATION]({ commit }, payload) {
      commit("showPublishNotification", payload);
    },
    [actions.HIDE_NOTIFICATION]({ commit }) {
      commit("hidePublishNotification");
    }
  },
  getters: {
    getAdvts: state => {
      return state.ads
        ? state.ads.filter(item => item.email === state.user)
        : [];
    },
    getAllAdvts: state => {
      return state.ads;
    }
  }
});
