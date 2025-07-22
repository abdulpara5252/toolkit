import React, { ChangeEvent } from "react";
import "./VgImageUploader.scss";
import "../VgButton/VgButton.scss";
import "../VgPopup/VgPopup.scss";
import "swiper/swiper-bundle.css";
export interface VgImageUploaderProps {
    ImagePosition?: "External" | "Internal";
    MaxFileSize?: number;
    SupportedFileFormate?: string[];
    Disabled?: boolean;
    Editor?: boolean;
    ImageUploaderId?: string;
    [key: string]: any;
    Name?: string;
    StoreOnAzureContainer?: boolean;
    GetContainerNameAPIUrl?: string;
    GetContainerNameAPIPayload?: Record<string, any>;
    DriveContainerName?: string;
    FileCount?: number;
    OnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    ImageDelete?: boolean;
    ImageUrl?: string;
    MaxFilePopupText?: string;
}
declare const VgImageUploader: React.FC<VgImageUploaderProps>;
export default VgImageUploader;
