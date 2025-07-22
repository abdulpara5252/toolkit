export function initializeSetMobileDataVagaroAI(callback: any): void;
export namespace utils {
    function CallBackGivenToMobileApp(NativeActionVal: any, PageTitle: any, Footer: any, TimerCount: any, IsFullLength: any): void;
    function CheckIsFromProAppWithoutState(): boolean;
    function MobileDatePicker(message: any): void;
    function CheckIsFromIpadAndroidTabWithoutParm(): boolean;
    function CheckIsFromIpadAndroidPayproWithoutParm(): boolean;
    function CheckIsPayProDevice(): boolean;
    function CheckIsFromPaydeskWithoutParm(): boolean;
    function CheckIsIphoneIosproWithoutState(): boolean;
    function ToolkitSendCallbacktoMobile(callBackIndex: any, data: any): void;
    function safeClone(obj: any): any;
}
export namespace PortalEnum {
    let action: number;
    let timePickerRight: number;
    let timePickerLeft: number;
    let smileyPicker: number;
    let addressSuggestions: number;
    let dateRangePickerRight: number;
    let dateRangePickerWindowLeft: number;
    let dateRangePickerWindowRight: number;
}
export function FormatSelectedDateRange(startDate: any, endDate: any, ActionTagForDate: any, callFromLocationId: any): void;
export function handleAutoFocus(focus: any, ref: any, delay: any): void;
