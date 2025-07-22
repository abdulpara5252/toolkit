import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Tabledata.scss";
import VgTableGrid from "../VgTables/VgTableGrid";
import VgButton from "../VgButton/VgButton";

const Tabledata = () => {

  useEffect(() => {


  }, []);

  return (
    <Fragment>
      <div className="form-container-table">
        <div className="vgform-container">
          <h2 className="form-title"></h2>
          <div className="dashboard-section">
            <div className="sidebar"></div>
            <div className="box-table">
              <h2>Normal Table</h2>
              <div className="graph-design">
                <VgTableGrid

                  ColumnData={[
                    {
                      DataValue: 'Business',
                      Dataheader: 'Business',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutDate',
                      Dataheader: 'Checkout Date',
                      MinWidth: 180,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutBy',
                      Dataheader: 'Checkout By',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'TransactionID',
                      Dataheader: 'Transaction ID',
                      MinWidth: 200,
                      Sorting: true
                    },
                    {
                      DataValue: 'AppDate',
                      Dataheader: 'App Date',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'Customer',
                      Dataheader: 'Customer',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'ItemSold',
                      Dataheader: 'Item Sold',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'SoldBy',
                      Dataheader: 'Sold By',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'Qty',
                      Dataheader: 'Qty',
                      MinWidth: 120,
                      Sorting: false
                    },
                    {
                      DataValue: 'Price',
                      Dataheader: 'Price',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tax',
                      Dataheader: 'Tax',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tip',
                      Dataheader: 'Tip',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Disc',
                      Dataheader: 'Disc',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'AmtPaid',
                      Dataheader: 'Amt Paid',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Cash',
                      Dataheader: 'Cash',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Check',
                      Dataheader: 'Check',
                      MinWidth: 150,
                      Sorting: false
                    }
                  ]}
                  Footer="None"
                  FooterData={[
                    {
                      FooterValue: '',
                      Footerheader: 'Business'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout By'
                    },
                    {
                      FooterValue: 'Total',
                      Footerheader: 'Transaction ID'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'App Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Customer'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Item Sold'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Sold By'
                    },
                    {
                      FooterValue: '12',
                      Footerheader: 'Qty'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Price'
                    },
                    {
                      FooterValue: '$70.00',
                      Footerheader: 'Tax'
                    },
                    {
                      FooterValue: '$0.00',
                      Footerheader: 'Tip'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Disc'
                    },
                    {
                      FooterValue: '$150.00',
                      Footerheader: 'Amt Paid'
                    },
                    {
                      FooterValue: '$250.00',
                      Footerheader: 'Cash'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Check'
                    }
                  ]}
                  OnClick={() => { }}
                  OnClickSorting={() => { }}
                  PagingType="None"
                  RowData={[
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Primary',
                          'Pencil',
                          'Prefix',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'action',
                          'vertical'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Ghost',
                          '',
                          '',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Avtaar: [
                          'Small',
                          'john Doe',
                          ''
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '\n        <div style="position: relative; display: inline-block; width: 50px; height: 50px;">\n          <svg viewBox="0 0 36 36" style="max-width: 100%; max-height: 100%;">\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #f2f2f2; stroke-width: 3.8;"\n            />\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #3e8438; stroke-width: 2.8; stroke-linecap: round; stroke-dasharray: 75, 100;"\n            />\n            <text x="18" y="20.35" style="font-size: 0.5em; text-anchor: middle; fill: #333;">75%</text>\n          </svg>\n        </div>',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    }
                  ]}
                  SortingType="Inline"
                />
              </div>
              <h2>stricky footer Table with search , print and PDF button</h2>
              <div className="graph-design">
                <VgTableGrid
                  ColumnData={[
                    {
                      DataValue: 'Business',
                      Dataheader: 'Business',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutDate',
                      Dataheader: 'Checkout Date',
                      MinWidth: 180,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutBy',
                      Dataheader: 'Checkout By',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'TransactionID',
                      Dataheader: 'Transaction ID',
                      MinWidth: 200,
                      Sorting: true
                    },
                    {
                      DataValue: 'AppDate',
                      Dataheader: 'App Date',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'Customer',
                      Dataheader: 'Customer',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'ItemSold',
                      Dataheader: 'Item Sold',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'SoldBy',
                      Dataheader: 'Sold By',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'Qty',
                      Dataheader: 'Qty',
                      MinWidth: 120,
                      Sorting: false
                    },
                    {
                      DataValue: 'Price',
                      Dataheader: 'Price',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tax',
                      Dataheader: 'Tax',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tip',
                      Dataheader: 'Tip',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Disc',
                      Dataheader: 'Disc',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'AmtPaid',
                      Dataheader: 'Amt Paid',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Cash',
                      Dataheader: 'Cash',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Check',
                      Dataheader: 'Check',
                      MinWidth: 150,
                      Sorting: false
                    }
                  ]}
                  Footer="Sticky"
                  FooterData={[
                    {
                      FooterValue: '',
                      Footerheader: 'Business'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout By'
                    },
                    {
                      FooterValue: 'Total',
                      Footerheader: 'Transaction ID'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'App Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Customer'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Item Sold'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Sold By'
                    },
                    {
                      FooterValue: '12',
                      Footerheader: 'Qty'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Price'
                    },
                    {
                      FooterValue: '$70.00',
                      Footerheader: 'Tax'
                    },
                    {
                      FooterValue: '$0.00',
                      Footerheader: 'Tip'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Disc'
                    },
                    {
                      FooterValue: '$150.00',
                      Footerheader: 'Amt Paid'
                    },
                    {
                      FooterValue: '$250.00',
                      Footerheader: 'Cash'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Check'
                    }
                  ]}
                  OnClick={() => { }}
                  OnClickSorting={() => { }}
                  PagingType="None"
                  RowData={[
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Primary',
                          'Pencil',
                          'Prefix',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'action',
                          'vertical'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Ghost',
                          '',
                          '',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Avtaar: [
                          'Small',
                          'john Doe',
                          ''
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '\n        <div style="position: relative; display: inline-block; width: 50px; height: 50px;">\n          <svg viewBox="0 0 36 36" style="max-width: 100%; max-height: 100%;">\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #f2f2f2; stroke-width: 3.8;"\n            />\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #3e8438; stroke-width: 2.8; stroke-linecap: round; stroke-dasharray: 75, 100;"\n            />\n            <text x="18" y="20.35" style="font-size: 0.5em; text-anchor: middle; fill: #333;">75%</text>\n          </svg>\n        </div>',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    }
                  ]}
                  ShowExportPDF
                  ShowPrint
                  ShowSearch
                  SortingType="API Call"
                />
              </div>
              <h2>pagination with footer Table</h2>
              <div className="graph-design">
                <VgTableGrid
                  ColumnData={[
                    {
                      DataValue: 'Business',
                      Dataheader: 'Business',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutDate',
                      Dataheader: 'Checkout Date',
                      MinWidth: 180,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutBy',
                      Dataheader: 'Checkout By',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'TransactionID',
                      Dataheader: 'Transaction ID',
                      MinWidth: 200,
                      Sorting: true
                    },
                    {
                      DataValue: 'AppDate',
                      Dataheader: 'App Date',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'Customer',
                      Dataheader: 'Customer',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'ItemSold',
                      Dataheader: 'Item Sold',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'SoldBy',
                      Dataheader: 'Sold By',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'Qty',
                      Dataheader: 'Qty',
                      MinWidth: 120,
                      Sorting: false
                    },
                    {
                      DataValue: 'Price',
                      Dataheader: 'Price',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tax',
                      Dataheader: 'Tax',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tip',
                      Dataheader: 'Tip',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Disc',
                      Dataheader: 'Disc',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'AmtPaid',
                      Dataheader: 'Amt Paid',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Cash',
                      Dataheader: 'Cash',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Check',
                      Dataheader: 'Check',
                      MinWidth: 150,
                      Sorting: false
                    }
                  ]}
                  Footer="Sticky"
                  FooterData={[
                    {
                      FooterValue: '',
                      Footerheader: 'Business'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout By'
                    },
                    {
                      FooterValue: 'Total',
                      Footerheader: 'Transaction ID'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'App Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Customer'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Item Sold'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Sold By'
                    },
                    {
                      FooterValue: '12',
                      Footerheader: 'Qty'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Price'
                    },
                    {
                      FooterValue: '$70.00',
                      Footerheader: 'Tax'
                    },
                    {
                      FooterValue: '$0.00',
                      Footerheader: 'Tip'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Disc'
                    },
                    {
                      FooterValue: '$150.00',
                      Footerheader: 'Amt Paid'
                    },
                    {
                      FooterValue: '$250.00',
                      Footerheader: 'Cash'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Check'
                    }
                  ]}
                  OnClick={() => { }}
                  OnClickSorting={() => { }}
                  PagingType="Paggination On Footer"
                  RowData={[
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Primary',
                          'Pencil',
                          'Prefix',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'action',
                          'vertical'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Ghost',
                          '',
                          '',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Avtaar: [
                          'Small',
                          'john Doe',
                          ''
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '\n        <div style="position: relative; display: inline-block; width: 50px; height: 50px;">\n          <svg viewBox="0 0 36 36" style="max-width: 100%; max-height: 100%;">\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #f2f2f2; stroke-width: 3.8;"\n            />\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #3e8438; stroke-width: 2.8; stroke-linecap: round; stroke-dasharray: 75, 100;"\n            />\n            <text x="18" y="20.35" style="font-size: 0.5em; text-anchor: middle; fill: #333;">75%</text>\n          </svg>\n        </div>',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    }
                  ]}
                  ShowExportPDF
                  ShowPrint
                  ShowSearch
                  SortingType="Inline"
                />
              </div>
              <h2>Scrollable footer Table</h2>
              <div className="graph-design">
                <VgTableGrid
                  ColumnData={[
                    {
                      DataValue: 'Business',
                      Dataheader: 'Business',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutDate',
                      Dataheader: 'Checkout Date',
                      MinWidth: 180,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutBy',
                      Dataheader: 'Checkout By',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'TransactionID',
                      Dataheader: 'Transaction ID',
                      MinWidth: 200,
                      Sorting: true
                    },
                    {
                      DataValue: 'AppDate',
                      Dataheader: 'App Date',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'Customer',
                      Dataheader: 'Customer',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'ItemSold',
                      Dataheader: 'Item Sold',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'SoldBy',
                      Dataheader: 'Sold By',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'Qty',
                      Dataheader: 'Qty',
                      MinWidth: 120,
                      Sorting: false
                    },
                    {
                      DataValue: 'Price',
                      Dataheader: 'Price',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tax',
                      Dataheader: 'Tax',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tip',
                      Dataheader: 'Tip',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Disc',
                      Dataheader: 'Disc',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'AmtPaid',
                      Dataheader: 'Amt Paid',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Cash',
                      Dataheader: 'Cash',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Check',
                      Dataheader: 'Check',
                      MinWidth: 150,
                      Sorting: false
                    }
                  ]}
                  Footer="Scrollable"
                  FooterData={[
                    {
                      FooterValue: '',
                      Footerheader: 'Business'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout By'
                    },
                    {
                      FooterValue: 'Total',
                      Footerheader: 'Transaction ID'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'App Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Customer'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Item Sold'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Sold By'
                    },
                    {
                      FooterValue: '12',
                      Footerheader: 'Qty'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Price'
                    },
                    {
                      FooterValue: '$70.00',
                      Footerheader: 'Tax'
                    },
                    {
                      FooterValue: '$0.00',
                      Footerheader: 'Tip'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Disc'
                    },
                    {
                      FooterValue: '$150.00',
                      Footerheader: 'Amt Paid'
                    },
                    {
                      FooterValue: '$250.00',
                      Footerheader: 'Cash'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Check'
                    }
                  ]}
                  OnClick={() => { }}
                  OnClickSorting={() => { }}
                  PagingType="None"
                  RowData={[
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Primary',
                          'Pencil',
                          'Prefix',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'action',
                          'vertical'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Ghost',
                          '',
                          '',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Avtaar: [
                          'Small',
                          'john Doe',
                          ''
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '\n        <div style="position: relative; display: inline-block; width: 50px; height: 50px;">\n          <svg viewBox="0 0 36 36" style="max-width: 100%; max-height: 100%;">\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #f2f2f2; stroke-width: 3.8;"\n            />\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #3e8438; stroke-width: 2.8; stroke-linecap: round; stroke-dasharray: 75, 100;"\n            />\n            <text x="18" y="20.35" style="font-size: 0.5em; text-anchor: middle; fill: #333;">75%</text>\n          </svg>\n        </div>',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    }
                  ]}
                  ShowExportPDF
                  ShowPrint
                  ShowSearch
                  SortingType="Inline"
                />
              </div>
              <h2>Virtualization Table</h2>
              <div className="graph-design v-data-design">
                <VgTableGrid
                  ColumnData={[
                    {
                      DataValue: 'Business',
                      Dataheader: 'Business',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutDate',
                      Dataheader: 'Checkout Date',
                      MinWidth: 180,
                      Sorting: true
                    },
                    {
                      DataValue: 'CheckoutBy',
                      Dataheader: 'Checkout By',
                      MinWidth: 170,
                      Sorting: true
                    },
                    {
                      DataValue: 'TransactionID',
                      Dataheader: 'Transaction ID',
                      MinWidth: 200,
                      Sorting: true
                    },
                    {
                      DataValue: 'AppDate',
                      Dataheader: 'App Date',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'Customer',
                      Dataheader: 'Customer',
                      MinWidth: 170,
                      Sorting: false
                    },
                    {
                      DataValue: 'ItemSold',
                      Dataheader: 'Item Sold',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'SoldBy',
                      Dataheader: 'Sold By',
                      MinWidth: 180,
                      Sorting: false
                    },
                    {
                      DataValue: 'Qty',
                      Dataheader: 'Qty',
                      MinWidth: 120,
                      Sorting: false
                    },
                    {
                      DataValue: 'Price',
                      Dataheader: 'Price',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tax',
                      Dataheader: 'Tax',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Tip',
                      Dataheader: 'Tip',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Disc',
                      Dataheader: 'Disc',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'AmtPaid',
                      Dataheader: 'Amt Paid',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Cash',
                      Dataheader: 'Cash',
                      MinWidth: 150,
                      Sorting: false
                    },
                    {
                      DataValue: 'Check',
                      Dataheader: 'Check',
                      MinWidth: 150,
                      Sorting: false
                    }
                  ]}
                  Footer="Sticky"
                  FooterData={[
                    {
                      FooterValue: '',
                      Footerheader: 'Business'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Checkout By'
                    },
                    {
                      FooterValue: 'Total',
                      Footerheader: 'Transaction ID'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'App Date'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Customer'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Item Sold'
                    },
                    {
                      FooterValue: '',
                      Footerheader: 'Sold By'
                    },
                    {
                      FooterValue: '12',
                      Footerheader: 'Qty'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Price'
                    },
                    {
                      FooterValue: '$70.00',
                      Footerheader: 'Tax'
                    },
                    {
                      FooterValue: '$0.00',
                      Footerheader: 'Tip'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Disc'
                    },
                    {
                      FooterValue: '$150.00',
                      Footerheader: 'Amt Paid'
                    },
                    {
                      FooterValue: '$250.00',
                      Footerheader: 'Cash'
                    },
                    {
                      FooterValue: '$50.00',
                      Footerheader: 'Check'
                    }
                  ]}
                  OnClick={() => { }}
                  OnClickSorting={() => { }}
                  PagingType="None"
                  RowData={[
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Primary',
                          'Pencil',
                          'Prefix',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'action',
                          'vertical'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Button: [
                          'Ghost',
                          '',
                          '',
                          'Click'
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: {
                        Avtaar: [
                          'Small',
                          'john Doe',
                          ''
                        ]
                      },
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '\n        <div style="position: relative; display: inline-block; width: 50px; height: 50px;">\n          <svg viewBox="0 0 36 36" style="max-width: 100%; max-height: 100%;">\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #f2f2f2; stroke-width: 3.8;"\n            />\n            <path\n              d="M18 2.0845\n                 a 15.9155 15.9155 0 0 1 0 31.831\n                 a 15.9155 15.9155 0 0 1 0 -31.831"\n              style="fill: none; stroke: #3e8438; stroke-width: 2.8; stroke-linecap: round; stroke-dasharray: 75, 100;"\n            />\n            <text x="18" y="20.35" style="font-size: 0.5em; text-anchor: middle; fill: #333;">75%</text>\n          </svg>\n        </div>',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 21, 2024 - 10:40 PM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Employee Done',
                      CheckoutDate: 'Nov 21, 2024 - 8:30 AM',
                      Customer: 'A Bg',
                      Disc: '$0.00',
                      ItemSold: 'Pilates',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103100040'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Membership 02',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: '--',
                      CheckoutDate: 'Nov 21, 2024 - 4:01 AM',
                      Customer: '--',
                      Disc: '$0.00',
                      ItemSold: 'Silver membership',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103097514'
                    },
                    {
                      AmtPaid: '$8.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$8.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 7:49 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '"""@#$%^&*()',
                      Price: '$8.00',
                      Qty: 1,
                      SoldBy: 'Lucky d Singh',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043796'
                    },
                    {
                      AmtPaid: '$0.00',
                      AppDate: 'Nov 20, 2024 - 9:30 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$0.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: 'Men\'s Haircut',
                      Price: '$0.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    },
                    {
                      AmtPaid: '$280.00',
                      AppDate: 'Nov 20, 2024 - 9:55 AM',
                      Business: 'US02 Biz - 2',
                      Cash: '$280.00',
                      Check: '$0.00',
                      CheckoutBy: 'Lucky d Singh',
                      CheckoutDate: 'Nov 20, 2024 - 6:50 AM',
                      Customer: 'ashok a',
                      Disc: '$0.00',
                      ItemSold: '2 Strand Twist (Fuller Size)',
                      Price: '$280.00',
                      Qty: 1,
                      SoldBy: 'dev mail',
                      Tax: '$0.00',
                      Tip: '$0.00',
                      TransactionID: 'TR103043088'
                    }
                  ]}
                  ShowExportPDF
                  ShowPrint
                  ShowSearch
                  Virtualization={true}
                  SortingType="Inline"
                />
              </div>


              <div className="exportfootSection footerbtn">
                <VgButton
                  ButtonVariant="secondary"
                  ButtononClick={() => { }}
                  ButtononHover={() => { }}
                >
                  Export
                </VgButton>
                <VgButton
                  ButtonVariant="primary"
                  ButtononClick={() => { }}
                  ButtononHover={() => { }}
                >
                  Print
                </VgButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Tabledata;

