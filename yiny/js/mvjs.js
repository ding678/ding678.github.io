// JavaScript Document

window.onload=function(){
	var oTit=document.getElementById('mv_list');
	var aLi=oTit.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onmouseover=function(){	
				for(var i=0;i<aLi.length;i++){
					aLi[i].className='last'+i;
				}
			this.className='act last'+[this.index];
			}
		}
		//二级菜单 
	var aNav=document.getElementById('js-nav').children;
	for(var i=0;i<aNav.length;i++){
		var _this=aNav[i].children[1];
		if(_this){
			addEvent(aNav[i],'mouseover',function(){
				var aList=this.children[1];
				var height=aList.children.length*aList.children[0].offsetHeight;
				move(aList,{height:height},{duration:500});
			});
			addEvent(aNav[i],'mouseout',function(){
				var aList=this.children[1];
				move(aList,{height:0},{duration:100})
			});	
		}
	}
	//排序方式 
	var aTit=document.getElementById('js-list').children;
	for(var i=1;i<aTit.length;i++){
		addEvent(aTit[i],'mouseover',function(){
			for(var i=1;i<aTit.length;i++){
				aTit[i].className='';
			}
			this.className='acting';
		})
	}

}

function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn)
	}
}

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

function getByClass(obj,sName){
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(sName);
	}else{
		var arr=[];
		var allChild=document.getElementsByTagName('*');	 
		for(var i=0;i<allChild.length;i++){
			var obj=allChild[i];
			var str=obj.className
			var arrName=str.split(' ');
		
			for(var j=0;j<arrName.length;j++){
				if(arrName[j]==sName){
					arr.push(obj);
				}
			}	
		}
		return arr;	
	}	
}
