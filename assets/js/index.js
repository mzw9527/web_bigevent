// 入口函数
$(function(){
    // 调用获取用户信息函数
    Getuserinfo()


    // 实现退出功能
    $('#btnout').on('click',function(){
        // console.log('ok');
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //清除当前页面的token值
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href='/login.html'
            layer.close(index);
          });
    })



    // 
})
var layer = layui.layer;
// 获取用户数据
function Getuserinfo(){
    // 发起ajax请求
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            // console.log(res);
            if(res.status!=0)return layer.msg('获取失败')
            // layer.msg('获取成功')
            // 获取数据成功后调用渲染头像的函数
            renderAvater(res.data)
        },
        // 无论成功与否都能触发点的回调函数complete是jq内置方法
        // 通过res.responseJSON拿到服务器响应回来的数据===ntework里xhr里面的response一样
        // 控制用户的访问有权限接口部分  可以在预请求模块里全局配置这个权限回调函数
        // complete:function(res){
        //     console.log('无论成功与否都能触发点的回调函数');
        //     // console.log(res);
        //     console.log(res.responseJSON);
        //     if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
        //         console.log(123);
        //         // 清除token值
        //         localStorage.removeItem('token')
        //         // 返回首页
        //         location.href='/login.html'
        //     } 
        // }
    })
}
// 渲染用户头像
function renderAvater(data){
    // 获取用户的名称
    var name= data.nickname||data.username;
    // 按需显示用户名
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 按需渲染用户的头像
    if(data.user_pic !==null){
        $('.layui-nav-img').attr('src',data.user_pic).show();
        $('.text_avater').hide();
    }else{
        // console.log(123);
        $('.layui-nav-img').hide();
        // 渲染文本头像
        var first=name[0].toUpperCase();
        $('.text_avater').html(first).show();
    }
}