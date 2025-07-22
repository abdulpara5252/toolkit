declare const SetDefaultValuePlugin: ({ defaultValue, onChange }: {
    defaultValue: string;
    onChange?: (data: {
        html: string;
        text: string;
    }) => void;
}) => null;
export default SetDefaultValuePlugin;
