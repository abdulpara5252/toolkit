import { mockRowData, ProductData, ColumnData, ProductDataColumn, FooterData, mockRowData1, ColumnData1, ProgressBarColumnData, ProgressBarTableData, PackegeColumnData, PackegeRowData, TableInfoData, TableInfoColumn, TieredRowData, TieredColumnData } from "../../../components/VgTables/mockData";
import VgTableGrid  from "../../../components/VgTables/VgTableGrid";

const meta = {
  title: "Tables",
  component: VgTableGrid,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "The Table component dynamically generates a table structure based on JSON data provided through the RawData property.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    TableGridType: {
      control: "select",
      options: ["Transaction List", "Packege List", "Employee List", "Product List", "Hourly Pay", "Virtualization", "Tiered Commission By Revenue"],
      description: "Select the TableGrid from predefined options.",
      table: {
        disable: false,
      },
    },
    RowData: {
      control: "object",
      description: "The RowData property allows users to input JSON data to populate the rows of a table component.",
    },
    FooterData: {
      control: "object",
      description: "The FooterData property defines custom footer content for a table.",
      if: { arg: "ShowAddButton", truthy: false },
    },
    ColumnData: {
      control: "object",
      description: "The ColumnData property defines column names for the table component.",
    },
    PagingType: {
      control: "select",
      options: ["None", "Paggination On Scroll", "Paggination On Footer"],
      if: {
        arg: "Virtualization",
        truthy: false,
      },
      description: "The PagingType property lets users select a pagination method for the table component.",
    },
    ManualPagination: {
      control: 'boolean',
      description: 'Controls whether pagination is handled manually',
      defaultValue: false,
      if: {
        arg: 'PagingType',
        eq: 'Paggination On Footer'
      }
    },
    SortingType: {
      control: "select",
      options: ["Inline", "API Call"],
      description: "The SortingType property allows users to choose between local or server-side sorting.",
    },
    ShowHeaderCheckbox: {
      control: "boolean",
      description: "Enables the checkbox in the table header to show the checkbox.",
      defaultValue: true,
      if: { arg: "Virtualization", truthy: false },
    },
    ShowRowCheckbox: {
      control: "boolean",
      description: "Enables the checkbox in the table row to show the checkbox for all rows.",
      defaultValue: true,
      if: { arg: "Virtualization", truthy: false },
    },
    ShowPrint: {
      control: "boolean",
      description: "The ShowPrint property allows users to toggle the visibility of a print button.",
      defaultValue: true,
    },
    ShowExportPDF: {
      control: "boolean",
      description: "The ShowExportPDF property enables the export-to-PDF functionality.",
      defaultValue: true,
    },
    Footer: {
      control: "select",
      options: ["None", "Scrollable", "Sticky"],
      description: "The Footer property lets users select the footer behavior.",
      defaultValue: "None",
      table: {
        disable: false,
      },
      if: { arg: "ShowAddButton", truthy: false },
    },
    Virtualization: {
      control: "boolean",
      description: "Row virtualization enables rendering of only visible rows, optimizing performance for large datasets.",
      defaultValue: true,
    },
    SelectedIds: {
      control: "array",
      description: `The SelectedIds property, allows users to pre-select items in the table list by passing an array of selected item IDs.
  - **["KItWsEk3ocJtLTwkvfnp~g==", "KO5br9z-dW3wT~cttMntJQ==",]**: Pass an array of item IDs to select specific items
      `,
      table: { category: 'DefaultValue' }
    },
    ParentTable: {
      control: "boolean",
      defaultValue: true,
      table: { disable: true }
    },
    ShowSearch: {
      control: "boolean",
      description: "The ShowSearch property controls the visibility of a search bar.",
      defaultValue: false,
    },
    OnClick: {
      action: "clicked",
      description: "Triggers an action when the user clicks on an element.",
      table: {
        category: "Events",
      },
    },
    OnChange: {
      action: "changed",
      description: "Triggers an action when data changes.",
      table: {
        category: "Events",
      },
    },
    OnClickSorting: {
      action: "clicked",
      table: {
        category: "Events",
      },
    },
    ShowAddButton: {
      control: "boolean",
      description: "The ShowAddButton property toggles the visibility of the 'Add' button.",
      defaultValue: false,
      if: { arg: "TableGridType", eq: "Tiered Commission By Revenue" }
    },
    PageSize: {
      control: "number",
      description: "The PageSize property sets the number of records per page for pagination.",
      if: {
        arg: "ManualPagination",
        truthy: true
      },
    },
    ShowFirstLastButtons: {
      control: 'boolean',
      description: 'Controls visibility of First/Last page navigation buttons',
      defaultValue: true,
      if: {
        arg: 'PagingType',
        eq: 'Paggination On Footer'
      }
    },
    ScrollHeight: {
      control: 'boolean',
      description: 'Enable automatic height adjustment based on scroll content',
      defaultValue: true,
    },
    ShowPrevNextButtons: {
      control: 'boolean',
      description: 'Controls visibility of Previous/Next page navigation buttons',
      defaultValue: true,
      if: {
        arg: 'PagingType',
        eq: 'Paggination On Footer'
      }
    },
    ShowPageSizeSelector: {
      control: 'boolean',
      description: 'Controls visibility of the rows per page selector',
      defaultValue: true,
      if: {
        arg: 'PagingType',
        eq: 'Paggination On Footer'
      }
    },
    ShowTotalInfo: {
      control: 'boolean',
      description: 'Controls visibility of total items and pages information',
      defaultValue: true,
      if: {
        arg: 'PagingType',
        eq: 'Paggination On Footer'
      }
    },
    TotalRecord: {
      control: 'number',
      description: 'Specifies the total number of records in the dataset for pagination',
      defaultValue: 0,
      if: {
        arg: 'PagingType',
        eq: 'Paggination On Footer'
      }
    },
    CurrentPageNumber: {
      control: 'number',
      description: 'Specifies the current page number in pagination. Starts from 1.',
      defaultValue: 1,
      if: {
        arg: "ManualPagination",
        truthy: true
      }
    },
    OnSelectedCheckbox: {
      action: 'checkbox-selected',
      description: 'Triggers when checkboxes are selected/deselected. Returns an array of selected row data.',
      table: {
        category: 'Events',
        type: { 
          summary: '(selectedRows: any[]) => void',
          detail: 'Callback function that receives an array of selected row data'
        }
      },
      if: { 
        arg: 'SelectAll', 
        truthy: true 
      }
    },
    OnPaginationControlChange: {
      action: 'pagination-control-changed',
      description: 'Triggers when any pagination control visibility is changed',
      table: {
        category: 'Events',
        type: { 
          summary: '(controlType: string, isVisible: boolean) => void',
          detail: 'Callback function that receives control type and visibility state'
        }
      },
      if: {
        arg: 'PagingType',
        eq: 'Paggination On Footer'
      }
    },
    SetHeaderCheckboxValue: {
      control: "boolean",
      description: "Controls the checked state of the header checkbox programmatically.",
      defaultValue: false,
    },
    SetRowCheckboxValue: {
      control: "boolean",
      description: "Array of row IDs or indexes to programmatically set their checkboxes as checked.",
      defaultValue: false,
    },
  },
};

