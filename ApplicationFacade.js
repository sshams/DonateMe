/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */


puremvc.define(
{
    name: 'ApplicationFacade',
    parent: puremvc.Facade
},
{
    startup: function() {
        if(!this.initialized) {
            this.initialized = true;
            this.registerCommand(ApplicationFacade.STARTUP, controller.commands.StartupCommand);
            this.sendNotification(ApplicationFacade.STARTUP);
        }
    }
},
{
    getInstance: function(multitonKey) {
        var instanceMap = puremvc.Facade.instanceMap;
        instance =instanceMap[multitonKey];
        if(instance) {
            return instance;
        }
        
        return instanceMap[multitonKey] = new ApplicationFacade(multitonKey);
    },
    
    DEBUG: false,

    NAME: "BeFirst",
    STARTUP: "startup",
    
    ADD: "add",
    PICS: "pics",
    CONFIRMATION: "confirmation",
    YES: "yes",
    NO: "no",
    DONATED: "donated",
    
    employee_id: null,
    participation: 0,
    totalPics:0
}
);