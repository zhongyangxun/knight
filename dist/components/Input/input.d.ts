import { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 设置是否禁用 */
    disabled?: boolean;
    /** Input 的尺寸 */
    size?: InputSize;
    /** 输入框图标 */
    icon?: IconProp;
    /** 输入框前缀 */
    prepend?: string | ReactElement;
    /** 输入框后缀 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * 输入框组件
 *
 * ## 引入方式
 * ~~~js
 * import { Input } from 'knight'
 * ~~~
 */
export declare const Input: FC<InputProps>;
export default Input;
