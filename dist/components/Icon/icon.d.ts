import { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /** 指定的图标 */
    icon: IconProp;
    /** 图标的颜色主题 */
    theme?: ThemeProps;
}
/**
 * 提供了常用的图标集合, 基于 [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)
 *
 * 支持 react-fontawesome 所有属性，可在 [这里](https://github.com/FortAwesome/react-fontawesome#basic) 查询
 *
 * 支持 font-awesome 所有免费的 solid 图标, 可在 [这里](https://fontawesome.com/icons?d=gallery&s=solid&m=free) 查询
 *
 * ## 引入方式
 * ~~~js
 * import { Icon } from 'knight'
 * ~~~
 */
export declare const Icon: FC<IconProps>;
export default Icon;
