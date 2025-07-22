import React from 'react';
import VgSearchDropdown from "../../../components/VgSearchDropdown/VgSearchDropdown";
import VgSvg from "../../../components/VgSvg/VgSvg";
import { mockData } from "../../../components/VgSearchDropdown/mockdata";

// Transform mockData.json into VgSearchDropdown options format
const transformMockDataToOptions = (data) => {
  // Find parent services (where parentServiceId is empty)
  const parentServices = data.filter((item) => item.parentServiceId === '');

  // Create grouped options
  return parentServices.map((parent) => {
    // Find child services where parentServiceId matches parent's serviceId
    const childOptions = data
      .filter((item) => item.parentServiceId === parent.serviceId)
      .map((child) => ({
        label: <span style={{ color: "royalblue" }}>{child.serviceTitle}</span>,
        value: child.serviceId,
        inputplaceholder: child.serviceTitle,
      }));

    return {
      key: parent.serviceId, // Use serviceId as unique key for the group
      group: <div style={{ color: "rosybrown" }}>{parent.serviceTitle}</div>,
      options: childOptions,
    };
  });
};

const meta = {
  title: "Search Dropdown",
  component: VgSearchDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A searchable dropdown component that allows users to filter and select options from a list. It supports custom placeholder text, dynamic value setting, event handlers, and optional prefix/suffix icons. Options can be provided in a grouped or flat format, with group and label supporting strings or React nodes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Placeholder: {
      type: "string",
      description: "The placeholder text shown in the input field when no value is selected or typed.",
    },
    SetValue: {
      control: "text",
      type: { name: "string" },
      description: "The current value displayed in the input field. This can be used to set a default or pre-selected value.",
      table: { disable: false },
    },
    Name: {
      control: "text",
      type: { name: "string" },
      description: "Assigns a name attribute to the input element, useful for form handling or debugging.",
      table: { disable: false },
    },
    Options: {
      control: "object",
      type: {
        name: "arrayOf",
        value: {
          name: "union",
          value: [
            {
              name: "shape",
              value: {
                group: { name: "union", value: ["string", "React.ReactNode"] },
                options: {
                  name: "arrayOf",
                  value: {
                    name: "shape",
                    value: {
                      label: { name: "union", value: ["string", "React.ReactNode"] },
                      value: "string",
                      inputplaceholder: { name: "string", required: false },
                    },
                  },
                },
              },
            },
            {
              name: "shape",
              value: {
                label: { name: "union", value: ["string", "React.ReactNode"] },
                value: "string",
                inputplaceholder: { name: "string", required: false },
              },
            },
          ],
        },
      },
      description:
        "An array of options, either grouped (with `group` and `options` properties) or flat (with `label` and `value` properties). `group` and `label` can be strings or React nodes. `inputplaceholder` is an optional string for filtering.",
      table: { disable: false },
    },
    OnChange: {
      action: "onChange",
      description: "Callback function triggered when the input value changes. Returns the input event.",
      table: { category: "Events" },
    },
    OnBlur: {
      action: "onBlur",
      description: "Callback function triggered when the dropdown loses focus. Useful for validation or cleanup.",
      table: { category: "Events" },
    },
    OnFocus: {
      action: "onFocus",
      description: "Callback function triggered when the dropdown gains focus.",
      table: { category: "Events" },
    },
    OnKeyUp: {
      action: "onKeyUp",
      description: "Callback function triggered when a key is released in the input field.",
      table: { category: "Events" },
    },
    OnKeyDown: {
      action: "onKeyDown",
      description: "Callback function triggered when a key is pressed in the input field.",
      table: { category: "Events" },
    },
    OnClick: {
      action: "onClick",
      description: "Callback function triggered when the input field is clicked.",
      table: { category: "Events" },
    },
    OnSearch: {
      action: "onSearch",
      description: "Callback function triggered when the search text changes. Receives the current search text.",
      table: { category: "Events" },
    },
    OnSelectedItem: {
      action: "onSelectedItem",
      description: "Callback function triggered when an option is selected. Receives the selected option object.",
      table: { category: "Events" },
    },
    Loading: {
      control: "boolean",
      type: { name: "boolean" },
      description: "Displays a loading indicator inside the dropdown, typically while fetching remote data.",
      table: { disable: false },
    },
    Disabled: {
      control: "boolean",
      type: { name: "boolean" },
      description: "Disables the dropdown input.",
      table: { disable: false },
    },
    Icon: {
      control: "object",
      type: { name: "React.ReactNode" },
      description: "Optional icon to display either as a prefix or suffix inside the input field.",
      table: { disable: false },
    },
    IconPosition: {
      control: "select",
      options: ["prefix", "suffix"],
      description: "Determines whether the provided icon appears on the left ('prefix') or right ('suffix') side of the input field.",
      table: { type: { summary: "string" }, defaultValue: { summary: "prefix" } },
    },
    OnScroll: {
      action: 'onScroll',
      description: 'Callback function triggered when scrolling near the bottom of the list. Receives the next page number.',
      table: { category: 'Events' },
    },
    MenuListWidth: {
      control: "text",
      type: { name: "string" },
      description: "Sets the width of the dropdown menu list dynamically. Accepts values like '200px', '50%', or a number (interpreted as pixels).",
      table: { defaultValue: { summary: "auto" } },
    },
    Searching: {
      control: "boolean",
      type: { name: "boolean" },
      description: "Searching the dropdown option.",
      table: { disable: false },
    },
    OnScrollApiCall: {
      control: "boolean",
      type: { name: "boolean" },
      description: "When true, enables the OnScroll callback to trigger an API call for Pagination; when false, disables scroll-based API calls.",
      table: { defaultValue: { summary: false }, category: "Behavior" },
    },
    currentLocation: {
      control: "text",
      type: { name: "string" },
      description: "An optional string representing the current location context. If provided, the dropdown opens immediately on input click; otherwise, it opens only when typing begins.",
      table: { defaultValue: { summary: undefined }, category: "Behavior" },
    },
    Pagination: {
      control: "boolean",
      type: { name: "boolean" },
      description: "Enables or disables pagination controls in the dropdown footer. When true, displays 'Prev', 'Next', and page number buttons; when false, shows alternative footer content like item count or 'No Matches'.",
      table: { defaultValue: { summary: false }, category: "Behavior" },
    },
  },
};

