import React, { useEffect, useState } from "react";
import "./VgAvatar.scss";


export interface VgAvtarProps {
  NoProfile?: string;
  AvatarSize?: string;
  ProfileUrl?: string;
}

const VgAvatar: React.FC<VgAvtarProps> = ({
  NoProfile = "",
  AvatarSize = "",
  ProfileUrl = "",
}) => {
  const getInitials = (name: string) => {
    const names = name.split(" ").filter(Boolean);

    // If there are only two words, return the first letter of both
    if (names.length === 2) {
      const firstInitial = names[0].charAt(0).toUpperCase();
      const secondInitial = names[1].charAt(0).toUpperCase();
      return firstInitial + secondInitial;
    }

    // If there are more than two words, filter for capitalized words
    const capitalizedWords = names.filter(word => word.charAt(0) === word.charAt(0).toUpperCase());

    // If there are two or more capitalized words, return the initials
    if (capitalizedWords.length >= 2) {
      const firstInitial = capitalizedWords[0].charAt(0).toUpperCase();
      const secondInitial = capitalizedWords[1].charAt(0).toUpperCase();
      return firstInitial + secondInitial;
    }

    // If no capitalized words are found, still return the initials of the first two words (not filtered by capitalization)
    return names.length >= 2
      ? names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
      : names[0]?.charAt(0).toUpperCase() || "";
  };

  const initials = NoProfile ? getInitials(NoProfile) : "";
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [showFallback, setShowFallback] = useState<boolean>(false);

  useEffect(() => {
    if (ProfileUrl) {
      const id = setTimeout(() => {
        setShowFallback(false);
      }, 3000);

      const img = new Image();
      img.src = ProfileUrl;
      img.onload = () => {
        setImageLoaded(true);
        clearTimeout(id);
        setShowFallback(false);
      };
      img.onerror = () => {
        clearTimeout(id);
        setShowFallback(true);
      };

      return () => {
        clearTimeout(id);
        setShowFallback(true);
      };
    }
  }, [ProfileUrl]);
  return (
    <div className={`vg-avatar`}>
      <div className="vg-d-flex">
        {showFallback || !imageLoaded ? (
          <div
            className={`vg-avatar-xlarge vg-avatar-default ${
                AvatarSize === "X-Small"
                ? "vg-avatar-xsmall"
                : AvatarSize === "Small"
                ? "vg-avatar-small"
                : AvatarSize === "Medium"
                ? "vg-avatar-medium"
                : AvatarSize === "Large"
                ? "vg-avatar-large"
                : "vg-avatar-large"
            }`}
          >
            <span
              className={`vg-avatar-text`}
            >
              {initials}
            </span>
          </div>
        ) : (
          <div
            className={`vg-avatar-xlarge vg-avatar-default  ${
                AvatarSize === "X-Small"
                ? "vg-avatar-xsmall"
                : AvatarSize === "Small"
                ? "vg-avatar-small"
                : AvatarSize === "Medium"
                ? "vg-avatar-medium"
                : AvatarSize === "Large"
                ? "vg-avatar-large"
                : "vg-avatar-large"
            }`}
            style={{
              backgroundImage: `url(${ProfileUrl})`,
            }}
          >
            <span className="vg-avatar-text" style={{ display: "none" }}>
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VgAvatar;