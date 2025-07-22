import $, { css } from "jquery";
// import "./select2_4.0.js";
import AjaxService from "../common/AjaxService.jsx";
import AjaxServiceV1 from "../common/AjaxServiceV1.jsx";

// Conditional dynamic import for select2 based on environment
if (process.env.NODE_ENV === "development") {
  import("./select2_4.0.js").then((module) => {
    // Optionally use the module if it exports something
    console.log("select2 loaded in development");
  }).catch((err) => {
    console.error("Failed to load select2:", err);
  });
}

const GoogleAddressPlugin = function (element, prop) {
  let searchTextBox;
  let addressData;
  let lblRow;
  let ipLocation;
  let isiPhone;
  let isWindowsPhone;
  let AndroidMobile;
  let IsMobileDevice;
  let isFromVagaroProduct;
  let res;
  let selectedAddress;
  let addressFormatMess = /[!@$%*^#<>]/;
  let currentSelectedCountry;
  let selectedAddressValue
  let globalRepo;
  
  let hasShownError = false;

  // Use the global $ provided by the consuming app
  const $ = window.$ || window.jQuery;

  if (!$) {
    throw new Error("jQuery is required for GoogleAddressPlugin but was not found on window.");
  }

  if (!$.fn.select2) {
    throw new Error("Select2 is required for GoogleAddressPlugin but was not found on jQuery.");
  }

  const countriesData = [
    {
      countryCode: "US",
      countryID: 1,
      countryName: "United States of America",
      cssClass: "us-f",
      dialingCode: "1",
      isBusinessUseOnly: true,
    },
    {
      countryCode: "GB",
      countryID: 2,
      countryName: "United Kingdom",
      cssClass: "uk-f",
      dialingCode: "44",
      isBusinessUseOnly: true,
    },
    {
      countryCode: "CA",
      countryID: 3,
      countryName: "Canada",
      cssClass: "canada-f",
      dialingCode: "1",
      isBusinessUseOnly: true,
    },
    {
      countryCode: "AU",
      countryID: 4,
      countryName: "Australia",
      cssClass: "aus-f",
      dialingCode: "61",
      isBusinessUseOnly: true,
    },
  ];
  
  var settings = $.extend(
    {
      Control: element,
      ControlId: element.attr("id"),
      Address2Control: "",
      CurrentLocationCountryID: currentSelectedCountry,
      AddressData: {},
      CountryDropDownRole: 2, //0: Hide, 1: Disable, 2: Visible and Editable for Country dropdown
      AddressFor: 1, //1 : Business, 2 : Public
      IsLiveStreamAddress: false,
      IsDisabled: false,
      IsDisabledAddress: false,
      ScrollType: 2, //This property is use to scroll top for selected country when user re-open country dropdown
      IsAddManualAddress: false,
      IsSaveManualAddress: false,
      IsAddressRequired: false,
      DisabledCountry: false,
      IsReturnCountryID: false,
      onAddressChange: null,
      onBlur: null,
      parentContainer: "body",
      placeHolder_1: "",
      addressFormat: addressFormatMess,
      environment_url: {},
      required: false,
      DefaultValue: "",
      AutoFocus: false,
      setTouched: (val) => {},
      AllCountry:  false,
      // uniqueId: uniqueId,
      IsManualAddress: false
    },
    prop
  );

  var common = {
    model: {
      countryFlag: {
        1: "us-f",
        2: "uk-f", 
        3: "canada-f",
        4: "aus-f",
        6: "in-f",
        7: "ax-f",
        8: "al-f",
        9: "dz-f",
        10: "as-f",
        11: "ad-f",
        12: "ao-f",
        13: "ai-f",
        15: "ag-f",
        16: "ar-f",
        17: "am-f",
        18: "aw-f",
        19: "ac-f",
        20: "at-f",
        21: "az-f",
        22: "bs-f",
        23: "bh-f",
        24: "bd-f",
        25: "bb-f",
        26: "by-f",
        27: "be-f",
        28: "bz-f",
        29: "bj-f",
        30: "bm-f",
        31: "bt-f",
        32: "bo-f",
        33: "ba-f",
        34: "bw-f",
        36: "br-f",
        38: "vg-f",
        39: "bn-f",
        40: "bg-f",
        41: "bf-f",
        42: "bi-f",
        43: "kh-f",
        44: "cm-f",
        45: "cv-f",
        46: "nl-f",
        47: "ky-f",
        48: "cf-f",
        49: "td-f",
        50: "cl-f",
        51: "cx-f",
        52: "cc-f",
        53: "co-f",
        54: "km-f",
        55: "cd-f",
        56: "cg-f",
        57: "ck-f",
        58: "cr-f",
        60: "hr-f",
        61: "cw-f",
        62: "cy-f",
        63: "cz-f",
        64: "dk-f",
        65: "dj-f",
        66: "dm-f",
        67: "do-f",
        68: "ec-f",
        69: "eg-f",
        70: "sv-f",
        71: "gq-f",
        72: "er-f",
        73: "ee-f",
        74: "et-f",
        75: "fk-f",
        76: "fo-f",
        77: "fj-f",
        78: "fi-f",
        79: "fr-f",
        80: "gf-f",
        81: "pf-f",
        83: "ga-f",
        84: "gm-f",
        85: "ge-f",
        86: "de-f",
        87: "gh-f",
        88: "gr-f",
        89: "gd-f",
        91: "gi-f",
        92: "gl-f",
        93: "gn-f",
        94: "gp-f",
        95: "gt-f",
        96: "gu-f",
        97: "gw-f",
        98: "gy-f",
        99: "hk-f",
        101: "hn-f",
        102: "ht-f",
        103: "hu-f",
        104: "id-f",
        105: "ie-f",
        106: "il-f",
        109: "iq-f",
        110: "is-f",
        111: "it-f",
        113: "jm-f",
        114: "jo-f",
        115: "jp-f",
        116: "ke-f",
        117: "kg-f",
        118: "ki-f",
        119: "kw-f",
        120: "kz-f",
        121: "xk-f",
        122: "la-f",
        123: "lb-f",
        124: "li-f",
        125: "lr-f",
        126: "ls-f",
        127: "lt-f",
        128: "lu-f",
        129: "lv-f",
        130: "ly-f",
        131: "ma-f",
        132: "mc-f",
        133: "md-f",
        134: "me-f",
        135: "mg-f",
        136: "mh-f",
        137: "mk-f",
        138: "ml-f",
        139: "yt-f",
        140: "mm-f",
        141: "mn-f",
        142: "mo-f",
        143: "my-f",
        144: "mq-f",
        145: "mr-f",
        146: "ms-f",
        147: "mt-f",
        148: "mu-f",
        149: "mv-f",
        150: "mw-f",
        151: "mx-f",
        152: "fm-f",
        153: "mz-f",
        154: "na-f",
        155: "nc-f",
        156: "ne-f",
        157: "nf-f",
        158: "mp-f",
        159: "ng-f",
        160: "ni-f",
        161: "nl-f",
        162: "no-f",
        163: "np-f",
        165: "nu-f",
        166: "nz-f",
        167: "om-f",
        168: "pa-f",
        169: "pe-f",
        170: "pg-f",
        171: "ph-f",
        172: "pk-f",
        173: "pl-f",
        175: "pr-f",
        176: "ps-f",
        177: "pt-f",
        178: "pw-f",
        179: "py-f",
        180: "qa-f",
        181: "re-f",
        182: "ro-f",
        183: "ru-f",
        184: "rw-f",
        185: "sm-f",
        186: "ws-f",
        187: "sa-f",
        189: "sb-f",
        190: "sn-f",
        191: "rs-f",
        192: "sc-f",
        193: "se-f",
        194: "sg-f",
        195: "lk-f",
        196: "si-f",
        198: "sk-f",
        199: "sl-f",
        200: "es-f",
        201: "kn-f",
        202: "lc-f",
        206: "pm-f",
        207: "vc-f",
        208: "za-f",
        209: "kr-f",
        210: "so-f",
        211: "sr-f",
        212: "ss-f",
        213: "st-f",
        214: "sx-f",
        215: "ch-f",
        216: "sz-f",
        218: "tc-f",
        219: "tg-f",
        220: "th-f",
        221: "tj-f",
        224: "tm-f",
        225: "tn-f",
        226: "to-f",
        227: "tr-f",
        228: "tt-f",
        229: "tv-f",
        230: "tw-f",
        231: "tz-f",
        232: "ua-f",
        233: "ug-f",
        235: "vi-f",
        236: "ae-f",
        237: "uy-f",
        238: "uz-f",
        239: "va-f",
        240: "ve-f",
        241: "vn-f",
        242: "vu-f",
        243: "wf-f",
        244: "eh-f",
        245: "ye-f",
        246: "zm-f",
        247: "zw-f",
        248: "af-f",
        249: "bqb-f",
        250: "bqsa-f",
        251: "bqse-f",
        252: "cn-f",
        253: "cuc-f",
        254: "gbn-f",
        255: "gbsct-f",
        256: "gbwls-f",
        257: "iri-f",
        258: "kpk-f",
        259: "sds-f",
        260: "sys-f"
      },
      countryMapForAPI: {
        1: "US",
        2: "GB",
        3: "CA",
        4: "AU",
        6: "IN",
        7: "AX",
        8: "AL",
        9: "DZ",
        10: "AS",
        11: "AD",
        12: "AO",
        13: "AI",
        15: "AG",
        16: "AR",
        17: "AM",
        18: "AW",
        19: "AC",
        20: "AT",
        21: "AZ",
        22: "BS",
        23: "BH",
        24: "BD",
        25: "BB",
        26: "BY",
        27: "BE",
        28: "BZ",
        29: "BJ",
        30: "BM",
        31: "BT",
        32: "BO",
        33: "BA",
        34: "BW",
        36: "BR",
        38: "VG",
        39: "BN",
        40: "BG",
        41: "BF",
        42: "BI",
        43: "KH",
        44: "CM",
        45: "CV",
        46: "BQ",
        47: "KY",
        48: "CF",
        49: "TD",
        50: "CL",
        51: "CX",
        52: "CC",
        53: "CO",
        54: "KM",
        55: "CD",
        56: "CG",
        57: "CK",
        58: "CR",
        60: "HR",
        61: "CW",
        62: "CY",
        63: "CZ",
        64: "DK",
        65: "DJ",
        66: "DM",
        67: "DO",
        68: "EC",
        69: "EG",
        70: "SV",
        71: "GQ",
        72: "ER",
        73: "EE",
        74: "ET",
        75: "FK",
        76: "FO",
        77: "FJ",
        78: "FI",
        79: "FR",
        80: "GF",
        81: "PF",
        83: "GA",
        84: "GM",
        85: "GE",
        86: "DE",
        87: "GH",
        88: "GR",
        89: "GD",
        91: "GI",
        92: "GL",
        93: "GN",
        94: "GP",
        95: "GT",
        96: "GU",
        97: "GW",
        98: "GY",
        99: "HK",
        101: "HN",
        102: "HT",
        103: "HU",
        104: "ID",
        105: "IE",
        106: "IL",
        109: "IQ",
        110: "IS",
        111: "IT",
        113: "JM",
        114: "JO",
        115: "JP",
        116: "KE",
        117: "KG",
        118: "KI",
        119: "KW",
        120: "KZ",
        121: "XK",
        122: "LA",
        123: "LB",
        124: "LI",
        125: "LR",
        126: "LS",
        127: "LT",
        128: "LU",
        129: "LV",
        130: "LY",
        131: "MA",
        132: "MC",
        133: "MD",
        134: "ME",
        135: "MG",
        136: "MH",
        137: "MK",
        138: "ML",
        139: "YT",
        140: "MM",
        141: "MN",
        142: "MO",
        143: "MY",
        144: "MQ",
        145: "MR",
        146: "MS",
        147: "MT",
        148: "MU",
        149: "MV",
        150: "MW",
        151: "MX",
        152: "FM",
        153: "MZ",
        154: "NA",
        155: "NC",
        156: "NE",
        157: "NF",
        158: "MP",
        159: "NG",
        160: "NI",
        161: "NL",
        162: "NO",
        163: "NP",
        165: "NU",
        166: "NZ",
        167: "OM",
        168: "PA",
        169: "PE",
        170: "PG",
        171: "PH",
        172: "PK",
        173: "PL",
        175: "PR",
        176: "PS",
        177: "PT",
        178: "PW",
        179: "PY",
        180: "QA",
        181: "RE",
        182: "RO",
        183: "RU",
        184: "RW",
        185: "SM",
        186: "WS",
        187: "SA",
        189: "SB",
        190: "SN",
        191: "RS",
        192: "SC",
        193: "SE",
        194: "SG",
        195: "LK",
        196: "SI",
        198: "SK",
        199: "SL",
        200: "ES",
        201: "KN",
        202: "LC",
        206: "PM",
        207: "VC",
        208: "ZA",
        209: "KR",
        210: "SO",
        211: "SR",
        212: "SS",
        213: "ST",
        214: "SX",
        215: "CH",
        216: "SZ",
        218: "TC",
        219: "TG",
        220: "TH",
        221: "TJ",
        224: "TM",
        225: "TN",
        226: "TO",
        227: "TR",
        228: "TT",
        229: "TV",
        230: "TW",
        231: "TZ",
        232: "UA",
        233: "UG",
        235: "VI",
        236: "AE",
        237: "UY",
        238: "UZ",
        239: "VA",
        240: "VE",
        241: "VN",
        242: "VU",
        243: "WF",
        244: "EH",
        245: "YE",
        246: "ZM",
        247: "ZW",
        248: "AF",
        249: "BO",
        250: "SA",
        251: "SE",
        252: "CN",
        253: "CU",
        254: "GB",
        255: "GB",
        256: "GB",
        257: "IR",
        258: "KP",
        259: "SD",
        260: "SY"
      },
      countryName: {
        1: "United States of America",
        2: "United Kingdom",
        3: "Canada",
        4: "Australia",
        6: "India"
      },
      stateList: {},
      CountryId:
        typeof settings.AddressData.country != "undefined"
          ? settings.AddressData.country
          : settings.CurrentLocationCountryID,
      errorMessage: "Something went wrong, Try Again.",

      addressPlaceHolder: settings.placeHolder_1 ,
      addressPlaceHolderUKOnly:
        "E.g. Post Code 'CR0 3RL' or 1st line '36 Factory Lane'",
      lableLanguage: [
        {
          CountryId: 0,
          Zip: "Postal Code",
          City: "City",
          State: "State",
          IsStateDropDown: 0,
          IsStateless: 0,
          IsZipless: 0,
        },
        {
          CountryId: 1,
          Zip: "ZIP Code",
          City: "City",
          State: "State",
          IsStateDropDown: 1,
          IsStateless: 0,
          IsZipless: 0,
        },
        {
          CountryId: 2,
          Zip: "Postcode",
          City: "City",
          State: "County",
          IsStateDropDown: 1,
          IsStateless: 0,
          IsZipless: 0,
        },
        {
          CountryId: 3,
          Zip: "Postal Code",
          City: "City",
          State: "Province",
          IsStateDropDown: 1,
          IsStateless: 0,
          IsZipless: 0,
        },
        {
          CountryId: 4,
          Zip: "Postcode",
          City: "Suburb",
          State: "State/Territory",
          IsStateDropDown: 1,
          IsStateless: 0,
          IsZipless: 0,
        },
        {
          CountryId: 194,
          Zip: "Postal Code",
          City: "City",
          State: "State",
          IsStateDropDown: 0,
          IsStateless: 1,
          IsZipless: 0,
        },
        {
          CountryId: 236,
          Zip: "Postal Code",
          City: "City",
          State: "State",
          IsStateDropDown: 0,
          IsStateless: 0,
          IsZipless: 1,
        },
        {
          CountryId: 12,
          Zip: "Postal Code",
          City: "City",
          State: "State",
          IsStateDropDown: 0,
          IsStateless: 0,
          IsZipless: 1,
        },
      ],
      lblRow: {},
      IsStateless: 0,
      IsZipless: 0,
    },

    ControlsPrefix: {
      addressControl: "#" + settings.ControlId,
      countrySelectOption: "#countryselectoption" + settings.ControlId,
      addressPopup: "#addressPopup" + settings.ControlId,
      AddressControllerCountry:
        "#AddressControllerCountry" + settings.ControlId,
      myCountryPopup: "#mycountryPopup" + settings.ControlId,
      countrySelectoptionPopup:
        "#countryselectoptionpopup" + settings.ControlId,
      btnPopupClose: "#btnPopupClose" + settings.ControlId,
      popUpCntryDropDownID: "#popUpCntryDropDownID" + settings.ControlId,
      ddlState: "#ddlState" + settings.ControlId,
      lblZipCodePopup: "#lblZipCodePopup" + settings.ControlId,
      txtZip: "#txtZip" + settings.ControlId,
      lblStatePopup: "#lblStatePopup" + settings.ControlId,
      lblCityPopup: "#lblCityPopup" + settings.ControlId,
      txtCity: "#txtCity" + settings.ControlId,
      txtStreet: "#txtStreet" + settings.ControlId,
      txtStreet1: "#txtStreet1" + settings.ControlId,
      txtState: "#txtState" + settings.ControlId,
      btnCancelGetAddress: "#btnCancelGetAddress" + settings.ControlId,
      btnGetAddress: "#btnGetAddress" + settings.ControlId,
      dvDdlState: "#dvDdlState" + settings.ControlId,
      ddlMainCountry: "#ddlMainCountry" + settings.ControlId,
      ddlPopupCountry: "#ddlPopupCountry" + settings.ControlId,
      dvWrap: "#dvWrap" + settings.ControlId,
      AddressControllerCountryCheck:
        "AddressControllerCountry" + settings.ControlId,
      
    },
  };
  var Init = () => {
    GenerateHtmlAddressPopup();
    setAddressControl();
    
  };
  
  if (settings.IsDisabled === true) {
    $(".select2-selection__arrow").hide();
  } else {
    $(".select2-selection__arrow").show();
  }
    
  const ApiURLEnum = {
    getCountryList: "countrylist/countrylistdetails",
    getState: "address/getstatesbymultiplecountryid",
    getStateCode: "address/GetCityByZipCodeWithStatecode",
    getPlaceDetailByPlaceId: "address/GetPlaceDetailByPlaceId",
    getLocationOrPlaceDetail: "address/GetLocationOrPlaceDetail",
  };
  var GenerateHtmlAddressPopup = () => {
    searchTextBox = settings.ControlId;
    var htmlCountry = "";
    var tabIndex = 0; // document.getElementById(searchTextBox).tabIndex;
    htmlCountry +=
    ' <div class="w-custom-dropdown countrydropdown allflag-show id=" ' + searchTextBox + 
    (settings.IsDisabled || settings.IsDisabledAddress ? 'data-isdisabled="true"' : '') + '>';
    var cntryDropDownID = "'" + common.ControlsPrefix.countrySelectOption + "'";
    htmlCountry +=
      '<div id="AddressControllerCountry' +
      searchTextBox +
      '" ' +
      "data-isDisabled=" +
      (settings.IsDisabled || settings.IsDisabledAddress) + 
      ' class="selectedcountry" tabindex="-1"></div > ';
    htmlCountry +=
      '<select id="ddlMainCountry' +
      searchTextBox +
      '" class="form-control" tabindex="' +
      tabIndex +
      (settings.IsDisabled || settings.IsDisabledAddress ? ' disabled="disabled"' : '') +
      '">  </select>';
    htmlCountry += "</div>";
    htmlCountry +=
      '<ul id="countryselectoption' +
      searchTextBox +
      '" class="countryselectoption" style="display: none">';
    htmlCountry += " </ul>";

    if (
      document.getElementById(
        common.ControlsPrefix.AddressControllerCountryCheck
      ) !== null
    ) {
      return;
    }

    

    if (
      settings.CountryDropDownRole != 0 &&
      $(common.ControlsPrefix.countrySelectOption).length <= 0
    ) {
      $("#" + searchTextBox)
        .wrap(
          '<div id="dvWrap' +
            searchTextBox +
            '" class="select-country-mar address-phone-plugin">'
        )
        .parent()
        .wrap(
          '<div class="vg-addresswithcountry address-plugin clearfix  m-0" id="demo" >'
        );

      if ($("#" + searchTextBox).parent() != undefined) {
        $("#" + searchTextBox)
          .parent()
          .before(htmlCountry);
      } else {
        $("#" + searchTextBox).before(htmlCountry);
      }
      $(settings?.parentContainer + " " + common.ControlsPrefix.AddressControllerCountry).bind(
        "click",
        function () {
          if (
            !settings.IsDisabled &&
            !$(common.ControlsPrefix.countrySelectOption).is(":visible")
          ) {
            $(".countryselectoption").hide();
          }
        }
      );
    }
    var htmlAddressPopup =
      '<div id="addressPopup' +
      searchTextBox +
      '" class="general-addresspopup verifyAddressPopup address-phone-plugin  emp-country-flag" style="display:none">';
    htmlAddressPopup += '<div class="general-addresspopup-container ">';
    htmlAddressPopup += '<div class="general-addresspopup-body">';
    htmlAddressPopup +=
      '<div class="pop-model-body settingnew-design addresspopup-billing">';
    htmlAddressPopup += '<div class="loginWrap loginContentwrap-addbus">';
    htmlAddressPopup += "<header>";
    var closeBtnID = common.ControlsPrefix.btnPopupClose.replace("#", "");
    htmlAddressPopup +=
      "<a id=" +
      closeBtnID +
      ' class="popupCloseImg" href="javascript:void(0)" >';
    htmlAddressPopup += "&#xf00d;";
    htmlAddressPopup += "</a>";
    htmlAddressPopup +=
      '<h4 id="mycountryPopupTitle' + searchTextBox + '">Verify Address</h4>';
    htmlAddressPopup += "</header>";
    htmlAddressPopup += '<div class="modal-body">';
    htmlAddressPopup += '<div class="popContainWrapper clearfix">';
    htmlAddressPopup += '<div class="loginContainer clearfix">';
    htmlAddressPopup += '<div class="loginContentwrap">';
    htmlAddressPopup +=
      '<div class="formlayout1" id="divMain' + searchTextBox + '">';
    htmlAddressPopup +=
      '<p class="discription-location" id="mycountryPopupsubTitle' +
      searchTextBox +
      '">';
    htmlAddressPopup +=
      "Our system doesn’t recognize your address. Please provide the following information.";
    htmlAddressPopup += "</p>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "<ul>";
    htmlAddressPopup += '<li class="addressDropdownBox">';
    htmlAddressPopup += "<label>Address Line 1</label>";
    var PopupCntryDropDownID =
      "'" + settings?.parentContainer+ ' ' + common.ControlsPrefix.countrySelectoptionPopup + "'";
    htmlAddressPopup +=
      '<div class="vg-addresswithcountry react-addresscontrol clearfix" >';
    htmlAddressPopup +=
      ' <div class="w-custom-dropdown countrydropdown allflag-show">';
    htmlAddressPopup +=
      '<div id="mycountryPopup' +
      searchTextBox +
      '" class="selectedcountry us-f" ' +
      (settings.CountryDropDownRole == 0 ? " disabled=true " : "") +
      ' onclick="$(' +
      PopupCntryDropDownID +
      ').toggle()"></div>';
    htmlAddressPopup +=
      '<select id="ddlPopupCountry' +
      searchTextBox +
      '" class="form-control" ' +
      (settings.CountryDropDownRole == 0 || settings.IsDisabledAddress ? "disabled" : "") +
      ">  </select>";
    htmlAddressPopup += "</div>";

    htmlAddressPopup +=
      '<ul id="countryselectoptionpopup' +
      searchTextBox +
      '" class="countryselectoption selectoptionpopup" style="display: none">';
    htmlAddressPopup += " </ul>";
    htmlAddressPopup += ' <div class="select-country-mar">';
    htmlAddressPopup +=
      '<input name="txtStreet" type="text" maxlength="500" id="txtStreet' +
      searchTextBox +
      '" class="inputbox-type1 validAddress' +
      searchTextBox +
      '" autocomplete="off" placeholder="Address Line 1">';

    htmlAddressPopup += " </div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</li>";
    htmlAddressPopup += "<li>";
    htmlAddressPopup += "<label>Address Line 2</label>";
    htmlAddressPopup +=
      '<input name="txtStreet1" type="text" maxlength="100" id="txtStreet1' +
      searchTextBox +
      '" class="inputbox-type1" autocomplete="off" placeholder="Address Line 2 (Optional)">';
    htmlAddressPopup += "</li>";
    htmlAddressPopup += "</ul>";

    htmlAddressPopup += '<ul class="location-city-row">';
    htmlAddressPopup += "<li>";
    htmlAddressPopup +=
      '<label id="lblCityPopup' + searchTextBox + '">City:</label>';
    htmlAddressPopup +=
      '<input name="txtCity" type="text" maxlength="48" id="txtCity' +
      searchTextBox +
      '" class="inputbox-type1 validAddress' +
      searchTextBox +
      '" autocomplete="off" placeholder="City">';
    htmlAddressPopup += "</li>";
    htmlAddressPopup += "<li>";
    htmlAddressPopup +=
      '<label id="lblStatePopup' + searchTextBox + '">State/Province:</label>';
    htmlAddressPopup +=
      '<input name="txtState" type="text" maxlength="50" id="txtState' +
      searchTextBox +
      '" class="inputbox-type1" autocomplete="off" style="display:none" placeholder="State" />';
    htmlAddressPopup +=
      '<div class="dropdowndiv" id="dvDdlState' + searchTextBox + '">';
    htmlAddressPopup +=
      '<select id="ddlState' +
      searchTextBox +
      '" class="" style="width: 100%;"></select>';
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</li>";
    htmlAddressPopup += "<li>";
    htmlAddressPopup +=
      '<label id="lblZipCodePopup' +
      searchTextBox +
      '">Zip/Postal Code:</label>';
    htmlAddressPopup +=
      '<input name="txtZip" type="text" maxlength="10" placeholder="Zip" id="txtZip' +
      searchTextBox +
      '" title="Zipcode is mandatory because it will help your customer to find shop using google map." class="inputbox-type1 validAddress' +
      searchTextBox +
      '" autocomplete="off" />';
    htmlAddressPopup +=
      '<div class="smallloading" id="divsmallloading' +
      searchTextBox +
      '" style="display:none;"></div>';
    htmlAddressPopup += "</li>";
    htmlAddressPopup += "</ul>";

    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += '<div class="popupBtnContainer clearfix modal-footer">';
    htmlAddressPopup +=
      '<input type="button" name="btnCancelGetAddress" value="Cancel" id="btnCancelGetAddress' +
      searchTextBox +
      '" class="btn btn-default" tabindex="-1" />';
    htmlAddressPopup +=
      '<input type="button" name="btnGetAddress" value="Save" id="btnGetAddress' +
      searchTextBox +
      '" class=" btn btn-primary" tabindex="-1" />';
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
    htmlAddressPopup += "</div>";
   
    if ($(settings?.parentContainer + " " + settings?.parentContainer + " " + common.ControlsPrefix.addressPopup).length > 0) {
      $(settings?.parentContainer + " " + common.ControlsPrefix.addressPopup).remove();
    }
    if ($(settings?.parentContainer + " " + common.ControlsPrefix.addressPopup).length <= 0) {
      $("body").prepend(htmlAddressPopup);
      GetCountryList();

      $(settings?.parentContainer + " " + common.ControlsPrefix.btnPopupClose).bind("click", function () {
        openCloseAddresspopup();
      });
      $(settings?.parentContainer + " " + common.ControlsPrefix.btnCancelGetAddress).bind("click", function () {
        openCloseAddresspopup();
      });
      $(settings?.parentContainer + " " + common.ControlsPrefix.btnGetAddress).bind("click", function () {
        settings.IsSaveManualAddress = true;
        return setAddressFromPopup(true);
      });
      $(settings?.parentContainer + " " + common.ControlsPrefix.addressControl).bind("change", function () {
        //clearAddressValue();
      });
    }

    $(settings?.parentContainer + " .validAddress " + settings.ControlId).on("blur", function () {
      if (
        $(this).val().trim() == "" &&
        (!this.id.includes("txtZip") ||
          (this.id.includes("txtZip") && common.model.IsZipless == 0))
      ) {
        if ($(this).siblings("span").length == 0) {
          $(this).addClass("errorInput");
          $(this).after(
            '<span id="rfv' +
              $(this).attr("id") +
              '" class="requiredErrorText" style="color:Red;">required</span>'
          );
        }
      } else {
        $(this).removeClass("errorInput");
        $(this).next("span").remove();
      }
    });
    $(settings?.parentContainer + " " + common.ControlsPrefix.txtState).on("blur", function () {
     
      if ($(this).val().trim() != "") {
        $(this).removeClass("errorInput");
        $(this).next("span").remove();
      }
    });
    
  };
 
  var setAddressControl = () => {

    //Set IP Location
    var baseURl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port && ":" + window.location.port) +
      "/";
    // $.ajax({ url: baseURl + "WebServices/MySampleService.asmx/GetLocation", type: "POST", contentType: "application/json; charset=utf-8" }).success(
    //     function (res) {
    //         ipLocation = res.lat + "," + res.lon;
    //     });

    if (
      typeof keepAlive == "undefined" &&
      $("#IsWaitforKeepALive").length > 0 &&
      typeof $("#IsWaitforKeepALive").val() != "undefined" &&
      $("#IsWaitforKeepALive").val().toLowerCase() === "true"
    ) {
      setTimeout(function () {
        setAddressControl();
      }, 500);
      return;
    }
    var container = $(settings.parentContainer);

    if (container.selector != "body") {
      container = container.find(common.ControlsPrefix.dvWrap);
    }
    //Set Select2
    //var addressElem = settings.Control;
    let lastSearchTerm = "";

    var $select2object = settings.Control.select2({
      placeholder: common.model.addressPlaceHolder,
      minimumInputLength: 0,
      combobox: true,
      language: {
        inputTooShort: function (args) {
          return "";
        },
        noResults: function () {
          return ""; // Custom message
        },
        searching: function () {
          return 'Searching...'; // Return an empty string to remove "Searching..."
        }
  
      },
      dropdownParent: container,
      //dropdownCssClass: 'select2DD select2borderbox',
      selectOnClick: false,
      minimumResultsForSearch: -1, // Disable default search box
      multiple: false,
      closeOnSelect: true,
      allowClear: true,

      ...(!settings?.IsManualAddress && {ajax: {
        url: GetCoreAPIURLWithToken(ApiURLEnum.getLocationOrPlaceDetail),
        dataType: "json",
        quietMillis: 250,
        params: {},
        data: function (params) {
          var RequestData = {};
          // const search = selectedAddressValue !== settings?.placeHolder_1 ? selectedAddressValue : ''
          RequestData.searchText = params.term;
          RequestData.countryFilter =
            common.model.countryMapForAPI[common.model.CountryId] == undefined
              ? ""
              : common.model.countryMapForAPI[common.model.CountryId];
          RequestData.Location = ipLocation;
          RequestData.IsCallNewAddressAPI = !settings.IsLiveStreamAddress;

          return RequestData;
        },
        processResults: function (data) {
          if(!selectedAddress){
            selectedAddress= data?.Data?.[0] ?? {}
          }
          data.Data = $.map(data.Data, function (obj) {
            obj.text = obj.text || obj.FormattedAddress; // replace name with the property used for the text
            obj.id = obj.id || obj.place_id; // replace name with the property used for the text
            
            return obj;
          });
          // setTimeout(() => {
          //   const inputValue = document.getElementsByClassName('select2-search__field')?.[0]?.value
          //   if(data.Data.length === 0  && inputValue){
          //   const noResultsOption = $('.select2-results__option');
          //   if (noResultsOption.length) {
          //     // Replace <li> with a <div>
          //     noResultsOption.each(function () {
          //       const message = $(this).text(); 
          //       $(this).replaceWith(
          //         `<div style="padding:10px;">${message}</div>`
          //       );
          //     });
          //   }
          // }
          // }, 50)
         
          return {
            results: data.Data,
          };
        },
        cache: true,
      }}),
      formatNoMatches: function () {
        $("#select2-drop").css("display", "block");
        $("#select2-drop").css("z-index", "100002");
        return "";
      },
      formatSearching: function () {
        $("#select2-drop").css("display", "block");
        $("#select2-drop").css("z-index", "100002");
        return null;
      },
      formatInputTooShort: function (input, min) {
        $("#select2-drop").css("display", "none");
        $("#select2-drop").css("z-index", "100002");
        return "";
      },
      templateResult: function (repo) {
        if (repo.loading) {
          $("#select2-drop").css("display", "block");
          $("#select2-drop").css("z-index", "100002");
          return repo.text;
        }
        var path =
          "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/flamingo-map-newicon-new@2x.png";
        var markup = $(
          '<div class="payrolladdress-control" data-placeid="' +
            repo.id +
            '"><img  style="vertical-align:middle" src="' +
            path +
            '" width="12" /><span class="fullocation">' +
            repo.text +
            "</span></div>"
        );
        return $(markup);
         },
      //select2-selection__clear
      
    //   templateSelection: function (repo) {
    //     globalRepo = repo;
    //     selectedAddressValue = globalRepo.text;
    //     if (settings.Control && settings.Control.select2) {
    //       try {
    //           var selectedData = settings.Control.select2("data");
              
    //           if (selectedData.length > 0) {
    //               return $("<span class='default-address'>" + repo.text + "</span>");  
    //           }
              
    //           if (settings.DefaultValue) {
    //               return $("<span class='default-address'>" + settings.DefaultValue + "</span>");
    //           }
    //       } catch (error) {
    //           console.error("Error in templateSelection:", error);
    //       }
    //   }
      
    //   return $("<span class='" + (settings.DefaultValue ? 'default-address' : '') + "'>" + 
    //   (settings.DefaultValue || repo.text) + 
    //   "</span>");  
    //   },
    // })
      templateSelection: function (repo) {
        globalRepo = repo;
        selectedAddressValue = selectedAddressValue ? repo.text : '';
        
        try {
          if (settings.Control && typeof settings.Control.select2 === 'function') {
            const instance = settings.Control.data('select2');
            if (instance) {
              const selectedData = settings.Control.select2('data');
              if (selectedData && selectedData.length > 0) {
                return $("<span class='default-address selected-address-value'>" + selectedAddressValue + "</span>");
              }
            }
          }
          
          if (settings.DefaultValue) {
            return $("<span class='default-address'>" + settings.DefaultValue + "</span>");
          }
          
          return $("<span>" + (repo.text || '') + "</span>");
          
        } catch (error) {
          console.warn('Select2 selection template error:', error);
          return $("<span>" + (repo.text || settings.DefaultValue || '') + "</span>");
        }
      }
    })
    
      .on("select2:opening", function (e) {
        // if(!selectedAddressValue){
        //   selectedAddressValue=settings.DefaultValue
        //   settings.DefaultValue=""
        // } 
        $(`.select2-container--open`).addClass("select2DD");
        settings.setTouched(true);
        // if(settings.placeHolder_1 !== selectedAddressValue){
        //   $(`${settings?.parentContainer} .select2-search__field`).val(selectedAddressValue);
        // }
        //  if($(`${settings?.parentContainer} .selected-address-value`)){
        //     $(`${settings?.parentContainer} .selected-address-value`).text(selectedAddressValue)
        //   }  if($(`${settings?.parentContainer} .select2-selection__placeholder`)){
        //     $(`${settings?.parentContainer} .select2-selection__placeholder span`).text(selectedAddressValue)
        //     $(`${settings?.parentContainer} .select2-selection__placeholder`).css('color', 'var(--text_neutral_default)')
        //   }
       })
      .on("select2:closing", function (e) {
        $(`${settings?.parentContainer} .select2-search__field`).attr("placeholder", `${settings.placeHolder_1}`);
        lastSearchTerm = $(`${settings?.parentContainer} .select2-search__field`).val();
        if(selectedAddressValue){
          selectedAddressValue = ''
        }
        selectedAddressValue=lastSearchTerm ?? ''
        if(selectedAddressValue === ''){
          // $('#select2-txtaddress-container').html(`<span class="select2-selection__placeholder"><span>${settings?.placeHolder_1}</span></span>`)
          $(`${settings?.parentContainer} .select2-selection__clear`).hide()
          $(`${settings?.parentContainer} .selected-address-value`).text(settings?.placeHolder_1)
          $(`${settings?.parentContainer} .selected-address-value`).addClass('select2-selection__placeholder')
          settings.Control.val([]).trigger('change')
          $(`${settings?.parentContainer} .selected-address-value`).removeClass('select2-selection__placeholder')
        } else {
          if($(`${settings?.parentContainer} .selected-address-value`)){
            $(`${settings?.parentContainer} .selected-address-value`).text(selectedAddressValue)
          }  if($(`${settings?.parentContainer} .select2-selection__placeholder`)){
            $(`${settings?.parentContainer} .select2-selection__placeholder span`).text(selectedAddressValue)
            $(`${settings?.parentContainer} .select2-selection__placeholder`).css('color', 'var(--text_neutral_default)')
          }
        }
        if (settings.Control.select2("data").length > 0) {
          $(`${settings?.parentContainer} .vg-input-control-error-address`).remove(); // Remove error message if there's a selection
          $(common.ControlsPrefix.dvWrap).removeClass("address-validate"); // Remove the address-validate class
        } else {
          // No selection, check if required
          if (settings.required === true && settings.placeHolder_1 && !settings.DefaultValue && !selectedAddressValue ) {
            if ($(`${settings?.parentContainer} .vg-input-control-error-address`).length === 0) {
              $(`${settings?.parentContainer} .address-plugin`).append(
                '<div class="vg-input-control-error-address">required</div>'
              );
              $(common.ControlsPrefix.dvWrap).addClass("address-validate");
            }
          }
        }
        if (settings.required === false) {
          $(`${settings?.parentContainer} .vg-input-control-error-address`).remove();
          $(common.ControlsPrefix.dvWrap).removeClass("address-validate");
        }
        $(`.select2-container--open`).removeClass("select2DD");
        if (settings.onBlur != null) {
          settings.onBlur(e);
        }
        if (window !== undefined && window.CountryDropdownClose !== undefined) {
          window.CountryDropdownClose(true);
        }
        if (settings.onAddressChange != null) {
          settings.onAddressChange(selectedAddress, selectedAddressValue);
        }
        return $("<span>" + '' + "</span>").text();
      });
   
    // $(`${settings?.parentContainer}`)
    $(document)
      .on("input", `${settings?.parentContainer} .select2-search__field`, function () {
        if(settings.IsDisabledAddress){
          $(this).prop('disabled', true); // Disable the input field
          return;
        }
        var inputValue = $(this).val();
        // settings.A
        selectedAddressValue=inputValue
        selectedAddress={}
        settings.Control.val([]).trigger('change')
        if (inputValue !== "") {
          $(`${settings?.parentContainer} .vg-input-control-error-address`).remove();
          $(common.ControlsPrefix.dvWrap).removeClass("address-validate");
        } else {
          if ($(`${settings?.parentContainer} .vg-input-control-error-address`).length === 0) {
            $(`${settings?.parentContainer} .address-plugin`).append(
              '<div class="vg-input-control-error-address">required</div>'
            );
            $(common.ControlsPrefix.dvWrap).addClass("address-validate");
          }
        }
      })
     
      .on("select2:open", function (e) {
        // let searchInput = $('.select2-search__field');
        // searchInput.val(lastSearchTerm);
        // searchInput.trigger('input');
       if (settings.IsDisabledAddress) {
        e.preventDefault(); // Prevent the dropdown from opening
        $(`${settings?.parentContainer} .select2-search__field`).prop('disabled', true); // Disable the input field
        return;
      }
      else {
        $(`${settings?.parentContainer} .select2-search__field`).prop('disabled', false);
      }
       if(settings.IsDisabledAddress){
        e.preventDefault();
        return;
       }
        if (window !== undefined && window.CountryDropdownOpen !== undefined) {
          window.CountryDropdownOpen(true);
        }

        $(`${settings?.parentContainer} .select2-search__field`).trigger("focus");
      })
      .on("select2:unselect", function (e) {
        settings.AddressData = {};
        selectedAddressValue = ''
        selectedAddress={}
        

        if (settings.required === true && settings.placeHolder_1 && !settings.DefaultValue) {
          if ($(`${settings?.parentContainer} .vg-input-control-error-address`).length === 0) {
            $(`${settings?.parentContainer} .address-plugin`).append(
              '<div class="vg-input-control-error-address">required</div>'
            );
            $(`${settings?.parentContainer} ${common.ControlsPrefix.dvWrap}`).addClass("address-validate");
          }
        }

        // Note: This will be used in case of multiple address controls
        // if (settings.required === true && settings.placeHolder_1 && !settings.DefaultValue) {
        //   if (e?.target.length === 0) {
        //     $(e?.target).append(
        //       '<div class="vg-input-control-error-address">required</div>'
        //     );
        //     $(e?.target).addClass("address-validate");
        //   }
        // }
        if (settings.onAddressChange != null) {
          settings.onAddressChange({}, selectedAddressValue);
        }
      })
      
      .on("select2:select", function (e) {
        $(`${settings?.parentContainer} .vg-input-control-error-address`).remove();
 
        if (window !== undefined && window.CountryDropdownClose !== undefined) {
          window.CountryDropdownClose(true);
        }
        if (settings.Control.select2("data").length > 0) {
          var val = settings.Control.select2("data")[0].CityState;
          var selectedid = settings.Control.select2("data")[0].CityState;
          var getPlaceDetailParams = {};
          getPlaceDetailParams.placeId =
            settings.Control.select2("data")[0].place_id;
          getPlaceDetailParams.description = val;
          getPlaceDetailParams.CountryID = parseInt(common.model.CountryId);
          getPlaceDetailParams.IsStateless =
            common.model.IsStateless == 1 ? true : false;
          getPlaceDetailParams.CountryCode =
            common.model.countryMapForAPI[common.model.CountryId];
          getPlaceDetailParams.IsCallNewAddressAPI =
            settings.Control.select2("data")[0].IsCallNewAddressAPI;
          // ajax(GetCoreAPIURLWithToken(common.ApiURLEnum.getPlaceDetailByPlaceId), getPlaceDetailParams, placeDetailSuccess, placeDetailFail, false, false, true); 
          // selectedAddressValue = val
          settings.DefaultValue = '';
          AjaxServiceV1(
            ApiURLEnum.getPlaceDetailByPlaceId,
            getPlaceDetailParams,

            function onSuccess(data) {
              try {
                if (
                  data != null &&
                  data.data != null &&
                  data.data.Data != null
                ) {
                  placeDetailSuccess(data.data.Data);
                } else {
                }
              } catch (error) {
                placeDetailFail();
              }
            },
            function OnError() {
              placeDetailFail();
            }
          );
        }
        
        if (window !== undefined && window.CountryDropdownClose !== undefined) {
          window.CountryDropdownClose(true);
        }
      });

    $(window).on('load',()=> {
      if(settings.AutoFocus){
        if($(`${settings?.parentContainer} .vg-test-address`).hasClass("select2-hidden-accessible")){ 
          settings.Control.select2('open')
        }
      }
    })
    //search results dropdown selection event. set address informaation to object
    var placeDetailSuccess = function (res) {
      selectedAddress = res;
      selectedAddressValue = `${res.Address} ${res.CityState} ${res.ZipCode}`;
      // if (res.CustomCode == 1000) {

      $(settings?.parentContainer+" "+ common.ControlsPrefix.addressControl).removeClass("errorInput");
      // res = res.Data;
      var city1 =
        res != null && res.CityState == null ? "" : res.CityState.split(",")[0];
      var state1 = res.State == null ? "" : res.State;
      state1 = state1.trim();
      addressData = {};
      addressData.address = res.Address;
      addressData.address2 = res.Address2;
      addressData.state = state1;
      addressData.zip = res.ZipCode;
      addressData.country = common.model.CountryId;

      addressData.stateCode = res.StateCode;
      var address = addressData.address;
      if (res.CountryID == 2) {
        if (res.State == "" || res.StateCode == "") {
          city1 = res.City;
          common.model.IsStateless = 1;
        } else {
          common.model.IsStateless = 0;
        }
      }
      addressData.city = city1;
      settings.AddressData = addressData;
      address = address + (address != "" ? ", " : "") + addressData.city;
      if (common.model.IsStateless == 0) {
        address =
          address +
          (address != "" && addressData.state != "" ? ", " : "") +
          (common.model.CountryId == 1
            ? addressData.stateCode
            : addressData.state);
      }
      address =
        address +
        (address != "" && addressData.zip != "" ? ", " : "") +
        addressData.zip;
      if (isNullOrUndefineOrBlank(address)) {
        settings.Control.select2("data", { id: null, text: null });
        window.swal(
          {
            title: "Address is not valid.",
            text: "",
            type: "",
            timer: 6000,
            showCancelButton: false,
            confirmButtonColor: "#eb6663",
            customClass: "sweet-alert-model auto-footer-btton ",
          },
          function (isConfirm) {
            $(common.ControlsPrefix.addressControl).focus();
            $(common.ControlsPrefix.addressControl).select2("open");
          }
        );
      } else {
        settings.Control.select2("data")[0].text = address;
        settings.Control.trigger("change");
        settings.AddressData = addressData;
      }
      if (!isNullOrUndefineOrBlank(settings.Address2Control)) {
        $(settings.Address2Control).val(settings.AddressData.address2);
        if(document.getElementById(settings.Address2Control)){
          document.getElementById(settings.Address2Control).value =
            settings.AddressData.address2;
        }
      }
      var strReturnVal = res.GetCityByZipString;
      if (!isNullOrUndefineOrBlank(strReturnVal)) {
        var City = strReturnVal.split("|")[0];
        var State = strReturnVal.split("|")[1] * 1;
        var stateText = strReturnVal.split("|")[2];
        if (!isNullOrUndefineOrBlank(City)) {
          $(common.ControlsPrefix.txtCity).val(City);
        }
        if (!isNullOrUndefineOrBlank(stateText)) {
          settings.AddressData.state = stateText;
          settings.AddressData.stateId = State;
          $(common.ControlsPrefix.ddlState).val(State);
        }
      }
      if (settings.IsLiveStreamAddress) {
        //_shopdetail.ChangeCustomerStartTime(res.TimeZoneOffSet, res.CountryID, res.IsSupportDayLight);
      }
      // }
      if (settings.onAddressChange != null) {
        settings.onAddressChange(selectedAddress, selectedAddressValue);
      }
    };

    var placeDetailFail = function (e) {};
    SetPlaceHolder();
  };
 
  var ajax = (
    tokan,
    data,
    callback,
    error,
    isAjaxQue,
    isErrorMsgReq,
    IsNewVagaroAPI
  ) => {
    // var checkoutAjax = new window.vagaro.ajax();
    // checkoutAjax.datamodel.Token = tokan;
    // checkoutAjax.datamodel.data = data;
    // checkoutAjax.datamodel.callback = callback;
    // checkoutAjax.datamodel.Error = error;
    if (
      typeof IsNewVagaroAPI != "undefined" &&
      IsNewVagaroAPI != null &&
      IsNewVagaroAPI == true
    ) {
      // checkoutAjax.datamodel.IsNewVagaroAPI = true;
    }
    if (typeof isErrorMsgReq !== "undefined" && isErrorMsgReq == true) {
      // checkoutAjax.datamodel.ErrorMessage = "";
    }
    if (isAjaxQue) {
      // checkoutAjax.PostQue();
    } else {
      // checkoutAjax.Post();
    }
  };
  // var GetCountryList = () => {
  //   if (!CheckGlobalCountryList()) {
  //     var _Data = {};
  //     var _RegisterDeviceReq = {};
  //     var getParams = {};
  //     _RegisterDeviceReq.businessID = 0;
  //     _RegisterDeviceReq.loginUserID = 0;
  //     _Data.RegisterDeviceRequest = _RegisterDeviceReq;
  //     ajax(
  //       "GetAllCountryList",
  //       _Data,
  //       GetCountryList_Success,
  //       GetCountryList_Fail,
  //       false,
  //       false,
  //       false
  //     );
  //     AjaxServiceV1(
  //       ApiURLEnum.getCountryList,
  //       getParams,

  //       function onSuccess(data) {
  //         try {
  //           if (data != null && data.data != null && data.data.data != null) {
  //     GetCountryList_Success(data.data.data);
  //         }
  //       } catch (error) {
  //         GetCountryList_Fail();
  //       }
  //     },
  //     function OnError() {
  //       GetCountryList_Fail();
  //     }
  //     );
  //   } else {
  //     GetCountryList_Success(window._glbPluginCountryListReact);
  //   }
  // };
//   var GetCountryList = () => {
//     if (!CheckGlobalCountryList()) {
//         var _Data = {};
//         var _RegisterDeviceReq = {};
//         _RegisterDeviceReq.businessID = 0;
//         _RegisterDeviceReq.loginUserID = 0;
//         _Data.RegisterDeviceRequest = _RegisterDeviceReq;
//         // ajax('GetAllCountryList', _Data, GetCountryList_Success, GetCountryList_Fail, false, false, false);
//         AjaxService.Get(
//             `countrylist/countrylistdetails`,
//             "",
//             function onSuccess(data) {
//                 try {
                
//                    if (data != null && data.data != null && data.data.data != null ) {
//                         GetCountryList_Success(data.data.data)
//                     }
                   
//                 } catch (error) { GetCountryList_Fail() } 
//             },
//             function OnError() { GetCountryList_Fail() }
//         );
//     }
//     else {
//         GetCountryList_Success(window._glbPluginCountryListReact);
//     }
// }
var GetCountryList = () => {
  if (!CheckGlobalCountryList()) {
      var _Data = {};
      var _RegisterDeviceReq = {};
      _RegisterDeviceReq.businessID = 0;
      _RegisterDeviceReq.loginUserID = 0;
      _Data.RegisterDeviceRequest = _RegisterDeviceReq;

      // If AllCountry is true, make an API request to fetch country list
      if (settings.AllCountry) {
          AjaxService.Get(
              `countrylist/countrylistdetails`,
              "",
              function onSuccess(data) {
                  try {
                      // Ensure the response structure is correct before passing data to success handler
                      if (data != null && data.data != null && data.data.data != null) {
                          GetCountryList_Success(data.data.data);  // Pass dynamic data
                      } else {
                          GetCountryList_Fail();  // Fail gracefully if data structure is not correct
                      }
                  } catch (error) {
                      GetCountryList_Fail();  // Handle any errors
                  }
              },
              function OnError() {
                  GetCountryList_Fail();  // Handle API errors
              }
          );
      } else {
          // If AllCountry is false, pass static country data
          GetCountryList_Success(countriesData);
      }
  } else {
      // If CheckGlobalCountryList() returns true, use the global country list
      GetCountryList_Success(window._glbPluginCountryListReact);
  }
};

  var GetCountryList_Success = (result) => {
    if (typeof result != "undefined" && result != null && result.length > 0) {
      const defaultCountries = [1, 2, 3, 4]; 
      if (!CheckGlobalCountryList()) {
        window._glbPluginCountryListReactReact = result;
      }
      common.model.countryFlag = {};
      common.model.countryDialingCode = {};
      //common.model.CountryId = result;

      var currCountryStr = '<optgroup label="Current Location">';
      var otherCountryStr = '<optgroup label="Other Locations">';
      result.sort((a, b) => {
        var nameA = a.countryName.toUpperCase();
        var nameB = b.countryName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      $.each(result, function (data, value) {
        // if (
        //   settings.UserRole == 2 || 
        //   (settings.UserRole == 1 &&
        //     !isNullOrUndefineOrBlank(value.isBusinessUseOnly) && 
        //     value.isBusinessUseOnly == true)  
        // ) 
        {
          var liId = "liFront" + settings.ControlId + data;
          var option =
            "<li  id='" +
            liId +
            "' class=" +
            value.cssClass +
            " >" +
            value.countryName +
            "  +" +
            value.dialingCode +
            " </li>";
          $("#" + liId).bind("click", function () {
            common.model.CountryId = value.countryID;
            common.model.DialingCode = value.dialingCode;
            selectCountry(common.model.CountryId);
          });
          common.model.countryFlag[value.countryID] = value.cssClass;
          common.model.countryDialingCode[value.countryID] = value.dialingCode;

          if (value.countryID == settings.CurrentLocationCountryID) {
            currCountryStr +=
              ' <option class="' +
              value.cssClass +
              '" data-Css="' +
              value.cssClass +
              '" value="' +
              value.countryID +
              '">' +
              value.countryName +
              "+" +
              value.dialingCode +
              "</option> </optgroup >";
          } else {
            otherCountryStr +=
              ' <option class="' +
              value.cssClass +
              '" data-Css="' +
              value.cssClass +
              '" value="' +
              value.countryID +
              '">' +
              value.countryName +
              "+" +
              value.dialingCode +
              "</option>";
          }
        }});
        
      otherCountryStr += "</optgroup >";
      $(common.ControlsPrefix.ddlMainCountry).append(
        currCountryStr + otherCountryStr
      );
      var container = $(settings.parentContainer);
      $(common.ControlsPrefix.ddlMainCountry)
        .select2({
          searchInputPlaceholder: "Search for a Country",
          closeOnSelect: true,
          templateResult: formatCountry,
          dropdownParent: container,
        })
        .on("select2-selected", function (e) {
          common.model.CountryId = parseInt(e.choice.id);
          selectCountry(common.model.CountryId);

          // phonePluginSetPhonePattern();
          setTimeout(function () {
            $(common.ControlsPrefix.PhoneControl).focus();
          }, 100);
        })
        .on("select2:select", function (event) {
          common.model.CountryId = parseInt(event.target.value);
          selectCountry(common.model.CountryId);
          // phonePluginSetPhonePattern();
          setTimeout(function () {
            $(common.ControlsPrefix.PhoneControl).focus();
          }, 100);
        })
        .on("select2:opening", function (event) {
        
          $("body").addClass("hideSelect");
          //$($(common.ControlsPrefix.ddlMainCountry).select2("container")).addClass("containerDD");
          var resultId =
            "#select2-ddlMainCountry" + settings.ControlId + "-results";
          $(resultId)
            .closest(".select2-container")
            .removeClass("all-country-flag all-country-flag-react");
        })
        
        .on("select2:open", function (event) {
          if (settings.IsDisabledAddress) {            
            $('#ddlMainCountry' + settings.ControlId)
              .prop('disabled', true) 
            
            return;
          }
          var resultId =
            "#select2-ddlMainCountry" + settings.ControlId + "-results";
          $(resultId)
            .closest(".select2-container")
            .addClass(
              "all-country-flag all-country-flag-react vg-address-country-flag"
            );
          $(resultId)
            .closest(".select2-container")
            .find("ul.select2-results__options")
            .addClass("select2-result-sub");
          
          setTimeout(function () {
            $("body").removeClass("hideSelect");
          }, 100);
          if (
            typeof IsMobileDevice == "undefined" ||
            isNullOrUndefineOrBlank(IsMobileDevice)
          ) {
            var isiPhone = navigator.userAgent.match(/iphone/i) != null;
            var isWindowsPhone =
              navigator.userAgent.match(/windows phone/i) || false;
            var AndroidMobile =
              navigator.userAgent.match(/Android/i) != null &&
              navigator.userAgent.match(/Mobile/i) != null &&
              navigator.userAgent.match(/Windows/i) == null;
            var IsMobileDevice =
              /iPad/.test(navigator.userAgent) ||
              isiPhone ||
              isWindowsPhone ||
              AndroidMobile ||
              (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
                ($(window).width() <= 850 || $(window).height() <= 850)) ||
              /androidcheckin/.test(navigator.userAgent);
          }
          if (IsMobileDevice == true) {
            $(".select2-input text-primary demo, :focus,input")
              .prop("focus", false)
              .blur();
          }
          if (element.selectedIndex > 0) {
            var viewport = $("#select2-drop .select2-results");
            var itemTop = viewport.find(".select2-highlighted").position().top;
            if (settings.ScrollType == 1) {
              viewport.scrollTop(itemTop + viewport.scrollTop());
            } else {
              viewport.scrollTop(itemTop);
            }
          }
        })
        .on("select2-open", function (e) {
          
          if (
            typeof IsMobileDevice == "undefined" ||
            isNullOrUndefineOrBlank(IsMobileDevice)
          ) {
            var isiPhone = navigator.userAgent.match(/iphone/i) != null;
            var isWindowsPhone =
              navigator.userAgent.match(/windows phone/i) || false;
            var AndroidMobile =
              navigator.userAgent.match(/Android/i) != null &&
              navigator.userAgent.match(/Mobile/i) != null &&
              navigator.userAgent.match(/Windows/i) == null;
            var IsMobileDevice =
              /iPad/.test(navigator.userAgent) ||
              isiPhone ||
              isWindowsPhone ||
              AndroidMobile ||
              (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
                ($(window).width() <= 850 || $(window).height() <= 850)) ||
              /androidcheckin/.test(navigator.userAgent);
          }
          if (IsMobileDevice == true) {
            $(".select2-input text-primary demo, :focus,input")
              .prop("focus", false)
              .blur();
          }
          if (element.selectedIndex > 0) {
            var viewport = $("#select2-drop .select2-results");
            var itemTop = viewport.find(".select2-highlighted").position().top;
            if (settings.ScrollType == 1) {
              viewport.scrollTop(itemTop + viewport.scrollTop());
            } else {
              viewport.scrollTop(itemTop);
            }
          }
        });

      $(common.ControlsPrefix.ddlPopupCountry).append(
        currCountryStr + otherCountryStr
      );
      $(common.ControlsPrefix.ddlPopupCountry)
        .select2({
          searchInputPlaceholder: "Search for a Country",
          closeOnSelect: false,
          templateResult: formatCountry,

          // dropdownCssClass: 'all-country-flag'
        })
        .on("select2-selected", function (e) {
          common.model.CountryId = parseInt(e.choice.id);
          ChangeCountry(common.model.CountryId);
          settings.Control.select2("data", { id: null, text: null });
          clearAddressValue();
          setTimeout(function () {
            $(common.ControlsPrefix.txtStreet).focus();
          }, 100);
        })
        .on("select2:opening", function (event) {
          $("body").addClass("hideSelect");
        })
        .on("select2:open", function (event) {
          var resultId =
            "#select2-ddlPopupCountry" + settings.ControlId + "-results";
          $(resultId)
            .closest(".select2-container")
            .addClass(
              "all-country-flag all-country-flag-react emp-country-flag-react employee-profile-select"
            );
          $(resultId)
            .closest(".select2-container")
            .find("ul.select2-results__options")
            .addClass("select2-result-sub");
          setTimeout(function () {
            $(resultId).css("display", "block");
          }, 100);

          if (
            typeof IsMobileDevice == "undefined" ||
            isNullOrUndefineOrBlank(IsMobileDevice)
          ) {
            isiPhone = navigator.userAgent.match(/iphone/i) != null;
            isWindowsPhone =
              navigator.userAgent.match(/windows phone/i) || false;
            AndroidMobile =
              navigator.userAgent.match(/Android/i) != null &&
              navigator.userAgent.match(/Mobile/i) != null &&
              navigator.userAgent.match(/Windows/i) == null;
            IsMobileDevice =
              /iPad/.test(navigator.userAgent) ||
              isiPhone ||
              isWindowsPhone ||
              AndroidMobile ||
              (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
                ($(window).width() <= 850 || $(window).height() <= 850));
          }
          if (IsMobileDevice == true) {
            hideSelect2Keyboard();
          }
          if (this.selectedIndex > 0) {
            var viewport = $("#select2-drop .select2-results");
            var itemTop = viewport.find(".select2-highlighted").position().top;
            if (settings.ScrollType == 1) {
              viewport.scrollTop(itemTop + viewport.scrollTop());
            } else {
              viewport.scrollTop(itemTop);
            }
          }
        })
        .on("select2-open", function (e) {
          if (
            typeof IsMobileDevice == "undefined" ||
            isNullOrUndefineOrBlank(IsMobileDevice)
          ) {
            isiPhone = navigator.userAgent.match(/iphone/i) != null;
            isWindowsPhone =
              navigator.userAgent.match(/windows phone/i) || false;
            AndroidMobile =
              navigator.userAgent.match(/Android/i) != null &&
              navigator.userAgent.match(/Mobile/i) != null &&
              navigator.userAgent.match(/Windows/i) == null;
            IsMobileDevice =
              /iPad/.test(navigator.userAgent) ||
              isiPhone ||
              isWindowsPhone ||
              AndroidMobile ||
              (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
                ($(window).width() <= 850 || $(window).height() <= 850));
          }
          if (IsMobileDevice == true) {
            hideSelect2Keyboard();
          }
          if (this.selectedIndex > 0) {
            var viewport = $("#select2-drop .select2-results");
            var itemTop = viewport.find(".select2-highlighted").position().top;
            if (settings.ScrollType == 1) {
              viewport.scrollTop(itemTop + viewport.scrollTop());
            } else {
              viewport.scrollTop(itemTop);
            }
          }
        });

      selectCountry(common.model.CountryId, "0");
      // phonePluginSetPhonePattern();
    }
  };
  window.triggerSelect2Eventclose = (element, eventName, eventArgs) => {
    var $element = $(element);
    var select2Instance = $element.data("select2");
    if (select2Instance) {
      select2Instance.trigger(eventName, eventArgs);
    } else {
      console.error("Select2 instance not found for element: ", element);
    }
  };

  var hideSelect2Keyboard = () => {
    $(".select2-input text-primary demo, :focus,input")
      .prop("focus", false)
      .blur();
  };
  var GetCountryList_Fail = (result) => {
    selectCountry(common.model.CountryId, "0");
    // window.swal({
    //     title: common.model.errorMessage, text: "",
    //     timer: 4000, type: "error", showConfirmButton: false, customClass: 'swal-nobutton swal-white-greenbtn',
    // }, function (isConfirm) {
    //     window.swal.close();
    // });
  };
  var formatCountry = (country) => {
    var CountryDialing = country.text.split("+");
    var $country = $(
      // '<span class="' + country.css + '" >' + country.text + '</span>'
      '<div class="select2-result-label countrys-Code ' +
        common.model.countryFlag[country.id] +
        '"><span class="' +
        common.model.countryFlag[country.id] +
        '" >' +
        CountryDialing[0] +
        "</span></div>"
    );

    return $country;
  };
  var isNullOrUndefineOrBlank = (data) => {
    if (
      typeof data == "undefined" ||
      data == undefined ||
      data == "" ||
      data == null
    ) {
      return true;
    }
    return false;
  };

  var selectCountry = (id, load) => {
    currentSelectedCountry = id;
    common.model.CountryId = id;
    SetPlaceHolder();
    var countryFlag = common.model.countryFlag[id];
    if (isNullOrUndefineOrBlank(countryFlag)) {
      common.model.CountryId = settings.CurrentLocationCountryID;
      countryFlag = common.model.countryFlag[common.model.CountryId];
      load = "";
    }
    if (load != "0") {
      $(".select2-results").empty();
      settings.Control.select2("data", { id: null, text: null });
      $(".select2-results").empty();
      clearAddressValue();
    }
    $(common.ControlsPrefix.AddressControllerCountry).removeClass();
    $(common.ControlsPrefix.AddressControllerCountry).addClass(
      "selectedcountry " + countryFlag
    );
    $(common.ControlsPrefix.myCountryPopup).removeClass();
    $(common.ControlsPrefix.myCountryPopup).addClass(
      "selectedcountry " + countryFlag
    );
    $(common.ControlsPrefix.countrySelectOption)
      .removeAttr("style")
      .attr("style", "display:none");
    $(common.ControlsPrefix.countrySelectOption).removeClass("active");
    $(common.ControlsPrefix.dvWrap).removeClass();
    $(common.ControlsPrefix.dvWrap).addClass(
      "select-country-mar vg-select-icon-mar add-input-focus-relative"
    );

    if (
      typeof lblRow == "undefined" ||
      Object.keys(lblRow).length == 0 ||
      (typeof lblRow != "undefined" &&
        Object.keys(lblRow).length > 0 &&
        lblRow.CountryId != common.model.CountryId)
    ) {
      $.grep(common.model.lableLanguage, function (item, ind) {
        if (item.CountryId == common.model.CountryId) {
          lblRow = common.model.lableLanguage[ind];
        }
      });
      if (
        typeof lblRow == "undefined" ||
        Object.keys(lblRow).length == 0 ||
        lblRow.CountryId != common.model.CountryId
      ) {
        lblRow = common.model.lableLanguage[0];
      }
    }
    common.model.IsStateless = lblRow.IsStateless;
    common.model.IsZipless = lblRow.IsZipless;

    if (settings.onCountryChange != null) {
      settings.onCountryChange(id);
    }
  };

  var clearAddressValue = () => {
    settings.AddressData = {};
  };

  var GetCoreAPIURLWithToken = (tokenName, groupToken) => {
    try {
      var apiURL = "";
      var groupID = "us02";
      if (
        typeof Window.VagaroCoreApiUrl != "undefined" &&
        !isNullOrUndefineOrBlank(Window.VagaroCoreApiUrl)
      ) {
        apiURL = Window.VagaroCoreApiUrl;
      } else if (
        typeof Window.CoreAPIURL != "undefined" &&
        !isNullOrUndefineOrBlank(Window.CoreAPIURL)
      ) {
        apiURL = Window.CoreAPIURL;
      } else if (
        typeof window.parent.VagaroCoreApiUrl != "undefined" &&
        !isNullOrUndefineOrBlank(window.parent.VagaroCoreApiUrl)
      ) {
        apiURL = window.parent.VagaroCoreApiUrl;
      } else {
        // apiURL = "https://api.vagaro.com/" + window.groupID + "/api/v1/";
        apiURL = settings.environment_url + groupID + "/api/v1/";
      }

      if (isNullOrUndefineOrBlank(apiURL)) {
        return;
      }
      var coreAPIURLWithToken = "";
      var arr = apiURL.split("/");
      if (
        typeof groupToken != "undefined" &&
        groupToken != null &&
        groupToken != ""
      ) {
        arr[3] = groupToken;
        coreAPIURLWithToken = arr.join("/") + tokenName;
      } else if (
        typeof window.myAccountUserGroupID != "undefined" &&
        window.myAccountUserGroupID != null &&
        window.myAccountUserGroupID != ""
      ) {
        var userGroup = window.myAccountUserGroupID.split(",");
        if (userGroup.length > 0) {
          arr[3] = userGroup[0];
          coreAPIURLWithToken = arr.join("/") + tokenName;
        }
      }
      if (coreAPIURLWithToken == "") {
        coreAPIURLWithToken = apiURL + tokenName;
      }
      return coreAPIURLWithToken;
    } catch (e) {
      return apiURL + tokenName;
    }
  };
  var BindState = () => {
    if (common.model.stateList.length > 0) {
      $(common.ControlsPrefix.ddlState).html("");
      $(common.ControlsPrefix.ddlState).html(
        '<option value="0">Select</option>'
      );
      $.grep(common.model.stateList, function (s) {
        if (s.CountryID == common.model.CountryId) {
          $(common.ControlsPrefix.ddlState).append(
            $("<option></option>").val(s.StateID).html(s.DisplayStateCode)
          );
        }
      });
      if (
        typeof settings.AddressData.stateCode != "undefined" &&
        !isNullOrUndefineOrBlank(settings.AddressData.stateCode)
      ) {
        $.grep(common.model.stateList, function (s) {
          if (
            s.StateCode == settings.AddressData.stateCode &&
            s.CountryID == common.model.CountryId
          ) {
            $(common.ControlsPrefix.ddlState).val(s.StateID);
          }
        });
      }
    }
  };
  var GetState = () => {
    var getParams = {};
    // ajax(GetCoreAPIURLWithToken(common.ApiURLEnum.getState), getParams, GetState_Success, GetState_Failure, false, false, true);
    AjaxServiceV1(
      ApiURLEnum.getState,
      getParams,
      function onSuccess(data) {
        try {
          if (data != null && data.data != null && data.data.Data != null) {
            GetState_Success(data.data.Data);
          }
        } catch (error) {
          GetState_Failure();
        }
      },
      function OnError() {
        GetState_Failure();
      }
    );
  };
  var GetState_Success = (data) => {
    common.model.stateList = data;
    BindState();
  };
  var GetState_Failure = (Err) => {
    // window.swal({
    //     title: common.model.errorMessage, text: "",
    //     timer: 4000, type: "error", showConfirmButton: false, customClass: 'swal-nobutton swal-white-greenbtn',
    // }, function (isConfirm) {
    //     window.swal.close();
    // });
  };

  var ChangeCountry = (val) => {
    var flagClass = "";
    $(".countryflag").removeClass("active");
    common.model.CountryId = val;
    if (
      typeof lblRow == "undefined" ||
      Object.keys(lblRow).length == 0 ||
      (typeof lblRow != "undefined" &&
        Object.keys(lblRow).length > 0 &&
        lblRow.CountryId != val)
    ) {
      $.grep(common.model.lableLanguage, function (item, ind) {
        if (item.CountryId == val) {
          lblRow = common.model.lableLanguage[ind];
        }
      });
      if (
        typeof lblRow == "undefined" ||
        Object.keys(lblRow).length == 0 ||
        lblRow.CountryId != val
      ) {
        lblRow = common.model.lableLanguage[0];
      }
    }
    $(common.ControlsPrefix.lblZipCodePopup).text(lblRow.Zip);
    $(common.ControlsPrefix.txtZip).attr("placeholder", lblRow.Zip);
    $(common.ControlsPrefix.lblStatePopup).text(lblRow.State);
    $(common.ControlsPrefix.lblCityPopup).text(lblRow.City);
    $(common.ControlsPrefix.txtCity).attr("placeholder", lblRow.City);
    common.model.IsStateless = lblRow.IsStateless;
    common.model.IsZipless = lblRow.IsZipless;
    if (lblRow.IsStateDropDown == 0) {
      $(common.ControlsPrefix.txtState).show();
      $(common.ControlsPrefix.ddlState).hide();
      $(common.ControlsPrefix.dvDdlState).removeClass();
    } else {
      $(common.ControlsPrefix.txtState).hide();
      $(common.ControlsPrefix.ddlState).show();
      $(common.ControlsPrefix.dvDdlState).addClass("dropdowndiv");
    }

    flagClass = common.model.countryFlag[val];

    $(".flag-" + flagClass).addClass("active");
    BindState();
    $(common.ControlsPrefix.AddressControllerCountry)
      .removeClass()
      .addClass("selectedcountry " + flagClass);
    $(common.ControlsPrefix.myCountryPopup).removeClass();
    $(common.ControlsPrefix.myCountryPopup).addClass(
      "selectedcountry " + flagClass
    );
    $(".selectoptionpopup").css("display", "none");
    $(".selectoptionpopup").removeClass("active");

    $(common.ControlsPrefix.txtZip).val("");
    $(common.ControlsPrefix.txtCity).val("");
    $(common.ControlsPrefix.txtStreet).val("");
    $(common.ControlsPrefix.txtStreet1).val("");
    $(common.ControlsPrefix.txtState).val("");
  };

  var showHidePopup = (popupid, flag) => {
    if (flag) {
      $(popupid).fadeIn("fast");
      $("html").addClass("popupscroll");
      $("body").css("overflow", "hidden");
      $(popupid).addClass("in");
      if (
        $("#pnlCustomer").length &&
        $("#pnlCustomer").css("display") !== "none"
      ) {
        $("#pnlCustomer").removeAttr("tabindex");
      }
      $(common.ControlsPrefix.txtStreet).focus();
    } else {
      $(popupid).fadeOut("fast");
      $(popupid).removeClass("in");
      $("html").removeClass("popupscroll");
      $("body").css("overflow", "auto");
      if (
        $("#pnlCustomer").length &&
        $("#pnlCustomer").css("display") !== "none"
      ) {
        $("#pnlCustomer").attr("tabindex", "-1");
      }
    }
  };
  var openCloseAddresspopup = (open) => {
    if (open == 1) {
      $(common.ControlsPrefix.txtCity)
        .removeClass("errorInput")
        .val(settings.AddressData.city);
      $(common.ControlsPrefix.txtZip)
        .removeClass("errorInput")
        .val(settings.AddressData.zip);

      //SET MAXLENGTH
      $(common.ControlsPrefix.txtStreet)
        .attr("maxlength", 500)
        .removeClass("errorInput")
        .val(settings.AddressData.address);
      $(common.ControlsPrefix.txtState).val(settings.AddressData.state);
      if (!isNullOrUndefineOrBlank(settings.Address2Control)) {
        settings.AddressData.address2 = $(settings.Address2Control).val();
        settings.AddressData.address2 = document.getElementById(
          settings.Address2Control
        ).value;
      }
      $(common.ControlsPrefix.txtStreet1).val(settings.AddressData.address2);
      /*set address detail based on zipcode found from google : START*/
      if (
        settings.AddressData.zip != "" &&
        settings.AddressData.address != "" &&
        settings.AddressData.country > 0
      ) {
        var getCityParams = {};
        getCityParams.CountryID = parseInt(settings.AddressData.country);
        getCityParams.StrZipCode = $.trim(settings.AddressData.zip);
        getCityParams.CountryCode =
          common.model.countryMapForAPI[common.model.CountryId];
        // ajax(GetCoreAPIURLWithToken(common.ApiURLEnum.getStateCode), getCityParams, getStateCodeSuccess, getStateCodeFail, false, false, true);

        AjaxServiceV1(
          ApiURLEnum.getStateCode,
          getCityParams,
          function onSuccess(data) {
            try {
              if (data != null && data.data != null && data.data.Data != null) {
                GetCityByZipCode_Success(data.data.Data);
              }
            } catch (error) {
              GetCityByZipCode_Failure();
            }
          },
          function OnError() {
            GetCityByZipCode_Failure();
          }
        );
      }
      showHidePopup(common.ControlsPrefix.addressPopup, true);
      return false;
    } else {
      showHidePopup(common.ControlsPrefix.addressPopup, false);
      return false;
    }
  };
  var getStateCodeSuccess = (data) => {
    if (data.CustomCode == 1000) {
      res = data.Data;
      var cityName = res.split("|")[0];
      var stateID = isNullOrUndefineOrBlank(res) ? 0 : res.split("|")[1] * 1;
      var stateName = res.split("|")[2];

      $(common.ControlsPrefix.txtCity).val(cityName);
      $(common.ControlsPrefix.txtState).val(stateName);
      $(common.ControlsPrefix.ddlState).val(stateID);
    }
  };
  var getStateCodeFail = (err) => {
    // window.swal({
    //     title: "Failed to validate address details.", text: "",
    //     timer: 4000, type: "error", showConfirmButton: false, customClass: 'swal-nobutton swal-white-greenbtn',
    // }, function (isConfirm) {
    //     window.swal.close();
    // });
  };

  var SetAddressIntoSearchBox = () => {
    var countryVal = settings.CurrentLocationCountryID;
    var streetName = settings.AddressData.street;
    var streetName1 = settings.AddressData.streetNo;
    var cityname = settings.AddressData.city;
    var stateName = settings.AddressData.stateName;
    var zipcode = settings.AddressData.zip;
    var flage = false;
    if (countryVal != undefined && stateName == undefined) {
      selectCountry(countryVal, "0");
    }
    if (!isNullOrUndefineOrBlank(stateName)) {
      $(common.ControlsPrefix.txtState).val(stateName);
      flage = true;
    } else {
      $(common.ControlsPrefix.txtState).val("");
    }
    if (!isNullOrUndefineOrBlank(streetName)) {
      $(common.ControlsPrefix.txtStreet).val(streetName);
      flage = true;
    } else {
      $(common.ControlsPrefix.txtStreet).val("");
      settings.AddressData.address = "";
    }
    if (!isNullOrUndefineOrBlank(cityname)) {
      $(common.ControlsPrefix.txtCity).val(cityname);
      flage = true;
    } else {
      $(common.ControlsPrefix.txtCity).val("");
      settings.AddressData.city = "";
    }
    if (!isNullOrUndefineOrBlank(zipcode)) {
      $(common.ControlsPrefix.txtZip).val(zipcode);
      flage = true;
    } else {
      $(common.ControlsPrefix.txtZip).val("");
    }
    if (!isNullOrUndefineOrBlank(streetName1)) {
      $(common.ControlsPrefix.txtStreet1).val(streetName1);
      flage = true;
    } else {
      $(common.ControlsPrefix.txtStreet1).val("");
      settings.AddressData.address2 = "";
    }
    selectCountry(countryVal, "0");

    setAddressInSearchBox();
    if (flage == false) {
      settings.Control.select2("data", { id: null, text: null });
      clearAddressValue();
    }
  };
  var setAddressInSearchBox = (isSearch) => {
    if (Object.keys(settings.AddressData).length > 0) {
      let addressData = settings.AddressData;
      settings.AddressData.stateName =
        settings.AddressData.stateName == null
          ? ""
          : settings.AddressData.stateName;
      settings.AddressData.zip =
        settings.AddressData.zip == null ? "" : settings.AddressData.zip;
      var address =
        settings.AddressData.street === undefined
          ? settings.AddressData.address
          : settings.AddressData.street;
      address =
        address + (address != "" ? ", " : "") + settings.AddressData.city;
      if (settings.CurrentLocationCountryID == 2) {
        if (isNullOrUndefineOrBlank(settings.AddressData.state)) {
          common.model.IsStateless = 1;
        } else {
          common.model.IsStateless = 0;
        }
      }
      if (common.model.IsStateless == 0) {
        address =
          address +
          (address != "" && settings.AddressData.stateName != "" ? ", " : "") +
          settings.AddressData.stateName;
      }
      address =
        address +
        (address != "" && settings.AddressData.zip != "" ? ", " : "") +
        settings.AddressData.zip;
      if (isSearch) {
        let data = {
          id: "1",
          text: address,
        };
        settings.Control.find("option[value='1']").remove();
        var newOption = new Option(address, data.id, false, true);
        settings.Control.append(newOption); //
        settings.Control.val(data.id);
        settings.Control.val(data.id).trigger("change");
        $(".select2-results").empty();
        if (
          typeof settings.AddressData.address2 != "undefined" &&
          !isNullOrUndefineOrBlank(settings.Address2Control)
        ) {
          $(settings.Address2Control).val(settings.AddressData.address2);
          document.getElementById(settings.Address2Control).value =
            settings.AddressData.address2;
        }
      } else {
        let data = {
          id: "1",
          text: address,
        };
        settings.Control.find("option[value='1']").remove();
        var newOption = new Option(data.text, data.id, false, true);
        settings.Control.append(newOption); //
        settings.Control.val(data.id);
        settings.Control.val(data.id).trigger("change");
        //settings.Control.select2("val", { "id": 0, text: address });
      }
      settings.AddressData = addressData;
      if (
        settings.IsAddManualAddress == true &&
        settings.IsSaveManualAddress == true
      ) {
        settings.IsAddManualAddress = false;
        settings.IsSaveManualAddress = false;
        window.SaveAddressData();
      }
    }
  };
  var setAddressFromPopup = (isSearch) => {
    //remove multiple addresspopup
    if (
      typeof isFromVagaroProduct !== "undefined" &&
      isFromVagaroProduct != null &&
      isFromVagaroProduct == true
    ) {
      var length = $(".general-addresspopup").length;
      for (var i = 1; i < length; i++) {
        if (
          $(".general-addresspopup")[i] != undefined &&
          $(".general-addresspopup")[i] != null
        ) {
          $(".general-addresspopup")[i].remove();
        }
      }
    }

    //validation
    var flage = false;
    $(".validAddress" + settings.ControlId).each(function () {
      if (
        $(this).val().trim() == "" &&
        (!this.id.includes("txtZip") ||
          (this.id.includes("txtZip") && common.model.IsZipless == 0))
      ) {
        if ($(this).siblings("span").length == 0) {
          $(this).addClass("errorInput");
          $(this).after(
            '<span id="rfv' +
              $(this).attr("id") +
              '" class="requiredErrorText" style="color:Red;">required</span>'
          );
        }
        flage = true;
      } else {
        if ($(this).siblings("span").length != 0) {
          $(this).next("span").remove();
          $(this).removeClass("errorInput");
        }
      }
    });
    if (flage) {
      $(common.ControlsPrefix.addressPopup).find(".errorInput:first").focus();
      return false;
    }
    if (!$(common.ControlsPrefix.txtState).is(":visible")) {
      $(common.ControlsPrefix.txtState).val(
        $(common.ControlsPrefix.ddlState + " option:selected").text()
      );
    }
    //check zipcode valid or not
    if (
      common.model.IsStateless == 0 &&
      ($(common.ControlsPrefix.txtState).val().trim() == "" ||
        $(common.ControlsPrefix.txtState).val().trim() == "Select")
    ) {
      $(common.ControlsPrefix.txtState).next("span").remove();
      $(common.ControlsPrefix.txtState).removeClass("errorInput");
      if (common.model.IsZipless == 0) {
        $(common.ControlsPrefix.txtZip).addClass("errorInput");
        // window.swal({
        //     title: "System can't find State based on entered zipcode.Please enter valid zip.", text: "",
        //     timer: 4000, type: "error", showConfirmButton: false, customClass: 'swal-nobutton swal-white-greenbtn googlecontrolalert',
        // }, function (isConfirm) {
        //     window.swal.close();
        // });
      } else {
        $(common.ControlsPrefix.txtState).addClass("errorInput");
        $(common.ControlsPrefix.txtState).after(
          '<span id="rfv' +
            common.ControlsPrefix.txtState.replace("#", "") +
            '" class="requiredErrorText" style="color:Red;">required</span>'
        );
      }
      return false;
    }
    if (common.model.IsZipless == 1) {
      $(common.ControlsPrefix.txtZip).val("");
    }
    GetCity();
    return false;
  };
  var GetCity = () => {
    var Zip = $(common.ControlsPrefix.txtZip).val();
    var CountryID = common.model.CountryId;
    if ((Zip != "" || common.model.IsZipless == 1) && CountryID > 0) {
      var getCityParams = {};
      getCityParams.CountryID = parseInt(common.model.CountryId);
      getCityParams.StrZipCode = $(common.ControlsPrefix.txtZip).val().trim();
      getCityParams.City = $(common.ControlsPrefix.txtCity).val().trim();
      getCityParams.StateName = $(common.ControlsPrefix.txtState).val().trim();
      getCityParams.Address =
        $(common.ControlsPrefix.txtStreet).val().trim() +
        " " +
        $(common.ControlsPrefix.txtCity).val().trim() +
        " " +
        $(common.ControlsPrefix.txtState).val().trim() +
        " " +
        $(common.ControlsPrefix.txtZip).val().trim();
      getCityParams.IsStateless = common.model.IsStateless == 1 ? true : false;
      getCityParams.CountryCode =
        common.model.countryMapForAPI[common.model.CountryId];
      // ajax(GetCoreAPIURLWithToken(common.ApiURLEnum.getStateCode), getCityParams, GetCityByZipCode_Success, GetCityByZipCode_Failure, false, false, true);
      AjaxServiceV1(
        ApiURLEnum.getStateCode,
        getCityParams,
        function onSuccess(data) {
          try {
            if (data != null && data.data != null && data.data.Data != null) {
              GetCityByZipCode_Success(data.data.Data);
            }
          } catch (error) {
            GetCityByZipCode_Failure();
          }
        },
        function OnError() {
          GetCityByZipCode_Failure();
        }
      );
    }
  };
  var GetCityByZipCode_Success = (data) => {
    //if (data.CustomCode == 1000) {
    var strReturnVal = data;
    if (!isNullOrUndefineOrBlank(strReturnVal)) {
      $(common.ControlsPrefix.ddlState).html("");
      $(common.ControlsPrefix.ddlState).html(
        '<option value="0">Select</option>'
      );
      settings.AddressData = {};
      settings.AddressData.address = $(common.ControlsPrefix.txtStreet)
        .val()
        .trim();
      settings.AddressData.city = $(common.ControlsPrefix.txtCity).val().trim();
      settings.AddressData.state = $(common.ControlsPrefix.txtState)
        .val()
        .trim();
      settings.AddressData.zip = $(common.ControlsPrefix.txtZip).val().trim();
      settings.AddressData.country = common.model.CountryId;
      settings.AddressData.address2 = $(common.ControlsPrefix.txtStreet1)
        .val()
        .trim();
      openCloseAddresspopup();
      var City = strReturnVal.split("|")[0];
      var State = strReturnVal.split("|")[1] * 1;
      var stateText = strReturnVal.split("|")[2];
      if (City != "") {
        settings.AddressData.city = City;
        $(common.ControlsPrefix.txtCity).removeClass("errorInput").val(City);
        $(common.ControlsPrefix.txtCity).next("span").css("display", "none");
      }
      if (isNullOrUndefineOrBlank(stateText) == false) {
        settings.AddressData.state = stateText;
        settings.AddressData.stateId = State;
        $(common.ControlsPrefix.ddlState).val(State);
        settings.AddressData.stateCode = strReturnVal.split("|")[3];
      }
      setAddressInSearchBox(true);
    } else {
      // window.swal({ title: "Wrong Address.", text: "", type: "", timer: 6000, showCancelButton: false, confirmButtonColor: "#eb6663", customClass: 'sweet-alert-model auto-footer-btton ' });
    }
    //}
  };
  var GetCityByZipCode_Failure = (Err) => {
    // window.swal({
    //     title: common.model.errorMessage, text: "",
    //     timer: 4000, type: "", showConfirmButton: false, customClass: 'swal-nobutton sweet-alert-model auto-footer-btton',
    // }, function (isConfirm) {
    //     window.swal.close();
    // });
  };
  var CheckGlobalCountryList = () => {
    if (
      typeof window._glbPluginCountryListReactReact == "undefined" ||
      window._glbPluginCountryListReact == null ||
      Object.keys(window._glbPluginCountryListReact).length == 0
    ) {
      return false;
    }
    return true;
  };
  var SetPlaceHolder = () => {
    if(settings.DefaultValue.length != 0 ){
      $(common.ControlsPrefix.dvWrap + " :input[type='text']").prop(
        "placeholder",
       settings.DefaultValue
      );
    }
    if (common.model.CountryId == 2) {
      $(common.ControlsPrefix.dvWrap + " :input[type='text']").prop(
        "placeholder",
        common.model.addressPlaceHolderUKOnly
      );
    } else {
      $(common.ControlsPrefix.dvWrap + " :input[type='text']").prop(
        "placeholder",
        common.model.addressPlaceHolder
      );
    }
  };
  Init();
  var publicMethod = {
    setAddressData: function (addressData) {
      settings.AddressData = addressData;
      SetAddressIntoSearchBox();
    },
    getAddressData: function () {
      if (Object.keys(settings.AddressData).length == 0) {
        settings.AddressData.country = common.model.CountryId;
        settings.AddressData.address = "";
        settings.AddressData.address2 = "";
        settings.AddressData.city = "";
        settings.AddressData.state = "";
        settings.AddressData.zip = "";
      }
      // settings.AddressData.IsReturnCountryID = settings.IsReturnCountryID;
      if (!isNullOrUndefineOrBlank(settings.AddressData.country)) {
        settings.AddressData.countryName =
          common.model.countryName[settings.AddressData.country];
        settings.AddressData.countryCode =
          common.model.countryMapForAPI[settings.AddressData.country];
      }
      return settings.AddressData;
    },
    validateAddressData: function (IsAddManualAddress = false) {
      var selectedaText = settings.Control.select2("data")[0].text;

      if (selectedaText.trim() != "" || IsAddManualAddress == true) {
        if (
          (Object.keys(settings.AddressData).length == 0 ||
          isNullOrUndefineOrBlank(settings.AddressData.city) ||
          settings.AddressData.state === undefined
            ? isNullOrUndefineOrBlank(settings.AddressData.stateName)
            : (isNullOrUndefineOrBlank(settings.AddressData.state) &&
                common.model.IsStateless == 0) ||
              (isNullOrUndefineOrBlank(settings.AddressData.zip) &&
                common.model.IsZipless == 0) ||
              settings.AddressData.street === undefined
            ? isNullOrUndefineOrBlank(settings.AddressData.address)
            : isNullOrUndefineOrBlank(settings.AddressData.street)) ||
          IsAddManualAddress == true
        ) {
          if (IsAddManualAddress == true) {
            $("#mycountryPopupsubTitle" + settings.ControlId).html("");
            $("#mycountryPopupTitle" + settings.ControlId).html(
              "Change Address"
            );
            settings.IsAddManualAddress = IsAddManualAddress;
          }
          GetState();
          ChangeCountry(common.model.CountryId);
          openCloseAddresspopup(1);
          return false;
        }
      } else if (settings.IsAddressRequired) {
        // $(common.ControlsPrefix.addressControl).addClass('errorInput');
        $("#dvWrap" + settings.ControlId).addClass("errorInput-add");
        if (settings.onAddressChange != null) {
          settings.onAddressChange(selectedAddress,selectedAddressValue);
        }

        return false;
      } else {
        settings.AddressData = {};
        $(common.ControlsPrefix.txtZip).val("");
        $(common.ControlsPrefix.txtCity).val("");
        $(common.ControlsPrefix.txtStreet).val("");
        $(common.ControlsPrefix.txtStreet1).val("");
        $(common.ControlsPrefix.txtState).val("");
      }
      return true;
    },

    setDisabledControl: function (IsDisabled) {
      settings.IsDisabled = IsDisabled;
      settings.IsDisabledAddress = IsDisabled; 
      $(common.ControlsPrefix.addressControl).attr("disabled", IsDisabled);
      $(common.ControlsPrefix.ddlMainCountry).attr("disabled", IsDisabled);
      $(common.ControlsPrefix.ddlPopupCountry).attr("disabled", IsDisabled);
      var countryFlag = common.model.countryFlag[common.model.CountryId];
      $(common.ControlsPrefix.AddressControllerCountry).removeClass();
      $(common.ControlsPrefix.AddressControllerCountry).addClass(
        "selectedcountry " +
          (IsDisabled == true ? "select2-container-disabled " : "") +
          countryFlag
      );
    },
    
    setDisabledAddress: function (IsDisabledAddress){
      settings.IsDisabledAddress = IsDisabledAddress; 
      $(common.ControlsPrefix.addressControl).attr("disabled", IsDisabledAddress);
      $(common.ControlsPrefix.ddlMainCountry).attr("disabled", IsDisabledAddress);
      $(common.ControlsPrefix.ddlPopupCountry).attr("disabled", IsDisabledAddress);
      var countryFlag = common.model.countryFlag[common.model.CountryId];
      $(common.ControlsPrefix.AddressControllerCountry).removeClass();
      $(common.ControlsPrefix.AddressControllerCountry).addClass(
        "selectedcountry " +
          (IsDisabledAddress == true ? "select2-container-disabled " : "") +
          countryFlag
      );
    },

    setDisabledCountry: function (IsDisabled) {
      settings.DisabledCountry = IsDisabled;
      settings.IsReturnCountryID = IsDisabled;
      $(common.ControlsPrefix.ddlMainCountry).attr("disabled", IsDisabled);
      $(common.ControlsPrefix.ddlPopupCountry).attr("disabled", IsDisabled);
      var countryFlag = common.model.countryFlag[common.model.CountryId];
      $(common.ControlsPrefix.AddressControllerCountry).removeClass();
      $(common.ControlsPrefix.AddressControllerCountry).addClass(
        "selectedcountry " +
          (IsDisabled == true ? "select2-container-disabled " : "") +
          countryFlag
      );
    },
    setAddressTwoData: function (address2) {
      settings.AddressData.address2 = address2;
      $(common.ControlsPrefix.txtStreet1).val(settings.AddressData.address2);
    },
    onChangeValidateControl: function () {
      if (settings.onAddressChange != null) {
        settings.onAddressChange(selectedAddress, selectedAddressValue);
      }
    },
    openSelect2: () => {
      if($('.vg-test-address').hasClass("select2-hidden-accessible")){
        settings.Control.select2('open')
      }
    },
    closeSelect2: () => {
      if($('.vg-test-address').hasClass("select2-hidden-accessible")){
        settings.Control.select2('close')
      }
    },
    setDefaultValue: (val) => {
      settings.Control.val([val]).trigger('change')
      selectedAddressValue = val
      setTimeout(() => {
        settings.Control.trigger("select2:opening");
        }, 50)
    },
    updateAddressData: (val) => {
      settings.Control.val([val.Address]).trigger("change")
      selectedAddress = val
      settings.AddressData=val
      selectedAddressValue=val.Address
      setTimeout(() => {
      settings.Control.trigger("select2:opening");
      }, 50)
    },
    updateCountry:(val) => {
      $(common.ControlsPrefix.ddlMainCountry).val(val).trigger('select2:select')
      common.model.CountryId=val;
      selectCountry(val, "0"); 
      setTimeout(() => {
        $(common.ControlsPrefix.ddlMainCountry).trigger("change");
        }, 50)
    },
    clearAddressData:() => {
      settings.Control.val([]).trigger('change')
      settings.DefaultValue = ''
      clearAddressValue()
      selectedAddress = {}
      selectedAddressValue=''
      setTimeout(() => {
        settings.Control.trigger("select2:opening");
      }, 50)
      setTimeout(() => {
        settings.Control.trigger("select2:closing");
      }, 100)
    },
    
  };

  
$(document).on("click", function (event) {
  try {
    // if (settings.IsDisabled) {
    //   return;
    // }
    var isDisabled = $("#AddressControllerCountry" + searchTextBox).data(
      "isdisabled"
    );
    if (isDisabled) {
      return;
    }
    if ($(event.target).is(".selectedcountry") === false) {
      if ($(".countryselectoption").length > 0) {
        $(".countryselectoption").hide();
      }
    }
    if ($(event.target).is(".select2-container") === false) {
      if ($(".select2-dropdown-open").length > 0) {
        $(".select2-dropdown-open").select2("close");
      }
    }
  } catch (e) {}
});
  return publicMethod;
};

window.AddressCallBackOpen = () => {
  const openSelect2 = $(".select2-container--open");
  if (openSelect2.length > 0) {
    const selectId = openSelect2.prev("select").attr("id");
    $("#" + selectId).select2("close");
  }
};

export { GoogleAddressPlugin };

//This Comment is for Bundle creation purpose only.
