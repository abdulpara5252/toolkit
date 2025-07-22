import React, { useState, useMemo, useRef, useEffect, forwardRef } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./VgTableGrid.scss";
import jsPDF from "jspdf";
import "jspdf-autotable";
import VgButton from "../VgButton/VgButton";
import Svg from "../VgSvg/Svg";
import VgInput from "../VgTextbox/VgTextbox";
import ReactDOM from "react-dom";
import PrintSettings from "../../utils/PrintSettings";
import VgAvatar from "../VgAvatar/VgAvatar";
import ReactTableVirtualized from "./ReactTableVirtualized";
import Portal from "../../common/Portal";
import VgBadge from "../VgBadge/VgBadge";
import VgCheckbox from "../VgCheckbox/VgCheckbox";
import VgToggle from "../VgToggle/VgToggle";
import VgTooltip from "../VgTooltip/VgTooltip";
import { mockRowData } from "./mockData"
import { PortalEnum } from "../../utils/utils";

interface ColumnStyle {
  cellWidth: number;
}
interface ColumnStyles {
  [key: number]: ColumnStyle;
}
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
  ScrollHeight?: boolean,
  ShowTotalInfo?: boolean;
  OnPaginationControlChange?: (
    controlType: string,
    e: React.MouseEvent<HTMLButtonElement | HTMLSelectElement> | React.ChangeEvent<HTMLSelectElement>,
    offset: number
  ) => void;
  ShowHeaderCheckbox?: boolean;
  ShowRowCheckbox?: boolean;
  OnRowClick?: (rowData: any, rowIndex: number) => void;
  SelectedIds?: any[]
}

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

type ReactTableVirtualizedHandle = {
  scrollToLastColumn: () => void;
  scrollToFirstColumn: () => void;
};

type CustomColumnDef<T> = ColumnDef<T> & {
  accessorKey?: string;
  Width?: string | number;
  MinWidth?: string | number;
  MaxWidth?: string | number;
  sticky?: boolean
};

