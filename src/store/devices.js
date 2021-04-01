import DevicesMock from "@/mock/devices";
import hyperid from "hyperid";

const state = {
  devices: DevicesMock.map((d, i) => {
    return {
      x: i % 6,
      y: 0,
      w: 1,
      h: 1,
      data: d,
      component: {
        name: "device",
        id: "device-tile-id"
      },
      static: false,
      i: hyperid()()
    };
  })
};

const getters = {
  devices: state => state.devices
};

const actions = {
  "update-devices"({ commit }, layout) {
    commit("set-device-layout", layout);
  }
};

const mutations = {
  "set-device-layout"(state, payload) {
    state.devices = payload;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
