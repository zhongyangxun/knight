import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
var Option = function (props) {
    var children = props.children, onSelect = props.onSelect, value = props.value, disabled = props.disabled, selected = props.selected;
    var handleClick = function () {
        if (onSelect) {
            var optionText = children;
            var selectedValue = value || optionText;
            onSelect(selectedValue, optionText);
        }
    };
    var classes = classNames('knight-option-item', {
        'is-disabled': disabled,
        'is-selected': selected,
    });
    return (React.createElement("li", { className: classes, onClick: handleClick },
        children,
        selected && React.createElement(Icon, { icon: "check" })));
};
Option.displayName = 'Option';
export default Option;
