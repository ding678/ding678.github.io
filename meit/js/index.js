// JavaScript Document
window.onload=function(){

// 顶部导航
	var topBar=document.getElementById('topbar');
	var aBar=topBar.getElementsByTagName('li');
	for(var i=2;i<aBar.length;i++){
		if(aBar[i].children[1]){
			aBar[i].onmouseover=function(){
				this.className='active';
				
			};
			aBar[i].onmouseout=function(){
				this.className='';
			};
		}
	}
// 顶部广告
	var closeBtn=document.getElementById('closebtn');
	var adv=document.getElementById('adv');
	closeBtn.onclick=function(){
		adv.style.display='none';
	};

// 搜索框
	var oBox=document.getElementById('sel_tit');
	var aSpan=oBox.getElementsByTagName('span');
	var otxt=aSpan[0].innerHTML;
	oBox.onmouseover=function(){
		this.className='active sel_tit';
		for(var i=0;i<aSpan.length;i++){
			aSpan[i].onmouseover=function(){
				this.style.background='#ccc';
			};
			aSpan[i].onmouseout=function(){
				this.style.background='#fff';
			};
			aSpan[i].onclick=function(){
				aSpan[0].innerHTML=this.innerHTML;
				this.innerHTML=otxt;
				oBox.className='sel_tit';
			};
		}
	};
	oBox.onmouseout=function(){
		this.className='sel_tit';
	};
// 侧边导航
	var sideBar=document.getElementById('sidebar');
	var aBar=sideBar.getElementsByTagName('li');
	for(var i=0;i<aBar.length;i++){
		if(aBar[i].children[1]){
			aBar[i].onmouseover=function(){
				this.className='active';
				
			};
			aBar[i].onmouseout=function(){
				this.className='';
			};
		}
	}

// 小焦点图
(function(){
	var oBanBox=document.getElementById('s_ban');
	var oPre=document.getElementById('auto_l');	
	var oNext=document.getElementById('auto_r');	
	var aBtn=document.getElementById('point').getElementsByTagName('i');
	var aDiv=oBanBox.getElementsByTagName('div');
	var n=0;
		for(var i=0;i<aBtn.length;i++){
			(function(index){
				aBtn[i].onclick=function(){
					n=index;
					tick();
				};
			})(i);
		}
		oPre.onclick=function(){
			n--;
			if(n==-1){
				n=aBtn.length-1;
			}
			tick();
		};
		oNext.onclick=function(){
			autoPlay();
		};
		window.timer=setInterval(autoPlay,500);
		
		oBanBox.onmouseover=function(){
			oBanBox.className='active s_ban';
			clearInterval(timer);
		};
		oBanBox.onmouseout=function(){
			oBanBox.className='s_ban';
			timer=setInterval(autoPlay,500);
		};
		function tick(){
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className='';
				aDiv[i].className='';
			}
			aBtn[n].className='active';
			aDiv[n].className='active';
		}
		function autoPlay(){
			n++;
			if(n==aBtn.length){
				n=0;
			}
			tick();
		}
})();


	// 大焦点图
	var banBox=document.getElementById('ban_box');
	name(banBox);
	var saleBox=document.getElementById('sale_box');
	name(saleBox);
    function  name(obj){
		var aBan=obj.getElementsByTagName('li');
		var oL=obj.getElementsByClassName('auto_l')[0];
		var oR=obj.getElementsByClassName('auto_r')[0];
		var oPage=obj.getElementsByClassName('page')[0];
		var now=0;
		oL.onclick=function(){
			now--;
			if(now==-1){
				now=aBan.length-1;
			}
			for(var i=0;i<aBan.length;i++){
				aBan[i].className='';
			}
			aBan[now].className='active';
			oPage.innerHTML=now+1+'/6';
		};
		oR.onclick=function(){
			now++;
			if(now==aBan.length){
				now=0;
			}
			for(var i=0;i<aBan.length;i++){
				aBan[i].className='';
			}
			aBan[now].className='active';
			oPage.innerHTML=now+1+'/6';
		};
		banBox.onmouseover=function(){
			this.className='active ban_box';
		};
	banBox.onmouseout=function(){
			this.className='ban_box';
		};
	}

// 名店抢购倒计时
(function(){
	var  countdown=document.getElementById('countdown');
	var  aI=countdown.getElementsByTagName('i');
	time();
	setInterval(time,1000)
	function time(){
		var oDate=new Date();
			oDate.setFullYear(2015,10,11);
			oDate.setHours(0,0,0,0);
			var oNow=new Date();
		var total=parseInt((oDate.getTime()-oNow.getTime())/1000);
		var h=Math.floor(total/3600);

		total%=3600;
		var m=Math.floor(total/60);
		total%=60;
		var s=total;
		var str=toDou(h)+toDou(m)+toDou(s);
		for(i=0;i<aI.length;i++){
			aI[i].innerHTML=str.charAt(i);
		}
		function toDou(a){
			return a<10?'0'+a:''+a;
		}

	}
})();









}

