import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import ColumnChart from "./components/charts/ColumnChart";
import WiskerChart from "./components/charts/WhiskerChart";
import { getAllCategeries, getAllValuesForCategeryList, getColomnChartData, getSubjectMarkData } from "./helpers/chartDataMappings";
import LineChart from "./components/charts/LineChart";
import FilterContainer from "./components/filters/FilterContainer";
import "./components/sideBar/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar } from "react-bootstrap";
import Sidebar from "./components/sideBar/Sidebar";
// import studentMarks from "./__test_data/studentMarks.json";

const App = () => {
  const [markDetails, setMarkDetails] = useState<MarkDetail[]>([]);
  const [filteredMarksDetailsBySId, setfilteredMarksDetailsBySId] = useState([]);
  const [filteredMarksDetails, setfilteredMarksDetails] = useState([]);
  const catgs = getAllCategeries(filteredMarksDetails, "subject");
  const boxPlotdata = getAllValuesForCategeryList(filteredMarksDetails, catgs, "subject", "mark");
  const { chartData: lineChartData, semesters } = getSubjectMarkData(filteredMarksDetailsBySId);
  const { subjects, chartData } = getColomnChartData(filteredMarksDetails, 2);

  const onChangeFilterSelection = useCallback(({ filteredMarksDetailsBySId, filteredMarksDetails }) => {
    setfilteredMarksDetails(filteredMarksDetails);
    setfilteredMarksDetailsBySId(filteredMarksDetailsBySId);
  }, []);

  useEffect(() => {
    getTestData();
  }, []);

  const getTestData = async (): Promise<void> => {
    try {
      const studentids = Array.from({ length: 20 }, (_, i) => i + 1); // hard coded 20 ids
      const response = await axios.get<MarkDetail[]>("/student/marks", { params: { studentids } });
      setMarkDetails(response.data);
    } catch (error) {
      console.error("Something went wrong");
      // TODO handle error
    }
  };

  return (
    <>
      <div>
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}>
          <FilterContainer markDetails={markDetails} onChangeFilters={onChangeFilterSelection} />
        </Sidebar>
        <div id="page-wrap">
          <Container className="navbar-container">
            <Navbar expand="xl" variant="light">
              <Navbar.Brand>
                <h4>Student Marks Analysis System</h4>
              </Navbar.Brand>
            </Navbar>
          </Container>
          <WiskerChart title="Students marks for subjects" xAxisName={"Subjects"} yAxisName={"Marks"} xData={catgs} yData={boxPlotdata} />
          <ColumnChart
            title="Students selected years average marks for subjects"
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
