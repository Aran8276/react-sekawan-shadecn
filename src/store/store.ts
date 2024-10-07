import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducer/themeReducer";
import langReducer from "./reducer/langReducer";
import userReducer from "./reducer/userReducer";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: langReducer,
    user: userReducer,
  },
});

export default store;
