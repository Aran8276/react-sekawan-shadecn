import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/Product/ProductList";
import RestaurantList from "./pages/Restaurant/RestaurantList";
import CarList from "./pages/Cars/CarList";
import { ChangeEvent, useState } from "react";
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail";
import ProductDetail from "./pages/Product/ProductDetail";
import CountryList from "./pages/Country/CountryList";
import CountryDetail from "./pages/Country/CountryDetail";

function App() {
  const [search, setSearch] = useState("");

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);
  };

  return (
    <BrowserRouter>
      <Layout searchHandler={searchHandler}>
        <Routes>
          <Route index element={<Homepage />} />
          {/* Tidak ada search di api sini (Products) */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/restaurants"
            element={<RestaurantList search={search} />}
          />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/countries" element={<CountryList search={search} />} />
          <Route path="/country/:id" element={<CountryDetail />} />
          <Route path="/cars" element={<CarList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
