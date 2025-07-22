export default CustomerService;
declare function CustomerService(businessId: any, loginUserId: any, hasCustomerRights: boolean | undefined, DepositGroupID: any, ApiUrlInToday: any, ApiRequestParams: any, TransactionDate: any): {
    GetTodayCustomerList: (searchText?: string) => Promise<{
        ID: any;
        FN: string;
        C: any;
        D: any;
        N: any;
        E: any;
        DName: string;
        profileImage: any;
        points: any;
        customerData: any;
    }[]>;
    GetAllCustomers: (searchText?: string, pageIndex?: number, pageSize?: number) => Promise<{
        customers: any;
        totalCount: any;
    } | undefined>;
    GetSaveForLaterList: () => Promise<{
        ID: any;
        FN: string;
        C: any;
        D: any;
        N: any;
        E: any;
        SaveForLaterId: any;
        DName: string;
        customerData: any;
    }[]>;
    MapCustomerData: (data: any) => {
        ID: any;
        FN: string;
        C: any;
        D: any;
        N: any;
        E: any;
        DName: string;
        profileImage: any;
        points: any;
        customerData: any;
    }[];
    MapSaveForLaterData: (data: any) => {
        ID: any;
        FN: string;
        C: any;
        D: any;
        N: any;
        E: any;
        SaveForLaterId: any;
        DName: string;
        customerData: any;
    }[];
    SearchCustomer: (customerList: any, searchText: any, countryId?: number) => any;
    CustomerSmartSearch: (term: any, text: any) => boolean;
    FormatPhoneByCountry: (phonenumber: any, countryID: any, returnType: any, DialingCode?: string) => any;
    PaginateResults: (data: any, pageIndex: any, pageSize: any) => any;
    IsFromLocalStorage: () => boolean;
    NeedToSync: () => boolean;
    LastSyncDate: () => any;
    MaxQuataReached: () => any;
    lastSyncBusID: () => any;
    GetCustomersFromLocalStorage: () => any;
    InvalidateLocalStorage: () => void;
    StoreLocalStorage: (newList: any, syncDate: any, deletedIDs: any) => any;
    Sortingalphabetical: (customers: any) => any[];
};
