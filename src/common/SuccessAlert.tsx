// import React, { Fragment, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';

// const SuccessAlert = (props) => {
  
//     const displayAlert = (selector) => {
//         const alertElement = document.querySelector(selector);
//         if (alertElement) {
//             alertElement.querySelector('.text-block-28').innerHTML = props.strMessage;
//             alertElement.classList.add('showmsgTop');
//             setTimeout(() => {
//                 alertElement.classList.remove('showmsgTop');
//                 document.body.classList.remove('mobileaccept-passive');
                
//                 const root = createRoot(alertElement);
//                 root.unmount(); 
//             }, props.displayTime);
//         }
//     };

//     useEffect(() => {
//         try {
//             if (props.alertType === 'success') {
//                 displayAlert('.banner-success-master');
//             } else if (props.alertType === 'warning') {
//                 displayAlert('.banner-warning-master');
//             } else if (props.alertType === 'fail') {
//                 displayAlert('.banner-fail-master');
//             }
//         } catch (error) {
//             console.error('Error displaying alert: ', error);
//             const openDialog = document.getElementById('root');
//             if (openDialog) {
//                 const root = createRoot(openDialog);
//                 root.unmount();
//             }
//         }
//     }, [props]);

//     return (
//         <Fragment>
//             <div className="removePadTop">
//                 {props.alertType === "success" && (
//                     <Fragment>
//                         <div className="banner-success-master">
//                             <div className="font-awesome-normal icon-banner"></div>
//                             <div className="text-block-28">{props.strMessage}</div>
//                         </div>
//                     </Fragment>
//                 )}
//                 {props.alertType === "warning" && (
//                     <Fragment>
//                         <div className="banner-warning-master">
//                             <div className="font-awesome-solid icon-banner"></div>
//                             <div className="text-block-28">{props.strMessage}</div>
//                         </div>
//                     </Fragment>
//                 )}
//                 {props.alertType === "fail" && (
//                     <Fragment>
//                         <div className="banner-fail-master">
//                             <div className="font-awesome-normal icon-banner"></div>
//                             <div className="text-block-28">{props.strMessage}</div>
//                         </div>
//                     </Fragment>
//                 )}
//             </div>
//         </Fragment>
//     );
// };

// export default SuccessAlert;

/* Above commented code is needed in future do not remove */

import React, { useEffect } from 'react';

const SuccessAlert = ({strMessage, displayTime, onClose }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, displayTime);

    return () => clearTimeout(timer);
  }, [displayTime, onClose]);

  return (
    <div className="banner-warning-master">
      <div className="font-awesome-normal icon-banner"></div>
     <div className="text-block-28">{strMessage}</div>
    </div>
  );
};

export default SuccessAlert;

