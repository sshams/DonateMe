/**
* @author Saad Shams :: sshams@live.com
* Copy or reuse is prohibited.
* */


puremvc.define(
{
    name: 'model.proxy.DonationProxy',
    parent: puremvc.Proxy,
    
    constructor: function(){
        puremvc.Proxy.call(this, this.constructor.NAME, null);
    }
},
{
    URL: "index.php/donate",
    
    onRegister: function() {
    },
    
    submit: function(employee_id, participation) {
        $.post(this.URL, {employee_id: employee_id, participation: participation}, Delegate.create(this, this.submitHandler))
    },
    
    submitHandler: function(data) {
        trace(data);
        if(data == "success=1") {
            window.location = "public/thankyou.php"
        } else {
            //alert(data);
        }
    },
    
    listHandler: function(data) {
        this.setData(data);
        this.facade.sendNotification(ApplicationFacade.PICS, data);
    }
},
{
    NAME: 'DonationProxy'
}
);