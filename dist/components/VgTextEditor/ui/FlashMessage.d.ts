import './FlashMessage.scss';
import { ReactNode } from 'react';
export interface FlashMessageProps {
    children: ReactNode;
}
export default function FlashMessage({ children, }: FlashMessageProps): JSX.Element;
