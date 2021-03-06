window.onload = function() {
    var nameInp = document.querySelector('.username')
    var passInp = document.querySelector('.password')
    var errorInfo = document.getElementById('showError');
    // 1. 绑定事件
    var tijiao = document.getElementById('submitBtn')
    tijiao.onclick = function(e) {
        e = e || window.event
        e.preventDefault()

        // 2. 获取表单内容
        var uname = nameInp.value;
        var upass = passInp.value;
        console.log(uname);
        // 3. 非空验证
        if (!uname || !upass) {
            alert('请完整填写表单')
            return
        }
        //// 4. 发送请求
        $.post('http://127.0.0.1:8090/gph/login.php', `username=${uname}&password=${upass}`, res => {
            var result = JSON.parse(res)

            if (result.code === 0) {
                errorInfo.style.display = 'block';
                errorInfo.innerHTML = "登录失败!用户名或密码错误"
            } else {
                // 登录成功
                alert("登录成功");
                setCookie('login', uname, 10000000)
                window.location.href = '../pages/index.html'
            }
        })
    }
}