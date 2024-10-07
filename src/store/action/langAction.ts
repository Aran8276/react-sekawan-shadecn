export const SET_LANG = "SET_LANG";

export const setLang = (lang: string) => {
  return {
    type: SET_LANG,
    payload: lang,
  };
};
