import { useEffect } from 'react';
var useClickOutside = function (ref, handler) {
    // 使用 useEffect, 每次都会清除上次的事件回调（见 return ），减少了内存消耗。
    useEffect(function () {
        var listener = function (event) {
            var targetNode = event.target;
            if (!ref.current || ref.current.contains(targetNode)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
};
export default useClickOutside;
