import ReactECharts from "echarts-for-react";
import React, { useState, useEffect } from "react";

export default function EchartsCPU(props) {
  const [options1, setOptions1] = useState({});
  useEffect(() => {
    setOptions1({ ...option });
  }, [props.cpudata]);
  let colors = ["#67E0E3", "#37A2DA", "#FD666D"];
  const option = {
    title: {
      text: props.cpudata ? props.cpudata.name + ":" : "",
      top: "-1%",
      left: "10%",
      x: "center",
      textStyle: {
        color: "#808080",
        fontSize: 22,
        fontWeight: "normal"
      }
    },
    series: [
      {
        // name: 'CPU使用率',
        type: "gauge",
        center: ["50%", "58%"], // 仪表位置
        radius: "100%", //仪表大小
        min: 0,
        max: 100,
        axisLine: {
          // 仪表盘
          lineStyle: {
            width: 20,
            color: [[0.3, colors[0]], [0.7, colors[1]], [1, colors[2]]]
          }
        },
        splitLine: {
          // 分隔线样式
          length: "12%"
        },
        axisTick: {
          // 刻度样式
          show: false
        },
        axisLabel: {
          // 刻度标签
          fontSize: 16,
          fontWeight: "bold",
          distance: 10
        },
        pointer: {
          // 仪表盘指针
          icon: "none",
          width: 10,
          length: "70%"
        },
        markPoint: {
          // 仪表盘指针圆
          animation: false,
          silent: true,
          data: [
            {
              x: "50%",
              y: "57%",
              symbol: "circle",
              symbolSize: 50
            },
            {
              x: "50%",
              y: "57%",
              symbol: "circle",
              symbolSize: 30,
              itemStyle: {
                color: "#fff"
              }
            }
          ]
        },
        detail: {
          // 仪表盘 显示数据
          formatter: function(params) {
            console.log(typeof params, "params");
            return "使用率：" + params.toFixed(2) + "%";
          },
          fontSize: 14,
          fontWeight: "bold"
        },
        data: [
          {
            value: props.cpudata
              ? props.cpudata.smode + props.cpudata.umode
              : ""
          }
        ]
      }
    ]
  };

  // 绘制图表
  return (
    <div>
      <ReactECharts option={options1} />
    </div>
  );
}
