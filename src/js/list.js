window.addEventListener("DOMContentLoaded", function() {
    //商品列表渲染
    listshow();

    function listshow() {
        $.ajax({
            url: '../lib/listinfo.json',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                let str = '';
                res.forEach(item => {
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
            }
        })
    }
})
window.onload = function() {
    //悬停出现大图
    $('.goodlist2 .good_item .goodimg').mouseenter(function() {
        var src = $(this).first().children().attr("src")
        $(this).next().css({
            display: 'block',
            // background-image: 'url(src)'
        });

    })
    $('.goodlist2 .good_item .goodimg').mouseleave(function() {
        $(this).next().css('display', 'none');

    })
}