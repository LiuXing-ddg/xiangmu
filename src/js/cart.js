window.onload = function() {
    //1.获取数据
    const cartList = this.JSON.parse(localStorage.getItem('cartList') || '[]');
    //2.判断有没有数据
    if (!cartList) {
        this.alert("你的购物车为空,快去选购吧!")
    } else {
        //渲染页面
        bindHtml();
        bindEvent();
    }

    function bindHtml() {
        const cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
        //全选按钮渲染
        // let selectAll = cartList.every(item => {
        //     return item.isSelect === true;
        // })
        let str = `
        <table class="m-shopcart-list">
                    <thead>
                        <tr>
                            <th class="select"><input type="checkbox"></th>
                            <th class="goods">商品信息</th>
                            <th class="price">单价</th>
                            <th class="count">数量</th>
                            <th class="total">金额</th>
                            <th class="handle">操作</th>
                        </tr>
                    </thead>
                    <tbody>
        <tr class="shopcart-division">
            <td colspan="6"></td>
        </tr>
        <tr class="shopcart-title">
            <td colspan="6">
                <label>
                        <input type="checkbox" class="All"> 工品汇
                </label>
            </td>
        </tr>`
        cartList.forEach(item => {
            str += `<tr class="shopcart-goods">
            <td>
                <input type="checkbox" class="dan" data-id="${item.id}">
            </td>
            <td>
                <div class="m-goods-item">
                    <a href="" class="pic">
                        <img src="${item.image}">
                    </a>
                    <div class="info">
                        <p class="title"><a href="">${item.info}</a></p>
                        <p>品牌：威特仕</p>
                        <p>${item.num2}</p>
                        <p>${item.num1}</p>
                    </div>
                </div>
            </td>
            <td>
                <p><strong class="g-highlight">￥${item.price}</strong></p>
            </td>
            <td>
                <div class="m-count-handle g-clearfix">
                    <a href="javascript:void 0;" class="btn minus" data-id="${item.id}">-</a>
                    <input type="text" class="input" value=${item.num}>
                    <a href="javascript:void 0;" class="btn plus" data-id="${item.id}">+</a>
                </div>
            </td>
            <td><strong class="g-highlight je">￥${parseFloat(item.xiaoji).toFixed(2)}元</strong></td>
            <td>
                <a href="javascript:void 0;" class="del" data-id="${item.id}">删除</a>
            </td>
        </tr>`
        });
        str += `</tbody>
        </table>`
            // let selectArr = cartList.filter(item => item.isSelect)
            // console.log(selectArr)

        // // 选中商品数量计算

        // // 选中商品总价
        // let selectPrice = 0
        // selectArr.forEach(item => {

        //     selectPrice += parseFloat(item.xiaoji)
        // });
        str += ` <div class="m-shopcart-balance">
        <div class="balance-handle">
            <a href="list.html" class="tobuy">返回继续购物</a>
            <a href="javascript:void 0;" class="shanchu">清空购物车</a>
            <a href="javascript:void 0;">分享商品清单</a>
        </div>
        <div class="balance-money">
            <p>总金额（不含运费）：<strong class="g-highlight zong">￥</strong></p>
            <p>
                <a href="javascript:void 0;" class="btn-submit">结算</a>
            </p>
        </div>
    </div>`
        $('.cartbox2').html(str)
    }

    function bindEvent() {
        //减少商品数量btn minus  btn plus
        $('.cartbox2').on('click', '.minus', function() {
                // console.log(this);
                const id = $(this).data('id')
                    //循环数组 打对应的num和小计修改
                cartList.forEach(item => {
                    if (item.id === id) {
                        // 当 item.number === 1 的时候, 不需要 --
                        item.num > 1 ? item.num-- : ''
                        item.xiaoji = parseFloat(item.price) * item.num
                    }
                })
                bindHtml();
                localStorage.setItem('cartList', JSON.stringify(cartList));
                location.reload();
            })
            //添加商品数量btn minus  btn plus
        $('.cartbox2').on('click', '.plus', function() {
                // console.log(this);
                const id = $(this).data('id')
                    //循环数组 打对应的num和小计修改
                cartList.forEach(item => {
                    if (item.id === id) {
                        // 当 item.number === 1 的时候, 不需要 --
                        item.num++;
                        item.xiaoji = parseFloat(item.price) * item.num
                    }
                })
                bindHtml();
                localStorage.setItem('cartList', JSON.stringify(cartList));
                location.reload();
            })
            //全选
        $(".All").click(function() {
            //        console.log(this);
            if (this.checked == true) {
                $(".dan").prop("checked", true);
            } else {
                $(".dan").prop("checked", false);
            }
            allPrice();
        });


        //单选
        $(".dan").click(function() {
            var check = $(".dan").length;
            var checked = $(".dan:checked").length;
            if (check == checked) {
                $(".All").prop("checked", true);
            } else {
                $(".All").prop("checked", false);
            }
            allPrice();
        });

        function allPrice() {
            var sum = 0;
            $(".dan").each(function() {
                if (this.checked == true) {
                    var a = $($(this).parent().parent().find('.je')).html().slice(1, -1); //单类商品数量
                    //                console.log($($(this).parent().next().next().next().next().next().children().children()[0]).html());
                    // console.log(a);
                    sum = (sum - 0) + (a - 0);
                }

            });
            $(".zong").html("￥" + sum + "元");

        }
        $('.cartbox2').on('click', '.del', function() {
            // console.log(this);
            const id = $(this).data('id')
                //循环数组 打对应的num和小计修改
            cartList.forEach(item => {
                if (item.id === id) {
                    //把数组清空
                    localStorage.removeItem(item);
                }
            })
            bindHtml();
            localStorage.setItem('cartList', JSON.stringify(cartList));
        })
        $('.cartbox2').on('click', '.shanchu', function() {
            localStorage.removeItem('cartList')
            bindHtml();
        })
    }
}