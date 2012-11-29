/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */


puremvc.define(
{
    name: 'model.proxy.EmployeeProxy',
    parent: puremvc.Proxy,
    
    constructor: function(){
        puremvc.Proxy.call(this, this.constructor.NAME, null);
    }
},
{
    URL: "index.php/employee",
    
    onRegister: function() {
    },
    
    list: function(donatable) {
        $.getJSON(this.URL + (donatable ? "/donatable" : ""), Delegate.create(this, this.listHandler));
    },
    
    listHandler: function(data) {
        this.setData(data);
        ApplicationFacade.totalPics = data.length;
        this.facade.sendNotification(ApplicationFacade.PICS, data);
    }
},
{
    NAME: 'EmployeeProxy'
}
);