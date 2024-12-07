import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import useStatiscal from "@/common/hooks/useStatistical";
import { ITopBook } from "@/common/interfaces/statiscal";

const TopSellingBooksChart = () => {
  const chartRef = useRef(null);
  const { DataTopBook } = useStatiscal();
  const seriesData =
    DataTopBook?.data?.metadata?.topSellingBooks?.map(
      (item: ITopBook) => item.totalSold
    ) || [];

  const categoriesData =
    DataTopBook?.data?.metadata?.topSellingBooks?.map(
      (item: ITopBook) => item.title
    ) || [];
  useEffect(() => {
    if (!DataTopBook?.data?.metadata?.topSellingBooks) return;
    const options = {
      chart: {
        type: "bar",
        height: 200,
      },
      series: [
        {
          name: "Số lượng bán",
          data: seriesData,
        },
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
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
      xaxis: {
        categories: categoriesData,
        title: {
          text: "Số lượng bán",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        title: {
          text: "Tên sách",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
      },
      colors: ["#1A56DB"],
      grid: {
        strokeDashArray: 4,
      },
      tooltip: {
        x: {
          formatter: function (val, opts) {
            const label = opts.w.globals.labels[opts.dataPointIndex];
            return label ? `Sách: ${label}` : "Không xác định";
          },
        },
        y: {
          formatter: function (val) {
            return `${val} cuốn`;
          },
        },
      },
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
      return () => chart.destroy();
    }
  }, [DataTopBook]);

  if (DataTopBook.isLoading) {
    return <div>Loading...</div>;
  }
  if (!DataTopBook?.data?.metadata?.topSellingBooks?.length) {
    return <div>Không có dữ liệu để hiển thị.</div>;
  }
  return (
    <>
      <div className="bg-white  rounded-lg">
        <h2 className="font-bold text-gray-700 pt-2 ps-4">
          Top 5 loại sách bán chạy
        </h2>
        <div ref={chartRef} className="py-0 px-3"></div>
      </div>
    </>
  );
};

export default TopSellingBooksChart;
