import React, { useEffect, useState } from "react";
import Select from "react-select";
import get from "lodash/get";
import set from "lodash/set";
import makeAnimated from "react-select/animated";
import "./MultiSelect.css";

type Props = {
  accessor: string;
  name: string;
  isFirstSelectAsDefault?: boolean;
  mardkDetails: MarkDetail[];
  onChangeSelects: Function;
};
const animatedComponents = makeAnimated();
const getAllOptions = (mardkDetails: MarkDetail[], accessor) => {
  return Array.from(new Set(mardkDetails.map(md => get(md, accessor))));
};

const convertOptionsAsObject = (options: any[]) =>
  (options || []).reduce((prev, opt) => {
    set(prev, opt.label, 1);
    return prev;
  }, {});

const MultiSelect = (props: Props) => {
  const { onChangeSelects, mardkDetails, accessor, name } = props;
  const [options, setOptions] = useState([] as any[]);
  const [selectedIdOptions, setsSelectedIdOptions] = useState<any[]>(options[0] ? [options[0]] : []);

  useEffect(() => {
    const allOptions = getAllOptions(mardkDetails, accessor);
    setOptions(
      allOptions.map((opt, i) => {
        return { label: opt, value: i };
      })
    );
  }, [mardkDetails, accessor]);

  const setSelectedOption = (option: any) => {
    setsSelectedIdOptions(() => {
      onChangeSelects(convertOptionsAsObject(option), accessor);
      return option;
    });
  };

  return (
    <div>
      <div className="multi-select">
        <label>{name}</label>
        <div className="dropdown">
          <Select
            isMulti
            components={animatedComponents}
            onChange={(event: any) => setSelectedOption(event)}
            closeMenuOnSelect={false}
            defaultValue={selectedIdOptions}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
