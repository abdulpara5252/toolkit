import React, { useState, useEffect } from 'react';
import "../../common/vg-theme-token.css";
import "./VgTokens.scss"
import Svg from '../VgSvg/Svg';

const variables: string[] = [
    "--bkg_neutral_default",
    "--bkg_neutral_inverse",
    "--bkg_neutral_secondary",
    "--bkg_components_selector_default",
    "--bkg_neutral_tiertiary",
    "--bkg_components_card_neutral_default",
    "--bkg_components_status_strong",
    "--bkg_components_toggle_icon",
    "--bkg_components_button_neutral_pressed",
    "--bkg_theme_snow_default",
    "--bkg_theme_midnight_default",
    "--bkg_blue_default",
    "--bkg_theme_flamingo_default",
    "--bkg_green_default",
    "--bkg_warning_default",
    "--bkg_blue_weak",
    "--bkg_alert_default",
    "--bkg_alert_weak",
    "--bkg_components_toggle_bkg",
    "--bkg_components_calendar_hoursworking",
    "--bkg_components_calendar_hoursnoworking",
    "--bkg_components_calendar_hoursedited",
    "--bkg_components_overlay_default",
    "--bkg_components_calendar_sidebar",
    "--bkg_components_calendar_time",
    "--bkg_status_requested",
    "--bkg_status_accepted",
    "--bkg_status_awaiting",
    "--bkg_status_confirmed",
    "--bkg_status_show",
    "--bkg_status_noshow",
    "--bkg_status_ready",
    "--bkg_status_inprogress",
    "--bkg_status_complete",
    "--bkg_status_taskopen",
    "--bkg_status_taskblocked",
    "--bkg_components_listicon_purple",
    "--bkg_yellow_default",
    "--bkg_components_selector_default",
    "--bkg_theme_flamingo_hover",
    "--bkg_components_selector_disabled",
    "--bkg_components_button_green_default",
    "--bkg_components_button_green_hover",
    "--bkg_components_button_green_pressed",
    "--bkg_components_button_neutral_default",
    "--bkg_components_button_neutral_hover",
    "--bkg_components_button_neutral_pressed",
    "--bkg_theme_flamingo_default",
    "--bkg_theme_flamingo_hover",
    "--bkg_components_button_blue_default",
    "--bkg_components_button_blue_hover",
    "--bkg_components_button_blue_strong",
    "--bkg_components_button_ghost_hover",
    "--bkg_components_button_ghost_pressed",
    "--text_neutral_default",
    "--text_neutral_ondark",
    "--text_neutral_secondary",
    "--text_neutral_weak",
    "--text_blue_default",
    "--text_blue_strong",
    "--text_alert_default",
    "--text_neutral_inverse",
    "--text_theme_flamingo_default",
    "--text_green_default",
    "--icon_neutral_default",
    "--icon_neutral_ondark",
    "--icon_neutral_secondary",
    "--icon_neutral_weak",
    "--icon_blue_default",
    "--icon_blue_strong",
    "--icon_alert_default",
    "--icon_theme_flamingo_default",
    "--border_neutral_default",
    "--border_neutral_strong",
    "--border_neutral_white",
    "--border_blue_default",
    "--border_blue_strong",
    "--border_alert_default",
    "--border_green_default",
    "--bkg_components_button_green_hover",
    "--border_green_strong",
    "--border_theme_flamingo_default",
    "--border_theme_flamingo_hover",
    "--border_flamingo_strong",
    "--border_custom_default",
    "--bkg_category_tutu",
    "--bkg_category_ladybug",
    "--bkg_category_firetruck",
    "--bkg_category_coral",
    "--bkg_category_tangerine",
    "--bkg_category_custard",
    "--bkg_category_goldmedal",
    "--bkg_category_algae",
    "--bkg_category_valley",
    "--bkg_category_envy",
    "--bkg_category_seafoam",
    "--bkg_category_lowtide",
    "--bkg_category_bluejean",
    "--bkg_category_dawn",
    "--bkg_category_cottoncandy",
    "--bkg_category_agave",
    "--bkg_category_bullwinkle",
    "--bkg_category_elephant",
    "--bkg_category_fog",
    "--bkg_category_shell",
    "--bkg_category_eggplant",
    "--bkg_category_airhead",
    "--bkg_category_sand",
    "--bkg_theme_ruby-default",
    "--bkg_theme_coral-default",
    "--bkg_theme_cinnamon-default",
    "--bkg_theme_candypink-default",
    "--bkg_theme_bubblegum-default",
    "--bkg_theme_lilac-default",
    "--bkg_theme_turquoise-default",
    "--bkg_theme_denim-default",
    "--bkg_theme_blueberry-default",
    "--bkg_theme_pear-default",
    "--bkg_theme_spring-default",
    "--bkg_theme_java-default",
    "--bkg_theme_banana-default",
    "--text_opacity_white",
    "--grid-hover-opacity",
    "--box_shadow",
    "--topmenu_box_shadow",
    "--bkg_data_01",
    "--bkg_data_02",
    "--bkg_data_03",
    "--bkg_data_04",
    "--bkg_data_05",
    "--bkg_data_06",
    "--bkg_data_07",
    "--bkg_data_08",
    "--bkg_data_09",
    "--bkg_data_10",
    "--bkg_data_11",
    "--bkg_data_12",
    "--bkg_data_13",
    "--bkg_theme_pine_default",
    "--bkg_components_segment_default",
    "--bkg_components_segment_selected",
    "--bkg_category_white",
    "--bkg_category_orange",
    "--bkg_category_bluejay",
    "--text_ai_default",
    "--text_ai_secondary"
  ];



