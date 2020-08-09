import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabsContext } from './tabs';
export var TabItem = function (props) {
    var index = props.index, className = props.className, children = props.children;
    var context = useContext(TabsContext);
    var classes = classNames('tab-item', className, {
        'is-active': context.index === index
    });
    return (React.createElement("div", { className: classes }, children));
};
TabItem.displayName = 'TabItem';
export default TabItem;
