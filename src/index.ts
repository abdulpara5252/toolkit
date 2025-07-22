// import './index.scss'; // Import the global SCSS file

// import 'flowbite/dist/flowbite.css'; // Import Flowbite styles
// import "apexcharts/dist/apexcharts.css"; // Import the ApexCharts CSS

// Import the main components
// export { default as VgAddressControl } from './components/VgAddressControl/VgAddressControl';
// export { default as VgAvatar } from './components/VgAvatar/VgAvatar';
// export { default as VgBadge } from './components/VgBadge/VgBadge';
// export { default as VgBottomSheet } from './components/VgBottomSheet/VgBottomSheet';
// export { default as VgButton } from './components/VgButton/VgButton';
// export { default as VgCheckbox } from './components/VgCheckbox/VgCheckbox';
// export { default as VgColorPicker } from './components/VgColorPicker/VgColorPicker';
// export { default as VgDatePicker } from './components/VgDatePicker/VgDatePicker';
// export { default as VgDateRangePicker } from './components/VgDateRangePicker/VgDateRangePicker';
// export { default as VgDropdown } from './components/VgDropdown/VgDropdown';
// export { default as VgImageUploader } from './components/VgImageUploader/VgImageUploader';
// export { default as VgLinkControl } from './components/VgLinkControl/VgLinkControl';
// export { default as VgPassiveNotification } from './components/VgPassiveNotification/VgPassiveNotification';
// export { default as VgPhoneControl } from './components/VgPhoneControl/VgPhoneControl';
// export { default as VgPopup } from './components/VgPopup/VgPopup';
// export { default as VgToggle } from './components/VgToggle/VgToggle';
// export { default as VgTextarea } from './components/VgTextarea/VgTextarea';
// export { default as VgInput } from './components/VgTextbox/VgTextbox';
// export { default as VgTimePicker } from './components/VgTimePicker/VgTimePicker';
// export { default as VgTooltip } from './components/VgTooltip/VgTooltip';
// export { default as VgMapControl } from './components/VgMapControl/VgMapControl';
// export { default as VgSegments } from './components/VgSegments/VgSegments';
// export { default as VgSvg } from './components/VgSvg/Svg';
// export { default as VgTableGrid } from './components/VgTables/VgTableGrid';
// export { default as VgGraph } from './components/VgGraph/VgGraph';
// export { default as VgStepper } from './components/VgStepper/VgStepper';
// export { default as VgReviewRating } from './components/VgReviewRating/VgReviewRating';
// export { default as VgThreeDotMenu } from './components/VgThreeDotMenu/VgThreeDotMenu';
// export { default as VgSmileyInput } from './components/VgSmileyInput/VgSmileyInput';
// export { default as VgLoginInput } from './components/VgLoginInput/VgLoginInput';
// export { default as VgTextEditor } from './components/VgTextEditor/VgTextEditor';
// export { default as VgVideoPlayer } from './components/VgVideoPlayer/VgVideoPlayer';
// export { default as VgCarousel } from './components/VgCarousel/VgCarousel';
// export { default as VgRadio } from './components/VgRadio/VgRadio';
// export { default as VgTab } from './components/VgTab/VgTab';
// export { default as VgAiPopup } from './components/VgAiPopup/VgAiPopup';

import React, { lazy } from "react";

