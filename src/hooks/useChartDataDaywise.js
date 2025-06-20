import React, { useEffect, useState } from 'react';

const useChartDataDaywise = () => {
  const [chartDatadaywise, setChartDatadaywise] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/day-wise-sales");
        const resData = await response.json();

        const data = Array.isArray(resData) ? resData : [];

        const dates = data
          .filter(item => item._id)
          .map(item => item._id);

        const totals = data
          .filter(item => item._id)
          .map(item => item.totalSales);

        setChartDatadaywise({
          labels: dates,
          datasets: [
            {
              label: "Total Sales",
              data: totals,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to load sales data", error);
      }
    };

    fetchSalesData();
  }, []);

  return {chartDatadaywise};
};

export default useChartDataDaywise;