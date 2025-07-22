import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import "./VgColorPicker.scss";
import "../../utils/codemirror-colorpiker.scss";
import { ColorPicker } from "codemirror-colorpicker"; // Changed import
import { utils } from "../../utils/utils";
import '../VgButton/VgButton.scss'
import Portal from "../../common/Portal";

export interface VgColorPickerProps {
	OnChange: (colorCode: string) => void;
	Title?: string;
	NativeActionVal?: number;
	Footer?: number;
	TimerCount?: number;
	IsFullLength?: boolean;
	CloseBackTitle?: string;
	ColorPickerId?: string;
	DefaultColor?: string;
	VagaroToolkit?: Number;
}

type AnyType = any;

interface ColorBox {
	id: string;
	colorCode: string;
	className: string;
}

interface RefProps {
	validate: () => any;
}
const VgColorPicker: React.FC<VgColorPickerProps> = forwardRef<RefProps, VgColorPickerProps>(
	(
		{
			OnChange,
			Title = "Color Picker",
			NativeActionVal = 0,
			CloseBackTitle = "",
			Footer = 0,
			TimerCount = 0,
			IsFullLength = false,
			ColorPickerId = "",
			DefaultColor = "none",
			VagaroToolkit = 0
		}, ref
	) => {

		const [activeColorPicker, setActiveColorPicker] = useState<boolean>(false);
		const [showColorPickerBox, setShowColorPickerBox] = useState<boolean>(false);
		const [defaultSelectedColor, setDefaultSelectedColor] = useState<string>(DefaultColor);
		const [isPickerOpen, setIsPickerOpen] = useState(false);
		const colorContainerRef = useRef<HTMLDivElement>(null);
		const savedColorArr = useRef<string[]>([]);
		const isColorPickerInitialized = useRef<boolean>(false);
		const colorPickerRef = useRef<AnyType>(null);
		const customColorRef = useRef<AnyType>(null);
		const storeDefaultColor = useRef<string>(DefaultColor);
		const initColor = useRef<string>(DefaultColor);

		const isAndroidiOSPro = utils.CheckIsFromProAppWithoutState();

		const colorBoxes: ColorBox[] = [
			{ id: "colorBoxONone", colorCode: "none", className: "ColorBox none nocolorsign" },
            { id: "colorBoxO0", colorCode: "#FFFFFF", className: "ColorBox white black-check" },
			{ id: "colorBoxO1", colorCode: "#E6499A", className: "ColorBox tutu" },
			{ id: "colorBoxO2", colorCode: "#EB6663", className: "ColorBox flamingo" },
			{ id: "colorBoxO3", colorCode: "#EF484A", className: "ColorBox fireTruck" },
			{ id: "colorBoxO4", colorCode: "#F69681", className: "ColorBox corel" },
			{ id: "colorBoxO5", colorCode: "#F26922", className: "ColorBox poppy" },
			{ id: "colorBoxO6", colorCode: "#FAA53E", className: "ColorBox tengerine" },
			{ id: "colorBoxO7", colorCode: "#FAF6A7", className: "ColorBox custard" },
			{ id: "colorBoxO8", colorCode: "#FDD628", className: "ColorBox goldmedal" },
			{ id: "colorBoxO9", colorCode: "#CBDD4E", className: "ColorBox algea" },
			{ id: "colorBox10", colorCode: "#7DC242", className: "ColorBox valley" },
			{ id: "colorBox11", colorCode: "#11A44A", className: "ColorBox envy" },
			{ id: "colorBox12", colorCode: "#68C4A0", className: "ColorBox seafoam" },
			{ id: "colorBox13", colorCode: "#0EB9A4", className: "ColorBox lowtide" },
			{ id: "colorBox14", colorCode: "#478CCA", className: "ColorBox bluejay" },
			{ id: "colorBox15", colorCode: "#7AA6BA", className: "ColorBox bluejean" },
			{ id: "colorBox16", colorCode: "#C3BFDF", className: "ColorBox down" },
			{ id: "colorBox17", colorCode: "#EFBBD6", className: "ColorBox cottoncandy", },
			{ id: "colorBox18", colorCode: "#A391C5", className: "ColorBox airhead" },
			{ id: "colorBox19", colorCode: "#B47E62", className: "ColorBox bull" },
			{ id: "colorBox20", colorCode: "#B4B5B4", className: "ColorBox elephant" },
			{ id: "colorBox21", colorCode: "#D6D6D6", className: "ColorBox fog" },
			{ id: "colorBox22", colorCode: "#FFF8E9", className: "ColorBox shell" },
			{ id: "colorBox23", colorCode: "#B668AA", className: "ColorBox eggplant" },
			{ id: "colorBox24", colorCode: "#E5B67F", className: "ColorBox agave" },
			{ id: "colorBox25", colorCode: "#DACAC0", className: "ColorBox sand" },
		];

		const rgbToHex = (color: string): string => {

			if (color.charAt(0) === "#") {
				return color?.toLowerCase();
			}

			const rgbaArr = color.match(/(\d+(\.\d+)?)/g);

			if (!rgbaArr || rgbaArr.length < 3) {
				return "#000000";
			}

			const r = parseInt(rgbaArr[0]);
			const g = parseInt(rgbaArr[1]);
			const b = parseInt(rgbaArr[2]);
			const a = parseFloat(rgbaArr[3]) || 1;

			const alphaHex = Math.round(a * 255).toString(16).padStart(2, "0");
			const rHex = r.toString(16).padStart(2, "0");
			const gHex = g.toString(16).padStart(2, "0");
			const bHex = b.toString(16).padStart(2, "0");

			return `#${rHex}${gHex}${bHex}${alphaHex?.toLowerCase()}`;
		}

		const CloseColorPicker = () => {
			setDefaultSelectedColor(storeDefaultColor.current);
			initColor.current = storeDefaultColor.current;
			AppendCheckmarkToMatchingColor();
		}

		useEffect(() => {

			const handleClickOutside = (event: AnyType) => {

                if (
                    showColorPickerBox &&
                    colorContainerRef.current &&
                    !colorContainerRef.current.contains(event.target) &&
                    !customColorRef?.current?.contains(event?.target)
                ) {
                    setShowColorPickerBox(false);
                    CloseColorPicker();
                }

            };

			if (showColorPickerBox) {
				document.addEventListener("mousedown", handleClickOutside);
			}

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [showColorPickerBox]);

		useEffect(() => {

			if (isColorPickerInitialized.current && colorPickerRef.current) {
				colorPickerRef.current.initColor({
					color: initColor.current,
					source: 'custom',
				});
			}
		}, [isColorPickerInitialized.current]);

		const ShowColorPicker = () => {
			setActiveColorPicker(true);
			if (!isColorPickerInitialized.current) {
			  // Initialize with proper configuration
				colorPickerRef.current = new ColorPicker({
				color: defaultSelectedColor === "none" ? "#FFFFFF" : defaultSelectedColor,
				type: "sketch",
				position: "inline",
				mode: "edit",
				container: document.getElementById("codemirror-colorpicker-sketch") as HTMLElement, // Fixed ID
				colorSets: [{
				  name: "Custom",
				  edit: true,
				  colors: savedColorArr.current,
				}] as { name: string; edit: boolean; colors: string[] }[],
				onChange: (color: string) => ApplyCustomColors(rgbToHex(color)),

			  });
			  
			  isColorPickerInitialized.current = true;
			}
			colorPickerRef.current.initColor(defaultSelectedColor === "none" ? "#FFFFFF" : defaultSelectedColor);
		  };

		const showNormalColor = () => {
			setActiveColorPicker(false);
		};

		function chunkArray<T>(array: T[], size: number): T[][] {
			const chunkedArray: T[][] = [];
			for (let i = 0; i < array.length; i += size) {
				chunkedArray.push(array.slice(i, i + size));
			}
			return chunkedArray;
		}

			const ApplyCustomColors = (color: string) => {
				if (color !== "#nannannan") {
					AppendCheckmarkToMatchingColor();
					setDefaultSelectedColor(color);
					initColor.current = defaultSelectedColor;
					storeDefaultColor.current = defaultSelectedColor;
					OnChange(color);
				}
			};

		const AppendCheckmarkToMatchingColor = () => {
			if (!initColor.current) {
			  return;
			}
	  
			const hexColor = initColor.current;
			const colorElements = document.querySelectorAll("#colorMaping .ColorBox");
	  
			colorElements.forEach((element) => {
			  const colorElement = element as HTMLElement;
			  const attColor = colorElement.getAttribute("data-color");
	  
			  // Remove existing checkmark
			  const existingCheckmark = colorElement.querySelector("i");
			  if (existingCheckmark) {
				existingCheckmark.remove();
			  }
	  
			  // Skip if "none" is selected
			  if (initColor.current === "none") return;
	  
			  // Add checkmark if color matches
			  if (attColor && attColor.toUpperCase() === hexColor.toUpperCase()) {
				const checkmarkIcon = document.createElement("i");
				checkmarkIcon.innerHTML = "&#xf00c;";
				colorElement.appendChild(checkmarkIcon);
			  }
			});
		};

		useEffect(() => {
			AppendCheckmarkToMatchingColor();
			ApplyCustomColors(initColor.current);
		}, []);

		const handleColorSelection = (color: string, id: string) => {

			let newColorCode = color?.toLowerCase();
			initColor.current = newColorCode;
			AppendCheckmarkToMatchingColor();
			setDefaultSelectedColor(color);
		};

		const handleApplyColor = () => {
			ApplyCustomColors(defaultSelectedColor);
			setShowColorPickerBox(false);
			handleColorPickerClose()
		};

		const handleColorPickerOpen = () => {
			setIsPickerOpen(!isPickerOpen);
			setShowColorPickerBox(true);

			if (isAndroidiOSPro) {

				utils.CallBackGivenToMobileApp(NativeActionVal, CloseBackTitle, Footer, TimerCount, IsFullLength);

				let obj: any = {
					NativeAction: NativeActionVal,
					Footer: Footer,
					IsFullLength: IsFullLength,
					callFromLocation: ColorPickerId,
					VagaroToolkit: VagaroToolkit
				};

				let messageObj: any = {};
				messageObj.message = "";
				messageObj.messageType = 0;
				messageObj.screenTitle = Title;
				messageObj.screenType = 0;
				messageObj.navType = 0;
				messageObj.action = "53|~|" + JSON.stringify(obj);

				utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
			}
		};

		const handleColorPickerClose = () => {

			if (isAndroidiOSPro) {

				utils.CallBackGivenToMobileApp(NativeActionVal, CloseBackTitle, Footer, TimerCount, IsFullLength);

				let obj: any = {
					NativeAction: NativeActionVal,
					Footer: Footer,
					callFromLocation: ColorPickerId,
					IsFullLength: IsFullLength,
					VagaroToolkit: VagaroToolkit
				};

				let messageObj: any = {};
				messageObj.message = "";
				messageObj.messageType = 0;
				messageObj.screenTitle = CloseBackTitle;
				messageObj.screenType = 0;
				messageObj.navType = 0;
				messageObj.action = "53|~|" + JSON.stringify(obj);

				utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
			}
		}

		const CloseDropdown = () => {
			if (showColorPickerBox === true) {
				setShowColorPickerBox(false);
				handleColorPickerClose();
			}
		};

		const validation = () => {

			return {
				[ColorPickerId]: defaultSelectedColor,
				IsValidate: true,
				IsRequired: true,
			};
		};

		useImperativeHandle(ref, () => ({ validate: () => validation(), }));

		return (
			<div className={`vg-group`}>
				<div className="vg-color-picker__container" onClick={handleColorPickerOpen} ref={customColorRef}>
					<div className={`vg-color-picker__color-circle ${defaultSelectedColor === "none" ? "nocolorsign": ""}`} style={{ backgroundColor: `${defaultSelectedColor}`}}></div>
					<div className="vg-color-picker__color-arrow">
						<svg width="11" height="6" viewBox="0 0 11 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.082 1.61133L6.36133 5.36133C6.15625 5.53711 5.92188 5.625 5.6875 5.625C5.42383 5.625 5.18945 5.53711 5.01367 5.36133L1.29297 1.61133C1 1.34766 0.912109 0.9375 1.05859 0.585938C1.20508 0.234375 1.55664 0 1.9375 0H9.4082C9.78906 0 10.1113 0.234375 10.2578 0.585938C10.4043 0.9375 10.3457 1.34766 10.082 1.61133Z" />
						</svg>
					</div>
				</div>
				<div ref={customColorRef}>
					<Portal
					 wrapperElementId="ColorPicker"
					 wrapperElement="div"
					 inputRef={customColorRef}
					>
					<div ref={colorContainerRef} className="vg-color-container default-scrollbar" style={{ display: showColorPickerBox ? "block" : "none", }}>
						<div className="ptoaddeditpopupnew">
							<ul className="vg-nav-tabs">
								<li className={activeColorPicker ? "vg-list-item " : "vg-list-item active"}>
									<button className={activeColorPicker ? "vg-tab-link" : "vg-tab-link w--current"} onClick={showNormalColor}>Color</button>
								</li>
								<li className={activeColorPicker ? "vg-list-item active" : "vg-list-item"}>
									<button className={activeColorPicker ? "vg-tab-link" : "vg-tab-link w--current"} onClick={ShowColorPicker}>Custom</button>
								</li>
							</ul>
						</div>
						<div className="ColorWrapper default-scrollbar" style={{ display: activeColorPicker ? "none" : "block" }}>
							<div className="wrapper-inner-scroll">
								<div id="colorMaping">
									{chunkArray(colorBoxes, 5).map((row, rowIndex) => {
										return (
											<div key={rowIndex} className="ColorWrapper-inner">
												{row.map((box) => (
													<div
														key={box.id}
														id={box.id}
														className={box.className}
														onClick={() => { handleColorSelection(box.colorCode, box.id); }}
														data-color={box.colorCode}
													></div>
												))}
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div
							className="rg-colorpicker default-scrollbar"
							style={{ display: activeColorPicker ? "block" : "none" }}
							id="codemirror-colorpicker-sketch" // Changed to match initialization
						></div>		
						<button className="vg-tk-btn vg-btn-secondary" id="btnCustomApply" onClick={handleApplyColor}>Apply</button>
						<input type="hidden" id={ColorPickerId} onClick={() => CloseDropdown()} />
					</div>
					</Portal>
				</div>
			</div>
		);
	}
);

export default VgColorPicker;