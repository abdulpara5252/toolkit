import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './VgCarousel.scss';
export interface ImageData {
    slide: string;
    fileType: string;
    fileDescription?: string;
    fileName?: string;
    size?: number;
}
export interface CarouselData {
    images: ImageData[];
    size?: number;
}
export interface VgCarouselProps {
    Rowadata?: CarouselData;
    OnIndexChange?: (index: number) => void;
}
declare const VgCarousel: React.FC<VgCarouselProps>;
export default VgCarousel;
