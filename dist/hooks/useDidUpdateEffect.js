import { useEffect, useRef } from 'react';
// 不在初次渲染后执行 effect 回调函数的 effect hook.
var useDidUpdateEffect = function (effect, deps) {
    var didMounted = useRef(false);
    useEffect(function () {
        if (didMounted.current) {
            effect();
        }
        else {
            didMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};
export default useDidUpdateEffect;
