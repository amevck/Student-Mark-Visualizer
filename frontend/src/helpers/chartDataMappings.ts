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

export const getColomnChartData = (markDetails: MarkDetail[], semesters: number) => {
  const subjects = getAllCategeries(markDetails, "subject");
  const years = getAllCategeries(markDetails, "year");
  const subjectIndexMap = subjects.reduce((prev, curr, i) => set(prev, curr, i), {});
  const studentIdNamMap = {};
  const studentSubjectMap = markDetails.reduce((prev, curr, i) => {
    const stdId = get(curr, "studentId");
    const subj = get(curr, "subject");
    let valueArr: number[] = get(prev, stdId);
    if (!get(studentIdNamMap, stdId)) {
      set(studentIdNamMap, stdId, get(curr, "name"));
    }
    if (!valueArr) {
      set(prev, stdId, new Array(subjects.length).fill(0));
    }
    valueArr = get(prev, stdId);
    const subjIndex = get(subjectIndexMap, subj);
    valueArr[subjIndex] = valueArr[subjIndex] + get(curr, "mark") / (years.length * semesters);
    return prev;
  }, {});
  const chartData = Object.keys(studentSubjectMap).reduce((prev, id) => {
    set(prev, get(studentIdNamMap, id), get(studentSubjectMap, id));
    return prev;
  }, {});
  return { chartData, subjects };
};

export const getSubjectMarkData = (markDetails: MarkDetail[]) => {
  const years = getAllCategeries(markDetails, "year");
  const yearsIndexMap = years.reduce((prev, curr, i) => set(prev, curr, i), {});
  const chartData = markDetails.reduce((prev, curr, i) => {
    const year = get(curr, "year");
    const semester = get(curr, "semester");
    const subj = get(curr, "subject");
    let valueArr: number[] = get(prev, subj);
    if (!valueArr) {
      set(prev, subj, new Array(years.length * 2).fill(0));
    }
    valueArr = get(prev, subj);
    const yearIndex = semester === 1 ? get(yearsIndexMap, year) * 2 : get(yearsIndexMap, year) * 2 + 1;
    valueArr[yearIndex] = valueArr[yearIndex] + get(curr, "mark");
    return prev;
  }, {});
  const semesters = years.reduce((prev, year) => {
    prev.push(`${year} (s-1)`);
    prev.push(`${year} (s-2)`);
    return prev;
  }, []);
  return { chartData, semesters };
};

export const getAverage = (studentSubjMap: any) => {
  const length = Object.keys(studentSubjMap).length;
  const valsArr = Object.keys(studentSubjMap).reduce((prev, key) => {
    prev.push(studentSubjMap[key]);
    return prev;
  }, [] as any);
  return sumArrays(valsArr).map(val => val / length);
};

const sumArrays = (arrays: number[][]) => {
  const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
  const result = Array.from({ length: n });
  return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
};
