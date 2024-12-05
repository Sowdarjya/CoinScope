import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ coinId }) => {
  const [coinPriceHistory, setCoinPriceHistory] = useState(null);
  const [timePeriod, setTimePeriod] = useState("24h");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const timePeriodOptions = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y"];

  const fetchCoinPriceHistory = async () => {
    try {
      const res = await fetch(
        `https://api.coinranking.com/v2/coin/${coinId}/history?timePeriod=${timePeriod}&referenceCurrencyUuid=${currencyRefId}`
      );
      const { data } = await res.json();
      setCoinPriceHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    currency,
    symbol,
    currencyRefId,
    setCurrency,
    setCurrencyRefId,
    setSymbol,
  } = useContext(CryptoCurrency);

  useEffect(() => {
    fetchCoinPriceHistory();
  }, [coinId, timePeriod, currency]);

  useEffect(() => {
    if (coinPriceHistory && coinPriceHistory.history) {
      const timestamps = [];
      const prices = [];

      coinPriceHistory.history.forEach((entry) => {
        const timestamp =
          entry.timestamp *
          (entry.timestamp.toString().length === 10 ? 1000 : 1);
        const date = new Date(timestamp);

        let formattedDate;
        switch (timePeriod) {
          case "1h":
          case "3h":
          case "12h":
          case "24h":
            formattedDate = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            break;
          case "7d":
          case "30d":
            formattedDate = date.toLocaleDateString([], {
              month: "short",
              day: "numeric",
            });
            break;
          default:
            formattedDate = date.toLocaleDateString([], {
              year: "numeric",
              month: "short",
            });
        }

        timestamps.push(formattedDate);
        prices.push(parseFloat(entry.price));
      });

      timestamps.reverse();
      prices.reverse();

      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: `Price (${timePeriod})`,
            data: prices,
            borderColor: "#faed26",
          },
        ],
      });
    }
  }, [coinPriceHistory, timePeriod]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  if (!coinPriceHistory) {
    return (
      <div className="flex items-center justify-center w-full lg:w-2/3 h-[400px]">
        <span className="loading loading-ring loading-lg bg-[#faed26]"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-2/3 gap-6 p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {timePeriodOptions.map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-3 py-1 rounded text-sm md:text-base ${
              timePeriod === period
                ? "bg-[#faed26] text-[#121111]"
                : "bg-base-100"
            }`}
          >
            {period}
          </button>
        ))}
      </div>
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CoinChart;
