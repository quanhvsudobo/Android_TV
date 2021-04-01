import axios from "axios";

const getConditionsURL = city =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ad73910e293921006370381d3ad7191`;

const WeatherStore = {
  namespaced: false,
  state: {
    weatherConditions: null
  },
  getters: {
    weatherConditions: state => state.weatherConditions
  },
  actions: {
    "load-weather"({ dispatch }, city) {
      city = "Bonn";
      axios
        .get(getConditionsURL(city))
        .then(response => dispatch("received-weather", response.data));
    },
    "received-weather"({ commit }, data) {
      commit("set-weather", data);
    }
  },
  mutations: {
    "set-weather"(state, payload) {
      state.weatherConditions = payload;
    }
  }
};

export default WeatherStore;
