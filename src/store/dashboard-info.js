import DashboardInfo from "@/constants/dashboard-info";

const { Getters, Mutations } = DashboardInfo;

const state = {
  selectedWidgetDescription: "No widget has been selected",
  defaultDescription: "No widget has been selected",
  descriptionData: {
    text: "No widget has been selected",
    icon: require("@/assets/images/icon-alert-error-selected.svg")
  }
};

const getters = {
  [Getters.WidgetDescription.CURRENT]: state => state.descriptionData,
  [Getters.WidgetDescription.DEFAULT]: state => state.defaultDescription
};

const actions = {};

const mutations = {
  [Mutations.WidgetDescription.SET](state, payload) {
    state.descriptionData = payload;
  },
  [Mutations.WidgetDescription.RESET](state) {
    state.descriptionData = {
      text: "No widget has been selected",
      icon: require("@/assets/images/icon-alert-error-selected.svg")
    };
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
