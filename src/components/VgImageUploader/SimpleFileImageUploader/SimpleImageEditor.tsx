
import { useCallback, useEffect, useRef, useState } from "react";
import "./_image_editor.scss"
import VgButton from "../../VgButton/VgButton";



export default function SimpleImageEditor({src,onSave,onClose,forceMaxSize}:{forceMaxSize?:number,src:string,onSave:(dataUrl:string,base64:string,height:number,width:number,fileDetails:Blob)=>void,onClose:()=>void,maxImageSize?:number}){
    const maxSize = forceMaxSize || 1600;
    const conavsContainerRef = useRef<HTMLDivElement>(null);
    const canvRef = useRef<HTMLCanvasElement>(null);
    const [imageWidth,setImageWidth] = useState(0);
    const [imageHeight,setImageHeight] = useState(0);
    const cropBounds = useRef({left:0,top:0,right:100,bottom:100});
    const currentRotation = useRef(0);
    const [rotation,setRotation] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const imgRef = useRef<any>(null);
    const [flips,setFlips ] = useState({x:1,y:1});
    const [isSaving, setIsSaving] = useState(false)
    

    const initImage = () => {
        const img = new Image();
        imgRef.current = img;
        img.src = src;
        img.onload = () => {
            let w = img.width;
            let h = img.height;
            setImageWidth(w);
            setImageHeight(h);
            const canv = canvRef.current;
            if (!canv) return;

            canv.width = w;
            canv.height = h;
            
            // const ctx = canv.getContext('2d');
            // if (ctx) {
            //     ctx.drawImage(img, 0, 0, w, h);
            // }
        }
        setIsReady(true);
    }

    const toBase64 = (dataUrl:string)=>{

        const base64 = dataUrl.split(",")[1];
        return base64;
    }
    const saveImage = ()=>{
        setIsSaving(true)
        const canv = canvRef.current;
        if(!canv) return;

        let cropWidth = (cropBounds.current.right-cropBounds.current.left)/100*imageWidth;
        let cropHeight = (cropBounds.current.bottom-cropBounds.current.top)/100*imageHeight;
        let cropX = cropBounds.current.left/100*imageWidth;
        let cropY = cropBounds.current.top/100*imageHeight;

        let currentImage = canv.toDataURL();

        let newImage = new Image();

        newImage.src = currentImage;
        newImage.onload = ()=>{

            let finalWidth = newImage.width;
            let finalHeight = newImage.height;
            let scale = 1;

            // if the crop is larger than the max size, then scale down the image
            if (cropWidth > maxSize || cropHeight> maxSize) {
                scale = maxSize / Math.max(cropWidth, cropHeight);
                finalWidth = Math.round(newImage.width * scale);
                finalHeight = Math.round(newImage.height * scale);
            }

            canv.width = cropWidth * scale;
            canv.height = cropHeight * scale;
            canv.getContext("2d")?.drawImage(newImage,cropX,cropY,cropWidth,cropHeight,0,0,cropWidth*scale,cropHeight*scale);

            const dataUrl = canv.toDataURL();
            const base64 = toBase64(dataUrl);
            const blob = new Blob([dataUrl], { type: 'image/png' });
            
            onSave(dataUrl, base64, newImage.width,newImage.height,blob);
            // onClose();
            setIsSaving(false)
        }
    }

    const UpdateImage = ()=>{
        const img = new Image();
        img.src = src;
        img.onload = ()=>{

            let w = img.width;
            let h = img.height;
            if(currentRotation.current > 3) currentRotation.current = 0;
            if(currentRotation.current < 0) currentRotation.current = 3;

            setRotation(currentRotation.current*90);
            let canvas = canvRef.current;
            if(!canvas) return;
            // Set canvas dimensions based on rotation (swap dimensions for 90° and 270°)
            const isVertical = currentRotation.current % 2 === 1;
            canvas.width = isVertical ? h : w;
            canvas.height = isVertical ? w : h;
            // Update state dimensions
            setImageWidth(canvas.width);
            setImageHeight(canvas.height);
            
            let context = canvas.getContext("2d");
            if(!context) return;

            
            // Clear transformation matrix
            context.setTransform(1, 0, 0, 1, 0, 0);
            // Translate to center of new canvas dimensions
            context.translate(canvas.width/2, canvas.height/2);
            context.rotate(Math.PI/2 * currentRotation.current);
            context.scale(flips.x, flips.y);
            context.drawImage(img, -w/2, -h/2, w, h);
        }
    }


    const rotateImage = (direction:number = 1)=>{
      
        currentRotation.current += direction;
        UpdateImage();
    }

    // useEffect(()=>{
    //     UpdateImage();

    // },[flips]);

    useEffect(() => {
        if (isInitialized) {
            UpdateImage();
        }
    }, [flips, isInitialized, rotation, UpdateImage]);


    useEffect(() => {
        if (!isInitialized) {
            initImage();
            currentRotation.current = 0;
            setIsInitialized(true);
        } 
    }, [src, isInitialized, initImage]);

    return <>

    
     <div className="block-edit simple-image-editor-container vanimation-fade-in no-delay" >
        <div className="simple-image-editor no-delay" >
            <div className="editor-header-row">

                <div className="editor-header-title">
                    <h4>Upload Image</h4>
                </div>

                <button className="close-button" onClick={onClose}>&times;</button>
            </div>
            <div className="canvas-row" ref={conavsContainerRef}>
                {!isReady && <p style={{color:"#fff"}}>Loading...</p>}
                {isSaving ? <p style={{color:"#fff"}}>Saving Changes...</p> : <canvas
              
              width={imageWidth} height={imageHeight} ref={canvRef}></canvas>}
                
            </div>
           {canvRef.current && !isSaving && <CropOutline  inBounds={cropBounds.current} canvasDom={canvRef.current} onUpdateCropBounds={(newBounds)=>{cropBounds.current = newBounds;}}/> }
            <div className="toolbar-row">
                <div className="mobileRow">

                    <div className="toolbar-row-left t-row">
                        <button
                        style={flips.x>0?{opacity:.5}:{}}
                        className="invisible-button"
                        onClick={() => setFlips({ x: flips.x * -1, y: flips.y })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"  height="1.4em" fill="currentColor" viewBox="0 0 512 512"><path d="M493.5 181.5c12 22.6 18.7 48.4 18.5 75.8C511.3 345.4 438.6 416 350.4 416H192v47.5c0 22.5-26.2 32.3-41 17.5l-80-80c-9.4-9.4-9.4-24.6 0-33.9l80-80C166.1 271.9 192 282.7 192 304v48h158.9c52.8 0 96.6-42.2 97.1-95 .2-15-3.2-29.3-9.2-42-4.4-9.2-2.4-20.1 4.8-27.3 4.7-4.7 8.6-8.6 11.9-11.8 11.4-11.4 30.6-8.6 38.1 5.6zM64 255c.5-52.8 44.3-95 97.1-95H320v47.5c0 22.4 26.1 32.3 41 17.5l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80C346 16.1 320 26.3 320 48.5V96H161.6C73.4 96 .7 166.6 0 254.8c-.2 27.4 6.5 53.1 18.5 75.8 7.5 14.2 26.7 16.9 38.1 5.6 3.2-3.2 7.1-7.1 11.9-11.8 7.2-7.2 9.2-18.1 4.8-27.3-6-12.7-9.4-27-9.2-42z"/></svg>
                        </button>
                    </div>
                    <div className="toolbar-row-center t-row rotationWrap">
                        <button className="rotate-button invisible-button" onClick={() => rotateImage(-1)}><svg fill="currentColor" height={"1em"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M212.3 224.3H12c-6.6 0-12-5.4-12-12V12C0 5.4 5.4 0 12 0h48c6.6 0 12 5.4 12 12v78.1C117.8 39.3 184.3 7.5 258.2 8c136.9 1 246.4 111.6 246.2 248.5C504 393.3 393.1 504 256.3 504c-64.1 0-122.5-24.3-166.5-64.2-5.1-4.6-5.3-12.6-.5-17.4l34-34c4.5-4.5 11.7-4.7 16.4-.5C170.8 415.3 211.6 432 256.3 432c97.3 0 176-78.7 176-176 0-97.3-78.7-176-176-176-58.5 0-110.3 28.5-142.3 72.3h98.3c6.6 0 12 5.4 12 12v48c0 6.6-5.4 12-12 12z" /></svg></button>
                        <div style={{ width: "60px", textAlign: "center", marginLeft: ".2em" }}> {rotation}°</div>
                        <button className="rotate-button invisible-button right" onClick={() => rotateImage(1)}><svg fill="currentColor" height={"1em"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M212.3 224.3H12c-6.6 0-12-5.4-12-12V12C0 5.4 5.4 0 12 0h48c6.6 0 12 5.4 12 12v78.1C117.8 39.3 184.3 7.5 258.2 8c136.9 1 246.4 111.6 246.2 248.5C504 393.3 393.1 504 256.3 504c-64.1 0-122.5-24.3-166.5-64.2-5.1-4.6-5.3-12.6-.5-17.4l34-34c4.5-4.5 11.7-4.7 16.4-.5C170.8 415.3 211.6 432 256.3 432c97.3 0 176-78.7 176-176 0-97.3-78.7-176-176-176-58.5 0-110.3 28.5-142.3 72.3h98.3c6.6 0 12 5.4 12 12v48c0 6.6-5.4 12-12 12z" /></svg></button>
                    </div>
                </div>

                    <div className="toolbar-save-close-row t-row">
                        <VgButton
                        ButtonVariant="secondary"
                        ButtononClick={onClose}
                        >
                            Cancel
                        </VgButton>
                        <VgButton
                        ButtonVariant="primary"
                        ButtononClick={saveImage}
                        >
                            Save
                        </VgButton>
                    </div>

                </div>
            </div>
  
    </div></>

}

function CropOutline({inBounds,canvasDom,onUpdateCropBounds}:{inBounds:{left:number,top:number,right:number,bottom:number},canvasDom:HTMLCanvasElement,onUpdateCropBounds:(newBounds:any)=>void}){

    const [canvasBounds,setCanvasBounds] = useState({x:0,y:0,width:0,height:0});
    const [cropBounds,setCropBounds] = useState({...inBounds});
    const cropRef = useRef({...inBounds});
    const draggingDirections = useRef({left:false,right:false,top:false,bottom:false});
    const isDragging = useRef(false);

    const moveStart = useRef({x:0,y:0});
    const originalCropBounds = useRef({left:15,top:15,right:75,bottom:75});
    const [mouseHover,setMouseHover] = useState("normal");
    

    const darkStyle = {
   
        background: "rgba(0,0,0,0.5)",
    }


    const startDragging =  (directions:{left:boolean,right:boolean,top:boolean,bottom:boolean})=>{
        draggingDirections.current = directions;
        isDragging.current = true;
    }

    const endDragging = ()=>{
        draggingDirections.current = {left:false,right:false,top:false,bottom:false};
        isDragging.current = false;
    }

    function emulateMouseMoveFromTouch(e: TouchEvent) {
        let pushEvent = new MouseEvent("mousemove", {
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        });
            updateDragging(pushEvent);
        e.preventDefault();
      }
 
    const minBufferX = 5;
    const minBufferY = 5 ;
    const updateDragging = useCallback((e:MouseEvent)=>{
        if(!isDragging.current) return;
        let x = e.clientX;
        let y = e.clientY;
        const bounds = canvasDom.getBoundingClientRect();
        let newCropBounds = {...cropRef.current};
      
        let current = draggingDirections.current;
        // if all directions are true, then we are moving the crop bounds
        if(current.left&&current.right&&current.top&&current.bottom){

            let xDiff = x-moveStart.current.x;
            let yDiff = y-moveStart.current.y;
            newCropBounds.left = originalCropBounds.current.left + xDiff/bounds.width*100;
            newCropBounds.top = originalCropBounds.current.top + yDiff/bounds.height*100;
            newCropBounds.right = originalCropBounds.current.right + xDiff/bounds.width*100;
            newCropBounds.bottom = originalCropBounds.current.bottom + yDiff/bounds.height*100;

            if(newCropBounds.left<0){ 
                newCropBounds.left = 0; 
                newCropBounds.right = newCropBounds.left+ (originalCropBounds.current.right-originalCropBounds.current.left);
            }
            if(newCropBounds.top<0){ 
                newCropBounds.top = 0; 
                newCropBounds.bottom = newCropBounds.top+ (originalCropBounds.current.bottom-originalCropBounds.current.top);
            }
            if(newCropBounds.right>100){ 
                newCropBounds.right = 100; 
                newCropBounds.left = newCropBounds.right- (originalCropBounds.current.right-originalCropBounds.current.left);
            }
            if(newCropBounds.bottom>100){ 
                newCropBounds.bottom = 100; 
                newCropBounds.top = newCropBounds.bottom- (originalCropBounds.current.bottom-originalCropBounds.current.top);
            }

            cropRef.current = newCropBounds;
            setCropBounds(newCropBounds);
            onUpdateCropBounds(newCropBounds);
            return;
        }
        
        if(draggingDirections.current.left){
            newCropBounds.left =  (x- bounds.x)/bounds.width *100;
            if(newCropBounds.left > newCropBounds.right - minBufferX) newCropBounds.left = newCropBounds.right - minBufferX;
        }

        if(draggingDirections.current.top){
            newCropBounds.top =  (y- bounds.y)/bounds.height * 100;
            if(newCropBounds.top > newCropBounds.bottom - minBufferY) newCropBounds.top = newCropBounds.bottom - minBufferY;
        }

        if(draggingDirections.current.right){
            newCropBounds.right =  (x- bounds.x)/bounds.width * 100;
            if(newCropBounds.right < newCropBounds.left + minBufferX) newCropBounds.right = newCropBounds.left + minBufferX;
        }

        if(draggingDirections.current.bottom){
            newCropBounds.bottom =  (y- bounds.y)/bounds.height * 100;
            if(newCropBounds.bottom < newCropBounds.top + minBufferY) newCropBounds.bottom = newCropBounds.top + minBufferY;
        }
   
        if(newCropBounds.left<0) newCropBounds.left = 0;
        if(newCropBounds.top<0) newCropBounds.top = 0;
        if(newCropBounds.right>100) newCropBounds.right = 100;
        if(newCropBounds.bottom>100) newCropBounds.bottom = 100;

        


        setCropBounds(newCropBounds);
        cropRef.current = newCropBounds;
        onUpdateCropBounds(newCropBounds);

    },[isDragging,draggingDirections,cropBounds,canvasDom]);

    useEffect(() => {
        let mounted = true;
        
        const updateBoundsIfMounted = () => {
            if (mounted) {
                let bounds = canvasDom.getBoundingClientRect();
                setCanvasBounds(bounds);
            }
        };


        

        window.addEventListener("resize", updateBoundsIfMounted);
        document.addEventListener("pointermove", updateDragging, { passive: false });
        document.addEventListener("pointerup", endDragging);
        document.addEventListener("pointerdown", () => startDragging(draggingDirections.current));
        document.addEventListener("touchmove", emulateMouseMoveFromTouch, { passive: false });


        updateBoundsIfMounted();
        const resizeObserver = new ResizeObserver(updateBoundsIfMounted);
        resizeObserver.observe(canvasDom);

        return () => {
            mounted = false;
            window.removeEventListener("resize", updateBoundsIfMounted);
            document.removeEventListener("pointermove", updateDragging);
            document.removeEventListener("pointerup", endDragging);
            document.removeEventListener("pointerdown", () => startDragging(draggingDirections.current));
            document.removeEventListener("touchmove", emulateMouseMoveFromTouch); 

            resizeObserver.disconnect();
        };
    }, [canvasDom]);

    const handleMouseOver = (e:any)=>{
        if(isDragging.current) return; // don't update the mouse hover when dragging

        let x = e.clientX;
        let y = e.clientY;
        let bounds = canvasDom.getBoundingClientRect();
        let left = bounds.left + cropBounds.left*bounds.width/100;
        let top = bounds.top + cropBounds.top*bounds.height/100;
        let right = bounds.left + cropBounds.right*bounds.width/100;
        let bottom = bounds.top + cropBounds.bottom*bounds.height/100;
      
        const buffer = 10;
        left+=buffer;
        top+=buffer;
        right-=buffer;
        bottom-=buffer;

        //update the mouse cursor to the correct direction and assign the drag directions based on mouse position
        if(x>right){
            if(y>bottom) { setMouseHover("se-resize"); 
                draggingDirections.current = {left:false,right:true,top:false,bottom:true};
            }
            else if(y<top) { setMouseHover("ne-resize"); 
                draggingDirections.current = {left:false,right:true,top:true,bottom:false};
            }
            else { setMouseHover("ew-resize"); 
                draggingDirections.current = {left:false,right:true,top:false,bottom:false};
            }
        }
        else if(x<left){
            if(y>bottom) { setMouseHover("sw-resize"); 
                draggingDirections.current = {left:true,right:false,top:false,bottom:true};
            }
            else if(y<top) { setMouseHover("nw-resize"); 
                draggingDirections.current = {left:true,right:false,top:true,bottom:false};
            }
                else { setMouseHover("ew-resize"); 
                draggingDirections.current = {left:true,right:false,top:false,bottom:false};
            }
        }
        else if(y>bottom){
            setMouseHover("ns-resize");
            draggingDirections.current = {left:false,right:false,top:false,bottom:true};
        }
        else if(y<top){
            setMouseHover("ns-resize");
            draggingDirections.current = {left:false,right:false,top:true,bottom:false};
        }

        else { setMouseHover("move"); 
            draggingDirections.current = {left:true,right:true,top:true,bottom:true};
            moveStart.current = {x,y};
            originalCropBounds.current = {...cropBounds};
        }
    }

    
    const dotStyle: any = {
        position: "absolute",
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        background: "white",
        border: "1px solid green",
    }


    const edgeBuffer = 24; // buffer space that a user can still drag the crop bounds when not over the canvas DOM
    return  <>
    <div className="outline-container-wrapper"
    style={{
        position: "fixed",
        top: (canvasBounds.y  -edgeBuffer)+"px",
        left: (canvasBounds.x -edgeBuffer)+"px",
        width: (canvasBounds.width + edgeBuffer*2)+"px",
        height: (canvasBounds.height + edgeBuffer*2)+"px",
        cursor: mouseHover,
    }}
    onMouseMove={handleMouseOver}
    onPointerDown={handleMouseOver}
    >
    <div className="outline-container"
    style={{
        position: "fixed",
        top: (canvasBounds.y)+"px",
        left: (canvasBounds.x)+"px",
        width: (canvasBounds.width)+"px",
        height: (canvasBounds.height)+"px",
 
     
    }}

    >
    
   { cropBounds.left>0 && <div className="left-dark" style={{...darkStyle,position: "absolute",left:0,top:0,height:"100%",width:cropBounds.left+"%"}}> 
    </div> }
    { cropBounds.right<100 && <div className="right-dark" style={{...darkStyle,position: "absolute",right:0,top:0,height:"100%",width:(100-cropBounds.right)+.01+"%"}}>
    </div> }
    { cropBounds.top>0 && <div className="top-dark" style={{...darkStyle,position: "absolute",left:cropBounds.left+"%",top:0,width:(cropBounds.right-cropBounds.left)+"%",height:cropBounds.top+"%"}}>
    </div> }
    { cropBounds.bottom<100 && <div className="bottom-dark" style={{...darkStyle,position: "absolute",left:cropBounds.left+"%",bottom:0,width:(cropBounds.right-cropBounds.left)+"%",height:(100-cropBounds.bottom)+"%"}}>
    </div> }
        <div className="outline"
        style={{
            position: "absolute",
            top: cropBounds.top+"%",
            left: cropBounds.left+"%",
            width: cropBounds.right-cropBounds.left+"%",
            height: cropBounds.bottom -cropBounds.top   +"%",
            border: "2px solid green",
        }}
        >
            <div className="outline-dot top-left" style={{...dotStyle,left:"-5px",top:"-5px"}}></div>
            <div className="outline-dot top-right" style={{...dotStyle,right:"-5px",top:"-5px"}}></div>
            <div className="outline-dot bottom-left" style={{...dotStyle,left:"-5px",bottom:"-5px"}}></div>
            <div className="outline-dot bottom-right" style={{...dotStyle,right:"-5px",bottom:"-5px"}}></div>

            <div className="outline-dot left" style={{...dotStyle,left:"-5px",top:"calc(50% - 5px)"}}></div>
            <div className="outline-dot right" style={{...dotStyle,right:"-5px",top:"calc(50% - 5px)"}}></div>
            <div className="outline-dot top" style={{...dotStyle,left:"calc(50% - 5px)",top:"-5px"}}></div>
            <div className="outline-dot bottom" style={{...dotStyle,left:"calc(50% - 5px)",bottom:"-5px"}}></div>
        </div>
    </div> 
    </div>
    </>

}