export default meta;

export const GroupedOptions = {
  args: {
    Placeholder: "Search...",
    SetValue: "",
    Options: [
      {
        group: 'Braids and Twists',
        options: [
          { label: 'Goddess Braids', value: 'goddess-braids' },
          { label: 'Senegalese Twists', value: 'senegalese-twists' },
        ],
      },
      {
        group: 'Nail Care',
        options: [
          { label: 'Acrylic Nails', value: 'acrylic-nails' },
          { label: 'Gel Polish', value: 'gel-polish' },
        ],
      },
    ],
    Disabled: false,
    Loading: false,
    Icon: <VgSvg name="search" />,
    IconPosition: "prefix",
    MenuListWidth: "400px", // Default width for this story
    OnChange: (e) => console.log('Change:', e.target.value),
    OnBlur: () => console.log('Blur'),
    OnFocus: () => console.log('Focus'),
    OnKeyUp: (e) => console.log('KeyUp:', e.key),
    OnKeyDown: (e) => console.log('KeyDown:', e.key),
    OnClick: () => console.log('Click'),
    OnSearch: (searchText) => console.log('Search:', searchText),
    OnSelectedItem: (option) => console.log('Selected:', option),
    OnScroll: (page) => console.log('Scrolled to page:', page),
    OnScrollApiCall: false, // Default to false, toggleable in controls
  },
};

export const FlatOptions = {
  args: {
    Placeholder: "Search...",
    SetValue: "",
    Options: [
      { label: 'Goddess Braids', value: 'goddess-braids' },
      { label: 'Senegalese Twists', value: 'senegalese-twists' },
      { label: 'Acrylic Nails', value: 'acrylic-nails' },
      { label: 'Gel Polish', value: 'gel-polish' },
    ],
    Disabled: false,
    Loading: false,
    Icon: <VgSvg name="search" />,
    IconPosition: "prefix",
    MenuListWidth: "250px", // Default width for this story
    OnChange: (e) => console.log('Change:', e.target.value),
    OnBlur: () => console.log('Blur'),
    OnFocus: () => console.log('Focus'),
    OnKeyUp: (e) => console.log('KeyUp:', e.key),
    OnKeyDown: (e) => console.log('KeyDown:', e.key),
    OnClick: () => console.log('Click'),
    OnSearch: (searchText) => console.log('Search:', searchText),
    OnSelectedItem: (option) => console.log('Selected:', option),
    OnScroll: (page) => console.log('Scrolled to page:', page),
    OnScrollApiCall: false, // Default to false, toggleable in controls
  },
};

export const GroupedHtmlOptions = {
  args: {
    Placeholder: "Search...",
    SetValue: "",
    Options: [
      {
        group: <div style={{ color: "rosybrown" }}>Braids and Twists</div>,
        options: [
          { label: <span style={{ color: "royalblue" }}>Goddess Braids</span>, value: 'goddess-braids', inputplaceholder: 'Goddess Braids' },
          { label: 'Senegalese Twists', value: 'senegalese-twists' },
        ],
      },
      {
        group: <div style={{ color: "rosybrown" }}>Nail Care</div>,
        options: [
          { label: 'Acrylic Nails', value: 'acrylic-nails' },
          { label: 'Gel Polish', value: 'gel-polish' },
        ],
      },
    ],
    Disabled: false,
    Loading: false,
    Icon: <VgSvg name="search" />,
    IconPosition: "prefix",
    MenuListWidth: "350px", // Default width for this story
    OnChange: (e) => console.log('Change:', e.target.value),
    OnBlur: () => console.log('Blur'),
    OnFocus: () => console.log('Focus'),
    OnKeyUp: (e) => console.log('KeyUp:', e.key),
    OnKeyDown: (e) => console.log('KeyDown:', e.key),
    OnClick: () => console.log('Click'),
    OnSearch: (searchText) => console.log('Search:', searchText),
    OnSelectedItem: (option) => console.log('Selected:', option),
    OnScroll: (page) => console.log('Scrolled to page:', page),
    OnScrollApiCall: false, // Default to false, toggleable in controls
  },
};

export const MockDataOptions = {
  args: {
    Placeholder: "Search...",
    SetValue: "",
    Options: transformMockDataToOptions(mockData),
    Disabled: false,
    Loading: false,
    Icon: <VgSvg name="search" />,
    IconPosition: "prefix",
    MenuListWidth: "400px", // Default width for this story
    OnChange: (e) => console.log('Change:', e.target.value),
    OnBlur: () => console.log('Blur'),
    OnFocus: () => console.log('Focus'),
    OnKeyUp: (e) => console.log('KeyUp:', e.key),
    OnKeyDown: (e) => console.log('KeyDown:', e.key),
    OnClick: () => console.log('Click'),
    OnSearch: (searchText) => console.log('Search:', searchText),
    OnSelectedItem: (option) => console.log('Selected:', option),
    OnScroll: (page) => console.log('Scrolled to page:', page),
    OnScrollApiCall: false, // Default to false, toggleable in controls
  },
};