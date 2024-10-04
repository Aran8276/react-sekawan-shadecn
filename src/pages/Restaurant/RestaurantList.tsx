import axios from "axios";
import { useReducer, useEffect, useContext, RefObject } from "react";
import RestaurantView from "./RestaurantView";
import { useSearchParams } from "react-router-dom";
import GlobalValue from "@/components/GlobalValue";

interface SelfProps {
  search: string;
  searchRef: RefObject<HTMLInputElement>;
}

export interface RestoData {
  error: boolean;
  message: string;
  count: number;
  restaurants: Restaurant[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  pictureId: string;
  city: string;
  rating: number;
}

interface State {
  data: Restaurant[];
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

export default function RestaurantList(props: SelfProps) {
  const baseUrl = "https://restaurant-api.dicoding.dev";
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search");
  const contextValue = useContext(GlobalValue);

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl + "/list");
      dispatch({ type: "SET_FETCH", payload: res.data.restaurants });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const fetchDataSearch = async (query: string) => {
    try {
      const res = await axios.get(baseUrl + "/search?q=" + query);
      dispatch({ type: "SET_FETCH", payload: res.data.restaurants });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    if (!props.searchRef.current || !searchParam) {
      fetchData();
      return;
    }
    props.searchRef.current.value = searchParam;
    setSearchParams({ search: props.searchRef.current.value });
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: props.searchRef.current.value,
    });
  }, []);

  useEffect(() => {
    if (props.searchRef?.current?.value === "") {
      setSearchParams({});
      fetchData();
      return;
    }
    console.log(props.searchRef?.current?.value);
  }, [props.searchRef?.current?.value]);

  useEffect(() => {
    if (props.search === "") {
      return;
    }
    if (inputValue === "") {
      setSearchParams({});
      return;
    }
    setSearchParams({ search: props.search });
  }, [props.search]);

  useEffect(() => {
    if (!searchParam || searchParam === "") {
      return;
    }
    fetchDataSearch(searchParam);
  }, [searchParam]);

  return <RestaurantView context={contextValue} data={state.data} />;
}
