import WidgetsMock from "@/mock/widgets";
import hyperid from "hyperid";
import router from "@/router";

const mockedWigets = [
  {
    x: 0,
    y: 0,
    ...WidgetsMock.DateTime.Small,
    static: false,
    i: hyperid()(),
    data: { name: "date" }
  },
  {
    x: 2,
    y: 2,
    ...WidgetsMock.Weather.Medium,
    data: {},
    static: false,
    i: hyperid()()
  },
  {
    x: 3,
    y: 0,
    ...WidgetsMock.GuestWifi.Small,
    w: 1,
    h: 1,
    data: {},
    static: false,
    i: hyperid()()
  },

  {
    x: 0,
    y: 1,
    component: {
      name: "placeholder",
      id: hyperid()()
    },
    w: 1,
    h: 1,
    data: {
      image: "slices_13.png",
      name: "fernseh-wocha-mia"
    },
    static: false,
    i: hyperid()()
  },

  {
    x: 0,
    y: 3,
    ...WidgetsMock.HouseholdState.Medium,
    data: {},
    static: false,
    i: hyperid()()
  },
  {
    x: 1,
    y: 0,
    component: {
      name: "placeholder",
      id: hyperid()()
    },
    w: 1,
    h: 1,
    data: {
      image: "slices_26.png",
      name: "mia-latop-prio"
    },
    static: false,
    i: hyperid()()
  },
  {
    x: 4,
    y: 0,
    ...WidgetsMock.BabyMonitor.Small,
    data: {},
    static: false,
    i: hyperid()()
  },
  {
    x: 3,
    y: 0,
    ...WidgetsMock.Speedtest.Small,
    data: {},
    static: false,
    i: hyperid()()
  },
  {
    x: 1,
    y: 1,
    ...WidgetsMock.ShareGuestWifi.Small,
    data: {},
    static: false,
    i: hyperid()()
  },
  {
    x: 0,
    y: 2,
    ...WidgetsMock.InternetUsage.Large,
    data: {},
    static: false,
    i: hyperid()()
  },
  {
    x: 2,
    y: 0,
    ...WidgetsMock.PetTracker.Small,
    static: false,
    i: hyperid()()
  },
  {
    x: 2,
    y: 1,
    ...WidgetsMock.BestFriend.Small,
    static: false,
    i: hyperid()()
  }
];

const state = {
  widgets: [...mockedWigets]
};

const getters = {
  widgets: state => state.widgets
};

const actions = {
  "update-widgets"({ commit }, layout) {
    commit("set-widget-layout", layout);
  }
};

const isPositionFree = (x, y) => {
  let result = state.widgets.find(
    widget => widget.x >= x && x <= widget.x + widget.w && widget.y >= y && y <= widget.y + widget.h
  );

  return result == null;
};

const findNextOpenPosition = widget => {
  let maxY = Math.max(...state.widgets.map(w => w.y + w.h));
  let maxX = Math.max(...state.widgets.map(w => w.x + w.w));

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      let availability = [];
      for (let i = 0; i < widget.w; i++) {
        for (let j = 0; j < widget.h; j++) {
          availability.push(isPositionFree(x + i, y + j));
        }
      }
      if (availability.every(a => a === true)) {
        return { x: x, y: y };
      }
    }
  }
};

const mutations = {
  "set-widget-layout"(state, payload) {
    state.widgets = payload;
  },

  "add-widget"(state, widget) {
    let nextOpen = findNextOpenPosition(widget);

    if (nextOpen) {
      state.widgets.push({
        ...nextOpen,
        ...widget,
        data: {},
        static: false,
        i: hyperid()()
      });

      router.push("/");
    }
  },
  "remove-widget"(state, payload) {
    let indexToRemove = state.widgets.findIndex(w => w.i === payload);
    if (indexToRemove) {
      state.widgets.splice(indexToRemove, 1);
    }
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
