import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Country } from "./CountryList";
import CountryDetailView from "./CountryDetailView";

export default function CountryDetail() {
  const baseUrl = "https://freetestapi.com/api/v1/countries";
  const [data, setData] = useState<Country>();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl + "/" + id);
      setData(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <CountryDetailView data={data} />;
}
