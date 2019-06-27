$(function(){
	//全部类目
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
	$(".leimu").mouseenter(function(){
	$(".hd-sou-xq").show();
})
$(".hd-sou-xq").mouseleave(function(e){
	e.stopPropagation()
	$(this).hide()
})
//请求数据

$.get("http://47.104.244.134:8080/goodsbytid.do", {tid: 13,page: 1,limit:16}).done(data => {
    //console.log(data);
	data=data.data
    var arr = "";
    var num = Math.ceil(60/15);//一共多少页
	for(var i=0;i<=num;i++){
		arr+=`<li>${i+1}</li>`;
	}
	$(".bom2").after(arr);
	move(1,15);//默认显示首页
	$(".bom li").eq(0).addClass("active");//为按钮添加分页事件
	var count = 0;
	$(".bom li").click(function(){
		$(this).eq(count).addClass("active").siblings().removeClass("active");
		count = $(this).index();
		move(count+1,15);
	})
	//上一页事件
	$("bom2").click(function(e){
		e.preventDefault();
		count--;
		if(count>=0){
			move(count-1,15);
			$(".bom li").eq(count).addClass("active").siblings().removeClass("active");
		}else{
			count=0;
		}
	});
	//下一页事件
	$("bom3").click(function(e){
		e.preventDefault();
		count++;
		if(count<num){
			move(count+1,15);
			$(".bom li").eq(count).addClass("active").siblings().removeClass("active");
		}else{
			count=num;
		}
		//首页事件
		$(".bom1").click(function(){
			$(".bom li").eq(0).addClass("active").siblings().removeClass("active");
		})
		//尾页事件
		$(".bom4").click(function(){
			$(".bom li").eq(count).addClass("active").siblings().removeClass("active");
		})
	});
});
  function move(page,limit){
  	$.get("http://47.104.244.134:8080/goodsbytid.do", {tid: 13,page:page,limit:limit}).done(data => {
	   console.log(data);
		data=data.data
	    let str = "";
		for(var i = 1; i < data.length; i++) {
			str +=`<li>
	      <a href="detail.html?id=${data[i].id}">
	        <div data-id = "" class="single_top"><img src="${ data[i].picurl}" alt="" /></div>
	        <div class="single_bottom">
	        	<div class="s_num">
	            	<span class="s_num_unit">￥</span
	            	><span class="s_num_act">${data[i].price}</span>
	          	</div>
	          <p>${data[i].name}</p>
	          <a href="detail.html?id=${data[i].id}"><input type="button" id="btn1" value="查看详情" /></a><br/>
			  <a href="shopping cart.html?id=${data[i].id}"><input type="button" id="btn2" value="加入购物车"/></a>
	        </div>
	      </a>
	    </li>`;
		}
		$(".list").html(str);
	  });
  }
  
})
