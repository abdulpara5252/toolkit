import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './VgCarousel.scss';
import { utils } from '../../utils/utils';

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

const VIDEO_TYPES = [
  "webm", "mpg", "mp2", "mpeg", "mpe", "mpv", "ogg", "mp4", "m4p", "m4v", "avi", "wmv", "mov", "qt", "flv", "swf", "avchd", "3gp", "3g2", "mkv", "hevc"
];

const VgCarousel: React.FC<VgCarouselProps> = ({
  Rowadata,
  OnIndexChange
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const images = Rowadata?.images || [];
  const containerHeight = Rowadata?.size ? `${Rowadata.size}px` : '256px';
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [swiper, setSwiper] = useState<any>(null);
  const [fullScreenSwiper, setFullScreenSwiper] = useState<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const isandroidiospro = utils.CheckIsFromProAppWithoutState();

  useEffect(() => {
    // When entering fullscreen, initialize the fullscreen swiper to the correct slide
    if (isFullScreen && fullScreenSwiper) {
      fullScreenSwiper.slideTo(currentIndex, 0);
    }
  }, [isFullScreen, fullScreenSwiper, currentIndex]);

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
    if (OnIndexChange) OnIndexChange(swiper.activeIndex);
  };

  if (images.length === 0) {
    return (
      <div style={{ height: containerHeight }}>
        No images or videos to display
      </div>
    );
  }

  const handleThumbnailClick = (index: number) => {
    if (swiper) {
      swiper.slideTo(index); // Navigate to the selected slide
    }
    setCurrentIndex(index);
    if (OnIndexChange) {
      OnIndexChange(index);
    }
  };

  const isVideo = (fileType: string) => {
    return VIDEO_TYPES.includes(fileType.toLowerCase());
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setZoomLevel(1); // Reset zoom when toggling fullscreen
  };

  const handleZoomChange = (swiper: any, scale: number) => {
    setIsZoomed(scale > 1);
  };

  return (
    <div className='vg-carousel'>
      <div className='vg-carousel-wrapper'>
        <div className="product-carousel">
          <div onClick={toggleFullScreen}>
            <Swiper
              modules={[Zoom, Pagination]}
              spaceBetween= {2}
              zoom={true}
              pagination={{ 
                clickable: true,
                el: '.swiper-paginationForMainSlide',
                renderBullet: function (index: number, className: string) {
                  const isVideoSlide =  isVideo(images[index]?.fileType);
                  
                  if (isVideoSlide) {
                    // Triangle icon for video slides
                    return `<span class="${className} video-bullet"></span>`;
                  }
                  // Regular dot for image slides
                  return `<span class="${className}"></span>`;
                }
              }}
              onSlideChange={handleSlideChange}
              onSwiper={setSwiper}
              className='product-carouselMain'
            >
            {images.map((image, index) => (
              <SwiperSlide key={index} className='product-carousel-slide'>
                <div className="swiper-zoom-container">
                  {isVideo(image.fileType) ? (
                    <video
                      controls>
                      <source src={image.slide} type={`video/${image.fileType.toLowerCase()}`} />
                    </video>
                  ) : (
                    <img
                      src={image.slide}
                      alt={image.fileName}
                      onError={() => console.error('Image failed to load:', image)}
                    />
                  )}
                </div>
                
              </SwiperSlide>
            ))}
            </Swiper>
            <div className="swiper-paginationForMainSlide swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"></div>
          </div>

          {isFullScreen && (
            <div className="modal-fullscreen">
              <div className='vg-full-screen-wrap'>
                <Swiper
                  modules={[Navigation, Pagination, Zoom]}
                  pagination={!isZoomed ? { 
                    clickable: true,
                    el: '.swiper-pagination',
                    renderBullet: function (index: number, className: string) {
                      const isVideoSlide =  isVideo(images[index]?.fileType);
                      
                      if (isVideoSlide) {
                        // Triangle icon for video slides
                        return `<span class="${className} video-bullet"></span>`;
                      }
                      // Regular dot for image slides
                      return `<span class="${className}"></span>`;
                    }
                  } : false}
                  navigation={!isZoomed ? {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                  } : false}
                  zoom={true}
                  onSlideChange={handleSlideChange}
                  onSwiper={setFullScreenSwiper}
                  onZoomChange={handleZoomChange}
                  initialSlide={currentIndex}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="swiper-zoom-container">
                        {isVideo(image.fileType) ? (
                          <video
                            controls
                          >
                            <source src={image.slide} type={`video/${image.fileType.toLowerCase()}`} />
                          </video>
                        ) : (
                          <img
                            src={image.slide}
                            alt={image.fileName}
                            onError={() => console.error('Image failed to load:', image)}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {!isZoomed && (
                  <>
                    <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"></div>
                    
                    <div className="swiper-button-prev custom-nav-button">

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                      </svg>
 
                    </div>

                    <div className="swiper-button-next custom-nav-button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                      </svg>
 
                    </div>
                  </>
                )}

                <button className="close-fullscreen" onClick={toggleFullScreen}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--text_neutral_default)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.0312 12.9688C15.6406 13.5312 15.6406 14.5156 15.0312 15.0781C14.75 15.3594 14.375 15.5 14 15.5C13.5781 15.5 13.2031 15.3594 12.9219 15.0781L8 10.1562L3.03125 15.0781C2.75 15.3594 2.375 15.5 2 15.5C1.57812 15.5 1.20312 15.3594 0.921875 15.0781C0.3125 14.5156 0.3125 13.5312 0.921875 12.9688L5.84375 8L0.921875 3.07812C0.3125 2.51562 0.3125 1.53125 0.921875 0.96875C1.48438 0.359375 2.46875 0.359375 3.03125 0.96875L8 5.89062L12.9219 0.96875C13.4844 0.359375 14.4688 0.359375 15.0312 0.96875C15.6406 1.53125 15.6406 2.51562 15.0312 3.07812L10.1094 8.04688L15.0312 12.9688Z" />
                </svg>


                </button>

              </div>
            </div>
          )}

          {!isFullScreen && (
            <div className="thumbnails-container"
            >
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail-item ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  {isVideo(image.fileType) ? (
                    <>
                      <div className="video-overlay">
                        <div className="play-button" />
                      </div>
                      <video className="thumbnail-media">
                        <source src={image.slide} type={`video/${image.fileType}`} />
                      </video>
                    </>
                  ) : (
                    <img
                      src={image.slide}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-media"
                    />
                  )}
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VgCarousel;