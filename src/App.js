import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";

function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    Promise.all([
      axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365"
      ),
      axios.get(process.env.REACT_APP_BACKEND_API_URL),
    ])
      .then((responses) => {
        const coingeckoPrices = responses[0].data.prices.map(
          (price) => price[1]
        );
        const coingeckoDates = responses[0].data.prices.map((price) =>
          new Date(price[0]).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
        const predictPrices = [];
        const predictDates = [];

        const predictDataRaw = responses[1].data;
        const predictData = coingeckoDates.map((date) => {
          if (predictDataRaw[date]) {
            return predictDataRaw[date];
          } else {
            return 0;
          }
        });

        const chart = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels: coingeckoDates,
            datasets: [
              {
                type: "line",
                label: "Bitcoin Price (Coingecko)",
                data: coingeckoPrices,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                yAxisID: "price",
              },
              {
                type: "bar",
                label: "Prediction",
                data: predictData,
                backgroundColor: "rgb(54, 162, 235)",
                yAxisID: "prediction",
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            scales: {
              price: {
                type: "linear",
                display: true,
                position: "left",
                ticks: {
                  beginAtZero: true,
                },
              },
              prediction: {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                  beginAtZero: true,
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ width: "3800px", height: "90vh", overflowX: "scroll" }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default App;
