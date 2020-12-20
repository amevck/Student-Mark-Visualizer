import get from "lodash/get";
import set from "lodash/set";
import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import MultiSelect from "./MultiSelect";

type Props = {
  markDetails: MarkDetail[];
  onChangeFilters: Function;
};

const FilterContainer = ({ markDetails, onChangeFilters }: Props) => {
  const [filtervals, setFilterVals] = useState({});
  const onChangeFilter = (options: any, accessor: string) => {
    setFilterVals(prev => {
      set(prev, accessor, options);
      return { ...prev };
    });
  };

  useEffect(() => {
    let filteredMarksDetails = markDetails;
    let filteredMarksDetailsBySId = markDetails;
    Object.keys(filtervals).forEach(accessor => {
      const filterValsObj = get(filtervals, accessor);
      if (filterValsObj && Object.keys(filterValsObj).length) {
        filteredMarksDetails = filteredMarksDetails.filter(detail => get(filterValsObj, get(detail, accessor)));
      }
    });
    const filterValsById = get(filtervals, "studentId");
    filteredMarksDetailsBySId =
      filterValsById && Object.keys(filterValsById).length
        ? markDetails.filter(detail => get(filterValsById, get(detail, "studentId")))
        : markDetails;
    onChangeFilters({ filteredMarksDetailsBySId, filteredMarksDetails });
  }, [filtervals, markDetails, onChangeFilters]);

  return (
    <Container>
      <Col sm>
        <h4>Filters</h4>
      </Col>
      <Col sm>
        <MultiSelect
          name={"Student Id"}
          onChangeSelects={(event, accessor) => onChangeFilter(event, accessor)}
          mardkDetails={markDetails}
          accessor={"studentId"}
        />
      </Col>
      <Col sm>
        <MultiSelect
          name={"Year"}
          onChangeSelects={(event, accessor) => onChangeFilter(event, accessor)}
          mardkDetails={markDetails}
          accessor={"year"}
        />
      </Col>
      <Col sm>
        <MultiSelect
          name={"Grade"}
          onChangeSelects={(event, accessor) => onChangeFilter(event, accessor)}
          mardkDetails={markDetails}
          accessor={"grade"}
        />
      </Col>
      <Col sm>
        <MultiSelect
          name={"Subject"}
          onChangeSelects={(event, accessor) => onChangeFilter(event, accessor)}
          mardkDetails={markDetails}
          accessor={"subject"}
        />
      </Col>
    </Container>
  );
};

export default FilterContainer;
