import axios from "axios";
import { RefObject, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import CountryView from "./CountryView";

interface SelfProps {
  search: string;
  searchRef: RefObject<HTMLInputElement>;
}

export interface Country {
  id: number;
  name: string;
  population: number;
  land_area: number;
  density: number;
  capital: string;
  currency: string;
  flag: string;
}

interface State {
  data: Country[];
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

export default function CountryList(props: SelfProps) {
  const baseUrl = "https://freetestapi.com/api/v1/countries";
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search");
  const inputValue = props.searchRef?.current?.value;

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl);
      dispatch({ type: "SET_FETCH", payload: res.data });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const fetchDataSearch = async (query: string) => {
    try {
      const res = await axios.get(baseUrl + "?search=" + query);
      dispatch({ type: "SET_FETCH", payload: res.data });
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
  }, [inputValue]);

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

  return <CountryView data={state.data} />;
}
