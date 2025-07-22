import './Input.scss';
type Props = Readonly<{
    'data-test-id'?: string;
    accept?: string;
    label: string;
    onChange: (files: FileList | null) => void;
}>;
export default function FileInput({ accept, label, onChange, 'data-test-id': dataTestId, }: Props): JSX.Element;
export {};
