import React from "react";
import Chart from "./Chart";

type Props = {
  title?: string;
  xData?: string[];
  xAxisName: string;
  yAxisName: string;
  mapedData: any;
};

const getSeries: any = (mappedData: { [key: string]: number[] }) => {
  return Object.keys(mappedData).map((key: string, i) => {
    return {
      type: "spline",
      name: key,
      data: mappedData[key],
    };
  });
};

const LineChart = (props: Props) => {
  const { title, xData: subjects, xAxisName, yAxisName, mapedData = {} } = props;

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
      //   max: 100,
      title: {
        text: yAxisName,
      },
    },
    tooltip: {
      pointFormat: "{point.series.name} : {point.y}",
    },
    series: getSeries(mapedData),
  };

  return (
    <div className="chart-container">
      <Chart options={options} />
    </div>
  );
};

export default LineChart;
