import React, { useEffect, useState, ReactNode } from 'react'
import "./VgTab.scss"

export interface VgTabProps {
    onClick?: (tabId: number, tabName: string, e:  React.MouseEvent<HTMLElement>) => void;
    Name?: { id: number; name: string; IconSVG?: ReactNode }[];
    ActiveTab?: number;
    NoOfTab: string;
    TabVariant?: "vertical" | "horizontal";
    TabPosition?: "left" | "right" | "center";
    TabSize?: "small" | "medium" | "large";
    BottomBorder?: boolean;
}

const VgTab: React.FC<VgTabProps> = ({
    onClick,
    Name = [],
    NoOfTab = "",
    ActiveTab = 0,
    TabVariant,
    TabPosition = "center",
    TabSize = "medium",
    BottomBorder = false
}) => {
    // const initialAcitveId = ActiveTab - 1 > 0 ? ActiveTab - 1 : 0  // no need of that

    const [ActiveTabId, setActiveTabId] = useState<number | null>(Name[ActiveTab]?.id);

    // // no need of the code 
    useEffect(() => {
        const activeId = ActiveTab === 0 ? Name[0]?.id : Name.find(item => item.id === ActiveTab)?.id;
        // const activeId = Name.find(item => item.id === ActiveTab)?.id;
        setActiveTabId(activeId ?? null);
    }, [ActiveTab, Name]);


    const handleTabClick = (tabId: number, tabName: string, e: React.MouseEvent<HTMLElement>) => {
        if (ActiveTabId !== tabId) {
            setActiveTabId(tabId);
            onClick?.(tabId, tabName, e);
        }
    };

    const TabArray = Array.from({ length: parseInt(NoOfTab) }, (_, index) => {
        return Name[index] || { id: index, name: `Tab ${index}` };
    });

    return (
        <div className='vg-tab'>
            <ul className={`vg-nav-tabs ${TabVariant === "vertical" ? "vertical" : "horizontal"} ${TabPosition} ${TabSize}${BottomBorder ? " full-width-border" : ""}`}>
                {TabArray.map(({ id, name, IconSVG }, index) => {
                    const isActive = ActiveTabId === id;

                    return (
                        <li
                            key={id}
                            onClick={(e) => handleTabClick(id, name, e)}
                            className={`vg-list-item ${isActive ? "active" : ""}`}
                        >
                            <a className={`vg-tab-link ${isActive ? "vg-tab-link" : "vg-tab-link w--current"}`}>
                                {IconSVG && <span className="vg-tab-icon">{IconSVG}</span>}
                                {name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default VgTab;




