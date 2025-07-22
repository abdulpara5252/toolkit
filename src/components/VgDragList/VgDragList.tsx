import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import VgCheckbox from "../VgCheckbox/VgCheckbox";
import './VgDragList.scss';

interface Options {
  id: string;
  name: string;
  selected: boolean;
}

export interface VgDragListProps {
  ShowEditSave?: boolean;
  ParentCheckboxTitle?: string;
  RawData?: Options[];
  onChange?: (options: Options[]) => void;
  OnEditSave?: (isEditing: boolean, options: Options[]) => void;
}

interface VgDragListRef {
  validate: () => any;
}

const VgDragList: React.FC<VgDragListProps> = forwardRef<
  VgDragListRef,
  VgDragListProps
>(({ 
  ShowEditSave = true,
  ParentCheckboxTitle,
  RawData = [],
  onChange,
  OnEditSave,
}, ref) => {
  const [dragDropEditSave, setDragDropEditSave] = useState(false); //edit/save mode
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null); //drag start index

  // Combined state for dropdown
  const [dropdownState, setDropdownState] = useState({ options: true });

  const [options, setOptions] = useState<Options[]>(RawData); // Initialize options with RawData

  // Update internal state when RawData changes
  useEffect(() => {
    setOptions(RawData);
  }, [RawData]);

  // Toggle dropdown state
  const toggleDropDown = () => {
    setDropdownState((prevState) => ({
      ...prevState,
      options: !prevState.options,
    }));
  };

  // Handle parent checkbox for options
  const handleOptionsParentChange = () => {
    const allSelected = options.every((opt) => opt.selected);
    const updatedOptions = options.map((opt) => ({
      ...opt,
      selected: !allSelected,
    }));
    setOptions(updatedOptions);

    // Trigger onChange callback
    // For parent checkbox, pass all options
    if (onChange) {
      onChange(updatedOptions);
    }
  };

  // Handle individual option checkbox
  const handleOptionsChange = (optionId: string) => {
    const updatedOptions = options.map((opt) =>
      opt.id === optionId ? { ...opt, selected: !opt.selected } : opt
    );
    setOptions(updatedOptions);

    // Find the changed option and its index
    const changedIndex = updatedOptions.findIndex((opt) => opt.id === optionId); // Get the index of the changed option
    const changedOption = updatedOptions[changedIndex]; // Get the changed option data

    // Trigger onChange callback
    if (onChange && changedOption) {
      onChange([changedOption]);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragStartIndex(index);
  };

  // Handle drag over to dynamically reorder
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (dragStartIndex === null || dragStartIndex === index) return;

    const updatedOptions = [...options];
    const [movedItem] = updatedOptions.splice(dragStartIndex, 1); // Remove item from original position
    updatedOptions.splice(index, 0, movedItem); // Insert at new position
    setOptions(updatedOptions); // Update state
    setDragStartIndex(index); // Update drag start index to new position
  };

  // Handle drop
  const handleDrop = () => {
    setDragStartIndex(null); // Reset drag start index

    // Notify parent of final order
    if (onChange) {
      onChange(options);
    }
  };

  // Handle edit/save toggle
  const handleEditSaveToggle = () => {
    const newEditState = !dragDropEditSave;
    setDragDropEditSave(newEditState);

    // Call OnEditSave callback if provided
    if (OnEditSave) {
      OnEditSave(newEditState, options);
    }
  };

  // Check if all options are selected
  const allOptionsSelected = options.every((opt) => opt.selected);

  // Validate function to be exposed via ref
  useImperativeHandle(ref, () => ({
    validate: () => {
      const isValid = options.some((opt) => opt.selected);
      return { isValid, value: options };
    },
  }));

  return (
    <>
      <div className={`draglist_wrapper h-[99%] flex flex-col relative min-w-[240px] ${dragDropEditSave ? "save" : "edit"}`}>
        {ShowEditSave && (
          <a
            onClick={handleEditSaveToggle}
            className="absolute font-normal text-text-blue border-b border-text-blue no-underline border_blue_default text-[12px] cursor-pointer mr-[5px] z-[99] right-0 top-0 select-none"
          >
            {dragDropEditSave ? "Save" : "Edit"}
          </a>
        )}

        <div className="tab-content overflow-auto">
          <div
            className="flex items-center justify-between relative mb-[6px] cursor-pointer pl-[10px]"
            onClick={toggleDropDown}
          >
            <span className="absolute -left-[2px] top-0 h-full flex items-center">
              {dropdownState.options ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="size-3 fill-icon_neutral_secondary">
                  <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" className="size-3 fill-icon_neutral_secondary">
                  <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
                </svg>
              )}
            </span>
            <VgCheckbox
              CheckBoxId={`OptionsDropDown-${ParentCheckboxTitle?.replace(/\s+/g, '_')}`} // Make ID unique
              CheckboxLabel={ParentCheckboxTitle}
              CheckboxVariation="Checkbox-Simple"
              SetValue={allOptionsSelected}
              OnChange={(e) => {
                handleOptionsParentChange();
              }}
            />
          </div>          

          {dropdownState.options && (
            <div className="draglist">
              {options.map((option, index) => (
                <div
                  key={option.id}
                  className='flex mb-[6px] pr-[30px] pl-[20px] items-center'
                  draggable={dragDropEditSave}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={handleDrop}
                >
                  {dragDropEditSave && (
                    <span className="text-sm font-normal text-s fas fa-bars mr-[16px] relative top-[1px] text-icon_neutral_weak cursor-ns-resize"></span>
                  )}
                  <VgCheckbox
                    CheckBoxId={`OptionsListItem-${option.id}-${ParentCheckboxTitle?.replace(/\s+/g, '_')}`} // Make ID unique
                    CheckboxLabel={option.name}
                    CheckboxVariation="Checkbox-Simple"
                    SetValue={option.selected}
                    OnChange={() => handleOptionsChange(option.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default VgDragList;