const TypoGraphyToken : string[] = [
    "--font_family_proximanova: \"proxima-nova\", sans-serif",
    "--font_size_12: 12px",
    "--font_size_14: 14px",
    "--font_size_15: 15px",
    "--font_size_16: 16px",
    "--font_size_18: 18px",
    "--font_size_20: 20px",
    "--font_size_24: 24px",
    "--font_size_26: 26px",
    "--font_size_32: 32px",
    "--font_size_42: 42px",
    "--font_height_16: 16px",
    "--font_height_20: 20px",
    "--font_height_24: 24px",
    "--font_height_28: 28px",
    "--font_height_32: 32px",
    "--font_height_36: 36px",
    "--font_height_40: 40px",
    "--font_weight_regular:400",
    "--font_weight_medium:500",
    "--font_weight_semibold:600",
    "--font_weight_bold:900",
    "--font_align_left:left",
    "--font_align_right:right",
    "--font_align_center:center",
    "--font_underline_none:none",
    "--font_underline:underline",
    "--font_strikethrough:line-through",
    "--radius_small:3px",
    "--radius_medium:5px",
    "--radius_large:10px",
    "--radius_full:9999px",
    "--border-width-none: 0px",
    "--border_width_default: 1px",
    "--border_width_strong: 2px",
    "--border_style_none: none",
    "--border_style_solid: solid",
    "--border_style_dashed: dashed",
    "--sizing_1: 1px",
    "--sizing_2: 2px",
    "--sizing_4: 4px",
    "--sizing_8: 8px",
    "--sizing_10: 10px",
    "--sizing_12: 12px",
    "--sizing_16: 16px",
    "--sizing_20: 20px",
    "--sizing_24: 24px",
    "--sizing_28: 28px",
    "--sizing_30: 30px",
    "--sizing_32: 32px",
    "--sizing_36: 36px",
    "--sizing_40: 40px",
    "--sizing_44: 44px",
    "--sizing_48: 48px",
    "--sizing_50: 50px",
    "--sizing_56: 56px",
    "--sizing_60: 60px",
    "--sizing_64: 64px",
    "--sizing_72: 72px",
    "--sizing_80: 80px",
    "--sizing_96: 96px",
    "--sizing_120: 120px",
    "--sizing_160: 160px",
    "--sizing_200: 200px",
    "--sizing_240: 240px",
    "--sizing_320: 320px",
    "--sizing_auto: auto",
    "--sizing_none: 0px",
    "--sizing-full:100%",
    "--spacing_0: 0px",
    "--spacing_1: 1px",
    "--spacing_2: 2px",
    "--spacing_4: 4px",
    "--spacing_6: 6px",
    "--spacing_8: 8px",
    "--spacing_10: 10px",
    "--spacing_12: 12px",
    "--spacing_16: 16px",
    "--spacing_20: 20px",
    "--spacing_24: 24px",
    "--spacing_28: 28px",
    "--spacing_32: 32px",
    "--spacing_36: 36px",
    "--spacing_40: 40px",
    "--spacing_48: 48px",
    "--spacing_50: 50px",
    "--spacing_56: 56px",
    "--spacing_64: 64px",
    "--spacing_66: 66px",
    "--spacing_72: 72px",
    "--spacing_80: 80px",
    "--spacing_96: 96px",
    "--spacing_120: 120px",
    "--spacing_160: 160px",
    "--spacing_200: 200px",
    "--spacing_240: 240px",
    "--spacing_320: 320px",
    "--spacing_auto: auto",
    "--spacing_none: 0px",
    "--shadow_none: none",
    "--shadow_1: 0px 2px 10px 0px rgba(0, 0, 0, 0.1)",
    "--shadow_2: 0px 2px 20px 0px rgba(0, 0, 0, 0.15)",
    "--shadow_3_web: 0px 8px 40px 0px rgba(0, 0, 0, 0.2)",
    "--shadow_3_mobile: 0px -8px 40px 0px rgba(0, 0, 0, 0.2)",
    "--shadow_4_alert: 0px 4px 8px rgba(0, 0, 0, 0.2)"
  ]
  

