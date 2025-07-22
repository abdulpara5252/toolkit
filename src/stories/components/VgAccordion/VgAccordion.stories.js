import VgAccordion from "../../../components/VgAccordion/VgAccordion";
import VgCheckbox from "../../../components/VgCheckbox/VgCheckbox";

const brands = [
  { id: "arctic-fox", label: "Arctic Fox" },
  { id: "briogeo", label: "Briogeo" },
];

export default {
  title: "Accordion",
  component: VgAccordion,
  tags: ["autodocs"],
  argTypes: {
    Title: {
      control: "text",
      description: "Accordion title shown in the header.",
    },
    Body: {
      control: false,
      description: "HTML or JSX content inside the accordion.",
    },
    OpenIcon: {
      control: "text",
      description: "SVG shown when accordion is open (ReactNode).",
    },
    CloseIcon: {
      control: "text",
      description: "SVG shown when accordion is closed (ReactNode).",
    },
    AccordionId: {
      control: "text",
      description: "Unique ID for the accordion instance.",
    },
    IsOpen: {
      control: "boolean",
      description: "Controlled open state (useful when managing externally).",
    },
    OnToggle: {
      action: "toggled",
      description: "Callback fired when accordion header is clicked.",
    },
  },
};

export const Default = {
  args: {
    Title: "Brands",
    AccordionId: "brands",
    Body: (
      <div className="pb-[24px]">
        {brands.map((item) => (
          <div className="p-2 pl-4 first:pt-0" key={item.id}>
            <VgCheckbox
              CheckBoxId={item.id}
              CheckboxLabel={item.label}
              CheckboxVariation="Checkbox-Simple"
              Name="brands"
              OnChange={() => {}}
              OnHover={() => {}}
            />
          </div>
        ))}
      </div>
    ),
    OpenIcon:`
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 448 512">
        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
      </svg>
    `,
    CloseIcon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
    `,
  },
};
