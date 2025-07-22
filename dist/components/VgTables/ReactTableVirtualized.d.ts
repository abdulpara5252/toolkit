import React from "react";
import "jspdf-autotable";
export interface ReactTableVirtualizedHandle {
    scrollToLastColumn: () => void;
    scrollToFirstColumn: () => void;
}
interface ReactTableVirtualizedProps {
    columnDefs?: any[];
    filteredResults?: any[];
    sortingType?: never[] | "Inline" | "API Call";
    showSearch?: boolean;
    showPrint?: boolean;
    showExportPDF?: boolean;
    showFilter?: boolean;
    arrowPostion?: boolean;
    setArrowPostion?: React.Dispatch<React.SetStateAction<boolean>>;
    OnPrintExportClick?: () => void;
    exportToPDF?: () => void;
    getData?: (event: React.MouseEvent<HTMLAnchorElement>, row: any) => void;
    onActionClick: (index: number) => void;
    OnClickSorting?: (e: React.MouseEvent<HTMLInputElement>, type: string) => void;
    rowHeight?: number;
    tableWidth?: number;
    tableHeight?: number;
    OnRowClick?: (rowData: any, rowIndex: number) => void;
}
declare const ReactTableVirtualized: React.ForwardRefExoticComponent<ReactTableVirtualizedProps & React.RefAttributes<ReactTableVirtualizedHandle>>;
export default ReactTableVirtualized;
