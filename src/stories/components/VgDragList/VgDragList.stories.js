import VgDragList from "../../../components/VgDragList/VgDragList";

export default {
  title: "DragList",
  component: VgDragList,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "VgDragList is a component that allows users to create a list of items that can be dragged and reordered. It features parent-child checkbox functionality, accordion-style expand/collapse, and drag-and-drop reordering in edit mode.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ShowEditSave: {
      control: "boolean",
      description: "Controls whether the Edit/Save button is displayed",
      table: { 
        defaultValue: { summary: "true" }
      },
    },
    ParentCheckboxTitle: {
      control: "text",
      description: "Title for the parent checkbox",
      table: { 
        type: { summary: "string" }
      },
    },  
    RawData: {
      control: "object",
      description: "Array of options data to display in the list",
      table: { 
        type: { summary: "Options[]" }
      },
    },
    onChange: {
      action: "onChange",
      table: { 
        category: "Events",
        type: { summary: "(options: Options[]) => void" }
      },
      description: "Callback fired when options data changes (selection or reordering)",
    },
    OnEditSave: {
      action: "OnEditSave",
      table: { 
        category: "Events",
        type: { summary: "(isEditing: boolean, options: Options[]) => void" }
      },
      description: "Callback fired when Edit/Save button is clicked",
    },
  },
};

// Sample options data
const defaultOptions = [
  { id: '1', name: 'Joe edited 2hfkdshfkds Ford 333 0', selected: true },
  { id: '2', name: 'Yash Mathukiya', selected: true },
  { id: '3', name: 'Rich@rd^ Miller', selected: true },
  { id: '4', name: 'Harischandra ?', selected: false },
  { id: '5', name: 'Mayur Multi Provider', selected: false },
  { id: '6', name: 'emp10 10', selected: false },
  { id: '7', name: 'John20 Lewish', selected: false },
  { id: '8', name: 'tick ettest', selected: false },
  { id: '9', name: 'Owner Owner', selected: false },
  { id: '10', name: 'SP Sync Employee', selected: false  },
];

export const Default = {
  args: {
    ShowEditSave: true,
    ParentCheckboxTitle: "Options",
    RawData: defaultOptions,
    onChange: (options) => {
      console.log('Options changed:', options);
    },
    OnEditSave: (isEditing, options) => {
      console.log('Edit/Save clicked:', { isEditing, options });
    },
  },
};
