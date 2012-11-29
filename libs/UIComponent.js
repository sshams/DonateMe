/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */

puremvc.define(
{
    name: 'view.components.UIComponent',
    constructor: function(element){
        if(element) {
            this.element = element;
            this.id = this.element.id;
        }
        this.listenerMap = new Array();
    }
},
{
    listenerMap: null,
    element: null,
    id: null,
    
    setAlpha: function(value) {
        CSS.setAlpha(this.element, value);
    },
    
    getWidth: function() {
        return CSS.getWidth(this.element);
    },
    
    getHeight: function() {
        return CSS.getHeight(this.element);
    },
    
    getOffset: function() {
        return CSS.getOffset(this.element);
    },
    
    getLeft: function() {
        return CSS.getLeft(this.element);
    },
    
    setLeft: function(value) {
        CSS.setLeft(this.element, value);
    },
    
    getRight: function() {
        return CSS.getRight(this.element);
    },
    
    setRight: function(value) {
        CSS.setRight(this.element, value);
    },
    
    setTop: function(value) {
        CSS.setTop(this.element, value);
    },
    
    getTop: function() {
        return CSS.getTop(this.element);
    },
    
    getStyle: function(style) {
        CSS.getStyle(this.element, style);
    },
    
    toCamelCase: function(input) {
        return CSS.toCameCase(input);
    },
    
    addEventListener: function(type, listener) {
        if(!this.listenerMap[type]){
            this.listenerMap[type] = new Array();
        }
        
        for(var i=0; i<this.listenerMap[type].length; i++) {
            if(this.listenerMap[type][i] == listener){
                return;
            }
        }
        
        this.listenerMap[type].push(listener);
    },
    
    removeEventListener: function(type, listener) {
        if(!this.listenerMap[type]) {
            return;
        }
        
        for(var i=0; i<this.listenerMap[type].length; i++) {
            if(this.listenerMap[type][i] == listener){
                this.listenerMap[type].splice(i, 1);
            }
        }
    }, 
    
    dispatchEvent: function(event){
        if(typeof(event) == 'undefined' || typeof(event.type) == 'undefined') {
            return;
        }
        
        if(!this.listenerMap[event.type]){
            return;
        }
        
        for(var i=0; i<this.listenerMap[event.type].length; i++){
            var listener = this.listenerMap[event.type][i];
            
            if(typeof(event.target) == 'undefined') {
                event.target = this;
            }
            
            if(typeof(listener) == 'function') {
                listener.call(this, event);
            } else if(typeof(listener.handleEvent) != 'undefined') {
                listener.handleEvent.call(listener, event);
            }
        }
    },    
    
    addEventHandler: function(element, event, method, useCapture) { //component level for elements
        if(element.addEventListener) {
            event = event.replace('on', '');
            element.addEventListener(event, method, useCapture == true ? true : false);
        } else if(element.attachEvent){
            element.attachEvent('on'  + event, method);
        }
    },
    
    hasClass: function(className) {
        return CSS.hasClass(this.element, className);
    },
    
    addClass: function(className) {
        CSS.addClass(this.element, className);
    },
    
    removeClass: function(className) {
        CSS.removeClass(this.element, className);
    },
    
    toggleClass: function(className) {
        CSS.toggleClass(this.element, className);
    },
    
    show: function() {
        CSS.show(this.element);
    },
    
    hide: function() {
        CSS.hide(this.element);
    },
    
    append: function(element) {
        this.element.appendChild(element);
    },
    
    prepend: function(element) {
        this.element.insertBefore(element);
    }
}
);

puremvc.define(
{
    name: 'CSS'
},
{
},
{
    hasClass: function(element, className) {
        return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    },
    
    removeClass: function(element, className) {
        if(CSS.hasClass(element, className)) {
            element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '');
	}
    },
    
    addClass: function(element, className) {
        if(!CSS.hasClass(element, className)) {
            element.className += element.className ? " " + className : className;
        }
    },
    
    toggleClass: function(element, className) {
        if(CSS.hasClass(element, className)) {
            CSS.removeClass(element, className);
        } else {
            CSS.addClass(element, className);
        }
    },
    
    hide: function(element) {
        CSS.addClass(element, "hidden");
    },
    
    show: function(element) {
        CSS.removeClass(element, "hidden");
    },
    
    getStyle: function(element, style) {
        if(!document.getElementById) return null;
        
        var value = element.style[CSS.toCamelCase(style)];
        if(!value) {
            if(document.defaultView) {
                value = document.defaultView.getComputedStyle(element, "").getPropertyValue(style);
            } else if(element.currentStyle) {
                value = element.currentStyle[CSS.toCamelCase(style)];
            }
        }
        return value;
    },
    
    toCamelCase: function(input) {
        var oStringList = input.split('-');
        if(oStringList.length == 1)  
            return oStringList[0];
        
        var ret = input.indexOf("-") == 0 ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1) : oStringList[0];
        for(var i = 1, len = oStringList.length; i < len; i++){
            var s = oStringList[i];
            ret += s.charAt(0).toUpperCase() + s.substring(1)
        }
        return ret;
    },
    
    getOffset: function(element) {
        var _x = 0;
        var _y = 0;
        while(element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
            _x += element.offsetLeft - element.scrollLeft;
            _y += element.offsetTop - element.scrollTop;
            element = element.offsetParent;
        }
        return {top:_y, left:_x};
    },
    
    setLeft: function(element, value) {
        element.style.left = value + "px";
    },
    
    getLeft: function(element) {
        return CSS.getOffset(element).left;
    },
    
    setTop: function(element, value) {
        element.style.top = value + "px";
    },

    getTop: function(element) {
        return CSS.getOffset(element).top;
    },
    
    setRight: function(element, value) {
        //element.style.left = value - CSS.getWidth(element) + "px";
        //element.style.left += value - (element.style.left - element.style.width);
    },
    
    getRight: function(element) {
        return CSS.getLeft(element) + CSS.getWidth(element);
    },
    
    getWidth: function(element) {
        return parseInt(CSS.getStyle(element, "width"));
    },
    
    getHeight: function(element) {
        return parseInt(CSS.getStyle(element, "height"));
    },
    
    setAlpha: function(element, value) {
        element.style.filter = 'alpha(opacity=' + value + ')';
        element.style.opacity = value;
    }
}
);

