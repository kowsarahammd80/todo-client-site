import React from 'react';
import useChartMonthSealsData from '../../hooks/useChartMonthSealsData';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChatMonthWise = () => {
    const { chartDataMonthwise } = useChartMonthSealsData();
    return (
        <div className='w-full p-5 rounded-lg'>
      <h2>📅 Monthly Delivered Sales</h2>
      {chartDataMonthwise ? <Bar data={chartDataMonthwise} /> : <p>Loading...</p>}
    </div>
    );
};

export default ChatMonthWise;