interface CategorizedVariables {
    [key: string]: string[];
}
  
const categorizedVariables: CategorizedVariables = {};
const categorizedTypoGraphyVariables: CategorizedVariables = {};
  
variables.forEach((varName: string) => {
    let category = '';
    if (varName.startsWith('--bkg')) {
        category = 'Background';
    } else if (varName.startsWith('--text')) {
        category = 'Text';
    } else if (varName.startsWith('--icon')) {
        category = 'Icon';
    } else if (varName.startsWith('--border')) {
        category = 'Border';
    } else {
        // Assign to 'Other Token' category
        category = 'Other Token';
    }

    if (!categorizedVariables[category]) {
        categorizedVariables[category] = []; 
    }
    categorizedVariables[category].push(varName);
});


TypoGraphyToken.forEach((varName: string) => {
    let category = '';
    if (varName.startsWith('--font')) {
        category = 'Font Typography Token';
    } else if (varName.startsWith('--radius')) {
        category = 'Radius Token';
    } else if (varName.startsWith('--border')) {
        category = 'Border Token';
    } else if (varName.startsWith('--sizing') || varName.startsWith('--spacing')) {
        category = 'Sizing and spacing Token';
    } else if (varName.startsWith('--shadow')) {
        category = 'Shadow Token';
    }else {
        // Assign to 'Other Token' category
        category = 'Other Token';
    }

    if (!categorizedTypoGraphyVariables[category]) {
        categorizedTypoGraphyVariables[category] = []; 
    }
    categorizedTypoGraphyVariables[category].push(varName);
});

export interface VgTokensProps {
    TypoGraph?: boolean;
}

const VgTokens: React.FC<VgTokensProps> = ({ TypoGraph }) => {
    const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const values: { [key: string]: string } = {};
        variables.forEach((varName) => {
            const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
            values[varName] = value || 'N/A';
        });
        setVariableValues(values);
    }, []);

    const copyToClipboard = async (text: string) => {
        try {
          await navigator.clipboard.writeText(text);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    };

    return (
        <>
        {!TypoGraph ? ( <div className="colorToken-wrapper">
            {Object.keys(categorizedVariables).map((category: string) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <div className='colorToken-list'>
                        {categorizedVariables[category].map((varName: string) => (
                            <div className="colorToken-item" key={varName}>
                                <div
                                    className="colorToken-box"
                                    style={{ backgroundColor: `var(${varName})` }}
                                ></div>
                                <div className="colorToken-code">
                                    <p onClick={() => copyToClipboard(`var(${varName})`)}>
                                        <span className='token-code'>{`var(${varName})`}<pre>{variableValues[varName]}</pre></span>
                                        <span className='copytoken'>
                                            <Svg name="duplicate" />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>) : (
            <div className="colorToken-wrapper typogrphy-token">
            {Object.keys(categorizedTypoGraphyVariables).map((category: string) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <div className='colorToken-list typography-list'>
                    {categorizedTypoGraphyVariables[category].map((entry: string) => {
                        const [key, value] = entry.split(':').map(str => str.trim());

                        return (
                            <div className="colorToken-item typography-item" key={key}>
                                <div className="colorToken-code">
                                    <p onClick={() => copyToClipboard(`var(${key})`)}>
                                        <span className='token-code'>
                                            {`var(${key})`}
                                            <pre>{value}</pre>
                                        </span>
                                        <span className='copytoken'>
                                            <Svg name="duplicate" />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            ))}
        </div>
        )}
       
        </>
    );
};

export default VgTokens;