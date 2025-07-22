import React, { Fragment, useRef, useState, useEffect } from "react";
import VgInput from "../VgTextbox/VgTextbox";
import VgButton from "../VgButton/VgButton";
import VgTextarea from "../VgTextarea/VgTextarea";
import VgCheckbox from "../VgCheckbox/VgCheckbox";
import VgDatePicker from "../VgDatePicker/VgDatePicker";
import VgTimePicker from "../VgTimePicker/VgTimePicker";
import VgAddressControl from "../VgAddressControl/VgAddressControl";
import VgDateRangePicker from "../VgDateRangePicker/VgDateRangePicker";
import VgImageUploader from "../VgImageUploader/VgImageUploader";
import VgToggle from "../VgToggle/VgToggle";
import VgPhoneControl from "../VgPhoneControl/VgPhoneControl";

import "./VgForm.scss";
import VgBadge from "../VgBadge/VgBadge";
import VgTooltip from "../VgTooltip/VgTooltip";
import VgAvatar from "../VgAvatar/VgAvatar";
import VgBottomSheet from "../VgBottomSheet/VgBottomSheet";
import VgColorPicker from "../VgColorPicker/VgColorPicker";
import VgDropdown from "../VgDropdown/VgDropdown";
import VgLinkControl from "../VgLinkControl/VgLinkControl";
import VgPopup from "../VgPopup/VgPopup";
import VgMapControl from "../VgMapControl/VgMapControl";
import axios from "axios";
import VgSegments from "../VgSegments/VgSegments";
import Svg from "../VgSvg/Svg";
import VgThreeDotMenu from "../VgThreeDotMenu/VgThreeDotMenu";
import VgDragList from "../VgDragList/VgDragList";
import VgStepper from "../VgStepper/VgStepper";
import VgTextEditor from "../VgTextEditor/VgTextEditor";
import VgSmileyInput from "../VgSmileyInput/VgSmileyInput";
import VgLoginInput from "../VgLoginInput/VgLoginInput";
import VgCheckoutCustomerDropdown from "../VgCheckoutCustomerDropdown/VgCheckoutCustomerDropdown";
import VgReviewRating from "../VgReviewRating/VgReviewRating";
import VgRadio from "../VgRadio/VgRadio";
import VgAiPopup from "../VgAiPopup/VgAiPopup";
import VgSearchDropdown from "../VgSearchDropdown/VgSearchDropdown";
import VgSvg from "../VgSvg/VgSvg";

const VgForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const formValidator = useRef<{ [key: string]: any | null }>({});
  const handleClick = (e: any) => {
    e.preventDefault();
    // Manually trigger form validation and access ref values
    const validationResults = Object.keys(formValidator.current).reduce(
      (acc: { [key: string]: any }, key) => {
        const result = formValidator.current[key]?.validate();
        if (result) {
          acc[key] = result;
        }
        return acc;
      },
      {}
    );
    console.log("Form validation results:", validationResults);
  };

  const [show, setShow] = useState(false);

  const defaultOptions = [
    { id: "1", name: "Joe edited 2hfkdshfkds Ford 333 0", selected: true },
    { id: "2", name: "Yash Mathukiya", selected: true },
    { id: "3", name: "Rich@rd^ Miller", selected: true },
    { id: "4", name: "Harischandra ?", selected: false },
    { id: "5", name: "Mayur Multi Provider", selected: false },
    { id: "6", name: "emp10 10", selected: false },
    { id: "7", name: "John20 Lewish", selected: false },
    { id: "8", name: "tick ettest", selected: false },
    { id: "9", name: "Owner Owner", selected: false },
    { id: "10", name: "SP Sync Employee", selected: false },
  ];

  const handleAIClick = async () => {
    const response = await axios(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response.data);
    setShow(true);
  };

  let RawData = [
    {
      label: "Colours",
      options: [
        {
          color: "#00B8D9",
          label: "Ocean",
          value: "ocean",
        },
        {
          color: "#0052CC",
          label: "Blue",
          value: "blue",
        },
        {
          color: "#5243AA",
          label: "Purple",
          value: "purple",
        },
        {
          color: "#FF5630",
          label: "Red",
          value: "red",
        },
        {
          color: "#FF8B00",
          label: "Orange",
          value: "orange",
        },
        {
          color: "#FFC400",
          label: "Yellow",
          value: "yellow",
        },
        {
          color: "#36B37E",
          label: "Green",
          value: "green",
        },
        {
          color: "#00875A",
          label: "Forest",
          value: "forest",
        },
        {
          color: "#253858",
          label: "Slate",
          value: "slate",
        },
        {
          color: "#666666",
          label: "Silver",
          value: "silver",
        },
      ],
    },
    {
      label: "Flavours",
      options: [
        {
          label: "Vanilla",
          rating: "safe",
          value: "vanilla",
        },
        {
          label: "Chocolate",
          rating: "good",
          value: "chocolate",
        },
        {
          label: "Strawberry",
          rating: "wild",
          value: "strawberry",
        },
        {
          label: "Salted Caramel",
          rating: "crazy",
          value: "salted-caramel",
        },
      ],
    },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmails(e.target.value, confirmEmail);
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
    validateEmails(email, e.target.value);
  };

  const validateEmails = (emailValue: string, confirmEmailValue: string) => {
    if (emailValue && confirmEmailValue && emailValue !== confirmEmailValue) {
      setError("Emails do not match");
    } else if (emailValue === confirmEmailValue) {
      setError("");
    } else {
      setError("");
    }
  };

  const [dropdownData, setDropdownData] = useState<DropdownGroup[]>([]);
  const [defaultValue, setDefaultValue] = useState<DropdownOption[]>([]);
  const [Loading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Add a pageSize constant
  const PAGE_SIZE = 10; // Adjust based on your API's page size

  const fetchUsers = async (page: number, searchTerm: any = "") => {
    try {
      setIsLoading(true);

      const searchQuery = searchTerm ? `&name_like=${searchTerm}` : "";

      // Add limit and proper pagination parameters
      const response = await fetch(
        `https://67a5ed83510789ef0df9c505.mockapi.io/api/users?page=${page}&limit=${PAGE_SIZE}${searchQuery}`
      );

      const users: User[] = await response.json();

      // Check if we've reached the end of the data
      if (users.length < PAGE_SIZE) {
        setHasMore(false);
      }

      // If no users returned on first page
      if (users.length === 0 && page === 1) {
        setDropdownData([]);
        setHasMore(false);
        return;
      }

      const groupedUsers = users.reduce<Record<string, DropdownGroup>>(
        (acc, user) => {
          const companyName = user?.title;

          if (!acc[companyName]) {
            acc[companyName] = {
              label: companyName,
              options: [],
            };
          }

          // Check for duplicate entries before adding
          const isDuplicate = acc[companyName].options.some(
            (option) => option.value === user.id.toString()
          );

          if (!isDuplicate) {
            acc[companyName].options.push({
              label: user.title,
              value: user.id.toString(),
            });
          }

          return acc;
        },
        {}
      );

      const formattedData: DropdownGroup[] = Object.values(groupedUsers);

      setDropdownData((prev) => {
        if (page === 1) return formattedData;

        // Merge new data with existing data, preventing duplicates
        const merged = [...prev];
        formattedData.forEach((newGroup) => {
          const existingGroupIndex = merged.findIndex(
            (g) => g.label === newGroup.label
          );
          if (existingGroupIndex === -1) {
            merged.push(newGroup);
          } else {
            // Merge options, preventing duplicates
            newGroup.options.forEach((newOption) => {
              if (
                !merged[existingGroupIndex].options.some(
                  (existing) => existing.value === newOption.value
                )
              ) {
                merged[existingGroupIndex].options.push(newOption);
              }
            });
          }
        });
        return merged;
      });

      // Set default value only on first load
      if (
        page === 1 &&
        formattedData.length > 0 &&
        formattedData[0].options.length > 0
      ) {
        setDefaultValue([formattedData[0].options[0]]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load dropdown options");
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };
  type AiPopupState = {
    Index: number;
    InputDescription: string;
    Tone: string;
    Range: number;
  };
  const [aiPopupState, setAiPopupState] = useState<AiPopupState>({
    Index: 2,
    InputDescription:
      "I am salon professional The issue arises from the fact that when you're updating the history in your",
    Tone: "casual",
    Range: 25,
  });
  const handleAiUseThisText = (e :any, data: any) => {
    setAiPopupState(data); // Save the whole object
  };
  const [filteredBrands, setFilteredBrands] = useState([
    {
        "brandId": "gOB~VCKJpCoWTldJ08OU3A==",
        "brandName": "Moroccanoil",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "61OvYCnJAJlj2bmMo9XiQg==",
        "brandName": "Tea Trees",
        "brandLogo": "https://xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "ygRRgmq8DkOdJ8FYKNNHmw==",
        "brandName": "BA01",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "~nMF0Jt11OKNXTH9yWqd5w==",
        "brandName": "TIGI",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "qao~1Glc-EtUGG3coCQQPA==",
        "brandName": "Babe Original",
        "brandLogo": "https://cb8c8a72ed71ca0a82a9-7c36c7887cbbfd6487d1b53a94ffabce.ssl.cf2.rackcdn.com/Compressed/xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "4780uDd0gSRalHLDHBYctQ==",
        "brandName": "StyleCraft",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "zBInQm48WJRVxS5-2EI~3aA2TLfy1nVsYNFPp6zWFyM=",
        "brandName": "Kenra Professional",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "Mu5anwmYoec92~5MbFrswA==",
        "brandName": "Wella",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "GciYc5iEsKDdLMRpEidswQ==",
        "brandName": "Sebastian",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "ddBY7Mgw4lJ9NjxQM~VH9Q==",
        "brandName": "GIBSGrooming",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "xFDjiJkDDjLuoqCG9QOWjQ==",
        "brandName": "Bain de Terre",
        "brandLogo": "https://cb8c8a72ed71ca0a82a9-7c36c7887cbbfd6487d1b53a94ffabce.ssl.cf2.rackcdn.com/Compressed/xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "ePRsOxUeaz5PMivQU99w8g==",
        "brandName": "Aquage",
        "brandLogo": "https://cb8c8a72ed71ca0a82a9-7c36c7887cbbfd6487d1b53a94ffabce.ssl.cf2.rackcdn.com/Compressed/xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "C0wvcG3SAR61Cs0ZMyOk4w==",
        "brandName": "ItsA10",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "5XAdnxTIE0D3bYpKIsLdbg==",
        "brandName": "ION",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "AiqM64nw3fce5341BnlHNQ==",
        "brandName": "STMNT Grooming",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "gDzNG8PlAYeDh3A-dQ7j~w==",
        "brandName": "American Crew",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "EsApRA6DK~aMxtIyEI~PIoDmATkU9rJ4vs~nQ2CsKjg=",
        "brandName": "Design Essentials",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "P-~b4vndAv~TE7nvybqukpF7hBQlju0FzA7UIpT3U94=",
        "brandName": "JohnPaulMitchellSystems",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "Ogresyc42vzH5VSm6PJSE3w7v15-0HmoR5u8Cqj9Vlg=",
        "brandName": "ACTiiV Hair Science",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "-wKsZr0ex--e2EgE39TWkQ==",
        "brandName": "Gamma",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "rn1Csjq4crVqPL5ncthVpA==",
        "brandName": "Joico",
        "brandLogo": "https://cb8c8a72ed71ca0a82a9-7c36c7887cbbfd6487d1b53a94ffabce.ssl.cf2.rackcdn.com/Compressed/xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "kWmkVmg2a0p39HAS-97HeA==",
        "brandName": "GIBS Grooming",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "KGUsb9LKzvweG8W6xJK2Pg==",
        "brandName": "BA02",
        "brandLogo": "https://cb8c8a72ed71ca0a82a9-7c36c7887cbbfd6487d1b53a94ffabce.ssl.cf2.rackcdn.com/Compressed/xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "WyG4BaX6ws77liEcVyXzAg==",
        "brandName": "Maria Nila",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "OUWXn-q9arBDBOPgRSHAZg==",
        "brandName": "AG Care",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "9GQhWlolvN8AHLtJMO84qQ==",
        "brandName": "Deva Curl",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "xnOxf~pKSvttk2s85k8nFQ==",
        "brandName": "Gibs Grooming",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "RjMsly5Xg9rwKn6PlXwhug==",
        "brandName": "Framesi",
        "brandLogo": "https://170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "ktgqypvDviXKYWuvo8u5xw==",
        "brandName": "Babe Lash",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "A4u5P~dsjwgisB2C6NjJqw==",
        "brandName": "Farouk",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "DsFm4vNtvppswZiQiHvC7g==",
        "brandName": "Its A 10",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "67vTWlm15syM6ye0ZBm5qQ==",
        "brandName": "OPI",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "CUIjZiq1UQmquoAejyfhjw==",
        "brandName": "Olaplex",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "UC~vtikttWezjfEkpxYagQ==",
        "brandName": "Reuzel",
        "brandLogo": "https://cb8c8a72ed71ca0a82a9-7c36c7887cbbfd6487d1b53a94ffabce.ssl.cf2.rackcdn.com/Compressed/xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "R74Mief8CDozGZgJ3DxOeQ==",
        "brandName": "It's A 10",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "hZ2fvoVbxPJRJmKMWabeuA==",
        "brandName": "Framar",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "lF4-sjj5fG5XDlCOGveTcw==",
        "brandName": "CHI",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "ZxEh3twsFogTZ3zWCt174A==",
        "brandName": "AGCare",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "NAM6yqlspZ4WSG1eMw5KCTM5sQkNe0j6gNUIetRCVQw=",
        "brandName": "John Paul Mitchell Systems",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "SHbxFBshoD6EKzskHMbCJA==",
        "brandName": "Nioxin",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    },
    {
        "brandId": "foRZqzxmNQFrTI0rH9vfuw==",
        "brandName": "Gamma+",
        "brandLogo": "https://cb8c8a72ed71ca0a82a9-7c36c7887cbbfd6487d1b53a94ffabce.ssl.cf2.rackcdn.com/Compressed/xIKwz_temp_42513285_97772_$2018_08_07_08_46_16_7568.jpg",
        "isChecked": false
    },
    {
        "brandId": "GlF6Jda5Rz4zc9aEU8jMVA==",
        "brandName": "Redavid",
        "brandLogo": "https://2efac3f8aebd351685e1-1a3cc339982c985adb3ef4a185513054.ssl.cf2.rackcdn.com/Compressed/pErrJ_temp_34766493_92976_$2023_03_14_08_41_33_9257.png",
        "isChecked": false
    },
    {
        "brandId": "KJbOBIr3IVp82LPGYbOstw==",
        "brandName": "Olivia Garden",
        "brandLogo": "https://5b04a1936076088ff38a-a58938477f22e28449a13426c6c46884.ssl.cf2.rackcdn.com/Compressed/170615148_325069$2024_05_23_01_31_06_2068.png",
        "isChecked": false
    }
]);
  // Handle brand checkbox changes
  const handleBranchCheckboxChange = (brandId: string, isChecked: boolean) => {
    setFilteredBrands(prevBrands =>
      prevBrands.map(brand =>
        brand.brandId === brandId
          ? { ...brand, isChecked }
          : brand
      )
    );
  };

  // Update scroll handler to prevent unnecessary fetches
  const handleScrollPagination = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;

    // Only fetch more if we're near the bottom and not already loading
    if (
      !Loading &&
      hasMore &&
      scrollHeight - scrollTop <= clientHeight + 100 // 100px threshold
    ) {
      setPage((prev) => prev + 1);
    }
  };

  // Reset pagination when search term changes
  const handleSearch = (searchTerm: string) => {
    setPage(1);
    setHasMore(true);
    fetchUsers(1, searchTerm);
  };

  // Initial data fetch
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handkeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const min = 0;
    const max = 100;
    const inputValue = e.currentTarget.value;
    let newValue = parseInt((inputValue as any) || 0, 10);

    if (e.key === "ArrowDown") {
      newValue = newValue - 1 < min ? min : newValue - 1;

      // Increase value on ArrowDown
    } else if (e.key === "ArrowUp") {
      // Decrease value on ArrowUp
      newValue = newValue + 1 > max ? max : newValue + 1;
    }
  };

  // --- VgSearchDropdown API integration ---
  const [searchDropdownOptions, setSearchDropdownOptions] = useState<any[]>([]);
  const [searchDropdownLoading, setSearchDropdownLoading] = useState(false);
  const [searchDropdownError, setSearchDropdownError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      setSearchDropdownLoading(true);
      setSearchDropdownError(null);
      try {
        const response = await fetch(
          "https://675a87ad099e3090dbe4f331.mockapi.io/sidebarservices/ImageDropdown"
        );
        const data = await response.json();
        // Transform API data to VgSearchDropdown format
        const formatted = data.map((group: any) => ({
          group: group.group,
          options: group.options.map((opt: any) => ({
            label: opt.label,
            value: opt.value,
          })),
        }));
        setSearchDropdownOptions(formatted);
      } catch (err) {
        setSearchDropdownError("Failed to load options");
      } finally {
        setSearchDropdownLoading(false);
      }
    };
    fetchDropdownOptions();
  }, []);

  return (
    <Fragment>
      <div className="form-container" style={{ display: "none" }}>
        <div className="vgform">
          <div className="fields">
            <div className="field">
              <VgInput
                ref={(data: any) => (formValidator.current["firstName"] = data)}
                LabelPosition="top"
                PlaceHolder="Enter first name"
                TextboxTitle="Full Name:"
                UrlPrefix=""
                Validation="none"
                onBlur={() => {}}
                OnChange={() => {}}
                onFocus={() => {}}
                Required
                TextBoxName="firstName"
              />
            </div>
            <div className="field">
              {/* <VgDropdown
                  ref={(data: any) =>
                    (formValidator.current["dropdown11"] = data)
                  }
                  AutoFocus
                  CallBackTimeCount={0}
                  ClassNamePrefix="vg-select2-dropdown"
                  ClearSelection
                  CustomPlaceholderName="Selected"
                  DefaultValue={[]}
                  DropdownClosingName="Vagaro React Toolkit"
                  DropdownData={RawData}
                  Required={true}
                  DropdownId="DropDown11"
                  DropdownName=""
                  DropdownTitle="Field Title"
                  SearchPlaceholder="Search"
                  DropdownClosed={() => { }}
                  GroupOptions
                  Multi
                  OpenFromBody
                  IsSearchable={false}
                  ShowCheckBoxInGroup
                  ShowCustomMessage="No results found. Please try another search."
                  MenuPlacement="auto"
                  NativeActionValue={13}
                  Placeholder="Select Color"
                  RequiredMessage="This field is required"
                  IsApplyButtonOn={false}
                  RightSwipeEvent={false}
                  SetCustomPlaceholder
                  ShowHideFooter={2}
                  ShowSelectAllSelectNone
                  TabIndex={0}
                  VirtualDropdownHeight={300}
                  onChange={() => { }}
                  VagaroToolkit={1}
                /> */}
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label className="vg-input-label">Date range:</label>
              <VgDateRangePicker
                ButtonPrimary="Submit"
                ButtonSecondary="Clear"
                ButtonThird="Cancel"
                DateFormat="MM DD, YYYY"
                DateRangeName=""
                DateRangePickerId="DateRangePickerId1"
                DateRangePickerPosition=""
                DefaultEndDate="none"
                DefaultOption="This Month"
                DefaultStartDate="today"
                DisabledDates={[]}
                EndDateInputName=""
                IsFromOther={4}
                MaxDate={new Date("2025-12-30T18:30:00.000Z")}
                MinDate={new Date("2024-12-31T18:30:00.000Z")}
                OnBlur={() => {}}
                OnChange={() => {}}
                OnClick={() => {}}
                Placeholder="MM DD, YYYY"
                StartDateInputName=""
                Title="Date Range Picker:"
              />
            </div>
            <div className="field">
              {/* <VgPhoneControl
                  ref={(data: any) =>
                    (formValidator.current["phoneControl"] = data)
                  }
                  CurrentLocation={1}
                  OnChange={() => { }}
                  OnClick={() => { }}
                  OnBlur={() => { }}
                  PlaceHolder="Enter Phone Number"
                  Title="Phone Number"
                  Validation="Default"
                  Required={true}
                  PhoneControlId="phoneControlId"
                  CloseBackTitle="Vagaro React Toolkit"
                  CurrentCountry={1}
                  Footer={2}

                  NativeActionVal={13}
                  TimerCount={1000}
                  VagaroToolkit={1}
                /> */}
            </div>
          </div>
          {/* <div className="field">
              <VgAddressControl
                LableText="Address control"
                ref={(data: any) =>
                  (formValidator.current["addressControl"] = data)
                }
                onSelect={() => {}}
                AddressControlId="addressControl"
                CallBackTimeCount={0}
                CountryDropdownCloseName="Vagaro React Toolkit"
                CountryDropdownOpenName="Select Country"
                NativeActionValue={13}
                PlaceHolderAddressline1="Address Line 1"
                PlaceHolderAddressline2="Address Line 2"
                ShowHideFooter={2}
                EnvironmentUrl=""
                VagaroToolkit={1}
              />
            </div> */}
          <div className="fields">
            <div className="field">
              <label className="vg-input-label">Birth date:</label>
              {/* <VgDatePicker
                  ref={(data: any) =>
                    (formValidator.current["singleDatePicker"] = data)
                  }
                  Country="U.S.A"
                  DatePickerName="singleDatePicker"
                  DatePickerId="empStartDateDiv2"
                  DefaultDate="today"
                  VagaroToolkit={1}
                  isPastDateDisable={false}
                  isFutureDateDisable={true}
                  Disableddates={[]}
                  Maxdate={new Date("2024-12-30T18:30:00.000Z")}
                  Mindate={new Date("2023-12-31T18:30:00.000Z")}
                  Onchange={() => { }}
                  Placeholder="Select Date"
                  EnvironmentUrlDp="https://dev53apiv2.bookitall.com/"
                /> */}
              {/* <VgDatePicker
                  ref={(data: any) =>
                    (formValidator.current["singleDatePicker"] = data)
                  }
                  DefaultDate="today"
                  Disableddates={[]}
                  Highlighteddates={["2024-10-11", "2024-12-25"]}
                  Maxdate={new Date("2024-12-31T00:00:00.000Z")}
                  Mindate={new Date("2023-01-01T00:00:00.000Z")}
                  Onchange={() => {}}
                  VagaroToolkit={1}
                  Placeholder="Select Date"
                  Showclearbutton
                  DateRequired
                  DatePickerName="singleDatePicker"
                  DatePickerId="empStartDateDiv"
                /> */}
            </div>
            <div className="field">
              <VgTimePicker
                ref={(data: any) =>
                  (formValidator.current["timePicker"] = data)
                }
                Title="Select Time:"
                TimePickerId="TimePickerId1"
                Required
                VagaroToolkit={1}
              />
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label className="vg-input-label">Badge:</label>
              <VgBadge
                BadgeText=" Input Badge"
                BadgeVariation="positive"
                // OnClick={() => {}}
              />
              <VgBadge
                BadgeText=" Input Badge"
                BadgeVariation="warning"
                // OnClick={() => {}}
              />
            </div>
            <div className="field">
              <label className="vg-input-label">Tooltip:</label>
              <VgTooltip TooltipText="This is a tooltip message!" />
            </div>
          </div>
          <div className="fields">
            <div className="field">
              {/* <VgTextarea
                  ref={(data: any) =>
                    (formValidator.current["textAreaDetails"] = data)
                  }
                  TextareaVariant="Default"
                  onChange={() => {}}
                  TextareaValue=""
                  TextAreaDisable={false}
                  Label
                  LabelText="Details"
                  TextAreaId="textAreaDetails34"
                  AiControlId='AiControlId2'
                  Error
                /> */}
            </div>
          </div>
          <div className="field">
            <VgToggle
              ref={(data: any) => (formValidator.current["activate"] = data)}
              Color="#3e8438"
              Description="Customers will be able to view email and phone number contact information on Vagaro.com."
              OnChange={() => {}}
              OnClick={() => {}}
              ToggleVariation="WithDescription"
              Title="Show Contact Email and Phone on Vagaro.com"
              ToggleId={"activate"}
            />
          </div>
          <div className="fields">
            <div className="field">
              <label className="vg-input-label">Checkbox:</label>
              <ul className="chekcbox-group">
                <li>
                  <VgCheckbox
                    ref={(data: any) =>
                      (formValidator.current["meteredparking"] = data)
                    }
                    id={"Check-Box1"}
                    CheckboxLabel="Metered parking"
                    CheckboxVariation="Checkbox-Simple"
                    LableDescription="Checkbox Description goes here"
                    OnChange={() => {}}
                    CheckBoxName="meteredparking"
                  />
                </li>
                <li>
                  <VgCheckbox
                    ref={(data: any) =>
                      (formValidator.current["freeparking"] = data)
                    }
                    id={"Check-Box2"}
                    CheckboxLabel="Free parking"
                    CheckboxVariation="Checkbox-Simple"
                    LableDescription="Checkbox Description goes here"
                    OnChange={() => {}}
                    CheckBoxName="freeparking"
                  />
                </li>
                <li>
                  <VgCheckbox
                    ref={(data: any) =>
                      (formValidator.current["evcharger"] = data)
                    }
                    id={"Check-Box3"}
                    CheckboxLabel="EV Charger"
                    CheckboxVariation="Checkbox-Simple"
                    LableDescription="Checkbox Description goes here"
                    OnChange={() => {}}
                    CheckBoxName="evcharger"
                  />
                </li>
              </ul>
            </div>
            <div className="field">
              <label className="vg-input-label">Avatar:</label>
              <VgAvatar
                NoProfile="Keshvi Latiwala"
                ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
              />
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label className="vg-input-label">Image Uploader:</label>
              <VgImageUploader
                ImageUploaderId=""
                IsEditor
                MaxFileSize={4}
                Name=""
                OnChange={() => {}}
                SupportedFileFormate={[
                  "image/jpeg",
                  "image/png",
                  "image/heic",
                  "image/jpg",
                ]}
                ImagePosition="Internal"
              />

              <VgImageUploader
                ImageUploaderId=""
                IsEditor
                MaxFileSize={4}
                Name=""
                OnChange={() => {}}
                SupportedFileFormate={[
                  "image/jpeg",
                  "image/png",
                  "image/heic",
                  "image/jpg",
                ]}
                ImagePosition="Internal"
              />
            </div>
            <div className="field">
              <label className="vg-input-label">
                Bottom sheet working only in mobile view:
              </label>

              <VgBottomSheet
                BottomsheetData={[
                  {
                    action: "editProfile",
                    name: "Edit Profile",
                  },
                  {
                    action: "editPasswordSecurity",
                    name: "Edit Password & Security",
                  },
                  {
                    action: "viewHours",
                    name: "Hours",
                  },
                  {
                    action: "viewServices",
                    name: "Services",
                  },
                  {
                    action: "shareCalendar",
                    name: "Share Calendar",
                  },
                  {
                    action: "rentCollection",
                    name: "Rent Collection",
                  },
                  {
                    action: "deactivateEmployee",
                    name: "Deactivate Employee",
                  },
                  {
                    action: "disableOnlineBooking",
                    name: "Disable Online Booking",
                  },
                  {
                    action: "transferEmployeeData",
                    name: "Transfer Employee Data",
                  },
                  {
                    action: "deleteEmployee",
                    name: "Delete",
                  },
                ]}
                CloseBackTitle="Vagaro React Toolkit"
                Description="Replace this component with a custom local component that contains your Action content."
                Footer={2}
                Id={4}
                NativeAction={13}
                TimerCount={1000}
                VagaroToolkit={1}
                BottomSheetId="BottomSheetId"
              />
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label className="vg-input-label">Link Control:</label>
              <VgLinkControl
                LinkControlText="Link Control"
                URL=""
                UnderLine="none"
              />
            </div>
            <div className="field">
              <label className="vg-input-label">Popup:</label>
              <VgPopup
                ButtonPrimary="Primary"
                ButtonSecondary="Secondary"
                CloseBackTitle="From Control"
                CloseButton
                Footer={2}
                FooterButton="both"
                Popupopen={false}
                OnClickPrimary={() => {}}
                OnClickSecondary={() => {}}
                PopupBody={() => {}}
                PopupId="PopupId"
                PopupTitle="Popup Title Content Here"
                Size="small"
                TimerCount={0}
                VagaroToolkit={1}
                onClose={() => {}}
              />
            </div>
          </div>
          <div className="fields">
            <div className="field">
              <label className="vg-input-label">Color Picker:</label>
              {/* <VgColorPicker
                  CloseBackTitle=""
                  ColorPickerId=""
                  Footer={0}
                  NativeActionVal={0}
                  OnChange={() => {}}
                  TimerCount={0}
                  Title="Color Picker"
                  VagaroToolkit={1}
                /> */}
            </div>
          </div>
          {/* <div className="fields-action">
              <VgButton
                ButtonText="Cancel"
                ButtonVariant="secondary"
                ButtononClick={handleClick}
                IconPlacement="prefix"
                ValidForm={true}
              />
              <VgButton
                ButtonText="Save"
                ButtonVariant="primary"
                ButtononClick={handleClick}
                IconPlacement="prefix"
                ValidForm={true}
                FormValidations={formValidator.current}
              />
            </div> */}
        </div>
      </div>

      {/* Employee Profile Design end*/}

      <div className="vg-reacttk">
        <div className="vg-section-title">Personal Information</div>
        <div className="emp-profile-form-wrap">
          <div className="emp-profile-form">
            <div className="emp-form-row">
              <div className="emp-col-6 mb-3">
              <VgDropdown
  AddOptionButtonText="sdc"
  ApiRequestParams={{
    ChildIdKey: '',
    ChildTitleKey: '',
    dataKey: 'data.brands',
    headers: {
      'Content-Type': 'application/json',
      ac_tkn: '',
      accept: 'application/json',
      'accept-language': 'en-US',
      'cache-control': 'no-cache',
      employeeid: 's1OHm55HTnWmUg8RcYbyrg==',
      merchantid: 'q3Vf9lrABcqgyMpc4kBJ7w==',
      origin: 'https://dev50.bookitall.com',
      pragma: 'no-cache',
      priority: 'u=1',
      referer: 'https://dev50.bookitall.com/',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': 'Windows',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      userid: 's1OHm55HTnWmUg8RcYbyrg=='
    },
    method: 'GET',
    nestedChildObject: '',
    parentChildRelationshipName: 'parentId',
    parentIdKey: 'id',
    parentTitleKey: 'name',
    responseType: 'Single',
    totalCountKey: 'data.count'
  }}
  ApiUrl="https://dev50apiv2.bookitall.com/us02/api/v2/merchants/inventory/brands?&IsBusinessUsedBrand=true&VendorId="
  AutoFocus
  CallBackTimeCount={0}
  ChildCheckbox
  ClassNamePrefix="vg-select2-dropdown"
  CloseCallback={() => {}}
  CustomClassNamePrefix="custom-class"
  CustomPlaceholderName="Selected"
  DefaultValue={[]}
  DropdownClosed={() => {}}
  DropdownClosingName=""
  DropdownId=""
  DropdownName=""
  DropdownPlaceholder="Select Color Options"
  DropdownTitle="Field Title"
  GroupOptions
  InfoTooltipMessage=""
  MenuPlacement="auto"
  Multi
  NativeActionValue={13}
  OnClickOutside={() => {}}
  OnOptionButtonClick={() => {}}
  OnScrollPagination={() => {}}
  OnSearchForApi={() => {}}
  OnValidation={() => {}}
  OpenFromBody
  RecordsPerPage={10}
  RequiredMessage="This field is required"
  RightSwipeEvent
  ScrollPagination
  SearchPlaceholder="Search"
  Searchable
  SelectedIds={[
    -1
  ]}
  SetBottomSheetDropdown
  SetCustomPlaceholder
  ShowCheckBoxInGroup
  ShowCustomMessage="No results found. Please try another search."
  ShowHideFooter={2}
  ShowSelectAllSelectNone
  TabIndex={0}
  VagaroToolkit={1}
  VirtualDropdownHeight={300}
  onChange={() => {}}
/>
<VgCheckbox
  IsCheck
  CheckBoxId="asdasd"
  CheckboxLabel="Checkbox123"
  CheckboxVariation="Checkbox-Simple"
  Name=""
  OnChange={(e) => {console.log(e,"gfdgdfg")
    alert("Checkbox123 clicked")
  }}
  OnHover={() => {}}
  SetValue = {false}
/>
<VgCheckbox
 IsCheck={true}   
  CheckBoxId="as6546dasd"
  CheckboxLabel="Checkbox345"
  CheckboxVariation="Checkbox-Simple"
  Name=""
  OnChange={(e) => {console.log(e,"gfdgdfg")}}
  OnHover={() => {}}
  SetValue = {false}
/>
<VgCheckbox
 IsCheck={true}   
  CheckBoxId="as7878dasd"
  CheckboxLabel="Checkbox678"
  CheckboxVariation="Checkbox-Simple"
  Name=""
  OnChange={(e) => {console.log(e,"gfdgdfg")}}
  OnHover={() => {}}
  SetValue = {false}
/>
                <VgInput
                  ref={(data: any) => (formValidator.current["url"] = data)}
                  InfoTooltipMessage=""
                  InputId="input1"
                  InputMode="none"
                  InputTitle="Url:"
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  PlaceHolder=""
                  PrefixIcon="none"
                  EnableOnChangeValidation={false}
                  RegexErrorMessage="Invalid Url"
                  RegexPattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,9}(:[0-9]{1,5})?(\/.*)?$"
                  SetValue=""
                  SuffixIcon="none"
                  Type="text"
                  UrlPrefix="www.vagaro.com/"
                  Validation="regex"
                  max={100}
                  min={0}
                  Required
                />
              </div>
              <div className="emp-col-6 mb-3">
                <VgInput
                  ref={(data: any) => (formValidator.current["email"] = data)}
                  CustomErrorMessage="invalid email"
                  InfoTooltipMessage=""
                  InputId="Email"
                  InputMode="none"
                  InputTitle="Email:"
                  Required
                  Name="Email"
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  PlaceHolder=""
                  PrefixIcon="none"
                  SetControlonRight
                  SetValue=""
                  SuffixIcon="none"
                  Type="text"
                  UrlPrefix=""
                  Validation="email"
                  max={100}
                  min={0}
                />
              </div>
              <div className="emp-col-6 mb-3">
                <VgDatePicker
                  Country="U.S.A"
                  DatePickerId=""
                  DatePickerName=""
                  DefaultDate="firstDateOfMonth"
                  Disableddates={[]}
                  EnvironmentUrlDp="https://api.vagaro.com/"
                  Maxdate={new Date("2025-12-30T18:30:00.000Z")}
                  Mindate={new Date("2024-12-31T18:30:00.000Z")}
                  OnBlur={() => {}}
                  Onchange={() => {}}
                  Placeholder="Select Date"
                  SetControlonRight
                  SetValue=""
                  Title="Date Picker:"
                />
                {error && (
                  <div className="vg-input-control-error-msg">{error}</div>
                )}
              </div>

              <div className="emp-col-6 mb-3">
                <label className="field-label">Select:</label>
                <select className="vg-input-control custom-select-control">
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-Binary</option>
                </select>
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgInput
                  ref={(data: any) =>
                    (formValidator.current["password"] = data)
                  }
                  CustomErrorMessage="invalid password"
                  FocusBorder="none"
                  InfoTooltipMessage=""
                  InputId=""
                  InputMode="none"
                  InputTitle="Password:"
                  Name=""
                  OnBlur={() => {}}
                  OnBlurValidation
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  OnValidation={() => {}}
                  Password
                  PlaceHolder=""
                  PrefixIcon="none"
                  Required
                  SetValue=""
                  SuffixIcon="none"
                  Type="text"
                  UrlPrefix=""
                  Validation="none"
                  max={100}
                  min={0}
                />
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgInput
                  ref={(data: any) =>
                    (formValidator.current["firstname"] = data)
                  }
                  InfoTooltipMessage=""
                  InputId=""
                  InputMode="none"
                  InputTitle="First Name:"
                  Required
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  PlaceHolder=""
                  PrefixIcon="none"
                  SetControlonRight
                  SetValue=""
                  Type="text"
                  Validation="none"
                  max={100}
                  min={0}
                  UrlPrefix=""
                />
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgInput
                  DropInValue="All United States"
                  InfoTooltipMessage=""
                  InputDrop
                  InputId=""
                  InputText="All United States"
                  InputTitle="DropInInput:"
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  OnValidation={() => {}}
                  PlaceHolder="Enter Miles"
                  PrefixIcon="none"
                  SetValue=""
                />
              </div>
              {/* <div className="emp-col-6">
                <VgRadio
                 ref={(data: any) =>
                    (formValidator.current["radio"] = data)
                  }
  CustomErrorMessage="Please select an option"
  OnChange={() => {}}
  RadioId="1"
  RadioTickMark="tickMark"
  RadioVariant="horizontal"
  Required
  RowData={[
    {
      description: 'A product you can sell online or in-house like shampoo, oils, lotion, yoga mats, t-shirts, etc.',
      icon: 'inventory',
      id: 1,
      title: 'Retail Product'
    },
    {
      description: 'A service-use product, like Botox or hair color, that is sold per unit.',
      icon: 'PartialUse',
      id: 2,
      title: 'Partial-Use Product'
    }
  ]}
  Title="Select an option:"
  Variants="SquareBlock"
  selectedIndex={null}
/>
              </div> */}
              <div className="emp-col-12 fullwidth">
                <VgSegments
                 ref={(data: any) =>
                    (formValidator.current["segments"] = data)
                  }
  ActiveSegment={[
    1,
    3,
    4
  ]}
  CustomErrorMessage="Please select at least one segment"
  InfoTooltipMessage=""
  // Multi
  Name={[
    {
      id: 1,
      name: 'Segment'
    },
    {
      id: 2,
      name: 'Segment'
    },
    {
      id: 3,
      name: 'Segment'
    },
    {
      id: 4,
      name: 'Segment'
    },
     {
      id: 5,
      name: 'Segment'
    },
     {
      id: 6,
      name: 'Segment'
    },
     {
      id: 7,
      name: 'Segment'
    },
    
  ]}
  NoOfSegments="7"
  TabSegment="horizontal"
  TextAlignment="center"
  Title=" "
  onClick={() => {}}
  Required
  
