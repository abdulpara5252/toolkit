import React from 'react';
import './VgLinkControl.scss';

export interface VgLinkControlProps {
  URL?: string;
  LinkControlText?: React.ReactNode;
  UnderLine?: 'always' | 'onhover' | 'none';
  Icon?: 'plus' | 'leftarrow';
  OnClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  Disable?: boolean;
}

const VgLinkControl: React.FC<VgLinkControlProps> = ({
  URL = '',
  LinkControlText,
  UnderLine,
  Icon = false,
  OnClick,
  Disable = false,
}) => {
  const iconClass = Icon ? 'vg-link-plus-icon' : '';
  const underlineClass =
  UnderLine === 'always'
      ? 'vg-btn-underline-always'
      : UnderLine === 'onhover'
      ? 'vg-btn-underline-onhover'
      : 'vg-btn-underline-none';
  const disabledClass = Disable ? 'vg-btn-disabled' : '';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (Disable) {
      e.preventDefault();
      return;
    }
    OnClick && OnClick(e);
  };

  const icon = () => {
    if (Icon === 'plus') {
      return (
        <svg viewBox="0 0 14 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z" />
        </svg>
      );
    }
  
    if (Icon === 'leftarrow') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
        </svg>
      );
    }
  
    return null;
  };

  return (
    <>
      <a
        href={Disable ? '': URL}
        className={`vg-link-btn ${underlineClass} ${disabledClass}`}
        onClick={handleClick}
      >
        {Icon && <span className="link-svg">{icon()}</span>}
        {LinkControlText}
      </a>
    </>
  );
};

export default VgLinkControl;