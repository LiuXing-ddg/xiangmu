window.onload = function() {
    var nameInp = document.querySelector('.username')
    var passInp = document.querySelector('.password')
        // 1. 绑定事件
    var tijiao = document.getElementById('registerSubmit')
    tijiao.onclick = function(e) {
        e = e || window.event
        e.preventDefault()
            // 2. 获取表单内容
        var uname = nameInp.value;
        var upass = passInp.value;
        // 3. 非空验证
        if (!uname || !upass) {
            alert('请完整填写表单')
            return
        }
        //// 4. 发送请求
        $.post('http://127.0.0.1:8090/gph/register.php', `username=${uname}&password=${upass}`, res => {
            var result = JSON.parse(res)
            if (result.code === 0) {
                alert("注册失败")
            } else {
                // 登录成功
                alert("注册成功");
                window.location.href = '../pages/login.html'
            }
        })
    }
}