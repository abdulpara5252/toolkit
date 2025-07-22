import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Select from 'react-select';
import './VgCustomerDropdown.scss'; // Assuming you have a CSS file for styles

// Custom Option Component
type CustomerOptionType = {
  value: number;
  label: string;
  name: string;
  phone: string;
  email: string;
};

interface VgCustomerDropdownProps {
  onChange?: (selectedOption: CustomerOptionType | null) => void;
}

interface VgCustomerDropdownRef {
  validate: () => { isValid: boolean; value?: CustomerOptionType | null; error?: string };
}

const customerOptions = [
  {
    value: 1,
    label: "Class New - (987) 456-3210 - mail@mailinator.com",
    name: "Class New",
    phone: "(987) 456-3210",
    email: "mail@mailinator.com"
  },
  {
    value: 2,
    label: "Test Customer - (209) 409-9484 - test@mailinator.com", 
    name: "Test Customer",
    phone: "(209) 409-9484",
    email: "test@mailinator.com"
  },
  {
    value: 3,
    label: "John Smith - (555) 123-4567 - john@example.com",
    name: "John Smith",
    phone: "(555) 123-4567",
    email: "john@example.com"
  },
  {
    value: 4,
    label: "Jane Wilson - (555) 987-6543 - jane@example.com",
    name: "Jane Wilson", 
    phone: "(555) 987-6543",
    email: "jane@example.com"
  },
  
  {
    value: 5,
    label: "Alice Johnson - (555) 555-5555 - alice@example.com",
    name: "Alice Johnson",
    phone: "(555) 555-5555",
    email: "alice@example.com"
  },
  
  {
    value: 6,
    label: "Bob Brown - (555) 444-4444 - bob@example.com",
    name: "Bob Brown",
    phone: "(555) 444-4444",  
    email: "bob@example.com"
  },
  {
    value: 7,
    label: "Charlie Davis - (555) 333-3333 - charlie@example.com",
    name: "Charlie Davis",
    phone: "(555) 333-3333",
    email: "charlie@example.com"
  },
  {
    value: 8,
    label: "David Wilson - (555) 222-2222 - david@example.com",
    name: "David Wilson",
    phone: "(555) 222-2222",
    email: "david@example.com"
  },
  {
    value: 9,
    label: "Emily Anderson - (555) 111-1111 - emily@example.com",
    name: "Emily Anderson",
    phone: "(555) 111-1111",
    email: "emily@example.com"
  },
  {
    value: 10,
    label: "Frank Thompson - (555) 000-0000 - frank@example.com",
    name: "Frank Thompson",
    phone: "(555) 000-0000",
    email: "frank@example.com"
  },
  {
    value: 11,
    label: "Grace Lee - (555) 123-4567 - grace@example.com",
    name: "Grace Lee",
    phone: "(555) 123-4567",
    email: "grace@example.com"  
  }
];

// const VgCustomerDropdown = forwardRef<VgCustomerDropdownRef, VgCustomerDropdownProps>(({ onChange }, ref) => {
//   const [selectedValue, setSelectedValue] = useState<CustomerOptionType | null>(null);
//   const [options, setOptions] = useState<CustomerOptionType[]>(customerOptions);
//   const [inputValue, setInputValue] = useState("");

//   const handleChange = (selectedOption: CustomerOptionType | null) => {
//     setSelectedValue(selectedOption);
//     if (onChange) onChange(selectedOption);
//   };

//   const handleInputChange = (newValue: string) => {
//     setInputValue(newValue);
    
