import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 设置 Button 的禁用 */
    disabled?: boolean;
    /** 设置 Button 的尺寸 */
    size?: ButtonSize;
    /** 设置 Button 类型 */
    btnType?: ButtonType;
    children: ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 一个按钮组件
 * ## 引入方式
 * ~~~js
 * import { Button } from 'knight'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
