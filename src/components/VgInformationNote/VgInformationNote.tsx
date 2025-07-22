import React from 'react';
import './VgInformationNote.scss';

export type VgInformationNoteVariant = 'information' | 'warning' | 'error';

export interface VgInformationNoteProps {
  Variant: VgInformationNoteVariant;
  Title?: string;
  Children: React.ReactNode;
  LinkText?: string;
  OnLinkClick?: () => void;
}

export const VgInformationNote: React.FC<VgInformationNoteProps> = ({
  Variant,
  Title,
  Children,
  LinkText,
  OnLinkClick,
}) => {
  return (
    <div className={`vg-information-note text-[15px] leading-[20px] font-normal px-4 py-3 rounded-[3px] w-full vg-information-note--${Variant}`}>
      <div className="vg-information-note__title font-medium">
        {Title && <span>{Title}</span>}
      <span className="vg-information-note__content font-normal">
        {Children}
        {LinkText && (
          <a
            className="vg-information-note__link cursor-pointer underline"
            onClick={OnLinkClick}
          >
            {LinkText}
          </a>
        )}
      </span>
      </div>
    </div>
  );
};

export default VgInformationNote; 