import { useEffect, useRef, useState } from "react";

import { ListTable, VTable } from "@visactor/react-vtable";
import "./index.module.less";
let count = 1;
let animateData = [
  { col: 1, row: 2 },
  { col: 1, row: 3 },
  { col: 1, row: 4 },
  { col: 1, row: 5 },
];
const option = {
  columns: [
    {
      field: "0",
      caption: "name",
      width: "150",
    },
    {
      field: "1",
      caption: "age",
      width: "150",
      sort: true,
      style: (args) => {
        // console.log("data----", count++, args);
        // console.log(args);

        if (args.value > 10) return { color: "red", bgColor: "#fff" };

        if (args.value > 5) return { color: "#fff", bgColor: "red" };
        return { color: "green", bgColor: "rgba(241,177,19,1)" };
      },
    },
    {
      field: "2",
      caption: "gender",
      width: "150",
      sort: true,
    },
    {
      field: "3",
      caption: "hobby",
      width: "150",
    },
    {
      field: "4",
      caption: "index",
      width: "150",
    },
    {
      field: "5",
      caption: "age",
      width: "150",
    },
    {
      field: "6",
      caption: "gender",
      width: "150",
    },
    {
      field: "7",
      caption: "hobby",
      width: "150",
    },
    {
      field: "8",
      caption: "index",
      width: "150",
    },
    {
      field: "9",
      caption: "age",
      width: "150",
    },
    {
      field: "10",
      caption: "gender",
      width: "150",
    },
    {
      field: "11",
      caption: "hobby",
      width: "350",
    },
    {
      field: "12",
      caption: "index",
    },
    {
      field: "13",
      caption: "hobby",
    },
    {
      field: "14",
      caption: "hobby",
    },
    {
      field: "15",
      caption: "hobby",
    },
    {
      field: "16",
      caption: "hobby",
    },
    {
      field: "17",
      caption: "hobby",
    },
    {
      field: "18",
      caption: "hobby",
      style: (args) => {
        // console.log(args);
        if (args.value > 3) return { color: "red", bgColor: "#fff" };
        if (args.value === 0)
          return { color: "green", bgColor: "rgba(241,177,19,0.5)" };
        // if (args.value > 5) return { color: "#fff", bgColor: "red" };
        return { color: "green", bgColor: "rgba(241,177,19,1)" };
      },
    },
  ],
};
const generateRandomData = () => {
  return new Array(10000).fill(null).map((_, index) => [
    `${index}John `,
    Math.floor(Math.random() * 100), // Random age between 0 and 99
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "🏀" : "🎾",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.random() > 0.5 ? "male" : "female",
    Math.floor(Math.random() * 20), // Random age between 0 and 99
  ]);
};

export default function IndexPage() {
  const tableRef = useRef<any>(null);

  const [data, setData] = useState(generateRandomData());
  useEffect(() => {
    let data = generateRandomData();
    let count = 0;
    let timer = null;
    setInterval(() => {
      timer && clearInterval(timer);
      // animateData = [];
      count = 0;

      // 数据量达到 4000左右页面就会卡顿使用setRecords 不会卡顿
      const newData = generateRandomData().slice(0, 10000);
      // tableRef.current &&
      //   tableRef.current.updateRecords(
      //     newData,
      //     newData.map((it, idx) => idx)
      //   );
      //使用setRecords 不会卡顿
      tableRef.current && tableRef.current.setRecords(newData);
      const range = tableRef.current.getBodyVisibleRowRange();
      // console.log(range, "range----");
      const rowStart = range.rowStart - 100;
      const rowEnd = range.rowEnd + 100;
      newData.forEach((it, idx) => {
        if (idx > rowStart && idx < rowEnd) {
          const cellGroup = tableRef.current.scenegraph.highPerformanceGetCell(
            3,
            idx + 1
          );
          const cellGroup1 = tableRef.current.scenegraph.highPerformanceGetCell(
            4,
            idx + 1
          );
          const cellGroup2 = tableRef.current.scenegraph.highPerformanceGetCell(
            5,
            idx + 1
          );
          // console.log(cellGroup);
          cellGroup.setAttribute("fill", "green");
          cellGroup.animate().wait(500).to({ fill: "#fff" }, 800, "linear");
          cellGroup1.setAttribute("fill", "green");
          cellGroup1.animate().wait(500).to({ fill: "#fff" }, 800, "linear");
          cellGroup2.setAttribute("fill", "green");
          cellGroup2.animate().wait(500).to({ fill: "#fff" }, 800, "linear");
        }

        // cellGroup.animate().wait(500).to({ opacity: 1 }, duration, "linear");
        //
        // }
      });
    }, 3000000);
    // setInterval(() => {
    //   console.log(document.activeElement);
    //   // document.querySelector(".input-container").draggable = true;
    // }, 1000);

    // console.log(tableRef);
  }, []);
  console.log(data);

  return (
    <div className="container">
      <div className="content">
        <ListTable
          ref={tableRef}
          option={{
            ...option,
            records: data,
            frozenColCount: 2,
            widthMode: "standard",
            hover: { highlightMode: "row" },
            select: {
              highlightMode: "row",
            },
            renderOption: {
              autoRender: true,
            },
            // animationAppear: true,
            customCellStyle: [
              {
                id: "custom-1",
                style: {
                  bgColor: "rgba(241,177,19,0.8)",
                },
              },
              {
                id: "custom-2",
                style: {
                  bgColor: "rgba(241,177,19,0.6)",
                },
              },
              {
                id: "custom-3",
                style: {
                  bgColor: "rgba(241,177,19,0.5)",
                },
              },
              {
                id: "custom-4",
                style: {
                  bgColor: "rgba(241,177,19,0.4)",
                },
              },
              {
                id: "custom-5",
                style: {
                  bgColor: "rgba(241,177,19,0.3)",
                },
              },
              {
                id: "custom-6",
                style: {
                  bgColor: "#fff",
                },
              },
            ],
            theme: VTable.themes.DEFAULT.extends({
              scrollStyle: {
                visible: "always",
              },
            }),
          }}
          height={900}
        />
      </div>
      <div className="bottom">
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
      </div>
    </div>
  );
}
