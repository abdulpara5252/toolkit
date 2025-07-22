import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import "./VgVideoPlayer.scss";
type VideoJsPlayerOptions = Parameters<typeof videojs>[1];
interface FileInfo {
    fileName?: string;
    description?: string;
    uploadedBy?: string;
    uploadDate?: string;
    fileType?: string;
    dimensions?: string;
    size?: string;
}
export interface VgVideoPlayerProps {
    Src?: string;
    Poster?: string;
    Options?: VideoJsPlayerOptions;
    Width?: string;
    ShowHeader?: boolean;
    ShowFileInfo?: boolean;
    FileInfo?: FileInfo;
    OnDelete?: (e: any) => void;
    OnDownload?: (e: any) => void;
    OnInfo?: (e: any) => void;
    OnClose?: (e: any) => void;
}
declare const VgVideoPlayer: React.FC<VgVideoPlayerProps>;
export default VgVideoPlayer;
