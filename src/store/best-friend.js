import {
  BestFriendWeeklyData,
  BestFriendTotalHours,
  BestFriendWidgetData,
  BestFriendWeekTotal
} from "@/mock/best-friend";

const state = {
  weekData: [...BestFriendWeeklyData],
  totalHourData: [...BestFriendTotalHours],
  widgetData: [...BestFriendWidgetData],
  totalHourWeek: [...BestFriendWeekTotal]
};

const getters = {
  "get-week-data": state => state.weekData,
  "get-total-hours-data": state => state.totalHourData,
  "get-widget-data": state => state.widgetData,
  "get-total-week": state => state.totalHourWeek
};

const actions = {};

const mutations = {};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
