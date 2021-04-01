const state = {
  isModalOpen: false,
  modalData: null
};

const getters = {
  isModalOpen: state => state.isModalOpen,
  modalData: state => state.modalData
};

const actions = {};

const mutations = {
  "open-modal"(state, payload) {
    state.isModalOpen = true;
    state.modalData = payload;
  },

  "close-modal"(state) {
    state.modalData = null;
    state.isModalOpen = false;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
