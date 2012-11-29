/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: 'view.mediators.ScrollerMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME, component);
    }
},
{
    onRegister: function() {
        this.viewComponent.addEventListener(view.components.Scroller.ADD, Delegate.create(this, this.addHandler));
    },
    
    addHandler: function(event) {
        this.facade.sendNotification(ApplicationFacade.ADD, event.body);
    },
    
    listNotificationInterests: function() {
        return [
            //ApplicationFacade.DONATED
        ];
    },
    
    handleNotification: function(notification) {
        switch(notification.getName()) {
            //case ApplicationFacade.DONATED:
                //this.viewComponent.setScroll(false);
                //break;
        }
    }
    
},
{
    NAME: "ScrollerMediator"
}
);