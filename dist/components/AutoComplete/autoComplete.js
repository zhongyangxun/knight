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
import React, { useState, useEffect, useRef, } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
/**
 * 输入自动完成组件，支持自定义下拉选项，以及异步请求下拉选项，切支持键盘操作
 *
 * ## 引入方式
 * ~~~javascript
 * import { AutoComplete } from 'knight'
 * ~~~
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var deboucedValue = useDebounce(inputValue);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () {
        setShowDropdown(false);
        setLoading(false);
    });
    useEffect(function () {
        if (deboucedValue && triggerSearch.current) {
            var results = fetchSuggestions(deboucedValue);
            if (results instanceof Promise) {
                setLoading(true);
                setSuggestions([]);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deboucedValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        triggerSearch.current = false;
        onSelect && onSelect(item);
    };
    var handleKeyDown = function (e) {
        var highlight = function (index) {
            if (index < 0) {
                index = 0;
            }
            else if (index >= suggestions.length) {
                index = suggestions.length - 1;
            }
            setHighlightIndex(index);
        };
        switch (e.key) {
            case 'ArrowDown':
                highlight(highlightIndex + 1);
                break;
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            default:
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, timeout: 300, animation: "zoom-in-top", onExited: function () { setSuggestions([]); } },
            React.createElement("ul", { className: "knight-suggestion-list" },
                loading && React.createElement(Icon, { icon: "spinner", spin: true, className: "knight-suggestion-loading" }),
                suggestions.map(function (item, index) {
                    var itemClasses = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { key: index, onClick: function () { handleSelect(item); }, className: itemClasses }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "knight-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
