import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import "./VgImageUploader.scss";
import "../VgButton/VgButton.scss";
import "../VgPopup/VgPopup.scss";
import heic2any from "heic2any";
import VgPopup from "../VgPopup/VgPopup";
import axios from "axios";
import {
  StoragePipelineOptions,
  StorageRetryPolicyType,
  AnonymousCredential,
  newPipeline,
  BlobServiceClient,
} from "@azure/storage-blob";
import VgButton from "../VgButton/VgButton";
import Svg from "../VgSvg/Svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination, Zoom } from "swiper/modules";
import "swiper/swiper-bundle.css";

import SimpleImageEditor from "./SimpleFileImageUploader/SimpleImageEditor";

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
  AllowMultipleUpload?: boolean;
}

interface FileData {
  file: File;
  id: string;
  name: string;
  size: number;
  description: string;
  type: string;
  preview?: string;
  slide?: string;
  height?: number;
  width?: number;
}

interface CarouselItems extends FileData {
  fileDescription: string;
  fileName: string;
  fileType: string;
  slide: string;
}

interface VgImageUploaderRef {
  validate: () => any;
}

interface UploadStatus {
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  url?: string;
}

const VALID_IMAGE_TYPES = ["gif", "jpg", "jpeg", "png", "bmp"].map(
  (type) => `image/${type}`
);
const VALID_VIDEO_TYPES = [
  "webm",
  "mpg",
  "mp2",
  "mpeg",
  "mpe",
  "mpv",
  "ogg",
  "mp4",
  "m4p",
  "m4v",
  "avi",
  "wmv",
  "mov",
  "qt",
  "flv",
  "swf",
  "avchd",
  "3gp",
  "3g2",
].map((type) => `video/${type}`);
const VALID_WORD_TYPES = [
  "doc",
  "dot",
  "wbk",
  "docx",
  "docm",
  "dotx",
  "dotm",
  "docb",
].map((type) => `application/msword`);
const VALID_EXCEL_TYPES = [
  "xls",
  "xlt",
  "xlm",
  "xlsx",
  "xlsm",
  "xltx",
  "xltm",
  "xlsb",
  "xla",
  "xlam",
  "xll",
  "xlw",
].map((type) => `application/vnd.ms-excel`);
const VALID_TEXT_TYPES = ["prn", "txt", "dif", "slk"].map(
  (type) => `text/plain`
);
const VALID_CSV_TYPES = ["csv"].map((type) => `text/csv`);
const VALID_PDF_TYPES = ["pdf"].map((type) => `application/pdf`);

const INVALID_EXTENSIONS = ["exe", "dob"];

const ALL_SUPPORTED_TYPES = [
  ...VALID_IMAGE_TYPES,
  ...VALID_VIDEO_TYPES,
  ...VALID_WORD_TYPES,
  ...VALID_EXCEL_TYPES,
  ...VALID_TEXT_TYPES,
  ...VALID_CSV_TYPES,
  ...VALID_PDF_TYPES,
];

const videoFileFormat: Record<string, string> = VALID_VIDEO_TYPES.reduce(
  (acc, curr) => {
    const extension = curr?.split("/")?.[1];
    acc = {
      ...acc,
      [extension]: `${curr}`,
    };
    return acc;
  },
  {}
);

const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB chunk size
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB max file size

const VgImageUploader: React.FC<VgImageUploaderProps> = forwardRef<
  VgImageUploaderRef,
  VgImageUploaderProps
