import axios from "axios";

function AjaxServiceV1(EnvironmentUrl, token, data, callback, onFailure, apiType) {
  window.groupID =
    typeof window != "undefined" && typeof window.groupID != "undefined"
      ? window.groupID
      : "us02";

  window.VagaroCoreApiUrl =
    typeof window != "undefined" &&
    typeof window.VagaroCoreApiUrl != "undefined"
      ? window.VagaroCoreApiUrl
      : "https://api.vagaro.com/" + window.groupID + "/api/v1/";

  window.VagaroCoreAPIURLV2 =
    typeof window != "undefined" &&
    typeof window.VagaroCoreAPIURLV2 != "undefined"
      ? window.VagaroCoreAPIURLV2
      : "https://apiv2.localdev.com" + "/us02/api/v2/";
    
  const AddressApiURL = EnvironmentUrl + (window.groupID ? window.groupID : "us02") + "/api/v1/";

  let APIURL;
  switch (apiType) {
    case 2:
      APIURL = window.VagaroCoreAPIURLV2 + token;
      break;
    case 3:
      APIURL = AddressApiURL + token;
      break;
    default:
      APIURL = window.VagaroCoreApiUrl + token;
      break;
  }

  const headers = {
    "Content-Type": "application/json",
  };

  apiType === 2 || apiType === 3
    ? axios
        .get(APIURL, data, { headers: headers })
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          onFailure(error);
        })
    : axios
        .post(APIURL, data, { headers: headers })
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          onFailure(error);
        });
}

export default AjaxServiceV1;
