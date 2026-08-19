import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ATSChart({ history }) {
const labels = history.map((item, index) => `Resume ${index + 1}`);  

  const data = {
    labels,
    datasets: [
      {
        label: "ATS Score",
        data: history.map((item) => item.score),
        backgroundColor: "#7C3AED",
        borderRadius: 8,
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      callbacks: {
        title: function(context) {
          const index = context[0].dataIndex;
          return history[index].fileName;
        },

        label: function(context) {
          return `ATS Score: ${context.raw}/100`;
        }
      }
    }
  }
};

  return (
  <div style={{ height: "280px" }}>
    <Bar data={data} options={options} />
  </div>
);
}