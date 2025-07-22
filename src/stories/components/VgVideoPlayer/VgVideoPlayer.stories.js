import VgVideoPlayer from "../../../components/VgVideoPlayer/VgVideoPlayer";

export default {
    title: "Video Player",
    component: VgVideoPlayer,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Configurable Video.js player with customizable options.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        Poster: {
            description: "The URL of the poster image displayed before playback.",
            control: "text",
            defaultValue: "https://via.placeholder.com/800x450.png",
        },
        Src: {
            description: "The URL of the video file to play. This can be a YouTube embed URL or a video file URL.",
            control: "text",
            defaultValue: "https://www.youtube.com/embed/cDEEMxnZtaE",
        },
        Width: {
            description: "Specifies the width of the video player in pixels or percentage. Use values like `800px` or `100%`.",
            control: "text",
            defaultValue: "900px",
        },
        Options: {
            description: "Additional options for configuring the Video.js player.",
            control: "object",
            defaultValue: {
                autoplay: false,
                controls: true,
                responsive: true,
                preload: "auto",
                muted: true
            },
        },
        ShowHeader: {
            description: "A boolean flag that determines whether the header section (including the video name and toolbar with actions like download, delete, and info toggle) is displayed above the video player. When set to `true`, the header is visible; when set to `false`, it is hidden.",
            control: "boolean",
            defaultValue: true,
        },        
        ShowFileInfo: {
            description: "A boolean flag that determines whether the video file information (such as file name, description, uploader, etc.) is displayed below the video player. When set to `true`, the file information is visible; when set to `false`, it is hidden.",
            control: "boolean",
            defaultValue: true,
        },
        FileInfo: {
            description: "Metadata about the video file, including name, description, uploader, and more.",
            control: "object",
            defaultValue: {
                fileName: "Sample Video.mp4",
                description: "This is a sample video description.",
                uploadedBy: "John Doe",
                uploadDate: "2024-12-01",
                fileType: "MP4",
                dimensions: "1920x1080",
                size: "15 MB",
            },
            if: { arg: "ShowFileInfo", eq: true },
        },
        OnDelete: {
            description: "Callback function triggered when the delete action is performed.",
            action: "delete",
        },
        OnDownload: {
            description: "Callback function triggered when the download action is performed.",
            action: "download",
        },
        OnInfo: {
            description: `
                A callback function triggered when the information icon or button is clicked. 
                This action is typically used to display additional metadata or information about the video. 
                
                **Example Use Cases:**
                - Display a modal with extended details about the video, such as duration, resolution, codec, etc.
                - Trigger a sidebar with video-related insights.
                - Log or analyze user interactions for analytics purposes.
                
                **Callback Parameters:**
                - Receives an event object or metadata object, depending on implementation.
                
                **Default Behavior:**
                - Logs the event to the console unless overridden.
            `,
            action: "info",
        },
        OnClose: {
            description: "Callback function triggered when the Close action is performed.",
            action: "close",
        },
    },
};

export const VideoPlayer = {
    args:{
        Src:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        Poster:"https://via.placeholder.com/800x450.png",
        Options:{
            "autoplay": false,
            "controls": true,
            "responsive": true,
            "muted": true,
        },
        Width:"900px",
        ShowHeader:true,
        ShowFileInfo:false,
        FileInfo:{
            fileName:"Sample Video.mp4",
            description:"This is a sample video description.",
            uploadedBy:"John Doe",
            uploadDate:"2024-12-01",
            fileType:"MP4",
            dimensions:"1920x1080",
            size:"15 MB",
        },
        OnDelete:(e) => {},
        OnDownload:(e) => {},
        OnInfo:(e) => {},
        OnClose:(e) => {},
    },
};
