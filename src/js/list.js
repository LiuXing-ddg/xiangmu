window.addEventListener("DOMContentLoaded", function() {
    //商品列表渲染
    //悬停出现大图
    // 2-1. 准备一个变量
    var flag = true
        // 2-2. 准备一个变量接收数组
    var list2 = []
        // 1. 请求数据
    getList()

    function getList() {
        $.ajax({
            url: '../lib/listinfo.json',
            dataType: 'json',
            success: function(res) {
                // console.log(res)
                // 一共 102 条数据, 数组.length
                // 一页显示多少条(假定一页显示 12 条), 一共 9 页

                // 2. 渲染分页器
                $('.pagi').pagination({
                    pageCount: Math.ceil(res.length / 20), // 总页数
                    current: 1, // 当前页
                    jump: true,
                    coping: true,
                    homePage: '首页', // 首页按钮的文本
                    endPage: '末页', // 末页按钮的文本
                    prevContent: '上页',
                    nextContent: '下页',
                    callback: function(api) { // 当你切换页面的时候会触发
                        // api.getCurrent() 获取当前是第几页
                        // console.log(api.getCurrent())
                        let curr = api.getCurrent()

                        // console.log(curr)
                        // 根据是第几页, 从我的总数组里面筛选出一部分数据
                        //   slice 方法包前不包后
                        var list = res.slice((curr - 1) * 20, curr * 20)
                            // console.log(list)
                            // slice 不改变原始数组, 只是从数组里面拿到一些内容
                            // splice 方法才是改变原始数组, 从原始数组里面删除

                        // 3-2. 每次使用分页器切换的时候渲染一次
                        bindHtml(list)
                    }
                })

                // 3. 先把第一页的数据渲染一次
                bindHtml(res.slice(0, 20))

                // 2-2. 给全局变量赋值
                list2 = res
            }
        })
    }

    function bindHtml(list) {
        // console.log(list)
        // 根据 list 数组渲染页面就可以了

        let str = ''

        list.forEach(item => {
            str += `<div class="good_item">
                    <div class="goodimg">
                        <a href=""><img src="${item.image}"></a>
                        <div class="handler">
                            <a href="javascript:;">加入收藏</a>
                        </div>
                    </div>
                    <div class="yc"></div>
                    <div class="goodinfo">
                        <a href="">
                            <span>${item.info}</span>
                        </a>
                        <div class="goods-info-detail">${item.num1}</div>
                        <div class="goods-info-detail">${item.num2}</div>
                    </div>
                    <div class="goodprice">
                        <div class="present-price">${item.price}</div>
                        <div class="login-out" data-login=""></div>
                        <div class="activity"></div>
                    </div>
                    <div class="goodstock">
                        <div class="lack-stock">
                           ${item.date}
                        </div>
                    </div>
                    <div class="goodbuy">
                        <div class="jian">-</div>
                        <input type="text" class="goodnum" value="1">
                        <div class="jia">+</div>
                        <a href="javascript:void 0;" class="goods-order">订阅</a>
                    </div>
                </div>`;
        })

        $('.goodlist2').html(str);
        mouseload();
    }
    // 2. 排序
    var btn = document.querySelector('.paixu2 .cao .ccc')
    btn.onclick = function() {
        // 让准备好的变量改变
        flag = !flag

        // 不管是什么都要把数组重组
        list2.sort(function(a, b) {
            if (flag === true) {
                return parseFloat(a.price) - parseFloat(b.price)
            } else {
                return parseFloat(b.price) - parseFloat(a.price)
            }
        })

        // console.log(list)

        $('.pagi').pagination({
            pageCount: Math.ceil(list2.length / 20), // 总页数
            current: 1, // 当前页
            jump: true,
            coping: true,
            homePage: '首页', // 首页按钮的文本
            endPage: '末页', // 末页按钮的文本
            prevContent: '上页',
            nextContent: '下页',
            callback: function(api) { // 当你切换页面的时候会触发
                let curr = api.getCurrent()
                    // console.log(curr)
                var list = list2.slice((curr - 1) * 20, curr * 20)
                    // 3-2. 每次使用分页器切换的时候渲染一次
                bindHtml(list)
            }
        })

        // 3. 先把第一页的数据渲染一次
        bindHtml(list2.slice(0, 20))
        return false;
    }
})

function mouseload() {
    $('.goodlist2 .good_item .goodimg').mouseenter(function() {

        console.log()
        $(this).next().css({
            display: 'block',
            backgroundImage: 'url(' + $(this).find('img').attr('src') + ')'
        });

    })
    $('.goodlist2 .good_item .goodimg').mouseleave(function() {
        $(this).next().css({
            display: 'none'
        });
    })
}