import VgCustomerDropdown from "../../../components/VgCustomerDropdown/VgCustomerDropdown";

export default {
  title: "Customer Dropdown",
  component: VgCustomerDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown Fields allow users to select from an Options List displayed in a Dropdown Menu. Dropdown Fields are useful for hiding a long list of options. If the options need to always be visible to users, consider using Segment instead.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: {
      action: "onChange",
      table: {
        category: "Events",
        type: { summary: "function" },
      },
      description: "Triggered when the selected option changes.",
    },
  },
};

export const Default = {
  args: {
    onChange: (e) => {
      console.log("Selected option:", e);
    },
  },
};