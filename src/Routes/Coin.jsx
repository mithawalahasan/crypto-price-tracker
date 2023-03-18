import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "./Coin.css";
import FormatCash from "../FormatCash";
function Coin() {
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=true`;
  const [singlecoin, setsinglecoin] = useState([]);
  console.log(singlecoin);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => setsinglecoin(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(url)
        .then((res) => setsinglecoin(res.data))
        .catch((err) => console.log(err));
    }, 3000);
  }, [singlecoin]);
  return (
    <div className="coin-container">
      <div className="content">
        <h1>{singlecoin.name}</h1>
      </div>
      <div className="content">
        <div className="rank">
          <span className="rank-btn">Rank # {singlecoin.market_cap_rank}</span>
        </div>
        <div className="info">
          <div className="coin-heading">
            {singlecoin.image ? <img src={singlecoin.image.small} /> : null}
            <p>{singlecoin.name}</p>
            {singlecoin.symbol ? (
              <p> {singlecoin.symbol.toUpperCase()}/INR</p>
            ) : null}
          </div>
          <div className="coin-price">
            {singlecoin.market_data?.current_price ? (
              <h1>
                <span>&#x20B9;</span>{" "}
                {singlecoin.market_data.current_price.inr.toLocaleString(
                  "en-IN"
                )}
              </h1>
            ) : null}
          </div>
        </div>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>1h</th>
              <th>24h</th>
              <th>14d</th>
              <th>30d</th>
              <th>1yr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {singlecoin.market_data
                  ?.price_change_percentage_1h_in_currency ? (
                  <p
                    style={{
                      color:
                        Math.sign(
                          singlecoin.market_data
                            .price_change_percentage_1h_in_currency.inr
                        ) === -1
                          ? "red"
                          : "green",
                    }}
                  >
                    {singlecoin.market_data.price_change_percentage_1h_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {singlecoin.market_data
                  ?.price_change_percentage_24h_in_currency ? (
                  <p
                    style={{
                      color:
                        Math.sign(
                          singlecoin.market_data
                            .price_change_percentage_24h_in_currency.inr
                        ) === -1
                          ? "red"
                          : "green",
                    }}
                  >
                    {singlecoin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {singlecoin.market_data
                  ?.price_change_percentage_14d_in_currency ? (
                  <p
                    style={{
                      color:
                        Math.sign(
                          singlecoin.market_data
                            .price_change_percentage_14d_in_currency.inr
                        ) === -1
                          ? "red"
                          : "green",
                    }}
                  >
                    {singlecoin.market_data.price_change_percentage_14d_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {singlecoin.market_data
                  ?.price_change_percentage_30d_in_currency ? (
                  <p
                    style={{
                      color:
                        Math.sign(
                          singlecoin.market_data
                            .price_change_percentage_30d_in_currency.inr
                        ) === -1
                          ? "red"
                          : "green",
                    }}
                  >
                    {singlecoin.market_data.price_change_percentage_30d_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {singlecoin.market_data
                  ?.price_change_percentage_1y_in_currency ? (
                  <p
                    style={{
                      color:
                        Math.sign(
                          singlecoin.market_data
                            .price_change_percentage_1y_in_currency.inr
                        ) === -1
                          ? "red"
                          : "green",
                    }}
                  >
                    {singlecoin.market_data.price_change_percentage_1y_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="content">
        <div className="stats">
          <div className="left">
            <div className="row">
              <h4>24 Hour Low</h4>
              {singlecoin.market_data?.low_24h ? (
                <p>
                  {singlecoin.market_data.low_24h.inr.toLocaleString("en-IN")}
                </p>
              ) : null}
            </div>
            <div className="row">
              <h4>24 Hour High</h4>
              {singlecoin.market_data?.high_24h ? (
                <p>
                  {singlecoin.market_data.high_24h.inr.toLocaleString("en-IN")}
                </p>
              ) : null}
            </div>
          </div>
          <div className="right">
            <div className="row">
              <h4>Market cap</h4>
              {singlecoin.market_data?.market_cap ? (
                <p>{FormatCash(singlecoin.market_data.market_cap.inr)}</p>
              ) : null}
            </div>
            <div className="row">
              <h4>Circulating Supply</h4>
              {singlecoin.market_data ? (
                <p>{FormatCash(singlecoin.market_data.circulating_supply)}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="about">
          <h3>About</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                singlecoin.description ? singlecoin.description.en : ""
              ),
            }}
          ></p>
        </div>
      </div>
    </div>
  );
}

export default Coin;
