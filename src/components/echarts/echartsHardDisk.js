import ReactECharts from "echarts-for-react";
import React, { useState, useEffect } from "react";
import "echarts-liquidfill/src/liquidFill.js";
import * as echarts from "echarts/lib/echarts";

export default function EchartsHardDisk(props) {
  const [options_List, setoptions_List] = useState({});
  useEffect(() => {
    setoptions_List({ ...option });
  }, []);
  const option = {
    // backgroundColor: "#181b22",
    title: [
      {
        text: props.top_disks ? props.top_disks.name : "",
        top: "-1%",
        left: "10%",
        x: "center",
        textStyle: {
          color: "#808080",
          fontSize: 24,
          fontWeight: "normal"
        }
      }
    ],
    polar: {
      radius: ["77%", "90%"],
      center: ["50%", "54%"]
    },
    angleAxis: {
      max: 100,
      clockwise: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        type: "liquidFill",
        data: [
          //已用
          0.6,
          {
            // 最外层波纹
            value: 0.4,
            direction: "left"
          }
        ],
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: "#6CDEFC"
              },
              {
                offset: 0,
                color: "#429BF7"
              }
            ],
            globalCoord: false
          }
        ],
        outline: {
          // 是否显示外圈
          show: false
        },
        // 大小
        radius: "80%",
        center: ["50%", "54%"],

        label: {
          normal: {
            formatter: function(value, index) {
              return (
                // 已用百分比
                // (percent * 100).toFixed(2)
                +"%" + "\n" + "\n" + "剩余容量：" + 1 + " GB"
              );
            },
            textStyle: {
              fontSize: "18",
              fontWeight: "400",
              color: "#8b8d90",
              textAlign: "center",
              textBorderColor: "rgba(0, 0, 0, 0)",
              textShadowColor: "#000",
              textShadowBlur: "0",
              textShadowOffsetX: 0,
              textShadowOffsetY: 1
            }
          }
        }
      },
      {
        name: "",
        type: "bar",
        roundCap: true,
        z: 2,
        showBackground: true,
        backgroundStyle: {
          color: "#e3f7ff"
        },
        // 外围进度条
        data: [90],
        coordinateSystem: "polar",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0.5, 1, [
              {
                offset: 0,
                color: "#5acef2"
              },
              {
                offset: 0.7,
                color: "#5073fb"
              },
              {
                offset: 1,
                color: "#6ae8d8"
              }
            ])
          }
        }
      }
    ]
  };

  // 绘制图表
  return (
    <div>
      <ReactECharts option={options_List} />
    </div>
  );
}