>(
  (
    {
      ImagePosition = "External",
      MaxFileSize = 4,
      SupportedFileFormate = [
        "image/jpeg",
        "image/png",
        "image/heic",
        "image/jpg",
      ],
      Disabled = false,
      Editor = true,
      ImageUploaderId = "",
      Name = "",
      StoreOnAzureContainer = false,
      GetContainerNameAPIUrl = "",
      GetContainerNameAPIPayload = {},
      DriveContainerName = "",
      OnChange,
      FileCount = 1,
      ImageDelete = false,
      ImageUrl = "",
      MaxFilePopupText = '',
      AllowMultipleUpload = false, 
    },
    ref
  ) => {
    const Multiple = FileCount > 1;
    const [src, setSrc] = useState<string | undefined>("");
    const [editImage, setEditImage] = useState<string | null>(null);
    const [show, toggle] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [maxSizePopup, setMaxSizePopup] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<FileData[]>([]);
    const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [showPreview, setShowPreview] = useState({ show: false, src: "" });
    const [carouselItems, setCarouselItems] = useState<CarouselItems[]>([]);
    const [carouselItemIndex, setCarouselItemIndex] = useState(0);
    const [showFileInfo, setShowFileInfo] = useState(false);
    const [controlledSwiper, setControlledSwiper] = useState<any>(null);
    const [editIndex, setEditIndex] = useState(-1);
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [videoPopupSrc, setVideoPopupSrc] = useState("");
    const [edit, setEdit] = useState(false);
    const [deleteAction, setDeleteAction] = useState(false);
    const [deletepopup, setDeletePopup] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
      setEditImage(null);
      setShowPopup(false);
      setMaxSizePopup(false);
      toggle(false);
    };

    const getFileExtension = (fileName: string): string => {
      return fileName
        .slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2)
        .toLowerCase();
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

      const validation = () => {
       let validateObject = {
         [ImageUploaderId]: src,
         IsValidate: true,
         IsRequired: true,
         images: files, 
         id: ImageUploaderId,
         uploadImages: async () => {
          if (!StoreOnAzureContainer) return;
          for (let file of files) {
            await uploadFileInChunks(file.file, file.name);
            setFiles([]);
          }
        },
      };
      return validateObject;
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));

    const convertHeicToJpeg = async (file: File): Promise<File> => {
      try {
        // Convert HEIC to JPEG
        const convertedBlob = (await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        })) as Blob;

        // Create a new File object with JPEG extension
        return new File(
          [convertedBlob],
          file.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        );
      } catch (error) {
        console.error("HEIC conversion error:", error);
        throw new Error("Failed to convert HEIC file");
      }
    };

    // const handleImageUpload = async (file: File) => {
    //   let fileExtension: any = getFileExtension(file.name).toLowerCase();
    //   let mimeType: any = file.type.toLowerCase();
    //   const extensionToMimeTypeMap: Record<string, string> = {
    //     jpg: "image/jpeg",
    //     jpeg: "image/jpeg",
    //     png: "image/png",
    //     heic: "image/heic",
    //     ...videoFileFormat,
    //   };
    //   if (fileExtension === "heic") {
    //     try {
    //       file = await convertHeicToJpeg(file);
    //       // Update extension and mime type after conversion
    //       fileExtension = "jpg";
    //       mimeType = "image/jpeg";
    //     } catch (error) {
    //       setShowPopup(true);
    //       return;
    //     }
    //   }

    //   const isExtensionValid = Object.keys(extensionToMimeTypeMap).includes(
    //     fileExtension
    //   );
    //   const isMimeTypeValid = SupportedFileFormate.includes(mimeType);
    //   if (!isExtensionValid || !isMimeTypeValid) {
    //     setShowPopup(true);
    //     return;
    //   }
    //   const fileSizeInMB = file.size / (1024 * 1024);
    //   if (fileSizeInMB > MaxFileSize) {
    //     setShowPopup(true);
    //     setMaxSizePopup(true);
    //     return;
    //   }

    //   try {
    //     const imageBase64 = await convertFileToBase64(file);
    //     if (Editor) {
    //       if (videoFileFormat?.[fileExtension]) {
    //         setSrc(imageBase64);
    //       } else {
    //         toggle(true);
    //         setEditImage(imageBase64);
    //       }
    //       toggle(true);
    //       setEditImage(imageBase64);
    //     } else {
    //       setSrc(imageBase64);
    //     }
    //     const fileObj: FileData = {
    //       file,
    //       id: URL.createObjectURL(file),
    //       name: file.name,
    //       size: file.size,
    //       description: "",
    //       type: file.type,
    //       preview: URL.createObjectURL(file),
    //       slide: imageBase64,
    //     };
    //     if (editIndex > -1 && Multiple) {
    //       const newFiles = [...files];
    //       newFiles[editIndex] = fileObj;
    //       setFiles(newFiles);
    //       setEditIndex(-1);
    //       return;
    //     }
    //     setFiles((prev) => (Multiple ? [...prev, fileObj] : [fileObj]));
    //     if (!Editor) {
    //       // Call OnChange with the original file
    //       const event = {
    //         target: {
    //           files: Multiple ? [...files, fileObj] : [fileObj],
    //           value: imageBase64,
    //         },
    //       } as unknown as ChangeEvent<HTMLInputElement>;
    //       OnChange(event);
    //     }
    //   } catch (error) {
    //     setFiles([]);
    //     console.error("Error converting file to base64:", error);
    //   }
    // };


    const handleImageUpload = async (file?: File, ImageUrl?: string) => {

      const validateImageUrl = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      };

      if (ImageUrl && typeof ImageUrl === "string") {
        try {
          const isValidUrl = /^https?:\/\/.+\.(jpg|jpeg|png|heic|gif|webp|bmp|svg)$/i.test(ImageUrl);
          if (!isValidUrl) {
            setShowPopup(true);
            return;
          }

          const isValid = await validateImageUrl(ImageUrl);
          if (!isValid) {
            setShowPopup(true);
            return;
          }
          setSrc(ImageUrl);

          const fileObj: FileData = {
            file: new File([], ImageUrl),
            id: ImageUrl,
            name: ImageUrl.split("/").pop() || "image",
            size: 0,
            description: "",
            type: "url",
            preview: ImageUrl,
            slide: ImageUrl,
          };

          setFiles((prev) => (Multiple ? [...prev, fileObj] : [fileObj]));

          if (!Editor) {
            const event = {
              target: {
                files: Multiple ? [...files, fileObj] : [fileObj],
                value: ImageUrl,
              },
            } as unknown as ChangeEvent<HTMLInputElement>;
            OnChange(event);
          }

          return;
        } catch (error) {
          setShowPopup(true);
          return;
        }
      }

      // ...existing file upload logic...
      if (!file) return;

      let fileExtension: any = getFileExtension(file.name).toLowerCase();
      let mimeType: any = file.type.toLowerCase();
      const extensionToMimeTypeMap: Record<string, string> = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        heic: "image/heic",
        ...videoFileFormat,
      };
      if (fileExtension === "heic") {
        try {
          file = await convertHeicToJpeg(file);
          fileExtension = "jpg";
          mimeType = "image/jpeg";
        } catch (error) {
          setShowPopup(true);
          return;
        }
      }

      const isExtensionValid = Object.keys(extensionToMimeTypeMap).includes(fileExtension);
      const isMimeTypeValid = SupportedFileFormate.includes(mimeType);
      if (!isExtensionValid || !isMimeTypeValid) {
        setShowPopup(true);
        return;
      }
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MaxFileSize) {
        setShowPopup(true);
        setMaxSizePopup(true);
        return;
      }

      try {
        const imageBase64 = await convertFileToBase64(file);
        if (Editor) {
          if (videoFileFormat?.[fileExtension]) {
            setSrc(imageBase64);
          } else {
            toggle(true);
            setEditImage(imageBase64);
          }
          toggle(true);
          setEditImage(imageBase64);
        } else {
          setSrc(imageBase64);
        }
        const fileObj: FileData = {
          file,
          id: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          description: "",
          type: file.type,
          preview: URL.createObjectURL(file),
          slide: imageBase64,
        };
        if (editIndex > -1 && Multiple) {
          const newFiles = [...files];
          newFiles[editIndex] = fileObj;
          setFiles(newFiles);
          setEditIndex(-1);
          return;
        }
        setFiles((prev) => (Multiple ? [...prev, fileObj] : [fileObj]));
        if (!Editor) {
          const event = {
            target: {
              files: Multiple ? [...files, fileObj] : [fileObj],
              value: imageBase64,
            },
          } as unknown as ChangeEvent<HTMLInputElement>;
          OnChange(event);
        }
      } catch (error) {
        setFiles([]);
        console.error("Error converting file to base64:", error);
      }
    };

    useEffect(() => {
      if (ImageUrl && ImageUrl.trim() !== "") {
        handleImageUpload(undefined, ImageUrl);
      }
    }, [ImageUrl]);
    const handleDragOver = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (!Disabled) {
        setIsDragging(true);
      }
      if (Disabled) return;
      setIsDragging(true);
    };

    const handleDragLeave = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (Disabled) return;
      setIsDragging(false);
    };

    const handleDrop = (e: any) => {
      e.preventDefault();
      if (Disabled) return;
      setIsDragging(false);
      if (Multiple) {
        handleMultipleFileChange({
          ...e,
          target: { ...e.target, files: e?.dataTransfer?.files },
        });
        return;
      }
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleEdit = (index: number) => {
      setEdit(true)
      setShowMenu(false);
      setEditImage(files[index]?.preview ?? null);
      setEditIndex(index);
      if (Editor) {
        setTimeout(() => {
          toggle(true);
        }, 0);
      } else {
        fileInputRef.current?.click();
      }
    };

    const handleDelete = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setSrc("");
      setEditImage(null);
      setFiles(updatedFiles);

      // Call OnChange with null to indicate image removal
      const event = {
        target: {
          files: updatedFiles,
          value: "",
        },
      } as unknown as ChangeEvent<HTMLInputElement>;

      if(ImageDelete){
        setDeletePopup(false);
      }
      OnChange(event);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const targetElement = event.target as Element;
        if (
          showMenu &&
          targetElement instanceof Node &&
          menuRef.current &&
          !menuRef.current.contains(targetElement) &&
          !targetElement.closest(".vg-doticon")
        ) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [showMenu]);

    const handleCancel = () => {
      setEditImage(null);
      if(!edit || deleteAction){
        setFiles([]);
      }
      toggle(false);
      if (Multiple) {
        if (editIndex > -1) {
          setEditIndex(-1);
          return;
        }
        const fileCopy = [...files];
        fileCopy.splice(-1);
        setFiles(fileCopy);
      }
    };
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e?.stopPropagation();
      setDropdownVisible(!isDropdownVisible);
    };

    const isValidFileType = (file: File): boolean => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension && INVALID_EXTENSIONS.includes(extension)) {
        return false;
      }

      const fileType = file.type.toLowerCase();
      return ALL_SUPPORTED_TYPES.some((type) =>
        fileType.includes(type.toLowerCase())
      );
    };

    const getAzureToken = async (
      apiURL: string,
      apiPayload: Record<string, any>
    ) => {
      if (!apiURL) {
        try {
          const response = await axios.post(GetContainerNameAPIUrl, {
            DriveContainerName,
            ...apiPayload,
          });
          const { SASString, AzureStorageAccountName, containerName } =
            response.data;
          return { SASString, AzureStorageAccountName, containerName };
        } catch (e) {
          console.error("Failed to get SAS token from API", e);
          return {};
        }
      } else {
        return {};
      }
    };

    async function generateFileHash(file: File) {
      const buffer = await file.arrayBuffer(); // Read the file as an ArrayBuffer
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer); // Compute the hash using SHA-256
      return Array.from(new Uint8Array(hashBuffer)) // Convert hashBuffer to a byte array
        .map((byte) => byte.toString(16).padStart(2, "0")) // Convert each byte to a hex string
        .join(""); // Join all hex strings into a single hash
    }

    async function getFileVersion(file: File) {
      const fileName = file.name.split(".")[0]; // Get base name without extension
      const fileExtension = file.name.split(".").pop(); // Get file extension
      const fileHash = await generateFileHash(file); // Hash of file content

      // Check localStorage for existing entries
      const existingEntries = Object.keys(localStorage).filter((key) =>
        key.startsWith(fileName)
      );

      for (const entry of existingEntries) {
        const storedHash = JSON.parse(
          localStorage.getItem(entry) ?? ""
        ).fileHash;
        if (storedHash === fileHash) {
          return entry;
        }
      }

      // If it's a new version, find the next version number
      const versionNumbers = existingEntries.map((key) => {
        const match = key.match(/_v(\d+)$/); // Extract version number
        return match ? parseInt(match[1], 10) : 0;
      });

      const nextVersion = Math.max(...versionNumbers, 0) + 1;
      return `${fileName}_v${nextVersion}.${fileExtension}`;
    }

    const uploadFileInChunks = async (file: File, fileName: string) => {
      setIsImageUploading(true);
      const sasToken =
        "sp=racwdl&st=2025-01-09T11:39:36Z&se=2025-01-09T19:39:36Z&sv=2022-11-02&sr=c&sig=IvnNKug3sO%2B3slwjK0dDwEx4vxSEvkdnoZYwbHbPstM%3D";
      const accountName = "vagarotestaccount";
      const options = {
        retryOptions: {
          maxTries: 4,
          retryDelayInMs: 3 * 1000,
          maxRetryDelayInMs: 120 * 1000,
          retryPolicyType: StorageRetryPolicyType.EXPONENTIAL,
        },
      };

      const pipeline = newPipeline(new AnonymousCredential(), options);

      const tokeDetails = await getAzureToken(
        GetContainerNameAPIUrl,
        GetContainerNameAPIPayload
      );
      if (!tokeDetails && !Object.keys(tokeDetails || {}).length) {
        throw new Error("Could not get the SASString");
      }
      //change here to test
      const { SASString, AzureStorageAccountName, containerName } = tokeDetails;
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`,
        pipeline
      );
      const containerClient =
        blobServiceClient.getContainerClient("blobcontainer");
      const blobName = fileName;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const fileHash = await generateFileHash(file);

      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      const progressKey = await getFileVersion(file);
      let uploadedChunks = [];
      const progressData = localStorage.getItem(progressKey);

      if (progressData) {
        try {
          const parsedData = JSON.parse(progressData);
          if (parsedData.fileHash === fileHash) {
            uploadedChunks = parsedData.uploadedChunks;
          }
        } catch (error) {
          console.error("Failed to parse progress data:", error);
          localStorage.removeItem(progressKey);
        }
      }

      
      const timestamp = `${new Date().valueOf()}`; // Current timestamp

      if (file.size <= CHUNK_SIZE) {
        let blockId = `${blobName}-${timestamp}-block`;
        if (blockId.length > 64) {
          blockId = blockId.substring(0, 64);
        }
        try {
          await blockBlobClient.uploadBrowserData(file, {
            blobHTTPHeaders: { blobContentType: file.type }, // Set MIME type
          });

          localStorage.removeItem(progressKey);
        } catch (error) {
          console.error("Error uploading small file:", error);
          throw error;
        }
      } else {
        // Handle files greater than 4MB (chunked upload)
        for (let i = 0; i < totalChunks; i++) {
          if (
            uploadedChunks
              ?.map((chunk: { count: number }) => chunk.count)
              .includes(i)
          )
            continue;

          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          let blockId = `${String(i).padStart(5, "0")}${timestamp}`;
          if (blockId.length > 64) {
            blockId = blockId.substring(0, 64);
          }
          try {
            await blockBlobClient.stageBlock(btoa(blockId), chunk, chunk.size);
            uploadedChunks.push({ count: i, blockId: btoa(blockId) });
            localStorage.setItem(
              progressKey,
              JSON.stringify({ uploadedChunks, fileHash })
            );
          } catch (error) {
            console.error(`Error uploading chunk ${i + 1}:`, error);
            throw error;
          }
        }
        const blockList = uploadedChunks.map(
          (i: { count: number; blockId: string }) => {
            // Ensure it's the same timestamp as used in the upload process
            let blockId = `${String(i.count).padStart(5, "0")}${timestamp}`;
            if (blockId.length > 64) {
              blockId = blockId.substring(0, 64);
            }
            return i?.blockId ? i?.blockId : btoa(blockId);
          }
        );
        try {
          await blockBlobClient.commitBlockList(blockList, {
            blobHTTPHeaders: {
              blobContentType: file.type, // Change this to the appropriate type, like image/png, if needed
            },
          });
        } catch (e) {
          localStorage.removeItem(progressKey);
          throw new Error("Error committing block list: " + e);
        }
      }

      localStorage.removeItem(progressKey);
      setIsImageUploading(false);
    };

    const handleMultipleFileChange = async (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      if (!event.target.files) return;
      let selectedFiles: any = Array.from(event.target.files);
      if (editIndex > -1) {
        let preview: string | undefined;
        const file = event?.target?.files?.[0];
        // Generate preview for images
        if (file.type.startsWith("image/")) {
          if (file.type === "image/heic") {
            const convertedFile = await convertHeicToJpeg(file);
            preview = URL.createObjectURL(convertedFile);
          } else {
            preview = URL.createObjectURL(file);
          }
        }
        selectedFiles = [...files];
        selectedFiles[editIndex] = {
          ...selectedFiles[editIndex],
          preview,
          file,
        };
      }
      for (let file of selectedFiles) {
        let fileExtension: any = getFileExtension(file.name).toLowerCase();
        let mimeType: any = file.type.toLowerCase();

        const extensionToMimeTypeMap: Record<string, string> = {
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          heic: "image/heic",
          ...videoFileFormat,
        };
        const isExtensionValid = Object.keys(extensionToMimeTypeMap).includes(
          fileExtension
        );
        const isMimeTypeValid = SupportedFileFormate.includes(mimeType);

        if (!isExtensionValid || !isMimeTypeValid) {
          setShowPopup(true);
          return;
        }
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > MaxFileSize) {
          setShowPopup(true);
          setMaxSizePopup(true);
          return;
        }
      }
      const processedFiles = await Promise.all(
        selectedFiles.map(async (file: File) => {
          try {
            let preview: string | undefined;
            const slide = await convertFileToBase64(file);

            // Generate preview for images
            if (file.type.startsWith("image/")) {
              if (file.type === "image/heic") {
                const convertedFile = await convertHeicToJpeg(file);
                preview = URL.createObjectURL(convertedFile);
              } else {
                preview = URL.createObjectURL(file);
              }
            }

            // Check file size
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > MaxFileSize) {
              setMaxSizePopup(true);
              return null;
            }

            // Check for invalid file types first
            if (!isValidFileType(file)) {
              setShowPopup(true);
              return null;
            }

            const fileData: FileData = {
              file,
              id: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
              description: "",
              type: file.type,
              preview,
              slide,
            };
            return fileData;
          } catch (error) {
            console.error("Error processing file:", error);
            return null;
          }
        })
      );
      const validFiles = processedFiles.filter(
        (file): file is FileData => file !== null
      );
      const newFiles = Array.from(event.target.files).filter(
        (file) => file.size <= MAX_FILE_SIZE
      );
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setUploadStatuses((prevStatuses) => [
        ...prevStatuses,
        ...newFiles.map((file) => ({
          fileName: file.name,
          progress: 0,
          status: "pending" as const,
        })),
      ]);
    };

    const getCaraouselItems = async (files: FileData[]) => {
      const carouselItems: CarouselItems[] = [];
      for (let file of files) {
        if (!file.slide) {
          const src = await convertFileToBase64(file.file);
          carouselItems.push({
            ...file,
            fileDescription: file?.name,
            fileName: file?.type,
            fileType: getFileExtension(file?.name) ?? "",
            slide: src,
            size: 150,
          });
        } else {
          carouselItems.push({
            ...file,
            fileDescription: file?.name,
            fileName: file?.type,
            fileType: getFileExtension(file?.name) ?? "",
            slide: file?.slide,
          });
        }
      }
      return carouselItems;
    };

    const handleMultipleDelete = () => {
      setDeleteAction(true);
      const id = carouselItems?.[carouselItemIndex]?.id;
      const cloneFiles = files.filter((file) => file.id !== id);
      const updatedCarouselItems = carouselItems.filter(
        (item) => item.id !== id
      );

      let newCarouselIndex = carouselItemIndex;

      // Adjust the carousel index based on the deletion
      if (cloneFiles.length === 0) {
        // No files left
        newCarouselIndex = 0;
        setShowPreview((prev) => ({ ...prev, show: false }));
      } else if (carouselItemIndex >= cloneFiles.length) {
        // If the deleted item was the last, move to the previous index
        newCarouselIndex = cloneFiles.length - 1;
      } else {
        // Otherwise, stay at the same index
        newCarouselIndex = Math.min(carouselItemIndex, cloneFiles.length - 1);
      }

      setFiles(cloneFiles);
      setCarouselItems(updatedCarouselItems);
      setCarouselItemIndex(newCarouselIndex);

      // Update preview if there are remaining items
      if (cloneFiles.length > 0) {
        const previewSrc = updatedCarouselItems[newCarouselIndex]?.slide || "";
        setShowPreview((prev) => ({ ...prev, src: previewSrc }));
      }
      const event = {
        target: {
          files: cloneFiles,
          value: "",
        },
      } as unknown as ChangeEvent<HTMLInputElement>;
      OnChange(event);
    };

    const handleDescriptionChange = (id: string, description: any) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === id ? { ...file, description } : file
        )
      );
    };

    const handleNameChange = (id: string, name: any) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) => (file.id === id ? { ...file, name } : file))
      );
    };

    /**
     * Converts file size in bytes to a human-readable format (e.g., KB, MB, GB).
     * @param {number} bytes - The file size in bytes.
     * @param {number} decimals - The number of decimal places to include (default is 2).
     * @returns {string} - The formatted file size.
     */
    function formatFileSize(bytes: number, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${
        sizes[i]
      }`;
    }

    const handleShowFileInfo = () => {
      setShowFileInfo((prev) => !prev);
    };

    const getImageDimension: (
      src: string
    ) => Promise<{ width: number; height: number }> = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          const { width, height } = img;
          resolve({ width, height });
        };

        img.onerror = () => {
          new Error("Image load error");
        };

        img.src = src;
      });
    };

    const handleSlideChange = (swiper: any) => {
      setCarouselItemIndex(swiper.activeIndex);
    };

    const handleEditedImageSave = async (
      dataUrl: string,
      base64: string,
      height: number,
      width: number,
      fileDetails: Blob
    ) => {
      if (editIndex === -1) {
        setSrc(dataUrl);
        setShowPreview((prev) => ({ ...prev, src: dataUrl }));
      }
      try {
        toggle(false);
        const filesCopy = [...files];
        const fileObj =
          filesCopy[editIndex > -1 ? editIndex : files?.length - 1];
        const { width, height } = await getImageDimension(dataUrl);
        filesCopy[editIndex > -1 ? editIndex : files?.length - 1] = {
          ...fileObj,
          slide: dataUrl,
          height,
          width,
          preview: dataUrl,
        };
        if (editIndex > -1) {
          const carouselItems = await getCaraouselItems(filesCopy);
          setCarouselItems(carouselItems);
        }
        const event = {
          target: {
            files: filesCopy,
            value: dataUrl,
          },
        } as unknown as ChangeEvent<HTMLInputElement>;
        OnChange(event);
        setFiles(filesCopy);
        setEditIndex(-1);
      } catch (err) {
        console.error("Error in saving edited image", err);
      }
    };

    const handleDownload = (src: string, name: string) => {
      if (src) {
        const link = document.createElement("a");
        link.href = src;
        link.download = name || "demo"; // Use `fileName` or a default value
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("No video source available to download.");
      }
    };

    const checkVideoFile = (name: string) =>
      Object.keys(videoFileFormat)?.includes(getFileExtension(name ?? ""));

    const handleEditImage = () => {
      setEdit(true);
      setEditImage(carouselItems?.[carouselItemIndex]?.slide);
      setEditIndex(carouselItemIndex);
      setTimeout(() => {
        toggle(true);
      }, 0);
    };

    const handleVideoPopupClose = () => {
      setVideoPopupSrc("");
      setShowVideoPopup(false);
    };

    useEffect(() => {
      const handleFileUploadCancel = () => {
        setEditIndex(-1);
      };
      fileInputRef.current?.addEventListener("cancel", handleFileUploadCancel);
      return () => {
        fileInputRef.current?.removeEventListener(
          "cancel",
          handleFileUploadCancel
        );
      };
    }, []);

    useEffect(() => {
      if (showPreview.show) {
        // Disable scrolling on the body
        document.body.style.overflow = "hidden";
      } else {
        // Re-enable scrolling on the body
        document.body.style.overflow = "";
      }

      // Cleanup to reset scroll behavior on unmount
      return () => {
        document.body.style.overflow = "";
      };
    }, [showPreview.show]);

    const handleImageDelete = () => {
      setDeletePopup(true);
    }
    return (
        <div
          className={`vg-upload-group ${
            !Multiple
              ? `${ImagePosition === "Internal" ? "vg-imageposition-internal" : ""} ${
                  ImagePosition === "Internal" && src ? "vg-image-uploader-space" : ""
                }`
              : ""
          }`}
        >
        <div className={`vg-upload-flex`}>
          <div
            className={`vg-upload-drop ${"horizontal"} ${
              isDragging ? "drag-file" : ""
            } ${Disabled ? "vg-image-uploader-disabled" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={(e) => {
              e?.stopPropagation();
              if (Disabled) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={{
              display: files?.length < FileCount || !Multiple ? "" : "none",
            }}
          >
            <input
              aria-label="Upload a file"
              type="file"
              ref={fileInputRef}
              disabled={Disabled}
              id="fileupload"
              accept={SupportedFileFormate.join(", ")}
              onChange={AllowMultipleUpload ? handleMultipleFileChange : handleFileChange}
              className="vg-input-file"
              name={Name}
              multiple={AllowMultipleUpload}
            />
            {ImagePosition === "External" && (
              <>
                <div className="vg-upload-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    fill="currentColor"
                  >
                    <path d="M354.9 121.7c13.8 16 36.5 21.1 55.9 12.5c8.9-3.9 18.7-6.2 29.2-6.2c39.8 0 72 32.2 72 72c0 4-.3 7.9-.9 11.7c-3.5 21.6 8.1 42.9 28.1 51.7C570.4 276.9 592 308 592 344c0 46.8-36.6 85.2-82.8 87.8c-.6 0-1.3 .1-1.9 .2l-3.3 0-360 0c-53 0-96-43-96-96c0-41.7 26.6-77.3 64-90.5c19.2-6.8 32-24.9 32-45.3l0-.2s0 0 0 0s0 0 0 0c0-66.3 53.7-120 120-120c36.3 0 68.8 16.1 90.9 41.7zM512 480l0-.2c71.4-4.1 128-63.3 128-135.8c0-55.7-33.5-103.7-81.5-124.7c1-6.3 1.5-12.8 1.5-19.3c0-66.3-53.7-120-120-120c-17.4 0-33.8 3.7-48.7 10.3C360.4 54.6 314.9 32 264 32C171.2 32 96 107.2 96 200l0 .2C40.1 220 0 273.3 0 336c0 79.5 64.5 144 144 144l320 0 40 0 8 0zM223 255c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 384c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                </div>
                <div className="vg-upload-decs">
                  <p>Drag and drop files here or</p>
                  <a
                    className="vg-choose-file"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!Disabled) {
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    Choose File
                  </a>
                </div>
              </>
            )}
            {ImagePosition === "Internal" && (
              <>
                {!src || Multiple ? (
                  <>
                    <div className="vg-upload-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        fill="currentColor"
                      >
                        <path d="M354.9 121.7c13.8 16 36.5 21.1 55.9 12.5c8.9-3.9 18.7-6.2 29.2-6.2c39.8 0 72 32.2 72 72c0 4-.3 7.9-.9 11.7c-3.5 21.6 8.1 42.9 28.1 51.7C570.4 276.9 592 308 592 344c0 46.8-36.6 85.2-82.8 87.8c-.6 0-1.3 .1-1.9 .2l-3.3 0-360 0c-53 0-96-43-96-96c0-41.7 26.6-77.3 64-90.5c19.2-6.8 32-24.9 32-45.3l0-.2s0 0 0 0s0 0 0 0c0-66.3 53.7-120 120-120c36.3 0 68.8 16.1 90.9 41.7zM512 480l0-.2c71.4-4.1 128-63.3 128-135.8c0-55.7-33.5-103.7-81.5-124.7c1-6.3 1.5-12.8 1.5-19.3c0-66.3-53.7-120-120-120c-17.4 0-33.8 3.7-48.7 10.3C360.4 54.6 314.9 32 264 32C171.2 32 96 107.2 96 200l0 .2C40.1 220 0 273.3 0 336c0 79.5 64.5 144 144 144l320 0 40 0 8 0zM223 255c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 384c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>
                    </div>
                    <div className="vg-upload-decs">
                      <p>Drag and drop files here or</p>
                      <a
                        className="vg-choose-file"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!Disabled) {
                            fileInputRef.current?.click();
                          }
                        }}
                      >
                        Choose File
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="vg-upload-drop horizontal uploaded-pics"
                      style={{
                        backgroundImage: `url(${
                          files[files?.length - 1]?.preview
                        })`,
                      }}
                    >
                      {!Disabled && !ImageDelete && (
                        <div className="vg-dot-dropdown dropdown" ref={menuRef}>
                          <div
                            className="vg-tk-btn vg-btn-action vg-doticon"
                            onClick={toggleDropdown}
                          >
                            <svg
                              viewBox="0 0 14 4"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10.5 2C10.5 1.1875 11.1562 0.5 12 0.5C12.8125 0.5 13.5 1.1875 13.5 2C13.5 2.84375 12.8125 3.5 12 3.5C11.1562 3.5 10.5 2.84375 10.5 2ZM5.5 2C5.5 1.1875 6.15625 0.5 7 0.5C7.8125 0.5 8.5 1.1875 8.5 2C8.5 2.84375 7.8125 3.5 7 3.5C6.15625 3.5 5.5 2.84375 5.5 2ZM3.5 2C3.5 2.84375 2.8125 3.5 2 3.5C1.15625 3.5 0.5 2.84375 0.5 2C0.5 1.1875 1.15625 0.5 2 0.5C2.8125 0.5 3.5 1.1875 3.5 2Z" />
                            </svg>
                          </div>
                          {isDropdownVisible && (
                            <div className="vg-dropdown-menu">
                              <a
                                className="vg-dropdown-item"
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  handleEdit(0);
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="vg-dropdown-item vg-dropdown-del"
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  handleDelete(0);
                                }}
                              >
                                Delete
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                      {!Disabled && ImageDelete && (
                        <div className="vg-delete-dropdown" onClick={handleImageDelete}>
                          <span>Delete</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
         
          {Multiple && ImagePosition === "Internal"
            ? files?.map((file, index) => (
                <>
                  <div
                    className={`vg-upload-drop horizontal uploaded-pics ${
                      Disabled ? "vg-pics-disabled" : ""
                    }`}
                    style={{
                      backgroundImage: checkVideoFile(
                        files[files?.length - 1]?.name
                      )
                        ? ""
                        : `url(${file?.slide})`,
                      marginLeft: "8px",
                    }}
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => {
                      if (checkVideoFile(file?.name)) {
                        setShowVideoPopup(true);
                        setVideoPopupSrc(file?.preview ?? "");
                      }
                    }}
                  >
                    {checkVideoFile(file?.name) && (
                      <video
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      >
                        <source
                          src={file.preview}
                          type={`${file.type.toLowerCase()}`}
                        />
                      </video>
                    )}
                    {!Disabled && (
                      <div className="vg-dot-dropdown dropdown">
                        <div
                          className="vg-tk-btn vg-btn-action vg-doticon"
                          onClick={toggleDropdown}
                        >
                          <svg
                            viewBox="0 0 14 4"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.5 2C10.5 1.1875 11.1562 0.5 12 0.5C12.8125 0.5 13.5 1.1875 13.5 2C13.5 2.84375 12.8125 3.5 12 3.5C11.1562 3.5 10.5 2.84375 10.5 2ZM5.5 2C5.5 1.1875 6.15625 0.5 7 0.5C7.8125 0.5 8.5 1.1875 8.5 2C8.5 2.84375 7.8125 3.5 7 3.5C6.15625 3.5 5.5 2.84375 5.5 2ZM3.5 2C3.5 2.84375 2.8125 3.5 2 3.5C1.15625 3.5 0.5 2.84375 0.5 2C0.5 1.1875 1.15625 0.5 2 0.5C2.8125 0.5 3.5 1.1875 3.5 2Z" />
                          </svg>
                        </div>
                        {isDropdownVisible && (
                          <div className="vg-dropdown-menu">
                            <a
                              className="vg-dropdown-item"
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleEdit(index);
                              }}
                            >
                              Edit
                            </a>
                            <a
                              className="vg-dropdown-item vg-dropdown-del"
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleDelete(index);
                              }}
                            >
                              Delete
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ))
            : null}
          {ImagePosition === "External" && (
            <div
              className={`vg-upload-photo vg-appdragphoto`}
              onClick={async () => {
                setShowPreview((prev) => ({ ...prev, show: true }));

                const carouselItems = await getCaraouselItems(files);
                setCarouselItems(carouselItems);
                setShowFileInfo(true);
              }}
              style={{
                display: files?.length ? "block" : "none",
                backgroundImage: checkVideoFile(files[files?.length - 1]?.name)
                  ? ""
                  : `url(${files[files?.length - 1]?.preview})`,
              }}
            >
              {checkVideoFile(files[files?.length - 1]?.name) && (
                <div className="upload-icon-box type-video">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M336.2 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h288.2c26.4 0 47.8-21.3 47.8-47.7V111.7c0-26.4-21.4-47.7-47.8-47.7zM528 96c-14.2 0-28.4 4.7-39.6 14.2L416 176v160l72.4 65.8c11.2 9.5 25.4 14.2 39.6 14.2c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48z" />
                  </svg>
                </div>
              )}
              <div
                className={`vg-appdragphoto-hover`}
                style={
                  files?.length > 1
                    ? { backgroundColor: "rgba(0,0,0,0.5)", display: "block" }
                    : { display: "none" }
                }
              >
                <div className="vg-numofPhotos">
                  <strong>{files?.length}</strong>
                  <span>Files</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {show && (
          <SimpleImageEditor
            src={editImage as string}
            onClose={handleCancel}
            onSave={handleEditedImageSave}
          />
        )}
        {showPopup && (
          <div className="modal-overlay">
            <div
              className={`vg-modal-dialog mobilefullScreen vg-modalsummary modal-dialog-centered modal-dialog-scrollable center small`}
            >
              <div className="vg-modal-content">
                <div className="vg-modal-header">
                  <div className="vg-modal-title">
                    {maxSizePopup ?  `${MaxFilePopupText}` : "Invalid File Type"}
                  </div>
                   <div className="vg-btn-close" onClick={handleClose} id="close">
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
                  {maxSizePopup
                    ? `File size limit exceeds ${MaxFileSize} MB`
                    : `Upload a valid ${SupportedFileFormate?.map(
                        (format: string) =>
                          format?.split("/")?.[1]?.toUpperCase() ?? ""
                      ).join(", ")} file`}
                </div>
                <div className="vg-modal-footer">
                  <button
                    onClick={handleClose}
                    className="vg-tk-btn vg-btn-primary"
                    style={{ marginLeft: "auto" }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showVideoPopup && (
          <VgPopup
            CloseBackTitle="From Control"
            CloseButton
            Footer={2}
            FooterButton="none"
            Popupopen={showVideoPopup}
            PopupId="video-popup"
            Size="medium"
            PopupBody={() => (
              <>
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <source src={videoPopupSrc} />
                </video>
              </>
            )}
            TimerCount={0}
            VagaroToolkit={1}
            customClassName=""
            onClose={handleVideoPopupClose}
          />
        )}
        {showPreview?.show && (
          <div className={` ${showPreview?.show ? "full-screen" : "vg-group"}`}>
            <div className="vg-image-wrapper">
              <div className="vg-video-grid-toolbar">
                <div className="vg-video-header">
                  <div className="vg-video-filter-button">
                    <div
                      className="vg-video-action"
                      id="download-button"
                      onClick={() =>
                        handleDownload(
                          carouselItems[carouselItemIndex]?.slide,
                          carouselItems[carouselItemIndex]?.name
                        )
                      }
                    >
                      <Svg name="download" />
                    </div>
                    {!Disabled && (
                      <div
                        className={`vg-video-action`}
                        onClick={handleMultipleDelete}
                      >
                       
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentcolor"
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`vg-video-action ${
                        showFileInfo ? "active" : ""
                      }`}
                      onClick={handleShowFileInfo}
                    >
                      <Svg name="info_circle" />
                    </div>
                    {!checkVideoFile(
                      carouselItems?.[carouselItemIndex]?.name
                    ) &&
                      !Disabled && Editor && (
                        <div
                          className={`vg-video-action `}
                          onClick={handleEditImage}
                        >
                          <Svg name="edit" />
                        </div>
                      )}
                  </div>
                </div>
                <div className="vg-video-action vg-video-ml-auto">
                  <VgButton
                    ButtonIcon=""
                    ButtonVariant="close"
                    ButtononClick={() => {
                      setShowPreview((prev) => ({ ...prev, show: false }));
                      setCarouselItemIndex(0);
                    }}
                    ButtononHover={() => {}}
                  />
                </div>
              </div>
              <div className="vg-image-with-info">
                <div
                  className={`vg-fullscreen-image-container ${
                    files?.length === 1 ? "single-file" : ""
                  }`}
                >
                  <Swiper
                    controller={{ control: controlledSwiper }}
                    centeredSlides
                    modules={[Navigation, Pagination, Zoom, Controller]}
                    pagination={{
                      clickable: true,
                      renderBullet: function (
                        index: number,
                        className: string
                      ) {
                        const isVideoSlide = VALID_VIDEO_TYPES.includes(
                          files[index]?.type
                        );

                        if (isVideoSlide) {
                          // Triangle icon for video slides
                          return `<span class="${className} video-bullet"></span>`;
                        }
                        // Regular dot for image slides
                        return `<span class="${className}"></span>`;
                      },
                    }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    onSlideChange={handleSlideChange}
                    onSwiper={setControlledSwiper}
                    initialSlide={carouselItemIndex}
                  >
                    {carouselItems.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="swiper-zoom-container">
                          {VALID_VIDEO_TYPES.includes(image.type) ? (
                            <video
                              controls
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                              id={`swiper-video-${index}`}
                            >
                              <source src={image.preview} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              src={image.slide}
                              alt={image.name}
                              onError={() =>
                                console.error("Image failed to load:", image)
                              }
                            />
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                    <div className="swiper-button-prev custom-nav-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                      </svg>
                    </div>
                    <div className="swiper-button-next custom-nav-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                      </svg>
                    </div>
                  </Swiper>
                </div>
                {showFileInfo && (
                  <div className="vg-image-info">
                    <div className="vg-image-fileinfro-section">
                      <div className="fileinfor-heading">File Name</div>
                      <div className="fileinfo-details">
                        {carouselItems?.[carouselItemIndex]?.name}
                      </div>
                    </div>

                    <div className="vg-image-fileinfro-section">
                      <div className="fileinfor-heading">File Type</div>
                      <div className="fileinfo-details">
                        {carouselItems?.[
                          carouselItemIndex
                        ]?.fileType?.toUpperCase() ?? "-"}
                      </div>
                    </div>

                    <div className="vg-image-fileinfro-section">
                      <div className="fileinfor-heading">File Dimensions</div>
                      <div className="fileinfo-details">{`${
                        carouselItems?.[carouselItemIndex]?.width &&
                        carouselItems?.[carouselItemIndex]?.height
                          ? `${carouselItems?.[carouselItemIndex]?.width} X ${
                              carouselItems?.[carouselItemIndex].height ?? ""
                            }`
                          : "-"
                      } `}</div>
                    </div>

                    <div className="vg-image-fileinfro-section">
                      <div className="fileinfor-heading">File Size</div>
                      <div className="fileinfo-details">
                        {formatFileSize(
                          carouselItems?.[carouselItemIndex]?.file?.size
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {deletepopup && (
          <VgPopup
          ButtonPrimary="Delete"
          ButtonSecondary="Cancel"
          CloseBackTitle="From Control"
          CloseButton
          Footer={2}
          FooterButton="both"
          OnClickPrimary={() => handleDelete(0)}
          OnClickSecondary={() => setDeletePopup(false)}
          PopupId="PopupId"
          PopupTitle="Delete Profile Picture"
          Popupopen
          PrimaryButtonVariant="primary"
          SecondaryButtonVariant="secondary"
          Size="small"
          TextDescription="Your photo will be permanently removed from the database. Are you sure you want to remove photo?"
          TimerCount={0}
          VagaroToolkit={1}
          customClassName=""
          onClose={() => setDeletePopup(false)}
        />
        )}
      </div>
    );
  }
);

export default VgImageUploader;