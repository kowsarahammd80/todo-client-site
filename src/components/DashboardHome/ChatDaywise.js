import axios from "axios";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import useChartDataDaywise from "../../hooks/useChartDataDaywise";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const ChatDaywise = () => {
  const { chartDatadaywise } = useChartDataDaywise();

  return (
    <div className="w-full p-5 rounded-lg">
      <h2>📊 Day Wise Total Sales (Bar Chart)</h2>
      {chartDatadaywise ? <Bar data={chartDatadaywise} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default ChatDaywise;