//     // Filter options based on search input
//     if (newValue === "") {
//       setOptions(customerOptions);
//     } else {
//       const filtered = customerOptions.filter(option =>
//         option.name.toLowerCase().includes(newValue.toLowerCase()) ||
//         option.phone.toLowerCase().includes(newValue.toLowerCase()) ||
//         option.email.toLowerCase().includes(newValue.toLowerCase())
//       );
//       setOptions(filtered);
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     validate: () => {
//       return selectedValue 
//         ? { isValid: true, value: selectedValue } 
//         : { isValid: false, error: "Please select a customer" };
//     }
//   }));

//   // Custom Option Component
//   type CustomerOptionType = {
//     value: number;
//     label: string;
//     name: string;
//     phone: string;
//     email: string;
//   };

//   type CustomOptionProps = {
//     data: CustomerOptionType;
//     children: React.ReactNode;
//     isSelected: boolean;
//     [key: string]: any;
//   };

//   const CustomOption = ({ data, children, isSelected, label, innerProps, isFocused, innerRef, ...props }: CustomOptionProps) => (
//     <div 
//       className={`text-[14px] m-0 min-h-[33px] py-2 pl-[15px] leading-[20px] cursor-pointer break-words float-none text-text_neutral_default bg-bkg_neutral_default hover:bg-bkg_neutral_tiertiary ${
//         isSelected ? '' : ''
//       }`}
//       {...props}
//       {...innerProps} // Spread other innerProps (id, onClick, etc.)
//       ref={innerRef} // Important for react-select focus management
//       key={data.value}
//       title={data.label} // Show full label on hover
//     >    
//       <div>{data.name}</div>
//       <div>{data.phone} - {data.email}</div>
//     </div>
//   );

//   // Custom styles matching your design
//   const customStyles = {
//     container: (base: any) => ({
//       ...base,
//       width: '100%',
//       position: 'relative'
//     }),
//     control: (base: any, state: any) => ({
//       ...base,
//       minHeight: '40px',
//       border: `1px solid ${state.isFocused ? 'var(--border_blue_default)' : 'var(--border_neutral_default)'}`,
//       borderRadius: '3px',
//       boxShadow: 'none',
//       '&:hover': {
//         borderColor: state.isFocused ? 'var(--border_blue_default)' : 'var(--border_neutral_default)'
//       },
//       cursor: 'text',
//       backgroundColor: 'var(--bkg_neutral_default)'
//     }),
//     valueContainer: (base: any) => ({
//       ...base,
//       padding: '0px 10px',
//       display: 'flex',
//       alignItems: 'center',
//       flexWrap:'nowrap'
//     }),
//     input: (base: any) => ({
//       ...base,
//       margin: 0,
//       padding: 0,
//       fontSize: '15px',
//       color: 'var(--text_neutral_default)'
//     }),
//     placeholder: (base: any) => ({
//       ...base,
//       color: 'var(--text_neutral_weak)',
//       fontSize: '15px',
//       fontWidth:"600",
//       position: 'absolute',
//       left: '10px'
//     }),
//     singleValue: (base: any) => ({
//       ...base,
//       fontSize: '15px',
//       color: 'var(--text_neutral_default)',
//     }),
//     indicatorsContainer: (base: any) => ({
//       ...base,
//       padding: '8px'
//     }),
//     menu: (base: any) => ({
//       ...base,
//       marginTop: '4px',
//       backgroundColor: 'var(--bkg_neutral_default)',
//       border: '1px solid var(--border_blue_default)',
//       borderRadius: '0px',
//       boxShadow: '0 2px 8px rgba(var(--modal_box_shadow),.1)!important',
//       zIndex: 1000,
//     }),
//     menuList: (base: any) => ({
//       ...base,
//       padding: 0,
//       borderRadius: '0px',
//       backgroundColor: 'var(--bkg_neutral_default)'
//     }),
//     option: (base: any) => ({
//       ...base,
//       padding: 0,
//       backgroundColor: 'transparent',
//       color: 'var(--text_neutral_default)',
//       cursor: 'pointer',
//       ':active': {
//         backgroundColor: 'transparent'
//       }
//     }),
//     noOptionsMessage: (base: any) => ({
//       ...base,
//       color: 'var(--text_neutral_default)',
//       fontSize: '15px',
//       padding: '40px 16px',
//       textAlign: 'center' as const,
//       fontWeight: '500'
//     })
//   };
  
//   const MenuList = (props: any) => {
//     const visibleCount = Math.min(10, options.length);
//     const totalCount = options.length;
    
//     return (
//       <div>
//         <div className="max-h-[200px] min-h-[200px] overflow-auto">
//           {props.children}
//         </div>

//         {/* Footer for the menu */}
//         <div className="menuFooter bg-bkg_neutral_tiertiary text-text_neutral_default py-[8px] pl-[10px] text-center">
//           {totalCount === 0 ? "No Matches" : `Items 1-${visibleCount} out of ${totalCount}`}
//         </div>
//       </div>    
//     );
//   };

//   return (
//     <div className="w-full">
//       <Select
//         options={options}
//         value={selectedValue}
//         onChange={handleChange}
//         onInputChange={handleInputChange}
//         inputValue={inputValue}
//         placeholder="Name, Phone Number, or Email Address"
//         className="vg-customerlist-dropdown"
//         isSearchable={true}
//         styles={customStyles}
//         menuIsOpen={true} // Prevents the menu from opening on focus
//         components={{ 
//           Option: CustomOption,
//           MenuList: MenuList,
//           DropdownIndicator: () => null, // Hide default dropdown indicator
//           IndicatorSeparator: () => null // Hide the separator
//         }}
//         // formatOptionLabel={(option, { context }) => {
//         //   if (context === 'menu') {
//         //     return option.label; // Will be handled by CustomOption
//         //   }
//         //   // For selected value display
//         //   return option.label;
//         // }}
//         noOptionsMessage={() => ""}
//       />
//     </div>
//   );
// });


const VgCustomerDropdown = forwardRef<VgCustomerDropdownRef, VgCustomerDropdownProps>(({ onChange }, ref) => {
  const [selectedValue, setSelectedValue] = useState<CustomerOptionType | null>(null);
  const [options, setOptions] = useState<CustomerOptionType[]>(customerOptions);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    if (inputValue === "") {
      setOptions(customerOptions);
    } else {
      const spaceRemoveValue = inputValue.split(" ").join("").replaceAll("-","").replaceAll("(", "").replaceAll(")", "").trim();
      const filtered = customerOptions.filter(option =>
        // option.name.toLowerCase().includes(spaceRemoveValue.toLowerCase()) ||
        option.label.toLowerCase().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "").includes(spaceRemoveValue.toLowerCase())
        // option.email.toLowerCase().includes(spaceRemoveValue.toLowerCase())
      );
      setOptions(filtered);
    }
  }, [inputValue]);

  const hanldeOptionSelect = (selectedOption: CustomerOptionType | null) => {
    setSelectedValue(selectedOption);
    setInputValue(selectedOption ? selectedOption.label : "");
    setIsOpen(false);
    if (onChange) onChange(selectedOption);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoading(true);
    setInputValue(value);
    setIsOpen(true);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      return selectedValue
        ? { isValid: true, value: selectedValue }
        : { isValid: false, error: "Please select a customer" };
    }
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="vg-customer-dropdown" ref={dropdownRef}>
      <input
        type="text"
        className="vg-customer-dropdown__input"
        placeholder="Name, Phone Number, or Email Address"
        value={inputValue}
        onChange={handleInputChange}
        onClick={toggleOpen}
      />
      {isOpen && (
        <div className="vg-dropdownoptions">
        <ul className="vg-customer-dropdown__list">
          {loading ? 
            <div className="vg-customer-dropdown__item">Loading...</div>
           : options.length > 0 && (
            options.map((option) => (
              <li
                key={option.value}
                className="vg-customer-dropdown__item"
                onClick={() => hanldeOptionSelect(option)}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
        <div className="vg-customer-dropdown__footer">
          {options.length === 0 ? "No Matches" : `Items 1-${Math.min(10, options.length)} out of ${options.length}`}
        </div>
        </div>
      )}
    </div>
  );
});

export default VgCustomerDropdown;
