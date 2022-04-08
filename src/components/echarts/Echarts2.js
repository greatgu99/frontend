import ReactECharts from "echarts-for-react";
import React, { useState, useEffect, useRef } from "react";
import echarts from "echarts";

export default function Echarts2(props) {
  const contentStyle = {
    //此处设置组件宽高， 设小了没用
    // height: '350px',
    width: "100%",
    textAlign: "center",
    jusifiContent: "center",
    background: "#fff",
  };

  const option = {
    series: [
      {
        name: "外部刻度",
        type: "gauge",
        radius: "100%",
        min: 0,
        max: 100,
        splitNumber: 10,
        startAngle: 245,
        endAngle: -65,
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 0,
            opacity: 0,
            color: [
              [0.19, "#088AD5"],
              [1, "#d9d9d9"],
            ],
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: true,
          splitNumber: 7,
          lineStyle: {
            color: "auto",
            width: 2,
          },
          length: 10,
        },
        splitLine: {
          show: true,
          length: 20,
          distance: 9,
          lineStyle: {
            color: "auto",
            width: 3,
          },
        },
        detail: {
          show: false,
        },
        pointer: {
          show: false,
        },
      },
      {
        name: "内部（环形）进度条",
        type: "gauge",
        radius: "70%",
        z: 4,
        startAngle: 245,
        endAngle: -65,
        axisLine: {
          lineStyle: {
            color: [[0.19, "#088AD5"]],
            width: 18,
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        pointer: {
          show: false,
        },
        title: {
          show: true,
          offsetCenter: ["0%", "20%"],
          fontSize: 16,
          color: "#fff",
          height: 26,
        },
        detail: {
          show: true,
          color: "#fff",
          fontSize: 36,
          offsetCenter: ["0%", "-10%"],
        },
        data: [
          {
            name: 202103,
            value: 19,
          },
        ],
      },
      {
        name: "内部（环形）进度条背景",
        type: "gauge",
        radius: "74%",
        z: 3,
        startAngle: 245,
        endAngle: -65,
        axisLine: {
          lineStyle: {
            color: [[1, "rgba(8, 138, 213, 0.08)"]],
            width: 36,
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        detail: {
          show: false,
        },
      },
      {
        type: "pie",
        radius: ["0", "46%"],
        itemStyle: {
          color: "#088AD5",
        },
        labelLine: {
          show: false,
        },
        hoverAnimation: false,
        data: [1],
      },
    ],
  };

  return (
    <div>
      <div style={contentStyle}>
        {/* echarts */}
        {/* <div>12313123123123</div> */}
        <ReactECharts option={option} />
        {/* 此处可设置表格宽高，高度默认300px */}
        {/* <ReactECharts  style={{width: '100%',height:'300px'}} option={options1} /> */}
      </div>
    </div>
  );
}
