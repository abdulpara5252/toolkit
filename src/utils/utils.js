import moment from "moment";

export const utils = {
  CallBackGivenToMobileApp: (
    NativeActionVal,
    PageTitle,
    Footer,
    TimerCount,
    IsFullLength
  ) => {
    if (
      navigator != null &&
      navigator.userAgent != null &&
      navigator.userAgent != ""
    ) {
      var jsonData = JSON.stringify({
        NativeAction: NativeActionVal,
        Footer: Footer,
        IsFullLength: IsFullLength,
      })
        .replace(/\\\"/g, '"')
        .replace(/"/g, '\\"');
      var message =
        '{"message": "","messageType": 0,"screenTitle":"' +
        PageTitle +
        '","screenType": 0,"navType": 0,"action": "53|~|' +
        jsonData +
        '" }';
      var objData = "5006||~||" + message;

      if (navigator.userAgent.indexOf("VagaroAndroidPhone") > -1) {
        if (!(window.JSInterface === undefined))
          window.JSInterface.CallWSMethod(objData);
      } else if (
        navigator.userAgent.indexOf("com.vagaro.iospro") > -1 &&
        navigator.userAgent.indexOf("iPhone") > -1
      ) {
        setTimeout(() => {
          window.location = "js-call:myObjectiveCFunction:" + objData;
        }, TimerCount);
      }
    }
  },
  CheckIsFromProAppWithoutState: () => {
    if (
      navigator != null &&
      navigator.userAgent != null &&
      navigator.userAgent != ""
    ) {
      if (
        navigator.userAgent.indexOf("VagaroAndroidPhone") > -1 ||
        (navigator.userAgent.indexOf("com.vagaro.iospro") > -1 &&
          navigator.userAgent.indexOf("iPhone") > -1)
      ) {
        document.body.classList.add("vg_ismobile");
        return true;
      } else {
        document.body.classList.remove("vg_ismobile");
        return false;
      }
    } else {
      return false;
    }
  },
  MobileDatePicker: (message) => {
    if (
      navigator != null &&
      navigator.userAgent != null &&
      navigator.userAgent != ""
    ) {
      var objData = "5006||~||" + message;
      if (
        navigator.userAgent.indexOf("VagaroAndroidPhone") > -1 ||
        navigator.userAgent.toLowerCase().indexOf("android") > -1
      ) {
        if (!(window.JSInterface === undefined))
          window.JSInterface.CallWSMethod(objData);
      } else if (
        (navigator.userAgent.indexOf("com.vagaro.iospro") > -1 &&
          navigator.userAgent.indexOf("iPhone") > -1) ||
        navigator.userAgent.toLowerCase().indexOf("ipad") > -1
      ) {
        window.location = "js-call:myObjectiveCFunction:" + objData;
      }
    }
  },
  CheckIsFromIpadAndroidTabWithoutParm: () => {
    if (
      navigator != null &&
      navigator.userAgent != null &&
      navigator.userAgent != ""
    ) {
      var iPadAndroid =
        navigator.userAgent.match(/ipad/i) ||
        navigator.userAgent.match(/iphone/i) ||
        navigator.userAgent.match(/itouch/i) ||
        navigator.userAgent.match(/android/i) ||
        false;
      if (
        (navigator.userAgent.toLowerCase().indexOf("com.vagaro.iospro") > -1 ||
          navigator.userAgent.toLowerCase().indexOf("com.vagaro.androidpro") >
            -1) &&
        iPadAndroid !== false
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  CheckIsFromIpadAndroidPayproWithoutParm: () => {
    if (
      navigator != null &&
      navigator.userAgent != null &&
      navigator.userAgent != ""
    ) {
      var iPadAndroid =
        navigator.userAgent.match(/ipad/i) ||
        navigator.userAgent.match(/iphone/i) ||
        navigator.userAgent.match(/itouch/i) ||
        navigator.userAgent.match(/android/i) ||
        false;
      if (
        navigator.userAgent
          .toLowerCase()
          .indexOf("com.vagaro.androidpro paypro") > -1 &&
        iPadAndroid !== false
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  CheckIsPayProDevice: () => {
    if (
      navigator !== null &&
      navigator.userAgent !== null &&
      navigator.userAgent !== ""
    ) {
      return (
        navigator.userAgent.match(/D052/i) != null ||
        navigator.userAgent.match(/T2/i) != null
      );
    } else {
      return false;
    }
  },
  CheckIsFromPaydeskWithoutParm: () => {
    if (
      navigator !== null &&
      navigator.userAgent !== null &&
      navigator.userAgent !== ""
    ) {
      if (
        navigator.userAgent.match(/T2s_LITE/i) !== null ||
        navigator.userAgent.match(/T2lite/i) !== null
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  CheckIsIphoneIosproWithoutState: () => {
    if (
      navigator != null &&
      navigator.userAgent != null &&
      navigator.userAgent != ""
    ) {
      if (
        navigator.userAgent.indexOf("com.vagaro.iospro") > -1 &&
        navigator.userAgent.indexOf("iPhone") > -1
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  ToolkitSendCallbacktoMobile: (callBackIndex, data) => {
    if (
      navigator != null &&
      navigator.userAgent != null &&
      navigator.userAgent != ""
    ) {
      var objData = callBackIndex + "||~||" + data;
      if (
        navigator.userAgent.indexOf("VagaroAndroidPhone") > -1 ||
        navigator.userAgent.toLowerCase().indexOf("android") > -1
      ) {
        if (!(window.JSInterface === undefined))
          window.JSInterface.CallWSMethod(objData);
      } else if (
        (navigator.userAgent.indexOf("com.vagaro.iospro") > -1 &&
          navigator.userAgent.indexOf("iPhone") > -1) ||
        navigator.userAgent.toLowerCase().indexOf("ipad") > -1
      ) {
        window.location = "js-call:myObjectiveCFunction:" + objData;
      }
    }
  },
  safeClone: (obj) => {
    const seen = new WeakMap();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return; // Already visited
        seen.set(value, true);
      }
      return value;
    }));
  }
};

export const PortalEnum = {
  action: 1,
  timePickerRight: 2,
  timePickerLeft: 3,
  smileyPicker: 4,
  addressSuggestions: 5,
  dateRangePickerAutoPosition : 6,
  dateRangePickerRight : 7,

};

if (window.ToolkitReceiveCallbackFromMobile === undefined) {
  window.ToolkitReceiveCallbackFromMobile = function (sJSON) {
    var ipjsondata = {};
    ipjsondata = JSON.parse(sJSON);
    var CallBackIndex = ipjsondata.callbackIndex;

    // CallBackIndex based on operation than needs to perform in web end
    if (CallBackIndex === 79) {
      // Get controlId from object "ipjsondata" and perform operation
    }

    if (CallBackIndex === 52) {
      // Get controlId from object "ipjsondata" and perform operation
    }
    if (CallBackIndex === 69) {
      if (document.getElementById("DropDown11") != null) {
        document.getElementById("DropDown11").click();
      }
      if (document.getElementById("phoneControlId") != null) {
        document.getElementById("phoneControlId").click();
      }
      if (document.getElementById("colorPickerId") != null) {
        document.getElementById("colorPickerId").click();
      }
      if (document.getElementById("addressControl") != null) {
        document.getElementById("addressControl").click();
      }
      if (document.getElementById("BottomSheetId") != null) {
        document.getElementById("BottomSheetId").click();
      }
      if (document.getElementById("AiControlId") != null) {
        document.getElementById("AiControlId").click();
      }
    }
    if (CallBackIndex === 78) {
      if (document.getElementById("TimePickerId1") != null) {
        document.getElementById("TimePickerId1").click();
      }
    }
  };
}

// utils.js

export const FormatSelectedDateRange = (
  startDate,
  endDate,
  ActionTagForDate,
  callFromLocationId
) => {
  const formattedStartDate = moment(startDate).format("MMM DD, YYYY");
  const formattedEndDate = moment(endDate).format("MMM DD, YYYY");

  const dateRangeData = {
    formattedStartDate,
    formattedEndDate,
    ActionTagForDate,
  };

  localStorage.setItem("dateRangeData", JSON.stringify(dateRangeData));
  localStorage.setItem("ActionTagForDate", ActionTagForDate);

  if (document.getElementById(callFromLocationId) !== null) {
    document.getElementById(
      callFromLocationId
    ).value = `${formattedStartDate} - ${formattedEndDate}`;
     const event = new CustomEvent("nativeDateRangepickerSelected", {
      detail: { 
        startDate,
        endDate,
        ActionTagForDate,
        formattedStartDate,
        formattedEndDate,
        elementId: callFromLocationId
      },
    });
    window.dispatchEvent(event);
  }
};

if (window.setToolkitMobileData === undefined) {
  window.setToolkitMobileData = function (sJSON) {
    var ipjsondata = {};
    ipjsondata = JSON.parse(sJSON);

    var CallBackIndex = ipjsondata.callbackIndex;
    // var ReportIndex = ipjsondata.ReactReportIndex || ipjsondata.actionResponse.ReactReportIndex;

    // Single Date Picker callback
    if (CallBackIndex === 79) {
      var date = ipjsondata.actionResponse.timeCardDate;
      //const formattedDate = moment(date).format("MMM DD, YYYY");
      const { actionResponse, callFromLocation } = ipjsondata;
      let callFromLocationId;
      if (
        actionResponse !== undefined &&
        actionResponse !== null &&
        actionResponse.callFromLocation !== undefined &&
        actionResponse.callFromLocation != null
      ) {
        callFromLocationId = actionResponse.callFromLocation.split("|#|")[0];
      } else {
        callFromLocationId = callFromLocation.split("|#|")[0];
      }
      const elementId = document.getElementById(callFromLocationId);
      if (elementId != null) {
        const event = new CustomEvent("nativeDateRangeSelected", {
          detail: { date, elementId: elementId.id },
        });
        window.dispatchEvent(event);

        elementId.value = date;
      }
      // if (
      //   document.getElementById(ipjsondata.actionResponse.callFromLocation) !==
      //   null
      // ) {
      //   document.getElementById(
      //     ipjsondata.actionResponse.callFromLocation
      //   ).value = formattedDate;
      // }
    }

    if (CallBackIndex === 52) {
      const { actionResponse, callFromLocation } = ipjsondata;
      var ActionTagForDate =
        ipjsondata?.actionResponse?.actionTag | ipjsondata?.actionTag;
      // var isFromOther =
      //   ipjsondata.actionResponse.isFromOther | ipjsondata.isFromOther;
      let callFromLocationId; 
      if (
        actionResponse !== undefined &&
        actionResponse !== null &&
        actionResponse.callFromLocation !== undefined &&
        actionResponse.callFromLocation != null
      ) {
        callFromLocationId = actionResponse.callFromLocation.split("|#|")[0];
      } else {
        callFromLocationId = callFromLocation.split("|#|")[0];
      }
     
      var startDate;
      var endDate;

      if (ActionTagForDate == "1") {
        startDate = moment().startOf("day");
        endDate = moment().endOf("day");
      } else if (ActionTagForDate == "2") {
        startDate = moment().subtract(1, "days");
        endDate = moment().subtract(1, "days");
      } else if (ActionTagForDate == "3") {
        startDate = moment().subtract(6, "days");
        endDate = moment();
      } else if (ActionTagForDate == "4") {
        startDate = moment().subtract(29, "days");
        endDate = moment();
      } else if (ActionTagForDate == "5") {
        startDate = moment().startOf("month");
        endDate = moment().endOf("month");
      } else if (ActionTagForDate == "6") {
        startDate = moment().subtract(1, "month").startOf("month");
        endDate = moment().subtract(1, "month").endOf("month");
      } else if (ActionTagForDate == "7") {
        startDate = moment().startOf("year");
        endDate = moment();
      } else if (ActionTagForDate == "8") {
        startDate = moment().subtract(1, "year").startOf("year");
        endDate = moment().subtract(1, "year").endOf("year");
      } else if (ActionTagForDate == "9") {
        startDate = ipjsondata.actionResponse.startDate;
        endDate = ipjsondata.actionResponse.endDate;
      }

      FormatSelectedDateRange(
        startDate,
        endDate,
        ActionTagForDate,
        callFromLocationId
      );
    }

    if (CallBackIndex === 69) {
      const { actionResponse, callFromLocation } = ipjsondata;
      const elementId =
        document.getElementById(callFromLocation) ||
        document.getElementById(actionResponse.callFromLocation);
      // if (document.getElementById(ipjsondata.callFromLocation) != null) {
      //   document.getElementById(ipjsondata.callFromLocation).click();
      // }
      if (elementId != null) {
        elementId.click();
      }
    }

    if (CallBackIndex === 78) {
      const { actionResponse, callFromLocation } = ipjsondata;
      const time = actionResponse.time;
      const elementId =
        document.getElementById(callFromLocation) ||
        document.getElementById(actionResponse.callFromLocation);

      if (elementId != null) {
        const event = new CustomEvent("nativeTimeSelected", {
          detail: { time, elementId: elementId.id },
        });
        window.dispatchEvent(event);

        elementId.value = time;
      }
    }
  };
}

export function initializeSetMobileDataVagaroAI(callback) {
  if (window.setMobileDataVagaroAI === undefined) {
    window.setMobileDataVagaroAI = function (sJSON) {
      const ipjsondata = JSON.parse(sJSON);
      const CallBackIndex = ipjsondata.callbackIndex;
      if (CallBackIndex === 108) {
        const vagaroAIData = JSON.parse(ipjsondata.actionVagaroAIDesc);
        const message = vagaroAIData?.message?.message;

        // Call the callback to handle React state updates
        callback(ipjsondata.callFromLocation, message);
      }
    };
  }
}

if (window != undefined && !window.LoadMobileData) {
  window.LoadMobileData = function (sDate, eDate, callFromLocationId) {
    FormatSelectedDateRange(sDate, eDate, "9", callFromLocationId);
  };
}

export const handleAutoFocus = (focus, ref, delay) => {
  if (focus && ref?.current) {
    const focusWithDelay = () => {
      ref.current?.focus();
      
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 100, 
          behavior: "smooth",
        });
      }
    };
    setTimeout(focusWithDelay, delay);
  }
};
