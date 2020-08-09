import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 文件上传 URL */
    action: string;
    /** 默认文件列表 */
    defaultFileList?: UploadFile[];
    /** 自定义请求头 */
    headers?: {
        [key: string]: any;
    };
    /** 文件上传的字段名称 */
    name?: string;
    /** 需要与文件一起传到后台的其他数据 */
    data?: {
        [key: string]: any;
    };
    /** 设置上传是否携带验证信息 */
    withCredentials?: boolean;
    /** 可上传的文件类型 */
    accept?: string;
    /** 是否一次选择多个文件上传 */
    multiple?: boolean;
    /** 是否启用拖动上传文件 */
    drag?: boolean;
    /** 上传前的回调函数 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传过程中的回调函数 */
    onProgress?: (percentage: number, file: File) => void;
    /** 上传成功的回调函数 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /** 上传出错的回调函数 */
    onError?: (err: any, file: UploadFile) => void;
    /** 文件状态改变时的回调函数，上传成功或者失败时都会被调用 */
    onChange?: (file: UploadFile) => void;
    /** 从文件列表移除文件的回调函数 */
    onRemove?: (file: UploadFile) => void;
}
/**
 * 文件上传组件，支持拖拽上传文件
 *
 * ## 引入方式
 * ~~~javascript
 * import { Upload } from 'knight'
 * ~~~
 */
export declare const Upload: FC<UploadProps>;
export default Upload;
