import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import ColumnChart from "./components/ColumnChart";
import WiskerChart from "./components/WhiskerChart";
import { getAllCategeries, getAllValuesForCategeryList, getColomnChartData, getSubjectMarkData } from "./helpers/chartDataMappings";

import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

import Select from "react-select";
import set from "lodash/set";
import get from "lodash/get";
import LineChart from "./components/LineChart";
export interface AppState {
  email: string;
  password: string;
  isRequesting: boolean;
  isLoggedIn: boolean;
  data: MarkDetail[];
  error: string;
}

const App = () => {
  const options = [
    { label: "std_1", value: 1 },
    { label: "std_2", value: 2 },
    { label: "std_3", value: 3 },
    { label: "std_4", value: 4 },
    { label: "std_4", value: 5 },
    { label: "std_6", value: 6 },
    { label: "std_7", value: 7 },
    { label: "std_8", value: 8 },
    { label: "std_9", value: 9 },
    { label: "std_10", value: 10 },
    { label: "std_11", value: 11 },
    { label: "std_12", value: 12 },
  ];
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState({});
  const [filteredMarks, setfilterdMarks] = useState<MarkDetail[]>([]);
  const [selectedIdOptions, setsSelectedIdOptions] = useState<any[]>([options[0]]);
  const [markDetails, setMarkDetails] = useState<MarkDetail[]>([]);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const getTestData = async (): Promise<void> => {
    try {
      // setError({ error: "" });
      const response = await axios.get<MarkDetail[]>("/api/items");
      setMarkDetails(response.data);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsRequesting(false);
    }
  };
  const catgs = getAllCategeries(filteredMarks, "subject");
  const boxPlotdata = getAllValuesForCategeryList(filteredMarks, catgs, "subject", "mark");
  const { chartData: lineChartData, semesters } = getSubjectMarkData(filteredMarks);
  const { subjects, chartData } = getColomnChartData(filteredMarks, 20);

  useEffect(() => {
    getTestData();
  }, []);

  useEffect(() => {
    if (Object.keys(selectedIds).length) {
      const filtered = markDetails.filter(detail => get(selectedIds, detail.studentId));
      setfilterdMarks(filtered);
    } else {
      setfilterdMarks(markDetails);
    }
  }, [selectedIds, markDetails]);

  useEffect(() => {
    const ids = selectedIdOptions.reduce((prev, opt) => {
      set(prev, opt.value, 1);
      return prev;
    }, {});
    setSelectedIds(ids);
  }, [selectedIdOptions]);

  const setSelectedOption = (option: any) => {
    if (selectedIdOptions.some(opt => opt.value === option.value)) {
      setsSelectedIdOptions(prev => prev.filter(opt => opt.value !== option.value));
    } else {
      setsSelectedIdOptions(prev => Array.from(new Set([...prev, option])));
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div className="App-error">{error}</div>
      <Select onChange={(event: any) => setSelectedOption(event)} value={selectedIdOptions} options={options} isSearchable />
      <div>
        Server test data:
        <WiskerChart xAxisName={"Subjects"} yAxisName={"Marks"} xData={catgs} yData={boxPlotdata} />
        <ColumnChart xAxisName={"Subjects"} yAxisName={"Average marks (for selected years)"} mapedData={chartData} xData={subjects} />
        <LineChart xAxisName={"Semester"} yAxisName={"Total marks (for selected students)"} mapedData={lineChartData} xData={semesters} />
        {markDetails.length}
      </div>
      {/* <button disabled={isRequesting} onClick={getTestData}>
        Get test data
      </button> */}
    </div>
  );
};

export default App;
