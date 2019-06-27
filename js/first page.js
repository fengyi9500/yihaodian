$(function(){
//	//登录显示
//	$.post("http://47.104.244.134:8080/userlogin.do",{name:input[0].value,password:input[1].value}).done(data=>{
//						console.log(data);
//						if(data.code==0){
//						alert("登陆成功");
//						
//						window.location.href = "http://localhost:8080/index.html?name=str1";
//						}else{
//							alert("用户名不存在");
//						}
//		})
//列表
$.get("http://47.104.244.134:8080/goodstypelist.do",{l:1}).done(function(data){
						for(let i = 0;i<data.length;i++){
							$(".list1 li").eq(i).append(data[i].name);
						}
					});
					$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2}).done(data=>{
						
							$(".hd-sou-xq").on("mouseenter",function(){
								$(".list2").show()});
							$(".hd-sou-xq").on("mouseleave",function(){
								$(".list2").hide()});
							$(".list1 li").on("mouseenter",function(){
								var a = $(this).index();
								$(".list2 li").eq(0).html(data[a].name);
							})
					});

//全部类目

$(".leimu").mouseenter(function(){
	$(".hd-sou-xq").show();
})
$(".hd-sou-xq").mouseleave(function(e){
	e.stopPropagation()
	$(this).hide()
})




//轮播
$(document).ready(function(){
	$(".box_img li").eq(0).show();
	$(".box_tab a").eq(0).addClass("active");
	$(".box_tab a").mouseover(function(){
		$(this).addClass("active").siblings().removeClass("actve");
		var index = $(this).index();
		$(".box_img ul li").eq(inddex).stop().fadeIn(300).siblings().stop().fadeOut(300);
	})
	var count = 0;
	var time = setInterval(move,2000);
	function move(){
		count++;
		if(count == $(".box_img li").length){
			count = 0;
		}
		$(".box_tab a").eq(count).addClass("active").siblings().removeClass("active");
		$(".box_img li").eq(count).fadeIn(300).siblings().fadeOut(300);
		$("box").hover(function(){
			clearInterval(time);
		},function(){
			time = setInterval(move,2000);
		})
	}
})

  $.get("http://47.104.244.134:8080/goodsbytid.do", {tid: 13,page: 1,limit: 11}).done(data => {
    //console.log(data);
	data=data.data
    let str = "";
	for(var i = 1; i < data.length; i++) {
		str +=`<li>
      <a href="listing.html?id=${data[i].id}">
        <div data-id = "" class="single_top"><img src="${ data[i].picurl}" alt="" /></div>
        <div class="single_bottom">
          <p>${data[i].name}</p>
          <div class="s_bar">
            <div class="s_progress" style="width:70% "></div>
          </div>
          <div class="s_num">
            <span class="s_num_unit">￥</span
            ><span class="s_num_act">${data[i].price}</span>
          </div>
        </div>
      </a>
    </li>`;
	}
	$(".list").html(str);
  });
})
