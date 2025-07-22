import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Dashboard.scss";
import VgGraph from "../VgGraph/VgGraph";

const Dashboard = () => {
  const formValidator = useRef<{ [key: string]: any | null }>({});
  const handleClick = (e: any, data: any) => {
  };
  const [graphWidth, setGraphWidth] = useState(window.innerWidth < 767 ? '100%' : '400px');
  const [linegraphWidth, setLineGraphWidth] = useState(window.innerWidth < 767 ? '100%' : '641.5px');
  const [columngraphWidth, setColumnGraphWidth] = useState(window.innerWidth < 767 ? '100%' : '900px');
  const [areagraphWidth, setAreaGraphWidth] = useState(window.innerWidth < 767 ? '100%' : '500px');
  const [linebarhWidth, setLineBarWidth] = useState(window.innerWidth < 767 ? '100%' : '620px');
  // const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setGraphWidth('100%');
        setLineGraphWidth('100%');
        setColumnGraphWidth('100%');
        setAreaGraphWidth('100%');
        setLineBarWidth('100%');
      } else {
        setGraphWidth('400px'); 
        setLineGraphWidth('641.5px');
        setColumnGraphWidth('900px');
        setAreaGraphWidth('500px');
        setLineBarWidth('620px');
      }
      // setIsInitialized(prev => !prev);
    };
    
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Fragment>
      <div className="form-container">
        <div className="vgform-container">
          <h2 className="form-title">Dashboard</h2>
          
          <div className="dashboard-section">
            <div className="box">
              <div className="box-title">Booking Percentage</div>
              <div className="graph-design">
                <VgGraph
                  DataPointMouseEnter={() => {}}
                  DataPointMouseLeave={() => {}}
                  DataPointSelection={() => {}}
                  GraphData={[
                    {
                      colors: ["#76B971", "#9D5654"],
                      edit: true,
                      growth: "10.26%",
                      growthText: "vs last month",
                      labels: ["API Calls", "Webhook Calls"],
                      order: "desc",
                      series: [44, 55],
                      title: "Donut Chart",
                      tooltip: true,
                      total: "153",
                      totalText: "Total",
                    },
                  ]}
                  GraphType="donut"
                  Selection={() => {}}
                  ShowLegend
                  Size="small"
                  XAxisLabelClick={() => {}}
                />
              </div>
            </div>
           
            <div className="box">
              <div className="box-title">Sales Breakdown</div>
              <div className="graph-design">
                <VgGraph
                  DataPointMouseEnter={() => {}}
                  DataPointMouseLeave={() => {}}
                  DataPointSelection={() => {}}
                  GraphData={[
                    {
                      colors: ["#DB6E67", "#3E8439"],
                      edit: true,
                      growth: "10.26%",
                      growthText: "vs last month",
                      labels: [
                        "Jun 20",
                        "Jun 21",
                        "Jun 22",
                        "Jun 23",
                        "Jun 24",
                        "Jun 25",
                        "Jun 26",
                        "Jun 27",
                      ],
                      order: "desc",
                      series: [
                        {
                          data: [6500, 6418, 6456, 6526, 6356, 6456],
                          name: "API",
                        },
                        {
                          data: [206, 305, 340, 257, 2506, 4560],
                          name: "Webhook",
                        },
                      ],
                      title: "Area Chart",
                      tooltip: true,
                      total: "153",
                    },
                  ]}
                  GraphType="area"
                  Selection={() => {}}
                  SetGraphData="daily"
                  ShowLegend
                  Size="small"
                  XAxisLabelClick={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="box">
              <div className="box-title">Booking Percentage</div>
              <div className="graph-design">
                <VgGraph
                  DataPointMouseEnter={() => {}}
                  DataPointMouseLeave={() => {}}
                  DataPointSelection={() => {}}
                  GraphData={[
                    {
                      colors: ["#AE7DC7", "#DB6E67", "#76B971"],
                      edit: true,
                      growth: "10.26%",
                      growthText: "vs last month",
                      labels: [
                        "Jun 20",
                        "Jun 21",
                        "Jun 22",
                        "Jun 23",
                        "Jun 24",
                        "Jun 25",
                        "Jun 26",
                        "Jun 27",
                      ],
                      name: "Desktops",
                      order: "desc",
                      series: [
                        {
                          data: [56, 75, 107, 57, 27, 108, 33],
                          name: "Net Profit",
                        },
                        {
                          data: [76, 45, 35, 78, 105, 95, 68],
                          name: "Revenue",
                        },
                        {
                          data: [35, 29, 68, 105, 60, 48, 102],
                          name: "Free Cash Flow",
                        },
                      ],
                      title: "Line Chart",
                      tooltip: true,
                      total: "153",
                    },
                  ]}
                  GraphType="line"
                  PrefixPostFix={{
                    prefix: "",
                    suffix: "",
                  }}
                  Selection={() => {}}
                  SetGraphData="daily"
                  ShowDataLabelText
                  ShowLegend
                  ShowYaxisLabels
                  Size="medium"
                  XAxisLabelClick={() => {}}
                />
              </div>
            </div>
            <div className="box">
              <div className="box-title">Notification</div>
              <div className="graph-design">
                <VgGraph
                  DataPointMouseEnter={() => {}}
                  DataPointMouseLeave={() => {}}
                  DataPointSelection={() => {}}
                  GraphData={[
                    {
                      colors: ["#DB6E67", "#76B971", "#5B6790"],
                      edit: true,
                      growth: "10.26%",
                      growthText: "vs last month",
                      labels: [
                        "11/01/2024",
                        "11/03/2024",
                        "11/10/2024",
                        "11/17/2024",
                        "11/24/2024",
                        "11/30/2024",
                      ],
                      order: "desc",
                      series: [
                        {
                          data: [140.56, 105, 214, 171.9, 227, 113.456],
                          name: "Website Blog",
                          type: "column",
                        },
                        {
                          data: [
                            "23hrs",
                            "25.2768hrs",
                            "13.7768hrs",
                            "52.7hrs",
                            "24hrs",
                            "65.278hrs",
                          ],
                          name: "Social Media",
                          type: "line",
                        },
                        {
                          data: [
                            "10.26hrs",
                            "41hrs",
                            "33hrs",
                            "21.77876hrs",
                            "43hrs",
                            "25.2768hrs",
                          ],
                          name: "Social",
                          type: "line",
                        },
                      ],
                      title: "LineBarChart",
                      tooltip: true,
                      total: "153",
                    },
                  ]}
                  GraphType="linebar"
                  PrefixPostFix={{
                    prefix: "",
                    suffix: "",
                  }}
                  Selection={() => {}}
                  ShowDataLabelText
                  ShowLegend
                  ShowYaxisLabels
                  Size="medium"
                  XAxisLabelClick={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="lastbox">
              <div className="box-title">Trends</div>
              <div className="graph-design">
                <VgGraph
                  DataPointMouseEnter={() => {}}
                  DataPointMouseLeave={() => {}}
                  DataPointSelection={() => {}}
                  GraphData={[
                    {
                      colors: ["#91C0DC", "#AE7DC7", "#589288"],
                      edit: true,
                      growth: "10.26%",
                      growthText: "vs last month",
                      labels: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F",
                        "G",
                        "H",
                        "I",
                        "J",
                      ],
                      order: "desc",
                      series: [
                        {
                          data: [
                            44.33, 55, 57.4, 56, 61, 58.57, 65, 48, 55, 36,
                          ],
                          name: "Net Profit",
                        },
                        {
                          data: [76, 85.7, 101, 98, 87.6, 105, 89, 75, 92, 89],
                          name: "Revenue",
                        },
                        {
                          data: [35, 41.5, 36, 26.5, 45, 48.5, 39, 48, 47, 52],
                          name: "Free Cash Flow",
                        },
                      ],
                      title: "Stacked Bar Chart",
                      tooltip: true,
                      total: "153",
                    },
                  ]}
                  GraphType="stackedbar"
                  PrefixPostFix={{
                    prefix: "",
                    suffix: "",
                  }}
                  Selection={() => {}}
                  ShowLegend
                  ShowYaxisLabels
                  Size="medium"
                  XAxisLabelClick={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="box">
              <div className="box-title">Appointment Distribution</div>
              <div className="graph-design">s
                <VgGraph
                  DataPointMouseEnter={() => {}}
                  DataPointMouseLeave={() => {}}
                  DataPointSelection={() => {}}
                  GraphData={[
                    {
                      colors: ["#DB6E67", "#76B971", "#91C0DC"],
                      edit: true,
                      growth: "10.26%",
                      growthText: "vs last month",
                      labels: ["Product A", "Product B", "Product C"],
                      order: "desc",
                      series: [55, 35.63, 10.87],
                      title: "Pie Chart",
                      tooltip: true,
                      total: "153",
                    },
                  ]}
                  GraphType="pie"
                  PrefixPostFix={{
                    prefix: "",
                    suffix: "",
                  }}
                  Selection={() => {}}
                  ShowDataLabelText
                  Size="small"
                  XAxisLabelClick={() => {}}
                />
              </div>
            </div>
            <div className="box">
              <div className="box-title">Top Sales Item</div>
              <div className="graph-design">
                <VgGraph
                  DataPointMouseEnter={() => {}}
                  DataPointMouseLeave={() => {}}
                  DataPointSelection={() => {}}
                  GraphData={[
                    {
                      colors: [
                        "#DB6E67",
                        "#5B6790",
                        "#CA6B42",
                        "#DDBA80",
                        "#A0C2C3",
                        "#91C0DC",
                        "#666666",
                      ],
                      edit: true,
                      growth: "10.26%",
                      growthText: "vs last month",
                      labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
                      order: "desc",
                      series: [
                        {
                          data: [44.43, 55, 41.54, 64.4, 22, 43.3, 21],
                          name: "Revenue",
                        },
                      ],
                      title: "Bar Chart",
                      tooltip: true,
                      total: "153",
                    },
                  ]}
                  GraphType="bar"
                  PrefixPostFix={{
                    prefix: "",
                    suffix: "",
                  }}
                  Selection={() => {}}
                  ShowDataLabelText
                  ShowLegend
                  ShowYaxisLabels
                  Size="medium"
                  XAxisLabelClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;

