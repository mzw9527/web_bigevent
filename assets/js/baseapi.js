//注册一个典型使用$.ajaxPrefilter()的预过滤器
// 每次调用ajax请求之前会先调用这个函数,在这个函数中科院拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
	console.log(options.url);
	// console.log(options.data);
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
	// 统一为有权限接口，设置请求头headers
	if(options.url.indexOf('/my/')!==-1){
		options.headers={
			Authorization:localStorage.getItem('token')||''
		}
	}
	// 全局配置complete回调函数
	// 控制用户的访问有权限接口部分  可以在预请求模块里全局配置这个权限回调函数
	options.complete=function(res){
		console.log('无论成功与否都能触发点的回调函数');
		// console.log(res);
		console.log(res.responseJSON);
		if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
			console.log(123);
			// 清除token值
			localStorage.removeItem('token')
			// 返回首页
			location.href='/login.html'
		} 
	}
});
