import { FC } from 'react';
export interface SelectProps {
    isOpen?: boolean;
    placeholder?: string;
    defaultValue?: string;
    disabled?: boolean;
    multiple?: boolean;
    onChange?: (value: string | string[]) => void;
    onDropdownVisibleChange?: (isOpen: boolean) => void;
}
export declare const Select: FC<SelectProps>;
export default Select;
