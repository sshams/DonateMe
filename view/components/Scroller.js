/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: "view.components.Scroller",
    parent: view.components.UIComponent,
    
    constructor: function() {
        view.components.UIComponent.call(this, document.getElementById("scroller"));
        
        if(!Browser.isiPad()) {
            this.addEventHandler(document.getElementById("scroller"), events.MouseEvent.MOUSE_OVER, Delegate.create(this, this.mouseOverHandler));
            this.addEventHandler(document.getElementById("scroller"), events.MouseEvent.MOUSE_OUT, Delegate.create(this, this.mouseOutHandler));
        } else {
            $('#left').removeClass("hidden");
            $('#right').removeClass("hidden");
            
            this.addEventHandler(document.getElementById("left"), events.TouchEvent.TOUCH_START, Delegate.create(this, this.left_touchStartHandler));
            this.addEventHandler(document.getElementById("right"), events.TouchEvent.TOUCH_START, Delegate.create(this, this.right_touchStartHandler));
        }
        
        this.total = $("#pics img").size();
    }
},
{
    intervalID: null,
    total: null,
    onLeft: 0,
    isScrollable: true,
    pageX: null,
    event: null,
    
    left_touchStartHandler: function(event) {
        if(parseInt($("#pics").css("left")) != 0) {
            $("#pics").animate({left: '+=240'}, 500);
        }
    },
    
    right_touchStartHandler: function(event) {
        var left = (ApplicationFacade.totalPics - 5) * 240;
        
        if(Math.abs(parseInt($("#pics").css("left"))) <= left) {
            $("#pics").animate({left: '-=240'}, 500, Delegate.create(this, this.right_animateCompleteHandler));
        }
    },
    
    right_animateCompleteHandler: function() {
        var current = Math.floor(Math.abs(parseInt($("#pics").css("left"))) / 240);
        if(current > this.onLeft) {
            this.dispatchEvent(new view.components.Event(this.constructor.ADD, null, current));
        }
    },

    mouseOverHandler: function(event) {
        view.components.Event.adapt(event);
        this.event = event;
        
        this.intervalID = window.setInterval(Delegate.create(this, this.scrollPics), 10);
    },
    
    mouseOutHandler: function(event) {
        window.clearInterval(this.intervalID);
    },
    
    setScroll: function(scroll) {
        this.isScrollable = scroll;
    },
    
    scrollPics: function() {
        var event = this.event;
        if(!this.isScrollable) return;
        
        var direction = ($(window).width()/2 - event.pageX)/175;
        var x = parseInt($("#pics").css("left"));
        
        if(direction > 0 && x >= 0){
            direction = 0;
            $("#pics").css("left", 0);
        } else if(direction < 0 && x < $("#scroller").width() - $("#pics").width()) {
            direction = 0;
        } else {
            $("#pics").css("left", x + direction);
            
            var current = Math.floor(Math.abs(parseInt($("#pics").css("left"))) / 240);
            if(current > this.onLeft) {
                this.dispatchEvent(new view.components.Event(this.constructor.ADD, event.target, current));
            }
        }
    }
}, 
{
    ADD: "add"
}
);