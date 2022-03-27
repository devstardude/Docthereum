import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import BackgroundLayout from "../../shared/BackgroundLayout";
import { occurrencesCalculator, checkOccuranceValue,nameGenerator } from "./utils";
//import'./style.css';

const Graph = (props) => {
  const rawArray = props.graphData;
  const modifyArray = (arr) => {
    arr = rawArray;
    let arrayOfDays = [];
    if (arr !== null) {
      const day = 26;
      arr.map((item) => {
        if (new Date(item.addedAt * 1000).getDate() === day) {
          const hour = new Date(item.addedAt * 1000).getHours();
          arrayOfDays.push(hour);
        }
        return true;
      });
    }
    return occurrencesCalculator(arrayOfDays);
  };
  const occuranceObject = modifyArray();
  console.log(occuranceObject);
  const data = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];
  const chartRawArray = [];
  const dataRawGenerator = () => {
    for (const i of data) {
      const uvValue = checkOccuranceValue(occuranceObject, i-1);
      chartRawArray.push({
        Submissions: nameGenerator(i),
        Time: uvValue,
      });
    }
  };
  dataRawGenerator()
  return (
    <React.Fragment>
      <BackgroundLayout />
      <div className="pt-[5rem] h-full w-full overflow-x-auto">
        {props.graphData && (
          <LineChart width={800} height={400} data={chartRawArray}>
            <Line type="monotone" dataKey="Time" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="Submissions" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        )}
      </div>
    </React.Fragment>
  );
};

export default Graph;
