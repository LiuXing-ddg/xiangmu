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
            imgBigs.src = `../images/${this.tempIndex+11}.jpg`;
            bigImg.src = `../images/${this.tempIndex+11}.jpg`;
        }
    }
})