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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
export var Icon = function (props) {
    var _a;
    // icon-primary
    var className = props.className, theme = props.theme, restProps = __rest(props, ["className", "theme"]);
    var classes = classNames('knight-icon', className, (_a = {},
        _a["icon-" + theme] = theme,
        _a));
    return (React.createElement(FontAwesomeIcon, __assign({ className: classes }, restProps)));
};
Icon.defaultProps = {
    theme: 'primary'
};
export default Icon;
