import VgSegments from "../../../components/VgSegments/VgSegments";
export default {
    title: 'Segments',
    component: VgSegments,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Segments is a UI component that displays multiple tabs, allowing users to switch between them by tapping. Each tab represents a different view or section, loading unique content when selected.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        Title: {
            control: 'text',
            description: `The Title property in a Segments allows users to set a custom label for each tab by defining titles in a JSON array. Each tab's title is dynamically assigned from the array, making it easy to update or localize tab names.`,
        },
        onClick: {
            action: "clicked",
            table: {
                category: "Events",
            },
            description: `The onClick property triggers an event when a user taps a tab, returning the tab's unique ID and name. This functionality helps track user interactions and identify which tab was selected.`,
        },
        NoOfSegments: {
            control: { type: "text" },
            description: `The NoOfSegments property in Segments lets users specify the total number of tabs to display by entering a number. This dynamically adjusts the number of tabs in the UI, based on the provided value.`,
        },
        ActiveSegment: {
            control: {
              type: 'object',
            },
            description: `The ActiveSegment property sets the default selected tab(s) when the component loads.     
- In single-select mode (\`Multi: false\`), pass a single number (e.g., \`2\`) to activate the second tab (1-based index).
- In multi-select mode (\`Multi: true\`), pass an array of numbers (e.g., \`[1, 3, 4]\`) to activate multiple tabs (1-based index).
          
          These values refer to the position in the Name array, not the ID itself.`,
          },
          
        Name: {
            control: 'array',
            description: `The Name property allows users to define custom names for each tab through a JSON array, where each array entry corresponds to a specific tab. This setup enables flexible naming and easy updates to tab labels.`,
        },
        InfoTooltipMessage: {
            control: "text",
            type: { name: "string" },
            description: `The Tooltip Message property allows users to input a custom message for each tab, which will display in the InfoChip when hovered or tapped. This enables personalized guidance or descriptions to assist users in understanding each tab’s purpose.`
        },
        BeakPosition: {
            control: 'select',
            options: ['Left', 'Middle', 'Right'],
            description: '',
            if: {
                arg: "InfoTooltipMessage",
                truthy: true 
              },
          },
        TabSegment: {
            control: { type: "select" },
            options: ["vertical", "horizontal"],
            description: `The Tab Segment property defines the layout orientation of the tabs, allowing values of either horizontal or vertical. This setting enables users to customize the tab alignment to best fit the application's design and usability needs.`,
        },
        Multi: {
            control: 'boolean',
            description: `The Multi property allows users to enable or disable the multi-select feature for the tabs. When set to true, users can select multiple tabs simultaneously, enhancing flexibility in tab selection and interaction.`,
        },
        Html: {
            control: 'boolean',
            description: `The Html property enables rendering of HTML content within segment tabs. When set to true, the content in the Name property will be rendered as HTML, allowing for rich formatting, icons, and structured content within tabs.`,
        },
        TextAlignment: {
            control: { type: "select" },
            options: ["center", "left", "right"],
            description: `The Text Alignment property allows users to set the alignment of text within the tabs. Options include left, center, and right alignment, providing flexibility in how tab labels are presented to users.`,
        },
        TabDesign : {
            control: 'boolean',
            description: `The TabDesign property enables rendering of HTML content within segment tabs. When set to true, the content in the Name property will be rendered as HTML, allowing for rich formatting, icons, and structured content within tabs.`,
        },

    FullWidth : {
      control: 'boolean',
      description: `The FullWidth property enables rendering of HTML content within segment tabs. When set to true, the content in the Name property will be rendered as HTML, allowing for rich formatting, icons, and structured content within tabs.`,
    },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      table: { category: "Required/Validation" },
      description: `The "Required" property for a Input is a boolean that determines if the field must be filled by the user. When set to true, the Input becomes mandatory, and the form cannot be submitted without a value.`,
    },
    CustomErrorMessage: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomErrorMessage" property allows users to define a personalized error message that will appear when input validation fails. This message helps guide users by providing clear feedback on what went wrong and how to correct it.`,

      table: {
        category: "Required/Validation",
      },
    },
  },
};

export const Segments = {
    args: {
        Title: " ",
        NoOfSegments: "7",
        Name: [
            { id: 1, name: 'Segment' },
            { id: 2, name: 'Segment' },
            { id: 3, name: 'Segment' },
            { id: 4, name: 'Segment' },
            { id: 5, name: 'Segment' },
            { id: 6, name: 'Segment' },
            { id: 7, name: 'Segment' },
            { id: 8, name: 'Segment' },
            { id: 9, name: 'Segment' },
            { id: 10, name: 'Segment' },
            
        ],
        InfoTooltipMessage: "",
        BeakPosition: "Left",
        TabSegment: 'horizontal',
        ActiveSegment: [1,3,4],
        Multi: true,
        Html: false,
        TextAlignment: "center",
        Required: false,
        CustomErrorMessage: "",
    },
};

export const SegmentsWithHtml = {
    args: {
        Title: "Segments with HTML",
        NoOfSegments: "3",
        Name: [
            { id: 1, name: '<div><strong>Segment</strong> with Html<br/><span>Segment 1</span></div>' },
            { id: 2, name: '<div><strong>New Segment</strong></div>' },
            { id: 3, name: '<div><strong>Segment 3</strong></div>' },
        ],
        InfoTooltipMessage: "Select a payment method",
        BeakPosition: "Left",
        TabSegment: 'vertical',
        ActiveSegment: [1,3,4],
        Multi: true,
        Html: true,
        TextAlignment: "left",
    },
};
export const SegmentsWithTabDesign= {
    args: {
        Title: "Segments with HTML",
        NoOfSegments: "4",
        Name: [
           { id: 1, name: 'Segment' },
            { id: 2, name: 'Segment' },
            { id: 3, name: 'Segment' },
            { id: 4, name: 'Segment' },
        ],
        InfoTooltipMessage: "",
        BeakPosition: "Left",
        TabSegment: 'horizontal',
        ActiveSegment: 1,
        Multi: false,
        Html: false,
        TextAlignment: "center",
        TabDesign : true
    },
};
