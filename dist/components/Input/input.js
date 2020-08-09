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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * 输入框组件
 *
 * ## 引入方式
 * ~~~js
 * import { Input } from 'knight'
 * ~~~
 */
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, className = props.className, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "className"]);
    if (icon && append) {
        window.console.warn("Input Component: \"append\" prop will erase \"icon\" prop, when they exist at the same time.");
    }
    var wrapperClasses = classNames('knight-input-wrapper', className, (_a = {
            'has-icon': icon && !append,
            'has-prepend': !!prepend,
            'has-append': !!append,
            'is-disabled': disabled
        },
        _a["input-size-" + size] = size,
        _a));
    var fixControlledValue = function (value) {
        if (value === undefined || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in restProps) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: wrapperClasses, "data-testid": "test-input-wrapper" },
        prepend
            && (React.createElement("div", { className: "prepend" }, prepend)),
        React.createElement("input", __assign({}, restProps, { type: "text", className: "knight-input", disabled: disabled, "data-testid": "test-input" })),
        icon && !prepend
            && (React.createElement("div", { className: "icon-wrapper" },
                React.createElement(Icon, { icon: icon, theme: "dark", size: size }))),
        append
            && (React.createElement("div", { className: "append" }, append))));
};
export default Input;
