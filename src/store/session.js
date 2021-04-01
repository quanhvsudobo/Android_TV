export default {
  namespaced: false,
  state: {
    token: null
  },
  getters: {
    token: state => state.token
  },
  actions: {
    "load-token"({ commit }, token) {
      if (token != null) {
        commit("set-token", token);
      } else {
        alert("No token set, reload with token in query params");
      }
    }
  },
  mutations: {
    "set-token"(state, payload) {
      state.token = payload;
    }
  }
};
