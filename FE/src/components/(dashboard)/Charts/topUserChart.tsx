import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import useStatistical from "@/common/hooks/useStatistical";
import { ITopUser } from "@/common/interfaces/statiscal";

const TopUsersChart = () => {
  const chartRef = useRef(null);
  const { DataTopUser } = useStatistical();

  useEffect(() => {
    const options = {
      chart: {
        type: "bar",
        height: 200,
      },
      series: [
        {
          name: "Số lượng mua",
          data: DataTopUser?.data?.metadata.map(
            (user: ITopUser) => user.totalPurchased
          ),
        },
      ],
      xaxis: {
        categories: DataTopUser?.data?.metadata.map(
          (user: ITopUser) => user.user_name
        ),
        title: {
          text: "Người dùng",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Số lượng mua",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "10px",
          colors: ["#000"],
        },
      },
      colors: ["#FF5733"], // Màu cột
      grid: {
        strokeDashArray: 4,
      },
      tooltip: {
        x: {
          formatter: function (val, opts) {
            return `Người dùng: ${opts.w.globals.labels[opts.dataPointIndex]}`;
          },
        },
        y: {
          formatter: function (val) {
            return `${val} lần`;
          },
        },
      },
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
      return () => chart.destroy();
    }
  }, [DataTopUser]);

  if (DataTopUser.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg mt-9">
      <h2 className="font-bold text-gray-700">
        Top 5-10 Người Dùng Mua Hàng Nhiều Nhất
      </h2>
      <div ref={chartRef}></div>
    </div>
  );
};

export default TopUsersChart;