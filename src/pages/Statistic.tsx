import { getFromLocalStorage } from "../services/statistic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const getChartData = () => {
  let labels: string[] = [];
  let data: number[] = [];

  for (const [key, value] of Object.entries(getFromLocalStorage())) {
    labels.push(key);
    data.push(value);
  }

  return {
    labels,
    datasets: [
      {
        label: "My First Dataset",
        data: data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
};

const Statistic = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-4">
      <h2>Counting Copied</h2>
      <div
        style={{
          width: "60vh",
          height: "60vh",
          position: "relative",
          margin: "0 auto",
        }}
      >
        <Pie options={{ responsive: true }} data={getChartData()} />
      </div>
    </section>
  );
};

export default Statistic;
