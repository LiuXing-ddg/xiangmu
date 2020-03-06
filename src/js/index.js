window.addEventListener("DOMContentLoaded", function() {
    // $('.dapai2 .top .left .title').click(function() {
    //         $(this).addClass('active').siblings().removeClass('active');
    //         $('.dapai2 .content .content2').removeClass('active2').eq($(this).index()).addClass('active2')
    //     })
    /*轮播图*/
    var i = 0;
    var timer;
    //用jquery方法设置第一张图片显示，其余隐藏
    $('#container .item').eq(0).show().siblings('#container .item').hide();
    //调用showTime()函数（轮播函数）
    showTime();
    //当鼠标经过下面的数字时，触发两个事件（鼠标悬停和鼠标离开）
    $('.tab').hover(function() {
        //获取当前i的值，并显示，同时还要清除定时器
        i = $(this).index();
        Show();
        clearInterval(timer);
    }, function() {
        //
        showTime();
    });
    //鼠标点击左侧的箭头
    $('.prev').click(function() {
        clearInterval(timer);
        if (i == 0) {
            i = 3; //注意此时i的值
        }
        i--;
        Show();
        showTime();
    });
    //鼠标点击右侧的箭头
    $('.next').click(function() {
        clearInterval(timer);
        if (i == 2) {
            i = -1; //注意此时i的值
        }
        i++;
        Show();
        showTime();
    });
    //创建一个showTime函数
    function showTime() {
        //定时器
        timer = setInterval(function() {
            //调用一个Show()函数
            Show();
            i++
            //当图片是最后一张的后面时，设置图片为第一张
            if (i == 3) {
                i = 0;
            }
        }, 2000);
    }
    //创建一个Show函数
    function Show() {
        //在这里可以用其他jquery的动画
        $('#container .item').eq(i).fadeIn(300).siblings('#container .item').fadeOut(300);
        //给.tab创建一个新的Class为其添加一个新的样式，并且要在css代码中设置该样式
        $('.tab').eq(i).addClass('active').siblings('.tab').removeClass('active');
    }
    //疫情防护 翻页效果
    var jj = document.querySelector('.jiaojuan');
    var spans = document.querySelectorAll('.fanghu2 .content .left .left2 .two .top a .wo');
    spans.forEach((el, index) => {
            el.onclick = function() {
                for (var i = 0; i < spans.length; i++) {
                    spans[i].className = "";
                }
                this.className = "active";
                animate(jj, {
                    left: -index * 361 + "px"
                })
                return false;
            }
        })
        //关闭广告
    $('.box .ad .cha span').click(function() {
            $(this).parent().parent().css('display', 'none');
            return false;
        })
        //json 品牌列表
    getList();

    function getList() {
        $.ajax({
            url: '../lib/pinpai.json',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                let str = '';
                res.forEach(item => {
                    str += `<span class="title">${item.name}</span>`
                })
                $('.dapai2 .top .left').html(str);
                $('.dapai2 .top .left .title').first().addClass('active');
                $('.dapai2 .top .left .title').click(function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    $('.dapai2 .content .content2').removeClass('active2').eq($(this).index()).addClass('active2')
                });
            }
        })
    }
    //列表图片
    lbtp();

    function lbtp() {
        $.ajax({
            url: '../lib/pinpai.json',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                let str = '';
                res.forEach(item => {
                    str += ` <div class="content2">`;
                    item.list.forEach(temp => {
                        str += `<a href=""> `
                        str += `<img src="${temp.image}" alt="">`
                        str += ` </a>`;
                    })
                    str += `</div>`;
                })
                $('.dapai2 .content').html(str);
                $('.dapai2 .content .content2').first().addClass('active2');
            }
        })
    }

    //爆款特惠
    baokuan();

    function baokuan() {
        $.ajax({
            url: '../lib/imgbox.json',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                let arr = '';
                res.forEach(item => {
                    arr += ` <div class="hot_goods">
                    <span class="remark">${item.remake}</span>
                    <a href="" class="goodimg"><img src="${item.image}" alt=""></a>
                    <a href="" class="goodName">${item.goodname}</a>
                    <p class="hot-price">${item.price}</p>
                    <a href="" class="go-btns">${item.go}</a>
                </div>`
                })
                $('.baokuan2 .content').html(arr);

            }
        })
    }
    //热销推荐
    rexiao();

    function rexiao() {
        $.ajax({
            url: '../lib/rexiao.json',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                let arr2 = '';
                res.forEach(item => {
                    arr2 += `
                    <a href=""><img src="${item.img}" alt=""></a>
               `
                })
                $('.recommend2 .content').html(arr2);

            }
        })
    }
    //胶卷
    jiaojuan();

    function jiaojuan() {
        $.ajax({
            url: '../lib/jiaojuan.json',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                let str = '';
                res.forEach(item => {
                    str += ` <div class="tab_content">`;
                    item.list.forEach(temp => {

                        str += `<a href=""> `
                        str += `<div class="pic"><img src="${temp.img}"></div> `
                        str += `<div class="info"> `
                        str += ` <p class="name">${temp.name}</p> `
                        str += ` <p class="price">${temp.price}</p> `
                        str += ` </div> `
                        str += ` </a>`;
                    })
                    str += `</div>`;
                })
                $('.jiaojuan').html(str);
            }
        })
    }
})
window.onload = function() {
    if (getCookie("login") == "" || document.cookie.length == 0) {

    } else {
        $('.lunbo2 .handler').css({
            display: 'none'
        })
        $('.lunbo2 .hy').removeClass("hy").addClass("haha").html(getCookie('login'))
    }
}