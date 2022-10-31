import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import './BarChat.css';
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Attendance Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100, 150, 250, 630, 750, 150, 120],
      backgroundColor: 'rgba(138,43,226, 0.5)',
    },
  ],
};

const BarChat = () => {
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

export default BarChat;
