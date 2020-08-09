var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Transition from '../Transition/transition';
import Tag from '../Tag/tag';
import useClickOutside from '../../hooks/useClickOutside';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';
export var Select = function (props) {
    var children = props.children, placeholder = props.placeholder, isOpen = props.isOpen, defaultValue = props.defaultValue, disabled = props.disabled, multiple = props.multiple, onChange = props.onChange, onDropdownVisibleChange = props.onDropdownVisibleChange;
    var _a = useState(isOpen), optionOpen = _a[0], setOptionOpen = _a[1];
    var _b = useState({ value: '', optionText: '', }), selectedData = _b[0], setSelectedData = _b[1];
    var _c = useState([]), multipleSelectedList = _c[0], setMultipleSelectedList = _c[1];
    var multipleSearchRef = useRef(null);
    var _d = useState(''), multipleSearchValue = _d[0], setMultipleSearchValue = _d[1];
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () {
        setOptionOpen(false);
    });
    var toggleOptionOpen = function () {
        setOptionOpen(!optionOpen);
    };
    useEffect(function () {
        if (multiple && optionOpen && multipleSearchRef.current) {
            multipleSearchRef.current.focus();
        }
    }, [optionOpen, multiple]);
    useDidUpdateEffect(function () {
        var isOpen = optionOpen;
        onDropdownVisibleChange && onDropdownVisibleChange(isOpen);
    }, [optionOpen]);
    useEffect(function () {
        React.Children.forEach(children, function (child) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            var _a = childElement.props, value = _a.value, children = _a.children;
            if (displayName === 'Option' && value === defaultValue) {
                var optionText = children;
                setSelectedData({
                    value: value,
                    optionText: optionText,
                });
            }
            else {
                return;
            }
        });
    }, [children, defaultValue]);
    var handleSelect = function (value, optionText) {
        var selected = {
            value: value,
            optionText: optionText,
        };
        if (multiple) {
            var newSelectedList = multipleSelectedList;
            if (!!multipleSelectedList.find(function (item) { return item.value === value; })) {
                newSelectedList = multipleSelectedList.filter(function (item) { return item.value !== value; });
            }
            else {
                newSelectedList = __spreadArrays(multipleSelectedList, [selected]);
            }
            setMultipleSelectedList(newSelectedList);
            if (optionOpen && multipleSearchRef.current) {
                multipleSearchRef.current.focus();
            }
            setMultipleSearchValue('');
            onChange && onChange(newSelectedList.map(function (item) { return item.value; }));
        }
        else if (value !== selectedData.value) {
            setSelectedData(selected);
            onChange && onChange(value);
            setOptionOpen(false);
        }
    };
    var renderDropdown = function () {
        var optionList = React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'Option') {
                var childText = childElement.props.children.toString();
                if (multiple && !childText.includes(multipleSearchValue)) {
                    return null;
                }
                var selected = multiple && !!multipleSelectedList.find(function (item) { return item.value === childElement.props.value; });
                return React.cloneElement(childElement, {
                    onSelect: handleSelect,
                    selected: selected,
                });
            }
            else {
                console.error('Warning: Select has a child which is not a Option component');
                return null;
            }
        });
        return optionList;
    };
    var handleMultipleInputChange = function (e) {
        var value = e.target.value;
        setMultipleSearchValue(value);
    };
    var handleMultipleSearchKeyDown = function (e) {
        if (e.key === 'Backspace' && !multipleSearchValue && multipleSelectedList.length > 0) {
            var lastSelected = multipleSelectedList[multipleSelectedList.length - 1];
            var optionText = lastSelected.optionText, value = lastSelected.value;
            handleSelect(value, optionText);
        }
    };
    var handleTagClose = function (e, value, optionText) {
        e.stopPropagation();
        handleSelect(value, optionText);
    };
    var classes = classNames('knight-select', {
        'is-option-open': optionOpen,
        'is-disabled': disabled,
    });
    return (React.createElement("div", { className: classes, ref: componentRef },
        React.createElement("div", { className: "knight-select-input", onClick: toggleOptionOpen }, multiple
            ? (React.createElement("div", { className: "knight-multiple-selector" },
                multipleSelectedList.map(function (_a) {
                    var value = _a.value, optionText = _a.optionText;
                    return (React.createElement(Tag, { key: value, closable: true, onClose: function (e) { handleTagClose(e, value, optionText); } }, optionText));
                }),
                React.createElement("div", { className: "knight-multiple-search", style: {
                        width: multipleSearchValue ? multipleSearchValue.length * 1.5 + "rem" : "5px"
                    } },
                    React.createElement("input", { onChange: function (e) { handleMultipleInputChange(e); }, type: "text", ref: multipleSearchRef, value: multipleSearchValue, onKeyDown: handleMultipleSearchKeyDown }))))
            : (React.createElement(Input, { placeholder: placeholder, icon: "angle-down", onClick: toggleOptionOpen, value: selectedData.optionText, disabled: disabled, readOnly: true }))),
        React.createElement(Transition, { in: optionOpen, animation: "zoom-in-top", timeout: 300 },
            React.createElement("ul", { className: "knight-option-list" }, renderDropdown()))));
};
Select.defaultProps = {
    isOpen: false
};
export default Select;
