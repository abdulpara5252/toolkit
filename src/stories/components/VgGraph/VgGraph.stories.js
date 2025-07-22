import VgGraph from "../../../components/VgGraph/VgGraph";

function getLabels(period) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels = [];
  let currentDate = new Date();

  switch (period) {
    case 'daily':
      for (let i = 0; i < 8; i++) {
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        labels.push(`${month} ${day}`);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      break;

    case 'weekly':
      for (let i = 0; i < 8; i++) {
        // Get Monday of the week
        const day = currentDate.getDate();
        const diff = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
        currentDate.setDate(day + diff);
        
        const month = months[currentDate.getMonth()];
        labels.push(`${month} ${currentDate.getDate()}`);
        currentDate.setDate(currentDate.getDate() + 7);
      }
      break;
    
    case 'monthly':
      for (let i = 0; i < 8; i++) { // Adjusted for 12 months as per your request
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() + i);
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().slice(2);

        labels.push(`${month} '${year}`); // Always append month and 'YY
      }
      break;

    case 'yearly':
      for (let i = 0; i < 8; i++) {
        labels.push(currentDate.getFullYear().toString());
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
      break;

    default:
      return ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7', 'Oct 8'];
  }

  return labels;
}

const meta = {
  title: "Graph",
  component: VgGraph,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Graph component renders different chart types based on the given props.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    GraphType: {
      control: "select",
      options: ["bar", "stackedbar",  "horizontalbar", "groupedbar", "area", "donut", "line", "linebar", "pie"],
      description: "Select the Chart from Donut,Area,Line,Bar,Column,LineBar,Pie",
      table: { disable: true }
    },
    Size: {
      control: "select",
      options: ["x-small", "small", "medium", "large"],
      description: "Select the Chart from x-small, small, medium, large",
    },
    GraphData: {
      control: "object",
      type: { name: "array" },
      description: `Array of data like labels, series(x-axis and y-axis data, series data), colors to be displayed in the chart.`,
    },
    GraphHeight: {
      control: { type: "text" },
      description:
        "The GraphHeight property lets users define the graph’s height in pixels, customizing its vertical display within the interface. This setting provides flexibility to fit the map seamlessly within different screen layouts and designs.",
      table: { disable: true },  
    },
    GraphWidth: {
      control: { type: "text" },
      description:
        "The GraphWidth property allows users to set a specific width for the map in pixels, adjusting its display size within the application. This customization enables better control over the map's appearance to suit various layouts and screen sizes.",
      table: { disable: true }, 
    },
    DataPointSelection: {
      action: "clicked",
      table: {
        category: "Events",
      },
      description: `The "DataPointSelection" property handles the action triggered when the slice is graph's clicked`,
    },
    DataPointMouseEnter: {
      action: "mouse enter",
      table: {
        category: "Events",
      },
      description: `The "DataPointMouseEnter" property handles the action triggered when user’s mouse enter on a datapoint`,
    },
    DataPointMouseLeave: {
      action: 'mouse leave',
      table: {
        category: "Events",
      },
      description: `The "DataPointMouseLeave" property handles the action triggered when user mouse leave event for a datapoint `,
    },
    XAxisLabelClick: {
      action: 'clicked',
      table: {
        category: "Events",
      },
      description: `The "XAxisLabelClick" property handles the action triggered when user clicks on the x-axis labels `,
    },
    Selection: {
      action: 'clicked',
      table: {
        category: "Events",
      },
      description: `The "Selection" property handles the action triggered when user selects rect using the Selection tool.The second argument contains the yaxis and xaxis coordinates where user made the Selection `,
    },
    ShowLegend: {
      control: "boolean",
      type: { name: "boolean" },  
      description:
        "The ShowLegend property enables or disables the legend functionality within a Graph. When enabled",
      if: { arg: "Size", neq: "x-small"},  
    },
    PrefixPostFix: {
      control: "object",
      description: `The PrefixPostFix property allows users to add a prefix or postfix value to data labels in a graph. This customization helps enhance clarity by appending contextual information, such as units or symbols, to the graph values.\n
      Eg :-PrefixPostFix : {
              prefix : "$"
              suffix : "hrs"
          }
      `,
      type: {
        name: "object",
        value: {
          prefix: { name: "string" },
          suffix: { name: "string" },
        }
      }
    },
    GraphTab: {
      control: "boolean",
      description: "The GraphTab property allows users to enable or disable the display of tabs on top of the graph component by setting a boolean value. When true, tabs are visible for switching between graph views; when false, they remain hidden."
    },
    ShowDataLabelText: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The ShowDataLabelText property enables or disables the label functionality within a Graph. When enabled",
      if: { arg: "Size", neq: "x-small"},
    },
    SetGraphData: {
      control: "select",
      options: ["daily", "weekly", "monthly", "yearly"],
      description: "Select the Chart data from daily, weekly, monthly, yearly",
      if: { arg: 'GraphType', in: ['area', 'line'] }
    },
     ShowYaxisLabels: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "the showYaxisLabels property enables or disables the display of y-axis labels in a graph. When set to true, y-axis labels are visible, providing context for the data points; when false, they are hidden.",
    },
    LinkLabelText: {
      control: "text",
      description: "Sets the dynamic label content to be displayed at the top of the chart."
    },
    OnClick: {
      action: 'clicked',
      table: {
        category: "Events",
      },
      description: "Triggered when the chart is clicked. Use this to handle custom interactions."
    }
  },
};

