import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "./VgSegments.scss";
import Svg from "../VgSvg/Svg";
import VgTooltip from "../VgTooltip/VgTooltip";

export interface VgSegmentsProps {
  Title?: string;
  onClick?: (
    tabId: number,
    tabName: string,
    e: React.MouseEvent<HTMLElement>
  ) => void;
  Name?: { id: number; name: string | React.ReactNode}[];
  ActiveSegment?: number | number[] | null | string;
  NoOfSegments: string;
  TabSegment?: "vertical" | "horizontal";
  InfoTooltipMessage?: string;
  BeakPosition?: "Left" | "Middle" | "Right";
  Multi?: boolean;
  Html?: boolean;
  TextAlignment?: "center" | "left" | "right";
  TabDesign?: boolean;
  FullWidth?: boolean;
  Required?: boolean;
  CustomErrorMessage?: string;
}

interface VgSegmentsRef {
  validate: () => any;
}

const VgSegments = forwardRef<
  VgSegmentsRef,
  VgSegmentsProps
>(
  (
    {
      Title,
      onClick,
      NoOfSegments = "2",
      ActiveSegment = null,
      InfoTooltipMessage,
      TabSegment,
      Name = [],
      BeakPosition = "Middle",
      Multi = false,
      Html,
      TextAlignment,
      TabDesign = false,
      FullWidth = false,
      Required = false,
      CustomErrorMessage = "",
    },
    ref
  ) => {
    const [activeSegmentId, setActiveSegmentId] = useState<number | number[] | null>(
      Multi ? [] : null
    );
    const [isValidationError, setIsValidationError] = useState(false);

      useEffect(() => {
        if (Multi && Array.isArray(ActiveSegment)) {
          // Convert 1-based indexes to ids
          const ids = ActiveSegment.map((index) => Name[index - 1]?.id).filter(
            Boolean
          );
          setActiveSegmentId(ids);
          if (Required && ids.length > 0) {
          setIsValidationError(false);
        }
        } else if (!Multi) {
          if (ActiveSegment === null || ActiveSegment === undefined) {
            setActiveSegmentId(null);
          } else if (typeof ActiveSegment === "number") {
            const activeId = ActiveSegment === 0 ? Name[0]?.id : Name[ActiveSegment - 1]?.id;
            setActiveSegmentId(activeId ?? null);
            if (Required && activeId != null) {
              setIsValidationError(false);
            }
          }
        }
      }, [ActiveSegment, Name, Multi, Required]);

      const handleTabClick = (
        tabId: number,
        tabName: string | any,
        e: React.MouseEvent<HTMLElement>
      ) => {
        if (Multi) {
          setActiveSegmentId((prev) => {
            const prevArr = Array.isArray(prev) ? prev : [];
            const alreadySelected = prevArr.includes(tabId);
            const updated = alreadySelected
              ? prevArr.filter((id) => id !== tabId)
              : [...prevArr, tabId];
              if (Required) {
      setIsValidationError(updated.length === 0);
    }
            return updated;
          });
        } else {
          setActiveSegmentId(tabId);
          if (Required) {
            setIsValidationError(false);
          }
        }

      if (onClick) {
        onClick(tabId, tabName, e);
      }
    };

      const validation = () => {
        const hasSelection = Multi
        ? Array.isArray(activeSegmentId) && activeSegmentId.length > 0
        : activeSegmentId !== null;
      const isValid = !Required || (Required && hasSelection);
        setIsValidationError(!isValid);

        return {
          IsValid: isValid,
          Required: isValid ? false : Required,
          ErrorMessage: isValid ? '' : CustomErrorMessage,
        };
      };

      useImperativeHandle(ref, () => ({
        validate: () => validation(),
      }));

    const segmentsArray = Array.from(
      { length: parseInt(NoOfSegments) },
      (_, index) => {
        return Name[index] || { id: index, name: `Segment ${index}` };
      }
    );

    return (
      <>
        <div className="vg-segment-label">
          <label className="vg-input-label">{Title}</label>
          {InfoTooltipMessage && InfoTooltipMessage !== "" && (
            <span className="vg-lbl-infochip">
              <VgTooltip
                BeakPoint="Up"
                BeakPosition={BeakPosition}
                Children={
                  <div className="vg-tooltiptext">
                    <Svg name="info_circle" />
                  </div>
                }
                TextAlign="center"
                TooltipText={InfoTooltipMessage}
                Html
              />
            </span>
          )}
        </div>
        <div
          className={`vg-w-tab-menu ${
            TabSegment === "vertical" ? "vertical" : "horizontal"
          } ${TabDesign && "tab-segment"} ${FullWidth && "full-segment"}`}
        >
          {segmentsArray.map(({ id, name }, index) => {
            const isFirst = index === 0;
            const isLast = index === segmentsArray.length - 1;
            const isActive = Multi
              ? Array.isArray(activeSegmentId) && activeSegmentId.includes(id)
              : activeSegmentId !== null && activeSegmentId === id;

            return (
              <a
                key={id}
                onClick={(e) => handleTabClick(id, name, e)}
                className={`vg-w-tab-link ${
                  isFirst
                    ? "vg-switch-tab-first"
                    : isLast
                    ? "vg-switch-tab-last"
                    : "segment-tab-middle"
                } ${isActive ? "w--current" : ""}
                ${isValidationError ? 'vg-input-control-error' : ''}
              ${
                TextAlignment === "center"
                  ? "vg-align-center"
                  : TextAlignment === "left"
                  ? "vg-align-left"
                  : TextAlignment === "right"
                  ? "vg-align-right"
                  : ""
              }
              `}
              >
                {Html ? (
                  typeof name === "string"  ? <span dangerouslySetInnerHTML={{ __html:  name }} /> : <>{name}</>
                ) : (
                  name
                )}
              </a>
            );
          })}
        </div>
        {isValidationError && (
          <div className="vg-input-control-error-msg">{CustomErrorMessage}</div>
        )}
      </>
    );
  }
);

export default VgSegments;
