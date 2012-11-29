/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: "view.components.Participation",
    parent: view.components.UIComponent,
    
    constructor: function() {
        view.components.UIComponent.call(this, document.getElementById("participation"));
        
        this.addEventHandler(document.getElementById("yes"), events.MouseEvent.CLICK, Delegate.create(this, this.yesHandler));
        this.addEventHandler(document.getElementById( "no"), events.MouseEvent.CLICK, Delegate.create(this, this.noHandler));
    }
},
{
    participate: function() {
        window.setTimeout(Delegate.create(this, this.participate_delayed), 2000);
    },
    
    participate_delayed: function() {
        $.blockUI({message:$('#participation'), css: {width: '488px', height: '271px'}});
    },
    
    yesHandler: function(event) {
        $.unblockUI();
        this.dispatchEvent(new view.components.Event(this.constructor.YES, event.target));
    },
    
    noHandler: function(event) {
        $.unblockUI();
        this.dispatchEvent(new view.components.Event(this.constructor.NO, event.target));
    }
}, 
{
    YES: "yes",
    NO: "no"
}
);