export default meta;

export const TransactionList = {
  args: {
    TableGridType: "Transaction List",
    Virtualization: false,
    ShowAddButton: false,
    ParentTable: false,
    ColumnData: ColumnData,
    ScrollHeight: true,
    RowData: mockRowData,
    FooterData: FooterData,
    PagingType: "None",
    SortingType: "Inline",
    Footer: "sticky",
    ShowSearch: false,
    ShowExportPDF: false,
    SelectedIds: [],
    ShowPrint: false,
    OnClick: (e, rowIndex) => { console.log("event:", e,"at index =>", rowIndex);},
    OnChange: (e) => {},
    OnClickSorting: (e, type) => {},
    PageSize: 2,
    ShowHeaderCheckbox: true,
    ShowRowCheckbox: true,
    SetHeaderCheckboxValue: false,
    SetRowCheckboxValue: false,
    OnRowClick: (rowData, rowIndex) => { console.log("Row clicked:", rowData, "at index:", rowIndex); },
  },
};

export const PackegeList = {
  args: {
    TableGridType: "Packege List",
    Virtualization: false,
    ParentTable: false,
    ShowAddButton: false,
    ColumnData: PackegeColumnData,
    RowData: PackegeRowData,
    ScrollHeight: true,
    FooterData: FooterData,
    SelectedIds: [],
    PagingType: "Paggination On Footer",
    ManualPagination: false,
    SortingType: "Inline",
    Footer: "Sticky",
    ShowSearch: false,
    ShowExportPDF: false,
    ShowPrint: false,
    TotalRecord: 20,
    OnClick: (e) => {},
    OnChange: (e) => {},
    OnClickSorting: (e, type) => {},
    PageSize: 0,
    ShowFirstLastButtons: true,
    ShowPrevNextButtons: true,
    ShowPageSizeSelector: true,
    ShowTotalInfo: true,
    CurrentPageNumber: 1,
    OnPaginationControlChange: (controlType, isVisible, offset) => {
    },
    ShowHeaderCheckbox: true,
    ShowRowCheckbox: true,
    SetHeaderCheckboxValue: false,
    SetRowCheckboxValue: false,
    OnRowClick: (rowData, rowIndex) => { console.log("Row clicked:", rowData, "at index:", rowIndex); },
  },
};

