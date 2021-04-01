import HomeConfigurator from "@/constants/home-configurator";
import HomeConfiguratorAPI from "@/utils/home-configurator";
import Vue from "vue";

const { Actions, Mutations } = HomeConfigurator;

const convertBlobToBase64 = blob =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

const state = {
  households: {},
  householdPersons: {},
  avatars: {}
};

const getters = {
  households: state => state.households,
  householdPersons: state => state.householdPersons,
  avatars: state => state.avatars,

  householdForId: state => id => state.households && state.households[id],
  personsForHouseholdId: state => householdId =>
    state.householdPersons && state.householdPersons[householdId],
  avatarForPersonId: state => personId => state.avatars && state.avatars[personId]
};

const actions = {
  [Actions.Households.LOAD_ALL]({ commit }) {
    HomeConfiguratorAPI.Households.LoadAll().then(({ data }) =>
      commit(Mutations.Households.SET, data)
    );
  },

  [Actions.Households.LOAD]({ commit }, id) {
    HomeConfiguratorAPI.Households.Load(id).then(({ data }) =>
      commit(Mutations.Households.UPSERT, { id, data })
    );
  },

  [Actions.Persons.LOAD_ALL]({ commit }, householdId) {
    HomeConfiguratorAPI.Persons.LoadAll(householdId).then(({ data }) =>
      commit(Mutations.Persons.SET, { householdId, data })
    );
  },

  async [Actions.Avatars.LOAD]({ commit }, { householdId, personId }) {
    let response = await HomeConfiguratorAPI.Avatars.Load(householdId, personId);

    if (response) {
      let contentType = response.headers["content-type"];
      let blob = new Blob([response.data], { type: contentType });
      let base64Data = await convertBlobToBase64(blob);

      commit(Mutations.Avatars.UPSERT, {
        householdId,
        personId,
        data: base64Data,
        contentType
      });
    }
  },

  [Actions.MQTT.HOUSEHOLD_UPDATED]({ dispatch }, { payload: { householdId } }) {
    dispatch(Actions.Households.LOAD, householdId);
  },

  [Actions.MQTT.PERSON_CREATED]({ dispatch }, { payload: { householdId } }) {
    if (householdId === process.env.VUE_APP_DEMO_HOUSEHOLD_ID) {
      dispatch(Actions.Persons.LOAD_ALL, householdId);
    }
  },

  [Actions.MQTT.PERSON_UPDATED]({ dispatch }, { payload }) {
    if (payload.householdId === process.env.VUE_APP_DEMO_HOUSEHOLD_ID) {
      dispatch(Actions.Persons.LOAD_ALL, payload.householdId);
      dispatch(Actions.Avatars.LOAD, {
        householdId: payload.householdId,
        personId: payload.personId
      });
    }
  },

  [Actions.MQTT.PERSON_DELETED]({ getters, dispatch }, { payload: { householdId, personId } }) {
    if (householdId != null) {
      if (householdId === process.env.VUE_APP_DEMO_HOUSEHOLD_ID) {
        dispatch(Actions.Persons.LOAD_ALL, householdId);
      }
    } else {
      // person can be of more than 1 household
      let householdIds = [];
      Object.keys(getters.householdPersons).forEach(_householdId => {
        let index = getters.householdPersons[_householdId].findIndex(
          person => person.personId === personId
        );
        if (index != null && index > -1) {
          householdIds.push(_householdId);
        }
      });

      householdIds.forEach(id => dispatch(Actions.Persons.LOAD_ALL, id));
    }
  },

  [Actions.MQTT.PERSON_ADDED]({ dispatch }, { payload: { householdId } }) {
    if (householdId === process.env.VUE_APP_DEMO_HOUSEHOLD_ID) {
      dispatch(Actions.Persons.LOAD_ALL, householdId);
    }
  }
};

const mutations = {
  [Mutations.Households.SET](state, payload) {
    state.households = payload;
  },

  [Mutations.Households.UPSERT](state, { id, data }) {
    Vue.set(state.households, id, data);
  },

  [Mutations.Persons.SET](state, { householdId, data }) {
    Vue.set(state.householdPersons, householdId, data.persons);
  },

  [Mutations.Avatars.UPSERT](state, { personId, data }) {
    Vue.set(state.avatars, personId, data);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
