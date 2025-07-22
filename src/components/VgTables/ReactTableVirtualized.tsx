import React, { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import { useImperativeHandle } from "react";
import { VariableSizeList as List,ListChildComponentProps } from "react-window";
import VgInput from "../VgTextbox/VgTextbox";
import VgButton from "../VgButton/VgButton";
import VgAvatar from "../VgAvatar/VgAvatar";
import ReactDOM from "react-dom";
import PrintSettings from "../../utils/PrintSettings";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { TableData, Tablecolumns } from "./mockData";
import VgToggle from "../VgToggle/VgToggle";
import VgCheckbox from "../VgCheckbox/VgCheckbox";
import VgTooltip from "../VgTooltip/VgTooltip";
import VgBadge  from "../VgBadge/VgBadge";

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
  rowHeight?: number,
  tableWidth?: number,
  tableHeight?: number,
  OnRowClick?: (rowData: any, rowIndex: number) => void;
}

interface ColumnStyle {
  cellWidth: number;
}
interface ColumnStyles {
  [key: number]: ColumnStyle;
}

const ReactTableVirtualized = forwardRef<ReactTableVirtualizedHandle, ReactTableVirtualizedProps>((props, ref) => {
  const {
    columnDefs,
    filteredResults: Results,
    showSearch,
    showPrint,
    showExportPDF,
    getData,
    onActionClick,
    sortingType,
    OnClickSorting,
  } = props;


  const [arrowPostion, setArrowPostion] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [weblistHeight, setWeblistHeight] = useState(window.innerHeight - 338);
  const mainlistPosref = useRef<any>(0);
  const [filteredResults, setFilteredResults] = useState(TableData);
  const [modalVisibleRowIndex, setModalVisibleRowIndex] = useState<number | null>(null)
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "none" });
  const [searchTerm, setSearchTerm] = useState("");
  const [tableWidth, setTableWidth] = useState(0);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [popupData, setPopupData] = useState<any>(null);

  const [selectAll, setSelectAll] = useState(false);
  const tableRef = useRef<ReactTableVirtualizedHandle>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null);




  const getRowHeight = () => 70;

  useEffect(() => {
    const totalWidth = Tablecolumns.reduce(
      (acc, col) => acc + col.MinWidth,
      0
    );
    setTableWidth(totalWidth);
  }, [Tablecolumns]);

  useImperativeHandle(ref, () => ({
    scrollToLastColumn: () => parentRef.current?.scrollTo({ left: parentRef.current.scrollWidth, behavior: "smooth" }),
    scrollToFirstColumn: () => parentRef.current?.scrollTo({ left: 0, behavior: "smooth" }),
  }));

  const scrollToLastColumn = () => {
    if (parentRef.current) {
      parentRef.current.scrollLeft = parentRef.current.scrollWidth;
    }
  };

  const scrollToFirstColumn = () => {
    if (parentRef.current) {
      parentRef.current.scrollLeft = 0;
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


  const handleActionClick = (index: number) => {
  };

  const closeModal = () => {
    setModalVisibleRowIndex(null);
  };

  const handleAction = (action: string) => {
    closeModal();
  };

  const OnSortingTypeChange = (e: any, type: any) => {
    if (OnClickSorting) {
      OnClickSorting(e, type)
    }
  }


  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(TableData.map((_, index) => index)));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelectChange = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSort = (columnKey: any) => {
    if (!columnKey) return;

    const direction = sortConfig.key === columnKey && sortConfig.direction === "asc" ? "desc" : "asc";

    const sorted = [...filteredResults].sort((a: any, b: any) => {
      const valA = a[columnKey] ?? "";
      const valB = b[columnKey] ?? "";

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredResults(sorted);
    setSortConfig({ key: columnKey, direction });
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
        SettingData={Array.isArray(TableData) ? TableData : []}
        Column={Array.isArray(Tablecolumns) ? Tablecolumns : []}
        Title={"Employee List"}
      />,
      printDiv
    );
  };


  const exportToPDF = () => {
    const doc = new jsPDF();
    const columns = Object.keys(TableData[0] || {});
    const rows = TableData.map((row: any) =>
      columns.map((key) =>
        typeof row[key] === "object" && row[key] !== null ? row[key].value : row[key]
      )
    );
    const pageWidth = doc.internal.pageSize.width;
    const margins = 20;
    const availableWidth = pageWidth - margins;

    const getColumnWeight = (columnName: string): number => {
      if (columnName.toLowerCase().includes('description')) return 2;
      if (columnName.toLowerCase().includes('name')) return 1.5;
      return 1;
    };

    const totalWeight = columns.reduce((sum, col) => sum + getColumnWeight(col), 0);

    const columnStyles = columns.reduce<ColumnStyles>((styles, col, index) => {
      const weight = getColumnWeight(col);
      styles[index] = {
        cellWidth: (availableWidth * weight) / totalWeight
      };
      return styles;
    }, {});
    doc.autoTable({
      head: [columns],
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase().trim();
    setSearchTerm(searchValue);
    if (!searchValue) {
      setFilteredResults(TableData);
      return;
    }
    const filteredData = TableData.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().trim().includes(searchValue)
      )
    );
    setFilteredResults(filteredData);
  };

  const handleListScroll = ({ scrollOffset }: any) => {
    mainlistPosref.current = scrollOffset;
  }

  const renderValue = (value: any, row?: any, index?: any) => {
    if (React.isValidElement(value)) {
      return React.cloneElement(value);
    }
    if (typeof value === "object" && value !== null) {
      if (value.Button) {
        return value.Button?.map((button: any, index: number) => {
          const { ButtonVariant, Label, ButtonIcon, IconPlacement } = button

          const handlePopup = (popupData: any, rowIndex: number, rowOriginal: any) => {
            setIsOpen(true);
            setPopupData({ data: popupData, index: rowIndex }); // Set data and row index
            setOpenPopupIndex(index);  // Set the row index whose popup should be open
          };

          if (ButtonVariant == "action") {
            return (
              <VgButton
                key={index}
                ButtonVariant="action"
                ButtononClick={() => {}}
                ButtononHover={() => {}}
                actionbutton="vertical"
              />
            );
          } else {
            return <VgButton
              key={index}
              ButtonIcon={ButtonIcon}
              ButtonVariant={ButtonVariant}
              ButtononClick={() => {}}
              ButtononHover={() => { }}
              IconPlacement={IconPlacement}
            >
              {Label}
            </VgButton>
          }
        });
      }
      if (value.Avatar) {
        return value.Avatar?.map((avatar: any, index: number) => {
          const { AvatarSize, NoProfile, ProfileUrl } = avatar;  
          return (
            <VgAvatar
              key={index} 
              AvatarSize={AvatarSize}
              NoProfile={NoProfile}
              ProfileUrl={ProfileUrl}
            />
          );
        });
      }
      if (value.Toggle) {
        return value.Toggle?.map((toggle: any, index: number) => {
          const { Description, Name, Title, ToggleId, ToggleVariation } = toggle;
          return (
            <VgToggle
              key={index}
              Description={Description}
              Name={Name}
              OnChange={() => { }}
              Title={Title}
              ToggleId={ToggleId}
              ToggleVariation={ToggleVariation}
            />
          );
        })
      }
      if (value.Input) {
        return value.Input?.map((input: any, index: number) => {
          const { CustomMsg, InputId, InputTitle, Required, Name, PlaceHolder, SetValue, UrlPrefix, Validation } = input;
          return (
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
          );
        })
      }
      if (value.Checkbox) {
        return value.Checkbox?.map((checkbox: any, index: number) => {
          const { CheckBoxId, CheckboxLabel, CheckboxVariation, Name } = checkbox;
          return (
            <VgCheckbox
              key={index}
              CheckBoxId={CheckBoxId}
              CheckboxLabel={CheckboxLabel}
              CheckboxVariation={CheckboxVariation}
              OnChange={() => { }}
              OnHover={() => { }}
              Name={Name}
            />
          );
        })
      }
      if (value.Tooltip) {
        return value.Tooltip?.map((tooltip: any, index: number) => {
          const { BeakPoint, BeakPosition, Children, TextAlign, TooltipText, isHtml } = tooltip;
          return (
            <VgTooltip
              key={index}
              BeakPoint={BeakPoint}
              BeakPosition={BeakPosition}
              Children={Children}
              TextAlign={TextAlign}
              TooltipText={TooltipText}
              Html={isHtml}
            />
          );
        })
      }
      if (value.Badge) {
        return value.Badge?.map((badge: any, index: number) => {
          const { BadgeSize, BadgeText, BadgeVariation } = badge;
          return (
            <VgBadge
              key={index}
              BadgeSize={BadgeSize}
              BadgeText={BadgeText}
              BadgeVariation={BadgeVariation}
            />
          );
        })
      }
      if (value.DropDown) {
        return value.DropDown?.map((button: any, index: number) => {
          const { ButtonVariant, ButtonIcon, style, Label, IconPlacement } = button;
          if (ButtonVariant == "secondary") {
            return (
              <VgButton
                key={index}
                ButtonVariant="secondary"
                ButtononClick={() => {}} 
                ButtononHover={() => {}}  
              >
                 Action
                 <svg xmlns="http://www.w3.org/2000/svg" width={10} viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
              </VgButton>
            );
          }
        });
      }
      return JSON.stringify(value);
    }
    const htmlTagPattern = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
    if (typeof value === "string" && htmlTagPattern.test(value)) {
      return <div dangerouslySetInnerHTML={{ __html: value }} />;
    }
    return value ?? "--";
  };


  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);


  const TableRow = ({
    data,
    index,
    style,
    columnDefs,
    selectedRows,
    handleRowSelectChange,
  }: any) => {
    const isChecked = selectedRows.has(index);

    return (
      <div
        className="vg-list-data-grid-tbody"
        style={{ ...style, width: "100%", position: "absolute" }}
        onClick={() => {
          if (props.OnRowClick) {
            props.OnRowClick(data, index); // Send data and index click on row
          }
        }}
      >
        {/* <div
        className="vg-list-data-grid-td"
          style={{
            minWidth: "50px", 
            flexShrink: 0,
           
          }}
        >
          {SelectAll && <div className="checkbox-header">
            <input
              type="checkbox"
              checked={isChecked}
              className="custom-checkbox"
              onChange={() => handleRowSelectChange(index)}
            />
          </div>}
        </div> */}
        {columnDefs.map((col: any) => (
          <div
            className="vg-list-data-grid-td"
            key={col.DataValue}
            style={{
              // maxWidth: col.MinWidth,
              minWidth: col.MinWidth,
              flexShrink: 0,
              flexBasis: col.MinWidth,

            }}
          >
            {renderValue(data[col.DataValue], col, index)}
          </div>
        ))}
      </div>
    );
  };


  const TableVirtualization = ({ data, columnDefs }: any) => {
    return (
      <List
        height={weblistHeight}
        itemCount={data.length}
        itemData={{ data }}
        ref={mainlistPosref}
        itemSize={getRowHeight}
        width={Math.max(tableWidth, parentRef.current?.clientWidth || 0)}
        onScroll={handleListScroll}
      >
        {({ index, style }:ListChildComponentProps) => {
          const row = data[index];
          return (
            <TableRow
              data={row}
              index={index}
              style={style}
              columnDefs={columnDefs}
              selectedRows={selectedRows}
              handleRowSelectChange={handleRowSelectChange}
            />
          );
        }}
      </List>
    );
  };

  return (
    <Fragment>
      {(showSearch || showPrint || showExportPDF) &&(<div className="grid-toolbar">
        {showSearch && (
          <div className="employee-search-box">
            <input
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
                setFilteredResults(TableData);
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 8.00098C0 3.59473 3.5625 0.000976562 8 0.000976562C12.4062 0.000976562 16 3.59473 16 8.00098C16 12.4385 12.4062 16.001 8 16.001C3.5625 16.001 0 12.4385 0 8.00098ZM5.46875 6.53223L6.9375 8.00098L5.46875 9.46973C5.15625 9.78223 5.15625 10.251 5.46875 10.5322C5.75 10.8447 6.21875 10.8447 6.5 10.5322L7.96875 9.06348L9.46875 10.5322C9.75 10.8447 10.2188 10.8447 10.5 10.5322C10.8125 10.251 10.8125 9.78223 10.5 9.46973L9.03125 8.00098L10.5 6.53223C10.8125 6.25098 10.8125 5.78223 10.5 5.46973C10.2188 5.18848 9.75 5.18848 9.46875 5.46973L7.96875 6.96973L6.5 5.46973C6.21875 5.18848 5.75 5.18848 5.46875 5.46973C5.15625 5.78223 5.15625 6.25098 5.46875 6.53223Z"></path></svg>
              </div>)}
          </div>

        )}
        <div className="filter-button">
          {showPrint && (
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
          {showExportPDF && (
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

      {/* <div className="top-right-badge">
        {!arrowPostion ?
          (<><FontAwesomeIcon icon={faAngleRight} onClick={scrollToRight} /></>)
          : (<><FontAwesomeIcon icon={faAngleLeft} onClick={scrollToLeft} /></>)}
      </div> */}
      <div className="vg-list-data-grid" ref={parentRef}>
        {/* Header */}
        <div
          className="vg-list-data-grid-table"
        >
          <div className="vg-list-data-grid-thead">
            {/* <div
              className="vg-list-data-grid-th"
              style={{
            minWidth: "50px",
            flexShrink: 0,
           
          }}
            >
              {SelectAll && <div className="checkbox-header">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={selectAll || data.length === selectedRows.size}
                  onChange={handleSelectAllChange}
                />
              </div>}
            </div> */}
            {Tablecolumns.map((col: any) => (
              <div
                className="vg-list-data-grid-th"
                key={col.DataValue}
                style={{
                  minWidth: col.MinWidth,
                  flexShrink: 0,
                  flexBasis: col.MinWidth,

                }}
                onClick={() => {
                  col.Sorting && handleSort(col.DataValue);
                  if (sortingType === "API Call") {
                    const newDirection = sortConfig.direction === "asc" ? "desc" : "asc";
                    OnSortingTypeChange(col.DataValue, newDirection);
                  }
                }}
              >
                {col.Dataheader}
                <div className="sort">
                  {col.Sorting && (
                    col.DataValue === sortConfig.key ? (
                      sortConfig.direction === "asc" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="14px" height="14px">
                          <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="14px" height="14px">
                          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                        </svg>
                      )
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Body */}
        <div className="vg-list-data-grid-table vg-grid-float-list">
          {filteredResults.length > 0 && (
            <TableVirtualization data={filteredResults} columnDefs={Tablecolumns} />
          )}
        </div>
      </div>
    </Fragment>
  );
});

export default ReactTableVirtualized;
