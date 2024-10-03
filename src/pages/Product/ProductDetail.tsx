import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailView from "./ProductDetailView";

export interface ProductDetail {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export default function ProductDetail() {
  const baseUrl = "https://fakestoreapi.com";
  const [data, setData] = useState<ProductDetail>();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl + "/products/" + id);
      setData(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <ProductDetailView data={data} />;
}
