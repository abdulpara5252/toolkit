declare module "filerobot-image-editor" {
    const FilerobotImageEditor: any;
    export default FilerobotImageEditor;
  }

  declare module 'codemirror-colorpicker' {
    export class ColorPicker {
      constructor(options: any);
      initColor(color: string): void;
    }
  }