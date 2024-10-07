import { SET_LANG } from "../action/langAction";

interface Language {
  lang: string;
}

const nilaiDefault: Language = {
  lang: "id",
};

interface Action {
  type: string;
  payload?: any;
}

const langReducer = (state = nilaiDefault, action: Action) => {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};

export default langReducer;
