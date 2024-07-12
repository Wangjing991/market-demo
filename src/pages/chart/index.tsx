import { useEffect, useRef, useState } from "react";
import HQChart from "hqchart";
import dzhYunQuery from "@/common/dzhYunJs";

export const transformKLineData = (data: any[]): any[] => {
  return (
    data?.map(
      ({
        ShiJian,
        KaiPanJia,
        ZuiGaoJia,
        ZuiDiJia,
        ShouPanJia,
        ChengJiaoLiang,
        ChengJiaoE,
        ...restProps
      }) => ({
        open: KaiPanJia,
        close: ShouPanJia,
        high: ZuiGaoJia,
        low: ZuiDiJia,
        volume: ChengJiaoLiang,
        turnover: ChengJiaoE,
        timestamp: +`${ShiJian}000`,
        ...restProps,
      })
    ) || []
  );
};

export default function IndexPage() {
  const tableRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  useEffect(() => {
    if (!tableRef.current) return;
    const option = {
      Type: "分钟走势图", //创建图形类型
      //Type:'分钟走势图横屏',

      //窗口指标
      Windows: [{ Index: "MACD", Modify: false, Change: false, Close: false }],

      Symbol: "AAPL.usa",
      IsAutoUpdate: false, //是自动更新数据
      AutoUpdateFrequency: 20000,
      DayCount: 1, //1 最新交易日数据 >1 多日走势图
      IsShowRightMenu: false, //是否显示右键菜单
      //CorssCursorTouchEnd:true,

      CorssCursorInfo: { Left: 1, Right: 1 },

      MinuteLine: {
        IsDrawAreaPrice: true, //是否画价格面积图
        IsShowAveragePrice: true, //不显示均线
      },

      //边框
      Border: {
        Left: 40, //左边间距
        Right: 40, //右边间距
        Top: 25,
        Bottom: 25,
        AutoRight: { Blank: 10, MinWidth: 40 },
        AutoLeft: { Blank: 10, MinWidth: 40 },
      },

      //子框架设置
      Frame: [{ SplitCount: 5 }, { SplitCount: 3 }],

      //扩展图形
      ExtendChart: [
        //{Name:'MinuteTooltip' }  //手机端tooltip
      ],
    };
    if (chartRef.current) return;

    option.Symbol = "minute";
    option.NetworkFilter = (data, callback) => {
      // this.NetworkFilter(data, callback);
      dzhYunQuery().subscribe(
        "/quote/kline",
        {
          obj: "SH000001",
          period: "30min",
          start: 1,
          split: 0,
        },
        (result: any, counter: any, code: any, desc: any) => {
          const newData = transformKLineData(result[0].Data);
          if (counter === 1) {
            // chart.applyNewData(newData);
          } else {
            // chart.updateData(newData[0]);
          }
          // console.log('newData', newData);
          // console.log('counter', counter);
        }
        /* false, */
      );
    }; //网络请求回调函数

    var chart = HQChart.Chart.JSChart.Init(tableRef.current);
    chart.SetOption(option);
    chartRef.current = chart;
    console.log("chart");
  }, [tableRef.current]);

  return <div className="container" ref={tableRef}></div>;
}
