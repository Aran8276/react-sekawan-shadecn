import { SET_DATA } from "../action/detailAction";

const nilaiDefault = {
  data: {},
};

interface Action {
  type: string;
  payload?: any;
}

const detailReducer = (state = nilaiDefault, action: Action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default detailReducer;