/>
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgTextarea
                  AsyncClickEvent
                  AutoFocus
                  CharacterCountEnableForAi
                  CloseBackTitle="From Control"
                  Footer={2}
                  LabelText="TextArea:"
                  MaximumLength={1500}
                  MaximumLengthForAi={1500}
                  Name=""
                  NativeAction={13}
                  OnBlur={() => {}}
                  OnCrossClick={() => {}}
                  OnEmojiClick={() => {}}
                  OnTickClick={() => {}}
                  PlaceHolder="Type here..."
                  SetValue=""
                  TextAreaId=""
                  TextareaVariant="Default"
                  TimerCount={0}
                  VagaroToolkit={1}
                  onChange={() => {}}
                />
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <div key="false">
                  <VgAddressControl
                    ref={(data: any) =>
                      (formValidator.current["address"] = data)
                    }
                    AddressControlId=""
                    AddressLine1InputName="address1"
                    AddressLine2InputName="address2"
                    Show_Address_line2
                    CallBackTimeCount={0}
                    CountryDropdownCloseName=""
                    CountryDropdownOpenName="Select Country"
                    CurrentCountry=""
                    OnValidation={(isValid: boolean, errorMessage: string) => {console.log(`Address validation result: ${isValid}, Error: ${errorMessage}`);}}
                    EnvironmentUrl="https://api.vagaro.com/"
                    CountryDropdown
                    NativeActionValue={13}
                    // AllCountry
                    OnBlur={() => {}}
                    OnChange={() => {}}
                    Orientation="vertical"
                    PlaceHolderAddressline1="Business Address Line 1"
                    PlaceHolderAddressline2="Business Address Line 2 (Optional)"
                    SetAddresLine2Value=""
                    // SetValue="300 College Avenue, Los Gatos, California, 95030"
                    ShouldVerifyAddress
                    // IsManualAddress
                    ShowHideFooter={2}
                    TitleAddressline1="Business Address Line 1:"
                    TitleAddressline2="Business Address Line 2 (Optional):"
                    VagaroToolkit={1}
                    onSelect={() => {}}
                    Required
                    VerifyAddressCountryDropdown
                  />
                </div>
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgTextEditor
                  AiControlPopup
                  OnChange={() => {}}
                  OnChangeRange={() => {}}
                  OnChangeTone={() => {}}
                  OnClickCancle={() => {}}
                  OnClickClose={() => {}}
                  OnClickNext={() => {}}
                  OnClickPrevious={() => {}}
                  OnClickRegenerate={() => {}}
                  OnClickUseThisText={() => {}}
                  PlaceHolder="Enter description"
                  RawData={[
                    {
                      Index: 0,
                      InputDescription: "I am salon professional Nikunj sir",
                      Range: 100,
                      Tone: "energetic",
                    },
                    {
                      Index: 1,
                      InputDescription: "I am salon professional Sagar Battul",
                      Range: 75,
                      Tone: "trendy",
                    },
                    {
                      Index: 2,
                      InputDescription:
                        "I am salon professional The issue arises from the fact that when you're updating the history in your",
                      Range: 25,
                      Tone: "casual",
                    },
                    {
                      Index: 3,
                      InputDescription:
                        "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
                      Range: 50,
                      Tone: "motivational",
                    },
                    {
                      Index: 4,
                      InputDescription: "I am salon professional Sagar Battul",
                      Range: 0,
                      Tone: "professional",
                    },
                  ]}
                  SetValue={`<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><i><b><strong class="PlaygroundEditorTheme__textBold PlaygroundEditorTheme__textItalic" style="white-space: pre-wrap;">Testing TextEditor component</strong></b></i></p>`}
                  Style
                  Title="Text Editor:"
                  ToolbarRawData={{
                    Alignment: true,
                    BackgroundColor: true,
                    Bold: true,
                    BulletListButton: true,
                    Clear: true,
                    Fontcolor: true,
                    Fontfamily: true,
                    Fontsize: true,
                    InsertNames: true,
                    Italic: true,
                    Link: true,
                    NumberListButton: true,
                    Redo: false,
                    Strikethrough: true,
                    Underline: true,
                    Undo: false,
                  }}
                  ToneMetadata={[
                      {
                        label: "Professional21",
                        value: "professional21",
                      },
                      {
                        label: "Casual",
                        value: "casual",
                      },
                      {
                        label: "Uplifting",
                        value: "uplifting",
                      },
                      {
                        label: "Inspirational",
                        value: "inspirational",
                      },
                      {
                        label: "Trendy",
                        value: "trendy",
                      },
                      {
                        label: "Gentle & Caring",
                        value: "Gentle & Caring",
                      },
                      {
                        label: "Motivational",
                        value: "motivational",
                      },
                      {
                        label: "Energetic",
                        value: "energetic",
                      },
                ]}
                />
              </div>
              <div className="emp-col-6 mb-3">
                <label className="field-label">Birthday:</label>
                <VgDateRangePicker
                  ButtonPrimary="Submit"
                  ButtonSecondary="Clear"
                  ButtonThird="Cancel"
                  DateFormat="MM DD, YYYY"
                  DateRangeName=""
                  DateRangePickerId="DateRangePickerId1"
                  DateRangePickerPosition=""
                  DefaultEndDate="none"
                  DefaultOption="This Month"
                  DefaultStartDate="today"
                  DisabledDates={[]}
                  EndDateInputName=""
                  MaxDate={new Date("2025-12-30T18:30:00.000Z")}
                  MinDate={new Date("2024-12-31T18:30:00.000Z")}
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  Placeholder="MM DD, YYYY"
                  StartDateInputName=""
                  Title=""
                />
              </div>
              <div className="emp-col-6 mb-3">
                <VgPhoneControl
                  ref={(data: any) => (formValidator.current["phone "] = data)}
                  CloseBackTitle="Vagaro React Toolkit"
                  CurrentCountry={1}
                  Footer={2}
                  NativeActionVal={13}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnBlur={() => {}}
                  PhoneControlId="phoneControlId1"
                  PlaceHolder="Enter Phone Number"
                  TimerCount={1000}
                  Required={true}
                  Title="Phone Number:"
                  VagaroToolkit={1}
                  Validation="Default"
                  CountryDropdown
                  AllCountry
                />
              </div>
              <div className="emp-col-3 mb-3">
                <label className="field-label">Select Color:</label>
                <div className="emp-inner-col-custome">
                  <div className="w100">
                  
                  </div>
                  <Svg name="at" width={50} height={50} />
                  <div>
                    <VgColorPicker
                      CloseBackTitle="Vagaro React Toolkit"
                      ColorPickerId="colorPickerId1"
                      Footer={2}
                      NativeActionVal={13}
                      OnChange={() => {}}
                      TimerCount={0}
                      Title="Color Picker"
                      VagaroToolkit={1}
                    />
                  </div>
                </div>
              </div>
              <div className="emp-col-3 mb-3">
                <div className="emp-three-col">
                  {/* //abdul */}
                  <VgAiPopup
  AiControlId="AiControlId"
  ApiRequestParams={{
    dataKey: 'data',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      Connection: 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Cookie: 'visid_incap_2405801=nKrJ6XT8TJOIvcNqavRFnp/AoGcAAAAAQUIPAAAAAACbYGnsLL43zOZsjWrKCifW; _vopt=%22accepted%22; _ga=GA1.1.541524598.1738588397; _clck=m6rooe%7C2%7Cftw%7C0%7C1862; _uetvid=e5cae0a0e3a711ef840afb7ba07f32a3; _ga_6V5L0PLMBF=GS1.1.1740994171.2.1.1740994889.0.0.0; proximitystate_v3=%7B%22lat%22%3A%2237.77493%22%2C%22long%22%3A%22-122.4194%22%2C%22countryid%22%3A%221%22%2C%22zip%22%3A%22%22%2C%22city%22%3A%22San+Francisco%22%2C%22state%22%3A%22ca%22%2C%22stateName%22%3A%22California%22%2C%22currencysymbol%22%3A%22%24%22%2C%22businesstypes%22%3A%22%22%2C%22service%22%3A%22%22%2C%22vagaroURL%22%3A%22%22%2C%22titleTimesTamp%22%3A%22%22%2C%22utcOffset%22%3A0%2C%22timeZoneOffSet%22%3A-8.0%2C%22isSupportDayLight%22%3Atrue%7D; amp_c57244=DlodAd7SYzU3JAciyrtCvP...1ilibi9vk.1ilibirrc.45.26.6b; _ga_BGSFEW1QY1=GS1.1.1741151611.20.1.1741151857.59.0.0; __stripe_mid=1d6d9c5d-3ace-4991-b5a8-b756086ed52a0b9377; LastSeenFeatureId=4; ai_user=+OXmam53JZNsOcuFvUbF8b|2025-06-17T09:49:58.813Z; isSignupValue=false; isLoginValue=true; loginTypeValue=1; vPowerV2=buqpptc2fla4tvujjczjggmx; cmsmaster=%22public%22; __AntiXsrfToken=419c7f6c53f44f16b09eb7b7c4354af3; s_utkn=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMzUyMDgzMDk0fDUxMzI2NzMiLCJuYmYiOjE3NTIzMTg0MDksImV4cCI6MTc1NDkxMDQwOSwiaWF0IjoxNzUyMzE4NDA5LCJpc3MiOiJhcGkudmFnYXJvLmNvbSIsImF1ZCI6IlFDVmFQVmt6R1BEdVBLelFMTFNJZGc9PSJ9.xrZiigLIjD4ef8kI7gSUSJFwN7VCi03zpM0VOv2EyKw; s_eB=U2FsdGVkX1~xPr1aHtEqiEv4YwYLVjki25aaVIIYlMg=; rpt_data={"MerchantId":"cUQLl8ISTPyutak3C1An7Q==","UserId":"QCVaPVkzGPDuPKzQLLSIdg==","grouptoken":"US02","Theme":"assets/css/Theme/theme10.css?v=20250704112736"}; s_eU=U2FsdGVkX1-LRrDLNKnZrWXAUxr4R28krmIS5RK5rqM=; s_themeid=U2FsdGVkX1-5e8k3NZQMbCYBMnCN65TNNuQVQo4W0gk=; _ga_2L62EDJ2V9=GS2.1.s1752318368$o21$g1$t1752318412$j16$l0$h0; VagaroMenuId=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMzUyMDgzMDk0fDUxMzI2NzMiLCJuYmYiOjE3NTIzMTg0MDksImV4cCI6MTc1NDkxMDQwOSwiaWF0IjoxNzUyMzE4NDA5LCJpc3MiOiJhcGkudmFnYXJvLmNvbSIsImF1ZCI6IlFDVmFQVmt6R1BEdVBLelFMTFNJZGc9PSJ9.xrZiigLIjD4ef8kI7gSUSJFwN7VCi03zpM0VOv2EyKw; incap_ses_707_2405801=zamtbRAAyAN5J+auBMXPCaT4dWgAAAAA5iqG9KsAXkMrPCiIzsDn6Q==; __stripe_sid=f07a98da-2923-453d-b9c2-579676cabb12a898c7',
      'X-Requested-With': 'XMLHttpRequest',
      merchantid: 'cUQLl8ISTPyutak3C1An7Q==',
      token1: 'U2FsdGVkX19yF/VR6GKgU8C2OEaYqB1iULjCXNwVsg4=',
      token2: 'U2FsdGVkX19T43sle6Bpj4YIVZERMXEZ0zWudr1u6Fw=',
      token3: 'U2FsdGVkX1/6uQ8TzyrSPy+s1bOKSc0R4cTfG0/IFoQ=',
      token4: 'U2FsdGVkX1+K5ToCq+qBSXIFQo2d75k1kuahH6rE/gQ=',
      userid: 'QCVaPVkzGPDuPKzQLLSIdg=='
    },
    method: 'POST',
    responseType: 'Single'
  }}
  CloseBackTitle="From Control"
  Footer={2}
  MaximumLength={1500}
  Name=""
  NativeAction={13}
  OnChangeRange={() => {}}
  OnChangeTone={() => {}}
  OnClickCancle={() => {}}
  OnClickClose={() => {}}
  OnClickNext={() => {}}
  OnClickPrevious={() => {}}
  OnClickRegenerate={() => {}}
  OnClickUseThisText={() => {}}
  RawData={[
    {
      Index: 0,
      InputDescription: 'I am salon professional Nikunj sir',
      Range: 100,
      Tone: 'energetic'
    },
    {
      Index: 1,
      InputDescription: 'I am salon professional Sagar Battul',
      Range: 75,
      Tone: 'trendy'
    },
    {
      Index: 2,
      InputDescription: 'I am salon professional The issue arises from the fact that when you\'re updating the history in your',
      Range: 25,
      Tone: 'casual'
    },
    {
      Index: 3,
      InputDescription: 'I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.',
      Range: 50,
      Tone: 'motivational'
    },
    {
      Index: 4,
      InputDescription: 'I am salon professional Sagar Battul',
      Range: 0,
      Tone: 'professional'
    }
  ]}
  TimerCount={0}
  ToneMetadata={[
    {
      label: 'Professional',
      value: 'professional'
    },
    {
      label: 'Casual',
      value: 'casual'
    },
    {
      label: 'Uplifting',
      value: 'uplifting'
    },
    {
      label: 'Inspirational',
      value: 'inspirational'
    },
    {
      label: 'Trendy',
      value: 'trendy'
    },
    {
      label: 'Gentle & Caring',
      value: 'Gentle & Caring'
    },
    {
      label: 'Motivational',
      value: 'motivational'
    },
    {
      label: 'Energetic',
      value: 'energetic'
    }
  ]} 
  VagaroToolkit={1}
  baseUrl="https://dev14.bookitall.com"
  moduleContext="inventory"
  onApiError={() => {}}
  onApiResponse={() => {}}
