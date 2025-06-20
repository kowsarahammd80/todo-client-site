import React, { useEffect, useState } from 'react';

const useChartMonthSealsData = () => {
   const [chartDataMonthwise, setChartDataMonthwise] = useState(null);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/month-wise-sales");
        const resData = await response.json();

        const valid = resData.filter(item => item._id && item.totalSales > 0);

        const months = valid.map(item => item._id); // like "2025-06"
        const totals = valid.map(item => item.totalSales);

         setChartDataMonthwise({
          labels: months,
          datasets: [
            {
              label: "💰 Monlthy Total Sales",
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
              ], // 🎨 multiple colors for bars
              borderColor: "#333", // 🟫 border of each bar
              borderWidth: 1,
              borderRadius: 10, // 🟢 rounded corners
              barThickness: 30, // 🎯 bar width
              hoverBackgroundColor: "#ff6384", // 🔥 on hover color
              hoverBorderColor: "#fff",
            },
          ],
        });
      } catch (err) {
        console.error("Monthly sales fetch failed", err);
      }
    };

    fetchMonthlySales();
  }, []);

  return { chartDataMonthwise };
};

export default useChartMonthSealsData;