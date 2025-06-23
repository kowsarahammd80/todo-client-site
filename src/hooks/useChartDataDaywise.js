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
              label: "💰 day Total Sales",
              data: totals,
              backgroundColor: [
                "#4dc9f6",
                "#f67019",
                "#f53794",
                "#537bc4",
                "#acc236",
                "#166a8f",
                "#00a950",
                "#58595b",
                "#8549ba",
              ],
              borderColor: "#333", 
              borderWidth: 1,
              borderRadius: 15, 
              barThickness: 30, 
              hoverBackgroundColor: "#ff6384",
              hoverBorderColor: "#fff",
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