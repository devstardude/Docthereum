import React,{useState} from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  occurrencesCalculator,
  checkOccuranceValue,
  nameGenerator,
} from "./utils";
//import'./style.css';

const Graph = (props) => {
  const [day,setDay] = useState(3)
  const rawArray = props.graphData;
  const modifyArray = (arr) => {
    arr = rawArray;
    let arrayOfDays = [];
    if (arr !== null) {
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
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const chartRawArray = [];
  const dataRawGenerator = () => {
    for (const i of data) {
      const uvValue = checkOccuranceValue(occuranceObject, i - 1);
      chartRawArray.push({
        Submissions: nameGenerator(i),
        Time: uvValue,
      });
    }
  };
  dataRawGenerator();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <React.Fragment>
      <div className="flex justify-center items-center py-[3rem] h-full w-full overflow-x-auto">
        {props.graphData && (
          <div>
            <p className="flex justify-center items-center text-[24px] pb-[20px] text-gray-700 dark:text-gray-200 font-bold">
              Submissions - Time Graph ({day} of {month[new Date().getMonth()]})
            </p>
            <LineChart width={800} height={400} data={chartRawArray}>
              <Line type="monotone" dataKey="Time" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="Submissions" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Graph;