export default meta;

export const BarChart = {
  args: {
    GraphType: "bar",
    Size: "medium",
    GraphData: [
      {
        title: "Bar Chart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [
          {
            name: "Revenue",
            data: [44.43, 55, 41.54, 64.40, 22, 43.3, 21.00],
          },
        ],
        labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        colors: ["#DB6E67", "#5B6790", "#CA6B42", "#DDBA80", "#A0C2C3", "#91C0DC", "#666666"],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month" 
      },
    ],
    DataPointSelection: (event, chartContext, config) => {},
    DataPointMouseEnter: (event, chartContext, opts) => {},
    DataPointMouseLeave: (event, chartContext, opts) => {},
    XAxisLabelClick: (event, chartContext, opts) => {},
    Selection: (chartContext, { xaxis, yaxis }) => {},
    PrefixPostFix: {
      "prefix": "",
      "suffix": "",
    },
    GraphTab: false,
    ShowLegend: true,
    ShowDataLabelText: true,
    ShowYaxisLabels: true,
    LinkLabelText:"", 
    OnClick: ((e) => {}),
  },
};

export const StackedBarChart = {
  parameters: {
    controls: {
      exclude: ['ShowDataLabelText']
    }
  },
  args: {
    GraphType: "stackedbar",
    Size: "medium",
    GraphData: [
      {
        title: "Stacked Bar Chart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [
          {
            name: "Net Profit",
            data: [44.33, 55, 57.4, 56, 61, 58.57, 65, 48, 55, 36],
          },
          {
            name: "Revenue",
            data: [76, 85.7, 101, 98, 87.6, 105, 89, 75, 92, 89],
          },
          {
            name: "Free Cash Flow",
            data: [35, 41.5, 36, 26.5, 45, 48.5, 39, 48, 47, 52],
          },
        ],
        labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], // X-axis categories
        colors: ["#91C0DC", "#AE7DC7", "#589288"],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month" 
      },
    ],
    DataPointSelection: (event, chartContext, config) => {},
    DataPointMouseEnter: (event, chartContext, opts) => {},
    DataPointMouseLeave: (event, chartContext, opts) => {},
    XAxisLabelClick: (event, chartContext, opts) => {},
    Selection: (chartContext, { xaxis, yaxis }) => {},
    ShowLegend: true,
    PrefixPostFix: {
      "prefix": "",
      "suffix": "",
    },
    GraphTab: false,
    ShowYaxisLabels: true,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  }
};