const VgTableGrid: React.FC<VgTableGridProps> = forwardRef<HTMLDivElement, VgTableGridProps>(({
  ParentTable = false,
  RowData,
  ColumnData = [],
  FooterData = [],
  PagingType,
  ManualPagination = false,
  SortingType = [],
  ShowExportPDF = false,
  ShowPrint = false,
  Virtualization = false,
  Footer,
  TotalRecord = 0,
  ShowSearch = false,
  PageSize = 0,
  OnClick = () => { },
  OnChange = () => { },
  OnClickSorting,
  ShowAddButton,
  TableGridType,
  OnSelectedCheckbox,
  CurrentPageNumber = 1,
  ShowFirstLastButtons = false,
  ShowPrevNextButtons = false,
  ShowPageSizeSelector = false,
  ShowTotalInfo = false,
  OnPaginationControlChange,
  ShowHeaderCheckbox = false,
  ShowRowCheckbox = false,
  OnRowClick,
  ScrollHeight = true,
  SelectedIds = []
}, ref) => {
  const [sorting, setSorting] = useState<any>([]);
  const [filteredResults, setFilteredResults] = useState(RowData);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const tableContainerRef = useRef<HTMLTableSectionElement>(null);
  const tableScrollRef = useRef<HTMLTableElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<any>(null);
  const [arrowPostion, setArrowPostion] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState<number>(1);
  const [recordsPerScroll] = useState(10);
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tableRef = useRef<ReactTableVirtualizedHandle>(null);
  const [dynamicHeight, setDynamicHeight] = useState("auto");
  const [hoveredColumnIndex, setHoveredColumnIndex] = React.useState<number | null>(null);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [columnData, setColumnData] = useState(useMemo<CustomColumnDef<any>[]>(() => {
    return Array.isArray(ColumnData)
      ? ColumnData.map((col) => ({
        accessorKey: col.DataValue,
        header: col.Dataheader,
        MinWidth: col.MinWidth,
        MaxWidth: col.maxWidth, // Add maxWidth here
        Width: col.Width,
        enableSorting: col.Sorting,
        sticky: col.sticky,
        ...(col.checkboxSelection && { enableRowSelection: true }),
      }))
      : [];
  }, [ColumnData, ParentTable]));
  const [selectedRowIds, setSelectedRowIds] = useState<any[]>([]);
  const userIdColumnIndex = 0;
  const [currentPageSize, setCurrentPageSize] = useState(PageSize || 10);

  useEffect(() => {
    if (CurrentPageNumber) {
      setOffset(CurrentPageNumber);
    }
  }, [CurrentPageNumber]);

  useEffect(() => {
    if (Array.isArray(RowData)) {
      setFilteredResults(RowData);
    }
  }, [RowData, offset]);

  useEffect(() => {
    if (SelectedIds.length > 0) {
      setSelectedRowIds(SelectedIds);

      const isAllSelected = SelectedIds.length > 0 && SelectedIds.length === filteredResults?.length;
      setSelectAllChecked(isAllSelected);
    }
  }, [SelectedIds, filteredResults]);


  // Update the table configuration
  const table = useReactTable({
    data: filteredResults as any,
    columns: columnData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: ManualPagination,
    state: {
      pagination: PagingType === "None" || PagingType === "Paggination On Scroll"
        ? { pageIndex: 0, pageSize: filteredResults?.length } as any
        : { pageIndex: offset - 1, pageSize: recordsPerScroll | currentPageSize },
      sorting,
    },
    pageCount: Math.ceil((filteredResults?.length || 0) / (PageSize || 10)),
    onSortingChange: setSorting,
  });

  useEffect(() => {
    const updateDynamicHeight = () => {
      if (tableContainerRef.current) {
        const contentHeight = tableContainerRef.current.scrollHeight; // Measure content height
        const windowHeight = window.innerHeight * 0.8; // 80% of window height

        // Set height dynamically based on the content height or window height
        const height = contentHeight >= windowHeight ? windowHeight : contentHeight;
        setDynamicHeight(`${height}px`);
      }
    };

    window.addEventListener("resize", updateDynamicHeight);
    updateDynamicHeight(); // Set initial height

    return () => window.removeEventListener("resize", updateDynamicHeight);
  }, [RowData, expandedRows, filteredResults]);


  useEffect(() => {
    const checkScroll = () => {
      const container = tableContainerRef.current;
      if (container) {
        const isScrollable = container.scrollWidth > container.clientWidth;
        setHasHorizontalScroll(isScrollable);
      }
    };

    checkScroll();

    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !modalRef?.current?.contains(event.target as Node) &&
        !modalRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (PagingType == "Paggination On Scroll") {
      const container = tableContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      };
    }

  }, [PagingType]);


  useEffect(() => {
    if (ShowAddButton && !columnData.some(column => column.accessorKey === "Add")) {
      const updatedColumns = [
        ...columnData.slice(0, columnData.length - 1), // All columns except the last one
        {
          accessorKey: "Add",
          header: "",
          MinWidth: 0,
          Width: 60,
          MaxWidth: undefined,
          enableSorting: false,
        },
        ...columnData.slice(columnData.length - 1), // The last column
      ];
      setColumnData(updatedColumns);
    }
  }, [ShowAddButton]);

  const footer = useMemo<any[]>(() => {
    return Array.isArray(FooterData)
      ? (FooterData).map((col) => ({
        accessorKey: col.FooterValue,
        header: col.Footerheader,
      }))
      : [];
  }, [FooterData]);

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex);
    } else {
      newExpandedRows.add(rowIndex);
    }
    setExpandedRows(newExpandedRows);
  };

  const expandAll = (e: any) => {
    e.preventDefault();
    const allIndices = Array.from({ length: table.getRowModel().rows.length }, (_, i) => i);
    setExpandedRows(new Set(allIndices));
  };

  const collapseAll = (e: any) => {
    e.preventDefault();
    setExpandedRows(new Set());
  };

  const handleScroll = () => {
    const container = tableContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        // setCurrentPage((prevcount: any) => prevcount + 1)
      }
    }
  };

  const scrollToLastColumn = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = tableContainerRef.current.scrollWidth;
    }
  };

  const scrollToFirstColumn = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = 0;
    }
  };

  const handleIconScroll = () => {
    setIsOpen(false)
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
      if (scrollLeft >= scrollWidth - clientWidth) {
        setArrowPostion(true);
      } else if (scrollLeft <= 0) {
        setArrowPostion(false);
      }
    }
  };

  const scrollToRight = () => {
    setArrowPostion(true);
    if (tableRef.current) {
      tableRef.current.scrollToLastColumn();
    }
    scrollToLastColumn()
  };

  const scrollToLeft = () => {
    setArrowPostion(false);
    if (tableRef.current) {
      tableRef.current.scrollToFirstColumn();
    }
    scrollToFirstColumn()
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    const extractProductInfo = (data: any): string => {
      if (typeof data === 'object' && data.type === 'div') {
        const findProductHeading = (node: any): string => {
          if (!node || typeof node !== 'object') return '';

          if (node.props?.className === 'product-name') {
            return node.props.children?.props?.children || '';
          }

          if (node.props?.className === 'product-heading') {
            return node.props.children || '';
          }

          if (node.props?.children) {
            if (Array.isArray(node.props.children)) {
              for (const child of node.props.children) {
                const result = findProductHeading(child);
                if (result) return result;
              }
            } else {
              return findProductHeading(node.props.children);
            }
          }
          return '';
        };

        return findProductHeading(data);
      }

      if (typeof data === 'string') {
        return data
          .replace(/\\n/g, '')
          .replace(/n/g, '')
          .replace(/&nbsp;/g, '')
          .replace(/<[^>]*>/g, '')
          .replace(/\//g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }
      return data;
    };

    const cleanRowData = (value: any): any => {
      if (typeof value === 'string') {
        return extractProductInfo(value);
      }
      if (typeof value === 'object' && value !== null) {
        if (value.type === 'div') {
          return extractProductInfo(value);
        }
        if (value.Badge && Array.isArray(value.Badge)) {
          return value.Badge[0].BadgeText || '-';
        }
        return value.value ? extractProductInfo(value.value) : value;
      }
      return value;
    };

    const cleanColumnName = (col: string): string => {
      return extractProductInfo(col);
    };

    const flattenedData = RowData!.flatMap((row: any) => {
      const mainRow = { ...row };
      const children = row.Child || [];

      const result = [mainRow];

      if (children.length > 0) {
        children.forEach((child: any) => {
          result.push({
            ...child,
            Product: {
              ...child.Product,
              props: {
                ...child.Product.props,
                children: [
                  child.Product.props.children[0],
                  {
                    ...child.Product.props.children[1],
                    props: {
                      className: 'product-name',
                      children: child.Product.props.children[1].props.children
                    }
                  }
                ]
              }
            }
          });
        });
      }
      return result;
    });

    const columns = Object.keys(flattenedData[0] || {}).filter(
      col => col !== 'Receipt' && col !== 'Component' && col !== 'Action' && col !== 'Child'
    );

    const cleanedColumns = columns.map(cleanColumnName);

    const rows = flattenedData.map((row: any) =>
      columns.map((key) => {
        if (key === "Status") {
          return row[key]?.Badge?.[0]?.BadgeText ?? '-';
        }
        return cleanRowData(row[key]);
      })
    );

    const pageWidth = doc.internal.pageSize.width;
    const margins = 20;
    const availableWidth = pageWidth - margins;

    const getColumnWeight = (columnName: string): number => {
      if (columnName.toLowerCase().includes('description')) return 2;
      if (columnName.toLowerCase().includes('name')) return 1.5;
      if (columnName === 'Product') return 1.5;
      return 1;
    };

    const totalWeight = columns.reduce((sum, col) => sum + getColumnWeight(col), 0);

    const columnStyles = columns.reduce<ColumnStyles>((styles, col, index) => {
      const weight = getColumnWeight(col);
      styles[index] = { cellWidth: (availableWidth * weight) / totalWeight };
      return styles;
    }, {});

    doc.autoTable({
      head: [cleanedColumns],
      body: rows,
      startY: 20,
      theme: "striped",
      headStyles: {
        fillColor: '#333',
        textColor: [255, 255, 255],
        fontSize: 10,
      },
      styles: {
        overflow: "linebreak",
        cellPadding: 2,
        fontSize: 10,
      },
      columnStyles: columnStyles,
      margin: { top: 0 },
    });

    doc.save("download.pdf");
  };

  const isObjectWithInfo = (value: any): value is { value: any; info: string } => {
    return value !== null && typeof value === "object" && "value" in value && "info" in value;
  };

  const OnPrintExportClick = () => {
    let printDiv = document.getElementById("printdiv");
    if (!printDiv) {
      printDiv = document.createElement("div");
      printDiv.id = "printdiv";
      document.body.appendChild(printDiv);
    }
    ReactDOM.render(
      <PrintSettings
        SettingType={1}
        SettingData={RowData}
        Column={ColumnData}
        Title={"Employee List"}
      />,
      printDiv
    );
  };


  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      const allRowIds = filteredResults?.flatMap((row: any, index: number) => {
        const rowId = index.toString();
        const childIds = row.Child ? row.Child.map((_: any, childIndex: number) =>
          `child-${rowId}-${childIndex}`
        ) : [];
        return [rowId, ...childIds];
      }) || [];

      setSelectedRows(allRowIds);
      setSelectAllChecked(true);

      // Prepare selected data
      const selectedData = filteredResults?.map((row: any) => ({
        ...row,
        Child: row.Child || []
      }));

      // Call OnSelectedCheckbox with event and data
      if (OnSelectedCheckbox) {
        OnSelectedCheckbox(checked, selectedData);
      }
    } else {
      setSelectedRows([]);
      setSelectAllChecked(false);

      // Call OnSelectedCheckbox with empty data
      if (OnSelectedCheckbox) {
        OnSelectedCheckbox(checked, []);
      }
    }

    if (OnChange) {
      OnChange(checked);
    }
  };


  const handleRowCheckboxChange = (rowId: string, checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
    setSelectedRows((prevSelectedRows: string[]) => {
      let newSelectedRows = [...prevSelectedRows];
      let selectedData: any = null;

      // Handle parent row checkbox
      if (!rowId.startsWith('child-')) {
        const parentIndex = parseInt(rowId);
        const parentRow = filteredResults?.[parentIndex];

        if (checked) {
          if (!newSelectedRows.includes(rowId)) {
            newSelectedRows.push(rowId);
          }

          if (parentRow?.Child) {
            parentRow.Child.forEach((_: any, childIndex: number) => {
              const childId = `child-${rowId}-${childIndex}`;
              if (!newSelectedRows.includes(childId)) {
                newSelectedRows.push(childId);
              }
            });
          }

          selectedData = {
            ...parentRow,
            Child: parentRow.Child || []
          };
        } else {
          newSelectedRows = newSelectedRows.filter(id => id !== rowId);
          if (parentRow?.Child) {
            const childPattern = new RegExp(`^child-${rowId}-\\d+$`);
            newSelectedRows = newSelectedRows.filter(id => !childPattern.test(id));
          }
          selectedData = newSelectedRows;
        }
      } else {
        // Handle child checkbox
        const [_, parentId, childIndex] = rowId.match(/child-(\d+)-(\d+)/) || [];
        const parentRow = filteredResults?.[parseInt(parentId)];
        const childRow = parentRow?.Child?.[parseInt(childIndex)];

        if (checked) {
          if (!newSelectedRows.includes(rowId)) {
            newSelectedRows.push(rowId);
          }

          // Check if all siblings are selected
          const allSiblingsSelected = parentRow?.Child?.every((_: any, idx: number) => {
            const siblingId = `child-${parentId}-${idx}`;
            return idx.toString() === childIndex || newSelectedRows.includes(siblingId);
          });

          // If all siblings are selected, also select the parent
          if (allSiblingsSelected && !newSelectedRows.includes(parentId)) {
            newSelectedRows.push(parentId);
          }

          selectedData = {
            parentIndex: parseInt(parentId),
            childIndex: parseInt(childIndex),
            data: childRow
          };
        } else {
          newSelectedRows = newSelectedRows.filter(id => id !== rowId);
          // Remove parent selection if any child is unchecked
          newSelectedRows = newSelectedRows.filter(id => id !== parentId);
          selectedData = null;
        }
      }

      const allRowsSelected = filteredResults?.every((row: any, index: number) => {
        const parentSelected = newSelectedRows.includes(index.toString());
        const allChildrenSelected = row.Child ? row.Child.every((_: any, childIndex: number) =>
          newSelectedRows.includes(`child-${index}-${childIndex}`)
        ) : true;
        return parentSelected && allChildrenSelected;
      });

      setSelectAllChecked(!!allRowsSelected);

      // Move this outside of the setSelectedRows callback
      return newSelectedRows;
    });

    // Call OnSelectedCheckbox only once outside of the state update
    if (OnSelectedCheckbox) {
      let selectedData: any = null;

      if (!rowId.startsWith('child-')) {
        const parentIndex = parseInt(rowId);
        const parentRow = filteredResults?.[parentIndex];


        //removed that if condition .because user always wanted the data either its true or false 
        // if (checked) {   
        selectedData = {
          ...parentRow,
          Child: parentRow.Child || []
        };
        // } else {
        //   selectedData = [];
        // }
      } else {
        const [_, parentId, childIndex] = rowId.match(/child-(\d+)-(\d+)/) || [];
        const parentRow = filteredResults?.[parseInt(parentId)];
        const childRow = parentRow?.Child?.[parseInt(childIndex)];


        //removed that if condition .because user always wanted the data either its true or false same for child
        // if (checked) {
        selectedData = {
          parentIndex: parseInt(parentId),
          childIndex: parseInt(childIndex),
          data: childRow
        };
        // } else {
        // selectedData = [];
        // }
      }
      if (selectedData !== null) {
        OnSelectedCheckbox(checked, selectedData, event);
      }
    }
  };


  const extractImageSrc = (bodyContent: any): string | null => {
    if (typeof bodyContent === 'string') {
      const imageTagRegex = /\$<img src=["'`]?([^"'`>]+)["'`]? alt=["'`]?([^"'`>]+)["'`]?>/;
      const match = bodyContent.match(imageTagRegex);
      return match ? match[1] : null;
    }
    return null;
  };

  const getData = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, row: any) => {
    e.preventDefault();
    if (OnClick) {
      OnClick(row.original)
    }
  };

  const handleActionClick = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const handlePrevPage = () => {
    if (offset > 1) {
      setOffset(offset - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = PageSize ? PageSize : calculateTotalPages();
    if (offset < totalPages) {
      setOffset(offset + 1);
    }
  };

  const handleFirstPage = () => {
    setOffset(1);
  };

  const handleLastPage = () => {
    const totalPages = PageSize ? PageSize : calculateTotalPages();
    setOffset(totalPages);
  };

  const OnSortingTypeChange = (columnHeader: any, order: any) => {
    const newSortingState = [{ id: columnHeader, desc: order === 'Descending Order' }];
    setSorting(newSortingState);
    if (OnClickSorting) {
      OnClickSorting(columnHeader, order)
    }
  }


  const calculateTotalPages = () => {
    if (!RowData?.length) return 0;
    return Math.ceil(RowData.length / currentPageSize);
  };

  const checkScroll = () => {
    const container = tableScrollRef.current
    if (container) {
      const isScrollable = container.scrollWidth > tableContainerRef!.current!.clientWidth;
      setHasHorizontalScroll(isScrollable);
    }
  };
  const addRowData = (
    secondHeaderValue: string,
    secondHeaderName: any | string[],
    secondRowValue: any,
    index: number
  ) => {
    const currentTierIndex = columnData.filter(col => col.accessorKey?.includes("hourlyPayRate")).length + 1;
    const newColumnKey = `${secondHeaderValue}${columnData.length - 2}`;
    const addColumnIndex = columnData.findIndex((col) => col?.accessorKey === "Add");

    const updatedColumns = [
      ...columnData.slice(0, addColumnIndex),
      {
        accessorKey: newColumnKey,
        header: Array.isArray(secondHeaderName) ? [`Tier ${currentTierIndex}`,
        <VgInput
          CustomMsg=""
          InputId={newColumnKey}
          InputTitle=":"
          Name=""
          OnBlur={() => { }}
          OnChange={(e) => { }}
          PlaceHolder=""
          SetValue="$0"
          UrlPrefix=""
          PrefixSupport="prefix"
          Validation="none"
        />, "$0+"] : secondHeaderName, // Dynamic header with Tier
        MinWidth: 0,
        Width: 0,
        enableSorting: false,
      },
      columnData[addColumnIndex],
      ...columnData.slice(addColumnIndex + 1),
    ];

    const updatedRows = filteredResults?.map((row: any) => ({
      ...row,
      [newColumnKey]: secondRowValue,
    }));

    setColumnData(updatedColumns as any);
    setFilteredResults(updatedRows);
    checkScroll();
  };

  const handleDeleteColumn = (columnIndex: any) => {
    if (OnClick) {
      OnClick(columnIndex)
    }
    checkScroll();
  };


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    if (!searchValue.trim()) {
      setFilteredResults(RowData);
      return;
    }
    const filteredData = RowData?.filter((row) =>
      columnData.some((col: any) => {
        const value = row[col.accessorKey] || "";
        return value.toString().toLowerCase().includes(searchValue.trim());
      })
    );
    setFilteredResults(filteredData);
  };

  const verticalOnClick = (e: any) => {
    if (OnClick) {
      OnClick(e)
    }
  }

  const horizontalOnClick = (e: any) => {
    if (OnClick) {
      OnClick(e)
    }
  }

  const toggleOnChange = (e: any) => {
    if (OnChange) {
      OnChange(e)
    }
  }

  const getTableClassName = () => {
    switch (true) {
      case ShowAddButton:
        return "scrollable-add-hourlyPayRate";

      case ParentTable:
        return "scrollable-table-container scrollable-table-product";

      default:
        return "scrollable-table-container";
    }
  };

  const handleControlChange = (controlType: string, e: React.MouseEvent<HTMLButtonElement | HTMLSelectElement> | React.ChangeEvent<HTMLSelectElement>, offset: number) => {
    if (OnPaginationControlChange) {
      OnPaginationControlChange(controlType, e, offset);
    }
  };


  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setCurrentPageSize(newPageSize);
    setOffset(1); // Set to 1 instead of 0 to keep first page active
    if (OnPaginationControlChange) {
      handleControlChange('pageSizeSelector', e, newPageSize);
    }

  };
  return (
    <div className="vg-group">
      <div className="table-container" ref={ref}>
        {Virtualization ? (
          <ReactTableVirtualized
            ref={tableRef}
            columnDefs={ColumnData}
            exportToPDF={() => { }}
            showSearch={ShowSearch}
            showPrint={ShowPrint}
            showExportPDF={ShowExportPDF}
            showFilter={true}
            setArrowPostion={setArrowPostion}
            arrowPostion={false}
            getData={getData}
            onActionClick={handleActionClick}
            sortingType={SortingType as any}
            OnPrintExportClick={OnPrintExportClick}
            OnClickSorting={OnClickSorting}
            OnRowClick={OnRowClick}
          />

        ) :
          (
            <>
              {(ShowSearch || ShowPrint || ShowExportPDF) && (<div className="grid-toolbar">
                {ShowSearch && (
                  <div className="employee-search-box">
                    <input
                      autoComplete="off"
                      id="txtsearch"
                      className="vg-input-control"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                      onBlur={() => {
                        // Add blur logic if needed
                      }}
                    />
                    <div className="emp-search-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.2656 14.6748C15.5586 14.9678 15.5586 15.4072 15.2656 15.6709C15.1484 15.8174 14.9727 15.876 14.7969 15.876C14.5918 15.876 14.416 15.8174 14.2695 15.6709L10.3438 11.7451C9.28906 12.5947 7.9707 13.0635 6.56445 13.0635C3.22461 13.0635 0.5 10.3389 0.5 6.96973C0.5 3.62988 3.19531 0.875977 6.56445 0.875977C9.9043 0.875977 12.6582 3.62988 12.6582 6.96973C12.6582 8.40527 12.1895 9.72363 11.3398 10.749L15.2656 14.6748ZM1.90625 6.96973C1.90625 9.57715 3.98633 11.6572 6.59375 11.6572C9.17188 11.6572 11.2812 9.57715 11.2812 6.96973C11.2812 4.3916 9.17188 2.28223 6.59375 2.28223C3.98633 2.28223 1.90625 4.3916 1.90625 6.96973Z"></path></svg>
                    </div>
                    {searchTerm && (
                      <div className="em-remove-icon" onClick={() => {
                        setSearchTerm(""); // Clear the input value
                        setFilteredResults(RowData);
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 8.00098C0 3.59473 3.5625 0.000976562 8 0.000976562C12.4062 0.000976562 16 3.59473 16 8.00098C16 12.4385 12.4062 16.001 8 16.001C3.5625 16.001 0 12.4385 0 8.00098ZM5.46875 6.53223L6.9375 8.00098L5.46875 9.46973C5.15625 9.78223 5.15625 10.251 5.46875 10.5322C5.75 10.8447 6.21875 10.8447 6.5 10.5322L7.96875 9.06348L9.46875 10.5322C9.75 10.8447 10.2188 10.8447 10.5 10.5322C10.8125 10.251 10.8125 9.78223 10.5 9.46973L9.03125 8.00098L10.5 6.53223C10.8125 6.25098 10.8125 5.78223 10.5 5.46973C10.2188 5.18848 9.75 5.18848 9.46875 5.46973L7.96875 6.96973L6.5 5.46973C6.21875 5.18848 5.75 5.18848 5.46875 5.46973C5.15625 5.78223 5.15625 6.25098 5.46875 6.53223Z"></path></svg>
                      </div>)}
                  </div>

                )}

                <div className="filter-button">
                  {ShowPrint && (
                    <div className="button">
                      <VgButton
                        IconPlacement="prefix"
                        ButtonRadius="none"
                        ButtonSize="small"
                        ButtonText="Print"
                        ButtonVariant="secondary"
                        ButtononClick={OnPrintExportClick}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 6.50098C14.6504 6.50098 15.5 7.35059 15.5 8.37598V11.1885C15.5 11.7158 15.0605 12.126 14.5625 12.126H13.625V14.9385C13.625 15.4658 13.1855 15.876 12.6875 15.876H3.3125C2.78516 15.876 2.375 15.4658 2.375 14.9385V12.126H1.4375C0.910156 12.126 0.5 11.7158 0.5 11.1885V8.37598C0.5 7.35059 1.32031 6.50098 2.375 6.50098H13.625ZM11.75 14.001V11.1885H4.25V14.001H11.75ZM13.1562 9.54785C13.5371 9.54785 13.8594 9.25488 13.8594 8.84473C13.8594 8.46387 13.5371 8.1416 13.1562 8.1416C12.7461 8.1416 12.4531 8.46387 12.4531 8.84473C12.4531 9.25488 12.7461 9.54785 13.1562 9.54785ZM4.25 2.75098V5.56348H2.375V1.81348C2.375 1.31543 2.78516 0.875977 3.3125 0.875977H11.3398C11.6035 0.875977 11.8379 0.993164 12.0137 1.16895L13.332 2.4873C13.5078 2.66309 13.625 2.89746 13.625 3.16113V5.56348H11.75V3.54199L10.959 2.75098H4.25Z"></path></svg>
                      </VgButton>
                    </div>
                  )}
                  {ShowExportPDF && (
                    <div className="button">
                      <VgButton
                        IconPlacement="prefix"
                        ButtonRadius="none"
                        ButtonSize="small"
                        ButtonText="Export To PDF"
                        ButtonVariant="secondary"
                        ButtononClick={exportToPDF}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.82812 0.875977H9.17188C9.55273 0.875977 9.875 1.19824 9.875 1.5791V6.50098H12.4238C12.9512 6.50098 13.2148 7.14551 12.834 7.52637L8.38086 11.9795C8.17578 12.1846 7.79492 12.1846 7.58984 11.9795L3.13672 7.52637C2.75586 7.14551 3.01953 6.50098 3.54688 6.50098H6.125V1.5791C6.125 1.19824 6.41797 0.875977 6.82812 0.875977ZM15.5 11.8916V15.1729C15.5 15.583 15.1777 15.876 14.7969 15.876H1.20312C0.792969 15.876 0.5 15.583 0.5 15.1729V11.8916C0.5 11.5107 0.792969 11.1885 1.20312 11.1885H5.48047L6.91602 12.624C7.50195 13.2393 8.46875 13.2393 9.05469 12.624L10.4902 11.1885H14.7969C15.1777 11.1885 15.5 11.5107 15.5 11.8916ZM11.8672 14.4697C11.8672 14.1475 11.6035 13.8838 11.2812 13.8838C10.959 13.8838 10.6953 14.1475 10.6953 14.4697C10.6953 14.792 10.959 15.0557 11.2812 15.0557C11.6035 15.0557 11.8672 14.792 11.8672 14.4697ZM13.7422 14.4697C13.7422 14.1475 13.4785 13.8838 13.1562 13.8838C12.834 13.8838 12.5703 14.1475 12.5703 14.4697C12.5703 14.792 12.834 15.0557 13.1562 15.0557C13.4785 15.0557 13.7422 14.792 13.7422 14.4697Z"></path></svg>
                      </VgButton>
                    </div>
                  )}
                </div>
              </div>)}

              {hasHorizontalScroll && (
                <div className="top-right-badge" id="divexpandArrow">
                  {!arrowPostion ? (
                    <i className="fa-solid fa-angle-right" onClick={scrollToRight}></i>
                  ) : (
                    <i className="fa-solid fa-angle-left" onClick={scrollToLeft}></i>
                  )}
                </div>
              )}
              {/* Table */}
              <div className="vg-table-container arrow-container">
                <div className={getTableClassName()}
                  ref={tableContainerRef}
                  style={ScrollHeight ? { height: dynamicHeight } : {}}
                  onScroll={() => PagingType == "Paggination On Scroll" ? handleScroll : handleIconScroll()}
                >
                  <table className="vg-tk-table" id="table-id" ref={tableScrollRef}>
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header, index) => {
                            const isSecondLastCell = index === headerGroup.headers.length - 2;
                            const isFirstCell = index === 0;
                            const isSecondCell = index === 1; // Assuming the second cell is at index 1
                            const isLastCell = index === headerGroup.headers.length - 1;
                            const secondHeaderName = columnData[1]?.header || '';
                            const secondHeaderValue = columnData[1]?.accessorKey || '';
                            const secondRowArray = Array.isArray(filteredResults) && filteredResults[1]
                              ? Object.values(filteredResults[1])  // Convert to array of values
                              : []; const secondRowValue = secondRowArray[1]
                            const stickyClass = (header.column?.columnDef as CustomColumnDef<any>)?.sticky
                              ? isFirstCell
                                ? "sticky-th-first"
                                : isLastCell
                                  ? "sticky-th-last"
                                  : ""
                              : "";
                            const currentCol = !isFirstCell && !isSecondLastCell && index === hoveredColumnIndex ? 'current-col' : ""
                            return (
                              <React.Fragment key={header.id}>
                                <th
                                  className={stickyClass || currentCol}
                                  key={header.id}
                                  style={{
                                    width: `${(header.column?.columnDef as CustomColumnDef<any>)?.Width || 'auto'}`.endsWith('%')
                                      ? (header.column?.columnDef as CustomColumnDef<any>)?.Width
                                      : `${(header.column?.columnDef as CustomColumnDef<any>)?.Width}%`,
                                  }}

                                  onMouseEnter={() => setHoveredColumnIndex(index)} // Track the hovered column index
                                  onMouseLeave={() => setHoveredColumnIndex(null)}
                                >
                                  <div className="vg-table-cell">
                                    <div className="checkbox-header">
                                      {index === userIdColumnIndex && ShowHeaderCheckbox && (
                                        <VgCheckbox
                                          CheckBoxId={header.id}
                                          CheckboxLabel=""
                                          CheckboxVariation="Checkbox-Simple"
                                          Name="vg-checkbox"
                                          OnChange={(e: any) => { handleSelectAllChange(e) }}
                                          OnHover={() => { }}
                                          SetValue={selectAllChecked}
                                        />
                                      )}
                                    </div>
                                    <div className="vg-title">
                                      {(() => {
                                        const headerContent = flexRender(header.column.columnDef.header, header.getContext());
                                        const isHourlyPayRate =
                                          (header.column.columnDef as CustomColumnDef<any>).accessorKey === 'Add';
                                        const processedHeaderContent = Array.isArray(headerContent)
                                          ? headerContent.map((item, idx) => {
                                            if (React.isValidElement(item)) {
                                              return <div key={idx}>{item}</div>;
                                            } else if (typeof item === 'string' || typeof item === 'number') {
                                              return <div key={idx}>{item}</div>;
                                            } else {
                                              console.warn('Unsupported content type:', item);
                                              return null;
                                            }
                                          })
                                          : headerContent;

                                        const sortingIndicator = () => {
                                          if (header.column.getCanSort()) {
                                            if (sortedColumn === header.id && SortingType === 'Inline') {
                                              return header.column.getIsSorted() === 'asc' ? (
                                                <div
                                                  className="vg-sort"
                                                  onClick={(e) => {
                                                    e.stopPropagation(); // Prevent event bubbling
                                                    const toggleSortingHandler = header.column.getToggleSortingHandler();
                                                    if (toggleSortingHandler) {
                                                      toggleSortingHandler(e); // Trigger sorting only if the handler exists
                                                    }
                                                  }}
                                                >
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="14px" height="14px">
                                                    <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                                                  </svg>
                                                </div>
                                              ) : (
                                                <div
                                                  className="vg-sort"
                                                  onClick={(e) => {
                                                    e.stopPropagation(); // Prevent event bubbling
                                                    const toggleSortingHandler = header.column.getToggleSortingHandler();
                                                    if (toggleSortingHandler) {
                                                      toggleSortingHandler(e); // Trigger sorting only if the handler exists
                                                    }
                                                  }}
                                                >
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="14px" height="14px">
                                                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c-9.2-9.2-11.9-22.9-6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                                  </svg>
                                                </div>
                                              );
                                            } else if (SortingType === 'API Call') {
                                              return header.column.getIsSorted() === 'asc' ? (
                                                <div
                                                  className="vg-sort"
                                                  onClick={(e) => {
                                                    e.stopPropagation(); // Prevent event bubbling
                                                    OnSortingTypeChange(header.column.columnDef.header, 'Ascending Order');
                                                  }}
                                                >
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="14px" height="14px">
                                                    <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                                                  </svg>
                                                </div>
                                              ) : (
                                                <div
                                                  className="vg-sort"
                                                  onClick={(e) => {
                                                    e.stopPropagation(); // Prevent event bubbling
                                                    OnSortingTypeChange(header.column.columnDef.header, 'Descending Order');
                                                  }}
                                                >
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="14px" height="14px">
                                                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c-9.2-9.2-11.9-22.9-6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2-25.7 6.9 34.9l128 128z" />
                                                  </svg>
                                                </div>
                                              );
                                            }
                                          }
                                          return null;
                                        };

                                        const collapseExpandLinks = TableGridType === "Product List" &&
                                          header.column.columnDef.header === 'Product ' ? (
                                          <div className="collapse-expand-links">
                                            {expandedRows.size === table.getRowModel().rows.length ? (
                                              <a href="#" onClick={collapseAll}>Collapse All</a>
                                            ) : (
                                              <a href="#" onClick={expandAll}>Expand All</a>
                                            )}
                                          </div>
                                        ) : null;

                                        return (
                                          <div
                                            className="vg-table-collapse-icon"
                                            onClick={(e) => {
                                              if (header.column.getCanSort()) {
                                                const toggleSortingHandler = header.column.getToggleSortingHandler();
                                                if (toggleSortingHandler) {
                                                  toggleSortingHandler(e);
                                                }
                                                const currentSortState = header.column.getCanSort();
                                                setSortedColumn(currentSortState ? header.id : null);
                                              }
                                            }}
                                            style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                                          >
                                            <div className="vg-header-text">{processedHeaderContent}</div>
                                            {sortingIndicator()}
                                            {ShowAddButton && isHourlyPayRate && (
                                              <VgButton
                                                ButtonIcon="plus"
                                                ButtonVariant="ghost"
                                                ButtononClick={() => {
                                                  addRowData(secondHeaderValue, secondHeaderName, secondRowValue, index)
                                                }}
                                                ButtononHover={() => { }}
                                                IconPlacement="prefix"
                                              >
                                                Add
                                              </VgButton>
                                            )}
                                            {ShowAddButton && hoveredColumnIndex === index && (
                                              <div className="delete-icon" onClick={() => handleDeleteColumn(header.id)}>
                                                <Svg name="delete" />
                                              </div>
                                            )}
                                            {collapseExpandLinks}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </th>
                              </React.Fragment>
                            )
                          })}

                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {filteredResults && filteredResults?.length > 0 ? (
                        table.getRowModel().rows.map((row, rowIndex) => (
                          <React.Fragment key={row.id}>
                            {/* Parent Row */}
                            <tr
                              className="vg-addcard_arrow"
                              onClick={() => {
                                if (OnRowClick) {
                                  OnRowClick(row.original, rowIndex);
                                }
                              }}>
                              {row.getVisibleCells().map((cell, index) => {
                                const cellValue = cell.getValue();
                                const columnName = cell.column.id;
                                const isSecondCell = index === 1
                                const isSecondLastCell = index === row.getVisibleCells().length - 2;
                                const stickyCell = (cell.column.columnDef as CustomColumnDef<any>).sticky;
                                const secondCell = 1

                                const isFirstCell = index === 0;
                                const isLastCell = index === row.getVisibleCells().length - 1;
                                const stickyClass = isFirstCell
                                  ? 'sticky-td-first'
                                  : isLastCell
                                    ? 'sticky-td-last'
                                    : '';
                                const currentCol = !isFirstCell && !isSecondLastCell && index === hoveredColumnIndex ? 'current-col' : ""
                                const handlePopup = (popupData: any, rowIndex: number, variant: any) => {
                                  if (openPopupIndex === rowIndex) {
                                    setIsOpen(!isOpen);
                                    if (!isOpen) {
                                      setPopupData({ data: popupData, index: rowIndex, variant: variant });
                                    } else {
                                      setPopupData(null);
                                    }
                                  } else {
                                    setIsOpen(true);
                                    setPopupData({ data: popupData, index: rowIndex, variant: variant });
                                  }
                                  setOpenPopupIndex(rowIndex);
                                };
                                const renderParentBody = (bodyContent: any) => {
                                  if (typeof bodyContent === 'object' || bodyContent !== null) {
                                    if (bodyContent.Button && Array.isArray(bodyContent.Button)) {
                                      return bodyContent.Button.map((button: any, index: any) => {
                                        const { ButtonVariant, ButtonIcon, style, Label, IconPlacement } = button;
                                        if (ButtonVariant === 'action') {
                                          return (
                                            <VgButton
                                              key={index}
                                              ref={(el) => {
                                                buttonRefs.current[rowIndex] = el;
                                              }}
                                              ButtonVariant="action"
                                              ButtononClick={() => handlePopup(bodyContent?.ActionPopup, rowIndex, ButtonVariant)}
                                              ButtononHover={() => { }}
                                              actionbutton={"vertical"}
                                            />
                                          );
                                        }
                                        return (
                                          <div className={`button-style ${mockRowData ? 'ref-rec-btn' : ''}`}>
                                            <VgButton
                                              key={index}
                                              ref={(el) => {
                                                buttonRefs.current[rowIndex] = el;
                                              }}
                                              ButtonIcon={ButtonIcon?.toLowerCase()}
                                              ButtonVariant={ButtonVariant?.toLowerCase()}
                                              ButtononClick={(e: any) => { OnClick(e, rowIndex) }}
                                              ButtononHover={() => { }}
                                              IconPlacement={IconPlacement?.toLowerCase()}
                                            >
                                              {Label}
                                            </VgButton>
                                          </div>
                                        );
                                      });
                                    }
                                    if (bodyContent.DropDown && Array.isArray(bodyContent.DropDown)) {
                                      return bodyContent.DropDown.map((button: any, index: any) => {
                                        const { ButtonVariant, ButtonIcon, style, Label, IconPlacement } = button;
                                        if (ButtonVariant === 'secondary') {
                                          return (
                                            <VgButton
                                              key={index}
                                              ref={(el) => {
                                                buttonRefs.current[rowIndex] = el;
                                              }}
                                              ButtonVariant="secondary"
                                              ButtononClick={() => handlePopup(bodyContent?.ActionPopup, rowIndex, ButtonVariant)}
                                              ButtononHover={() => { }}
                                            >
                                              Action
                                              <svg xmlns="http://www.w3.org/2000/svg" width={10} viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                                            </VgButton>
                                          );
                                        }
                                      });
                                    }
                                    if (bodyContent.ActionPopup && typeof bodyContent.ActionPopup === 'object') {
                                      return (
                                        <div>
                                          {Object.keys(bodyContent.ActionPopup).map((key) => (
                                            <div key={key}>{key}: {bodyContent.ActionPopup[key]}</div>
                                          ))}
                                        </div>
                                      );
                                    }
                                    if (bodyContent.Avatar && Array.isArray(bodyContent.Avatar)) {
                                      return bodyContent.Avatar.map((avatar: any, index: any) => {
                                        const { AvatarSize, style, NoProfile, ProfileUrl } = avatar;
                                        return (
                                          <div key={index}>
                                            <VgAvatar
                                              AvatarSize={AvatarSize}
                                              NoProfile={NoProfile}
                                              ProfileUrl={ProfileUrl}
                                            />
                                          </div>
                                        );
                                      });
                                    }
                                    if (bodyContent.Toggle && Array.isArray(bodyContent.Toggle)) {
                                      return bodyContent.Toggle.map((toggle: any, index: any) => {
                                        const { Description, Name, Title, ToggleId, ToggleVariation, CopyVertical, CopyHorizontal, SetToggleOption, SetValue, style } = toggle;
                                        return (
                                          <div key={index}>
                                            <VgToggle
                                              CopyVertical={CopyVertical}
                                              CopyHorizontal={CopyHorizontal}
                                              Description={Description}
                                              HorizontalOnClick={(e) => { horizontalOnClick(e) }}
                                              Name={Name}
                                              OnChange={(e) => { toggleOnChange(e) }}
                                              OnClick={() => { }}
                                              Title={Title}
                                              SetToggleOption={SetToggleOption}
                                              SetValue={SetValue}
                                              ToggleId={ToggleId}
                                              ToggleVariation={ToggleVariation}
                                              VerticalOnClick={(e) => { verticalOnClick(e) }}
                                            />
                                          </div>
                                        );
                                      });
                                    }
                                    if (bodyContent.Input && Array.isArray(bodyContent.Input)) {
                                      return bodyContent.Input.map((input: any, index: any) => {
                                        const { CustomMsg, InputId, InputTitle, Required, Name, PlaceHolder, SetValue, UrlPrefix, Validation, style } = input;
                                        return (
                                          <div key={index}>
                                            <VgInput
                                              CustomMsg={CustomMsg}
                                              InputId={InputId}
                                              InputTitle={InputTitle}
                                              Required={Required}
                                              Name={Name}
                                              OnBlur={() => { }}
                                              OnChange={() => { }}
                                              PlaceHolder={PlaceHolder}
                                              SetValue={SetValue}
                                              UrlPrefix={UrlPrefix}
                                              Validation={Validation}
                                            />
                                          </div>
                                        );
                                      });
                                    }
                                    if (bodyContent.CheckBox && Array.isArray(bodyContent.CheckBox)) {
                                      return bodyContent.CheckBox.map((checkbox: any, index: any) => {
                                        const { CheckBoxId, CheckboxLabel, CheckboxVariation, Name, style } = checkbox;
                                        return (
                                          <div key={index}>
                                            <VgCheckbox
                                              CheckBoxId={CheckBoxId}
                                              CheckboxLabel={CheckboxLabel}
                                              CheckboxVariation={CheckboxVariation}
                                              Name={Name}
                                              OnChange={() => { }}
                                              OnHover={() => { }}
                                            />
                                          </div>
                                        );
                                      });
                                    }
                                    if (bodyContent.Tooltip && Array.isArray(bodyContent.Tooltip)) {
                                      return bodyContent.Tooltip.map((tooltip: any, index: any) => {
                                        const { BeakPoint, BeakPosition, Children, TextAlign, TooltipText, isHtml, style } = tooltip;
                                        return (
                                          <div key={index}>
                                            <VgTooltip
                                              BeakPoint={BeakPoint}
                                              BeakPosition={BeakPosition}
                                              Children={`${Children}`}
                                              TextAlign={TextAlign}
                                              TooltipText={TooltipText}
                                              Html={isHtml}
                                            />
                                          </div>
                                        );
                                      });
                                    }
                                    if (bodyContent.Badge && Array.isArray(bodyContent.Badge)) {
                                      return bodyContent.Badge.map((badge: any, index: any) => {
                                        const { BadgeSize, BadgeText, BadgeVariation, style } = badge;
                                        return (
                                          <div key={index}>
                                            <VgBadge
                                              BadgeSize={BadgeSize}
                                              BadgeText={BadgeText}
                                              BadgeVariation={BadgeVariation}
                                            />
                                          </div>
                                        );
                                      });
                                    }
                                  } else if (typeof bodyContent === 'string') {
                                    const match = bodyContent.match(/some-regex-pattern/);
                                    if (match) {
                                    }
                                  }
                                  const imageSrc = extractImageSrc(bodyContent);
                                  if (imageSrc) {
                                    return <VgAvatar ProfileUrl={imageSrc} NoProfile="Avatar Image" />;
                                  }
                                  if (React.isValidElement(bodyContent)) {
                                    return bodyContent;
                                  }
                                  const htmlTagPattern = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
                                  if (typeof bodyContent === "string" && htmlTagPattern.test(bodyContent)) {
                                    return <div dangerouslySetInnerHTML={{ __html: bodyContent }} />;
                                  }
                                  const linkPattern = /\$<a href="([^"]+)">([^<]+)<\/a>/;
                                  if (typeof bodyContent === "string" && linkPattern.test(bodyContent)) {
                                    const [, linkUrl, linkText] = linkPattern.exec(bodyContent) || [];
                                    return (
                                      <a
                                        href={linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => getData(e, row)}
                                        style={{ color: 'rgb(42, 144, 214)', cursor: "pointer", textDecoration: 'none' }}
                                        onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                                        onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                                      >
                                        {linkText}
                                      </a>
                                    );
                                  }
                                  return bodyContent;
                                };


                                const renderCommaSeparatedData = (data: string) => {
                                  const imageSrc = extractImageSrc(data);
                                  if (imageSrc) {
                                    return <img src={imageSrc} alt="Avatar" height="35px" width="35px" />;
                                  }
                                  if (typeof data === 'string' && data.includes('/n')) {
                                    return data.split('/n').map((part, index) => {
                                      const linkPattern = /\$<a href="([^"]+)">([^<]+)<\/a>/;
                                      const linkMatch = linkPattern.exec(part);

                                      if (linkMatch) {
                                        const [, linkUrl, linkText] = linkMatch;

                                        return (
                                          <div key={index}>
                                            <a
                                              className="blue-link-text"
                                              href={linkUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                                              onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                                            >
                                              {linkText}
                                            </a>
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={index}>
                                          {part}
                                        </div>
                                      );
                                    });
                                  }
                                  return data;
                                };
                                const setValue = SelectedIds.length > 0
                                  ? selectedRowIds.includes(row?.original?.id)
                                  : selectedRows.includes(row.id);
                                return (
                                  <React.Fragment key={cell.id}>
                                    <td data-lbl={columnName} className={`${stickyCell ? stickyClass : ""}` || currentCol}
                                      style={{
                                        width: `${(cell.column?.columnDef as CustomColumnDef<any>)?.Width || 'auto'}`.endsWith('%')
                                          ? (cell.column?.columnDef as CustomColumnDef<any>)?.Width
                                          : `${(cell.column?.columnDef as CustomColumnDef<any>)?.Width}%`,
                                      }}
                                    >
                                      <div className="vg-table-cell">
                                        <div>
                                          {index === 0 && ParentTable === true &&
                                            <div
                                              className={`product-collapse-trigger ${expandedRows.has(rowIndex) ? 'product-show' : 'product-hide'
                                                } ${row.original.Child && row.original.Child.length > 0 ? '' : 'arrow-hide'}`}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleRow(rowIndex)
                                              }}
                                            >
                                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
                                                <path d="M7 8.0625C6.73633 8.0625 6.50195 7.97461 6.32617 7.79883L0.701172 2.17383C0.320312 1.82227 0.320312 1.20703 0.701172 0.855469C1.05273 0.474609 1.66797 0.474609 2.01953 0.855469L7 5.80664L11.9512 0.855469C12.3027 0.474609 12.918 0.474609 13.2695 0.855469C13.6504 1.20703 13.6504 1.82227 13.2695 2.17383L7.64453 7.79883C7.46875 7.97461 7.23438 8.0625 7 8.0625Z" fill="currentColor"></path>
                                              </svg>
                                            </div>
                                          }
                                        </div>
                                        <div className="checkbox-header">
                                          {index === userIdColumnIndex && ShowRowCheckbox && (
                                            <span onClick={(e) => {
                                              e.stopPropagation();
                                            }}>
                                              <VgCheckbox
                                                CheckBoxId={cell.id}
                                                CheckboxLabel=""
                                                CheckboxVariation="Checkbox-Simple"
                                                Name="vg-checkbox"
                                                SetValue={setValue}
                                                OnChange={(newValue, event) => handleRowCheckboxChange(row.id, newValue, event)}
                                                OnHover={() => { }}
                                              />
                                            </span>
                                          )}
                                        </div>

                                        <div className="cell-content">
                                          {isObjectWithInfo(cellValue) ? (
                                            Object.entries(cellValue)
                                              .filter(([key]) => key !== "info")
                                              .map(([key, value]) => (
                                                <div key={key} className="cell-item">
                                                  {React.isValidElement(value) ? (
                                                    value
                                                  ) : (
                                                    value ? renderParentBody(String(value)) : ""
                                                  )}
                                                </div>
                                              ))
                                          ) : (
                                            cellValue ? (
                                              React.isValidElement(cellValue) ? (
                                                cellValue
                                              ) : (
                                                typeof cellValue === 'object' && cellValue !== null ? (
                                                  <div className="vg-sticky-action">
                                                    <div className="dropdown-btn-table">
                                                      {renderParentBody(cellValue)}
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div className="body-text">
                                                    {renderCommaSeparatedData(cellValue as any)}
                                                  </div>
                                                )
                                              )
                                            ) : (
                                              ""
                                            )
                                          )}
                                          {isObjectWithInfo(cellValue) && cellValue.info && (
                                            <div className="info-icon" data-tooltip={cellValue.info}>
                                              <Svg name="info_circle" />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </React.Fragment>
                                );
                              })}
                            </tr>
                            {expandedRows.has(rowIndex) && row.original?.Child?.length > 0 && row?.original?.Child.map((childRow: { [x: string]: any; }, childIndex: any) => (
                              <tr
                                key={`${row.id}-child-${childIndex}`}
                                className='child-row'
                                onClick={() => {
                                  if (OnRowClick) {
                                    OnRowClick(childRow, childIndex); // Send the child row data
                                  }
                                }}
                              >
                                {row.getVisibleCells().map((cell, cellIndex) => {
                                  const columnName = cell.column.id;
                                  const childValue = childRow[columnName];
                                  const renderBody = (bodyContent: any) => {
                                    if (typeof bodyContent === 'object' && bodyContent !== null) {
                                    }
                                    const imageSrc = extractImageSrc(bodyContent);
                                    if (imageSrc) {
                                      return <img src={imageSrc} alt="Avatar" height="35px" width="35px" />;
                                    }
                                    if (imageSrc) {
                                      return <VgAvatar ProfileUrl={imageSrc} NoProfile="Avatar Image" />;
                                    }
                                    if (React.isValidElement(bodyContent)) {
                                      return bodyContent;
                                    }
                                    const htmlTagPattern = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
                                    if (typeof bodyContent === "string" && htmlTagPattern.test(bodyContent)) {
                                      return <div dangerouslySetInnerHTML={{ __html: bodyContent }} />;
                                    }
                                    const linkMatches = bodyContent.match(/\$<a href="([^"]+)">([^<]+)<\/a>/);
                                    if (linkMatches) {
                                      const linkUrl = linkMatches[1];
                                      const linkText = linkMatches[2];
                                      return (
                                        <a
                                          href={linkUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => getData(e, row)}
                                        >
                                          <p dangerouslySetInnerHTML={{ __html: linkText }} />
                                        </a>
                                      );
                                    }

                                    return bodyContent;
                                  };
                                  const setValue = SelectedIds.length > 0
                                    ? selectedRowIds.includes(row?.original?.id)
                                    : selectedRows.includes(`child-${row.id}-${childIndex}`);
                                  return (
                                    <td key={`${row.id}-child-${childIndex}-${columnName}`} className={` ${cellIndex === userIdColumnIndex && ShowRowCheckbox ? 'vg-table-cell' : 'td-width-50 pl-8'} ${cellIndex === userIdColumnIndex && !ShowRowCheckbox ? 'expandedRows-first-column' : ''}`} data-lbl={columnName}>
                                      {cellIndex === userIdColumnIndex && ShowRowCheckbox &&
                                        (<div className="product-table-expanded-checkbox">
                                          {cellIndex === userIdColumnIndex && ShowRowCheckbox && (
                                            <div className="checkbox-header">
                                              <span onClick={(e) => {
                                                e.stopPropagation();
                                              }}>
                                                <VgCheckbox
                                                  CheckBoxId={`child-${row.id}-${childIndex}`}
                                                  CheckboxLabel=""
                                                  CheckboxVariation="Checkbox-Simple"
                                                  Name="vg-checkbox"
                                                  SetValue={setValue}
                                                  OnChange={(e: any) => handleRowCheckboxChange(`child-${row.id}-${childIndex}`, e, e)}
                                                  OnHover={() => { }}
                                                />
                                              </span>

                                            </div>
                                          )}

                                        </div>)}
                                      {childValue ? (
                                        typeof childValue === 'object' && childValue !== null ? (
                                          renderBody(childValue)
                                        ) : (
                                          renderBody(String(childValue))
                                        )
                                      ) : (
                                        '-'
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </React.Fragment>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={columnData.length + 1} className="no-data">
                            No results found
                          </td>
                        </tr>
                      )}

                      {/* Popup Portal */}
                      {isOpen && popupData && openPopupIndex !== null && (
                        <Portal inputRef={buttonRefs.current[openPopupIndex] ? { current: buttonRefs.current[openPopupIndex] } : undefined} wrapperElement="tr"
                          type={popupData?.variant === "action" ? PortalEnum.action : null}>
                          <div className="vg-dropdown-action" ref={modalRef}>
                            {popupData.data?.map((item: any, idx: number) => (
                              <React.Fragment key={idx}>
                                <a className="vg-dropdown-link">{item}</a>
                              </React.Fragment>
                            ))}
                          </div>
                        </Portal>
                      )}
                    </tbody>
                    {/* Table Footer */}
                    {Footer != "None" && (
                      <tfoot>
                        <tr>
                          {PagingType === "Paggination On Footer" ?

                            (<>
                              <td colSpan={columnData.length} className={Footer === "Sticky" ? "fixed-footer" : "sticky-footer"}>
                                {!Virtualization && (
                                  <>
                                    <div className="pagination-controls">
                                      {/* Go to first page */}
                                      {ShowFirstLastButtons && (
                                        <button
                                          disabled={offset === 1}
                                          onClick={(e) => {

                                            handleFirstPage();
                                            handleControlChange?.('firstButtons', e, 1);
                                          }}
                                        >
                                          {<i className="fa-solid fa-angles-left"></i>}
                                        </button>
                                      )}

                                      {/* Go to previous page */}
                                      {ShowPrevNextButtons && (
                                        <button
                                          disabled={offset === 1}

                                          onClick={(e) => {
                                            handlePrevPage();
                                            handleControlChange?.('preButtons', e, offset - 1);
                                          }}
                                        >
                                          {<i className="fa-solid fa-angle-left"></i>}
                                        </button>
                                      )}

                                      {/* Page Numbers */}
                                      {(() => {
                                        const totalPages = PageSize ? PageSize : calculateTotalPages();
                                        const currentPage = offset;
                                        const range = 2;

                                        let pages = [];
                                        let showLeftDots = false;
                                        let showRightDots = false;

                                        // Always show first page
                                        pages.push(1);

                                        for (let i = 2; i <= totalPages; i++) {
                                          if (
                                            i === totalPages || // Always show last page
                                            (currentPage - range <= i && i <= currentPage + range) // Show pages around current page
                                          ) {
                                            pages.push(i);
                                          } else if (i < currentPage && !showLeftDots) {
                                            showLeftDots = true;
                                            pages.push('left-dots');
                                          } else if (i > currentPage && !showRightDots) {
                                            showRightDots = true;
                                            pages.push('right-dots');
                                          }
                                        }

                                        return pages.map((page, index) => {
                                          if (page === 'left-dots' || page === 'right-dots') {
                                            return <span key={`dots-${index}`}>...</span>;
                                          }

                                          return (
                                            <button
                                              key={page}
                                              className={offset === page ? "active" : ""}
                                              onClick={(e) => {
                                                setOffset(Number(page));
                                                handleControlChange?.('pageButtons', e, Number(page));
                                              }}
                                            >
                                              {page}
                                            </button>
                                          );
                                        });
                                      })()}
                                      {/* Go to next page */}
                                      {ShowPrevNextButtons && (
                                        <button
                                          disabled={offset >= (PageSize || calculateTotalPages())}

                                          onClick={(e) => {
                                            handleNextPage();
                                            handleControlChange?.('nextButtons', e, offset + 1);
                                          }}
                                        >
                                          {<i className="fa-solid fa-angle-right"></i>}
                                        </button>
                                      )}

                                      {/* Go to last page */}
                                      {ShowFirstLastButtons && (
                                        <button
                                          disabled={offset >= (PageSize || calculateTotalPages())}
                                          onClick={(e) => {

                                            handleLastPage();
                                            handleControlChange?.('lastButtons', e, PageSize || calculateTotalPages());
                                          }}
                                        >
                                          {<i className="fa-solid fa-angles-right"></i>}
                                        </button>
                                      )}

                                      {/* Page size selector */}
                                      {ShowPageSizeSelector && (
                                        <span className="select-control">
                                          Rows per page:{" "}

                                          <select
                                            value={currentPageSize}
                                            onChange={handlePageSizeChange}
                                          >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                          </select>
                                        </span>
                                      )}

                                      {/* Total items and pages */}
                                      {ShowTotalInfo && (
                                        <div className="row-info">
                                          <span>

                                            <strong>{TotalRecord || RowData?.length}</strong> items in <strong>{PageSize || calculateTotalPages()}</strong> pages
                                          </span>
                                        </div>

                                      )}
                                    </div>
                                  </>
                                )}
                              </td>
                            </>)

                            :
                            (<>

                              {footer.map((col, index) => (
                                <td key={index} className={Footer === "Sticky" ? "fixed-footer" : "sticky-footer"}>
                                  {/* Example footer content for each column */}
                                  {col.accessorKey}
                                </td>
                              ))}
                            </>)
                          }
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            </>
          )}
      </div>
    </div >
  );
});

export default VgTableGrid;