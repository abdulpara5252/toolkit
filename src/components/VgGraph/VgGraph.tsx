import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from "react";
import ReactApexChart from "react-apexcharts";
import "./VgGraph.scss";
import VgTableGrid from "../VgTables/VgTableGrid";

type SeriesItem = {
  name?: string;
  data?: any[];
  type?: string;
};

type GraphDataItem = {
  series: number[] | SeriesItem[];
  labels?: any[];
  colors?: string[];
  name?: string;
  total?: string;
  growth?: string;
  growthText?: string;
  edit?: boolean;
  order?: string;
  title?: string;
  tooltip?: boolean
  totalText?: string;
};

// New interface for data label formatting
interface PrefixPostFix {
  prefix?: string;
  suffix?: string;
  enabled?: boolean;
}

export interface VgGraphProps {
  GraphType?: "bar" | "stackedbar" | "horizontalbar" | "groupedbar" | "area" | "donut" | "line" | "linebar" | "pie";
  Size?: "x-small" | "small" | "medium" | "large"
  [key: string]: any;
  GraphData?: GraphDataItem[];
  DataPointSelection?: (event: any, chartContext: any, config: any) => void;
  ShowLegend?: boolean;
  PrefixPostFix?: PrefixPostFix;
  DataPointMouseEnter?: (event: any, chartContext: any, config: any) => void;
  DataPointMouseLeave?: (event: any, chartContext: any, config: any) => void;
  XAxisLabelClick?: (event: any, chartContext: any, config: any) => void;
  Selection?: (event: any, chartContext: any, config: any) => void;
  GraphTab?: boolean;
  ShowDataLabelText?: boolean;
  ShowYaxisLabels?: boolean;
  LinkLabelText?: string;
  OnClick?: () => void;
}

interface VgGraphRef {
  validate: () => any;
}

const VgGraph: React.FC<VgGraphProps> = forwardRef<
  VgGraphRef,
  VgGraphProps