puremvc.define(
{
    name: 'view.components.Event',
    
    constructor: function(type, target, body){
        this.type = type;
        this.target = target;
        this.body = body;
    }
}, 
{
    type: null,
    target: null,
    body: null
},
{
    adapt: function(event) {
        //if(!event || !event.srcElement) print(event, true);
        
        if(event.srcElement) { //IE
            event.target = event.srcElement;
            
            if(event.clientX || event.clientY) {
                event.pageX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
            }
        }
        
        if(event.target.nodeType && event.target.nodeType == 3) { //safari bug
            event.target = event.target.parentNode;
        }
        
    }  
}
);

puremvc.define(
{
    name: 'Delegate'
},
{
},
{
    create: function(target, method) {
        var args = new Array();

        for(var i=2; i<arguments.length; i++) {
            args.push(arguments[i]);
        }
        
        return function(){
            var args2 = new Array();
            
            for(var i=0; i<arguments.length; i++) {
                args2.push(arguments[i]);
            }
            
            return method.apply(target, args2.concat(args));
        }
    }
}
);

puremvc.define(
{
    name: 'events'
},
{
},
{
    MouseEvent: {CLICK: "click", MOUSE_OVER: "mouseover", MOUSE_OUT: "mouseout", MOUSE_DOWN: "mousedown", MOUSE_UP: "mouseup", MOUSE_MOVE: "mousemove"},
    KeyboardEvent : {KEY_DOWN:"keydown", KEY_UP:"keyup", KEY_PRESS:"keypress"},
    TouchEvent: {TOUCH_START: "touchstart", TOUCH_MOVE: "touchmove", TOUCH_END: "touchend", TOUCH_CANCEL: "touchcancel"},
    Window: {RESIZE: "resize"}
}
);

puremvc.define(
{
    name: 'Validation'
},
{
    email: function(string) {
        var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return string.match(pattern);
    }
},
{
    
}
);

puremvc.define(
{
    name: "Browser"
},
{
},
{
    isiPad: function() {
        //var isiPad = navigator.userAgent.match(/iPad/i) != null;
        var ua = navigator.userAgent;
        return /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
    }    
}
);

puremvc.define(
{
    name: "Window"
},
{
},
{
    getSize: function() {
        var myWidth = 0, myHeight = 0;
        if(typeof(window.innerWidth) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if(document.body && (document.body.clientWidth || document.body.clientHeight) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
            return {width: myWidth, height: myHeight};
    },
    
    getWidth: function() {
        return Window.getSize().width;
    },
    
    getHeight: function() {
        return Window.getSize().height;
    },
   
    getScrollXY: function () {
        var scrOfX = 0, scrOfY = 0;
        if(typeof( window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [scrOfX, scrOfY];
    }
    
});

Function.prototype.later = function(ms) {
    // from http://la.ma.la/blog/diary_200507302354.htm
    var self = this;
    var func = function(){
        var arg = func.arguments;
        var apply_to = this;
        var later_func = function(){
            self.apply(apply_to, arg)
        };
        setTimeout(later_func,ms);
    };
    return func;
}

Number.prototype.pad = function(size){
      if(typeof(size) !== "number"){size = 2;}
      var s = String(this);
      while (s.length < size) s = "0" + s;
      return s;
}

function trace() {
    try {
        if(window && window.console && window.console.log) {
            var message = "";
            for(var i=0; i<arguments.length; i++) {
                message += arguments[i] + ((i == arguments.length - 1) ? "" : ", ");
            }
            window.console.log(message);
        }
    } catch(exception) {
        window.console = {}; 
        console.log = function(message){};
        console.log(exception);
    }
}

function print(object, showAlert) {
    var str = "";
    for(var property in object) {
        str += property + " " + object[property] + "\n";
    }
    trace(str);
    if(showAlert) alert(str);
}
