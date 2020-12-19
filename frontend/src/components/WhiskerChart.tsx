import React from "react";
import { mapDataToboxPlot, mapDataToScatter } from "../helpers/chartDataMappings";
import Chart from "./Chart";

type Props = {
  title?: string;
  xAxisName: string;
  yAxisName: string;
  xData: string[];
  yData: number[][];
};

const WiskerChart = (props: Props) => {
  const { title, xAxisName, yAxisName, xData, yData } = props;

  const options: Highcharts.Options = {
    title: {
      text: title || "",
    },

    legend: {
      enabled: false,
    },

    xAxis: {
      categories: xData,
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

    series: [
      {
        type: "boxplot",
        name: "studentsVsMarksBoxPlot",
        data: mapDataToboxPlot(yData),
        tooltip: {
          headerFormat: "<em>Experiment No {point.key}</em><br/>",
        },
      },
      {
        name: "mark",
        type: "scatter",
        data: mapDataToScatter(yData),
        jitter: {
          x: 0.25,
        },
        marker: {
          radius: 1,
        },
        color: "rgba(100, 100, 100, 0.5)",
        tooltip: {
          pointFormat: "{point.y}",
        },
      },
    ],
  };

  return (
    <div>
      <Chart options={options} />
    </div>
  );
};

export default WiskerChart;
