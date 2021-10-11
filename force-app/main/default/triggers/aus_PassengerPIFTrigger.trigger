trigger aus_PassengerPIFTrigger on Passenger__c (after insert,after update,after delete) {
    
    if(trigger.isAfter && trigger.isInsert){
    	aus_PassengerPIFHandler.passengerInsert(trigger.new,trigger.oldmap);    
    }
    
    if(trigger.isAfter && trigger.isUpdate){
    	aus_PassengerPIFHandler.passengerInsert(trigger.new,trigger.oldmap);    
    }
    if(trigger.isAfter && trigger.isDelete){
    	aus_PassengerPIFHandler.passengerDelete(trigger.new,trigger.oldmap);    
    }

}