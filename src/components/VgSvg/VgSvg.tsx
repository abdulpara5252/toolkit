import React, { useState, useEffect  } from 'react';
import Svg, { svgIconNames } from "./Svg";
import "./VgSvg.scss";

interface VgSvgProps {
    name: string;
}

const VgSvg: React.FC<VgSvgProps> = ({ name }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
    const [fadeClass, setFadeClass] = useState<string>('');
    const [showCopied, setShowCopied] = useState(false);

    if (name) return (<Svg name={name} />)

    const handleItemClick = (name: string) => {
        const codeToCopy = `<VgSvg name="${name}" />`;
    
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(codeToCopy)
                .then(() => {
                    setCopiedIcon(name);
                    setShowCopied(true);
                    setFadeClass('fade-in');
    
                    setTimeout(() => {
                        setFadeClass('fade-out');
                        setTimeout(() => {
                            setShowCopied(false);
                            setCopiedIcon(null);
                        }, 500);
                    }, 3000);
                })
                .catch((err) => {
                    console.error("Failed to copy!", err);
                });
        } else {
            console.warn("Clipboard API not available");
            // Fallback approach
            const textArea = document.createElement("textarea");
            textArea.value = codeToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            
            setCopiedIcon(name);
            setShowCopied(true);
            setFadeClass('fade-in');
    
            setTimeout(() => {
                setFadeClass('fade-out');
                setTimeout(() => {
                    setShowCopied(false);
                    setCopiedIcon(null);
                }, 500);
            }, 3000);
        }
    };

    const filteredIconNames = svgIconNames.filter((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="svg-wrapper">
            <div className='search-icon'>
                <input
                    type="text"
                    placeholder="Search icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="vg-input-control"
                />
            </div>
            <div className="svg-list">
                {filteredIconNames.map((name) => (
                    <div
                        key={name}
                        className="svg-item"
                        onClick={() => handleItemClick(name)}
                    >
                        <div className="svg-block">
                            <div className="svg-code">
                                <span className="copytoken">
                                    <Svg name="duplicate" />
                                </span>
                                <Svg name={name} width={40} height={40} />
                            </div>
                            <div className="svg-name">{name}</div>
                            {copiedIcon === name && (
                                <div className={`copySvgcode ${fadeClass}`}>
                                    Copied!
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {filteredIconNames.length === 0 && (
                    <div className="no-results">No icons found.</div>
                )}
            </div>
        </div>
    );
};

export default VgSvg;