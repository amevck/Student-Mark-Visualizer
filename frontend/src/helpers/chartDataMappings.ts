import set from "lodash/set";
import get from "lodash/get";

export const getAllCategeries = (markDetails: MarkDetail[], accessor: string) => {
  return Array.from(new Set(markDetails.map(markdetail => get(markdetail, accessor)))).filter(val => val !== null);
};

export const getAllValuesForCategeryList = (
  markDetails: MarkDetail[],
  categoryList: string[],
  categoryAccessor: string,
  valueAccessor: string
) => {
  let map = {};
  markDetails.forEach(markDetail => {
    const val = get(markDetail, valueAccessor);
    const category = get(markDetail, categoryAccessor);
    if (get(map, category)) {
      (get(map, category) as any).push(val);
    } else {
      set(map, category, [val]);
    }
  });
  return categoryList.map(category => get(map, category));
};

export const mapDataToboxPlot = (ydata: number[][]) => ydata.map(row => getBoxPlotData(row));

export const mapDataToScatter = (ydata: number[][]) =>
  ydata.reduce((acc, data: any, x) => {
    return acc.concat(
      data.map((value: any) => {
        return [x, value];
      })
    );
  }, []);

const getBoxPlotData = (values: number[]) => {
  var sorted = values.sort(function(a, b) {
    return a - b;
  });

  return {
    low: sorted[0],
    q1: sorted[Math.round(values.length * 0.25)],
    median: sorted[Math.round(values.length * 0.5)],
    q3: sorted[Math.round(values.length * 0.75)],
    high: sorted[sorted.length - 1],
  };
};
