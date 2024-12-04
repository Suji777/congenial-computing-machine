import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Analytics = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed && new Date(task.dueDate) >= new Date()).length;
  const overdueTasks = tasks.filter((task) => new Date(task.dueDate) < new Date() && !task.completed).length;

  const pieData = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        label: "Tasks Distribution",
        data: [completedTasks, pendingTasks, overdueTasks],
        backgroundColor: ["#568203", "#FEBE10", "#BA0021"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        label: "Task Count",
        data: [completedTasks, pendingTasks, overdueTasks],
        backgroundColor: ["#568203", "#FEBE10", "#BA0021"],
        borderWidth: 1,
      },
    ],
  };

  const pendingOverduePieData = {
    labels: ["Pending", "Overdue"],
    datasets: [
      {
        label: "Pending and Overdue",
        data: [pendingTasks, overdueTasks],
        backgroundColor: ["#FEBE10", "#BA0021"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {/* First Column: Bar Chart */}
      <div style={{ flex: "1 1 40%", minWidth: "300px" }}>
        <h3 style={{ textAlign: "center", color: "#800080" }}>Bar Chart</h3>
        <Bar data={barData} />
      </div>

      {/* Second Column: Pie Chart */}
      <div style={{ flex: "1 1 40%", minWidth: "300px" }}>
        <h3 style={{ textAlign: "center", color: "#800080" }}>Pie Chart</h3>
        <Pie data={pieData} />
      </div>

      {/* Third Column: Task Analytics Info */}
      <div style={{ flex: "1 1 20%", minWidth: "200px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
        <h3 style={{ textAlign: "center", color: "#800080" }}>Task Analytics</h3>
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {completedTasks}</p>
        <p>Pending: {pendingTasks}</p>
        <p>Overdue: {overdueTasks}</p>
      </div>

      {/* Fourth Column: Pending and Overdue Pie Chart */}
      <div style={{ flex: "1 1 40%", minWidth: "300px" }}>
        <h3 style={{ textAlign: "center", color: "#800080" }}>Pending and Overdue</h3>
        <Pie data={pendingOverduePieData} />
      </div>
    </div>
  );
};

export default Analytics;
