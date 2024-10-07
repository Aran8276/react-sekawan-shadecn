import { useParams } from "react-router-dom";
import RestaurantDetailView from "./RestaurantDetailView";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Restaurant as RestaurantDetail } from "./RestaurantDetailView";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "@/store/action/detailAction";

export default function RestaurantDetail() {
  const baseUrl = "https://restaurant-api.dicoding.dev";
  // const [data, setData] = useState<RestaurantDetail>();
  const data = useSelector((store: any) => store.dataDetail.data);
  const dispatchRedux = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl + "/detail/" + id);
      // setData(res.data.restaurant);
      dispatchRedux(setData(res.data.restaurant));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <RestaurantDetailView data={data} />;
}
