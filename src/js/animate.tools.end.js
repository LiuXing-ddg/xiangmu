function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    }
    return obj.currentStyle[attr];
}

function animate(oEle, json, fn) {
    clearInterval(oEle.timer);
    oEle.timer = setInterval(() => {
        let flag = true;
        for (const attr in json) {
            let current = 0;
            let target = 0;
            if (attr == "opacity") {
                //当前位置
                current = parseFloat(getStyle(oEle, attr)) * 100;
                //目标值
                target = parseFloat(json[attr]) * 100;
            } else {
                //当前位置
                current = parseInt(getStyle(oEle, attr));
                //目标值
                target = parseInt(json[attr]);
            }
            //步长
            let step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //新的位置=当前位置+步长
            if (attr == "opacity") {
                oEle.style[attr] = (current + step) / 100;
            } else if (attr == "zIndex") {
                oEle.style[attr] = target;
            } else {
                oEle.style[attr] = current + step + 'px';
            }

            if (target != current) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(oEle.timer);
            //动画走完了
            if (typeof(fn) == "function") {
                fn();
            }
        }
    }, 30)

}