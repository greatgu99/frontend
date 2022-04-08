import React, { useEffect, useState } from "react";

import * as echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/chart/pie";
import { initUnitSize } from "../../util/api";

export default function EchartsMemory(props) {
  let [main, setMain] = useState("");
  // var cpuName = props.cpudata.name;
  var placeHolderStyle = {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      color: "rgba(0,0,0,0)",
      borderWidth: 0
    },
    emphasis: {
      color: "rgba(0,0,0,0)",
      borderWidth: 0
    }
  };

  var dataStyle = {
    normal: {
      formatter: function(params) {
        // console.log(params.data.value, "params");
        let valueCenter = parseFloat(params.data.value);
        return ((valueCenter / 75) * 100).toFixed(2) + "%";
      },
      position: "center",
      show: true,
      textStyle: {
        fontSize: "30",
        fontWeight: "normal",
        color: "black"
      }
    }
  };

  const option = {
    title: [
      {
        text: "内存",
        subtext: props.memory
          ? initUnitSize(
              props.memory.total -
                (props.memory.free + props.memory.buffers + props.memory.cached)
            ).size +
            initUnitSize(
              props.memory.total -
                (props.memory.free + props.memory.buffers + props.memory.cached)
            ).unit +
            "/" +
            initUnitSize(props.memory.total).size +
            initUnitSize(props.memory.total).unit
          : "",
        left: "25%",
        top: "83%",
        textAlign: "center",
        textStyle: {
          fontWeight: "normal",
          fontSize: "20",
          color: "black",
          textAlign: "center"
        }
      },
      {
        text: "虚拟内存",
        subtext: props.memory
          ? initUnitSize(props.memory.swap_total - props.memory.swap_free)
              .size +
            initUnitSize(props.memory.swap_total - props.memory.swap_free)
              .unit +
            "/" +
            initUnitSize(props.memory.swap_total).size +
            initUnitSize(props.memory.swap_total).unit
          : "",
        left: "77%",
        top: "83%",
        textAlign: "center",
        textStyle: {
          color: "black",
          fontWeight: "normal",
          fontSize: "20",
          textAlign: "center"
        }
      }
    ],
    tooltip: {
      trigger: "item",
      formatter: function(value, index) {
        console.log(value);
        console.log(index, "index");
        if (props.memory && value.seriesName === "memory") {
          return (
            "已用内存：" +
            initUnitSize(
              props.memory.total -
                (props.memory.free + props.memory.buffers + props.memory.cached)
            ).size +
            initUnitSize(
              props.memory.total -
                (props.memory.free + props.memory.buffers + props.memory.cached)
            ).unit +
            "<br/>剩余内存：" +
            initUnitSize(
              props.memory.free + props.memory.buffers + props.memory.cached
            ).size +
            initUnitSize(
              props.memory.free + props.memory.buffers + props.memory.cached
            ).unit +
            "<br/>内存总量：" +
            initUnitSize(props.memory.total).size +
            initUnitSize(props.memory.total).unit
          );
        } else if (props.memory && value.seriesName === "virtualMemory") {
          return (
            "已用内存：" +
            initUnitSize(props.memory.swap_total - props.memory.swap_free)
              .size +
            initUnitSize(props.memory.swap_total - props.memory.swap_free)
              .unit +
            "<br/>剩余内存：" +
            initUnitSize(props.memory.swap_free).size +
            initUnitSize(props.memory.swap_free).unit +
            "<br/>内存总量：" +
            initUnitSize(props.memory.swap_total).size +
            initUnitSize(props.memory.swap_total).unit
          );
        }
      }
    },
    //第一个图表
    series: [
      {
        type: "pie",
        hoverAnimation: false, //鼠标经过的特效
        radius: ["83%", "98%"],
        center: ["25%", "55%"],
        startAngle: 225,
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            position: "center"
          }
        },
        data: [
          {
            value: 75,
            itemStyle: {
              normal: {
                color: ["rgba(176, 212, 251, 0.3)"]
              }
            }
          },
          {
            value: 25,
            itemStyle: placeHolderStyle
          }
        ]
      },
      //上层环形配置
      {
        type: "pie",
        name: "memory",
        hoverAnimation: false, //鼠标经过的特效
        radius: ["83%", "98%"],
        center: ["25%", "55%"],
        startAngle: 225,
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            position: "center"
          }
        },
        data: [
          {
            value: props.memory
              ? ((props.memory.total -
                  (props.memory.free +
                    props.memory.buffers +
                    props.memory.cached)) /
                  props.memory.total) *
                75
              : "",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00cefc"
                  },
                  {
                    offset: 1,
                    color: "#367bec"
                  }
                ])
              }
            },
            label: dataStyle
          },
          {
            value: props.memory
              ? 100 -
                ((props.memory.total -
                  (props.memory.free +
                    props.memory.buffers +
                    props.memory.cached)) /
                  props.memory.total) *
                  75
              : "",
            itemStyle: placeHolderStyle
          }
        ]
      },

      //第二个图表
      {
        type: "pie",
        hoverAnimation: false,
        radius: ["83%", "98%"],
        center: ["77%", "55%"],
        startAngle: 225,
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            position: "center"
          }
        },
        data: [
          {
            value: 75,
            itemStyle: {
              normal: {
                color: ["rgba(176, 212, 251, 0.3)"]
              }
            }
          },
          {
            value: 25,
            itemStyle: placeHolderStyle
          }
        ]
      },

      //上层环形配置
      {
        type: "pie",
        name: "virtualMemory",
        hoverAnimation: false,
        radius: ["83%", "98%"],
        center: ["77%", "55%"],
        startAngle: 225,
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            position: "center"
          }
        },
        data: [
          {
            value: props.memory
              ? ((props.memory.swap_total - props.memory.swap_free) /
                  props.memory.swap_total) *
                75
              : "",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#9FE6B8"
                  },
                  {
                    offset: 1,
                    color: "#32C5E9"
                  }
                ])
              }
            },
            label: dataStyle
          },
          {
            value: props.memory
              ? 100 -
                ((props.memory.swap_total - props.memory.swap_free) /
                  props.memory.swap_total) *
                  75
              : "",
            itemStyle: placeHolderStyle
          }
        ]
      }
    ]
  };
  useEffect(() => {
    var node = document.getElementById("main");
    setMain(node);
  }, []);
  // 基于准备好的dom，初始化echarts实例
  if (main !== "") {
    var myChart = echarts.init(main);
    myChart.resize({ height: "300px" });
    myChart.setOption(option);
  }
  // 绘制图表
  return <div id="main"></div>;
}
