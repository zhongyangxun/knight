import { ReactText, FC, MouseEvent } from 'react';
export interface TagProps {
    closable?: boolean;
    onClose?: (e: MouseEvent) => void;
    children: ReactText;
}
export declare const Tag: FC<TagProps>;
export default Tag;
