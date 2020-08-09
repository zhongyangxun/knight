import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 获取下拉列表数据，支持自定义同步和异步。返回值必须是带有 value 属性的对象数组或者满足该条件的 Promise 对象 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选中选项的回调函数 */
    onSelect?: (item: DataSourceType) => void;
    /** 自定义下拉选项模板，参数数据结构和 fetchSuggestions 返回的数组成员相同 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * 输入自动完成组件，支持自定义下拉选项，以及异步请求下拉选项，切支持键盘操作
 *
 * ## 引入方式
 * ~~~javascript
 * import { AutoComplete } from 'knight'
 * ~~~
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
