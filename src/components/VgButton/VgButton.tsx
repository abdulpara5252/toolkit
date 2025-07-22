import React, { forwardRef, Fragment, useState, useRef, useEffect } from "react";
import "./VgButton.scss";
import Svg from "../VgSvg/Svg";
import Portal from "../../common/Portal";

export interface PillTabLabel {
  id: string;
  name: string;
  pillColor?: "primary" | "secondary" | "theme" | "leave";
  isCloseOtherPills?: boolean;
}

export interface PillButtonDataProps {
  LeftLabel?: PillTabLabel;
  RightLabel?: PillTabLabel;
  SquareLabel?: PillTabLabel[];
}


export interface VgButtonProps {
  actionbutton?: "vertical" | "horizontal";
  ButtonDisabled?: boolean;
  ButtonVariant?:
  | "primary"
  | "secondary"
  | "ai"
  | "icon"
  | "close"
  | "tutorial"
  | "action"
  | "cross"
  | "AiWithIcon"
  | "selector"
  | "theme"
  | "ghost"
  | "Social"
  | "link"
  | "Red"
  | "Black"
  | "Pill"
  | "PillTab"
  | "RedGhost"
  | "Dropdown"
  | "DropdownMenu";
  ButtonIcon?: "plus" | "pencil" | "map" | "refund" | "receipt" | "link" | "preview" | "download" | "filter" | "connect" | "video";
  IconPlacement?: "prefix" | "suffix";
  CheckFormValidation?: boolean;
  ButtononClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ValidData?: any
  ) => void;
  [key: string]: any;
  ButtononHover?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, ValidData?: any) => void;
  FormValidations?: {};
  ValidForm?: Boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  SocialButton?: string
  IconList?: "preview" | "download" | 'heart' | 'print',
  Size?: "regular" | "small" | "large" | "full-width",
  PillTabData?: PillButtonDataProps;
  DropdownMenuOptions?: { label: string; value: string; imageUrl?: string }[];
  DropdownClick?: (e: { label: string; value: string;}) => void;
  ColorVariant?: "primary" | "secondary" | "theme" | "leave" | "black"  
  TextAlign?: "left" | "center" | "right";
  MobileView?: Boolean
  SelectedIds?: string[];
  OnChange?: (selectedIds: string[], clickedId?: string) => void;
  Width?: string;
  DropdownAlign?: "left" | "right"; 
  ToggleMode?: boolean;
}
export interface Validatable {
  validate: () => boolean;
}

