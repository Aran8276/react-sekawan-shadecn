import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/Product/ProductList";
import RestaurantList from "./pages/Restaurant/RestaurantList";
import CarList from "./pages/Cars/CarList";
import { ChangeEvent, useRef, useState } from "react";
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail";
import ProductDetail from "./pages/Product/ProductDetail";
import CountryList from "./pages/Country/CountryList";
import CountryDetail from "./pages/Country/CountryDetail";
import { ThemeProvider } from "./components/ThemeProvider";
import { GlobalValue } from "./components/GlobalValue";

function App() {
  const [search, setSearch] = useState("");
  const [text, setText] = useState<string>("Value inisial (belum ganti)");
  const searchRef = useRef<HTMLInputElement>(null);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);
  };

  return (
    <BrowserRouter>
      <GlobalValue.Provider value={{text, setText}}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Layout searchRef={searchRef} searchHandler={searchHandler}>
            <Routes>
              <Route index element={<Homepage />} />
              {/* Tidak ada search di api sini (Products) */}
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/restaurants"
                element={
                  <RestaurantList searchRef={searchRef} search={search} />
                }
              />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route
                path="/countries"
                element={<CountryList searchRef={searchRef} search={search} />}
              />
              <Route path="/country/:id" element={<CountryDetail />} />
              <Route path="/cars" element={<CarList />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </GlobalValue.Provider>
    </BrowserRouter>
  );
}

export default App;
