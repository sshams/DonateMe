/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */


puremvc.define(
{
    name: 'view.mediators.ConfirmationMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME, component);
    }
},
{
    onRegister: function() {
        this.viewComponent.addEventListener(view.components.Confirmation.YES, Delegate.create(this, this.yesHandler));
        this.viewComponent.addEventListener(view.components.Confirmation.NO, Delegate.create(this, this.noHandler));
    },
    
    yesHandler: function() {
        this.facade.sendNotification(ApplicationFacade.YES);
    },
    
    noHandler: function() {
        this.facade.sendNotification(ApplicationFacade.NO);
    },
    
    listNotificationInterests: function() {
        return [
            ApplicationFacade.CONFIRMATION
        ];
    },
    
    handleNotification: function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.CONFIRMATION:
                this.viewComponent.confirm(notification.getBody());
                break;
        }
    }
    
},
{
    NAME: "ConfirmationMediator"
}
);