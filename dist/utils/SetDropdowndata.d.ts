interface FetchUsersProps {
    isOpen?: boolean;
    page?: number;
    searchTerm?: string;
    apiUrl: string;
    scrollPagination?: boolean;
    recordsPerPage?: number;
    responseType: "Single" | "Grouped" | "Nested";
    nestedChildObject: string;
    childIdKey: string;
    childTitleKey: string;
    parentIdentifier?: string;
    parentChildRelationshipName?: string;
    method?: "GET" | "POST";
    headers?: Record<string, string>;
    params?: Record<string, any>;
    body?: Record<string, any>;
    parentIdKey?: string;
    parentTitleKey?: string;
    dataKey?: any;
    totalCountKey?: any;
    totalcountData?: any;
}
export declare const SetDropdowndata: ({ isOpen, page, searchTerm, apiUrl, scrollPagination, recordsPerPage, method, headers, params, body, parentIdKey, parentTitleKey, responseType, parentIdentifier, parentChildRelationshipName, nestedChildObject, childIdKey, childTitleKey, dataKey, totalCountKey, }: FetchUsersProps) => Promise<{
    formattedData: {
        label: any;
        value: any;
    }[] | undefined;
    hasMore: boolean;
    totalcountData: any;
} | {
    formattedData: never[];
    hasMore: boolean;
    totalcountData?: undefined;
} | null>;
export {};
