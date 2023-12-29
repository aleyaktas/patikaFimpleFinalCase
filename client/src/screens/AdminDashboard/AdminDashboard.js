import AdminTemplate from "../../layouts/AdminTemplate/AdminTemplate";
import { Doughnut, Line } from "react-chartjs-2";
import styles from "./AdminDashboard.module.css";
import Icon from "../../assets/icons/Icon";
import layer from "../../assets/icons/icons/layer.svg";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getStatistics } from "../../services/actions";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    canceled: 0,
    week: [],
  });

  const getFormStatistics = async () => {
    try {
      const res = await getStatistics();
      setStatistics(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFormStatistics();
  }, []);

  const cardItems = [
    {
      name: "Başvuru Sayısı",
      value: statistics.total,
      className: "totalApplications",
    },
    {
      name: "İptal Edilen Başvuru Sayısı",
      value: statistics.canceled,
      className: "cancelledApplications",
    },
    {
      name: "Bekleyen Başvuru Sayısı",
      value: statistics.pending,
      className: "pendingApplications",
    },
    {
      name: "Çözülen Başvuru Sayısı",
      value: statistics.completed,
      className: "resolvedApplications",
    },
  ];

  const lineChartData = {
    labels: statistics.week.map((day) => day.date),
    datasets: [
      {
        label: "Günlük Başvuru Sayıları",
        data: statistics.week.map((day) => day.count),
        backgroundColor: "green",
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const pieChartData = {
    labels: [
      "Çözülen Başvurular",
      "Bekleyen Başvurular",
      "İptal Edilen Başvurular",
    ],
    datasets: [
      {
        data: [statistics.completed, statistics.pending, statistics.canceled],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
      },
    ],
  };

  return (
    <AdminTemplate>
      <div className={styles.container}>
        <div className={styles.header}>
          <Icon name="Dashboard" color="#232637" />
          <span>Panel</span>
        </div>
        <div className={styles.cardContainer}>
          {cardItems.map((item) => (
            <div className={`${styles.card} ${styles[item.className]}`}>
              <p className={styles.cardTitle}>{item.name}</p>
              <p className={styles.cardValue}>{item.value}</p>
              <img src={layer} alt="layer" />
            </div>
          ))}
        </div>
        <div className={styles.cardChartContainer}>
          <div className={`${styles.cardChart} ${styles.cardLineChart}`}>
            <Line data={lineChartData} />
          </div>
          <div className={`${styles.cardChart} ${styles.cardDoughnutChart}`}>
            <Doughnut data={pieChartData} />
          </div>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminDashboard;
