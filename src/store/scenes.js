import ScenesMock from "@/mock/scenes";
import hyperid from "hyperid";

const generateScene = (x, y, i) => {
  return {
    x: x,
    y: y,
    w: 2,
    h: 1,
    data: ScenesMock[i],
    component: {
      name: "scene",
      id: "scene-tile-id"
    },
    static: false,
    i: hyperid()()
  };
};

const state = {
  scenes: [generateScene(0, 0, 0), generateScene(2, 0, 1), generateScene(0, 2, 2)]
};

const getters = {
  scenes: state => state.scenes
};

const actions = {
  "update-scenes"({ commit }, layout) {
    commit("set-scene-layout", layout);
  }
};

const mutations = {
  "set-scene-layout"(state, payload) {
    state.scenes = payload;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
