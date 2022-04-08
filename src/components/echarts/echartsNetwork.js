import ReactECharts from "echarts-for-react";
import React, { useState, useEffect, useRef } from "react";
import echarts from "echarts";
import { getHMS2, initUnitSize, initUnitSize2 } from "../../util/api";
export default function EchartsNetWork(props) {
  const [xAxisData, setxAxisData] = useState([]);
  const [seriesDatakb_rx, setSeriesDatakb_rx] = useState([]); //存储rx的数组
  const [seriesDatakb_tx, setSeriesDatakb_tx] = useState([]); //存储tx的数组
  const [count, setCount] = useState(0);
  const [options1, setOptions1] = useState({});
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  useEffect(() => {
    setOptions1({ ...option });
  }, []);

  // useEffect(() => {
  //   setCount(0);
  // }, [props.network]);

  useEffect(() => {
    if (count === 0) {
      // console.log(props);
      let optiont = {};
      let t1 = [],
        t2 = [],
        t3 = [];
      if (props.network !== undefined) {
        optiont = { ...option };
        xAxisData.push(getHMS2(props.network.ts));
        seriesDatakb_rx.push(props.network.kb_rx);
        seriesDatakb_tx.push(props.network.kb_tx);
        t1 = xAxisData.slice(Math.max(0, xAxisData.length - 31));
        t2 = seriesDatakb_rx.slice(Math.max(0, seriesDatakb_rx.length - 31));
        t3 = seriesDatakb_tx.slice(Math.max(0, seriesDatakb_tx.length - 31));
        // console.log(t1, t2, t3);
        // optiont.xAxis.data = [...xAxisData, getHMS2(props.network.ts)];
        // optiont.series[0]["data"] = [...seriesDatakb_rx, props.network.kb_rx]; //第一条折线
        // optiont.series[1]["data"] = [...seriesDatakb_tx, props.network.kb_tx]; //第二条折线
        optiont.xAxis.data = [...t1];
        optiont.series[0]["data"] = [...t2]; //第一条折线
        optiont.series[1]["data"] = [...t3]; //第二条折线
      }
      let maxSetSeriesDatakb_rx = 0;
      let maxSetSeriesDatakb_tx = 0;
      t2.map((item) => {
        maxSetSeriesDatakb_rx = Math.max(maxSetSeriesDatakb_rx, item);
      });
      t3.map((item) => {
        maxSetSeriesDatakb_tx = Math.max(maxSetSeriesDatakb_tx, item);
      });
      // console.log(maxSetSeriesDatakb_rx);

      if (maxSetSeriesDatakb_rx > 1073741824) {
        setNum1(3);
      } else if (maxSetSeriesDatakb_rx > 1048576) {
        setNum1(2);
      } else if (maxSetSeriesDatakb_rx > 1024) {
        setNum1(1);
      } else {
        setNum1(0);
      }
      if (maxSetSeriesDatakb_tx > 1073741824) {
        setNum2(3);
      } else if (maxSetSeriesDatakb_tx > 1048576) {
        setNum2(2);
      } else if (maxSetSeriesDatakb_tx > 1024) {
        setNum2(1);
      } else {
        setNum2(0);
      }
      setxAxisData([...t1]);
      setSeriesDatakb_rx([...t2]);
      setSeriesDatakb_tx([...t3]);
      setOptions1({ ...optiont });

    }
  }, [props]);

  const contentStyle = {
    //此处设置组件宽高， 设小了没用
    // height: '350px',
    width: "100%",
    textAlign: "center",
    jusifiContent: "center",
    background: "#fff",
  };

  const option = {
    legend: {
      align: "left",
      left: "center",
      top: "10%",
      type: "plain",
      textStyle: {
        color: "#004",
        fontSize: 16,
      },
      // icon:'rect',
      itemGap: 25,
      itemWidth: 18,
      icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",

      data: [
        {
          name: "读取速度",
        },
        {
          name: "发送速度",
        },
      ],
    },
    tooltip: {
      trigger: "axis",

      formatter: function (params) {
        let str = params[0].name + "<br />";
        str += '<div style="text-align:left">';

        params.forEach((item) => {
          const sizeInit = initUnitSize(item.data);
          str +=
            '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:';
          if (item.seriesName === "读取速度") {
            str += "rgba(70,164,150,1)";
          } else {
            str += "rgba(25,163,223,1)";
          }
          str +=
            '"></span>' +
            item.seriesName +
            " : " +
            sizeInit.size +
            sizeInit.unit +
            "/s<br />";
        });
        str += "</div>";
        return str;
      },
    },
    xAxis: {
      offset: 10,
      boundaryGap: ["60%", "60%"],
      data: [],
      // show: false,
      axisLabel: {
        interval: 5,
        // rotate: 30, //x轴显示时间内容倾斜
        show: true,
        textStyle: {
          color: "#004", //字体颜色
        },
      },
      axisLine: {
        lineStyle: {
          width: 1,
          color: "#ccc",
        },
      },
    },
    grid: {
      bottom: "20%",
    },
    yAxis: [
      {
        offset: 2,
        name: "读取速度(" + initUnitSize2(0, num1).unit + "/s)",
        nameTextStyle: {
          // color: "#004",
          color: "rgba(55,130,119,1)",
          fontSize: 16,
          align: "center",
          padding: 10,
        },
        boundaryGap: true,

        show: true,
        type: "value",
        axisLabel: {
          // formatter:'{value}KB/s',
          formatter: function (params) {
            let str = "";
            const sizeInit = initUnitSize2(params, num1);
            str = sizeInit.size;
            return str;
          },
          show: true,
          textStyle: {
            // color: "#004"
            color: "rgba(55,130,119,1)",
          },
        },
        axisLine: {
          show: true, //是否显示y轴
          lineStyle: {
            width: 1,
            color: "#ccc", //y轴颜色
          },
        },
        splitLine: {
          show: false,
          // show:true
        },
      },
      {
        offset: 2,
        // position:'right',
        name: "下载速度(" + initUnitSize2(0, num2).unit + "/s)",
        nameTextStyle: {
          color: "rgba(25,163,223,1)",
          fontSize: 16,
          align: "center",
          padding: 10,
        },
        boundaryGap: true,

        show: true,
        type: "value",
        axisLabel: {
          // formatter:'{value}KB/s',
          formatter: function (params) {
            let str = "";
            const sizeInit = initUnitSize2(params, num2);
            str = sizeInit.size;
            return str;
          },
          show: true,
          textStyle: {
            color: "rgba(25,163,223,1)",
          },
        },
        axisLine: {
          show: true, //是否显示y轴
          lineStyle: {
            width: 1,
            color: "#ccc", //y轴颜色
          },
        },
        splitLine: {
          show: false,
          // show:true
        },
      },
    ],
    series: [
      {
        name: "读取速度",
        type: "line",
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 2,
            color: "rgba(55,130,119,1)", // 线条颜色
          },
          borderColor: "rgba(0,0,0,.4)",
        },
        itemStyle: {
          color: "rgba(55,130,119,1)",
          borderColor: "#646ace",
          borderWidth: 2,
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(55,130,119,.3)",
                },
                {
                  offset: 1,
                  color: "rgba(55,130,119, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(55,130,119, 0.5)", //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        // markLine: {
        //   data: [{ type: "average", name: "平均值" }]
        // }
      },
      {
        name: "发送速度",
        type: "line",
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        yAxisIndex: 1,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 2,
            color: "rgba(25,163,223,1)", // 线条颜色
          },
          borderColor: "rgba(0,0,0,.4)",
        },
        itemStyle: {
          color: "rgba(25,163,223,1)",
          borderColor: "#646ace",
          borderWidth: 2,
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(25,163,223,.3)",
                },
                {
                  offset: 1,
                  color: "rgba(25,163,223, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        // markLine: {
        //   data: [{ type: "average", name: "平均值" }]
        // }
      },
    ],
  };

  return (
    <div>
      <div style={contentStyle}>
        {/* title */}
        <h4 style={{ color: "#007", fontSize: "18px" }}>
          网络设备：{props.network.device}
        </h4>
        {/* echarts */}
        <ReactECharts option={options1} />
        {/* 此处可设置表格宽高，高度默认300px */}
        {/* <ReactECharts  style={{width: '100%',height:'300px'}} option={options1} /> */}
      </div>
    </div>
  );
}
