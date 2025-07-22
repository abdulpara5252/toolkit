import './Select.scss';
type SelectIntrinsicProps = JSX.IntrinsicElements['select'];
interface SelectProps extends SelectIntrinsicProps {
    label: string;
}
export default function Select({ children, label, className, ...other }: SelectProps): JSX.Element;
export {};
