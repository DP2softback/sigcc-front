import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "./PieChart.css";

const PieChart = ({ title, labels, datasets }) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const data = {
    labels: ["Muy Buena", "Buena", "Normal", "Mala", "Muy Mala"],
    datasets: [
      {
        label: "# de evaluaciones",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-Pie">
      <Pie data={data} className="m-auto h-100" options={{
        plugins: {
          title: {
            display: true,
            align: 'center',
            text: title,
            font: {
              size: 24,
              weight: 'bold'
            }
          }
        }
      }}/>
    </div>
  );
};

export default PieChart;
