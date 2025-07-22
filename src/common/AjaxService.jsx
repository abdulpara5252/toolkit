import axios from "axios";
 
var merchantId = (typeof (window) != "undefined" && typeof (window.StaticReactV2BId) != "undefined") ? window.StaticReactV2BId : 'IwY1~qWWwbNaxnBeKVPrNw==';
var loginUserId = (typeof (window) != "undefined" && typeof (window.StaticReactV2UId) != "undefined") ? window.StaticReactV2UId : 'er1vaA6-85U9jkS34hxL8A==';
 
 
window.groupID = (typeof (window) != "undefined" && typeof (window.groupID) != "undefined") ?
  window.groupID : "us02";
window.VagaroCoreAPIURLV2 = (typeof (window) != "undefined" && typeof (window.VagaroCoreAPIURLV2) != "undefined") ?
  window.VagaroCoreAPIURLV2 :
 
  "https://api.vagaro.com" + "/us02/api/v2/";
 
  const headerData ={
    "Content-Type": "application/json",
    "merchantId": merchantId,
    "userId": loginUserId,
    "employeeid": loginUserId
  }
  const headers = {
    "Content-Type": "application/json",
 
  };
 
window.groupID =
  typeof window != "undefined" && typeof window.groupID != "undefined"
    ? window.groupID
    : "us02";
window.VagaroCoreAPIURLV2 =
  typeof window != "undefined" &&
  typeof window.VagaroCoreAPIURLV2 != "undefined"
    ? window.VagaroCoreAPIURLV2
    : "https://api.vagaro.com" + "/us02/api/v2/";
 
const AjaxService = {
  Get: (token, data, callback, onFailure) => {
    const APIURL = window.VagaroCoreAPIURLV2 + token;
 
    if (data != "") {
      axios
        .get(APIURL, data, { headers: headerData })
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          onFailure(error);
        });
    } else {
      axios
        .get(APIURL, { headers: headerData })
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          onFailure(error);
        });
    }
  },
  Post: (token, data, callback, onFailure) => {
    const APIURL = window.VagaroCoreAPIURLV2 + token;
 
    axios
      .post(APIURL, data, { headers: headerData })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        onFailure(error);
      });
  },
  Put: (token, data, callback, onFailure) => {
    const APIURL = window.VagaroCoreAPIURLV2 + token;
    // const headers = {
    //   "Content-Type": "application/json",
    // };
 
    axios
      .put(APIURL, data, { headers: headerData})
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        onFailure(error);
      });
  },
  Patch: (token, data, callback, onFailure) => {
    const APIURL = window.VagaroCoreAPIURLV2 + token;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .patch(APIURL, data, { headers: headers })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        onFailure(error);
      });
  },
  Delete: (token, data, callback, onFailure) => {
    const APIURL = window.VagaroCoreAPIURLV2 + token;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .delete(APIURL, { headers: headerData, data: data })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        onFailure(error);
      });
  },
  GetV2: (apiUrl, data, callback, onFailure, headers) => {
    if (data && data.params) {
      axios
        .get(apiUrl, { headers: headers, params: data.params })
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          onFailure(error);
        });
    } else {
      axios
        .get(apiUrl, { headers: headers })
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          onFailure(error);
        });
    }
  },
  PostV2: (apiUrl, data, callback, onFailure, headers) => {
    axios
      .post(apiUrl, data, { headers: headers })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        onFailure(error);
      });
  },
};
export default AjaxService;