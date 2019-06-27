$(function(){
//头部隐藏显示
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
//注册的正则验证
let input = document.querySelectorAll("input");
let regName = /^[a-z0-9_-]{4,20}$/gi;
let regPassword = /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,20}$/;
let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
$(".con_1").click(function(){
		$(".flag_1").show();
});
$(".con_1").change(function(){
	if(input[0].value === ""){
		alert("用户名不能为空")
	}else if(!regName.test(input[0].value)){//正则验证不通过，格式不正确
        		alert("请输入正确的用户名,用户名应为4-20位字符");
        		return false;
    }else{
    	alert("格式正确")
    	return true;
    }
});
$(".con_2").click(function(){
	$(".flag_2").show();
});
$(".con_2").change(function(){
	if(input[1].value === ""){
		alert("密码不能为空")
	}else if(!regPassword.test(input[1].value)){//正则验证不通过，格式不正确
        		alert("请输入正确密码格式");
        		return false;
    }else{
    	alert("格式正确")
    	return true;
    }
});
$(".con_3").click(function(){
		$(".flag_3").show();
});
$(".con_2").change(function(){
	if(input[2].value === ""){
		alert("邮箱不能为空")
	}else if(!regEmail.test(input[2].value)){//正则验证不通过，格式不正确
        alert("请输入正确输入邮箱格式");
        return false;
    }else{
    	alert("格式正确")
    	return true;
    }
});
//重名验证
$(".con_1").blur(function(){
	$.get("http://47.104.244.134:8080/username.do",{username:$(this).value}).done(data=>{
					console.log(data);
			})
});
$(".con_3").blur(function(){
	$.get("http://47.104.244.134:8080/useremail.do",{username:$(this).value}).done(data=>{
					console.log(data);
				})
})
//传到服务器	
$(".btn").click(function(){
	$.post("http://47.104.244.134:8080/usersave.do",{
				username:input[0].value,
				password:input[1].value,
				email:input[2].value,
				sex:input[3].value
			}).done(data=>{
				console.log(data);
			})
	})
	
})