>(
  (
    {
      GraphType = "",
      Size = "",
      GraphData,
      DataPointSelection,
      ShowLegend,
      PrefixPostFix,
      DataPointMouseEnter,
      DataPointMouseLeave,
      XAxisLabelClick,
      Selection,
      GraphTab = false,
      ShowDataLabelText,
      ShowYaxisLabels = true,
      LinkLabelText,
      OnClick,
    },
    ref
  ) => {
    const [chartOptions, setChartOptions] = useState<ApexCharts.ApexOptions>(
      {}
    );
    const [seriesDataUpdate, setSeriesUpdate] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'Chart View' | 'Grid View'>('Chart View');

    const labelCount = GraphData?.[0]?.labels?.length || 0;
    const estimatedLabelWidth = 60; // estimated average px width per label
    const chartWidth = document.getElementById("chart-container")?.offsetWidth || 200; // fallback

    const totalLabelWidth = labelCount * estimatedLabelWidth;
    const shouldRotate = totalLabelWidth > chartWidth;

    const getApexChartType = (graphType: NonNullable<VgGraphProps['GraphType']>): ApexChart['type'] => {
      switch (graphType) {
        case 'linebar':
          return 'line';
        case 'stackedbar':
        case 'bar':
        case 'groupedbar':
        case 'horizontalbar':
          return 'bar';
        default:
          return graphType as ApexChart['type'];
      }
    };

    useEffect(() => {
      const updateSeriesData = () => {
        if (GraphData && Array.isArray(GraphData) && GraphData.length > 0) {
          // Handle different graph types
          switch (GraphType) {
            case "bar":
              const barSeries = Array.isArray(GraphData[0].series)
                ? (GraphData[0]?.series).map((item: any) => ({
                  name: item.name || "",
                  data: Array.isArray(item.data) ? item.data : [],
                }))
                : [];
              setSeriesUpdate(barSeries);
              break;
            case "stackedbar":
              const columnSeries = Array.isArray(GraphData[0].series)
                ? (GraphData[0]?.series).map((item: any) => ({
                  name: item.name || "",
                  data: Array.isArray(item.data) ? item.data : [],
                }))
                : [];
              setSeriesUpdate(columnSeries);
              break;
            case "horizontalbar":
              const horizontalbarSeries = Array.isArray(GraphData[0].series)
                ? (GraphData[0]?.series).map((item: any) => ({
                  name: item.name || "",
                  data: Array.isArray(item.data) ? item.data : [],
                }))
                : [];
              setSeriesUpdate(horizontalbarSeries);
              break;
            case "groupedbar":
              const groupedbarSeries = Array.isArray(GraphData[0].series)
                ? (GraphData[0]?.series).map((item: any) => ({
                  name: item.name || "",
                  data: Array.isArray(item.data) ? item.data : [],
                }))
                : [];
              setSeriesUpdate(groupedbarSeries);
              break;
            case "area":
              const areaSeries = Array.isArray(GraphData[0].series)
                ? GraphData[0].series.map((item: any) => ({
                  name: item.name || "",
                  data: Array.isArray(item.data) ? item.data : [],
                }))
                : [];
              setSeriesUpdate(areaSeries);
              break;
            case "donut":
              setSeriesUpdate(GraphData[0]?.series || []);
              break;
            case "pie":
              setSeriesUpdate(GraphData[0]?.series || []);
              break;
            case "line":
              const lineSeries = Array.isArray(GraphData[0].series)
                ? GraphData[0].series.map((item: any) => ({
                  name: item.name || "",
                  data: Array.isArray(item.data) ? item.data : [],
                }))
                : [];
              setSeriesUpdate(lineSeries);
              break;
            case "linebar":
              const graphSeries = Array.isArray(GraphData[0]?.series)
                ? GraphData[0]?.series.map((item: any) => ({
                  name: item.name || "",
                  data: Array.isArray(item.data) ? item.data : [],
                  type: item.type || "column",
                }))
                : [];
              setSeriesUpdate(graphSeries);
              break;
            default:
              setSeriesUpdate([]);
          }
        } else {
          setSeriesUpdate([]);
        }
      };

      updateSeriesData();
    }, [GraphType, GraphData]);

    useEffect(() => {
      const getChartOptions = (): ApexCharts.ApexOptions => {
        switch (GraphType) {
          case "bar":
            return {
              chart: {
                height: "100%",
                width: "100%",
                toolbar: { show: false },
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    DataPointSelection?.(event, chartContext, config);
                  },
                  dataPointMouseEnter: (event, chartContext, opts) => {
                    DataPointMouseEnter?.(event, chartContext, opts);
                  },
                  dataPointMouseLeave: (event, chartContext, opts) => {
                    DataPointMouseLeave?.(event, chartContext, opts);
                  },
                  xAxisLabelClick: function (event, chartContext, opts) {
                    XAxisLabelClick?.(event, chartContext, opts);
                  },
                  selection: function (chartContext, { xaxis, yaxis }) {
                    Selection?.(chartContext);
                  }
                },
              },
              colors: GraphData?.[0]?.colors,
              xaxis: {
                categories:
                  GraphData[0]?.labels?.length > 0
                    ? GraphData?.[0]?.labels
                    : [],
                labels: {
                  show: GraphData[0]?.labels?.length > 0 ? true : false,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#6d6e6f"],
                  },
                rotate: shouldRotate ? -45 : 0,
                rotateAlways: shouldRotate,
                hideOverlappingLabels: false,
                maxHeight: 120,
                },
                crosshairs: { opacity: 0, },
                axisTicks: { show: false },
                axisBorder: { show: false },
              },
              yaxis: {
                show: true,
                labels: {
                  show: ShowYaxisLabels ,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "200",
                    colors: ["#6d6e6f"],
                    cssClass: "",
                  },
                  formatter: function (val) {
                    if (typeof val === 'number') {
                      return val % 1 === 0
                        ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`
                        : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                    }
                    return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                  },
                },
                axisBorder: {
                  show: false,
                  color: "#6b6b6b",
                },
                axisTicks: { show: false },
              },
              legend: {
                show: true,
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 6,
                  distributed: true,
                  dataLabels: {
                    position: "top",
                  },
                  borderRadiusApplication: 'end',
                },
              },
              fill: { opacity: 1 },
              grid: {
                show: true,
                borderColor: "#e0e0e0",
                strokeDashArray: 4,
                position: 'back',
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  if (typeof val === 'number') {
                    return val % 1 === 0
                      ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`
                      : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                  }
                  return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                },
                offsetY: -20,
                style: {
                  fontSize: "12px",
                  colors: ["#6d6e6f"],
                  fontFamily: "proxima-nova",
                },
              },
              tooltip: {
                enabled: true,
                x: {
                  show: false,
                },
                style: {
                  fontFamily: "proxima-nova"
                },            
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  dataLabels: {
                    enabled: true,
                    offsetX: 12,
                    offsetY: 0,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                    }
                  },
                }
              }],
            };

          case "stackedbar":
            return {
              chart: {
                height: "100%",
                width: "100%",
                toolbar: { show: false },
                stacked: true,
                zoom: {
                  enabled: false,
                },
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    DataPointSelection?.(event, chartContext, config);
                  },
                  // Triggered when the mouse enters a data point
                  dataPointMouseEnter: (event, chartContext, opts) => {
                    DataPointMouseEnter?.(event, chartContext, opts);
                  
                    const { dataPointIndex } = opts;
                    // Highlight all stacks for the hovered dataPointIndex
                    document.querySelectorAll(".apexcharts-series").forEach((seriesElement) => {
                        const stackElement = seriesElement.querySelector(
                          `.apexcharts-bar-area:nth-child(${dataPointIndex + 1})`
                        );
                        if (stackElement) {
                          stackElement.classList.add("highlighted");
                        }
                    });
                  },
                  // Triggered when the mouse leaves a data point
                  dataPointMouseLeave: (event, chartContext, opts) => {
                    DataPointMouseLeave?.(event, chartContext, opts);

                    const { dataPointIndex } = opts;
                    // Reset styles for all stacks for the hovered dataPointIndex
                    document.querySelectorAll(".apexcharts-series").forEach((seriesElement) => {
                      const stackElement = seriesElement.querySelector(
                        `.apexcharts-bar-area:nth-child(${dataPointIndex + 1})`
                      );
                      if (stackElement) {
                        stackElement.classList.remove("highlighted");
                      }
                    });
                  },
                  xAxisLabelClick: function (event, chartContext, opts) {
                    XAxisLabelClick?.(event, chartContext, opts);
                  },
                  selection: function (chartContext, { xaxis, yaxis }) {
                    Selection?.(chartContext);
                  }
                },
              },
              colors: GraphData?.[0]?.colors,
              xaxis: {
                categories:
                  GraphData[0]?.labels?.length > 0
                    ? GraphData?.[0]?.labels
                    : [],
                labels: {
                 show: GraphData[0]?.labels?.length > 0 ? true : false,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#6d6e6f"],
                  },
                },
                crosshairs: { opacity: 0, },
                axisTicks: { show: false },
                axisBorder: { show: false },
                offsetX: 0
              },
              yaxis: {
                show: true,
                labels: {
                  show: ShowYaxisLabels,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#6d6e6f"],
                  },
                  formatter: function (value) {
                    return `${Math.round(value)}`;
                  },
                },
                axisBorder: {
                  show: false,
                  color: "#6b6b6b",
                },
                axisTicks: { show: false },
              },
              grid: { show: true, borderColor: "#e0e0e0", strokeDashArray: 4 },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  if (typeof val === 'number') {
                    return val % 1 === 0
                      ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`  // Whole number
                      : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`; // Decimal number
                  }
                  return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                },
                style: {
                  fontFamily: "proxima-nova",
                  fontSize: "12px",
                  fontWeight: "600px",
                  colors: ["#ffffff"],
                },
              },
              legend: {
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 5,
                  borderRadiusApplication: 'end',
                },
              },
              states: {
                hover: {
                  filter: {
                    type: 'none',
                  }
                }
              },
              fill: { opacity: 1 },
              tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                x: {
                  show: false,
                },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  xaxis: {
                    labels: {
                      show: true,
                      rotate: 0,
                      rotateAlways: true,
                    },
                    axisTicks: { show: false },
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                    }
                  },
                }
              }],
            };

          case "horizontalbar":
            return {
              chart: {
                height: "100%",
                width: "100%",
                toolbar: { show: false },
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    DataPointSelection?.(event, chartContext, config);
                  },
                  dataPointMouseEnter: (event, chartContext, opts) => {
                    DataPointMouseEnter?.(event, chartContext, opts);
                  },
                  dataPointMouseLeave: (event, chartContext, opts) => {
                    DataPointMouseLeave?.(event, chartContext, opts);
                  },
                  xAxisLabelClick: function (event, chartContext, opts) {
                    XAxisLabelClick?.(event, chartContext, opts);
                  },
                  selection: function (chartContext, { xaxis, yaxis }) {
                    Selection?.(chartContext);
                  }
                },
              },
              colors: GraphData?.[0]?.colors,
              xaxis: {
                categories:
                  GraphData[0]?.labels?.length > 0
                    ? GraphData?.[0]?.labels
                    : [],
                labels: {
                  show: GraphData[0]?.labels?.length > 0 ? true : false,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#6d6e6f"],
                  },
                },
                axisTicks: { show: false },
                axisBorder: { show: false },
              },
              yaxis: {
                show: true,
                labels: {
                  show: ShowYaxisLabels,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#6d6e6f"],
                  },
                },
                axisBorder: {
                  show: false,
                  color: "#6b6b6b",
                },
                axisTicks: { show: false },
              },
              legend: {
                show: true,
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  borderRadius: 6,
                  distributed: true,
                  dataLabels: {
                    position: "top",
                  },
                  borderRadiusApplication: 'end',
                },
              },
              grid: { show: true, borderColor: "#e0e0e0", strokeDashArray: 4 },
              fill: { opacity: 1 },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  if (typeof val === 'number') {
                    return val % 1 === 0
                      ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`
                      : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                  }
                  return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                },
                offsetY: 0,
                offsetX: 13,
                style: {
                  fontSize: "12px",
                  colors: ["#6d6e6f"],
                  fontFamily: "proxima-nova",
                },
              },
              tooltip: {
                enabled: true,
                x: {
                  show: false,
                },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  dataLabels: {
                    enabled: true,
                    offsetX: 12,
                    offsetY: 0,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                    }
                  },
                }
              }],
            };

          case "groupedbar":
            return {
              chart: {
                height: "100%",
                width: "100%",
                toolbar: { show: false },
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    DataPointSelection?.(event, chartContext, config);
                  },
                  // Triggered when the mouse enters a data point
                  dataPointMouseEnter: (event, chartContext, opts) => {
                    DataPointMouseEnter?.(event, chartContext, opts);
                  
                    const { dataPointIndex } = opts;
                    // Highlight all stacks for the hovered dataPointIndex
                    document.querySelectorAll(".apexcharts-series").forEach((seriesElement) => {
                        const stackElement = seriesElement.querySelector(
                          `.apexcharts-bar-area:nth-child(${dataPointIndex + 1})`
                        );
                        if (stackElement) {
                          stackElement.classList.add("highlighted");
                        }
                    });
                  },
                  // Triggered when the mouse leaves a data point
                  dataPointMouseLeave: (event, chartContext, opts) => {
                    DataPointMouseLeave?.(event, chartContext, opts);

                    const { dataPointIndex } = opts;
                    // Reset styles for all stacks for the hovered dataPointIndex
                    document.querySelectorAll(".apexcharts-series").forEach((seriesElement) => {
                      const stackElement = seriesElement.querySelector(
                        `.apexcharts-bar-area:nth-child(${dataPointIndex + 1})`
                      );
                      if (stackElement) {
                        stackElement.classList.remove("highlighted");
                      }
                    });
                  },
                  xAxisLabelClick: function (event, chartContext, opts) {
                    XAxisLabelClick?.(event, chartContext, opts);
                  },
                  selection: function (chartContext, { xaxis, yaxis }) {
                    Selection?.(chartContext);
                  }
                },
              },
              colors: GraphData?.[0]?.colors,
              xaxis: {
                categories:
                  GraphData[0]?.labels?.length > 0
                    ? GraphData?.[0]?.labels
                    : [],
                labels: {
                  show: GraphData[0]?.labels?.length > 0 ? true : false,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#6d6e6f"],
                  },
                },
                crosshairs: { opacity: 0, },
                axisTicks: { show: false },
                axisBorder: { show: false },
              },
              yaxis: {
                show: true,
                labels: {
                  show: ShowYaxisLabels,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#6d6e6f"],
                  },
                },
                axisBorder: {
                  show: false,
                  color: "#6b6b6b",
                },
                axisTicks: { show: false },
              },
              legend: {
                show: true,
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 6,
                  dataLabels: {
                    position: "top",
                  },
                  borderRadiusApplication: 'end',
                },
              },
              grid: { show: true, borderColor: "#e0e0e0", strokeDashArray: 4 },
              fill: { opacity: 1 },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  if (typeof val === 'number') {
                    return val % 1 === 0
                      ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`
                      : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                  }
                  return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                },
                offsetY: -20,
                style: {
                  fontSize: "12px",
                  colors: ["#6d6e6f"],
                  fontFamily: "proxima-nova",
                },
              },
              tooltip: {
                shared: true,
                intersect: false,
                enabled: true,
                x: {
                  show: false,
                },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  dataLabels: {
                    enabled: true,
                    offsetX: 12,
                    offsetY: 0,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                    }
                  },
                }
              }],
            };

          case "area":
            return {
              chart: {
                sparkline: { enabled: false },
                height: "100%",
                width: "100%",
                type: "area",
                fontFamily: "proxima-nova",
                dropShadow: { enabled: false },
                toolbar: { show: false },
                events: {
                  xAxisLabelClick: function (event, chartContext, opts) {
                    XAxisLabelClick?.(event, chartContext, opts);
                  },
                },
              },
              colors: GraphData?.[0]?.colors,
              dataLabels: { enabled: false },
              stroke: { width: 4, curve: "smooth", colors: GraphData?.[0]?.colors },
              grid: { show: true, borderColor: "#e0e0e0", strokeDashArray: 4 },
              xaxis: {
                type : 'category',
                categories:
                  GraphData[0]?.labels?.length > 0
                    ? GraphData?.[0]?.labels
                    : [],
                labels: {
                  show: GraphData[0]?.labels?.length > 0 ? true : false,
                  style: {
                    fontFamily: "proxima-nova",
                  },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
                tooltip: {
                  enabled: false, // Disable tooltip on x-axis labels
                },
              },
              yaxis: {
                show: ShowYaxisLabels,
                tickAmount: 4,
                labels: {
                  show: true,
                  style: {
                    fontFamily: "proxima-nova",
                  },
                  formatter: function (val) {
                    if (typeof val === 'number') {
                      return val % 1 === 0
                        ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`  // Whole number
                        : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`; // Decimal number
                    }
                    return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                  },
                },
                opposite: false,
              },
              legend: {
                show: true,
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              tooltip: {
                enabled: true,
                x: { show: false },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              fill: {
                type: "gradient",
                gradient: {
                  opacityFrom: 0.55,
                  opacityTo: 0,
                  shade: "light",
                },
              },
              responsive: [{
                breakpoint: 480,
              }],
            };

          case "donut":
            return {
              chart: {
                type: "donut",
                height: "100%",
                width: "100%",
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    DataPointSelection?.(event, chartContext, config);
                  },
                  dataPointMouseEnter: (event, chartContext, opts) => {
                    DataPointMouseEnter?.(event, chartContext, opts);
                  },
                  dataPointMouseLeave: (event, chartContext, opts) => {
                    DataPointMouseLeave?.(event, chartContext, opts);
                  },
                }
              },
              labels: GraphData?.[0]?.labels,
              colors: GraphData?.[0]?.colors,
              stroke: {
                colors: ["transparent"],
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        show: true,
                        fontFamily: "proxima-nova",
                        offsetY: 20,
                      },
                      total: {
                        show: true,
                        showAlways: true,
                        label: GraphData?.[0]?.totalText,
                        fontFamily: "proxima-nova",
                        formatter: (w) => {
                          const totalCall = w.globals.seriesTotals.reduce(
                            (a: number, b: number) => a + b,
                            0
                          );
                          return `${new Intl.NumberFormat().format(totalCall)}`;
                        },
                      },
                      value: {
                        show: true,
                        offsetY: -20,
                        fontFamily: "proxima-nova",
                        formatter: (value: string) => {
                          const numericValue = Number(value);
                          return isNaN(numericValue)
                            ? "0"
                            : new Intl.NumberFormat().format(numericValue);
                        },
                      },
                    },
                    size: "80%",
                  },
                },
              },
              dataLabels: {
                enabled: false,
              },
              legend: {
                show: true,
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              tooltip: {
                enabled: true, // Disable tooltip on x-axis labels
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                  const originalValue = GraphData?.[0]?.series[seriesIndex];
                  const label = w.globals.labels[seriesIndex];
                  const color = w.globals.colors[seriesIndex];
                  
                  return (`
                    <div class="apexcharts-tooltip-box">
                        <span class="tooltip-box-bg" style="background-color: ${color};"></span>
                        <span class="tooltip-box-label">${label}: </span>
                        <span class="tooltip-box-pr"> ${originalValue}% </span>
                    </div>
                  `);
                },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              responsive: [{
                breakpoint: 480,
              }],
            };

          case "line":
            return {
              chart: {
                height: "100%",
                width: "100%",
                toolbar: { show: false },
                events: {
                  xAxisLabelClick: function (event, chartContext, opts) {
                    XAxisLabelClick?.(event, chartContext, opts);
                  },
                },
              },
              xaxis: {
                categories:
                  GraphData[0]?.labels?.length > 0
                    ? GraphData?.[0]?.labels
                    : [],
                crosshairs: {
                  show: false, // Disable the x-axis marker line on hover
                },
                tooltip: {
                  enabled: false, // Disable tooltip on x-axis labels
                },
                labels: {
                  show: GraphData[0]?.labels?.length > 0 ? true : false,
                  rotate: -45,
                  rotateAlways: true,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#333333"],
                  },
                },
                axisTicks: { show: false },
                axisBorder: { show: false },
              },
              yaxis: {
                show: true,
                labels: {
                  show: ShowYaxisLabels,
                  style: {
                    fontFamily: "proxima-nova",
                    fontSize: "12px",
                    fontWeight: "400",
                    colors: ["#333333"],
                  },
                  formatter: function (val) {
                    if (typeof val === 'number') {
                      return val % 1 === 0
                        ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`
                        : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                    }
                    return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                  },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
              },
              dataLabels: {
                enabled: true,
                background: {
                  enabled: false,
                },
                offsetY: -5,
                formatter: function (val) {
                  if (typeof val === 'number') {
                    return val % 1 === 0
                      ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`
                      : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                  }
                  return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                },
                style: {
                  fontSize: "14px",
                  colors: ["#333333"],
                  fontFamily: "proxima-nova",
                },
              },
              legend: {
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              colors: GraphData?.[0]?.colors,
              stroke: { curve: "smooth", width: 3 },
              grid: { show: true, borderColor: "#e0e0e0", strokeDashArray: 4 },
              fill: { opacity: 1 },
              tooltip: {
                shared: true,
                intersect: false,
                enabled: true,
                x: {
                  show: false,
                },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              markers: {
                size: 5,
                strokeWidth: 0,
                hover: {
                  size: 5,
                  sizeOffset: 13,
                },
              },
              responsive: [{
                breakpoint: 480,
              }],
            };

          case "linebar":
            return {
              chart: {
                height: "100%",
                width: "100%",
                type: "line",
                toolbar: { show: false },
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    DataPointSelection?.(event, chartContext, config);
                  },
                  dataPointMouseEnter: (event, chartContext, opts) => {
                    DataPointMouseEnter?.(event, chartContext, opts);
                  },
                  dataPointMouseLeave: (event, chartContext, opts) => {
                    DataPointMouseLeave?.(event, chartContext, opts);
                  },
                  xAxisLabelClick: function (event, chartContext, opts) {
                    XAxisLabelClick?.(event, chartContext, opts);
                  },
                  selection: function (chartContext, { xaxis, yaxis }) {
                    Selection?.(chartContext);
                  }
                },
              },
              stroke: {
                curve: "smooth",
                width: [0, 3, 3],
              },
              colors: GraphData?.[0]?.colors,
              dataLabels: {
                enabled: true,
                enabledOnSeries: [1, 2],
                style: {
                  fontSize: "12px",
                  colors: ["#333333"],
                },
                dropShadow: {
                  enabled: false,
                },
                background: {
                  enabled: false,
                },
                offsetY: -5,
                formatter: function (val) {
                  if (typeof val === 'number') {
                    return val % 1 === 0
                      ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`  // Whole number
                      : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`; // Decimal number
                  }
                  return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                },
              },
              xaxis: {
                categories: GraphData[0]?.labels?.length > 0
                    ? GraphData?.[0]?.labels
                    : [],
                axisBorder: {
                  show: false, // Hide x-axis line
                },
                axisTicks: {
                  show: false, // Hide x-axis ticks
                },
                labels: {
                 show: GraphData[0]?.labels?.length > 0 ? true : false, // Keep the x-axis labels visible
                  rotate: -45,
                  rotateAlways: true,
                  style: {
                    colors: "#000", // Adjust label colors
                  },
                },
                tooltip: {
                  enabled: false, // Disable tooltip for x-axis when hovering
                },
              },
              yaxis: [
                {
                  show: true, // Show the left Y-axis
                  labels: {
                    show: ShowYaxisLabels,
                    style: {
                      fontFamily: "proxima-nova",
                      fontSize: "12px",
                      fontWeight: "400",
                      colors: ["#333333"],
                      cssClass:
                        "",
                    },
                    formatter: function (val) {
                      if (typeof val === 'number') {
                        return val % 1 === 0
                          ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`
                          : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                      }
                      return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                    },
                  },
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  opposite: false, // Left side (default)
                },
                {
                  show: true, // Show the right Y-axis
                  labels: {
                    show: true,
                    style: {
                      fontFamily: "proxima-nova",
                      fontSize: "12px",
                      fontWeight: "400",
                      colors: ["#333333"],
                      cssClass:
                        "",
                    },
                    formatter: function (val) {
                      if (typeof val === 'number') {
                        return val % 1 === 0
                          ? `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`  // Whole number
                          : `${PrefixPostFix?.prefix || ''}${val.toFixed(2)}${PrefixPostFix?.suffix || ''}`; // Decimal number
                      }
                      return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                    },
                  },
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  opposite: true, // Right side
                },
              ],
              grid: { show: true, strokeDashArray: 4 },
              fill: { opacity: 1 },
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 6,
                  dataLabels: {
                    position: "top",
                  },
                  borderRadiusApplication: 'end',
                },
              },
              markers: {
                size: 5,
                strokeWidth: 0,
                hover: {
                  size: 5,
                  sizeOffset: 3,
                },
              },
              legend: {
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
              },
              tooltip: {
                shared: true,
                intersect: false,
                enabled: true,
                x: {
                  show: false,
                },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              responsive: [{
                breakpoint: 480,
              }],
            };

          case "pie":
            return {
              chart: {
                type: "pie",
                height: "100%",
                width: "100%",
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    DataPointSelection?.(event, chartContext, config);
                  },
                  dataPointMouseEnter: (event, chartContext, opts) => {
                    DataPointMouseEnter?.(event, chartContext, opts);
                  },
                  dataPointMouseLeave: (event, chartContext, opts) => {
                    DataPointMouseLeave?.(event, chartContext, opts);
                  },
                }
              },
              labels: GraphData?.[0]?.labels,
              colors: GraphData?.[0]?.colors,
              dataLabels: {
                enabled: true,
                style: {
                  fontFamily: "proxima-nova",
                  fontSize: "13px",
                  fontWeight: "normal",
                  colors: ["#fff"]
                },
                dropShadow: {
                  enabled: false,
                },
                formatter: function (val, opts) {
                  // Use the original series data instead of calculated percentage
                  const originalValue = GraphData?.[0]?.series[opts.seriesIndex];
                  if (typeof originalValue === 'number') {
                    // Show exact value without recalculation
                    return originalValue % 1 === 0
                      ? `${PrefixPostFix?.prefix || ''}${originalValue}${PrefixPostFix?.suffix || ''}`
                      : `${PrefixPostFix?.prefix || ''}${originalValue.toFixed(2)}${PrefixPostFix?.suffix || ''}`;
                  }
                  return `${PrefixPostFix?.prefix || ''}${val}${PrefixPostFix?.suffix || ''}`;
                },
              },
              plotOptions: {
                pie: {
                  dataLabels: {
                    offset: -30,
                    minAngleToShowLabel: 10,
                  },
                  donut: {
                    size: '0%'
                  },
                  expandOnClick: false,
                }
              },
              tooltip: {
                enabled: true,
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                  const originalValue = GraphData?.[0]?.series[seriesIndex];
                  const total = GraphData?.[0]?.series.reduce((sum: number, val: number) => sum + val, 0);
                  const percentage = total ? ((originalValue / total) * 100).toFixed(1) : 0;
                  const label = w.globals.labels[seriesIndex];
                  const color = w.globals.colors[seriesIndex];
                  
                  return (`
                    <div class="apexcharts-tooltip-box">
                        <span class="tooltip-box-bg" style="background-color: ${color};"></span>
                        <span class="tooltip-box-label">${label}: </span>
                        <span class="tooltip-box-pr"> ${percentage}% </span>
                    </div>
                  `);
                },
                style: {
                  fontFamily: "proxima-nova"
                },
              },
              legend: {
                show: true,
                position: "bottom",
                markers: {
                  size: 4,
                  shape: "circle",
                  strokeWidth: 0,
                },
                horizontalAlign: "center",
                labels: {
                  useSeriesColors: true
                }
              },
              responsive: [{
                breakpoint: 480,
              }],
            };

          default:
            return {};
        }
      };

      setChartOptions(getChartOptions());
    }, [GraphType, GraphData, ShowLegend, DataPointSelection, PrefixPostFix?.prefix, PrefixPostFix?.suffix, DataPointMouseEnter, DataPointMouseLeave, XAxisLabelClick, Selection, ShowYaxisLabels]);

    useImperativeHandle(ref, () => ({
      validate: () => ({ IsValidate: true, IsRequired: true }),
    }));

    const isDataValid =
      seriesDataUpdate &&
      Array.isArray(seriesDataUpdate) &&
      seriesDataUpdate.length > 0;

    const renderGraph = () => {
      switch (Size) {
        case "x-small":
          return (
            <div className="w-graphxsmall bg-bkg_neutral_default rounded-lg shadow p-6 max-w-full border border-solid !border-border-default">
              <div className="flex justify-between">
                <div className="flex pb-1 items-center">
                  <div>
                    <div className="text-lg leading-6 font-normal text-text_neutral_default pt-px">
                      {GraphData[0]?.title}
                    </div>
                  </div>
                </div>
                <div>
                  {LinkLabelText !== "" && (
                    <a
                      className="mt-1 inline-flex items-center cursor-pointer bg-transparent text-text-blue border-none text-[15px] leading-[20px] outline-0 font-medium font-proximanova hover:text-text_blue_strong"
                      onClick={(e: any) => OnClick(e)}
                    >
                      {LinkLabelText}
                    </a>
                  )}
                  {LinkLabelText === "" && GraphData[0]?.edit && (
                    <div
                      id="widgetDropdownButton"
                      data-dropdown-toggle="widgetDropdown"
                      data-dropdown-placement="bottom"
                      className="vg-tk-btn vg-btn-action vg-doticon vertical"
                    >
                      <svg
                        width="4"
                        height="14"
                        viewBox="0 0 4 14"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10.25C2.9375 10.25 3.75 11.0625 3.75 12C3.75 12.9688 2.9375 13.75 2 13.75C1.03125 13.75 0.25 12.9688 0.25 12C0.25 11.0625 1.03125 10.25 2 10.25ZM2 5.25C2.9375 5.25 3.75 6.0625 3.75 7C3.75 7.96875 2.9375 8.75 2 8.75C1.03125 8.75 0.25 7.96875 0.25 7C0.25 6.0625 1.03125 5.25 2 5.25ZM2 3.75C1.03125 3.75 0.25 2.96875 0.25 2C0.25 1.0625 1.03125 0.25 2 0.25C2.9375 0.25 3.75 1.0625 3.75 2C3.75 2.96875 2.9375 3.75 2 3.75Z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="justify-between gap-4 flex-row flex items-center">
                <div>
                  <div className="leading-none text-5xl font-medium text-text_neutral_default pb-2 max-md:text-[32px]">
                    {GraphData[0]?.total}
                  </div>
                  <div className="flex justify-end items-center">
                    <span
                      className={`${
                        !isNaN(parseFloat(GraphData[0]?.growth)) &&
                        parseFloat(GraphData[0]?.growth) >= 0
                          ? "bg-[#95E0511A] text-text_green_default"
                          : "bg-[#EF484A1A] text-text_alert_default"
                      } text-xs font-medium inline-flex items-center px-2 py-1.5 rounded-md`}
                    >
                      {/* <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d={GraphData[0]?.growth >= 0 ? "M5 13V1m0 0L1 5m4-4 4 4" : "M5 1v12m0 0L1 9m4 4 4-4"} />
                      </svg> */}
                      {parseFloat(GraphData[0]?.growth) !== 0 &&
                        (parseFloat(GraphData[0]?.growth) > 0 ? (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13V1m0 0L1 5m4-4 4 4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 1v12m0 0L1 9m4 4 4-4"
                            />
                          </svg>
                      ))}

                      <span className="font-medium xs-custom">
                        {GraphData[0]?.growth}
                      </span>
                    </span>
                    <span className="text-xs ml-1 font-normal text-text-week whitespace-nowrap">
                      {GraphData[0]?.growthText}
                    </span>
                  </div>
                </div>
                <div className="justify-end flex">
                  <ReactApexChart
                    key={`${GraphType}`} // Force re-render on type change
                    options={chartOptions}
                    series={
                      seriesDataUpdate?.length > 0
                        ? seriesDataUpdate
                        : [{ data: [] }]
                    }
                    type={getApexChartType(GraphType)}
                    className={`vg-graph-${GraphType}`}
                  />
                </div>
              </div>
            </div>
          );

        case "small":
          return (
            <div className="w-graphxsmall bg-bkg_neutral_default rounded-lg shadow p-8 pb-0 max-w-full border border-solid !border-border-default">
              <div className="flex justify-between">
                <div>
                  <div className="flex pb-1">
                    <div>
                    <div className="text-lg leading-6 font-normal text-text_neutral_default pt-px">{GraphData[0]?.title}</div>
                    </div>
                    {GraphData[0]?.tooltip && 
                    <div className="ml-1 w-4 h-4 pt-1 cursor-pointer">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-text_neutral_default">
                        <path d="M8 0.875C12.1309 0.875 15.5 4.24414 15.5 8.375C15.5 12.5352 12.1309 15.875 8 15.875C3.83984 15.875 0.5 12.5352 0.5 8.375C0.5 4.24414 3.83984 0.875 8 0.875ZM8 14.4688C11.3398 14.4688 14.0938 11.7441 14.0938 8.375C14.0938 5.03516 11.3398 2.28125 8 2.28125C4.63086 2.28125 1.90625 5.03516 1.90625 8.375C1.90625 11.7441 4.63086 14.4688 8 14.4688ZM9.17188 10.7188C9.55273 10.7188 9.875 11.041 9.875 11.4219C9.875 11.832 9.55273 12.125 9.17188 12.125H6.82812C6.41797 12.125 6.125 11.832 6.125 11.4219C6.125 11.041 6.41797 10.7188 6.82812 10.7188H7.29688V8.84375H7.0625C6.65234 8.84375 6.35938 8.55078 6.35938 8.14062C6.35938 7.75977 6.65234 7.4375 7.0625 7.4375H8C8.38086 7.4375 8.70312 7.75977 8.70312 8.14062V10.7188H9.17188ZM8 6.5C7.47266 6.5 7.0625 6.08984 7.0625 5.5625C7.0625 5.06445 7.47266 4.625 8 4.625C8.49805 4.625 8.9375 5.06445 8.9375 5.5625C8.9375 6.08984 8.49805 6.5 8 6.5Z" />
                      </svg> 
                    </div>
                    }
                  </div>
                  <div className="leading-none text-5xl font-medium text-text_neutral_default  pb-1 max-md:text-[32px]">{GraphData[0]?.total}</div>
                  <div className="text-base ml-1 font-normal text-text-secondary">{GraphData[0]?.order}</div>
                </div>
                <div className="justify-start gap-4 flex-col flex items-end">
                  {LinkLabelText !== "" && (
                    <a
                      className="mt-1 inline-flex items-center cursor-pointer bg-transparent text-text-blue border-none text-[15px] leading-[20px] outline-0 font-medium font-proximanova hover:text-text_blue_strong"
                      onClick={(e: any) => OnClick(e)}
                    >
                      {LinkLabelText}
                    </a>
                  )}
                  {LinkLabelText === "" && GraphData[0]?.edit &&
                  <div id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" className="vg-tk-btn vg-btn-action vg-doticon vertical">
                    <svg width="4" height="14" viewBox="0 0 4 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10.25C2.9375 10.25 3.75 11.0625 3.75 12C3.75 12.9688 2.9375 13.75 2 13.75C1.03125 13.75 0.25 12.9688 0.25 12C0.25 11.0625 1.03125 10.25 2 10.25ZM2 5.25C2.9375 5.25 3.75 6.0625 3.75 7C3.75 7.96875 2.9375 8.75 2 8.75C1.03125 8.75 0.25 7.96875 0.25 7C0.25 6.0625 1.03125 5.25 2 5.25ZM2 3.75C1.03125 3.75 0.25 2.96875 0.25 2C0.25 1.0625 1.03125 0.25 2 0.25C2.9375 0.25 3.75 1.0625 3.75 2C3.75 2.96875 2.9375 3.75 2 3.75Z" />
                    </svg>
                  </div>
                  }
                  <div className="flex justify-end items-center">
                  <span
                      className={`${!isNaN(parseFloat(GraphData[0]?.growth)) && parseFloat(GraphData[0]?.growth) >= 0
                          ? "bg-[#95E0511A] text-text_green_default"
                          : "bg-[#EF484A1A] text-text_alert_default"
                        } text-xs font-medium inline-flex items-center px-2 py-1.5 rounded-md`}
                    >
                     {parseFloat(GraphData[0]?.growth) !== 0 &&
                        (parseFloat(GraphData[0]?.growth) > 0 ? (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13V1m0 0L1 5m4-4 4 4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 1v12m0 0L1 9m4 4 4-4"
                            />
                          </svg>
                      ))}
                      <span className="font-medium xs-custom">
                        {GraphData[0]?.growth}
                      </span>
                    </span>
                    <span className="text-xs ml-1 font-normal text-text-week whitespace-nowrap">{GraphData[0]?.growthText}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ReactApexChart
                  key={`${GraphType}`} // Force re-render on type change
                  options={chartOptions}
                  series={
                    seriesDataUpdate?.length > 0 ? seriesDataUpdate : [{ data: [] }]
                  }
                  type={getApexChartType(GraphType)}
                  className={`vg-graph-${GraphType}`}
                />
              </div>
            </div>
          )

        case "medium":
          return (
            <div className="w-graphmedium bg-bkg_neutral_default rounded-lg shadow p-8 pb-0 max-w-full border border-solid !border-border-default">
              <div className="flex justify-between">
                <div>
                  <div className="flex pb-1">
                    <div>
                    <div className="text-lg leading-6 font-normal text-text_neutral_default pt-px">{GraphData[0]?.title }</div>
                    </div>
                    {GraphData[0]?.tooltip &&
                    <div className="ml-1 w-4 h-4 pt-1 cursor-pointer">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-text_neutral_default">
                        <path d="M8 0.875C12.1309 0.875 15.5 4.24414 15.5 8.375C15.5 12.5352 12.1309 15.875 8 15.875C3.83984 15.875 0.5 12.5352 0.5 8.375C0.5 4.24414 3.83984 0.875 8 0.875ZM8 14.4688C11.3398 14.4688 14.0938 11.7441 14.0938 8.375C14.0938 5.03516 11.3398 2.28125 8 2.28125C4.63086 2.28125 1.90625 5.03516 1.90625 8.375C1.90625 11.7441 4.63086 14.4688 8 14.4688ZM9.17188 10.7188C9.55273 10.7188 9.875 11.041 9.875 11.4219C9.875 11.832 9.55273 12.125 9.17188 12.125H6.82812C6.41797 12.125 6.125 11.832 6.125 11.4219C6.125 11.041 6.41797 10.7188 6.82812 10.7188H7.29688V8.84375H7.0625C6.65234 8.84375 6.35938 8.55078 6.35938 8.14062C6.35938 7.75977 6.65234 7.4375 7.0625 7.4375H8C8.38086 7.4375 8.70312 7.75977 8.70312 8.14062V10.7188H9.17188ZM8 6.5C7.47266 6.5 7.0625 6.08984 7.0625 5.5625C7.0625 5.06445 7.47266 4.625 8 4.625C8.49805 4.625 8.9375 5.06445 8.9375 5.5625C8.9375 6.08984 8.49805 6.5 8 6.5Z" />
                      </svg>
                    </div>
                  }
                  </div>
                  <div className="leading-none text-5xl font-medium text-text_neutral_default pb-1 max-md:text-[32px]">{GraphData[0]?.total}</div>
                  <div className="text-base ml-1 font-normal text-text-secondary">{GraphData[0]?.order}</div>
                </div>
                <div className="justify-start gap-4 flex-col flex items-end">
                  {LinkLabelText !== "" && (
                    <a
                      className="mt-1 inline-flex items-center cursor-pointer bg-transparent text-text-blue border-none text-[15px] leading-[20px] outline-0 font-medium font-proximanova hover:text-text_blue_strong"
                      onClick={(e: any) => OnClick(e)}
                    >
                      {LinkLabelText}
                    </a>
                  )}
                  {LinkLabelText === "" && GraphData[0]?.edit &&
                  <div id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" className="vg-tk-btn vg-btn-action vg-doticon vertical">
                    <svg width="4" height="14" viewBox="0 0 4 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10.25C2.9375 10.25 3.75 11.0625 3.75 12C3.75 12.9688 2.9375 13.75 2 13.75C1.03125 13.75 0.25 12.9688 0.25 12C0.25 11.0625 1.03125 10.25 2 10.25ZM2 5.25C2.9375 5.25 3.75 6.0625 3.75 7C3.75 7.96875 2.9375 8.75 2 8.75C1.03125 8.75 0.25 7.96875 0.25 7C0.25 6.0625 1.03125 5.25 2 5.25ZM2 3.75C1.03125 3.75 0.25 2.96875 0.25 2C0.25 1.0625 1.03125 0.25 2 0.25C2.9375 0.25 3.75 1.0625 3.75 2C3.75 2.96875 2.9375 3.75 2 3.75Z" />
                    </svg>
                  </div>
                  }
                  <div className="flex justify-end items-center">
                  <span
                      className={`${!isNaN(parseFloat(GraphData[0]?.growth)) && parseFloat(GraphData[0]?.growth) >= 0
                          ? "bg-[#95E0511A] text-text_green_default"
                          : "bg-[#EF484A1A] text-text_alert_default"
                        } text-xs font-medium inline-flex items-center px-2 py-1.5 rounded-md`}
                    >
                     {parseFloat(GraphData[0]?.growth) !== 0 &&
                        (parseFloat(GraphData[0]?.growth) > 0 ? (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13V1m0 0L1 5m4-4 4 4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 1v12m0 0L1 9m4 4 4-4"
                            />
                          </svg>
                      ))}
                      <span className="font-medium xs-custom">
                        {GraphData[0]?.growth}
                      </span>
                    </span>
                    <span className="text-xs ml-1 font-normal text-text-week whitespace-nowrap">{GraphData[0]?.growthText}</span>
                  </div>
                </div>
              </div>
              <div className="">
                <ReactApexChart
                  key={`${GraphType}`} // Force re-render on type change
                  options={chartOptions}
                  series={
                    seriesDataUpdate?.length > 0 ? seriesDataUpdate : [{ data: [] }]
                  }
                  type={getApexChartType(GraphType)}
                  className={`vg-graph-${GraphType}`}
                />
              </div>
            </div>
          )

        case "large":
          return (
            <div className="w-graphlarge bg-bkg_neutral_default rounded-lg shadow p-8 pb-0 max-w-full border border-solid !border-border-default">
              <div className="flex justify-between">
                <div>
                  <div className="flex pb-1">
                    <div>
                    <div className="text-lg leading-6 font-normal text-text_neutral_default  pt-px">{GraphData[0]?.title}</div>
                    </div>
                    {GraphData[0]?.tooltip &&
                    <div className="ml-1 w-4 h-4 pt-1 cursor-pointer">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-text_neutral_default">
                        <path d="M8 0.875C12.1309 0.875 15.5 4.24414 15.5 8.375C15.5 12.5352 12.1309 15.875 8 15.875C3.83984 15.875 0.5 12.5352 0.5 8.375C0.5 4.24414 3.83984 0.875 8 0.875ZM8 14.4688C11.3398 14.4688 14.0938 11.7441 14.0938 8.375C14.0938 5.03516 11.3398 2.28125 8 2.28125C4.63086 2.28125 1.90625 5.03516 1.90625 8.375C1.90625 11.7441 4.63086 14.4688 8 14.4688ZM9.17188 10.7188C9.55273 10.7188 9.875 11.041 9.875 11.4219C9.875 11.832 9.55273 12.125 9.17188 12.125H6.82812C6.41797 12.125 6.125 11.832 6.125 11.4219C6.125 11.041 6.41797 10.7188 6.82812 10.7188H7.29688V8.84375H7.0625C6.65234 8.84375 6.35938 8.55078 6.35938 8.14062C6.35938 7.75977 6.65234 7.4375 7.0625 7.4375H8C8.38086 7.4375 8.70312 7.75977 8.70312 8.14062V10.7188H9.17188ZM8 6.5C7.47266 6.5 7.0625 6.08984 7.0625 5.5625C7.0625 5.06445 7.47266 4.625 8 4.625C8.49805 4.625 8.9375 5.06445 8.9375 5.5625C8.9375 6.08984 8.49805 6.5 8 6.5Z" />
                      </svg>
                    </div>
              }
                  </div>
                  <div className="leading-none text-5xl font-medium text-text_neutral_default pb-1 max-md:text-[32px]">{GraphData[0]?.total}</div>
                  <div className="text-base ml-1 font-normal text-text-secondary">{GraphData[0]?.order}</div>
                </div>
                <div className="justify-start gap-4 flex-col flex items-end">
                  {LinkLabelText !== "" && (
                    <a
                      className="mt-1 inline-flex items-center cursor-pointer bg-transparent text-text-blue border-none text-[15px] leading-[20px] outline-0 font-medium font-proximanova hover:text-text_blue_strong"
                      onClick={(e: any) => OnClick(e)}
                    >
                      {LinkLabelText}
                    </a>
                  )}
                  {LinkLabelText === "" && GraphData[0]?.edit &&
                  <div id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" className="vg-tk-btn vg-btn-action vg-doticon vertical">
                    <svg width="4" height="14" viewBox="0 0 4 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10.25C2.9375 10.25 3.75 11.0625 3.75 12C3.75 12.9688 2.9375 13.75 2 13.75C1.03125 13.75 0.25 12.9688 0.25 12C0.25 11.0625 1.03125 10.25 2 10.25ZM2 5.25C2.9375 5.25 3.75 6.0625 3.75 7C3.75 7.96875 2.9375 8.75 2 8.75C1.03125 8.75 0.25 7.96875 0.25 7C0.25 6.0625 1.03125 5.25 2 5.25ZM2 3.75C1.03125 3.75 0.25 2.96875 0.25 2C0.25 1.0625 1.03125 0.25 2 0.25C2.9375 0.25 3.75 1.0625 3.75 2C3.75 2.96875 2.9375 3.75 2 3.75Z" />
                    </svg>
                  </div>
                  }
                  <div className="flex justify-end items-center">
                  <span
                      className={`${!isNaN(parseFloat(GraphData[0]?.growth)) && parseFloat(GraphData[0]?.growth) >= 0
                          ? "bg-[#95E0511A] text-text_green_default"
                          : "bg-[#EF484A1A] text-text_alert_default"
                        } text-xs font-medium inline-flex items-center px-2 py-1.5 rounded-md`}
                    >
                      {parseFloat(GraphData[0]?.growth) !== 0 &&
                        (parseFloat(GraphData[0]?.growth) > 0 ? (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13V1m0 0L1 5m4-4 4 4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 1v12m0 0L1 9m4 4 4-4"
                            />
                          </svg>
                      ))}
                      <span className="font-medium xs-custom">
                        {GraphData[0]?.growth}
                      </span>
                    </span>
                    <span className="text-xs ml-1 font-normal text-text-week whitespace-nowrap">{GraphData[0]?.growthText}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-16">
                <div className="w-3/4 justify-center align-middle">
                  <ReactApexChart
                    key={`${GraphType}`} // Force re-render on type change
                    options={chartOptions}
                    series={
                      seriesDataUpdate?.length > 0 ? seriesDataUpdate : [{ data: [] }]
                    }
                    type={getApexChartType(GraphType)}
                    className={`vg-graph-${GraphType}`}
                  />
                </div>
                <div className="w-1/4 items-center flex justify-end">
                  <div className="text-text_neutral_default w-64 rounded-md max-w-sm">
                    <ul>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#9D5654] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">A</span>
                        <span className="text-sm text-text-secondary">35 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#76B971] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">B</span>
                        <span className="text-sm text-text-secondary">42 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#91C0DC] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">C</span>
                        <span className="text-sm text-text-secondary">28 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#EBB5B3] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">D</span>
                        <span className="text-sm text-text-secondary">23 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#CA6B42] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">E</span>
                        <span className="text-sm text-text-secondary">25 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#AE7DC7] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">F</span>
                        <span className="text-sm text-text-secondary">25 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#A0C2C3] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">G</span>
                        <span className="text-sm text-text-secondary">25 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#DDBA80] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">H</span>
                        <span className="text-sm text-text-secondary">25 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#589288] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">I</span>
                        <span className="text-sm text-text-secondary">25 Appointments</span>
                      </li>
                      <li className="flex items-center py-2">
                        <div className="w-4 h-4 rounded-md bg-[#666666] mr-3"></div>
                        <span className="font-medium text-sm mr-auto">J</span>
                        <span className="text-sm text-text-secondary">25 Appointments</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )

        default:
          return (
            <div className="w-graphmedium bg-bkg_neutral_default rounded-lg shadow p-4 max-w-full border border-solid !border-border-default">
              <div className="flex justify-between">
                <div>
                  <div className="flex pb-1 items-center">
                    <div>
                      <div className="text-lg leading-6 font-normal text-text_neutral_default pt-px">
                        {GraphData[0]?.title}
                      </div>
                    </div>
                    {GraphData[0]?.tooltip && (
                      <div className="ml-1 w-4 h-4 pt-1 cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-text_neutral_default"
                        >
                          <path d="M8 0.875C12.1309 0.875 15.5 4.24414 15.5 8.375C15.5 12.5352 12.1309 15.875 8 15.875C3.83984 15.875 0.5 12.5352 0.5 8.375C0.5 4.24414 3.83984 0.875 8 0.875ZM8 14.4688C11.3398 14.4688 14.0938 11.7441 14.0938 8.375C14.0938 5.03516 11.3398 2.28125 8 2.28125C4.63086 2.28125 1.90625 5.03516 1.90625 8.375C1.90625 11.7441 4.63086 14.4688 8 14.4688ZM9.17188 10.7188C9.55273 10.7188 9.875 11.041 9.875 11.4219C9.875 11.832 9.55273 12.125 9.17188 12.125H6.82812C6.41797 12.125 6.125 11.832 6.125 11.4219C6.125 11.041 6.41797 10.7188 6.82812 10.7188H7.29688V8.84375H7.0625C6.65234 8.84375 6.35938 8.55078 6.35938 8.14062C6.35938 7.75977 6.65234 7.4375 7.0625 7.4375H8C8.38086 7.4375 8.70312 7.75977 8.70312 8.14062V10.7188H9.17188ZM8 6.5C7.47266 6.5 7.0625 6.08984 7.0625 5.5625C7.0625 5.06445 7.47266 4.625 8 4.625C8.49805 4.625 8.9375 5.06445 8.9375 5.5625C8.9375 6.08984 8.49805 6.5 8 6.5Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="leading-none text-5xl font-medium text-text_neutral_default pb-2 max-md:text-[32px]">
                    {GraphData[0]?.total}
                  </div>
                  <div className="text-base ml-1 font-normal text-text-secondary">
                    {GraphData[0]?.order}
                  </div>
                </div>
                <div className="justify-start gap-4 flex-col flex items-end">
                  {LinkLabelText !== "" && (
                    <a
                      className="mt-1 inline-flex items-center cursor-pointer bg-transparent text-text-blue border-none text-[15px] leading-[20px] outline-0 font-medium font-proximanova hover:text-text_blue_strong"
                      onClick={(e: any) => OnClick(e)}
                    >
                      {LinkLabelText}
                    </a>
                  )}
                  {LinkLabelText === "" && GraphData[0]?.edit && (
                    <div
                      id="widgetDropdownButton"
                      data-dropdown-toggle="widgetDropdown"
                      data-dropdown-placement="bottom"
                      className="vg-tk-btn vg-btn-action vg-doticon vertical"
                    >
                      <svg
                        width="4"
                        height="14"
                        viewBox="0 0 4 14"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10.25C2.9375 10.25 3.75 11.0625 3.75 12C3.75 12.9688 2.9375 13.75 2 13.75C1.03125 13.75 0.25 12.9688 0.25 12C0.25 11.0625 1.03125 10.25 2 10.25ZM2 5.25C2.9375 5.25 3.75 6.0625 3.75 7C3.75 7.96875 2.9375 8.75 2 8.75C1.03125 8.75 0.25 7.96875 0.25 7C0.25 6.0625 1.03125 5.25 2 5.25ZM2 3.75C1.03125 3.75 0.25 2.96875 0.25 2C0.25 1.0625 1.03125 0.25 2 0.25C2.9375 0.25 3.75 1.0625 3.75 2C3.75 2.96875 2.9375 3.75 2 3.75Z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex justify-end items-center">
                    <span
                      className={`${
                        !isNaN(parseFloat(GraphData[0]?.growth)) &&
                        parseFloat(GraphData[0]?.growth) >= 0
                          ? "bg-[#95E0511A] text-text_green_default"
                          : "bg-[#EF484A1A] text-text_alert_default"
                      } text-xs font-medium inline-flex items-center px-2 py-1.5 rounded-md`}
                    >
                      {/* <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d={GraphData[0]?.growth >= 0 ? "M5 13V1m0 0L1 5m4-4 4 4" : "M5 1v12m0 0L1 9m4 4 4-4"} />
                      </svg> */}
                      {parseFloat(GraphData[0]?.growth) !== 0 &&
                        (parseFloat(GraphData[0]?.growth) > 0 ? (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13V1m0 0L1 5m4-4 4 4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 1v12m0 0L1 9m4 4 4-4"
                            />
                          </svg>
                      ))}
                      <span className="font-medium xs-custom">
                        {GraphData[0]?.growth}
                      </span>
                    </span>
                    <span className="text-xs ml-1 font-normal text-text-week whitespace-normal">
                      {GraphData[0]?.growthText}
                    </span>
                  </div>
                </div>
              </div>
              <ReactApexChart
                key={`${GraphType}`} // Force re-render on type change
                options={chartOptions}
                series={
                  seriesDataUpdate?.length > 0
                    ? seriesDataUpdate
                    : [{ data: [] }]
                }
                type={getApexChartType(GraphType)}
                className={`vg-graph-${GraphType}`}
              />
            </div>
          );
      }
    }

    return (
      <div
        className={`vg-graph ${Size !== "x-small" && ShowLegend ? `legend-visible` : `legend-hidden`} ${GraphTab ? 'show-graph-tab' : ''} ${ShowDataLabelText && Size !== "x-small" && Size !== "small" ? 'datalabel-visible' : 'datalabel-hidden'} ${Size === "x-small" || Size === "small" ? `datanumbers-hidden` : `datanumbers-visible`}`}
      >
        {GraphTab && (
          <div className="vg-graph-tab-buttons">
            <ul className="vg-nav-tabs">
              <li
                className={`vg-list-item ${activeTab === "Chart View" ? "active" : ""
                  }`}
              >
                <button
                  className="vg-tab-link w--current"
                  onClick={() => setActiveTab("Chart View")}
                >
                  <i className="fa fa-bar-chart" aria-hidden="true"></i> Chart View
                </button>
              </li>
            </ul>
            <ul className="vg-nav-tabs">
              <li
                className={`vg-list-item ${activeTab === "Grid View" ? "active" : ""
                  }`}
              >
                <button
                  className="vg-tab-link w--current"
                  onClick={() => setActiveTab("Grid View")}
                >
                  <i className="fa fa-table" aria-hidden="true"></i> Grid View
                </button>
              </li>
            </ul>
          </div>
        )}
        {activeTab === "Chart View" && GraphTab ? (
          isDataValid && (
            <ReactApexChart
              key={`${GraphType}`} // Force re-render on type change
              options={chartOptions}
              series={
                seriesDataUpdate?.length > 0 ? seriesDataUpdate : [{ data: [] }]
              }
              type={getApexChartType(GraphType)}
              className={`vg-graph-${GraphType}`}
            />
          )
        ) : activeTab === "Grid View" && GraphTab ? (
          <VgTableGrid
            ColumnData={[
              {
                DataValue: "Date",
                Dataheader: "Date",
                MinWidth: 10,
                Sorting: true,
              },
              {
                DataValue: "In House-Returning",
                Dataheader: "In House-Returning",
                MinWidth: 10,
                Sorting: true,
              },
              {
                DataValue: "Online-New",
                Dataheader: "Online-New",
                MinWidth: 10,
                Sorting: true,
              },
              {
                DataValue: "Online-Returning",
                Dataheader: "Online-Returning",
                MinWidth: 10,
                Sorting: true,
              },
              {
                DataValue: "Amount Paid",
                Dataheader: "Amount Paid",
                MinWidth: 10,
                Sorting: false,
              },
            ]}
            Footer="Sticky"
            FooterData={[
              {
                FooterValue: "Total",
                Footerheader: "Date",
              },
              {
                FooterValue: 9,
                Footerheader: "In House-Returning",
              },
              {
                FooterValue: 8,
                Footerheader: "Online-New",
              },
              {
                FooterValue: 13,
                Footerheader: "Online-Returning",
              },
              {
                FooterValue: 130,
                Footerheader: "App Date",
              },
            ]}
            OnClick={() => { }}
            OnClickSorting={() => { }}
            PagingType="None"
            RowData={[
              {
                "Amount Paid": "$130.00",
                Date: "Dec 1, 2024",
                "In House-Returning": 4,
                "Online-New": "1",
                "Online-Returning": "3",
              },
              {
                "Amount Paid": "$0.00",
                CheckoutBy: "--",
                Date: "Dec 8, 2024",
                "In House-Returning": "0",
                "Online-New": "1",
                "Online-Returning": "3",
              },
              {
                "Amount Paid": "$0.00",
                Date: "Dec 15, 2024",
                "In House-Returning": "0",
                "Online-New": "0",
                "Online-Returning": "0",
              },
              {
                "Amount Paid": "$0.00",
                Date: "Dec 22, 2024",
                "In House-Returning": "2",
                "Online-New": "2",
                "Online-Returning": "3",
              },
              {
                "Amount Paid": "$0.00",
                Date: "Dec 29, 2024",
                "In House-Returning": "3",
                "Online-New": "4",
                "Online-Returning": "4",
              },
            ]}
            SortingType="Inline"
            PageSize={10}
          />
        ) : (
          isDataValid && (
            <>
              {renderGraph()}
            </>
          )
        )}
      </div>
    );
  }
);

export default VgGraph;