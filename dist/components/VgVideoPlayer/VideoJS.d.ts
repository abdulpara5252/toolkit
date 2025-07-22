import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";
type VideoJsPlayerOptions = Parameters<typeof videojs>[1];
interface VideoJSProps {
    options: VideoJsPlayerOptions;
    onReady?: (player: Player) => void;
}
export declare const VideoJS: React.FC<VideoJSProps>;
export default VideoJS;
