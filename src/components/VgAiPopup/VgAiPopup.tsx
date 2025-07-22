import React, { useState, useEffect, Fragment, ChangeEvent, useRef } from "react";
import "./VgAiPopup.scss";
import VgButton from "../VgButton/VgButton";
import { utils } from "../../utils/utils";
import Portal from "../../common/Portal"; 
import VgTextarea from "../VgTextarea/VgTextarea";
import "../VgPopup/VgPopup.scss";
import "../VgBottomSheet/VgBottomSheet.scss";

export interface AiPopupData {
  Tone: string;
  Range: number;
  rangeLabel: string;
  InputDescription: string;
  Index: number;
  itemName?: string; // Added for new API fields
  AmplitudeDeviceId?: string; // Added for new API fields
}

export interface ApiRequestParams {
  // origin?: string; // Optional explicit origin (e.g., "https://dev14.bookitall.com/merchants/offeringdescriptionsai")
  method?: string; // HTTP method (e.g., "POST")
  headers?: Record<string, string>; // Custom headers including merchantId, userId, tokens
  dataKey?: string; // Key to extract data from response (optional)
  responseType?: string; // e.g., "Single" or "Multiple" (optional, for response parsing)
}

export interface VgAiPopupProps {
  RawData?: Array<{
    Index: number;
    InputDescription: string;
    Tone: string;
    Range: number;
  }>;
  VagaroToolkit?: number;
  MaximumLength?: number;
  CharacterCountEnable?: boolean;
  NativeAction?: number;
  Footer?: number;
  TimerCount?: number;
  IsFullLength?: boolean;
  CloseBackTitle?: string;
  AiControlId?: string;
  ToneMetadata?: any;
  Disable?: boolean;
  OnClickClose?: (e: any) => void;
  OnClickCancle?: (e: any) => void;
  OnClickUseThisText?: (e: any, data: AiPopupData) => void;
  OnChangeRange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLInputElement>,
    data: AiPopupData
  ) => void;
  OnChangeTone?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    data: AiPopupData
  ) => void;
  OnClickRegenerate?: (e: any, data: AiPopupData) => void;
  OnClickNext?: (e: any, data: any) => void;
  OnClickPrevious?: (e: any, data: any) => void;
  AiControl?: boolean;
  OnBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  Name?: string;
  SetIndex?: number;
  ReviewSection?: boolean;
  ReviewSectionBody?: any;
  AiPopupSetValue?: {
    Index: number;
    InputDescription: string;
    Tone: string;
    Range: number;
  };
  setSubmit?: (value: boolean) => void;
  isSubmit?: boolean;
  moduleContext?: string; // e.g., "inventory", "marketplace", "offering"
  baseUrl?: string; // Base URL (e.g., "https://dev14.bookitall.com")
  ApiRequestParams?: ApiRequestParams; // API configuration similar to VgDropdown
  onApiResponse?: (response: any) => void; // Callback for API response
  onApiError?: (error: any) => void; // Callback for API errors
}

const apiEndpointMap: Record<string, string> = {
  inventory: "merchants/aiproductdetailgenerate",
  marketplace: "merchants/marketingdescriptionsai",
  product: "merchants/miscdescriptionsai",
  offering: "merchants/offeringdescriptionsai",
  cancellation_policy: "merchants/aigeneratecancellationpolicy",
  general: "merchants/vagaroaigenerate",
  description: "merchants/generatedescription",
  description_with_des: "merchants/generatedescriptionwithdes",
  connect_ai_payment: "merchants/connectaipayment",
  connect_ai_due_payment: "merchants/connectaiduedatepayment",
};

