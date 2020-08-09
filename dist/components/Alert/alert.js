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
import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
/**
 * 一个提示框组件
 * ## 引入方式
 * ~~~js
 *  import { Alert } from 'knight'
 * ~~~
 */
export var Alert = function (props) {
    var _a;
    var message = props.message, description = props.description, className = props.className, alertType = props.alertType, closable = props.closable, onClose = props.onClose, restProps = __rest(props, ["message", "description", "className", "alertType", "closable", "onClose"]);
    var classes = classNames('alert', className, (_a = {},
        _a["alert-" + alertType] = alertType,
        _a['alert-with-description'] = description,
        _a['alert-closable'] = closable,
        _a));
    var messageClasses = classNames('alert-message', {
        'bold-title': description
    });
    var _b = useState(true), alertShow = _b[0], setAlertShow = _b[1];
    var handleClose = function () {
        onClose && onClose();
        setAlertShow(false);
    };
    var AlertBody = function () {
        return (React.createElement("div", __assign({ className: classes }, restProps, { "data-testid": "test-alert" }),
            React.createElement("span", { className: messageClasses }, message),
            React.createElement("span", { className: "alert-description" }, description),
            closable
                ? (React.createElement("button", { className: "alert-close-icon", onClick: function () { return handleClose(); }, "data-testid": "alert-close-icon" },
                    React.createElement(Icon, { icon: "times", theme: "light", size: "lg" })))
                : null));
    };
    return (React.createElement(Transition, { timeout: 300, animation: "zoom-in-top", in: alertShow, wrapper: true },
        React.createElement(AlertBody, null)));
};
Alert.defaultProps = {
    alertType: 'default',
    closable: false
};
export default Alert;
