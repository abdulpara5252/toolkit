export default AjaxService;
declare namespace AjaxService {
    function Get(token: any, data: any, callback: any, onFailure: any): void;
    function Post(token: any, data: any, callback: any, onFailure: any): void;
    function Put(token: any, data: any, callback: any, onFailure: any): void;
    function Patch(token: any, data: any, callback: any, onFailure: any): void;
    function Delete(token: any, data: any, callback: any, onFailure: any): void;
    function GetV2(apiUrl: any, data: any, callback: any, onFailure: any, headers: any): void;
    function PostV2(apiUrl: any, data: any, callback: any, onFailure: any, headers: any): void;
}
