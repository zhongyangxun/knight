var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import TabNav from './tabNav';
export var TabsContext = createContext({
    index: '0'
});
/**
 * 选项卡组件
 * ## 引入方式
 * ~~~javascript
 * import { Tabs } from 'knight'
 *
 * const { TabItem } = Tabs
 * ~~~
 */
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, onSelect = props.onSelect, className = props.className, children = props.children, type = props.type;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("knight-tabs tabs-" + type, className);
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick
    };
    var renderChildren = function () {
        var tabsNavItems = [];
        var tabsContentItems = React.Children.map(children, function (child, index) {
            var childElement = child;
            if (childElement.type.displayName === 'TabItem') {
                var indexStr = index.toString();
                tabsNavItems.push(React.createElement(TabNav, __assign({ key: indexStr, index: indexStr }, childElement.props), childElement.props.label));
                return React.cloneElement(childElement, {
                    index: indexStr
                });
            }
        });
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "tabs-bar" },
                React.createElement("div", { className: "tab-nav-container" }, tabsNavItems)),
            React.createElement("div", { className: "tabs-content" }, tabsContentItems)));
    };
    return (React.createElement("div", { className: classes, "data-testid": "test-tabs" },
        React.createElement(TabsContext.Provider, { value: passedContext }, renderChildren())));
};
Tabs.defaultProps = {
    defaultIndex: '0',
    type: 'line'
};
export default Tabs;
