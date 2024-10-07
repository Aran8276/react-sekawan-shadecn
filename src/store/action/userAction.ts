export const SET_USER = "SET_USER";

export const setUser = (user: string) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