import type { VgAddressControlProps } from "./components/VgAddressControl/VgAddressControl";
import type { VgAvtarProps } from "./components/VgAvatar/VgAvatar";
import type { VgBadgeProps } from "./components/VgBadge/VgBadge";
import type { VgBottomSheetProps } from "./components/VgBottomSheet/VgBottomSheet";
// import type { VgButtonProps } from "./components/VgButton/VgButton";
import type { VgCheckboxProps } from "./components/VgCheckbox/VgCheckbox";
import type { VgColorPickerProps } from "./components/VgColorPicker/VgColorPicker";
import type { VgDatePickerProps } from "./components/VgDatePicker/VgDatePicker";
import type { VgDateRangePickerProps } from "./components/VgDateRangePicker/VgDateRangePicker";
import type { VgDropdownProps } from "./components/VgDropdown/VgDropdown";
import type { VgImageUploaderProps } from "./components/VgImageUploader/VgImageUploader";
import type { VgLinkControlProps } from "./components/VgLinkControl/VgLinkControl";
import type { VgPassiveNotificationProps } from "./components/VgPassiveNotification/VgPassiveNotification";
import type { PhoneControlProps } from "./components/VgPhoneControl/VgPhoneControl";
import type { VgPopupProps } from "./components/VgPopup/VgPopup";
import type { VgToggleProps } from "./components/VgToggle/VgToggle";
import type { VgTextareaProps } from "./components/VgTextarea/VgTextarea";
import type { VgInputProps } from "./components/VgTextbox/VgTextbox";
import type { VgTimePickerProps } from "./components/VgTimePicker/VgTimePicker";
import type { VgTooltipProps } from "./components/VgTooltip/VgTooltip";
import type { MapProps } from "./components/VgMapControl/VgMapControl";
import type { VgSegmentsProps } from "./components/VgSegments/VgSegments";
import type { SvgProps } from "./components/VgSvg/Svg";
import type { VgTableGridProps } from "./components/VgTables/VgTableGrid";
import type { VgGraphProps } from "./components/VgGraph/VgGraph";
import type { VgStepperProps } from "./components/VgStepper/VgStepper";
import type { VgReviewRatingProps } from "./components/VgReviewRating/VgReviewRating";
import type { VgThreeDotProps } from "./components/VgThreeDotMenu/VgThreeDotMenu";
import type { VgSmileyInputProps } from "./components/VgSmileyInput/VgSmileyInput";
import type { VgLoginInputProps } from "./components/VgLoginInput/VgLoginInput";
import type { VgTextEditorProps } from "./components/VgTextEditor/VgTextEditor";
import type { VgVideoPlayerProps } from "./components/VgVideoPlayer/VgVideoPlayer";
import type { VgCarouselProps } from "./components/VgCarousel/VgCarousel";
import type { VgRadioProps } from "./components/VgRadio/VgRadio";
import type { VgTabProps } from "./components/VgTab/VgTab";
import type { VgAiPopupProps } from "./components/VgAiPopup/VgAiPopup";
import type { VgNestedDropdownProps } from "./components/VgNestedDropdown/VgNestedDropdown"
import type { VgImageDropdownProps } from "./components/VgImageDropdown/VgImageDropdown";
import type { VgCheckoutCustomerDropdownProps } from "./components/VgCheckoutCustomerDropdown/VgCheckoutCustomerDropdown";
import type { VgSliderProps } from "./components/VgSlider/VgSlider";
import type { VgDragListProps } from "./components/VgDragList/VgDragList";
import type { VgAlertProps } from "./components/VgAlert/VgAlert";
import type { VgInformationNoteProps } from "./components/VgInformationNote/VgInformationNote";
import type { VgAccordionProps } from "./components/VgAccordion/VgAccordion";
import { VgProgressBarProps } from "./components/VgProgressBar/VgProgressBar";

const VgAddressControl: React.LazyExoticComponent<
  React.FC<VgAddressControlProps>
> = lazy(() => import("./components/VgAddressControl/VgAddressControl"));
const VgAvatar: React.LazyExoticComponent<React.FC<VgAvtarProps>> = lazy(
  () => import("./components/VgAvatar/VgAvatar")
);
const VgBadge: React.LazyExoticComponent<React.FC<VgBadgeProps>> = lazy(
  () => import("./components/VgBadge/VgBadge")
);
const VgBottomSheet: React.LazyExoticComponent<React.FC<VgBottomSheetProps>> =
  lazy(() => import("./components/VgBottomSheet/VgBottomSheet"));
