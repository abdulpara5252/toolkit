  import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";
import VgButton from "../VgButton/VgButton";
import "./VgMapControl.scss";
import "../VgPopup/VgPopup.scss";
import { utils } from "../../utils/utils";

export interface MapProps {
  Latitude: number;
  Longitude: number;
  Radius: number;
  FixIncorrectMarker: boolean;
  markerIcon?: string;
  onMarkerDragEnd?: (lat: number, lng: number) => void;
  MapHeight: string;
  MapWidth: string;
  MapControlId?: string;
  VagaroToolkit?: Number;
  NativeAction?: number;
  Footer?: number;
  TimerCount?: number;
  IsFullLength?: boolean;
  CloseBackTitle?: string;
}

interface MapStyles {
  container: { width: string; height: string };
  containerPopup: { width: string; height: string };
}

interface VgMapControlRef {
  validate: () => any;
}

const VgMapControl: React.FC<MapProps> = forwardRef<
  VgMapControlRef,
  MapProps
>(
  (
    {
      Latitude,
      Longitude,
      Radius,
      FixIncorrectMarker,
      markerIcon = "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/flamingo-map-onbording-new.png",
      onMarkerDragEnd,
      MapWidth,
      MapHeight,
      MapControlId = "",
      VagaroToolkit = 0,
      NativeAction = 0,
      Footer = 0,
      TimerCount = 0,
      IsFullLength = false,
      CloseBackTitle,
    },
    ref
  ) => {
    const [center, setCenter] = useState({
      lat: Latitude,
      lng: Longitude,
    });
    const mapRadius = Number(Radius) * 1609.34; // Convert miles to meters
    const zoom = getZoomLevel(mapRadius);
    const mapRef = useRef<google.maps.Map>();
    const [showMapPopup, setShowMapPopup] = useState<boolean>(false);
    // Temporary state for popup marker position
    const [tempMarkerPosition, setTempMarkerPosition] = useState({
      lat: Latitude,
      lng: Longitude,
    });

    const [markerKey, setMarkerKey] = useState(0); // Add marker key
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const circleRef = useRef<google.maps.Circle | null>(null); //Added to track the current circle instance
    const circleCleanupTimeout = useRef<NodeJS.Timeout>();

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyDaa0FdAfpQzAF1c7Twg7QyIZZ_iFHthto",
    });

    // Update center when props change
    useEffect(() => {
      if (isMapLoaded) {
        setCenter({
          lat: Latitude,
          lng: Longitude,
        });
        setTempMarkerPosition({
          lat: Latitude,
          lng: Longitude,
        });
        setMarkerKey((prev) => prev + 1);
      }
    }, [Latitude, Longitude, isMapLoaded]);

    useEffect(() => {
      if (isLoaded) {
        const timer = setTimeout(() => {
          setIsMapLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [isLoaded]);

    // Cleanup function for circle
    const cleanupCircle = () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };

    // Cleanup circle on unmount
    useEffect(() => {
      return () => {
        cleanupCircle();
        if (circleCleanupTimeout.current) {
          clearTimeout(circleCleanupTimeout.current);
        }
      };
    }, []);

    // Update circle properties
    useEffect(() => {
      if (isMapLoaded && circleRef.current) {
        // Schedule cleanup of old circle
        if (circleCleanupTimeout.current) {
          clearTimeout(circleCleanupTimeout.current);
        }

        circleCleanupTimeout.current = setTimeout(() => {
          if (circleRef.current) {
            circleRef.current.setCenter({ lat: Latitude, lng: Longitude });
            circleRef.current.setRadius(Radius * 1609.34);
          }
        }, 0);
      }
    }, [Latitude, Longitude, Radius, isMapLoaded]);

    const styles: MapStyles = {
      container: { width: MapWidth, height: MapHeight },
      containerPopup: { width: "560px", height: "400px" },
    };

    // Ensure `google` is defined before using it
    const mapOptions = isLoaded
      ? {
          disableDefaultUI: true,
          zoomControl: false, // map zoom control
          streetViewControl: false,
          fullscreenControl: false,
          scaleControl: true, // display scale
          draggable: false, //drag map
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
      : {};

    // Ensure `google` is defined before using it
    const mapOptionsPopup = isLoaded
      ? {
          disableDefaultUI: true,
          zoomControl: false, // map zoom control
          scrollwheel: true, // Enable mouse wheel zoom
          streetViewControl: false,
          fullscreenControl: false,
          draggable: true, // Enable map dragging
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
        }
      : {};

    // Calculate zoom level based on radius
    function getZoomLevel(radius: number): number {
      let zoomLevel = 11;
      if (radius > 0) {
        const radiusElevated = radius + radius / 2;
        const scale = radiusElevated / 500;
        zoomLevel = 16 - Math.log(scale) / Math.log(2);
      }
      return zoomLevel;
    }

    const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setTempMarkerPosition({ lat: newLat, lng: newLng });
      }
    };

    const handleMapLoad = (map: google.maps.Map) => {
      mapRef.current = map;
    };

    // Save marker position from popup
    const handleSaveMarker = () => {
      // Clean up existing circle
      cleanupCircle();
      setCenter(tempMarkerPosition);
      onMarkerDragEnd?.(tempMarkerPosition.lat, tempMarkerPosition.lng);
      setShowMapPopup(false);
      setMarkerKey((prev) => prev + 1);
    };

    const isandroidiospro = utils.CheckIsFromProAppWithoutState();

    const handleClose = () => {
      if (isandroidiospro) {
        utils.CallBackGivenToMobileApp(
          NativeAction,
          CloseBackTitle,
          Footer,
          TimerCount,
          IsFullLength
        );
        var obj: any = {
          NativeAction: NativeAction,
          Footer: Footer,
          IsFullLength: IsFullLength,
          callFromLocation: MapControlId,
          VagaroToolkit: VagaroToolkit,
        };

        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = CloseBackTitle;
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "53|~|" + JSON.stringify(obj);

        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
      setTempMarkerPosition(center); // Reset temp position to current center
      setShowMapPopup(false);
    };

    const handleOpen = () => {
      setTempMarkerPosition(center); // Reset temp position to current center
      setShowMapPopup(true);

      if (isandroidiospro) {
        var obj: any = {
          NativeAction: NativeAction,
          Footer: Footer,
          IsFullLength: IsFullLength,
          callFromLocation: MapControlId,
          VagaroToolkit: VagaroToolkit,
        };
        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = CloseBackTitle;
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "56|~|" + JSON.stringify(obj);
        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
    };

    const validation = () => {
      let validateObject = {
        [MapControlId]: center,
      };
      return validateObject;
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));

    return isLoaded ? (
      <div className="vg-map-width">
        <GoogleMap
          mapContainerStyle={styles.container}
          center={center}
          zoom={zoom}
          options={mapOptions}
          onLoad={handleMapLoad}
        >
          <Marker
            key={`marker-${markerKey}`}
            position={center}
            draggable={false}
            icon={markerIcon}
            animation={google.maps.Animation.DROP}
          />
          {Radius > 0 && (
            <Circle
              key={`circle-${markerKey}`}
              onLoad={(circle) => {
                // Store circle reference
                cleanupCircle();
                circleRef.current = circle;
              }}
              onUnmount={() => {
                cleanupCircle();
              }}
              center={center}
              radius={Radius * 1609.34} // Convert miles to meters
              options={{
                strokeColor: "#2A90D6",
                strokeOpacity: 0.9,
                strokeWeight: 2,
                fillColor: "#2A90D633",
                fillOpacity: 2.35,
              }}
            />
          )}
        </GoogleMap>

        <div className="add-map-marker-btn">
          {FixIncorrectMarker && (
            <VgButton
              ButtonIcon="map"
              ButtonVariant="ghost"
              ButtononClick={handleOpen}
            >
              Fix Incorrect Map Marker
            </VgButton>
          )}
        </div>

        {/* Map Popup */}
        {showMapPopup && (
          <div className="modal-overlay">
            <div
              className={`vg-modal-dialog mobilefullScreen vg-modalsummary modal-dialog-centered modal-dialog-scrollable center medium`}
            >
              <div className="vg-modal-content">
                  {!isandroidiospro && (
                    <>
                    <div className="vg-modal-header">
                      <div className="vg-modal-title">Adjust Map Marker</div>
                      <div className="vg-btn-close" onClick={handleClose}>
                        <svg
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.3945 11.4805C12.7754 11.832 12.7754 12.4473 12.3945 12.7988C12.2188 12.9746 11.9844 13.0625 11.75 13.0625C11.4863 13.0625 11.252 12.9746 11.0762 12.7988L8 9.72266L4.89453 12.7988C4.71875 12.9746 4.48438 13.0625 4.25 13.0625C3.98633 13.0625 3.75195 12.9746 3.57617 12.7988C3.19531 12.4473 3.19531 11.832 3.57617 11.4805L6.65234 8.375L3.57617 5.29883C3.19531 4.94727 3.19531 4.33203 3.57617 3.98047C3.92773 3.59961 4.54297 3.59961 4.89453 3.98047L8 7.05664L11.0762 3.98047C11.4277 3.59961 12.043 3.59961 12.3945 3.98047C12.7754 4.33203 12.7754 4.94727 12.3945 5.29883L9.31836 8.4043L12.3945 11.4805Z" />
                        </svg>
                      </div>
                    </div>
                  </>
                  )}
                
                <div className="vg-modal-body">
                  <span>
                    Drag the map marker just inside the entrance of your
                    business so customers know exactly where to find you.
                  </span>
                  <div className="marginTop8">
                    <GoogleMap
                      mapContainerStyle={styles.containerPopup}
                      center={center}
                      zoom={16}
                      options={mapOptionsPopup}
                      onLoad={handleMapLoad}
                    >
                      <Marker
                        position={center}
                        draggable={true}
                        icon={markerIcon}
                        onDragEnd={handleMarkerDragEnd}
                        animation={google.maps.Animation.DROP}
                      />
                    </GoogleMap>
                  </div>
                </div>
                <div className="vg-modal-footer">
                  {!isandroidiospro && (
                    <button
                      onClick={handleClose}
                      className="vg-tk-btn vg-btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleSaveMarker}
                    className="vg-tk-btn vg-btn-primary"
                  >
                    Save Map Marker
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <input type="hidden" onClick={() => handleClose()} id={MapControlId} />
      </div>
    ) : null;
  }
);

export default VgMapControl;