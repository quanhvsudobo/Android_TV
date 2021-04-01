import { PetTrackerStates } from "@/mock/pet-tracker-states";
import PetTracker from "@/constants/pet-tracker";

const { Actions, Mutations, Getters } = PetTracker;

const state = {
  petTrackerStates: [...PetTrackerStates],
  currentStateIndex: 0
};
const getters = {
  [Getters.States.CURRENT]: state => state.petTrackerStates[state.currentStateIndex]
};
const actions = {
  [Actions.States.NEXTSTATE]({ commit }) {
    commit(Mutations.States.NEXT);
  },
  [Actions.States.CUSTOMSTATE]({ commit }, stateInformation) {
    commit(Mutations.States.CUSTOM, stateInformation);
  }
};

const mutations = {
  [Mutations.States.NEXT](state) {
    if (state.currentStateIndex >= state.petTrackerStates.length - 1) {
      state.currentStateIndex = 0;
    } else {
      state.currentStateIndex++;
    }
  },
  [Mutations.States.CUSTOM](state, stateInformation) {
    const index = state.petTrackerStates.findIndex(
      pts => pts[stateInformation.key] === stateInformation.value
    );
    index < 0 ? (state.currentStateIndex = 0) : (state.currentStateIndex = index);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