const VgButton = forwardRef<HTMLButtonElement, VgButtonProps>(
  ({
    actionbutton,
    ButtonDisabled,
    EditorHover,
    ButtonVariant = "primary",
    ButtonIcon,
    IconPlacement = "prefix",
    ButtononClick,
    ButtononHover,
    FormValidations = {},
    ValidForm = false,
    children,
    SocialButton,
    IconList,
    Size,
    PillTabData,
    DropdownMenuOptions = [],
    DropdownClick,
    ColorVariant,
    TextAlign = "center",
    MobileView = false,
    SelectedIds,
    OnChange,
    Width = "",
    DropdownAlign = "left",
    ToggleMode = false,
  },
  ref) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isActivet, setIsActivet] = useState(false);
    const [toggleState, setToggleState] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [buttonWidth, setButtonWidth] = useState<number | null>(null);
    
    useEffect(() => {
      if (!dropdownOpen) return;
      function handleClickOutside(event: MouseEvent) {
        if (
          buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
          menuRef.current && !menuRef.current.contains(event.target as Node)
        ) {
          setDropdownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    const buttonClass = [
      "vg-tk-btn",
      `vg-btn-${ButtonVariant}`,
      ButtonVariant === "selector" && isActivet ? "active" : "",
      ButtonVariant === "ai" || ButtonVariant === "AiWithIcon"
        ? "vg-ai-default-button"
        : "",
      ButtonVariant === "close" ? "vg-close-icon" : "",
      ButtonVariant === "Social" ? SocialButton === "Facebook" && "vg-btn-fb" : "",
      ButtonVariant === "Social" ? SocialButton === "Gplus" && "vg-btn-secondary" : "",
      ButtonVariant === "Social" ? SocialButton === "Apple" && "vg-btn-apple" : "",
      ButtonVariant === "link" ? "vg-btn-tutorial" : "",
      ButtonVariant === "Red" ? 'vg-btn-leave' : '',
      ButtonVariant === "Black" ? 'vg-btn-black' : '',
      ButtonVariant === "Pill" ? 'vg-btn-primary vg-btn-pill' : '',
      ButtonVariant === "Dropdown" ? 'vg-btn-dropdown' : '',
      ButtonVariant === "RedGhost" ? 'vg-btn-ghost ghost-red' : '',
      ButtonVariant === "DropdownMenu" && ColorVariant
        ? `vg-btn-${ColorVariant}`
        : '',
      ButtonVariant === "action" || actionbutton === "vertical"
        ? "vg-doticon vertical"
        : "",
      actionbutton === "horizontal" ? "vg-doticon horizontal" : "",
      Size === "small" ? "vg-btn-small" : Size === "large" ? "vg-btn-large" : Size === "full-width" ? "vg-btn-full" : "",
      ColorVariant ? `vg-btn-${ColorVariant}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const handleFormbuttonClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      setIsActivet(!isActivet);
      if (ValidForm) {
        const data: Validatable[] = Object.values(FormValidations);
        
        // Filter out null/undefined refs before calling validate
        const validRefs = data.filter((element) => element && typeof element.validate === 'function');
        
        if (validRefs.length === 0) {
          console.warn('No valid form elements found with validate method');
          if (ButtononClick !== undefined) {
            ButtononClick(e, []);
          }
          return;
        }
        
        // const allElement = data.map((element) => element.validate());
        const allElement = validRefs.map((element) => element.validate());
        const hasInvalid = allElement.some((d: any) => d.IsValidate === false);
        const createNewData = allElement.map(
          ({ IsRequired, IsValidate, ...rest }: any) => rest
        );

        if (!hasInvalid) {
          if (ButtononClick !== undefined) {
            ButtononClick(e, createNewData);
          }
        } else {
          if (ButtononClick !== undefined) {
            ButtononClick(e, allElement);
          }
        }
      }
      else {
        e.preventDefault();
        if (ButtononClick !== undefined) {
          ButtononClick(e);
        }
      }
    };

    const handleFormButtonHover = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (ButtononHover !== undefined) {
        ButtononHover(e);
      }
    };

    const renderSVG = () => {
      if (actionbutton === "vertical") {
        return (
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 11.5C8.8125 11.5 9.5 12.1875 9.5 13C9.5 13.8438 8.8125 14.5 8 14.5C7.15625 14.5 6.5 13.8438 6.5 13C6.5 12.1875 7.15625 11.5 8 11.5ZM8 6.5C8.8125 6.5 9.5 7.1875 9.5 8C9.5 8.84375 8.8125 9.5 8 9.5C7.15625 9.5 6.5 8.84375 6.5 8C6.5 7.1875 7.15625 6.5 8 6.5ZM8 4.5C7.15625 4.5 6.5 3.84375 6.5 3C6.5 2.1875 7.15625 1.5 8 1.5C8.8125 1.5 9.5 2.1875 9.5 3C9.5 3.84375 8.8125 4.5 8 4.5Z" />
          </svg>
        );
      } else if (actionbutton === "horizontal") {
        return (
          <svg
            viewBox="0 0 14 4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.5 2C10.5 1.1875 11.1562 0.5 12 0.5C12.8125 0.5 13.5 1.1875 13.5 2C13.5 2.84375 12.8125 3.5 12 3.5C11.1562 3.5 10.5 2.84375 10.5 2ZM5.5 2C5.5 1.1875 6.15625 0.5 7 0.5C7.8125 0.5 8.5 1.1875 8.5 2C8.5 2.84375 7.8125 3.5 7 3.5C6.15625 3.5 5.5 2.84375 5.5 2ZM3.5 2C3.5 2.84375 2.8125 3.5 2 3.5C1.15625 3.5 0.5 2.84375 0.5 2C0.5 1.1875 1.15625 0.5 2 0.5C2.8125 0.5 3.5 1.1875 3.5 2Z" />
          </svg>
        );
      }
      return null;
    };
    const icon = () => {
      if (ButtonIcon === "plus" && ButtonVariant !== 'tutorial') {
        return (
          <svg
            viewBox="0 0 14 13"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z" />
          </svg>
        );
      } else if (ButtonIcon === "pencil" && ButtonVariant !== 'tutorial') {
        return (
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" />
          </svg>
        );
      } else if (ButtonIcon === "map" && ButtonVariant !== 'tutorial') {
        return (
          <Svg name="location_marker" />
        );
      }
      else if (ButtonIcon === 'refund' && ButtonVariant !== 'tutorial') {
        return (
          <Svg name="refund" />
        )
      }
      else if (ButtonIcon === "receipt" && ButtonVariant !== 'tutorial') {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentColor"
          >
            <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8l0 464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488L0 24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 144zM80 352c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 336c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 240z" />
          </svg>
        );
      } else if (ButtonIcon === "link" && ButtonVariant !== 'tutorial') {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
          </svg>
        );
      } else if (ButtonIcon === "filter" && ButtonVariant !== 'tutorial') {
        return (
          <svg width="16" height="17" viewBox="0 0 16 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.7676 0.875C15.4121 0.875 15.7344 1.63672 15.2656 2.07617L9.875 7.49609V15.1719C9.875 15.7578 9.23047 16.0801 8.76172 15.7578L6.41797 14.1172C6.21289 14 6.125 13.7656 6.125 13.5312V7.49609L0.705078 2.07617C0.236328 1.63672 0.558594 0.875 1.20312 0.875H14.7676Z"></path></svg>
        );
      }
      else if (ButtonIcon === "preview" && ButtonVariant !== 'tutorial') {
        return (
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
        );
      } else if (ButtonIcon === "download" && ButtonVariant !== 'tutorial') {
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.82812 0.875977H9.17188C9.55273 0.875977 9.875 1.19824 9.875 1.5791V6.50098H12.4238C12.9512 6.50098 13.2148 7.14551 12.834 7.52637L8.38086 11.9795C8.17578 12.1846 7.79492 12.1846 7.58984 11.9795L3.13672 7.52637C2.75586 7.14551 3.01953 6.50098 3.54688 6.50098H6.125V1.5791C6.125 1.19824 6.41797 0.875977 6.82812 0.875977ZM15.5 11.8916V15.1729C15.5 15.583 15.1777 15.876 14.7969 15.876H1.20312C0.792969 15.876 0.5 15.583 0.5 15.1729V11.8916C0.5 11.5107 0.792969 11.1885 1.20312 11.1885H5.48047L6.91602 12.624C7.50195 13.2393 8.46875 13.2393 9.05469 12.624L10.4902 11.1885H14.7969C15.1777 11.1885 15.5 11.5107 15.5 11.8916ZM11.8672 14.4697C11.8672 14.1475 11.6035 13.8838 11.2812 13.8838C10.959 13.8838 10.6953 14.1475 10.6953 14.4697C10.6953 14.792 10.959 15.0557 11.2812 15.0557C11.6035 15.0557 11.8672 14.792 11.8672 14.4697ZM13.7422 14.4697C13.7422 14.1475 13.4785 13.8838 13.1562 13.8838C12.834 13.8838 12.5703 14.1475 12.5703 14.4697C12.5703 14.792 12.834 15.0557 13.1562 15.0557C13.4785 15.0557 13.7422 14.792 13.7422 14.4697Z"></path></svg>
        )
      } else if (ButtonIcon === "connect" && ButtonVariant !== 'tutorial') {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="!size-[18px]" fill="currentColor" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16l0 32L48 128l0-32c0-8.8 7.2-16 16-16l448 0zm16 144l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192 480 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z"/></svg>
        );
      } else if (ButtonIcon === "dropdown" && ButtonVariant !== 'tutorial') {
        return (
          <svg
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        );
      }
      else if (ButtonIcon === "caret" && ButtonVariant !== 'tutorial') {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
        );
      }
      else if (ButtonIcon === "video" && ButtonVariant !== 'tutorial') {
        return (
          <Svg name="video" />
        );
      }
        return null
    };

    const SocialIcon = () => {
      if (SocialButton === "Facebook") {
        return (
          <svg viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.48633 9.4205H6.28906V15.983H3.35938V9.4205H0.957031V6.72519H3.35938V4.64511C3.35938 2.30136 4.76562 0.983002 6.9043 0.983002C7.92969 0.983002 9.01367 1.18808 9.01367 1.18808V3.50253H7.8125C6.64062 3.50253 6.28906 4.20566 6.28906 4.96738V6.72519H8.89648L8.48633 9.4205Z" fill="white" />
          </svg>
        )
      }
      else if (SocialButton === "Gplus") {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" ><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
        )
      }
      else if (SocialButton === "Apple") {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
        )
      }
      return null;
    }

    const btnVariant = () => {
      if (ButtonVariant === "close") {
        return (
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.3945 11.4805C12.7754 11.832 12.7754 12.4473 12.3945 12.7988C12.2188 12.9746 11.9844 13.0625 11.75 13.0625C11.4863 13.0625 11.252 12.9746 11.0762 12.7988L8 9.72266L4.89453 12.7988C4.71875 12.9746 4.48438 13.0625 4.25 13.0625C3.98633 13.0625 3.75195 12.9746 3.57617 12.7988C3.19531 12.4473 3.19531 11.832 3.57617 11.4805L6.65234 8.375L3.57617 5.29883C3.19531 4.94727 3.19531 4.33203 3.57617 3.98047C3.92773 3.59961 4.54297 3.59961 4.89453 3.98047L8 7.05664L11.0762 3.98047C11.4277 3.59961 12.043 3.59961 12.3945 3.98047C12.7754 4.33203 12.7754 4.94727 12.3945 5.29883L9.31836 8.4043L12.3945 11.4805Z" />
          </svg>
        );
      } else if (ButtonVariant === "tutorial") {
        return (
          <Svg name="video" />
        );
      } else if (ButtonVariant === "icon" && IconList === 'heart') {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
          </svg>
        );
      } else if (ButtonVariant === "icon" && IconList === 'download') {
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.82812 0.875977H9.17188C9.55273 0.875977 9.875 1.19824 9.875 1.5791V6.50098H12.4238C12.9512 6.50098 13.2148 7.14551 12.834 7.52637L8.38086 11.9795C8.17578 12.1846 7.79492 12.1846 7.58984 11.9795L3.13672 7.52637C2.75586 7.14551 3.01953 6.50098 3.54688 6.50098H6.125V1.5791C6.125 1.19824 6.41797 0.875977 6.82812 0.875977ZM15.5 11.8916V15.1729C15.5 15.583 15.1777 15.876 14.7969 15.876H1.20312C0.792969 15.876 0.5 15.583 0.5 15.1729V11.8916C0.5 11.5107 0.792969 11.1885 1.20312 11.1885H5.48047L6.91602 12.624C7.50195 13.2393 8.46875 13.2393 9.05469 12.624L10.4902 11.1885H14.7969C15.1777 11.1885 15.5 11.5107 15.5 11.8916ZM11.8672 14.4697C11.8672 14.1475 11.6035 13.8838 11.2812 13.8838C10.959 13.8838 10.6953 14.1475 10.6953 14.4697C10.6953 14.792 10.959 15.0557 11.2812 15.0557C11.6035 15.0557 11.8672 14.792 11.8672 14.4697ZM13.7422 14.4697C13.7422 14.1475 13.4785 13.8838 13.1562 13.8838C12.834 13.8838 12.5703 14.1475 12.5703 14.4697C12.5703 14.792 12.834 15.0557 13.1562 15.0557C13.4785 15.0557 13.7422 14.792 13.7422 14.4697Z"></path></svg>

        )
      }
      else if (ButtonVariant === "icon" && IconList === 'preview') {
        return (
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
        )
      } else if (ButtonVariant === "icon" && IconList === 'print') {
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 6.50098C14.6504 6.50098 15.5 7.35059 15.5 8.37598V11.1885C15.5 11.7158 15.0605 12.126 14.5625 12.126H13.625V14.9385C13.625 15.4658 13.1855 15.876 12.6875 15.876H3.3125C2.78516 15.876 2.375 15.4658 2.375 14.9385V12.126H1.4375C0.910156 12.126 0.5 11.7158 0.5 11.1885V8.37598C0.5 7.35059 1.32031 6.50098 2.375 6.50098H13.625ZM11.75 14.001V11.1885H4.25V14.001H11.75ZM13.1562 9.54785C13.5371 9.54785 13.8594 9.25488 13.8594 8.84473C13.8594 8.46387 13.5371 8.1416 13.1562 8.1416C12.7461 8.1416 12.4531 8.46387 12.4531 8.84473C12.4531 9.25488 12.7461 9.54785 13.1562 9.54785ZM4.25 2.75098V5.56348H2.375V1.81348C2.375 1.31543 2.78516 0.875977 3.3125 0.875977H11.3398C11.6035 0.875977 11.8379 0.993164 12.0137 1.16895L13.332 2.4873C13.5078 2.66309 13.625 2.89746 13.625 3.16113V5.56348H11.75V3.54199L10.959 2.75098H4.25Z"></path></svg>
        )
      }
      return null;
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (buttonRef.current) {
          const width = buttonRef.current.offsetWidth;
          setButtonWidth(width);
        }
      }, 0); 

      return () => clearTimeout(timeout);
    }, [buttonRef,dropdownOpen]);

    useEffect(() => {
      if (SelectedIds && Array.isArray(SelectedIds)) {
        setToggleState(SelectedIds);
      }
    }, [SelectedIds]);
    return (
      <Fragment>
        {ButtonVariant === "AiWithIcon" ? (
          <div
            className={`vg-ai-button-wrap vg-ai-button-parentWrap ${isHovered ? "vg-active-ai-button" : ""
              } ${EditorHover ? 'vg-active-ai-button' : ' '}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

          >
            <div className="vg-float-container">
              <a
                href="#"
                className="vg-vagaro-ai-button"
                role="button"
                onClick={handleFormbuttonClick}
                onMouseEnter={handleFormButtonHover}
              >
                <span className="vg-ai-text-button">
                  <span className="vg-ai-text-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.0801 3.39453L11.75 2.75L12.3652 1.10938C12.3945 0.962891 12.541 0.875 12.6875 0.875C12.8047 0.875 12.9512 0.962891 12.9805 1.10938L13.625 2.75L15.2656 3.39453C15.4121 3.42383 15.5 3.57031 15.5 3.6875C15.5 3.83398 15.4121 3.98047 15.2656 4.00977L13.625 4.625L12.9805 6.29492C12.9512 6.41211 12.8047 6.5 12.6875 6.5C12.541 6.5 12.3945 6.41211 12.3652 6.29492L11.75 4.625L10.0801 4.00977C9.93359 3.98047 9.875 3.83398 9.875 3.6875C9.875 3.57031 9.93359 3.42383 10.0801 3.39453ZM8.0293 6.38281L11.3691 7.90625C11.5449 7.99414 11.6621 8.16992 11.6621 8.3457C11.6621 8.52148 11.5449 8.69727 11.3691 8.78516L8.0293 10.3086L6.50586 13.6484C6.41797 13.8242 6.24219 13.9414 6.06641 13.9414C5.89062 13.9414 5.71484 13.8242 5.65625 13.6484L4.10352 10.3086L0.763672 8.78516C0.587891 8.69727 0.5 8.52148 0.5 8.3457C0.5 8.16992 0.587891 7.99414 0.763672 7.90625L4.10352 6.38281L5.65625 3.04297C5.71484 2.86719 5.89062 2.75 6.06641 2.75C6.24219 2.75 6.41797 2.86719 6.50586 3.04297L8.0293 6.38281ZM12.3652 10.4844C12.3945 10.3379 12.541 10.25 12.6875 10.25C12.8047 10.25 12.9512 10.3379 12.9805 10.4844L13.625 12.125L15.2656 12.7695C15.4121 12.7988 15.5 12.9453 15.5 13.0625C15.5 13.209 15.4121 13.3555 15.2656 13.3848L13.625 14L12.9805 15.6699C12.9512 15.7871 12.8047 15.875 12.6875 15.875C12.541 15.875 12.3945 15.7871 12.3652 15.6699L11.75 14L10.0801 13.3848C9.93359 13.3555 9.875 13.209 9.875 13.0625C9.875 12.9453 9.93359 12.7988 10.0801 12.7695L11.75 12.125L12.3652 10.4844Z" />
                    </svg>
                  </span>
                  <span className="vg-ai-text-wrap">Enhance with Vagaro AI</span>
                </span>
              </a>
            </div>
          </div>
        ) : ButtonVariant === "PillTab" && (
          PillTabData?.LeftLabel || PillTabData?.RightLabel || (PillTabData?.SquareLabel?.length > 0)
        ) ? (
          <div className={ `vg-btn-toggle-wrap ${MobileView ? 'vg-btn-column-view' : ''}`}>
            {(() => {
              const sizeClass =
                Size === "small"
                  ? "vg-btn-small"
                  : Size === "large"
                        ? "vg-btn-large"
                  : Size === "full-width"
                    ? "vg-btn-full"
                    : "";

              const allButtons: PillTabLabel[] = [
                PillTabData?.LeftLabel,
                ...(PillTabData?.SquareLabel || []),
                PillTabData?.RightLabel,
              ].filter(Boolean) as PillTabLabel[];

              const handleClick = (e: React.MouseEvent<HTMLButtonElement>, clickedId: string ) => {
                e.stopPropagation();
                const clickedButton = allButtons.find((btn) => btn.id === clickedId);
                const isCloseOtherPills = clickedButton?.isCloseOtherPills === true;
                const isActive = toggleState.includes(clickedId);
                let newState: string[];

                if (isCloseOtherPills) {
                  newState = isActive ? [] : [clickedId];
                } else {
                  const exclusiveIds = allButtons
                  .filter((btn) => btn.isCloseOtherPills)
                  .map((btn) => btn.id);
                  
                  const others = toggleState.filter((id) => !exclusiveIds.includes(id));

                  newState = isActive
                  ? others.filter((id) => id !== clickedId)
                  : [...others, clickedId];
                }

                if (ToggleMode && PillTabData?.LeftLabel && PillTabData?.RightLabel && !PillTabData?.SquareLabel?.length) {
                  const leftButton = PillTabData.LeftLabel;
                  const rightButton = PillTabData.RightLabel;
                  if (clickedId === leftButton.id) {
                    if (!toggleState.includes(leftButton.id)) {
                      setToggleState([leftButton.id]);
                      OnChange?.([leftButton.id], clickedId);
                      ButtononClick?.(e, getUpdatedPillState([leftButton.id]));
                    } else {
                      setToggleState([rightButton.id]);
                      OnChange?.([rightButton.id], clickedId);
                      ButtononClick?.(e, getUpdatedPillState([rightButton.id]));
                    }
                  } else if (clickedId === rightButton.id) {
                    if (!toggleState.includes(rightButton.id)) {
                      setToggleState([rightButton.id]);
                      OnChange?.([rightButton.id], clickedId);
                      ButtononClick?.(e, getUpdatedPillState([rightButton.id]));
                    } else {
                      setToggleState([leftButton.id]);
                      OnChange?.([leftButton.id], clickedId);
                      ButtononClick?.(e, getUpdatedPillState([leftButton.id]));
                    }
                  }
                } else {
                  setToggleState(newState);
                  OnChange?.(newState, clickedId);
                  ButtononClick?.(e, getUpdatedPillState(newState));
                }
              };

              const getUpdatedPillState = (activeIds: string[]) => {
                const isEnabled = (id?: string) => id && activeIds.includes(id);
                return {
                  LeftLabel: PillTabData.LeftLabel
                    ? {
                        ...PillTabData.LeftLabel,
                        enabeld: isEnabled(PillTabData.LeftLabel.id),
                      }
                    : undefined,

                  SquareLabel: PillTabData.SquareLabel?.map((btn: any) => ({
                    ...btn,
                    enabeld: isEnabled(btn.id),
                  })) ?? [],

                  RightLabel: PillTabData.RightLabel
                    ? {
                        ...PillTabData.RightLabel,
                        enabeld: isEnabled(PillTabData.RightLabel.id),
                      }
                    : undefined,
                };
              };

              return (
                <>
                {PillTabData?.LeftLabel && (
                  <button
                    type="button"
                    className={`vg-btn-left 
                      ${toggleState.includes(PillTabData.LeftLabel.id) 
                        ? `active ${PillTabData.LeftLabel.pillColor 
                            ? `vg-btn-${PillTabData.LeftLabel.pillColor.toLowerCase()}` 
                            : ''}` 
                        : ''} 
                      ${sizeClass}
                    `}
                    onClick={(e) => handleClick(e, PillTabData.LeftLabel.id)}
                  >
                    {PillTabData.LeftLabel.name}
                  </button>
                )}
                {PillTabData?.SquareLabel?.map((btn: any) => {
                  const isActive = toggleState.includes(btn.id);

                  return (
                    <button
                      key={btn.id}
                      className={`vg-btn-square 
                        ${isActive 
                          ? `active ${btn.pillColor 
                              ? `vg-btn-${btn.pillColor.toLowerCase()}` 
                              : ''}`
                          : ''} 
                      `}
                      onClick={(e) => handleClick(e, btn.id)}
                    >
                      {btn.name}
                    </button>
                  );
                })}

                {PillTabData?.RightLabel && (
                  <button
                    type="button"
                    className={`vg-btn-right 
                      ${toggleState.includes(PillTabData.RightLabel.id) 
                        ? `active ${PillTabData.RightLabel.pillColor 
                            ? `vg-btn-${PillTabData.RightLabel.pillColor.toLowerCase()}` 
                            : ''}`
                        : ''} 
                      ${sizeClass}
                    `}
                    onClick={(e) => handleClick(e, PillTabData.RightLabel.id)}
                  >
                    {PillTabData.RightLabel.name}
                  </button>
                )}
                </>
              );
            })()}
          </div>
        ) : ButtonVariant === "DropdownMenu" ? (
          <div className="vg-btn-DropdownMenu-wrap">
            <button
              ref={el => {
                if (typeof ref === "function") ref(el);
                else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
                (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
              }}
              aria-label="button"
              type="button"
              className={buttonClass}
              onClick={(e: any) => {
                setDropdownOpen(v => !v)
                if(ButtononClick) {
                  ButtononClick(e);
                }
              }}
              disabled={ButtonDisabled}
            >
              
              <span className={`menu-button-content menu-button-content-${TextAlign}`}>
              {IconPlacement === "prefix" && ButtonIcon && (
                  <span className="button-icon-prefix">{icon()}</span>
                )}
                {children}
                {IconPlacement === "suffix" && ButtonIcon && (
                  <span className="button-icon-suffix">{icon()}</span>
                )}
              </span>
              
            </button>
            {dropdownOpen && DropdownMenuOptions.length > 0 && (
              <Portal
                wrapperElementId="dropdownmenu"
                wrapperElement="div"
                inputRef={buttonRef}
                type = {DropdownAlign === "right" ? 2 : 1}
              >
                <div
                  ref={menuRef}
                  className="vg-dropdown-menu-action"
                  style={{ width:  Width !== "" ? Width : buttonWidth ? buttonWidth : undefined }}
                >
                  {DropdownMenuOptions.map((e: { label: string; value: string; imageUrl?: string }, idx: number) => (
                    <div
                      key={e.value + idx}
                      className="vg-dropdown-menu-link"
                      onClick={() => {
                        setDropdownOpen(false);
                        DropdownClick?.(e);
                      }}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {e.imageUrl && (
                        <div className="vg-dropdown-menu-image-wrapper">
                          <img 
                            src={e.imageUrl} 
                            alt={e.label} 
                            className="vg-dropdown-menu-image"
                          />
                        </div>
                      )}
                     {e.label}
                    </div>
                  ))}
                </div>
              </Portal> 
            )}
          </div>
        ) : (
          <button
            ref={ref}
            aria-label="button"
            type="button"
            className={buttonClass}
            onClick={handleFormbuttonClick}
            onMouseEnter={handleFormButtonHover}
            disabled={ButtonDisabled}
          >
            {IconPlacement === "prefix" && ButtonIcon && (
              <span className="button-icon-prefix">{icon()}</span>
            )}
            {btnVariant()}
            {ButtonVariant === "Social" && (<span className="button-icon-prefix">{SocialIcon()}</span>)}
                {children}
            {ButtonVariant === 'Red' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>}
            {renderSVG()}
            {!(ButtonVariant === "close") ? "" : ""}
            {IconPlacement === "suffix" && ButtonIcon && (
              <span className="button-icon-suffix">{icon()}</span>
            )}
          </button>
        )}
      </Fragment>
    );
  })

export default VgButton;
