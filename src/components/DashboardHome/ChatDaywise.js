import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import useChartDataDaywise from "../../hooks/useChartDataDaywise";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ChatDaywise = () => {
//   const [chartData, setChartData] = useState({});
  const {chartDatadaywise} = useChartDataDaywise()

//  useEffect(() => {
//   axios.get("http://localhost:5000/api/orders/day-wise-sales")
//     .then((res) => {
//       const data = Array.isArray(res.data) ? res.data : [];

//       const dates = data
//         .filter(item => item._id) // skip null _id
//         .map(item => item._id);

//       const totals = data
//         .filter(item => item._id)
//         .map(item => item.totalSales);

//       setChartData({
//         labels: dates,
//         datasets: [
//           {
//             label: "Total Sales",
//             data: totals,
//             backgroundColor: "rgba(54, 162, 235, 0.2)",
//             borderColor: "rgba(54, 162, 235, 1)",
//             borderWidth: 2,
//             tension: 0.3,
//           },
//         ],
//       });
//     })
//     .catch((err) => {
//       console.error("Failed to load sales data", err);
//     });
// }, []);


  return (
    <div>
      <h2>📈 Day Wise Total Sales</h2>
       {chartDatadaywise ? <Line data={chartDatadaywise} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default ChatDaywise;