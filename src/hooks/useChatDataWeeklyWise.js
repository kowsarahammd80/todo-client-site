import { useEffect, useState } from "react";
import moment from "moment";

const useChatDataWeeklyWise = () => {
  const [chartDataWeekly, setChartDataWeekly] = useState(null);

  useEffect(() => {
    const fetchWeeklySalesData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/weekly-wise-sales"
        );
        const resData = await response.json();

         const data = Array.isArray(resData)
          ? resData.filter((item) => item._id?.year && item._id?.week)
          : [];

        // Convert year/week to week range label
        const labels = data.map((item) => {
          const startOfWeek = moment().isoWeek(item._id.week).isoWeekYear(item._id.year).startOf('isoWeek');
          const endOfWeek = moment(startOfWeek).endOf('isoWeek');
          return `${startOfWeek.format("MMM D")} – ${endOfWeek.format("MMM D, YYYY")}`;
        });

        const totals = data.map((item) => item.totalSales);
        
         setChartDataWeekly({
          labels: labels,
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
        console.error("Failed to load weekly sales data", error);
      }
    };

    fetchWeeklySalesData();
  }, []);

  return { chartDataWeekly };
};


export default useChatDataWeeklyWise;