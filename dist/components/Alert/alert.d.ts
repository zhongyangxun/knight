import { HTMLAttributes, FC } from 'react';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface BaseAlertProps {
    /** 提示框信息 */
    message: string;
    /** 提示框详细信息 */
    description?: string;
    className?: string;
    alertType?: AlertType;
    /** 设置提示框可关闭 */
    closable?: boolean;
    /** 提示框关闭的回调函数 */
    onClose?: () => void;
}
declare type NativeBaseProps = HTMLAttributes<HTMLElement>;
export declare type AlertProps = BaseAlertProps & Partial<NativeBaseProps>;
/**
 * 一个提示框组件
 * ## 引入方式
 * ~~~js
 *  import { Alert } from 'knight'
 * ~~~
 */
export declare const Alert: FC<AlertProps>;
export default Alert;
