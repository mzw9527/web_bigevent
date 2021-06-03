// 入口函数
$(function () {
	// 点击“去注册”显示注册隐藏登陆
	$('#to_register').on('click', function () {
		$('.loginbox').hide();
		$('.registerbox').show();
	});
	// 点击“去登陆”显示登陆页面隐藏注册页面
	$('#to_login').on('click', function () {
		$('.registerbox').hide();
		$('.loginbox').show();
	});

	// 从layui获取form对象
	var form = layui.form;
	var layer = layui.layer;
	//通过form.verify({})进行自定义验证规则
	form.verify({
		pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
		// 再次输入密码框的校验规则
		repwd: function (value) {
			// 通过形参拿到的是确认密码框的内容
			// 还需要拿到密码框的内容
			// 然后进行一次等于的判断
			// 如果判读失败，则return一个提示消息
			var pwd = $('.registerbox [name="password"]').val();
			if (pwd !== value) {
				// console.log('123');
				return '两次密码不一致';
			}
		},
	});
	//调用接口发起注册用户的请求
	$('.registerbox').on('submit', function (e) {
		e.preventDefault();
		// 优化代码，把参数对象赋值变量
		var data = { username: $('.registerbox [name=username]').val(), password: $('.registerbox [name=password]').val() };
		$.post('/api/reguser', data, function (res) {
			// console.log(res);
			if (res.status !== 0) {
				return layer.msg(res.message);
			}
			layer.msg(res.message);
			// 注册成功后，跳转到登陆界面
			$('#to_login').click();
		});
	});
	// 调用接口发起登陆请求
	$('.loginbox').on('submit', function (e) {
		e.preventDefault();
		var data = $('#form_login').serialize();
		$.post('/api/login', data, function (res) {
			if (res.status !== 0) {
				return layer.msg(res.message);
			}
			layer.msg(res.message);
			// console.log(res.token);
			// 将登陆成功的得到的token字符串，保存到本地中
			localStorage.setItem('token', res.token);
			// 跳转后台主页
			location.href = 'index.html';
		});
	});
});
