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
import useChatDataWeeklyWise from "../../hooks/useChatDataWeeklyWise";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChatWeeklyWiseData = () => {
  const { chartDataWeekly } = useChatDataWeeklyWise();

  return (
    <div className="w-full p-5 rounded-lg">
      <h2>📊 Weekly Total Sales</h2>
      {chartDataWeekly ? (
        <Bar data={chartDataWeekly} />
      ) : (
        <p className="text-sm">Loading chart...</p>
      )}
    </div>
  );
};

export default ChatWeeklyWiseData;