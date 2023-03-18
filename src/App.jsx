import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Coin from "./Routes/Coin";

function App() {
  const [coins, setcoins] = useState([]);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setcoins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Coins coins={coins} />} />
        <Route exact path="/coin/:coinId" element={<Coin />} />
        {/* <Route exact path=":coinId" element={<Coin />} /> */}
      </Routes>
    </>
  );
}

export default App;
