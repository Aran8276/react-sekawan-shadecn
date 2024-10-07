import { TOGGLE_THEME } from "../action/themeAction";

interface Nilai {
  theme: string;
}

interface Action {
  type: string;
}

const nilaiDefault: Nilai = {
  theme: "light",
};

const themeReducer = (state = nilaiDefault, action: Action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    default:
      return state;
  }
};

export default themeReducer;
