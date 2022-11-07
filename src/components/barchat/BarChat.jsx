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

const BarChat = ({ barData }) => {
  // const lab =
  // console.log(lab);
  const labels = barData.map((val) => val._id);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: barData.map((val) => val.totalCount),
        backgroundColor: 'rgba(138,43,226, 0.5)',
      },
    ],
  };
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

export default BarChat;
