import React from "react";
import "./VgTableGrid.scss";
import "jspdf-autotable";
export interface VgTableGridProps {
    ParentTable?: boolean;
    RowData?: any[];
    ColumnData?: any[];
    FooterData?: any[];
    PagingType?: "None" | "Paggination On Scroll" | "Paggination On Footer";
    ManualPagination?: boolean;
    SortingType?: never[] | "Inline" | "API Call";
    ShowExportPDF?: boolean;
    ShowPrint?: boolean;
    Virtualization?: boolean;
    Footer?: "None" | "Scrollable" | "Sticky";
    TotalRecord?: number;
    ShowSearch?: boolean;
    OnClick?: (e: React.ChangeEvent<HTMLInputElement>, rowIndex?: number) => void;
    OnChange?: (SetValue: boolean) => void;
    OnClickSorting?: (e: React.MouseEvent<HTMLInputElement>, type: string) => void;
    PageSize?: number;
    ShowAddButton?: boolean;
    CurrentPageNumber?: number;
    TableGridType?: any;
    OnSelectedCheckbox?: (event: React.ChangeEvent<HTMLInputElement> | boolean, selectedData: any, e?: any) => void;
    ShowFirstLastButtons?: boolean;
    ShowPrevNextButtons?: boolean;
    ShowPageSizeSelector?: boolean;
    ScrollHeight?: boolean;
    ShowTotalInfo?: boolean;
    OnPaginationControlChange?: (controlType: string, e: React.MouseEvent<HTMLButtonElement | HTMLSelectElement> | React.ChangeEvent<HTMLSelectElement>, offset: number) => void;
    ShowHeaderCheckbox?: boolean;
    ShowRowCheckbox?: boolean;
    OnRowClick?: (rowData: any, rowIndex: number) => void;
    SelectedIds?: any[];
}
declare module "jspdf" {
    interface jsPDF {
        autoTable: (options: any) => void;
    }
}
declare const VgTableGrid: React.FC<VgTableGridProps>;
export default VgTableGrid;
