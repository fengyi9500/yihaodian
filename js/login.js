$(function(){
	//头部隐藏
	$(".wrap").hover(function(){
		$(".list").css({
			display:"block"
		});
	},
	function(){
		$(".list").css({
			display:"none"
		});
	}
	)
	//自动登录
	$(".check_btn").click(function(){
		if($(this).prop("checked")){
			$(".clear-s").show();
		}else{
			$(".clear-s").hide();
		}
	})
	let logname = document.querySelector("#username");
	let logpass = document.querySelector("#password");
	//登录登录
	$("#btn").click(function(){
		var usr = $("#username").val();
		var pwd = $("#password").val();
		$.post("http://47.104.244.134:8080/userlogin.do",
		{name:usr,password:pwd},function(data){
			//console.log(data)
			if(data.code==1){
				alert("用户名或密码错误，请重新输入")
			}else{
					window.location.href="index.html";
					setCookie("lid",data.data.token,20)
					setCookie("tid",usr,20)
				}
			
		})
	})
	
})
