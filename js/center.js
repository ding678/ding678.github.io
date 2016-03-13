
// 全屏滚动
(function(){	
	var oCont=document.getElementById('js-contbox');
	var aBan=oCont.children;
	var aBtn=document.getElementById('js-nav').children;
	var iNow=0;
	var oH=0;
	oH=document.documentElement.clientHeight;
	addEvent(document,'resize',function(){
		oH=docuemnt.documentElement.clientHeight;
	});
	oCont.style.height=oH*aBan.length+'px';
	for(var i=0;i<aBan.length;i++){
		aBan[i].style.height=oH+'px';
	}
	for(var i=0;i<aBtn.length;i++){
		(function(index){
			addEvent(aBtn[i],'click',function(){
				iNow=index;
				fix(index);
			});
		})(i);
	}
	addEvent(document,'keydown',function(ev){
		var oEvent=ev || event;
		if(oEvent.keyCode==40){
			iNow++;
			if(iNow==aBtn.length){
				iNow=0;
			}
			fix(iNow);
		}
		if(oEvent.keyCode==38){
			iNow--;
			if(iNow==-1){
				iNow=aBtn.length-1;
			}
			fix(iNow);
		}
	});
	addWheel(document,function(down){
		if(down){
			iNow++;
			if(iNow==aBtn.length){
				iNow=0;
			}
			fix(iNow);

		}else{
			iNow--;
			if(iNow==-1){
				iNow=aBtn.length-1;
			}
			fix(iNow);
		}
	});
	function fix(iNow){
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].className='';
			aBan[i].className='page'+(i+1);
		}
		aBtn[iNow].className='current';
		aBan[iNow].className='current page'+(iNow+1);
		oCont.style.top=-iNow*aBan[0].offsetHeight+'px';
	}
})();
//漂浮广告
(function(){
	var oBox=document.getElementById('ball');
	var oClose=document.getElementById('js-close');
	var iSpeedX=1;
	var iSpeedY=2;
	var timer=setInterval(tick,30);
	oBox.onmouseover=function(){
		clearInterval(timer);
	};
	oBox.onmouseout=function(){
		timer=setInterval(tick,30);
	};
	addEvent(oClose,'click',function(){
		oBox.style.display='none';
	});
	function tick(){
		var l=oBox.offsetLeft+iSpeedX;
		var t=oBox.offsetTop+iSpeedY;
		if(t>=document.documentElement.clientHeight-oBox.offsetHeight){
			t=document.documentElement.clientHeight-oBox.offsetHeight;
			iSpeedY*=-1;
		}
		if(t<=0){
			t=0;
			iSpeedY*=-1;
		}
		if(l>=document.documentElement.clientWidth-oBox.offsetWidth){
			l=document.documentElement.clientWidth-oBox.offsetWidth;
			iSpeedX*=-1;
		}
		if(l<=0){
			l=0;
			iSpeedX*=-1;
		}
		oBox.style.left=l+'px';
		oBox.style.top=t+'px';
	}
})();


//第一屏
(function(){
	var oUser=document.getElementById('js-user');
	var aUser=oUser.children;
	var timer=null;
	var n=0;
	timer=setInterval(function(){
		aUser[n].className='';
		n++;
		if(n==aUser.length){
			clearInterval(timer);
		}
	},400);
})();

// 第二屏
(function(){
	var oBtn=document.getElementById('js-btn');
	var oSkil=document.getElementById('js-skil');
	var aSkil=oSkil.children;
	var zIndex=10;
	maxLeft=oSkil.offsetWidth-aSkil[0].offsetWidth;
	maxTop=document.documentElement.clientHeight-aSkil[0].offsetHeight;
	posi();
	addEvent(oBtn,'click',function(){
		posi();
	});
	function posi(){
		for(var i=0;i<aSkil.length;i++){
			aSkil[i].style.left=rnd(0,maxLeft)+'px';
			aSkil[i].style.top=rnd(0,maxTop)+'px';
			addEvent(aSkil[i],'mouseover',function(){
				this.style.zIndex=zIndex++;
			})
		}
	}	
})();

