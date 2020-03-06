window.addEventListener("DOMContentLoaded", function() {
    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr]
        }
        return obj.currentStyle[attr]
    }
    //公式: 小图 / 大图 = 小区域 / 大区域
    //      只能修改小区域大小
    //      小区域 = ( 小图 / 大图 ) * 大区域
    //      比例 = 大区域 / 小区域
    var imgSmalls = document.querySelectorAll(".goodinfo2 li"); //选择列表
    var middleImg = document.getElementById("middleImg"); //商品展示的盒子
    var imgBigs = document.getElementById("middleImg").children[0]; //商品的盒子里的图片
    var middleArea = document.querySelector("#middleArea"); //鼠标区域
    var bigImg = document.querySelector("#bigImg"); //放大图片
    var bigArea = document.querySelector("#bigArea"); //装放大图片的盒子
    var oBox = document.querySelector(".goodinfo .one");
    var oBBB = document.querySelector(".goodinfo2");
    middleArea.style.width = (parseFloat(getStyle(middleImg, "width")) /
            parseFloat(getStyle(bigImg, "width"))) *
        parseFloat(getStyle(bigArea, "width")) + "px";
    middleArea.style.height = (parseFloat(getStyle(middleImg, "height")) /
            parseFloat(getStyle(bigImg, "height"))) *
        parseFloat(getStyle(bigArea, "height")) + "px";


    //渲染
    const info = JSON.parse(localStorage.getItem('goodsInfo'));
    //判断数据是否存在
    if (!info) {
        alert("你要查看的数据不存在")
        window.location.href = './list.html';
    }
    bindHtml();

    function bindHtml() {
        $('.namename').html(info.info);
        $('#middleImg img').attr('src', info.image);
        $('.product-title').html(info.info);
        $('.price-current span').html(info.price);
        $('.m-top20 .hh').html(info.num1.substring(4));
        $('.m-top20 .xh').html(info.num2.substring(5));
        $('.m-top20 .hq').html(info.date.substring(4));
        $('#small ul').find('.yi img').attr('src', info.image);
        $('#bigImg').attr('src', info.image);

    }
    //比例
    var oScale = parseFloat(getStyle(bigArea, "width")) / parseFloat(getStyle(middleArea, "width"));
    //鼠标进入
    middleImg.addEventListener("mouseenter", function() {
            middleArea.style.display = "block";
            bigArea.style.display = "block";
            //鼠标移动
            document.onmousemove = function(evt) {
                var e = evt || window.event;
                var disX = e.pageX - oBBB.offsetLeft - middleArea.offsetWidth / 2;
                var disY = e.pageY - oBBB.offsetTop - middleArea.offsetHeight / 2;
                if (disX <= 0) {
                    disX = 0;
                }
                if (disX >= middleImg.offsetWidth - middleArea.offsetWidth) {
                    disX = middleImg.offsetWidth - middleArea.offsetWidth
                }
                if (disY <= 0) {
                    disY = 0;
                }
                if (disY >= middleImg.offsetHeight - middleArea.offsetHeight) {
                    disY = middleImg.offsetHeight - middleArea.offsetHeight
                }
                middleArea.style.left = disX + "px";
                middleArea.style.top = disY + "px";
                bigImg.style.left = -oScale * disX + "px"
                bigImg.style.top = -oScale * disY + "px"
            }
        })
        //鼠标离开
    middleImg.addEventListener("mouseleave", function() {
        middleArea.style.display = "none";
        bigArea.style.display = "none";
        document.onmousemove = null;
    })
    for (var i = 0; i < imgSmalls.length; i++) {
        imgSmalls[i].tempIndex = i;
        imgSmalls[i].onclick = function() {
            for (var j = 0; j < imgSmalls.length; j++) {
                imgSmalls[j].className = "";
            }
            this.className = "Liclass";
            imgBigs.src = $(this).find('img').attr("src");
            bigImg.src = info.image;
        }
    }
    //加入购物车
    $('.addCart').click(() => {
        //判断是否登录
        if (getCookie("login") == "" || document.cookie.length == 0) {
            alert("请登录");
            window.location.href = './login.html';
        } else {
            alert("加入购物车成功")
                //加入购物车数组
            const cartList = JSON.parse(localStorage.getItem('cartList')) || []
                //判断里面是几条相同的数据(同一个商品点2尺购物车)
            let exits = cartList.some(item => {
                return item.id === info.id;
            })
            if (exits) {
                let data = null;
                for (let i = 0; i < cartList.length; i++) {
                    if (cartList[i].id === info.id) {
                        data = cartList[i];
                        break;
                    }
                }
                data.num++;
                //小计也改变
                data.xiaoji = data.num * parseFloat(data.price);
            } else {
                info.num = 1;
                info.xiaoji = parseFloat(info.price);;
                // info.isSelect = false;
                cartList.push(info)
            }
            //把本条数据加进去
            // cartList.push(info);
            localStorage.setItem('cartList', JSON.stringify(cartList))
            console.log(cartList);
        }

    })
})