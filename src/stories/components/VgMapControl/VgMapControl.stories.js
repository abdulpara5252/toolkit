import VgMapControl from "../../../components/VgMapControl/VgMapControl";

export default {
  title: "Map Control",
  component: VgMapControl,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Map Control used for set location, set marker in map and correct location.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Latitude: {
      control: { type: "number" },
      description:
        "The Latitude property allows users to input a specific latitude value to pinpoint a location on a map. This helps in accurately setting map markers or defining a central map position based on user-defined coordinates.",
    },
    Longitude: {
      control: { type: "number" },
      description:
        "The Longitude property lets users specify a longitude value to set a precise location on a map. This, combined with latitude, enables accurate positioning of map markers or center points based on user input.",
    },
    Radius: {
      control: { type: "number" },
      description:
        "The radius property allows users to enter a distance in miles to define a circular area around a specified location on a map. This is useful for highlighting proximity or search areas within a set distance from a central point.",
    },
    FixIncorrectMarker: {
      control: { type: "boolean" },
      type: { name: "boolean" },
      description:
        "The radius property allows users to enter a distance in miles to define a circular area around a specified location on a map. This is useful for highlighting proximity or search areas within a set distance from a central point.",
    },
    markerIcon: {
      table: {
        disable: "true",
      },
    },
    onMarkerDragEnd: {
      table: {
        disable: "true",
      },
    },
    apiKey: {
      table: {
        disable: "true",
      },
    },
    Zoom: {
      control: { type: "number" },
      description: "Zoom for the zoom in/out map",
      table: {
        disable: "true",
      },
    },
    MapHeight: {
      control: { type: "text" },
      description:
        "The MapHeight property lets users define the map’s height in pixels, customizing its vertical display within the interface. This setting provides flexibility to fit the map seamlessly within different screen layouts and designs.",
    },
    MapWidth: {
      control: { type: "text" },
      description:
        "The MapWidth property allows users to set a specific width for the map in pixels, adjusting its display size within the application. This customization enables better control over the map's appearance to suit various layouts and screen sizes.",
    },
    MapControlId: {
      control: "text",
      table: { disable: true },
    },
    CloseBackTitle: {
      action: "text",
      table: { disable: true },
    },
    NativeAction: {
      control: "number",
      table: { disable: true },
    },
    Footer: {
      control: "number",
      table: { disable: true },
    },
    TimerCount: {
      control: "number",
      table: { disable: true },
    },
    IsFullLength: {
      control: "boolean",
      table: { disable: true },
    },
    VagaroToolkit: {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
    },
  },
};

export const Default = {
  args: {
    Latitude: 41.38867,
    Longitude: -71.95875,
    Radius: 0,
    FixIncorrectMarker: false,
    MapWidth: "100%",
    MapHeight: "100%",
    NativeAction: 13,
    Footer: 2,
    TimerCount: 1000,
    IsFullLength: false,
    CloseBackTitle: "",
    MapControlId: "",
    VagaroToolkit: 1,
  },
};
