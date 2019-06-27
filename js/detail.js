$(function(){
	//全部类目
	var lid = getCookie("lid")
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
var id = location.search.split("=")[1];
$.get("http://47.104.244.134:8080/goodsbyid.do",{id:id}).done(data=>{
	//console.log(data);
	var str="";
	var arr="";
	var car="";
	str=`<div class="art-t-l">
		 	<div class="minimg">
		 		<img src="${data.picurl}" />
		 		<div class="zoom"></div>
		 	</div>
		 	<div class="maximg">
		 		<img src="${data.picurl}" />
			</div>
			<ul>
				<li class="smalimg"><img src="${data.picurl}" /></li>
			</ul>
		</div>`;
	arr=`<span>自营</span>
	     ${data.name}`;
	car=`<input type="button" data-id="${data.id}"  id="cars" value="加入购物车" />`;
	$(".art-t p").after(str);
	$(".mh").html(arr);
	$(".gwc span").after(car);
	$(".smalimg img").on('mouseover',function(){
					var srcm=$(this).attr("src")
					$(".minimg img").attr({src:srcm});
				})
	$(".minimg").mousemove(function(e){
		$(".maximg img").attr({src:$(this).attr("src")}).parent().css({"display":"block"});
		var m=$(".zoom").innerWidth();
		var n=$(".zoom").innerHeight();
	    var x=e.pageX-m/2;
		var y=e.pageY-n/2;
		var maxWidth=$(this).innerWidth()-$(".zoom").innerWidth()+75;
		var maxHeigth=$(this).innerHeight()-$(".zoom").innerHeight()+250;
		x = x <= 75?75:x>=maxWidth?maxWidth:x;
		y = y <= 250 ? 250 : y >= maxHeigth ? maxHeigth : y;
		$(".zoom").css({"display":"block"}).offset({top:y,left:x});
		//console.log(x)
		var a=$(this).width();
		var b=$(this).height();
		var c=$(".maximg img").width();
		var d=$(".maximg img").height();
		var X=x/a*c;
		var Y=y/b*d-500;
//		console.log(x,y,X,Y,a,c)
		$(".maximg img").css({top:-Y,left:-X})
	})
	$(".minimg,.smalimg").mouseleave(function(){
					$(".maximg").css({"display":"none"});
					$(".zoom").css({"display":"none"});
				})
	
	//购物车事件
	$("#cars").click(function(){
	var gid = $("#cars").attr("data-id");
	$.get("http://47.104.244.134:8080/cartsave.do",{gid:gid,token:lid}).done(data=>{
		//console.log(data);
		alert("添加成功");
		window.location.href="shopping cart.html";
	})
});
	
	
	
	
	
	
	
	
});
$.get("http://47.104.244.134:8080/goodsbytid.do", {tid: 13,page: 1,limit: 6}).done(data => {
    console.log(data);
	data=data.data
    let str = "";
	for(var i = 1; i < data.length; i++) {
		str +=`<li>
      <a href="detail.html?id=${data[i].id}">
        <div data-id = "" class="single_top"><img src="${ data[i].picurl}" alt="" /></div>
        <div class="single_bottom">
          <p>${data[i].name}</p>
          <div class="s_num">
            <span class="s_num_unit">￥</span
            ><span class="s_num_act">${data[i].price}</span>
          </div>
           <a data-id=${data[i].gid} href="detail.html?id=${data[i].id}"><input type="button" id="btn" value="查看详情" /></a>
        </div>
      </a>
    </li>`;
	}
	$(".list").html(str);
});
  //添加购物车
  $("#btn1").click(function(){
  	var num = $("#btn3").val();
  	num--;
  	var nums = $("#btn3").val(num)
  	if(nums<=1){
  		$("#btn3").val(1);
  	}
  });
  $("#btn2").click(function(){
  	var num = $("#btn3").val();
  	num++;
  	var nums = $("#btn3").val(num)
  });
  

})
