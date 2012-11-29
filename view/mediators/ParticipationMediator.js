/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: 'view.mediators.ParticipationMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME, component);
    }
},
{
    onRegister: function() {
        this.viewComponent.addEventListener(view.components.Participation.YES, Delegate.create(this, this.yesHandler));
        this.viewComponent.addEventListener(view.components.Participation.NO, Delegate.create(this, this.noHandler));
    },
    
    yesHandler: function() {
        ApplicationFacade.participation = 1;
        this.submit();
    },
    
    noHandler: function() {
        ApplicationFacade.participation = 0;
        this.submit();
    },
    
    submit: function() {
        var donationProxy = this.facade.retrieveProxy(model.proxy.DonationProxy.NAME);
        donationProxy.submit(ApplicationFacade.employee_id, ApplicationFacade.participation);
    },
    
    listNotificationInterests: function() {
        return [
            ApplicationFacade.DONATED
        ];
    },
    
    handleNotification: function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.DONATED:
                this.viewComponent.participate();
                break;
        }
    }
    
},
{
    NAME: "ParticipationMediator"
}
);