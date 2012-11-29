/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */



puremvc.define(
{
    name: "controller.commands.StartupCommand",
    parent: puremvc.SimpleCommand
},
{
    execute: function(notification) {
        this.facade.registerProxy(new model.proxy.EmployeeProxy());
        this.facade.registerProxy(new model.proxy.DonationProxy());
        
        this.facade.registerMediator(new view.mediators.ScrollerMediator(new view.components.Scroller()));
        this.facade.registerMediator(new view.mediators.PicsMediator(new view.components.Pics()));
        this.facade.registerMediator(new view.mediators.ConfirmationMediator(new view.components.Confirmation()));
        this.facade.registerMediator(new view.mediators.ParticipationMediator(new view.components.Participation()));
    }
}
);