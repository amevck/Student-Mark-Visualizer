import React from "react";
import { getAverage } from "../../helpers/chartDataMappings";
import Chart from "./Chart";

type Props = {
  title?: string;
  xData: string[];
  xAxisName: string;
  yAxisName: string;
  mapedData: any;
  isLoading?: boolean;
};

const getSeries: any = (mappedData: { [key: string]: number[] }) => {
  const sers = Object.keys(mappedData).map((key: string) => {
    return {
      type: "column",
      name: key,
      data: mappedData[key],
    };
  });
  return sers;
};

const ColumnChart = (props: Props) => {
  const { title, xData: subjects, xAxisName, yAxisName, mapedData = {}, isLoading = false } = props;

  const options: Highcharts.Options = {
    title: {
      text: title || "",
    },

    // legend: {
    //   enabled: false,
    // },

    xAxis: {
      categories: subjects,
      title: {
        text: xAxisName,
      },
    },

    yAxis: {
      max: 100,
      title: {
        text: yAxisName,
      },
    },
    tooltip: {
      pointFormat: "{point.y:.2f}",
    },
    series: [
      ...getSeries(mapedData, subjects),
      {
        type: "spline",
        name: "Average",
        data: getAverage(mapedData),
      },
    ],
  };

  return (
    <div className="chart-container">
      <Chart isLoading={isLoading} options={options} />
    </div>
  );
};

export default ColumnChart;
