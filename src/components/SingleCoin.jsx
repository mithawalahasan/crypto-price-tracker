import React from "react";
import "./Coins.css";
import FormatCash from "../formatCash";
function SingleCoin({ singlecoin }) {
  return (
    <div className="coin-row">
      <p>{singlecoin.market_cap_rank}</p>
      <div className="img-symbol">
        <img src={singlecoin.image} alt="image" />
        <p>{singlecoin.symbol.toUpperCase()}</p>
      </div>
      <p>
        <span>&#x20B9;</span> {singlecoin.current_price.toLocaleString("en-IN")}
      </p>
      <p className="coi">{singlecoin.price_change_percentage_24h.toFixed(2)}</p>
      <p className="hide-mobile coi">
        <span>&#x20B9;</span> {FormatCash(singlecoin.total_volume)}
      </p>
      <p className="hide-mobile">
        <span>&#x20B9;</span> {FormatCash(singlecoin.market_cap)}
      </p>
    </div>
  );
}

export default SingleCoin;
