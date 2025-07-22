import { Fragment, useState } from "react";
import "./Texteditor.scss";
import VgTextEditor from "../VgTextEditor/VgTextEditor";
import VgPopup from "../VgPopup/VgPopup";
import VgButton from "../VgButton/VgButton";


const Texteditor = () => {
    const [editoropen, setEditoropen] = useState(false);
    const editordemo = () => {
        return (
            <VgTextEditor
                ToolbarRawData={{
                    Alignment: true,
                    BackgroundColor: true,
                    Bold: true,
                    Clear: true,
                    Fontcolor: true,
                    Fontfamily: true,
                    Fontsize: true,
                    InsertNames: true,
                    Italic: true,
                    Link: true,
                    Redo: false,
                    Strikethrough: true,
                    Underline: true,
                    Undo: false,
                    NumberListButton: true,
                    BulletListButton: true
                }}
                Style
                Title="Edit Content"
                AiControlPopup={false}
                />
        )
    }
    return (
      <Fragment>
        <div className="form-container">
          <div className="vgform-container">
            <h2 className="form-title">Text Editor</h2>
           
           
           <div className="dashboard-section">
                <div className="box-editor">
                <div className="editor-data">
                    <label className="vg-input-label">Refund Policy:</label>
                    <span className="vg-input-desc">A refund policy protects your business against angry customers and it will be applicable for online purchase of Product, Gift Card, Membership and Package.</span>
                </div>
                <VgTextEditor
                    ToolbarRawData={{
                        Alignment: true,
                        BackgroundColor: true,
                        Bold: true,
                        Clear: true,
                        Fontcolor: true,
                        Fontfamily: true,
                        Fontsize: true,
                        InsertNames: true,
                        Italic: true,
                        Link: true,
                        Redo: false,
                        Strikethrough: true,
                        Underline: true,
                        Undo: false,
                        NumberListButton: true,
                        BulletListButton: true
                    }}
                    Style
                    Title="Edit Content"
                    AiControlPopup={false}
                    />


                
 
                </div>
           </div>


          
                    {editoropen && <VgPopup
                        ButtonPrimary="Save"
                        ButtonSecondary="Close"
                        CloseBackTitle="From Control"
                        CloseButton={false}
                        Footer={2}
                        FooterButton="both"
                        EnableBody
                        Popupopen
                        OnClickPrimary={() => {}}
                        OnClickSecondary={() => {setEditoropen(false)}}
                        PopupBody={editordemo}
                        PopupId="PopupId"
                        Size="large"
                        TimerCount={0}
                        VagaroToolkit={1}
                        customClassName=""
                        onClose={() => {setEditoropen(false)}}
                        />}
                    
             

           <div className="dashboard-section">
                    <div className="">
                    <VgButton
                        ButtonVariant="primary"
                        ButtononClick={() => {setEditoropen(true)}}
                        ButtononHover={() => {}}
                        >
                        Open
                    </VgButton>
                    </div>
            </div>
            
            <div className="dashboard-section">
              
            </div>
          </div>
          
        </div>
       
      </Fragment>
    );
  };
  
  export default Texteditor;