/>
                {/* <VgAiPopup
  AiControlId="AiControlId"
  CloseBackTitle="From Control"
  Footer={2}
  MaximumLength={1500}
  Name=""
  NativeAction={13}
  OnChangeRange={() => {}}
  OnChangeTone={() => {}}
  OnClickCancle={() => {}}
  OnClickClose={() => {}}
  OnClickNext={() => {}}
  OnClickPrevious={() => {}}
  OnClickRegenerate={() => {}}
  OnClickUseThisText={() => {}}
  RawData={[
    {
      Index: 0,
      InputDescription: 'I am salon professional Nikunj sir',
      Range: 100,
      Tone: 'energetic'
    },
    {
      Index: 1,
      InputDescription: 'I am salon professional Sagar Battul',
      Range: 75,
      Tone: 'trendy'
    },
    {
      Index: 2,
      InputDescription: 'I am salon professional The issue arises from the fact that when you\'re updating the history in your',
      Range: 25,
      Tone: 'casual'
    },
    {
      Index: 3,
      InputDescription: 'I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.',
      Range: 50,
      Tone: 'motivational'
    },
    {
      Index: 4,
      InputDescription: 'I am salon professional Sagar Battul',
      Range: 0,
      Tone: 'professional'
    }
  ]}
  TimerCount={0}
  ToneMetadata={[
    {
      label: 'Professional',
      value: 'professional'
    },
    {
      label: 'Casual',
      value: 'casual'
    },
    {
      label: 'Uplifting',
      value: 'uplifting'
    },
    {
      label: 'Inspirational',
      value: 'inspirational'
    },
    {
      label: 'Trendy',
      value: 'trendy'
    },
    {
      label: 'Gentle & Caring',
      value: 'Gentle & Caring'
    },
    {
      label: 'Motivational',
      value: 'motivational'
    },
    {
      label: 'Energetic',
      value: 'energetic'
    }
  ]}
  VagaroToolkit={1}
/> */}
                  <VgTimePicker
                    ref={(data: any) =>
                      (formValidator.current["timepicker"] = data)
                    }
                    CustomErrorMessage="Please enter a valid start time."
                    OnBlur={() => {}}
                    OnSelect={() => {}}
                    OnChange={() => {}}
                    TimePickerId="TimePickerId2"
                    Title="Select Time:"
                    VagaroToolkit={1}
                  />
                </div>
              </div>
              <div className="emp-col-3 mb-3">
                <VgInput
                  CustomMsg="$"
                  InfoChip
                  InputDescription=""
                  InputId="input-five"
                  InputTitle="Price:"
                  Required
                  LabelPosition="top"
                  OnBlur={() => {}}
                  PlaceHolder="0.00"
                  PrefixSupport="prefix"
                  TooltipMessage="Price with tax"
                  UrlPrefix=""
                  Validation="numeric"
                  numericValidation
                  OnChange={() => {}}
                />
              </div>
              <div className="emp-col-3 mb-3">
                <VgStepper
                  ref={(data: any) => (formValidator.current["stepper"] = data)}
                  CustomErrorMessage="Error reason"
                  CustomIntervalText="min"
                  LabelText="Steppper:"
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnDecrement={() => {}}
                  OnIncrement={() => {}}
                  SetInterval={5}
                  SetValue={0}
                  Required
                />
              </div>
              <div className="emp-col-3 mb-3">
                <VgSmileyInput
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnEmojiClick={() => {}}
                  OnFocus={() => {}}
                  OnKeyUp={() => {}}
                  OnSendButtonClick={() => {}}
                  Placeholder="Type a message..."
                  SetValue=""
                  SmileyIcon
                />
              </div>
              <div className="emp-col-3 mb-3">
                <VgLoginInput
                  AllCountry
                  AutoFocus
                  CountryDropdown
                  InputId=""
                  InputTitle="Log In or Sign Up:"
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInputChange={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  OnPhoneControlChange={() => {}}
                  PlaceHolder="Email or Phone Number"
                  // Required
                  SetValue=""
                  ShowRequiredFieldMark
                  Type="text"
                />
              </div>

        
              <div className="emp-col-6 mb-3 fullwidth">
                <VgToggle
                  Description="Customers will be able to view email and phone number contact information on Vagaro.com."
                  OnChange={() => {}}
                  ToggleVariation="WithDescription"
                  Title="Show Contact Email and Phone on Vagaro.com"
                  ToggleId="switch-one"
                />
              </div>
            </div>
            <div className="emp-company-info">
              <div className="vg-section-title">COMPANY INFORMATION</div>
              <div className="emp-form-row">
                <div className="emp-col-6 mb-3">
                  <label className="field-label">Start Date:</label>
                  <VgDatePicker
                    Country="U.S.A"
                    DatePickerId="DatePickerId2"
                    //DatePickerName={() => {}}
                    DefaultDate="today"
                    isPastDateDisable={false}
                    VagaroToolkit={1}
                    isFutureDateDisable={false}
                    Disableddates={[]}
                    EnvironmentUrlDp="https://api.vagaro.com/"
                    Maxdate={new Date("2024-12-30T18:30:00.000Z")}
                    Onchange={() => {}}
                    Placeholder="Select Date"
                  />
                </div>

                <div className="emp-col-6 mb-3">
                <VgSearchDropdown
  Icon={<VgSvg name="search" />}
  IconPosition="prefix"
  MenuListWidth="400px"
  OnBlur={() => {}}
  OnChange={() => {}}
  OnClick={() => {}}
  OnFocus={() => {}}
  OnKeyDown={() => {}}
  OnKeyUp={() => {}}
  OnScroll={() => {}}
  OnSearch={() => {}}
  OnSelectedItem={() => {}}
  Options={searchDropdownOptions}
  Placeholder={searchDropdownLoading ? "Loading..." : (searchDropdownError || "Search...")}
  SetValue=""
/>
                <VgTextarea
                AiClickEvent={() => {}}
                AiPopupSetValue={aiPopupState}
                AiControlId="AiControlId"
                AiControlPopup
                AsyncClickEvent
                CharacterCountEnableForAi
                CloseBackTitle="From Control"
                DialogShowHide
                Footer={2}
                LabelText="Title4354353:"
                MaximumLength={50}
                MaximumLengthForAi={50}
                Name=""
                NativeAction={13}
                OnBlur={() => {}}
                OnChangeRange={() => {}}
                OnChangeTone={(e,) => {console.log(e + "fdsfsdfsd");}}
                OnClickCancle={() => {}}
                OnClickClose={() => {}}
                OnClickNext={() => {}}
                OnClickPrevious={() => {}}
                OnClickRegenerate={() => {}}
                OnClickUseThisText={(e: any , data) => {handleAiUseThisText(e, data);}}
                // OnClickUseThisText={handleAiUseThisText}
                OnCrossClick={() => {}}
                OnEmojiClick={() => {}}
                OnTickClick={() => {}}
                PlaceHolder="Type here..."
                RawData={[
                  {
                    Index: 0,
                    InputDescription: 'I am salon professional Nikunj sir',
                    Range: 100,
                    Tone: 'energetic'
                  },
                  {
                    Index: 1,
                    InputDescription: 'I am salon professional Sagar Battul',
                    Range: 75,
                    Tone: 'trendy'
                  },
                  {
                    Index: 2,
                    InputDescription: 'I am salon professional The issue arises from the fact that when you\'re updating the history in your',
                    Range: 25,
                    Tone: 'casual'
                  },
                  {
                    Index: 3,
                    InputDescription: 'I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.',
                    Range: 50,
                    Tone: 'motivational'
                  },
                  {
                    Index: 4,
                    InputDescription: 'I am salon professional Sagar Battul',
                    Range: 0,
                    Tone: 'professional'
                  }
                ]}
                SetValue=""
                TextAreaId=""
                TextareaVariant="Default"
                TimerCount={0}
                ToneMetadata={[
                  {
                    label: 'Professional',
                    value: 'professional'
                  },
                  {
                    label: 'Casual',
                    value: 'casual'
                  },
                  {
                    label: 'Uplifting',
                    value: 'uplifting'
                  },
                  {
                    label: 'Inspirational',
                    value: 'inspirational'
                  },
                  {
                    label: 'Trendy',
                    value: 'trendy'
                  },
                  {
                    label: 'Gentle & Caring',
                    value: 'Gentle & Caring'
                  },
                  {
                    label: 'Motivational',
                    value: 'motivational'
                  },
                  {
                    label: 'Energetic',
                    value: 'energetic'
                  }
                ]}
                VagaroToolkit={1}
                onChange={() => {}}
              />
                  <VgDropdown
                    AutoFocus
                    CallBackTimeCount={0}
                    ClassNamePrefix="vg-select2-dropdown"
                    ClearSearch
                    CustomPlaceholderName="Selected"
                    DefaultValue={[]}
                    DropdownPlaceholder="Selected"
                    DropdownClosingName=""
                    DropdownData={[
                      {
                        label: "Account Owner",
                        options: [
                          {
                            label: (
                              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                <div style={{ color: "rosybrown", flex: 1 }}>
                                  Padicure and Manicure Service
                                </div>
                                <div style={{ textAlign: "right", fontSize: "12px" }}>
                                  <span style={{ display: "block" }}>$200.00</span>
                                  <span>15 min</span>
                                </div>
                              </div>
                            ),
                            value: "1",
                          },
                        ],
                      },
                      {
                        label: "Access Level Dhaval update",
                        options: [
                          {
                            label: "Vanilla",
                            value: "vanilla",
                          },
                          {
                            label: "Chocolate",
                            value: "chocolate",
                          },
                          {
                            label: "Strawberry",
                            value: "strawberry",
                          },
                          {
                            label: "Salted Caramel",
                            value: "salted-caramel",
                          },
                        ],
                      },
                    ]}
                    DropdownId="DropdownId2"
                    DropdownName=""
                    ChildCheckbox={false}
                    DropdownTitle="Reports To:"
                    SearchPlaceholder="Search"
                    DropdownClosed={() => {}}
                    GroupOptions
                    Multi={false}
                    OpenFromBody
                    Expanded={true}
                    Required
                    Searchable={false}
                    ShowCheckBoxInGroup={false}
                    ShowCustomMessage="No results found. Please try another search."
                    MenuPlacement="auto"
                    NativeActionValue={13}
                    Placeholder="Select Report To"
                    RequiredMessage="This field is required"
                    RightSwipeEvent
                    SetCustomPlaceholder
                    ShowHideFooter={2}
                    ShowSelectAllSelectNone
                    TabIndex={0}
                    VagaroToolkit={1}
                    VirtualDropdownHeight={300}
                    onChange={(e) => {
                      console.log("first", e);
                    }}
                  />
                </div>

                <div className="emp-col-6 mb-3 fullwidth">
                  <VgTextarea
                    AiClickEvent={() => handleAIClick()}
                    AiControlId="AiControlId"
                    ControlPopup
                    CloseBackTitle="From Control"
                    DialogShowHide={show}
                    AsyncClickEvent
                    Footer={2}
                    Label
                    LabelText="Title:"
                    Name=""
                    NativeAction={13}
                    OnBlur={() => {}}
                    OnChangeRange={() => {}}
                    OnChangeTone={() => {}}
                    OnClickCancle={() => {
                      setShow(false);
                    }}
                    OnClickClose={() => {
                      setShow(false);
                    }}
                    OnClickNext={() => {}}
                    OnClickPrevious={() => {}}
                    OnClickRegenerate={() => {}}
                    OnClickUseThisText={() => {
                      setShow(false);
                    }}
                    PlaceHolder="Type here..."
                    RawData={[
                      {
                        Index: 0,
                        InputDescription: "I am salon professional Nikunj sir",
                        Range: 100,
                        Tone: "energetic",
                      },
                      {
                        Index: 1,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 75,
                        Tone: "trendy",
                      },
                      {
                        Index: 2,
                        InputDescription:
                          "I am salon professional The issue arises from the fact that when you're updating the history in your",
                        Range: 25,
                        Tone: "casual",
                      },
                      {
                        Index: 3,
                        InputDescription:
                          "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
                        Range: 50,
                        Tone: "motivational",
                      },
                      {
                        Index: 4,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 0,
                        Tone: "professional",
                      },
                    ]}
                    SetIndex={5}
                    SetValue=""
                    TextAreaId=""
                    TextareaVariant="Default"
                    TimerCount={0}
                    ToneMetadata={[
                      {
                        label: "Professional",
                        value: "professional",
                      },
                      {
                        label: "Casual",
                        value: "casual",
                      },
                      {
                        label: "Uplifting",
                        value: "uplifting",
                      },
                      {
                        label: "Inspirational",
                        value: "inspirational",
                      },
                      {
                        label: "Trendy",
                        value: "trendy",
                      },
                      {
                        label: "Gentle & Caring",
                        value: "Gentle & Caring",
                      },
                      {
                        label: "Motivational",
                        value: "motivational",
                      },
                      {
                        label: "Energetic",
                        value: "energetic",
                      },
                    ]}
                    VagaroToolkit={1}
                    onChange={() => {}}
                  />
                  <VgTextarea
                    AiClickEvent={() => {}}
                    AiControlId="AiControlId"
                    ControlPopup
                    CloseBackTitle="From Control"
                    DialogShowHide
                    Footer={2}
                    CharacterCountEnable
                    CharacterCountEnableForAi
                    Label
                    LabelText="Title:"
                    MaximumLength={1500}
                    MaximumLengthForAi={1500}
                    Name=""
                    NativeAction={13}
                    OnBlur={() => {}}
                    OnChangeRange={() => {}}
                    OnChangeTone={() => {}}
                    OnClickCancle={() => {}}
                    OnClickClose={() => {}}
                    OnClickNext={() => {}}
                    OnClickPrevious={() => {}}
                    OnClickRegenerate={() => {}}
                    OnClickUseThisText={() => {}}
                    OnCrossClick={() => {}}
                    OnEmojiClick={() => {}}
                    OnTickClick={() => {}}
                    PlaceHolder="Type here..."
                    RawData={[
                      {
                        Index: 0,
                        InputDescription: "I am salon professional Nikunj sir",
                        Range: 100,
                        Tone: "energetic",
                      },
                      {
                        Index: 1,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 75,
                        Tone: "trendy",
                      },
                      {
                        Index: 2,
                        InputDescription:
                          "I am salon professional The issue arises from the fact that when you're updating the history in your",
                        Range: 25,
                        Tone: "casual",
                      },
                      {
                        Index: 3,
                        InputDescription:
                          "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
                        Range: 50,
                        Tone: "motivational",
                      },
                      {
                        Index: 4,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 0,
                        Tone: "professional",
                      },
                    ]}
                    SetValue=""
                    TextAreaId=""
                    TextareaVariant="Default"
                    TimerCount={0}
                    ToneMetadata={[
                      {
                        label: "Professional",
                        value: "professional",
                      },
                      {
                        label: "Casual",
                        value: "casual",
                      },
                      {
                        label: "Uplifting",
                        value: "uplifting",
                      },
                      {
                        label: "Inspirational",
                        value: "inspirational",
                      },
                      {
                        label: "Trendy",
                        value: "trendy",
                      },
                      {
                        label: "Gentle & Caring",
                        value: "Gentle & Caring",
                      },
                      {
                        label: "Motivational",
                        value: "motivational",
                      },
                      {
                        label: "Energetic",
                        value: "energetic",
                      },
                    ]}
                    VagaroToolkit={1}
                    AsyncClickEvent
                    onChange={() => {}}
                  />
                  <div className="emp-sms-counter">
                    Bios are displayed on the vagaro.com listing page and are
                    viewable by the public.
                  </div>
                </div>
              </div>
            </div>
            <div className="emp-company-info">
              <div className="vg-section-title">BUSINESS INFORMATION</div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive emails about your upcoming appointments."
                  OnChange={() => {}}
                  ToggleId="switch-three"
                  ToggleVariation="WithDescription"
                  Title="Email Notifications"
                />
              </div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive texts about your upcoming appointments."
                  OnChange={() => {}}
                  ToggleId="2"
                  ToggleVariation="WithDescription"
                  Title="switch-four"
                />
              </div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive push notifications through the Vagaro Pro app about your upcoming appointments."
                  OnChange={() => {}}
                  ToggleId="3"
                  ToggleVariation="WithDescription"
                  Title="switch-five"
                />
              </div>
              <div className="emp-col-6 fullwidth mb-3">
                <VgToggle
                  Description="Receive notifications about low inventory quantity."
                  OnChange={() => {}}
                  ToggleId="switch-six"
                  ToggleVariation="WithDescription"
                  Title="Low Inventory Notifications"
                />
              </div>
              <div className="emp-col-6 fullwidth mb-3">
                <VgToggle
                  Description="Receive notifications about low inventory quantity."
                  OnChange={() => {}}
                  ToggleId="switch-six"
                  ToggleVariation="WithDescription"
                  Title="Low Inventory Notifications"
                />
              </div>
              <div className="h-full overflow-auto mb-3">
                <div className="text-[13px]">
                  <VgDragList
                    ShowEditSave
                    ParentCheckboxTitle="Employees"
                    RawData={defaultOptions}
                    onChange={() => {}}
                    OnEditSave={() => {}}
                  />
                </div>
              </div>
              <div className="emp-col-6 fullwidth mb-3">
                <VgImageUploader
                  ref={(data: any) =>
                    (formValidator.current["imageUploader"] = data)
                  }
                  Editor
                  MaxFileSize={100}
                  SupportedFileFormate={[
                    "video/mp4", // MP4 - Most widely supported
                    "video/avi", // AVI - High quality, large file size
                    "video/mkv", // MKV - Supports multiple audio/subtitle tracks
                    "video/mov", // MOV - Apple format, high quality
                    "video/wmv", // WMV - Windows Media Video
                    "video/flv", // FLV - Flash Video
                    "video/webm", // WEBM - Optimized for web
                    "video/mpg", // MPEG - Used for DVDs and broadcasting
                    "video/mpeg", // MPEG - Alternative extension
                    "video/ogv", // OGV - Open-source format
                    "video/3gp", // 3GP - Mobile device format
                    "video/asf", // ASF - Advanced Systems Format
                    "video/ts", // TS - Transport stream for broadcasting
                    "image/png", // PNG -
                    "image/jpg", // JPG -
                    "image/jpeg", // JPG -
                  ]}
                  StoreOnAzureContainer={false}
                  Variation="Rectangle"
                  UploadFileName="test.jpg"
                  ContainerFolderPath="/Appointments/TestUpload"
                  DriveContainerName="blobcontainer"
                  Multiple
                  ImageUploaderId="imageUploader"
                  GetContainerNameAPIUrl="https://us02.vagaro.com/websiteapi/homepage/getcontainersastokenkey"
                  GetContainerNameAPIPayload={{
                    ExpirySecond: 600,
                    businessID: 245007,
                  }}
                  OnChange={() => {}}
                />
              </div>

              <div className="emp-col-6 fullwidth mb-3">
                <VgReviewRating
                  OnClick={() => {}}
                  RatingSize="Medium"
                  SetRating={1}
                />
              </div>
            </div>
          </div>
          {/* <div className="emp-photo-upload">
              <VgImageUploader
              ref={(data: any) => (formValidator.current["imageUploader"] = data)}
                IsEditor
                MaxFileSize={100}
                SupportedFileFormate={[
                  "video/mp4",  // MP4 - Most widely supported
                  "video/avi",  // AVI - High quality, large file size
                  "video/mkv",  // MKV - Supports multiple audio/subtitle tracks
                  "video/mov",  // MOV - Apple format, high quality
                  "video/wmv",  // WMV - Windows Media Video
                  "video/flv",  // FLV - Flash Video
                  "video/webm", // WEBM - Optimized for web
                  "video/mpg",  // MPEG - Used for DVDs and broadcasting
                  "video/mpeg", // MPEG - Alternative extension
                  "video/ogv",  // OGV - Open-source format
                  "video/3gp",  // 3GP - Mobile device format
                  "video/asf",  // ASF - Advanced Systems Format
                  "video/ts" ,   // TS - Transport stream for broadcasting
                  "image/png", // PNG -
                  "image/jpg", // JPG -
                  "image/jpeg", // JPG -
                ImageUploaderId=""
                IsEditor
                MaxFileSize={4}
                Name=""
                OnChange={(e) => { console.log(e) }}
                StoreOnAzureContainer
                Variation="Rectangle"
                UploadFileName="test.jpg"
                ContainerFolderPath="/Appointments/TestUpload"
                DriveContainerName = "blobcontainer"
                Multiple
                ImageUploaderId="imageUploader"
                GetContainerNameAPIUrl="https://us02.vagaro.com/websiteapi/homepage/getcontainersastokenkey"
                GetContainerNameAPIPayload={{
                  "ExpirySecond":600,
                  "businessID":245007
                }}
              />
            </div> */}
        </div>
      </div>
      <div className="vg-reacttk-footer emp-profile-footer">
        {/* <VgButton
            ButtonText="Cancel"
            ButtonVariant="secondary"
            ButtononClick={handleClick}
            IconPlacement="prefix"
            ValidForm={true}
          >
            Cancel
          </VgButton> */}
        {/* <button onClick={handleClick}>Next</button> */}
        <VgButton
          ButtonText="Next"
          ButtonVariant="primary"
          ButtononClick={handleClick}
          IconPlacement="prefix"
          ValidForm={true}
          FormValidations={formValidator.current}
        >
          Next
        </VgButton>
      </div>

      {/* Employee Profile Design end*/}
    </Fragment>
  );
};

// Type definitions
interface User {
  id: number;
  label: string;
  title: string;
  value: string;
  options: {
    id: string;
    label: string;
    title: string;
    value: string;
  };
}

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownGroup {
  label: string;
  options: DropdownOption[];
}

export default VgForm;
