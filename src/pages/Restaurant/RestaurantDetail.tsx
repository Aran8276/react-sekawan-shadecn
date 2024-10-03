import { useParams } from "react-router-dom";
import RestaurantDetailView from "./RestaurantDetailView";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Restaurant as RestaurantDetail } from "./RestaurantDetailView";

export default function RestaurantDetail() {
  const baseUrl = "https://restaurant-api.dicoding.dev";
  const [data, setData] = useState<RestaurantDetail>();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl + "/detail/" + id);
      setData(res.data.restaurant);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <RestaurantDetailView data={data} />;
}
