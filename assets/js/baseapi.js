//注册一个典型使用$.ajaxPrefilter()的预过滤器
// 每次调用ajax请求之前会先调用这个函数,在这个函数中科院拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
	console.log(options.url);
	// console.log(options.data);
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
});
