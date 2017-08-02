!function(name){
    var ns = name.bestime = {};
    ns.getByClass=function(className,father){ 
		if(father){
			father=typeof father=="string"?document.getElementById(father):father;
		}else{
			father=document.body;
		}
	    var tagName = tagName || "*";
		if(document.getElementsByClassName) {                  
			return father.getElementsByClassName(className);
		}else{
			var tag = father.getElementsByTagName(tagName);  
			var tagAll = []; 
			for(var i=0;i<tag.length;i++){
				for (var j=0,n=tag[i].className.split(' ');j<n.length;j++){
					if(n[j]==className){
						tagAll.push(tag[i]);
						break;
					}
				}
			}
			return tagAll;
		}
	};
    //windows
	ns.winFun = function(obj,type,fn){
		if(obj.attachEvent){
			obj.attachEvent('on'+type,function(){
				fn.call(obj);
			})
		}else{
			obj.addEventListener(type,fn,false);
		}
	};
    //是否含有class
    ns.hasClass = function(obj,cl){
        return obj.className.match(new RegExp('(\\s|^)' + cl + '(\\s|$)'));  
    };
    //移除class
    ns.removeClass = function(obj,cl) {  
        if (ns.hasClass(obj,cl)){  
            var reg = new RegExp('(\\s|^)' + cl);  
            obj.className = obj.className.replace(reg,''); 
            obj.className = obj.className.replace(/^\s/,''); 
        }  
    }; 
    //添加class
    ns.addClass = function(obj, cl) {  
        var a = obj.className!=''?' ':'';
        if (!this.hasClass(obj, cl)) obj.className +=a+cl;         
    };
    ns.whellDir = function(fn){
        var whellDir = ['up','down'];
        var whellTimes = [0,0];
        var whellFlag = 0;
        var isIe = navigator.userAgent.toLowerCase().indexOf("msie")>-1;
        if(isIe) var ieUA = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1];
        var scrollFunc = function (e) {  
            e = e || window.event; 
            if(isIe){   
                if(parseInt(ieUA)>8){
                    whellToTwo();
                }else{
                    if(e.wheelDelta>0){
                        fn(whellDir[0],++whellTimes[0]);  
                    }  
                    if(e.wheelDelta<0){
                        fn(whellDir[1],++whellTimes[1]); 
                    } 
                }
            }else if(e.wheelDelta){                              
                whellToTwo();
            }
            function whellToTwo(){
                whellFlag++;
                if(whellFlag==1){
                    if(e.wheelDelta>0){
                        fn(whellDir[0],++whellTimes[0]);  
                    }  
                    if(e.wheelDelta<0){
                        fn(whellDir[1],++whellTimes[1]); 
                    } 
                }else{
                    whellFlag=0;
                }
            }   
            if(e.detail){        
                if(e.detail>0){ 
                    fn(whellDir[1],++whellTimes[1]);  
                }  
                if (e.detail<0){ 
                    fn(whellDir[0],++whellTimes[0]);  
                } 
            }      
        };
        if(document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);  
        }  
        window.onmousewheel = scrollFunc;
        document.onmousewheel = scrollFunc 
    };
    ns.getStyle=function getStyle(elem,styleName) {
        if(elem.style[styleName]){
            return elem.style[styleName];
        }else if(elem.currentStyle){
            return elem.currentStyle[styleName];
        }else if(document.defaultView && document.defaultView.getComputedStyle){
            styleName = styleName.replace(/([A-Z])/g,'-$1').toLowerCase();
            var s = document.defaultView.getComputedStyle(elem,'');
            return s&&s.getPropertyValue(styleName);
        }else{
            return null;
        }
    }; 
}(window);