//第三屏
(function(){
	var oCase=document.getElementById('js-caselist');
	var aCase=oCase.children;
	var aPic=document.getElementById('js-spic').children;
	oCase.style.width=aCase[0].offsetWidth*aCase.length+'px';
	oCase.style.WebkitTransform='translate('+(-1*aCase[0].offsetWidth)+'px,0)';
	for(var i=0;i<aPic.length;i++){
		(function(index){
			addEvent(aPic[i],'mouseover',function(){
				for(var i=0;i<aPic.length;i++){
					aPic[i].className='';
				}
				this.className='active';
				oCase.style.WebkitTransform='translate('+(-index*aCase[0].offsetWidth)+'px,0)';
				oCase.style.MozTransform='translate('+(-index*aCase[0].offsetWidth)+'px,0)';
				oCase.style.MsTransform='translate('+(-index*aCase[0].offsetWidth)+'px,0)';
				oCase.style.OTransform='translate('+(-index*aCase[0].offsetWidth)+'px,0)';
			})
		})(i);
	}
	var aDiv=document.getElementById('bookshelf').children;
		var zIndex=1;
		var aPosi=[];
		for(var i=0;i<aDiv.length;i++){
			aPosi.push({
				top:aDiv[i].offsetTop,
				left:aDiv[i].offsetLeft
			});
		}
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].style.position='absolute';
			aDiv[i].style.left=aPosi[i].left+'px';
			aDiv[i].style.top=aPosi[i].top+'px';
			aDiv[i].style.margin=0;
		}
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].index=i;
			drag(aDiv[i]);
		}
		function drag(obj){
			obj.onmousedown=function(ev){
				var oNear=null;
				obj.style.zIndex=zIndex++;
				var oEvent=ev||event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				obj.onmousemove=function(ev){
					var oEvent=ev||event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					obj.style.left=left+'px';
					obj.style.top=top+'px';
					oNear=findNear(obj);
					if(oNear){
						for(var i=0;i<aDiv.length;i++){
							aDiv[i].className='';
						}
						oNear.className='active';
					}else{
						for(var i=0;i<aDiv.length;i++){
							aDiv[i].className='';
						}
					}
				};
				obj.onmouseup=function(){
					obj.onmousemove=obj.onmouseup=null;
					obj.releaseCapture&&obj.releaseCapture();
					for(var i=0;i<aDiv.length;i++){
						if(oNear){
							move(oNear,aPosi[obj.index],{easing:Tween.Quad.easeInOut})
							move(obj,aPosi[oNear.index],{easing:Tween.Quad.easeInOut})
							var tmp=oNear.index;
							oNear.index=obj.index;
							obj.index=tmp;
							for(var i=0;i<aDiv.length;i++){
								aDiv[i].className='';
							}
						}else{
							move(obj,aPosi[obj.index],{easing:Tween.Quad.easeInOut})
						}
					}
				}
				obj.setCapture&&obj.setCapture();
				return false;
			};
		}

		function findNear(obj){
			var aMin=9999999;
			var aMinIndex=-1;
			for(var i=0;i<aDiv.length;i++){
				if(obj!=aDiv[i]){
					if(cashTest(obj,aDiv[i])){
						var dis=getDis(obj,aDiv[i]);
						if(dis<aMin){
							aMin=dis;
							aMinIndex=i;
						}
					}
				}
			}
			if(aMinIndex==-1){
				return null;
			}else{
				return aDiv[aMinIndex];
			}
		}
		function cashTest(obj1,obj2){
			var l=obj1.offsetLeft;
			var r=l+obj1.offsetWidth;
			var t=obj1.offsetTop;
			var b=t+obj1.offsetHeight;

			var l2=obj2.offsetLeft;
			var r2=l2+obj2.offsetWidth;
			var t2=obj2.offsetTop;
			var b2=t2+obj2.offsetHeight;
			if(l>r2||t>b2||r<l2||b<t2){
				return false;
			}else{
				return true;
			}
		}
		function getDis(obj1,obj2){
			var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
			var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
			return Math.sqrt(a*a+b*b);
		}
})();
//第四屏
(function(){
	var l=document.getElementById('left');
	var r=document.getElementById('right');
	var aClass=[];
	var aLi=document.getElementById('js-effect').children;
	for(var i=0;i<aLi.length;i++){
		aClass[i]=aLi[i].className;
	}
	l.onclick=function(){
		aClass.unshift(aClass.pop())
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=aClass[i];
		}
	};
	r.onclick=function(){
		aClass.push(aClass.shift())
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=aClass[i];
		}
	}
})();

function getStyle(obj,sClass){
	return (obj.currentStyle || getComputedStyle(obj,false))[sClass];
}

function getPosi(obj){
	var left=0;
	var top=0;
	while(obj){
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:left,top:top}
}
function rnd(n,m){
	return Math.floor(Math.random()*m);
}

function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}

function addWheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',function(ev){
			if(ev.detail>0){
				fn(true);
			}else{
				fn(false);
			}
		},false);
	}else{
		obj.onmousewheel=function(){
			if(event.wheelDelta>0){
				fn(false);
			}else{
				fn(true);
			}
		}
	}
}














