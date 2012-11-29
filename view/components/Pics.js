/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: "view.components.Pics",
    parent: view.components.UIComponent,
    
    constructor: function() {
        view.components.UIComponent.call(this, document.getElementById("pics"));
        this.currentTotal = this.total;
    }
},
{
    total: 10,
    currentTotal: 0,
    template: '<div id="pic_%id" employee_id="%employee_id" style="background-image:url(images/pics/pic_%filename.jpg)"></div>',
    html: "",
    data: null,
    isDonated: false,
    donatedID: null,
    divID: null,
    
    populate: function(data) {
        this.data = data;
        
        for(var i=0; i<this.total; i++) {
            var temp = this.template.replace("%id", i);
            temp = temp.replace("%filename", data[i].employee_id);
            temp = temp.replace("%employee_id", data[i].employee_id);
            this.html += temp;
        }
        
        $("#pics").html(this.html);
        
        for(i=0; i<this.total; i++) {
            $("#pic_" + i).bind(events.MouseEvent.MOUSE_OVER, Delegate.create(this, this.div_mouseOverHandler));
            $("#pic_" + i).bind(events.MouseEvent.MOUSE_OUT, Delegate.create(this, this.div_mouseOutHandler));
            $("#pic_" + i).bind(events.MouseEvent.MOUSE_DOWN, Delegate.create(this, this.div_mouseDownHandler));
            
            if(ApplicationFacade.DEBUG)
                $("#pic_" + i).html(data[i].employee_id + " - " + data[i].name);
        }
    },
    
    div_mouseOverHandler: function(event) {
        view.components.Event.adapt(event);
        
        if(this.donatedID != null) {
            return;
        }
        $("#" + event.target.id).css({backgroundPosition: '0px -327px'});
    },
    
    div_mouseOutHandler: function(event) {
        view.components.Event.adapt(event);
        
        if(this.donatedID != null) {
            return;
        } 
        $("#" + event.target.id).css({backgroundPosition: '0 0'});
    },
    
    div_mouseDownHandler: function(event) {
        view.components.Event.adapt(event);
        
        if(this.donatedID != null) {
            //alert("You've donated already!");
            return;
        }
        
        this.donatedID = $("#" + event.target.id).attr('employee_id');
        this.divID = event.target.id;
        this.dispatchEvent(new view.components.Event(this.constructor.CONFIRMATION, event.target, this.data[event.target.id.split("_")[1]].name));
    },

    add: function(total) {
        if(this.total + total > this.currentTotal && this.total + total <= this.data.length) {
            var temp = this.template.replace("%id", this.currentTotal);
            temp = temp.replace("%filename", this.data[this.currentTotal].employee_id);
            temp = temp.replace("%employee_id", this.data[this.currentTotal].employee_id);
            $("#pics").append(temp);
            
            $("#pic_" + this.currentTotal).bind(events.MouseEvent.MOUSE_OVER, Delegate.create(this, this.div_mouseOverHandler));
            $("#pic_" + this.currentTotal).bind(events.MouseEvent.MOUSE_OUT, Delegate.create(this, this.div_mouseOutHandler));
            $("#pic_" + this.currentTotal).bind(events.MouseEvent.MOUSE_DOWN, Delegate.create(this, this.div_mouseDownHandler));
            
            if(ApplicationFacade.DEBUG)
                $("#pic_" + this.currentTotal).html(this.data[this.currentTotal].employee_id + " - " + this.data[this.currentTotal].name);
            
            this.currentTotal++;
        }
    },
    
    yes: function() {
        $("#" + this.divID).css({backgroundPosition: '0 -654px'});
        this.dispatchEvent(new view.components.Event(this.constructor.DONATED, null, this.donatedID));
    },
    
    no: function() {
        $("#pic_" + this.donatedID).css({backgroundPosition: '0 0'});
        this.donatedID = null;
    }
}, 
{
    CONFIRMATION: "confirmation",
    DONATED: "donated"
}
);