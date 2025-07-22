import VgTab from "../../../components/VgTab/VgTab";

export default {
    title: "Tab",
    component: VgTab,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Tab is a UI component that displays multiple tabs, allowing users to switch between them by tapping. Each tab represents a different view or section, loading unique content when selected.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            action: "clicked",
            table: {
                category: "Events",
            },
            description: `The onClick property triggers an event when a user taps a tab, returning the tab's unique ID and name. This functionality helps track user interactions and identify which tab was selected.`,
        },
        NoOfTab: {
            options: ["2", "3", "4", "5", "6", "7"],
            control: { type: "select" },
            description: `The NoOfTabs property in Tabs lets users specify the total number of tabs to display by entering a number. This dynamically adjusts the number of tabs in the UI, based on the provided value.`,
        },
        ActiveTab: {
            control: {
                type: 'number',
            },
            description: `The ActiveTab property allows users to specify the default active tab by passing its index. This ensures the desired tab is highlighted and displayed as active when the component is loaded.`,
        },
        Name: {
            control: 'array',
            description: `The Name property allows users to define custom names for each tab through a JSON array, where each array entry corresponds to a specific tab. This setup enables flexible naming and easy updates to tab labels.`,
        },
        TabVariant: {
            control: { type: "select" },
            options: ["vertical", "horizontal"],
            description: `The TabVariant property defines the layout orientation of the tabs, allowing values of either horizontal or vertical. This setting enables users to customize the tab alignment to best fit the application's design and usability needs.`,
        },
        // IconSVG: {
        //     control: { type: "text" },
        //     description: "Custom SVG icon for each tab, defined in the Name array. Optional.",
        // },
        TabPosition: {
            control: { type: "radio" },
            options: ["left", "right", "center"],
            description: "Controls the position (Left, Right, or Center) of the tabs.",
        },
        BottomBorder: {
            control: { type: "boolean" },
            description: "If true, shows a full-width border under the tabs. If false, no border is shown.",
        },
    },
}

export const Tab = {
    args: {
        NoOfTab: "7",
        Name: [
            { id: 1, name: 'Tab Name 1' },
            { id: 2, name: 'Tab Name 2' },
            { id: 3, name: 'Tab Name 3' },
            { id: 4, name: 'Tab Name 4' },
            { id: 5, name: 'Tab Name 5' },
            { id: 6, name: 'Tab Name 6' },
            { id: 7, name: 'Tab Name 7' },
        ],
        ActiveTab: 0,
        TabVariant: "horizontal",
        TabPosition: "center",
        BottomBorder: true,
    },
};

export const TabsWithIcons = {
    args: {
        NoOfTab: "7",
        Name: [
            { 
                id: 1, 
                name: 'Tab Name 1', 
                IconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M0 64C0 46.33 14.33 32 32 32H480c17.7 0 32 14.33 32 32V128H0V64zM0 160H160v96H0V160zM192 160H320v96H192V160zM352 160H512v96H352V160zM0 288H160v96H0V288zM192 288H320v96H192V288zM352 288H512v96H352V288zM0 416H160v64H32c-17.67 0-32-14.3-32-32V416zM192 416H320v64H192V416zM352 416H512v32c0 17.7-14.3 32-32 32H352V416z"/>
                    </svg>

                )
            },
            { 
                id: 2, 
                name: 'Tab Name 2', 
                IconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M0 64C0 46.33 14.33 32 32 32H480c17.7 0 32 14.33 32 32V128H0V64zM0 160H160v96H0V160zM192 160H320v96H192V160zM352 160H512v96H352V160zM0 288H160v96H0V288zM192 288H320v96H192V288zM352 288H512v96H352V288zM0 416H160v64H32c-17.67 0-32-14.3-32-32V416zM192 416H320v64H192V416zM352 416H512v32c0 17.7-14.3 32-32 32H352V416z"/>
                    </svg>
                )
            },
            { 
                id: 3, 
                name: 'Tab Name 3', 
                IconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M0 64C0 46.33 14.33 32 32 32H480c17.7 0 32 14.33 32 32V128H0V64zM0 160H160v96H0V160zM192 160H320v96H192V160zM352 160H512v96H352V160zM0 288H160v96H0V288zM192 288H320v96H192V288zM352 288H512v96H352V288zM0 416H160v64H32c-17.67 0-32-14.3-32-32V416zM192 416H320v64H192V416zM352 416H512v32c0 17.7-14.3 32-32 32H352V416z"/>
                    </svg>
                )
            },
            { 
                id: 4, 
                name: 'Tab Name 4', 
                IconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M0 64C0 46.33 14.33 32 32 32H480c17.7 0 32 14.33 32 32V128H0V64zM0 160H160v96H0V160zM192 160H320v96H192V160zM352 160H512v96H352V160zM0 288H160v96H0V288zM192 288H320v96H192V288zM352 288H512v96H352V288zM0 416H160v64H32c-17.67 0-32-14.3-32-32V416zM192 416H320v64H192V416zM352 416H512v32c0 17.7-14.3 32-32 32H352V416z"/>
                    </svg>
                )
            },
            { 
                id: 5, 
                name: 'Tab Name 5', 
                IconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M0 64C0 46.33 14.33 32 32 32H480c17.7 0 32 14.33 32 32V128H0V64zM0 160H160v96H0V160zM192 160H320v96H192V160zM352 160H512v96H352V160zM0 288H160v96H0V288zM192 288H320v96H192V288zM352 288H512v96H352V288zM0 416H160v64H32c-17.67 0-32-14.3-32-32V416zM192 416H320v64H192V416zM352 416H512v32c0 17.7-14.3 32-32 32H352V416z"/>
                    </svg>
                )
            },
            { 
                id: 6, 
                name: 'Tab Name 6', 
                IconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M0 64C0 46.33 14.33 32 32 32H480c17.7 0 32 14.33 32 32V128H0V64zM0 160H160v96H0V160zM192 160H320v96H192V160zM352 160H512v96H352V160zM0 288H160v96H0V288zM192 288H320v96H192V288zM352 288H512v96H352V288zM0 416H160v64H32c-17.67 0-32-14.3-32-32V416zM192 416H320v64H192V416zM352 416H512v32c0 17.7-14.3 32-32 32H352V416z"/>
                    </svg>
                )
            },
            { 
                id: 7, 
                name: 'Tab Name 7', 
                IconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                        <path d="M0 64C0 46.33 14.33 32 32 32H480c17.7 0 32 14.33 32 32V128H0V64zM0 160H160v96H0V160zM192 160H320v96H192V160zM352 160H512v96H352V160zM0 288H160v96H0V288zM192 288H320v96H192V288zM352 288H512v96H352V288zM0 416H160v64H32c-17.67 0-32-14.3-32-32V416zM192 416H320v64H192V416zM352 416H512v32c0 17.7-14.3 32-32 32H352V416z"/>
                    </svg>
                )
            },
        ],
        ActiveTab: 0,
        TabVariant: "horizontal",
        TabPosition: "center"
    },
};