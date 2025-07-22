import React, { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ProgressBarTableData, ProgressBarColumnData } from '../components/VgTables/mockData';
import { createRoot } from 'react-dom/client';

const PrintSettings = (props) => {
    useEffect(() => {
        setTimeout(function () {
            var tablecss = "<style>";
            tablecss += "@page { size: auto; margin: 10px;}";
            tablecss += "body{font-size:11px;font-family:Arial,Verdana;font-weight:normal;line-height:1.2;color:#4b5239;margin:10px;padding:0}";
            tablecss += "table{background:#FFFFFF;color:#000;width:100%;font-size:11px;font-family:Arial,Verdana;border-collapse:collapse;border:1px solid #ddd;line-height:1.2;}";
            tablecss += "table .text-center{text-align:center;}";
            tablecss += "table .alt td{background-color:#fff;}";
            tablecss += "table tr:nth-of-type(even) td{background-color:#fff;}";
            tablecss += "table tr{border-bottom:1px solid #000000;}";
            tablecss += "table,table th{border-collapse:collapse;border:1px solid black;}";
            tablecss += "table td{border-right:solid 1px #000000;text-align:center;vertical-align:middle;padding:2px;}";
            tablecss += ".vg-heading-title{padding:5px 0;}";
            tablecss += "h1,h2,h3,h4,h5{text-align:center;display:block;margin:5px 0;}";
            tablecss += ".tableScrollReport{height:auto!important;}";
            tablecss += "</style>";
            var WindowObject = window.open(
                "",
                "",
                "left=10,top=10,width=800,Height=600,toolbar=0,scrollbars=0,status=0,resizable=0"
            );
            const compressedHTML = document.getElementById("printsetting" + props.SettingType).innerHTML
                .replace(/\s+/g, ' ')
                .replace(/\/n/g, '')
                .replace(/&nbsp;/g, '')
                .replace(/\\n/g, '')
                .replace(/>\s+</g, '><')
                .trim();

            WindowObject.document.writeln(
                "<html><head><title>VAGARO</title></head>" +
                tablecss +
                compressedHTML
            );

            WindowObject.document.close();
            WindowObject.focus();
            WindowObject.print();
            // unmountComponentAtNode(document.getElementById("printdiv"));
            const printDiv = document.getElementById("printdiv");
            if (printDiv) {
                const root = createRoot(printDiv);
                root.unmount();
            }
        }, 600);
    }, [props.SettingType]);

    const renderCellData = (data, isEmployeeList = false, columnName = '') => {
        if (!data) return '-';
        if (typeof data === 'string' || typeof data === 'number') {
            return data;
        }
        if (columnName === 'Status' && !isEmployeeList) {
            return '-';
        }
        if (data && typeof data === 'object') {
            if (data.Badge && isEmployeeList) {
                return data.Badge[0]?.BadgeText || '-';
            } else if (data.Badge) {
                return '-';
            }
        }
        if (React.isValidElement(data)) {
            const props = data.props;
            const children = props.children;
            const elementType = data.type;
            if (elementType === 'i') {
                return '';
            }
            if (typeof elementType === 'string' && elementType.toLowerCase().startsWith('vg')) {
                return '-';
            }
            if (elementType === 'div') {
                if (props.children) {
                    if (Array.isArray(props.children)) {
                        const processedChildren = props.children
                            .map(child => {
                                if (!child) return null;
                                if (React.isValidElement(child) && child.type === 'i') {
                                    return null;
                                }
                                if (React.isValidElement(child) &&
                                    typeof child.type === 'string' &&
                                    child.type.toLowerCase().startsWith('vg')) {
                                    return null;
                                }
                                if (React.isValidElement(child) && child.type === 'div') {
                                    return renderCellData(child.props.children);
                                }
                                return child.props?.children || child;
                            })
                            .filter(Boolean)
                            .join(' ');

                        return processedChildren || '-';
                    }
                    return renderCellData(props.children);
                }


            }
            if (typeof data === 'object') {
                if (data.props?.children?.type?.toLowerCase?.()?.startsWith('vg')) {
                    return '-';
                }
                if (data.props?.children) {
                    return renderCellData(data.props.children);
                }
            }
            if (Array.isArray(props.children)) {
                return props.children
                    .filter(child => !(React.isValidElement(child) && child.type === 'i'))
                    .map(child => renderCellData(child))
                    .filter(Boolean)
                    .join(' ') || '-';
            }
            return props.children || '-';
        }

        if (typeof data === "object" && data !== null) {
            if (data.props?.children?.props?.BadgeText && !isEmployeeList) {
                return '-';
            }
            return JSON.stringify(data);
        }
        return data || "-";

    }

    const isEmployeeData = () => {
        return props.SettingData.some(data => 'Employees' in data);
    };

    const renderTableHeader = () => {
        if (isEmployeeData()) {
            return (
                <thead><tr>
                    <th>Employees</th>
                    <th>Email</th>
                    <th>Cell</th>
                    {ProgressBarColumnData.map((col) => {
                        if (col.DataValue !== 'Employees' &&
                            col.DataValue !== 'Action' &&
                            col.DataValue !== 'Status' &&
                            col.DataValue !== 'Component' &&
                            !col.DataValue?.toLowerCase().includes('receipt')) {
                            return <th key={col.DataValue}>{col.DataValue}</th>;
                        }
                        return null;
                    })}
                    {isEmployeeData() && <th>Status</th>}
                </tr></thead>
            );
        }

        return (
            <thead><tr>
                {props.Column.map((col) => {
                    if (col.DataValue === 'Component' ||
                        col.DataValue === 'Action' ||
                        col.DataValue?.toLowerCase().includes('receipt')) {
                        return null;
                    }
                    return (
                        <th key={col.DataValue} className="text-center" style={{ fontWeight: 'bold' }}>{col.DataValue}</th>
                    );
                })}
            </tr></thead>
        );
    };

    const renderTableBody = () => {
        const containsAnchorTag = (data) => {
            const regex = /<a[^>]*>.*?<\/a>/;
            return regex.test(data);
        };

        const extractContentBeforeAnchor = (data) => {
            if (!data) return '';
            const regex = /^(.*?)(<a[^>]*>.*?<\/a>)/;
            const match = data.match(regex);
            if (match) {
                return match[1];
            }
            return data;
        };

        const extractAnchorText = (data) => {
            if (!data) return '';
            const regex = /<a[^>]*>(.*?)<\/a>/;
            const match = data.match(regex);
            return match ? match[1] : '';
        };

        const extractProductInfo = (productData) => {
            if (!productData) return '';
            if (typeof productData === 'string') {
                if (containsAnchorTag(productData)) {
                    return extractAnchorText(productData);
                }
                const productHeadingMatch = productData.match(/<div class="product-heading">(.*?)<\/div>/);
                return productHeadingMatch ? productHeadingMatch[1] : productData;
            }
            if (productData?.props?.children) {
                const productNameDiv = productData.props.children.find(
                    child => child?.props?.className === 'product-name'
                );
                if (productNameDiv) {
                    const productName = productNameDiv.props.children.props.children;
                    const cleanProductName = productName.replace(/<img[^>]*>/g, '').trim();
                    return cleanProductName;
                }
            }
            return 'No Product Info'; 
        };
        
        const processCellData = (cellData, columnName) => {
            if (!cellData) return '';
            if (typeof cellData === 'string' && containsAnchorTag(cellData)) {
                const textBeforeAnchor = extractContentBeforeAnchor(cellData);
                const textInAnchor = extractAnchorText(cellData);
                return `${textBeforeAnchor} ${textInAnchor}`;
            }
            if (columnName === 'Product') {
                return extractProductInfo(cellData);
            }
            return cellData;
        };

        if (isEmployeeData()) {
            return (
                <tbody>
                    {ProgressBarTableData.map((rowData, rowIndex) => (
                        <Fragment key={rowIndex}>
                            <tr>
                                <td>{rowData.name}</td>
                                <td>{rowData?.email}</td>
                                <td>{rowData?.cell}</td>
                                {ProgressBarColumnData.map((col) => {
                                    if (col.DataValue !== 'Employees' &&
                                        col.DataValue !== 'Component' &&
                                        col.DataValue !== 'Action' &&
                                        col.DataValue !== 'Status' &&
                                        !col.DataValue?.toLowerCase().includes('receipt')) {
                                        const cellData = rowData[col.DataValue];
                                        const processedContent = processCellData(cellData, col.DataValue);
                                        return <td key={`${col.DataValue}-${rowIndex}`}>
                                            {renderCellData(processedContent)}
                                        </td>;
                                    }
                                    return null;
                                })}
                                <td>{rowData?.Status?.Badge?.[0]?.BadgeText ?? '-'}</td>
                            </tr>
                            {rowData?.Child && rowData.Child.map((child, childIndex) => (
                                <tr key={`child-${rowIndex}-${childIndex}`}>
                                    <td>{child.Product ? extractProductInfo(child.Product) : "-"}</td>
                                    <td>{child.Brand ? child.Brand : "-"}</td>
                                    <td>{child.ProuctType ? child.ProuctType : "-"}</td>
                                    <td>{child?.Barcode_ID ? child?.Barcode_ID : "-"}</td>
                                    <td>{child?.Buisness_Cost ? child?.Buisness_Cost : "-"}</td>
                                    <td>{child?.Selling_Price ? child?.Selling_Price : "-"}</td>
                                    <td>{child?.In_Stock ? child?.In_Stock : "-"}</td>
                                </tr>
                            ))}

                        </Fragment>
                    ))}
                </tbody>
            );
        }

        return (
            <tbody>
                {props.SettingData.map((rowData, rowIndex) => (
                    <Fragment key={rowIndex}>
                        <tr>
                            {props.Column.map((col) => {
                                if (col.DataValue === 'Component' || col.DataValue === 'Receipt') {
                                    return null;
                                }
                                const cellData = rowData[col.DataValue];
                                const processedContent = processCellData(cellData, col.DataValue);
                                return (
                                    <td key={`${col.DataValue}-${rowIndex}`} className="text-center">
                                        {renderCellData(processedContent)}
                                    </td>
                                );
                            })}
                        </tr>
                        {rowData?.Child && rowData.Child.map((child, childIndex) => (                        
                            <tr key={`child-${rowIndex}-${childIndex}`}>
                                <td>{child.Product ? extractProductInfo(child.Product) : "-"}</td>
                                <td>{child.Brand ? child.Brand : "-"}</td>
                                <td>{child.ProuctType ? child.ProuctType : "-"}</td>
                                <td>{child?.Barcode_ID ? child?.Barcode_ID : "-"}</td>
                                <td>{child?.Buisness_Cost ? child?.Buisness_Cost : "-"}</td>
                                <td>{child?.Selling_Price ? child?.Selling_Price : "-"}</td>
                                <td>{child?.In_Stock ? child?.In_Stock : "-"}</td>
                            </tr>
                        ))}
                    </Fragment>
                ))}
            </tbody>
        );
    };

    return createPortal(
        <div id="printsetting1" style={{ display: "none" }}>
            <React.Suspense fallback="loading...">
                <Fragment>
                    <div className="text-center"><h4>{props.Title}</h4></div>
                    <table id="tblemployeeprofilelist" width="100%" border="0" cellPadding="0" cellSpacing="0">
                        {renderTableHeader()}
                        {renderTableBody()}
                    </table>
                </Fragment>
            </React.Suspense>
        </div>,
        document.getElementById("printdiv")
    );
};

export default PrintSettings;
