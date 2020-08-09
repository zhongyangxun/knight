import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
export var Tag = function (props) {
    var closable = props.closable, onClose = props.onClose, children = props.children;
    var _a = useState(true), tagShow = _a[0], setTagShow = _a[1];
    var handleClose = function (event) {
        setTagShow(false);
        onClose && onClose(event);
    };
    var classes = classNames('knight-tag', 'default', {
        'is-closable': closable
    });
    return (tagShow
        ? (React.createElement("span", { className: classes },
            children,
            closable && (React.createElement("div", { className: "icon-wrapper", onClick: handleClose },
                React.createElement(Icon, { icon: "times", size: "sm", theme: "dark" })))))
        : null);
};
export default Tag;
