import axios from 'axios';

// Constants
const CACHE_KEYS = {
  CUSTOMER_LIST: 'cusList',
  SYNC_INFO: 'cusSynInfo'
};

const MS_PER_MINUTE = 60000;
const SYNC_DURATION_MINUTES = 30; // Adjust as needed

// Main Customer Service function
const CustomerService = (businessId, loginUserId, hasCustomerRights = true, DepositGroupID, ApiUrlInToday, ApiRequestParams, TransactionDate) => {
  const state = {
    businessId,
    loginUserId,
    hasCustomerRights,
    isDBCallOnly: false,
    isSyncStarted: false,
    dateFormat: "MM/DD/YYYY"
  };

  // Get Today's Customers
  const GetTodayCustomerList = async (searchText = '') => {
    try {
      const data = {
        BusinessID: state.businessId,
        TransactionDate: TransactionDate,
        SearchText: searchText,
        DepositGroupID: DepositGroupID,
      }

      const response = await axios.post(
        ApiUrlInToday,
        data,
        { headers: ApiRequestParams.headers },
      );

      if (response?.data?.CustomCode === 1000) {
        return MapCustomerData(response.data.Data);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching today\'s customer list:', error);
      return [];
    }
  };


  // Get All Customers with local storage caching
  const GetAllCustomers = async (searchText = '', pageIndex = 1, pageSize = 10) => {
    // debugger
    // if (IsFromLocalStorage() && !NeedToSync()) {
      const localData = GetCustomersFromLocalStorage();
      // console.log('Local Data:', localData);
      
      if (localData && localData.length > 0) {
        const filteredData = SearchCustomer(localData, searchText);
        const sortedData = Sortingalphabetical(filteredData);

        // console.log('Filtered Data:', filteredData);
        // console.log('Paginated Data:', PaginateResults(sortedData, pageIndex, pageSize));

        return {
          customers: PaginateResults(sortedData, pageIndex, pageSize),
          totalCount: filteredData.length
        };
        
        
      }
    // }
    // return { customers: [], totalCount: 0 };

    // try {
    //   const isForLocalStorage = (LastSyncDate() === null && !MaxQuataReached()) 
    //     ? true 
    //     : !MaxQuataReached();
      
    //   const lastSync = isForLocalStorage ? LastSyncDate() : null;
    //   console.log('Last Sync:', lastSync);
    //   console.log('Is For Local Storage:', isForLocalStorage);
      
      
    //   const response = await axios.post(
    //     'https://us02.vagaro.com/merchants/checkout/WebServices/MySampleService.asmx/PageMethodsProxyJson',
    //     {
    //       Data: `[${state.businessId},"${searchText}",${state.hasCustomerRights},${pageIndex},${pageSize},${lastSync},${isForLocalStorage},""]`,
    //       Token: "GetAllCustomers"
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json; charset=UTF-8',
    //         // Add other required headers here
    //       }
    //     }
    //   );

    //   if (response.data) {
    //     const customerList = response.data.objUsersList || [];
    //     customerList = Sortingalphabetical(customerList);
        
    //     if (typeof localStorage === 'object' && !MaxQuataReached()) {
    //       if (LastSyncDate() === null) {
    //         InvalidateLocalStorage();
    //       }
          
    //       const processedList = StoreLocalStorage(
    //         customerList, 
    //         response.data.lastCalledTime, 
    //         response.data.deletedIDs
    //       );
    //       const sortedProcessedList = Sortingalphabetical(processedList);
          
    //       return {
    //         customers: PaginateResults(sortedProcessedList, pageIndex, pageSize),
    //         totalCount: processedList.length
    //       };
    //     }
        
    //     return {
    //       customers: customerList,
    //       totalCount: response.data.TotalCount || customerList.length
    //     };
    //   }
      
    //   return { customers: [], totalCount: 0 };
    // } catch (error) {
    //   console.error('Error fetching all customers:', error);
    //   return { customers: [], totalCount: 0 };
    // }
  };
  
   // Get Save for Later list
  const GetSaveForLaterList = async () => {
    try {
      const response = await axios.post(
        'https://us02.vagaro.com/merchants/checkout/WebServices/MySampleService.asmx/PageMethodsProxyJson',
        {
          Data: `{"objRequest":{"businessID":"${state.businessId}","loginUserID":"${state.loginUserId}"}}`,
          Token: "GetSaveForLaterList"
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            // Add required headers here
          }
        }
      );
      
      if (response.data) {
        return MapSaveForLaterData(response.data);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching save for later list:', error);
      return [];
    }
  };

  // Map customer data to a standard format
  const MapCustomerData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(item => ({
      ID: item.UserID || item.ID || '',
      FN: `${item.FirstName || ''} ${item.LastName || ''}`.trim(),
      C: item.Cell || '',
      D: item.DayPhone || '',
      N: item.NightPhone || '',
      E: item.EmailId || '',
      DName: '',  // Will be populated in SearchCustomer
      profileImage: item.ProfileImage || 'default-image-url',
      points: item.Points || 0,
      // Additional fields for full customer data
      customerData: item,
    }));
  };

  // Map save for later data
  const MapSaveForLaterData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(item => ({
      ID: item.PayeeId.toString() || '',
      FN: `${item.FirstName || ''} ${item.LastName || ''}`.trim(),
      C: item.Cell || '',
      D: item.DayPhone || '',
      N: item.NightPhone || '',
      E: item.EmailId || '',
      SaveForLaterId: item.SaveForLaterId || '',
      DName: '',  // Will be populated in SearchCustomer
      // Additional fields for full customer data
      customerData: item,
    }));
  };

  // Search and filter customer list
  const SearchCustomer = (customerList, searchText, countryId = 1) => {
    if (!customerList || customerList.length === 0) return [];
    
    let filteredList = customerList;
    
    if (searchText) {
      searchText = searchText.replace(/^0+/, '').replace(/\(/g, "").replace(/\)/g, "").replace(/-/g, "").trim();
      
      filteredList = customerList.filter(item => 
        CustomerSmartSearch(searchText.toLowerCase(), item.FN.trim().toLowerCase()) ||
        (state.hasCustomerRights && searchText && item.E && 
          item.E.replace(/ /g, '').replace(/\(/g, "").replace(/\)/g, "").replace(/-/g, "").indexOf(searchText.replace(/ /g, '')) > -1) ||
        (state.hasCustomerRights && searchText && item.C && 
          item.C.replace(/ /g, '').replace(/\(/g, "").replace(/\)/g, "").replace(/-/g, "").indexOf(searchText.replace(/ /g, '')) > -1) ||
        (state.hasCustomerRights && searchText && item.D && 
          item.D.replace(/ /g, '').replace(/\(/g, "").replace(/\)/g, "").replace(/-/g, "").indexOf(searchText.replace(/ /g, '')) > -1) ||
        (state.hasCustomerRights && searchText && item.N && 
          item.N.replace(/ /g, '').replace(/\(/g, "").replace(/\)/g, "").replace(/-/g, "").indexOf(searchText.replace(/ /g, '')) > -1)
      );
    }
    
    // Format display names with phone/email if customer has rights
    return filteredList.map(item => {
      const phone = state.hasCustomerRights ? 
        (item.C || item.D || item.N || '') : '';
      
      const email = state.hasCustomerRights ? 
        (item.E || '') : '';
      
      const displayName = item.FN + 
        (phone ? ` - ${FormatPhoneByCountry(phone, countryId)}` : '') + 
        (email ? ` - ${email}` : '');
      
      return {
        ...item,
        DName: displayName
      };
    });
  };

  // Smart search algorithm
  const CustomerSmartSearch = (term, text) => {
    const spaceReplaceRegex = /\s\s+/g;
    const regex = /[^0-9a-zA-Z\" \"]+/gi;
    
    let filterSearch = term.replace(spaceReplaceRegex, ' ');
    filterSearch = filterSearch.toLowerCase().replace(regex, '');
    
    const searchKeywords = filterSearch.split(' ');
    let matchedArray = '';
    const requiredMatchCount = searchKeywords.length;
    let totalMatchFound = 0;
    
    for (let i = 0; i < searchKeywords.length; i++) {
      let textSearch = text.replace(spaceReplaceRegex, ' ');
      textSearch = textSearch.toLowerCase().replace(regex, '');
      
      if (textSearch.match("^" + searchKeywords[i]) || textSearch.indexOf(" " + searchKeywords[i]) !== -1) {
        if (matchedArray === "" || searchKeywords[i].indexOf(matchedArray) < 0) {
          totalMatchFound += 1;
        }
        matchedArray = " " + textSearch;
        if (totalMatchFound >= requiredMatchCount) {
          break;
        }
      }
    }
    
    return totalMatchFound >= requiredMatchCount;
  };

  // Format phone number based on country
  // const FormatPhoneByCountry = (phone, countryId) => {
  //   // Simple US format for now - can be expanded to more countries
  //   if (!phone) return '';
    
  //   // Strip non-digits
  //   const digits = phone.replace(/\D/g, '');
    
  //   if (countryId === 1) { // US format
  //     if (digits.length === 10) {
  //       return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
  //     }
  //   }
    
  //   return phone; // Return original if no formatting applied
  // };

  const FormatPhoneByCountry = (phonenumber, countryID, returnType, DialingCode = '') => {
    try {
      if (phonenumber != null && typeof (phonenumber) != "undefined" && phonenumber.length != 0 && phonenumber.length > 8) {
        var numbers = phonenumber.replace(/\D/g, ''),
          FormatPhone = { 0: '(', 3: ') ', 6: '-' };//US

        if (typeof (countryID) != "undefined" && countryID != null && countryID * 1 > 0) {
          if (countryID == 2 && numbers.length == 10) {
            if (typeof DialingCode == 'undefined' || DialingCode == null || DialingCode == '' || DialingCode != '353') {
              numbers = "0" + numbers;
            }
          }
          else if (countryID == 4 && numbers.length == 9) {
            numbers = "0" + numbers;
          }
          else if (countryID == 2 && numbers.length == 9) {
            numbers = "0" + numbers;
          }
        }
        if (typeof (countryID) != "undefined" && countryID != null && countryID * 1 > 0) {
            if (countryID == 2) { //UK
              if (typeof DialingCode == 'undefined' || DialingCode == null || DialingCode == '' || DialingCode != '353') { FormatPhone = { 3: ' ', 7: ' ' }; }
              else {
                FormatPhone = { 0: '(', 2: ') ', 7: ' ' };
              }

            }
            else if (countryID == 3) { // Canada
              FormatPhone = { 3: '-', 6: '-' };
            }
            else if (countryID == 4) { // Australia
              FormatPhone = { 0: '(', 2: ') ', 6: ' ' };
            }
        }
        phonenumber = '';
        for (var i = 0; i < numbers.length; i++) {
          phonenumber += (FormatPhone[i] || '') + numbers[i];
        }

        if (returnType != undefined && returnType != "" && returnType != null && returnType == 'withoutspace') {
          phonenumber = phonenumber.replace(/([()-\s])+/g, '');
        }
      }
      return phonenumber;

    } catch (e) {
      return phonenumber;
    }
  }

  // Paginate results
  const PaginateResults = (data, pageIndex, pageSize) => {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return data.slice(startIndex, endIndex);
  };  

  // Check if customer data can be fetched from localStorage
  const IsFromLocalStorage = () => {
    return (
      typeof localStorage === 'object' && localStorage[CACHE_KEYS.CUSTOMER_LIST] !== undefined && !MaxQuataReached() && lastSyncBusID() === parseFloat(state.businessId)
    );
  };

  // Check if a sync is needed
  const NeedToSync = () => {
    if (typeof localStorage !== 'object' || !localStorage[CACHE_KEYS.SYNC_INFO]) {
      return true;
    }
    
    try {
      const syncInfo = JSON.parse(localStorage[CACHE_KEYS.SYNC_INFO]);
      
      if (syncInfo.IsMaxQuataReached) {
        return true;
      }
      
      const lastDate = new Date(syncInfo.lstDt);
      const currentDate = new Date();
      
      if (currentDate < lastDate) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      const diffMs = currentDate - lastDate;
      const diffMinutes = Math.floor(diffMs / MS_PER_MINUTE);
      
      return diffMinutes > SYNC_DURATION_MINUTES;
    } catch (error) {
      console.error('Error checking if sync is needed:', error);
      return true;
    }
  };

  // Get the last sync date
  const LastSyncDate = () => {
    if (typeof localStorage !== 'object' || !localStorage[CACHE_KEYS.SYNC_INFO]) {
      return null;
    }
    
    try {
      const syncInfo = JSON.parse(localStorage[CACHE_KEYS.SYNC_INFO]);
      return syncInfo.synDt;
    } catch (error) {
      return null;
    }
  };

  // Check if max quota is reached
  const MaxQuataReached = () => {
    if (state.isDBCallOnly) {
      return state.isDBCallOnly;
    }
    
    if (typeof localStorage !== 'object' || !localStorage[CACHE_KEYS.SYNC_INFO]) {
      return false;
    }
    
    try {
      const syncInfo = JSON.parse(localStorage[CACHE_KEYS.SYNC_INFO]);
      const currentDate = new Date();
      const maxDate = new Date(syncInfo.maxDt);
      
      return (
        currentDate.setHours(0, 0, 0, 0) === maxDate.setHours(0, 0, 0, 0) && syncInfo.IsMaxQuataReached
      );
    } catch (error) {
      return false;
    }
  };

  // Get the last sync business ID
  const lastSyncBusID = () => {
    if (typeof localStorage !== 'object' || !localStorage[CACHE_KEYS.SYNC_INFO]) {
      return 0;
    }
    
    try {
      const syncInfo = JSON.parse(localStorage[CACHE_KEYS.SYNC_INFO]);
      return syncInfo.busID || 0;
    } catch (error) {
      return 0;
    }
  };

  // Get customers from localStorage
  const GetCustomersFromLocalStorage = () => {
    // debugger
    if (typeof localStorage !== 'object' || !localStorage[CACHE_KEYS.CUSTOMER_LIST]) {
      return [];
    }
    
    try {
      return JSON.parse(localStorage[CACHE_KEYS.CUSTOMER_LIST] || '[]');
    } catch (error) {
      console.error('Error getting customers from localStorage:', error);
      return [];
    }
  };

  // Clear localStorage
  const InvalidateLocalStorage = () => {
    if (typeof localStorage === 'object') {
      localStorage.removeItem(CACHE_KEYS.CUSTOMER_LIST);
      localStorage.removeItem(CACHE_KEYS.SYNC_INFO);
    }
  };

  // Store customer data to localStorage
  const StoreLocalStorage = (newList, syncDate, deletedIDs) => {
    let combinedList = newList;
    
    try {
      const syncInfo = {
        busID: state.businessId,
        lstDt: new Date(),
        maxDt: new Date(),
        synDt: syncDate,
        IsMaxQuataReached: false
      };
      
      if (typeof localStorage === 'object') {
        localStorage.removeItem(CACHE_KEYS.SYNC_INFO);
        localStorage[CACHE_KEYS.SYNC_INFO] = JSON.stringify(syncInfo);
        
        if (LastSyncDate() === null) {
          // First sync - just store the new list
          localStorage[CACHE_KEYS.CUSTOMER_LIST] = newList ? JSON.stringify(newList) : '[]';
        } else {
          // Subsequent syncs - merge with existing data
          let oldList = [];
          
          if (localStorage[CACHE_KEYS.CUSTOMER_LIST]) {
            oldList = JSON.parse(localStorage[CACHE_KEYS.CUSTOMER_LIST]);
          }
          
          // Remove deleted IDs from old list
          if (deletedIDs && deletedIDs.length > 0 && oldList && oldList.length > 0) {
            const deletedIDsArray = deletedIDs.split(',');
            oldList = oldList.filter(item => !deletedIDsArray.includes(item.ID.toString()));
          }
          
          // Merge lists, avoiding duplicates
          if (oldList && oldList.length > 0 && newList && newList.length > 0) {
            // Remove items from old list that exist in new list
            const newListIDs = newList.map(item => item.ID.toString());
            oldList = oldList.filter(item => !newListIDs.includes(item.ID.toString()));
            
            // Combine filtered old list with new list
            combinedList = [...oldList, ...newList];
          } else if (oldList && oldList.length > 0) {
            combinedList = oldList;
          } else if (newList && newList.length > 0) {
            combinedList = newList;
          }
          
          localStorage.removeItem(CACHE_KEYS.CUSTOMER_LIST);
          localStorage[CACHE_KEYS.CUSTOMER_LIST] = combinedList ? JSON.stringify(combinedList) : '[]';
        }
      }
      
      return combinedList;
    } catch (error) {
      console.error('Error storing customers to localStorage:', error);
      
      if (typeof localStorage === 'object') {
        InvalidateLocalStorage();
        
        const syncInfo = {
          busID: state.businessId,
          lstDt: new Date(),
          maxDt: new Date(),
          synDt: syncDate,
          IsMaxQuataReached: true
        };
        
        localStorage[CACHE_KEYS.SYNC_INFO] = JSON.stringify(syncInfo);
      }
      
      state.isDBCallOnly = true;
      return newList;
    }
  };

  // Alphabetical sorting of customers
  const Sortingalphabetical = (customers) => {
    if (!customers || !Array.isArray(customers)) return [];
    
    return [...customers].sort((a, b) => {
      const nameA = a.FN.toLowerCase();
      const nameB = b.FN.toLowerCase();
      
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  };

  return {
    GetTodayCustomerList,
    GetAllCustomers,
    GetSaveForLaterList,
    MapCustomerData,
    MapSaveForLaterData,
    SearchCustomer,
    CustomerSmartSearch,
    FormatPhoneByCountry,
    PaginateResults,
    IsFromLocalStorage,
    NeedToSync,
    LastSyncDate,
    MaxQuataReached,
    lastSyncBusID,
    GetCustomersFromLocalStorage,
    InvalidateLocalStorage,
    StoreLocalStorage,
    Sortingalphabetical
  };
}

export default CustomerService;