// const VgButton: React.LazyExoticComponent<React.ForwardRefExoticComponent<VgButtonProps>> = lazy(() =>
//     import('./components/VgButton/VgButton')
//   );
const VgButton = lazy(() => import("./components/VgButton/VgButton"));
const VgCheckbox: React.LazyExoticComponent<React.FC<VgCheckboxProps>> = lazy(
  () => import("./components/VgCheckbox/VgCheckbox")
);
const VgColorPicker: React.LazyExoticComponent<React.FC<VgColorPickerProps>> =
  lazy(() => import("./components/VgColorPicker/VgColorPicker"));
const VgDatePicker: React.LazyExoticComponent<React.FC<VgDatePickerProps>> =
  lazy(() => import("./components/VgDatePicker/VgDatePicker"));
const VgDateRangePicker: React.LazyExoticComponent<
  React.FC<VgDateRangePickerProps>
> = lazy(() => import("./components/VgDateRangePicker/VgDateRangePicker"));
const VgDropdown: React.LazyExoticComponent<React.FC<VgDropdownProps>> = lazy(
  () => import("./components/VgDropdown/VgDropdown")
);
const VgImageUploader: React.LazyExoticComponent<
  React.FC<VgImageUploaderProps>
> = lazy(() => import("./components/VgImageUploader/VgImageUploader"));
const VgLinkControl: React.LazyExoticComponent<React.FC<VgLinkControlProps>> =
  lazy(() => import("./components/VgLinkControl/VgLinkControl"));
const VgPassiveNotification: React.LazyExoticComponent<
  React.FC<VgPassiveNotificationProps>
> = lazy(
  () => import("./components/VgPassiveNotification/VgPassiveNotification")
);
const VgPhoneControl: React.LazyExoticComponent<React.FC<PhoneControlProps>> =
  lazy(() => import("./components/VgPhoneControl/VgPhoneControl"));
const VgPopup: React.LazyExoticComponent<React.FC<VgPopupProps>> = lazy(
  () => import("./components/VgPopup/VgPopup")
);
const VgToggle: React.LazyExoticComponent<React.FC<VgToggleProps>> = lazy(
  () => import("./components/VgToggle/VgToggle")
);
const VgTextarea: React.LazyExoticComponent<React.FC<VgTextareaProps>> = lazy(
  () => import("./components/VgTextarea/VgTextarea")
);
const VgInput: React.LazyExoticComponent<React.FC<VgInputProps>> = lazy(
  () => import("./components/VgTextbox/VgTextbox")
);
const VgTimePicker: React.LazyExoticComponent<React.FC<VgTimePickerProps>> =
  lazy(() => import("./components/VgTimePicker/VgTimePicker"));
const VgTooltip: React.LazyExoticComponent<React.FC<VgTooltipProps>> = lazy(
  () => import("./components/VgTooltip/VgTooltip")
);
const VgMapControl: React.LazyExoticComponent<React.FC<MapProps>> = lazy(
  () => import("./components/VgMapControl/VgMapControl")
);
const VgSegments: React.LazyExoticComponent<React.FC<VgSegmentsProps>> = lazy(
  () => import("./components/VgSegments/VgSegments")
);
const VgSvg: React.LazyExoticComponent<React.FC<SvgProps>> = lazy(
  () => import("./components/VgSvg/Svg")
);
const VgTableGrid: React.LazyExoticComponent<React.FC<VgTableGridProps>> = lazy(
  () => import("./components/VgTables/VgTableGrid")
);
const VgGraph: React.LazyExoticComponent<React.FC<VgGraphProps>> = lazy(
  () => import("./components/VgGraph/VgGraph")
);
const VgStepper: React.LazyExoticComponent<React.FC<VgStepperProps>> = lazy(
  () => import("./components/VgStepper/VgStepper")
);
const VgReviewRating: React.LazyExoticComponent<React.FC<VgReviewRatingProps>> =
  lazy(() => import("./components/VgReviewRating/VgReviewRating"));
const VgThreeDotMenu: React.LazyExoticComponent<React.FC<VgThreeDotProps>> =
  lazy(() => import("./components/VgThreeDotMenu/VgThreeDotMenu"));
const VgSmileyInput: React.LazyExoticComponent<React.FC<VgSmileyInputProps>> =
  lazy(() => import("./components/VgSmileyInput/VgSmileyInput"));
