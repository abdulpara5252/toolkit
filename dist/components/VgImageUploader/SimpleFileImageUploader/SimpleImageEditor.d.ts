import "./_image_editor.scss";
export default function SimpleImageEditor({ src, onSave, onClose, forceMaxSize }: {
    forceMaxSize?: number;
    src: string;
    onSave: (dataUrl: string, base64: string, height: number, width: number, fileDetails: Blob) => void;
    onClose: () => void;
    maxImageSize?: number;
}): import("react/jsx-runtime").JSX.Element;
