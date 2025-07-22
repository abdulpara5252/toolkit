import VgTokens from "../../../components/VgTokens/VgTokens";

export default {
  title: "Tokens",
  component: VgTokens,
  parameters: {
    viewMode: 'docs',
    layout: "default",
    docs: {
      description: {
        component:
          "Color Tokens",
      },
    }, 
    source: {
      code: null,
    },
  },
  tags: ["autodocs"],
  argTypes : {
    TypoGraph: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
    },
  }
};

export const Default = {
  args: {
    TypoGraph : false
  }

}
export const Typography = {
  args: {
    TypoGraph : true
  }
}