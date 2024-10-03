import { useEffect, useReducer } from "react";
import ProductView from "./ProductView";
import axios from "axios";

export interface Product {
  id: number | string;
  title: string;
  price?: number;
  description: string;
  category?: Category;
  image: string;
  rating?: Rating;
}

export enum Category {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

export interface Rating {
  rate: number;
  count: number;
}

interface State {
  data: Product[];
  search: string;
  isLoading: boolean;
  errorMsg: string;
}

interface Action {
  type: "SET_FETCH" | "SET_LOADING" | "SET_SEARCH_QUERY" | "SET_ERROR";
  payload: any;
}

const initialState: State = {
  data: [],
  search: "",
  isLoading: false,
  errorMsg: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_FETCH":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        search: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        errorMsg: action.payload,
      };

    default:
      console.log("Warning: Unknown action type: " + action.type);
      return {
        ...state,
      };
  }
};

export default function ProductList() {
  const baseUrl = "https://fakestoreapi.com";
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl + "/products");
      dispatch({ type: "SET_FETCH", payload: res.data });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <ProductView data={state.data} />;
}