export const HorizontalBarChart = {
  parameters: {
    controls: {
      exclude: ['ShowDataLabelText']
    }
  },
  args: {
    GraphType: "horizontalbar",
    Size: "medium",
    GraphData: [
      {
        title: "Horizontal Bar Chart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [
          {
            name: "Revenue",
            data: [50, 55, 54, 64, 22, 43, 21],
          },
        ],
        labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        colors: ["#DB6E67", "#5B6790", "#CA6B42", "#DDBA80", "#A0C2C3", "#91C0DC", "#666666"],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month" 
      },
    ],
    DataPointSelection: (event, chartContext, config) => {},
    DataPointMouseEnter: (event, chartContext, opts) => {},
    DataPointMouseLeave: (event, chartContext, opts) => {},
    XAxisLabelClick: (event, chartContext, opts) => {},
    Selection: (chartContext, { xaxis, yaxis }) => {},
    PrefixPostFix: {
      "prefix": "",
      "suffix": "",
    },
    GraphTab: false,
    ShowYaxisLabels: true,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  },
};

export const GroupedBarChart = {
  parameters: {
    controls: {
      exclude: ['ShowDataLabelText']
    }
  },
  args: {
    GraphType: "groupedbar",
    Size: "medium",
    GraphData: [
      {
        title: "Grouped Bar Chart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [
          {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58],
          }, 
          {
            name: 'Revenue',
            data: [76, 95, 101, 98, 87, 105],
          },
        ],
        labels: [2001, 2002, 2003, 2004, 2005, 2006],
        colors: ["#DB6E67", "#91C0DC"],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month" 
      },
    ],
    DataPointSelection: (event, chartContext, config) => {},
    DataPointMouseEnter: (event, chartContext, opts) => {},
    DataPointMouseLeave: (event, chartContext, opts) => {},
    XAxisLabelClick: (event, chartContext, opts) => {},
    Selection: (chartContext, { xaxis, yaxis }) => {},
    PrefixPostFix: {
      "prefix": "",
      "suffix": "",
    },
    GraphTab: false,
    ShowYaxisLabels: true,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  },
};

export const AreaChart = {
  parameters: {
    controls: {
      exclude: ['ShowDataLabelText']
    }
  },
  args: {
    GraphType: "area",

    Size: "small",
    GraphData: [
      {
        title: "Area Chart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [
          {
            name: "API",
            data: [6500, 6418, 6456, 6526, 6356, 6456],
          },
          {
            name: "Webhook",
            data: [206, 305, 340, 257, 2506, 4560],
          },
        ],
        labels: getLabels('daily'),
        colors: ["#DB6E67", "#3E8439"],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month"
      },
    ],
    ShowLegend: true,
    XAxisLabelClick: function (event, chartContext, opts) {},
    GraphTab: false,
    SetGraphData: "daily",
    ShowYaxisLabels: true,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  },
  render: (args) => {
    // Update only labels based on SetGraphData
    const updatedData = [...args.GraphData];
    updatedData[0] = {
      ...updatedData[0],
      labels: getLabels(args.SetGraphData)
    };
    
    return <VgGraph {...args} GraphData={updatedData} />;
  }
};

export const DonutChart = {
  parameters: {
    controls: {
      exclude: ['ShowDataLabelText']
    }
  },
  args: {
    GraphType: "donut",
    Size: "small",
    GraphData: [
      {
        title: "Donut Chart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [44, 55],
        labels: ["API Calls", "Webhook Calls"],
        colors: ["#76B971", "#9D5654"],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month",
        totalText: "Total",
      },
    ],
    ShowLegend: true,
    DataPointSelection: (event, chartContext, config) => {},
    DataPointMouseEnter: (event, chartContext, opts) => {},
    DataPointMouseLeave: (event, chartContext, opts) => {},
    GraphTab: false,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  },
};

