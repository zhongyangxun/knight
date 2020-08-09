import { FC, CSSProperties } from 'react';
import { ThemeProps } from '../Icon/icon';
interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: CSSProperties;
    theme?: Exclude<ThemeProps, 'light'>;
}
declare const Progress: FC<ProgressProps>;
export default Progress;
