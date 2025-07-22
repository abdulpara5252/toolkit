// import axios, { AxiosRequestConfig } from "axios";
import AjaxService from "../common/AjaxService.jsx";
 
interface BaseItem {
  id: string;
  label: string;
  title: string;
  value?: string;
}

interface Option extends BaseItem {
  value: string;
}

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
  totalcountData?: any
}
 
interface ApiResponse {
  data: any; // Replace `any` with a more specific type if possible
}
 
export const SetDropdowndata = async ({
  isOpen = true,
  page = 1,
  searchTerm = "",
  apiUrl,
  scrollPagination = false,
  recordsPerPage = 10,
  method = "GET",
  headers = {},
  params = {},
  body = {},
  parentIdKey = "id",
  parentTitleKey = "title",
  responseType,
  parentIdentifier,
  parentChildRelationshipName,
  nestedChildObject,
  childIdKey,
  childTitleKey,
  dataKey,
  totalCountKey,
}: FetchUsersProps) => {
  if (!isOpen) return null;

  const paginationQuery = scrollPagination ? { PageIndex: page, PageSize: recordsPerPage } : {};
  // const axiosConfig: AxiosRequestConfig = {
  //   method,
  //   url: apiUrl,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     ...headers,
  //   },
  //   params: {
  //     ...(method === 'GET' && paginationQuery), // Only include parentIdentifier in params for GET
  //     ...(method === 'GET' && searchTerm ? { SearchText: searchTerm.trim() } : {}), // Only include search in params for GET
  //     ...params,
  //   },
  // };
 
  // // For POST requests, include search term in body only
  // if (method === "POST") {
  //   axiosConfig.data = JSON.stringify({
  //     ...body,
  //   searchText: searchTerm, // Explicitly set after spreading
  //   pageIndex: page,
  //   pagesize: recordsPerPage,
  //   });
  // }
 
  try {
    // const response = await axios(axiosConfig);
    let response: { data?: any } = {};
    
    // Use AjaxService for GET or POST requests
    if (method === "GET") {
      const queryParams = {
        ...(paginationQuery),
        ...(searchTerm ? { SearchText: searchTerm.trim() } : {}),
        ...params,
      };
 
      response = await new Promise<ApiResponse>((resolve, reject) => {
        AjaxService.GetV2(
          apiUrl,
          { params: queryParams },  // Correctly passing params object
          (response: any) => resolve(response),
          (error: any) => reject(error),
          headers
        );
      });
    } else if (method === "POST") { 
      // For POST requests, include search term in body only
      const postData = JSON.stringify({
        ...body,
        searchText: searchTerm, // Explicitly set after spreading
        pageIndex: page,
        pagesize: recordsPerPage,
      });
 
      response = await new Promise<ApiResponse>((resolve, reject) => {
        AjaxService.PostV2(
          apiUrl,
          postData,
          (response: any) => resolve(response),
          (error: any) => reject(error),
          headers
        );
      });
    }
   
    const responseData = response?.data;

    const data: any[] = Array.isArray(responseData) ? responseData : 
    responseData && typeof dataKey === "string"
      ? getNestedProperty(responseData, dataKey) || []
      : [];
    const totalcountData = getNestedProperty(responseData, totalCountKey)
      
      if (!Array.isArray(data)) {
        throw new Error("Fetched data is not an array");
      }
    if (data.length === 0 && page === 1) {
      return {
        formattedData: [],
        hasMore: false,
        totalcountData
      };
    }

    let formattedData;

    if (responseType === "Single") {
      if (parentChildRelationshipName) {
        const parents = data.filter(item => 
          String(item[parentChildRelationshipName]) === "0" || item[parentChildRelationshipName] === null
        );

        if (parents.length > 0) {
          const parentIds = parents.map(parent => parent[parentIdKey]);
          
          const childrenByParent = data.reduce((acc, item) => {
            if (item[parentChildRelationshipName] && 
                parentIds.includes(String(item[parentChildRelationshipName]))) {
              const parentId = item[parentChildRelationshipName];
              if (!acc[parentId]) {
                acc[parentId] = [];
              }
              acc[parentId].push({
                label: item[parentTitleKey] || "Unknown",
                value: item[parentIdKey] || "Unknown"
              });
            }
            return acc;
          }, {} as Record<string, Option[]>);

          const hasChildren = Object.keys(childrenByParent).length > 0;

          if (hasChildren) {
            formattedData = parents.map(parent => ({
              label: parent[parentTitleKey] || "Unknown",
              value: parent[parentIdKey] || "Unknown",
              options: childrenByParent[parent[parentIdKey]] || []
            }));
          } else {
            formattedData = data.map((item) => ({
              label: item[parentTitleKey] || "Unknown",
              value: item[parentIdKey] || "Unknown",
            }));
          }
        } else {
          formattedData = data.map((item) => ({
            label: item[parentTitleKey] || "Unknown",
            value: item[parentIdKey] || "Unknown",
          }));
        }
      } else {
        formattedData = data.map((item) => ({
          label: item[parentTitleKey] || "Unknown",
          value: item[parentIdKey] || "Unknown",
        }));
      }
    } else if (responseType === "Nested" && nestedChildObject) {
      formattedData = data.map((item) => ({
        label: item[parentTitleKey] || "Unknown",
        value: item[parentIdKey] || "Unknown",
        options:
          item[nestedChildObject]?.map((child: any) => ({
            label: child[childTitleKey] || "Unknown",
            value: child[childIdKey] || "Unknown",
          })) || [],
      }));
    } else if (responseType === "Grouped") {
      formattedData = data.map((item) => {
        const hasNestedOptions = Object.values(item).some((val) => Array.isArray(val));
        const optionsArray =
          (item[nestedChildObject] || []).map((option: any) => ({
            label: option[childTitleKey] || "Unknown",
            value: option[childIdKey] || "Unknown",
          })) || [];

        if (hasNestedOptions && optionsArray.length > 0) {
          return {
            label: item[parentTitleKey] || "Unknown",
            value: item[parentIdKey] || "Unknown",
            options: optionsArray,
          };
        } else {
          return {
            label: item[parentTitleKey] || "Unknown",
            value: item[parentIdKey] || "Unknown",
          };
        }
      });
    }

    const hasMore = data.length >= recordsPerPage;
    return {
      formattedData,
      hasMore,
      totalcountData
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      formattedData: [],
      hasMore: false,
    };
  }
  function getNestedProperty(obj: any, key: string): any {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  }
};