export const LineChart = {
  args: {
    GraphType: "line",
    Size: "medium",
    GraphData: [
      {
        title: "Line Chart",
        name: "Desktops",
        tooltip: true,
        order: "desc",
        edit: true,  
        series: [
          {
            name: "Net Profit",
            data: [56, 75, 107, 57, 27, 108, 33],
          },
          {
            name: "Revenue",
            data: [76, 45, 35, 78, 105, 95, 68],
          },
          {
            name: "Free Cash Flow",
            data: [35, 29, 68, 105, 60, 48, 102],
          },
        ],
        labels: ["11/15/2024", "11/16/2024", "11/17/2024", "11/18/2024", "11/19/2024", "11/20/2024", "11/21/2024"],
        colors: ["#AE7DC7", "#DB6E67", "#76B971"], 
        total: "153",
        growth: "10.26%",
        growthText: "vs last month"
      },
    ],
    SetGraphData: "daily",
    ShowLegend: true,
    PrefixPostFix: {
      "prefix": "",
      "suffix": "",
    },
    XAxisLabelClick: (event, chartContext, opts) => {},
    GraphTab: false,
    ShowDataLabelText: true,
    ShowYaxisLabels: true,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  },
  render: (args) => {
    // Update only labels based on SetGraphData
    const updatedData = [...args.GraphData];
    updatedData[0] = {
      ...updatedData[0],
      labels: getLabels(args.SetGraphData)
    };
    
    return <VgGraph {...args} GraphData={updatedData} />;
  }
};

export const LineBarChart = {
  args: {
    GraphType: "linebar",
    Size: "medium",
    GraphData: [
      {
        title: "LineBarChart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [
          {
            name: 'Website Blog',
            type: 'column',
            data: [140.56, 105, 214.00, 171.9, 227, 113.456],
          },
          {
            name: 'Social Media',
            type: 'line',
            data: ['23hrs', '25.2768hrs', '13.7768hrs', '52.7hrs', '24hrs', '65.278hrs'],
          },
          {
            name: 'Social',
            type: 'line',
            data: ['10.26hrs', '41hrs', '33hrs', '21.77876hrs', '43hrs', '25.2768hrs'],
          },
        ],
        labels: ["11/01/2024", "11/03/2024", "11/10/2024", "11/17/2024", "11/24/2024", "11/30/2024"],
        colors: ["#DB6E67", "#76B971", "#5B6790",],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month" 
      },
    ],
    DataPointSelection: (event, chartContext, config) => {},
    DataPointMouseEnter: (event, chartContext, opts) => {},
    DataPointMouseLeave: (event, chartContext, opts) => {},
    XAxisLabelClick: (event, chartContext, opts) => {},
    Selection: (chartContext, { xaxis, yaxis }) => {},
    ShowLegend: true,
    PrefixPostFix: {
      "prefix": "",
      "suffix": "",
    },
    GraphTab: false,
    ShowDataLabelText: true,
    ShowYaxisLabels: true,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  },
};

export const PieChart = {
  args: {
    GraphType: "pie",
    Size: "small",
    GraphData: [
      {
        title: "Pie Chart",
        tooltip: true,
        order: "desc",
        edit: true,
        series: [55, 35.63, 10.87],
        labels: ["Product A", "Product B", "Product C"],
        colors: ["#DB6E67", "#76B971", "#91C0DC"],
        total: "153",
        growth: "10.26%",
        growthText: "vs last month" 
      },
    ],
    DataPointSelection: (event, chartContext, config) => {},
    DataPointMouseEnter: (event, chartContext, opts) => {},
    DataPointMouseLeave: (event, chartContext, opts) => {},
    PrefixPostFix: {
      "prefix": "",
      "suffix": "",
    },
    GraphTab: false,
    ShowDataLabelText: true,
    LinkLabelText:"",
    OnClick: ((e) => {}),
  },
};