const VgLoginInput: React.LazyExoticComponent<React.FC<VgLoginInputProps>> =
  lazy(() => import("./components/VgLoginInput/VgLoginInput"));
const VgTextEditor: React.LazyExoticComponent<React.FC<VgTextEditorProps>> =
  lazy(() => import("./components/VgTextEditor/VgTextEditor"));
const VgVideoPlayer: React.LazyExoticComponent<React.FC<VgVideoPlayerProps>> =
  lazy(() => import("./components/VgVideoPlayer/VgVideoPlayer"));
const VgCarousel: React.LazyExoticComponent<React.FC<VgCarouselProps>> = lazy(
  () => import("./components/VgCarousel/VgCarousel")
);
const VgRadio: React.LazyExoticComponent<React.FC<VgRadioProps>> = lazy(
  () => import("./components/VgRadio/VgRadio")
);
const VgTab: React.LazyExoticComponent<React.FC<VgTabProps>> = lazy(
  () => import("./components/VgTab/VgTab")
);
const VgAiPopup: React.LazyExoticComponent<React.FC<VgAiPopupProps>> = lazy(
  () => import("./components/VgAiPopup/VgAiPopup")
);
const VgNestedDropdown: React.LazyExoticComponent<React.FC<VgNestedDropdownProps>> = lazy(
  () => import("./components/VgNestedDropdown/VgNestedDropdown")
);
const VgImageDropdown: React.LazyExoticComponent<React.FC<VgImageDropdownProps>> = lazy(
  () => import("./components/VgImageDropdown/VgImageDropdown")
);
const VgCheckoutCustomerDropdown: React.LazyExoticComponent<React.FC<VgCheckoutCustomerDropdownProps>> = lazy(
  () => import("./components/VgCheckoutCustomerDropdown/VgCheckoutCustomerDropdown")
);
const VgSlider: React.LazyExoticComponent<React.FC<VgSliderProps>> = lazy(
  () => import("./components/VgSlider/VgSlider")
);
const VgDragList: React.LazyExoticComponent<React.FC<VgDragListProps>> = lazy(
  () => import("./components/VgDragList/VgDragList")
);
const VgAlert: React.LazyExoticComponent<React.FC<VgAlertProps>> = lazy(
  () => import("./components/VgAlert/VgAlert")
);
const VgInformationNote: React.LazyExoticComponent<React.FC<VgInformationNoteProps>> = lazy(
  () => import("./components/VgInformationNote/VgInformationNote")
);
const VgAccordion: React.LazyExoticComponent<React.FC<VgAccordionProps>> = lazy(
  () => import("./components/VgAccordion/VgAccordion")
);
const VgProgressBar: React.LazyExoticComponent<React.FC<VgProgressBarProps>> = lazy(
  () => import("./components/VgProgressBar/VgProgressBar")
);

// Export all components
export {
  VgAddressControl,
  VgAvatar,
  VgBadge,
  VgBottomSheet,
  VgButton,
  VgCheckbox,
  VgColorPicker,
  VgDatePicker,
  VgDateRangePicker,
  VgDropdown,
  VgImageUploader,
  VgLinkControl,
  VgPassiveNotification,
  VgPhoneControl,
  VgPopup,
  VgToggle,
  VgTextarea,
  VgInput,
  VgTimePicker,
  VgTooltip,
  VgMapControl,
  VgSegments,
  VgSvg,
  VgTableGrid,
  VgGraph,
  VgStepper,
  VgReviewRating,
  VgThreeDotMenu,
  VgSmileyInput,
  VgLoginInput,
  VgTextEditor,
  VgVideoPlayer,
  VgCarousel,
  VgRadio,
  VgTab,
  VgAiPopup,
  VgNestedDropdown,
  VgImageDropdown,
  VgCheckoutCustomerDropdown,
  VgSlider,
  VgDragList,
  VgAlert,
  VgInformationNote,
  VgAccordion,
  VgProgressBar,
};
