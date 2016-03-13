window.onload=function(){
	//顶部导航吸顶
	var oTopNav=document.getElementById('js-topnav');
	var left=getPosi(oTopNav).left;
	var top=getPosi(oTopNav).top;
	addEvent(window,'scroll',function(){
		var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollTop>=2){
			oTopNav.style.position='fixed';
			oTopNav.style.left=left+'px';
			oTopNav.style.top=top+'px';
			oTopNav.style.zIndex=100;
		}else{
			oTopNav.style.position='static';
		}
	});
	//焦点图
	var aPage=document.getElementById('js-btn').children;
	var aBan=document.getElementById('js-box').children;
	var iNow=0;
	for(var i=0;i<aPage.length;i++){
		(function(index){
			addEvent(aPage[i],'click',function(){
				iNow=index;
				for(var i=0;i<aPage.length;i++){
					aPage[i].className='';
					aBan[i].className='';
				}
				aPage[i].className='act';
				aBan[index].className='act';
			})
		})(i);
	}
	setInterval(function(){
		iNow++;
		if(iNow==aPage.length){
			iNow=0;
		}
		for(var i=0;i<aPage.length;i++){
			aPage[i].className='';
			aBan[i].className='';
		}
		aPage[iNow].className='act';
		aBan[iNow].className='act';
	},4000);


	//隐藏及显示
	(function(){
		var oTag=document.getElementById('js-tag');
		var oL=document.getElementById('js-left');
		var oR=document.getElementById('js-right');
		var oPic=oTag.children[0];
		var maxW=Math.abs(oTag.offsetWidth-oPic.offsetWidth);
		addEvent(oR,'click',function(){
			move(oPic,{left:-maxW},{duration:300});
			oR.style.display='none';
			oL.style.display='block';
		})
		addEvent(oL,'click',function(){
			move(oPic,{left:0},{duration:300});
			oR.style.display='block';
			oL.style.display='none';
		})
	})();
	//热播排行切换
	(function(){
		var aTit=document.getElementById('js-hottit').children;
		var aRange=document.getElementById('js-hotrange').children;
		for(var i=0;i<aTit.length;i++){
			(function(index){
				addEvent(aTit[i],'mouseover',function(){
					for(var i=0;i<aTit.length;i++){
						aTit[i].className='';
						aRange[i].className='';
					}
					this.className='act';
					aRange[index].className='act';
				})
			})(i);
		}
	})();
	//播放按钮显示
	(function(){
		var aShow=document.getElementById('js-showlist').children;
		for(var i=0;i<aShow.length;i++){
			(function(index){
				var aPic=aShow[index].children[0]
				addEvent(aPic,'mouseover',function(){
					var oIcon=aPic.children[1];
					oIcon.style.display='block';
				})
				addEvent(aPic,'mouseout',function(){
					var oIcon=aPic.children[1];
					oIcon.style.display='none';
				})
			})(i);
		}
	})();
	//搜索框
	(function(){
		var oT=document.getElementById('js-txt');
		var oList=document.getElementById('js-slist');
		var aLi=oList.children;
		addEvent(oT,'focus',function(){
			this.style.borderColor='#2887db';
			oList.style.display='block';
		});
		addEvent(oT,'blur',function(){
			this.style.borderColor='#a0a0a0';
			oList.style.display='none';
		});
		for(var i=0;i<aLi.length;i++){
			addEvent(aLi[i],'mouseover',function(){
				this.style.background='#ccc';
			});
			addEvent(aLi[i],'mouseout',function(){
				this.style.background='#fff';
			});
		}
	})();
	//导航
	(function(){
		var aNav=document.getElementById('js-nav').children;
		for(var i=0;i<aNav.length;i++){
			(function(index){
				addEvent(aNav[i],'click',function(){
					for(var i=0;i<aNav.length;i++){
						aNav[i].className='';
					}
					this.className='act';
				})
			})(i);
		}
	})();
	//频道
	(function(){
		var oIcon=document.getElementById('js-icon');
		var chaList=oIcon.children[1];
		addEvent(oIcon,'mouseover',function(){
			chaList.style.display='block';
		});
		addEvent(oIcon,'mouseout',function(){
			chaList.style.display='none';
		});
	})();



}
//事件绑定
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
//事件解除
function removeEvent(obj,sEv,fnName){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fnName,false);
	}else{
		obj.detachEvent('on'+sEv,fnName);
	}
}
//获取offset距离
function getPosi(obj){
	var left=0;
	var top=0;
	while(obj){
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:left,top:top};
}
//move
function move(obj,json,options){
	var options=options||{};
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var count=Math.floor((options.duration||1000)/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			var cur=start[name]+dis[name]*n/count;
			if(name=='opacity'){
				obj.style[name]=cur;	
			}else{
				obj.style[name]=cur+'px';	
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();
		}	
	},30);
	function getStyle(obj,sName){
		return (obj.currentStyle||getComputedStyle(obj,false))[sName];
	}
}