import React, { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);
type Props = {
  options: Highcharts.Options;
  isLoading?: boolean;
};
const Chart = ({ options, isLoading = false }: Props) => {
  const ref = useRef<any>();
  if (isLoading) {
    ref?.current?.chart?.showLoading();
  }
  return (
    <div>
      <HighchartsReact ref={ref} highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
