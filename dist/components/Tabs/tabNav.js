import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabsContext } from './tabs';
var TabNav = function (props) {
    var index = props.index, children = props.children, disabled = props.disabled;
    var context = useContext(TabsContext);
    var classes = classNames('tab-nav', {
        'is-active': index === context.index,
        'is-disabled': disabled
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("div", { className: classes, onClick: handleClick }, children));
};
TabNav.defaultProps = {
    disabled: false
};
export default TabNav;
