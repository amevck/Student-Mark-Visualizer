import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import WiskerChart from "./components/WhiskerChart";
import { getAllCategeries, getAllValuesForCategeryList } from "./helpers/chartDataMappings";
import logo from "./logo.svg";

export interface AppState {
  email: string;
  password: string;
  isRequesting: boolean;
  isLoggedIn: boolean;
  data: MarkDetail[];
  error: string;
}

const App = () => {
  const [error, setError] = useState("");
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
  const catgs = getAllCategeries(markDetails, "subject");
  const boxPlotdata = getAllValuesForCategeryList(markDetails, catgs, "subject", "mark");
  useEffect(() => {
    getTestData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div className="App-error">{error}</div>

      <div>
        Server test data:
        <WiskerChart xAxisName={"subjects"} yAxisName={"marks"} xData={catgs} yData={boxPlotdata} />
        {markDetails.length}
      </div>
      {/* <button disabled={isRequesting} onClick={getTestData}>
        Get test data
      </button> */}
    </div>
  );
};

export default App;