const VgAiPopup: React.FC<VgAiPopupProps> = ({
  RawData = [],
  NativeAction = 0,
  Footer = 0,
  TimerCount = 0,
  IsFullLength = false,
  CharacterCountEnable = false,
  MaximumLength = 1500,
  AiControlId = "",
  CloseBackTitle,
  ToneMetadata = [],
  Disable = false,
  OnClickClose = () => { },
  OnClickCancle = () => { },
  OnClickUseThisText = (e: any ,data: AiPopupData) => { },
  OnChangeRange = (e: any, data: AiPopupData) => { },
  OnChangeTone = (e: any , data: AiPopupData) => { },
  OnClickRegenerate = () => { },
  OnClickPrevious = (e: any) => { },
  OnClickNext = (e: any) => { },
  VagaroToolkit = 0,
  OnBlur = () => { },
  AiControl = false,
  Name = "",
  SetIndex,
  ReviewSection = false,
  ReviewSectionBody,
  setSubmit = () => {},
  isSubmit = false,
  AiPopupSetValue = {
    Index: 0,
    InputDescription: "I am salon professional Sagar Battul",
    Tone: "professional",
    Range: 0,
  },
  moduleContext = "", // Default to "general" if not provided
  baseUrl,
  ApiRequestParams = {},
  onApiResponse = (response) => {},
  onApiError = (error) => {},
}) => {
  const isDragging = useRef(false); // Ref to track drag state

  const initialTone = RawData[0]?.Tone || "casual";
  const initialRange = RawData[0]?.Range || 50;
  const getRangeLabel = (range: number): string => {
    if (range < 25) return "shorter";
    if (range < 45) return "slightly_shorter";
    if (range >= 45 && range <= 55) return "similar";
    if (range > 55 && range <= 75) return "slightly_longer";
    return "longer";
  };

  const [selectedTone, setSelectedTone] = useState(AiPopupSetValue?.Tone || initialTone);
  const [value, setValue] = useState(AiPopupSetValue?.Range || initialRange);
  const [description, setDescription] = useState( AiPopupSetValue?.InputDescription || RawData[0]?.InputDescription || "");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const [history, setHistory] = useState<
    Array<{ tone: string; range: number; description: string; index: number }>
  >([]);
  const [currentIndex, setCurrentIndex] = useState<any>(RawData.length);
  const [indexNo, setIndexNo] = useState(1);
  const [rangeValue, setRangeValue] = useState<string>(getRangeLabel(initialRange));
  const [toneChangeCount, setToneChangeCount] = useState(RawData.length);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // API call function
  const callApi = async (data: AiPopupData) => {
    setIsLoading(true);
    setError(null);
  
    // Validate required fields
    if (!data.Tone || !data.InputDescription) {
      const error = new Error("Missing required fields: Tone and InputDescription are required");
      setError(error.message);
      onApiError(error);
      setIsLoading(false);
      throw error;
    }
  
    // Determine the API endpoint
    const endpoint = `${baseUrl}/merchants/offeringdescriptionsai`;
  
    // Prepare payload with safer defaults
    const payload = {
      tone: data.Tone,
      description_length_adjuster: rangeValue|| "similar",
      page_type: "services",
      description: data.InputDescription,
      item_name: data.itemName || "salon-service",
      AmplitudeDeviceId: data.AmplitudeDeviceId || "",
    };
  
    // Use only headers passed in by the end user
    const requestHeaders = {
      ...ApiRequestParams.headers,
    };
  
    try {
      const response = await fetch(endpoint, {
        method: ApiRequestParams.method || "POST",
        headers: requestHeaders,
        body: new URLSearchParams(payload).toString(),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
  
      // Validate response structure
      if (ApiRequestParams.dataKey && !result[ApiRequestParams.dataKey]) {
        throw new Error(`Response missing expected data key: ${ApiRequestParams.dataKey}`);
      }
  
      setResponse(result);
      onApiResponse(result);
  
      // Update history
      setHistory((prev) => [
        ...prev,
        {
          tone: data.Tone,
          range: data.Range,
          description: ApiRequestParams.dataKey ? result[ApiRequestParams.dataKey] : data.InputDescription,
          index: data.Index,
        },
      ]);
  
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Failed to fetch data from API: ${errorMessage}`);
      onApiError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle touch move for carousel
  const handleTouchMove = (e: React.TouchEvent | React.PointerEvent) => {
    setIsCheck(false);
    if (!touchStart) return;
    let touchEnd;
    if ("touches" in e && e.touches.length > 0) {
      touchEnd = e.touches[0].clientX;
    } else if ("clientX" in e) {
      touchEnd = e.clientX;
    } else {
      return;
    }
    const touchDiff = touchStart - touchEnd;
    if (touchDiff > 50 && currentSlide < history.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setTouchStart(null);
    }
    if (touchDiff < -50 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setTouchStart(null);
    }
  };

  // Update history when RawData changes
  useEffect(() => {
    if (RawData.length > 0) {
      const updatedHistory = RawData.map((item, index) => ({
        tone: item.Tone,
        range: item.Range,
        description: item.InputDescription || "",
        index: index,
      }));
      setHistory(updatedHistory);
      setCurrentIndex(updatedHistory.length);
    }
  }, [RawData]);

  // Handle navigation
  const handleNext = (e: any) => {
    setIsCheck(false);
    const nextIndex = currentIndex + 1;
    if (nextIndex <= history.length) {
      setCurrentIndex(nextIndex);
      setIndexNo(indexNo + 1);
    }
    OnClickNext(e, nextIndex + 1);
  };

  const handlePrevious = (e: any) => {
    setIsCheck(false);
    if (currentIndex === 1) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setIndexNo(indexNo - 1);
    OnClickPrevious(e, prevIndex + 1);
  };

  // Sync state with AiPopupSetValue
  useEffect(() => {
    if (isCheck && !isSubmit) {
      setValue(AiPopupSetValue?.Range || initialRange);
      setSelectedTone(AiPopupSetValue?.Tone || initialTone);
      setDescription(AiPopupSetValue?.InputDescription || RawData[0]?.InputDescription || "");
    }
  }, [isCheck, isSubmit, AiPopupSetValue, initialRange, initialTone, RawData]);

  // Update state based on history or current slide
  useEffect(() => {
    if (!isCheck && history.length > 0) {
      const currentData = history[currentIndex - 1] || history[currentSlide];
      if (currentData && (currentIndex > 0 || currentSlide > 0)) {
        setValue(currentData.range);
        setSelectedTone(currentData.tone);
        setDescription(currentData.description);
      }
    }
  }, [currentIndex, currentSlide, history, isCheck]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    const newLabel = getRangeLabel(newValue);
    setRangeValue(newLabel);
    setValue(newValue);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isDragging.current) {
      const newValue = Number(value);
      const newLabel = getRangeLabel(newValue);
      const currentData: AiPopupData = {
        Tone: selectedTone,
        Range: newValue,
        rangeLabel: newLabel,
        InputDescription: description,
        Index: currentIndex,
      };
      OnChangeRange(e, currentData);
    }
    isDragging.current = false;
  };

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubmit(false);
    const newTone = e.target.value;
    setSelectedTone(newTone);
    const currentData: AiPopupData = {
      Tone: newTone,
      Range: value,
      rangeLabel: rangeValue,
      InputDescription: description,
      Index: currentIndex,
    };
    OnChangeTone(e, currentData);
  };

  const handleRegenerate = async (e: any) => {
    const currentData: AiPopupData = {
      Tone: selectedTone,
      Range: value,
      rangeLabel: rangeValue,
      InputDescription: description,
      Index: currentIndex,
    };
    try {
      await callApi(currentData);
      OnClickRegenerate(e, currentData);
    } catch (err) {
      console.error("Regenerate API call failed:", err);
    }
  };

  const handleClose = (e: any) => {
    const isandroidiospro = utils.CheckIsFromProAppWithoutState();
    if (isandroidiospro) {
      utils.CallBackGivenToMobileApp(
        NativeAction,
        CloseBackTitle,
        Footer,
        TimerCount,
        IsFullLength
      );
      const obj = {
        NativeAction,
        Footer,
        TimerCount,
        callFromLocation: AiControlId,
        VagaroToolkit,
        IsFullLength,
      };
      const messageObj = {
        message: "",
        messageType: 0,
        screenTitle: CloseBackTitle,
        screenType: 0,
        navType: 0,
        action: `53|~|${JSON.stringify(obj)}`,
      };
      utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
    }
    setIsOpen(false);
    OnClickClose(e);
  };

  const handleCancle = (e: any) => {
    OnClickCancle(e);
  };

  const handleSubmit = async (e: any, description: string) => {
    setSubmit(true);
    const currentData: AiPopupData = {
      Tone: selectedTone,
      Range: value,
      rangeLabel: rangeValue,
      InputDescription: description,
      Index: currentIndex,
    };
    try {
      await callApi(currentData);
      setIsOpen(false);
      OnClickUseThisText(e, currentData);
    } catch (err) {
      console.error("Submit API call failed:", err);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(true);
  };

  const toggleVisibilityBottomSheet = () => {
    setIsVisibleBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setIsVisible(false);
  };

  const handleToneSelect = (value: string) => {
    setSubmit(false);
    setSelectedTone(value);
    const currentData: AiPopupData = {
      Tone: value,
      Range: Number(value),
      rangeLabel: getRangeLabel(Number(value)),
      InputDescription: description,
      Index: currentIndex,
    };
    const syntheticEvent = { target: { value } } as React.ChangeEvent<HTMLSelectElement>;
    OnChangeTone(syntheticEvent, currentData);
    handleCloseBottomSheet();
  };

  const handleSelectPrevious = (e: any, description: string) => {
    setDescription(description);
    setIsVisibleBottomSheet(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("bottom-sheet-open");
    } else {
      document.body.classList.remove("bottom-sheet-open");
    }
    return () => {
      document.body.classList.remove("bottom-sheet-open");
    };
  }, [isVisible]);

  return (
    <Fragment>
      {isOpen && (
        <Portal wrapperElementId="Popup">
          <div className={`modal-overlay`}>
            <div
              className={`vg-modal-dialog mobilefullScreen vg-modalsummary modal-dialog-centered modal-dialog-scrollable center large vg-ai-content-popup`}
            >
              <div className="vg-modal-content">
                <div className="vg-modal-header">
                  <div className="vg-modal-title" id="modal-footer">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0801 2.89453L11.75 2.25L12.3652 0.609375C12.3945 0.462891 12.541 0.375 12.6875 0.375C12.8047 0.375 12.9512 0.462891 12.9805 0.609375L13.625 2.25L15.2656 2.89453C15.4121 2.92383 15.5 3.07031 15.5 3.1875C15.5 3.33398 15.4121 3.48047 15.2656 3.50977L13.625 4.125L12.9805 5.79492C12.9512 5.91211 12.8047 6 12.6875 6C12.541 6 12.3945 5.91211 12.3652 5.79492L11.75 4.125L10.0801 3.50977C9.93359 3.48047 9.875 3.33398 9.875 3.1875C9.875 3.07031 9.93359 2.92383 10.0801 2.89453ZM8.0293 5.88281L11.3691 7.40625C11.5449 7.49414 11.6621 7.66992 11.6621 7.8457C11.6621 8.02148 11.5449 8.19727 11.3691 8.28516L8.0293 9.80859L6.50586 13.1484C6.41797 13.3242 6.24219 13.4414 6.06641 13.4414C5.89062 13.4414 5.71484 13.3242 5.65625 13.1484L4.10352 9.80859L0.763672 8.28516C0.587891 8.19727 0.5 8.02148 0.5 7.8457C0.5 7.66992 0.587891 7.49414 0.763672 7.40625L4.10352 5.88281L5.65625 2.54297C5.71484 2.36719 5.89062 2.25 6.06641 2.25C6.24219 2.25 6.41797 2.36719 6.50586 2.54297L8.0293 5.88281ZM12.3652 9.98438C12.3945 9.83789 12.541 9.75 12.6875 9.75C12.8047 9.75 12.9512 9.83789 12.9805 9.98438L13.625 11.625L15.2656 12.2695C15.4121 12.2988 15.5 12.4453 15.5 12.5625C15.5 12.709 15.4121 12.8555 15.2656 12.8848L13.625 13.5L12.9805 15.1699C12.9512 15.2871 12.8047 15.375 12.6875 15.375C12.541 15.375 12.3945 15.2871 12.3652 15.1699L11.75 13.5L10.0801 12.8848C9.93359 12.8555 9.875 12.709 9.875 12.5625C9.875 12.4453 9.93359 12.2988 10.0801 12.2695L11.75 11.625L12.3652 9.98438Z"
                        fill="#C643F4"
                      />
                    </svg>
                    Vagaro AI
                  </div>
                  <div className="vg-btn-close" id="modal-footer" onClick={handleClose}>
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.3945 11.4805C12.7754 11.832 12.7754 12.4473 12.3945 12.7988C12.2188 12.9746 11.9844 13.0625 11.75 13.0625C11.4863 13.0625 11.252 12.9746 11.0762 12.7988L8 9.72266L4.89453 12.7988C4.71875 12.9746 4.48438 13.0625 4.25 13.0625C3.98633 13.0625 3.75195 12.9746 3.57617 12.7988C3.19531 12.4473 3.19531 11.832 3.57617 11.4805L6.65234 8.375L3.57617 5.29883C3.19531 4.94727 3.19531 4.33203 3.57617 3.98047C3.92773 3.59961 4.54297 3.59961 4.89453 3.98047L8 7.05664L11.0762 3.98047C11.4277 3.59961 12.043 3.59961 12.3945 3.98047C12.7754 4.33203 12.7754 4.94727 12.3945 5.29883L9.31836 8.4043L12.3945 11.4805Z" />
                    </svg>
                  </div>
                </div>
                <div className="vg-modal-body">
                  <div className="d-ai-flex">
                    <div className="ai-vg-select">
                      <label className="vg-input-label">Tone:</label>
                      <div className="vg-ai-tone">
                        <div className="vg-ai-tone-select">
                          <select
                            className="vg-input-control"
                            value={selectedTone}
                            onChange={handleToneChange}
                          >
                            {ToneMetadata.map((option: { value: string; label: string }, index: number) => (
                              <option key={index} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span className="downArrow-icon"></span>
                        </div>
                        <div className="vg-ai-tone-bottomsheet">
                          <span onClick={toggleVisibility}>{selectedTone}</span>
                          <button className="btn-page">
                            <i className="fa fa-solid fa-angle-right"></i>
                          </button>
                          <div
                            className={`vg-bottom-sheet ${isVisible ? "bottomsheet-show" : "bottomsheet-hide"}`}
                            style={{ transform: isVisible ? "translateY(0)" : "translateY(100%)" }}
                          >
                            <div className="bottomsheet-menu">
                              <span className="dropdown-item bottomsheet-heading">Tone</span>
                              {ToneMetadata.map((option: { value: string; label: string }, index: number) => (
                                <a
                                  key={index}
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleToneSelect(option.value);
                                    handleCloseBottomSheet();
                                  }}
                                >
                                  <span>{option.label}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                          {isVisible && (
                            <div className="bottom-sheet-overlay" onClick={handleCloseBottomSheet} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="vg-ai-slider">
                      <div className="w-ai-col w-ai-col-6 rightRangeDiv">
                        <label className="vg-input-label">Length:</label>
                        <div className="range-slider range-slider-div">
                          <input
                            className="range-slider__range"
                            type="range"
                            min="0"
                            max="100"
                            step="25"
                            value={value}
                            onChange={handleRangeChange}
                            onMouseUp={handleMouseUp}
                            onMouseDown={handleMouseDown}
                            style={{
                              background: `linear-gradient(90deg, #CC4744 ${value}%, var(--bkg_neutral_tiertiary) ${value + 0.1}%)`,
                            }}
                            name={Name}
                          />
                          <span className="range-slider__value"></span>
                          <div className="rangeLabel space-between d-ai-flex-content">
                            <span className="smallLabel">Shorter</span>
                            <span className="smallLabel">Longer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="vg-ai-col-12 ai-textarea-input">
                    <VgTextarea
                      AiClickEvent={() => {}}
                      AiControlId="AiControlId1"
                      CloseBackTitle="From Control"
                      DialogShowHide
                      Footer={2}
                      CharacterCountEnable={CharacterCountEnable}
                      Label
                      LabelText="Title:"
                      MaximumLength={MaximumLength}
                      Name=""
                      NativeAction={13}
                      PlaceHolder="Type here..."
                      SetValue={description}
                      TextAreaId=""
                      TextareaVariant="Default"
                      TimerCount={0}
                      VagaroToolkit={1}
                      AsyncClickEvent
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="aiPaginationWrap">
                    {RawData.length > 1 && !isSubmit && (
                      <span id="aiPagination" className="aiPagination" style={{ display: "inline-flex" }}>
                        <button className="btn-page" onClick={handlePrevious} disabled={currentIndex === 0}>
                          <i className="fa fa-solid fa-caret-left"></i>
                        </button>
                        <span className="aiPaginationCount">
                          {currentIndex > RawData.length ? RawData.length : currentIndex}/{RawData.length}
                        </span>
                        <button className="btn-page" onClick={handleNext} disabled={currentIndex === RawData.length}>
                          <i className="fa fa-solid fa-caret-right"></i>
                        </button>
                      </span>
                    )}
                    <div className="ai-vg-select" id="Previous_Prompts">
                      <label className="vg-input-label" onClick={toggleVisibilityBottomSheet}>
                        Previous Prompts:
                      </label>
                      <div className="vg-ai-tone">
                        <div className="vg-ai-tone-bottomsheet">
                          <span onClick={toggleVisibilityBottomSheet}>{toneChangeCount}</span>
                          <button className="btn-page">
                            <i className="fa fa-solid fa-angle-right"></i>
                          </button>
                        </div>
                      </div>
                      {!isSubmit && (
                        <div
                          className={`vg-bottom-sheet ${isVisibleBottomSheet ? "bottomsheet-show" : "bottomsheet-hide"}`}
                          style={{ transform: isVisibleBottomSheet ? "translateY(0)" : "translateY(100%)" }}
                        >
                          <div className="bottomsheet-menu">
                            <span className="dropdown-item dropdown-item-aicontrol">
                              Previously Generated Text
                              <span className="drop-digitchange">{currentSlide + 1} of {history.length}</span>
                            </span>
                            <div
                              className="carousel"
                              onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                              onTouchMove={handleTouchMove}
                              onPointerDown={(e) => setTouchStart(e.clientX)}
                              onPointerMove={handleTouchMove}
                            >
                              <div className="carousel-slides">
                                {history.map((option, index) => (
                                  <div
                                    className="carousel-slide"
                                    key={index}
                                    style={{ display: index === currentSlide ? "block" : "none" }}
                                  >
                                    <a className="dropdown-item">
                                      <span>{option.description}</span>
                                    </a>
                                  </div>
                                ))}
                              </div>
                              <div className="carousel-dots">
                                {history.map((_, index) => (
                                  <span
                                    key={index}
                                    className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                                  ></span>
                                ))}
                              </div>
                              <div className="ai-slide-btn">
                                <VgButton
                                  ButtonVariant="primary"
                                  IconPlacement="prefix"
                                  ButtononClick={(e: any) => handleSelectPrevious(e, history[currentSlide]?.description)}
                                >
                                  Select
                                </VgButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <span id="tryAgainLink" className="linkField" onClick={handleRegenerate}>
                      <span>
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 12C21 16.9706 16.9706 21 12 21C9.69494 21 7.59227 20.1334 6 18.7083L3 16M3 12C3 7.02944 7.02944 3 12 3C14.3051 3 16.4077 3.86656 18 5.29168L21 8M3 21V16M3 16H8M21 3V8M21 8H16"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      Regenerate
                    </span>
                  </div>
                  {ReviewSection && <div>{ReviewSectionBody()}</div>}
                </div>
                <div className="vg-modal-footer" id="modal-footer">
                  <VgButton ButtonVariant="secondary" ButtononClick={handleCancle} IconPlacement="prefix">
                    Cancel
                  </VgButton>
                  <VgButton
                    ButtonVariant="ai"
                    ButtononClick={(e: any) => handleSubmit(e, description)}
                    IconPlacement="prefix"
                  >
                    Use this Text
                  </VgButton>
                </div>
                <div className="vg-modal-footer ai-modal-footer" id="RegenerateButton">
                  <VgButton
                    ButtonVariant="secondary"
                    ButtononClick={handleClose}
                    IconPlacement="prefix"
                  >
                    <svg
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C9.69494 21 7.59227 20.1334 6 18.7083L3 16M3 12C3 7.02944 7.02944 3 12 3C14.3051 3 16.4077 3.86656 18 5.29168L21 8M3 21V16M3 16H8M21 3V8M21 8H16"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Regenerate
                  </VgButton>
                  <VgButton
                    ButtonVariant="ai"
                    ButtononClick={(e: any) => handleSubmit(e, description)}
                    IconPlacement="prefix"
                  >
                    Use this Text
                  </VgButton>
                </div>
              </div>
              {response && <div className="response">{JSON.stringify(response)}</div>}
            </div>
          </div>
          <input type="hidden" onClick={(e) => handleClose(e)} id={AiControlId} />
        </Portal>
      )}
    </Fragment>
  );
};

export default VgAiPopup;