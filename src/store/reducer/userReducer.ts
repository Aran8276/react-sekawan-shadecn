import { SET_USER } from "../action/userAction";

interface User {
  user: string;
}

const nilaiDefault: User = {
  user: "admin",
};

interface Action {
  type: string;
  payload?: any;
}

const userReducer = (state = nilaiDefault, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
