import React, { useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import "./VgVideoPlayer.scss";
import Player from "video.js/dist/types/player";
import VideoJS from "./VideoJS";
import Svg from "../VgSvg/Svg";
import VgButton from "../VgButton/VgButton";
import { utils } from "../../utils/utils";

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

const VgVideoPlayer: React.FC<VgVideoPlayerProps> = ({
    Src,
    Poster,
    Options,
    FileInfo = {
        fileName: "Unknown",
        description: "No description",
        uploadedBy: "Unknown",
        uploadDate: "Unknown",
        fileType: "Unknown",
        dimensions: "Unknown",
        size: "Unknown",
    },
    Width,
    ShowHeader,
    ShowFileInfo,
    OnDelete,
    OnDownload,
    OnInfo,
    OnClose
}) => {
    const [showInfo, setShowInfo] = useState<boolean>(ShowFileInfo ?? false);
    const [showHeaders, setShowHeaders] = useState<boolean>(ShowHeader ?? false);
    const isandroidiospro = utils.CheckIsFromProAppWithoutState();
    

    // Synchronize `showInfo` with `showFileInfo` prop
    useEffect(() => {
        setShowInfo(ShowFileInfo ?? false);
    }, [ShowFileInfo]);

    useEffect(() => {
        setShowHeaders(ShowHeader ?? false);
    }, [ShowHeader]);


    const defaultOptions: VideoJsPlayerOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        Poster,
    };

    const getMimeType = (src: string | undefined): string => {
        if (!src) return "video/mp4"; // Default MIME type

        // Check if the URL is a YouTube link
        if (src.includes("youtube.com") || src.includes("youtu.be")) {
            return "video/youtube";
        }

        const extension = src.split(".").pop()?.toLowerCase();

        switch (extension) {
            case "mp4":
                return "video/mp4";
            case "webm":
                return "video/webm";
            case "ogg":
                return "video/ogg";
            case "m3u8":
                return "application/x-mpegURL";
            case "mpeg":
                return "video/mpeg";
            case "avi":
                return "video/avi";
            case "mov":
                return "video/quicktime";
            case "mkv":
                return "video/x-matroska";
            case "flv":
                return "video/x-flv";
            case "3gp":
                return "video/3gpp";
            case "hevc":
                return "video/mp4"; // HEVC encoded MP4
            default:
                return "video/mp4"; // Default MIME type
        }
    };


    const mergedOptions: VideoJsPlayerOptions = {
        ...defaultOptions,
        ...Options,
        poster: Options?.poster || Poster,
        sources: [
            {
                src: Src,
                type: getMimeType(Src), // Use the helper function to infer MIME type
            },
        ],
        techOrder: ["youtube", "html5"],
        controlBar: {
            fullscreenToggle: isandroidiospro ? false : true,
            pictureInPictureToggle: isandroidiospro ? false: true,
            volumePanel: isandroidiospro ? false : true, 
        },
    };
    

    const handlePlayerReady = (player: Player) => {
        player.on("waiting", () => {
            videojs.log("player is waiting");
        });

        player.on("dispose", () => {
            videojs.log("player will dispose");
        });
    };

    const handleDownload = (e: any) => {
        if (OnDownload) {
            OnDownload(e)
        }
        if (Src) {
            const link = document.createElement("a");
            link.href = Src;
            link.download = FileInfo.fileName || "video.mp4"; // Use `fileName` or a default value
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("No video source available to download.");
        }
    };

    const handleInfo = (e: any) => {
        if(OnInfo) {
            OnInfo(e)
        }
        setShowInfo(!showInfo)
    }

    const handleDelete = (e: any) => {
        if (OnDelete) {
            OnDelete(e)
        }
    }

    return (
        <div className="vg-group">
            <div className="vg-vedio-box">
                <div className="vg-video-wrapper">
                    {showHeaders && (<div className="vg-video-grid-toolbar">
                        <div className="vg-video-header">
                            <div>Video name.mp4</div>
                            <div className="vg-video-filter-button">
                                <div className="vg-video-action">
                                    <Svg name="download" onClick={(e) => {handleDownload(e)}}/>
                                </div>
                                <div className="vg-video-action">
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => {handleDelete(e)}} viewBox="0 0 448 512" fill="currentcolor"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                </div>
                                <div className="vg-video-action">
                                    <Svg name="info_circle" onClick={(e) => {handleInfo(e)}}/>
                                </div>
                            </div>
                        </div>
                        <div className="vg-video-action vg-video-ml-auto">
                            <VgButton
                                ButtonIcon=""
                                ButtonVariant="close"
                                ButtononClick={OnClose}
                                ButtononHover={() => { }}
                            />
                        </div>
                    </div>
                    )}
                    <div className="vg-video-with-info">
                        <div className="vg-video-video-container">
                            <div className="video" style={{ width: Width}}>
                                <VideoJS options={mergedOptions} onReady={handlePlayerReady} />
                            </div>
                        </div>
                        {showInfo && (
                            <div className="vg-video-info">

                                <div className="vg-video-fileinfro-section">
                                    <div className="fileinfor-heading">File Name</div>
                                    <div className="fileinfo-details">{FileInfo.fileName}</div>
                                </div>

                                <div className="vg-video-fileinfro-section">
                                    <div className="fileinfor-heading">File Description</div>
                                    <div className="fileinfo-details">{FileInfo.description}</div>
                                </div>

                                <div className="vg-video-fileinfro-section">
                                    <div className="fileinfor-heading">File UploadedBy</div>
                                    <div className="fileinfo-details">{FileInfo.uploadedBy}</div>
                                </div>

                                <div className="vg-video-fileinfro-section">
                                    <div className="fileinfor-heading">File UploadDate</div>
                                    <div className="fileinfo-details">{FileInfo.uploadDate}</div>
                                </div>

                                <div className="vg-video-fileinfro-section">
                                    <div className="fileinfor-heading">File FileType</div>
                                    <div className="fileinfo-details">{FileInfo.fileType}</div>
                                </div>

                                <div className="vg-video-fileinfro-section">
                                    <div className="fileinfor-heading">File Dimensions</div>
                                    <div className="fileinfo-details">{FileInfo.dimensions}</div>
                                </div>

                                <div className="vg-video-fileinfro-section">
                                    <div className="fileinfor-heading">File Size</div>
                                    <div className="fileinfo-details">{FileInfo.size}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default VgVideoPlayer;
