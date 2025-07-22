import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import type { SweetAlertIcon } from "sweetalert2"
import VgButton from "../VgButton/VgButton";
import { createRoot, Root } from "react-dom/client";
import "./VgAlert.scss";

export interface VgAlertProps {
  Icon?: "none" | "warning" | "success" | "delete";
  Title?: string;
  Description?: string;
  ConfirmText?: string;
  CancelText?: string;
  OnConfirm?: () => void;
  OnCancel?: () => void;
  OnClose?: () => void;
  ShowFooter?: boolean;
  Duration?: number;
}

const VgAlert: React.FC<VgAlertProps> = ({
  Icon = "none",
  Title = "Alert",
  Description = "",
  ConfirmText = "Yes",
  CancelText = "No",
  OnConfirm,
  OnCancel,
  OnClose,
  ShowFooter = true,
  Duration = 0
}) => {
  const rootRef = useRef<Root | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const durationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const iconMap: Record<string, SweetAlertIcon | undefined> = {
      warning: "warning",
      success: "success",
      delete: "error",
      none: undefined,
    };
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    Swal.close();

    timeoutRef.current = setTimeout(() => {
      Swal.fire({
        icon: iconMap[Icon],
        html: `
          <div class="bg-bkg_components_button_neutral_default p-0">
            <div class="text-left text-[18px] font-medium leading-[24px] text-text_neutral_default px-5 pb-[0px] pt-3">
              ${Title}
            </div>
            <div id="vg-alert-icon-placeholder" class="vg-alert-icon-placeholder"></div>
            <div class="text-left text-[15px] font-normal leading-[20px] text-text-secondary m-0 p-[20px] pt-[16px]">
              ${Description}
            </div>
            ${ShowFooter ? `<div id="vg-alert-button-container" class="bg-bkg_neutral_secondary border-t border-border-default px-5 py-4 flex flex-wrap justify-end gap-4"></div>` : ""}
          </div>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick:false,
        customClass: {
          popup: "p-0 w-[415px] max-w-[95%] rounded-md bg-bkg_components_button_neutral_default",
          htmlContainer: "p-0 rounded-md",
          closeButton: "vg-custom-close-button",
        },
        didOpen: () => {
          const placeholder = document.getElementById("vg-alert-icon-placeholder");
          const iconEl = document.querySelector(".swal2-icon");
          if (iconEl && placeholder && Icon !== "none") {
            placeholder.appendChild(iconEl);
          } else {
            placeholder?.remove();
          }

          const closeBtn = document.querySelector(".vg-custom-close-button");
          if (closeBtn) {
            closeBtn.innerHTML = `
              <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.3945 11.4805C12.7754 11.832 12.7754 12.4473 12.3945 12.7988C12.2188 12.9746 11.9844 13.0625 11.75 13.0625C11.4863 13.0625 11.252 12.9746 11.0762 12.7988L8 9.72266L4.89453 12.7988C4.71875 12.9746 4.48438 13.0625 4.25 13.0625C3.98633 13.0625 3.75195 12.9746 3.57617 12.7988C3.19531 12.4473 3.19531 11.832 3.57617 11.4805L6.65234 8.375L3.57617 5.29883C3.19531 4.94727 3.19531 4.33203 3.57617 3.98047C3.92773 3.59961 4.54297 3.59961 4.89453 3.98047L8 7.05664L11.0762 3.98047C11.4277 3.59961 12.043 3.59961 12.3945 3.98047C12.7754 4.33203 12.7754 4.94727 12.3945 5.29883L9.31836 8.4043L12.3945 11.4805Z"/>
              </svg>`;

            closeBtn.addEventListener("click", () => {
              Swal.close();
              OnClose?.();
            });
          }

          setTimeout(() => {
            const container = document.getElementById("vg-alert-button-container");
            if (container) {
              if (ShowFooter) {
                if (!rootRef.current) {
                  rootRef.current = createRoot(container);
                }
                rootRef.current.render(
                  <>
                    <VgButton
                      ButtonVariant="secondary"
                      ButtononClick={() => {
                        Swal.close();
                        OnCancel?.();
                        OnClose?.();
                      }}
                    >
                      {CancelText}
                    </VgButton>
                    <VgButton
                      ButtonVariant="primary"
                      ButtononClick={() => {
                        Swal.close();
                        OnConfirm?.();
                        OnClose?.();
                      }}
                    >
                      {ConfirmText}
                    </VgButton>
                  </>
                );
              } else {
                container.style.display = "none";
              }
            }
          }, 0)

          if (Duration > 0) {
            durationRef.current = setTimeout(() => {
              Swal.close();
              OnClose?.();
            }, Duration);
          }
        },
        willClose: () => {
          rootRef.current?.unmount();
          rootRef.current = null;
        },
      });
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (durationRef.current) clearTimeout(durationRef.current);
      Swal.close();
    };
  }, [Icon, Title, Description, ConfirmText, CancelText, OnConfirm, OnCancel, OnClose, Duration, ShowFooter]);

  return null;
};

export default VgAlert;
