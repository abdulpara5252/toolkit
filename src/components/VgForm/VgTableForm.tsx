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
import VgTableGrid from "../VgTables/VgTableGrid";

const VgTableForm: React.FC = () => {
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
  return (
    <Fragment>
      <div style={{ width: "100%"}}><VgTableGrid
          ColumnData={[
            {
              DataValue: 'Employees',
              Dataheader: 'Employees',
              Sorting: false,
              Width: 20,
              sticky: false
            },
            {
              DataValue: 'Access Leval',
              Dataheader: 'Access Leval',
              Sorting: false,
              Width: 10,
              sticky: false
            },
            {
              DataValue: 'Employee Type',
              Dataheader: 'Employee Type',
              Sorting: false,
              Width: 10,
              sticky: false
            },
            {
              DataValue: 'Status',
              Dataheader: 'Status',
              Sorting: false,
              Width: 10,
              sticky: false
            },
            {
              DataValue: 'renewalStatus',
              Dataheader: 'Renewal Status',
              Sorting: false,
              Width: 10,
              sticky: false
            },
            {
              DataValue: 'Component',
              Dataheader: '',
              Sorting: false,
              Width: 10,
              sticky: true
            }
          ]}
          Footer="Sticky"
          OnChange={() => { }}
          OnClick={() => { }}
          OnClickSorting={() => { }}
          OnRowClick={() => { }}
          PagingType="None"
          RowData={[
            {
              'Access Leval': 'Admin',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: {
                Badge: [
                  {
                    BadgeSize: 'inline',
                    BadgeText: 'Active',
                    BadgeVariation: 'positive'
                  }
                ]
              },
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },
            {
              'Access Leval': 'Admin',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: {
                Badge: [
                  {
                    BadgeSize: 'inline',
                    BadgeText: 'Active',
                    BadgeVariation: 'positive'
                  }
                ]
              },
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },
            {
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: {
                Badge: [
                  {
                    BadgeSize: 'inline',
                    BadgeText: 'Active',
                    BadgeVariation: 'positive'
                  }
                ]
              },
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },
            {
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },
            {
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },
            {
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },
                  {
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },
                  // {
                  //   id: '6',
                  //   label: '$558.00',
                  //   percentage: '10%'
                  // },
                  // {
                  //   id: '4',
                  //   label: '$558.00',
                  //   percentage: '10%'
                  // },{
                  //   id: '5',
                  //   label: '$558.00',
                  //   percentage: '10%'
                  // },{
                  //   id: '6',
                  //   label: '$55821.00',
                  //   percentage: '10%'
                  // },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            },{
              'Access Leval': 'All Access',
              Component: <VgThreeDotMenu
                IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                Items={[
                  {
                    id: '1',
                    label: '$25.00',
                    percentage: '5%'
                  },
                  {
                    id: '2',
                    label: '$558.00',
                    percentage: '10%'
                  },
          {
                    id: '3',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '4',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '5',
                    label: '$558.00',
                    percentage: '10%'
                  },{
                    id: '6',
                    label: '$558.00',
                    percentage: '10%'
                  },
                ]}
                MenuButtonPosition="vertical"
                MenuOpen
                MenuOptions="ThreeDot"
                OnClick={() => { }}
                OnThreeDotMenuClick={() => { }}
                SelectedItem={{
                  id: '8',
                  label: '$89.00',
                  percentage: '40%'
                }}
                TextValue="0.00"
                ThreeDotMenuOpenPosition="Right"
              />,
              'Employee Type': 'Service Provider',
              Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
              'Modified By': 'Admin 1',
              'Modified Date': 'Nov 23, 2024',
              Status: '',
              cell: '(415) 944-7445',
              email: 'Mollylovesoak@gmail.com',
              name: 'Molly Larsen',
              renewalStatus: 'Active'
            }
          ]}
        //   SelectedIds={[]}
          ShowHeaderCheckbox
          ShowRowCheckbox
          SortingType="Inline"
          TableGridType="Employee List"
          SelectedIds={[]}
        /></div>

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

export default VgTableForm;
