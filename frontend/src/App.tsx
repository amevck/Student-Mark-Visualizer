import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import ColumnChart from "./components/charts/ColumnChart";
import WiskerChart from "./components/charts/WhiskerChart";
import { getAllCategeries, getAllValuesForCategeryList, getColomnChartData, getSubjectMarkData } from "./helpers/chartDataMappings";
import set from "lodash/set";
import get from "lodash/get";
import LineChart from "./components/charts/LineChart";
import FilterContainer from "./components/filters/FilterContainer";
import "./components/sideBar/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Sidebar from "./components/sideBar/Sidebar";
export interface AppState {
  email: string;
  password: string;
  isRequesting: boolean;
  isLoggedIn: boolean;
  data: MarkDetail[];
  error: string;
}

const App = () => {
  const [, setError] = useState("");
  const [markDetails, setMarkDetails] = useState<MarkDetail[]>([]);
  const [, setIsRequesting] = useState<boolean>(false);

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
  const [filteredMarksDetailsBySId, setfilteredMarksDetailsBySId] = useState([]);
  const [filteredMarksDetails, setfilteredMarksDetails] = useState([]);
  const catgs = getAllCategeries(filteredMarksDetails, "subject");
  const boxPlotdata = getAllValuesForCategeryList(filteredMarksDetails, catgs, "subject", "mark");
  const { chartData: lineChartData, semesters } = getSubjectMarkData(filteredMarksDetailsBySId);
  const { subjects, chartData } = getColomnChartData(filteredMarksDetails, 20);

  const onChangeFilterSelection = ({ filteredMarksDetailsBySId, filteredMarksDetails }) => {
    console.log({ filteredMarksDetailsBySId, filteredMarksDetails });
    setfilteredMarksDetails(filteredMarksDetails);
    setfilteredMarksDetailsBySId(filteredMarksDetailsBySId);
  };

  useEffect(() => {
    getTestData();
  }, []);
  let options = {
    side: "left",
    effect: "diverge",
  };
  return (
    <>
      <div>
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}>
          <FilterContainer markDetails={markDetails} onChangeFilters={onChangeFilterSelection} />
        </Sidebar>
        <div id="page-wrap">
          <Container>
            <Navbar expand="xl" variant="light" bg="light">
              <Navbar.Brand>Student Marks Analysis System</Navbar.Brand>
            </Navbar>
          </Container>
          <WiskerChart title="Students marks for subjects" xAxisName={"Subjects"} yAxisName={"Marks"} xData={catgs} yData={boxPlotdata} />
          <ColumnChart
            title="Students average marks for selected years"
            xAxisName={"Subjects"}
            yAxisName={"Average marks (for selected years)"}
            mapedData={chartData}
            xData={subjects}
          />
          <LineChart
            title="Students marks for all years"
            xAxisName={"Semester"}
            yAxisName={"Total marks (for selected students)"}
            mapedData={lineChartData}
            xData={semesters}
          />
          {markDetails.length}
        </div>
      </div>
    </>
  );
};

export default App;
