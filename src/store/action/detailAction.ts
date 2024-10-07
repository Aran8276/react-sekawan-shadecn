import { Restaurant } from "@/pages/Restaurant/RestaurantList";

export const SET_DATA = "SET_DATA";

export const setData = (data: Restaurant) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};
