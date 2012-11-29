/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: 'view.mediators.PicsMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME, component);
    }
},
{
    onRegister: function() {
        var employeeProxy = this.facade.retrieveProxy(model.proxy.EmployeeProxy.NAME);
        employeeProxy.list(true);
        
        this.viewComponent.addEventListener(view.components.Pics.CONFIRMATION, Delegate.create(this, this.confirmationHandler));
        this.viewComponent.addEventListener(view.components.Pics.DONATED, Delegate.create(this, this.donatedHandler));
    },
    
    confirmationHandler: function(event) {
        this.facade.sendNotification(ApplicationFacade.CONFIRMATION, event.body);
    },
    
    donatedHandler: function(event) {
        ApplicationFacade.employee_id = event.body
        this.facade.sendNotification(ApplicationFacade.DONATED);
    },
    
    listNotificationInterests: function() {
        return [
            ApplicationFacade.PICS,
            ApplicationFacade.ADD,
            ApplicationFacade.YES,
            ApplicationFacade.NO
        ];
    },
    
    handleNotification: function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.PICS:
                this.viewComponent.populate(notification.getBody());
                break;
            case ApplicationFacade.ADD:
                this.viewComponent.add(notification.getBody());
                break;
            case ApplicationFacade.YES:
                this.viewComponent.yes();
                break;
            case ApplicationFacade.NO:
                this.viewComponent.no();
                break;
        }
    }
    
},
{
    NAME: "PicsMediator"
}
);