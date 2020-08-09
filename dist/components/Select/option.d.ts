import { FC, ReactText } from 'react';
export interface OptionProps {
    value: string;
    children: ReactText;
    disabled?: boolean;
    onSelect?: (value: string, optionText: string) => void;
    selected?: boolean;
}
declare const Option: FC<OptionProps>;
export default Option;