export const EmployeeList = {
  args: {
    TableGridType: "Employee List",
    Virtualization: false,
    ParentTable: false,
    ShowAddButton: false,
    ColumnData: ProgressBarColumnData,
    RowData: ProgressBarTableData,
    PagingType: "None",
    SelectedIds: [],
    ScrollHeight: true ,
    SortingType: "Inline",
    Footer: "Sticky",
    ShowSearch: false,
    ShowExportPDF: false,
    ShowPrint: false,
    OnClick: (e) => {},
    OnclickSorting: (e, type) => {},
    PageSize: 2,
    ShowHeaderCheckbox: true,
    ShowRowCheckbox: true,
    SetHeaderCheckboxValue: false,
    SetRowCheckboxValue: false,
    OnRowClick: (rowData, rowIndex) => { console.log("Row clicked:", rowData, "at index:", rowIndex); },
  },
};

export const ProductList = {
  args: {
    TableGridType: "Product List",
    Virtualization: false,
    SelectedIds: [],
    ParentTable: true,
    ShowAddButton: false,
    ColumnData: ProductDataColumn,
    RowData: ProductData,
    PagingType: "None",
    SortingType: "Inline",
    Footer: "None",
    ScrollHeight: true,
    ShowSearch: true,
    ShowExportPDF: true,
    ShowPrint: true,
    OnClick: (e) => {},
    OnChange: (e) => {},
    OnclickSorting: (e, type) => {},
    PageSize: 2,
    OnSelectedCheckbox: (e, selectedRows) => { console.log("Selected Rows:", selectedRows); },
    ShowHeaderCheckbox: true,
    ShowRowCheckbox: true,
    SetHeaderCheckboxValue: false,
    SetRowCheckboxValue: false,
    OnRowClick: (rowData, rowIndex) => { console.log("Row clicked:", rowData, "at index:", rowIndex); },
  },
};

// export const HourlyPay  = {
//   args: {
//     TableGridType: "Hourly Pay",
//     Virtualization: false,
//     ParentTable: false,
//     ColumnData: PayRollColumnData,
//     RowData: PayRollRowData,
//     FooterData: FooterData,
//     PagingType: "None",
//     SortingType: "Inline",
//     ShowAddButton: true,
//     Footer: "None",
//     ShowSearch: true,
//     ShowExportPDF: true,
//     ShowPrint: true,
//     OnClick: (e) => { },
//     OnclickSorting: (e, type) => { },
//     PageSize: 2,
//     ShowHeaderCheckbox: true,
//     ShowRowCheckbox: true,
//     OnRowClick: (rowData, rowIndex) => { console.log("Row clicked:", rowData, "at index:", rowIndex); },
//   },
// };

export const TieredCommissionByRevenue = {
  args: {
    TableGridType: "Tiered Commission By Revenue",
    Virtualization: false,
    ParentTable: false,
    ColumnData: TieredColumnData,
    RowData: TieredRowData,
    PagingType: "None",
    SortingType: "Inline",
    ScrollHeight: false,
    ShowAddButton: true,
    SelectedIds: [],
    ShowSearch: false,
    ShowExportPDF: false,
    ShowPrint: false,
    OnClick: (e) => {},
    OnChange: (e) => {},
    OnclickSorting: (e, type) => {},
    PageSize: 0,
    ShowHeaderCheckbox: true,
    ShowRowCheckbox: true,
    SetHeaderCheckboxValue: false,
    SetRowCheckboxValue: false,
    OnRowClick: (rowData, rowIndex) => { console.log("Row clicked:", rowData, "at index:", rowIndex); },
  },
};

export const TableData = {
  args: {
    TableGridType: "Transaction List",
    Virtualization: false,
    ParentTable: false,
    ShowAddButton: false,
    ColumnData: TableInfoColumn,
    RowData: TableInfoData,
    ScrollHeight: false,
    // FooterData: FooterData,
    PagingType: "Paggination On Scroll",
    SortingType: "Inline",
    Footer: "Scrollable",
    ShowSearch: false,
    ShowExportPDF: false,
    ShowPrint: false,
    OnClick: (e) => {},
    OnclickSorting: (e, type) => {},
    ShowHeaderCheckbox: true,
    ShowRowCheckbox: true,
    SetHeaderCheckboxValue: false,
    SetRowCheckboxValue: false,
    OnRowClick: (rowData, rowIndex) => { console.log("Row clicked:", rowData, "at index:", rowIndex); },
    // PageSize: 2,
  },
};

// export const Virtualization = {
//   args: {
//     Virtualization: true,
//     ParentTable: false,
//     ColumnData : ColumnData,
//     RowData: mockRowData,
//     SortingType: "Inline",
//     ShowSearch: true,
//     ShowExportPDF: true,
//     ShowPrint: true,
//     OnClick: (e) => { },
//     OnclickSorting: (e, type) => { },
//     PageSize: 2,
//   },
// };