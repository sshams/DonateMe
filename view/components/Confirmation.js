/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: "view.components.Confirmation",
    parent: view.components.UIComponent,
    
    constructor: function() {
        view.components.UIComponent.call(this, document.getElementById("confirmation"));
    }
},
{
    currentID: 0,
    template: '<div id="content_%id" class="confirmation"><div id="copy">Are you sure you want to donate<br /><span id="employee_name">%name</span></div><br /><input name="yes" type="image" id="yes_%id" src="images/yes.png" border="0" />&nbsp;<input name="no" type="image" id="no_%id" src="images/no.png" border="0" />  </div>',
    
    confirm: function(name) {
        var temp = this.template.replace("%id", this.currentID);
        temp = temp.replace("yes_%id", "yes_" + this.currentID);
        temp = temp.replace( "no_%id",  "no_" + this.currentID);
        temp = temp.replace("%name", name);
        
        $("#confirmation").html(temp);
        
        this.addEventHandler(document.getElementById("yes_" + this.currentID), events.MouseEvent.CLICK, Delegate.create(this, this.yesHandler));
        this.addEventHandler(document.getElementById( "no_" + this.currentID), events.MouseEvent.CLICK, Delegate.create(this, this.noHandler));
        
        $.blockUI({message:$('#content_' + this.currentID), css: {width: '488px', height: '271px'}});
        this.currentID++;
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