public class aus_PassengerPIFHandler {
    
    public static void passengerInsert(List<Passenger__c> listOfPassenger,Map<Id,Passenger__c> oldPassengerMap) {
    	Set<Id> ordersIdSet= new Set<Id>();
        Set<Id> ordersOldIdSet = new Set<Id>();
        system.debug('listOfPassenger'+listOfPassenger);
        List<Orders__c> ordersToUpdate = new List<Orders__c>();
                
        for(Passenger__c pass : listOfPassenger){
            if(pass.Orders__c!=null){
            	ordersIdSet.add(pass.Orders__c);	    
            }
		}
        
        if(!ordersIdSet.isEmpty()){
        	
            map<Id,Orders__c> fetchOrderswithPassengers = new map<Id,Orders__c>([SELECT Id,Name,Passenger_Quantity__c  FROM Orders__c WHERE Id IN:ordersIdSet]);
        	List<Passenger__c> oldPass = [Select Id,PIF_Finalized__c ,Orders__c  from Passenger__c where Orders__c =:fetchOrderswithPassengers.keyset()];
            system.debug('fetchOrderswithPassengers'+fetchOrderswithPassengers);
            boolean flag=true;
            for(Passenger__c pass : oldPass) {
                if(pass.PIF_Finalized__c==false){
                    flag=false;
                    break;
                }
            }
        
            if(!fetchOrderswithPassengers.isEmpty()){
                for(Orders__c ord : fetchOrderswithPassengers.Values()){
                    for(Passenger__c passe : listOfPassenger){
                        if(flag==true){
                             if(passe.PIF_Finalized__c==true)
                    	         ord.PIF_Finalized__c  = passe.PIF_Finalized__c;
                             else{
                                 ord.PIF_Finalized__c=false;
                             }
                        }
                        else{
                            ord.PIF_Finalized__c=false;
                        }
                    
                        ordersToUpdate.add(ord);
                    }}}
                     
                }
            
        
        system.debug('ordersToUpdate'+ordersToUpdate);
        if(!ordersToUpdate.isEmpty()){
            update ordersToUpdate;
            
        }
        
    }
    
    public static void passengerDelete(List<Passenger__c> listOfPassenger,Map<Id,Passenger__c> oldPassengerMap) {
       Set<Id> ordersIdSet= new Set<Id>();
       List<Orders__c> ordersToUpdate = new List<Orders__c>();
            for(Passenger__c pass : oldPassengerMap.values()){
            if(pass.Orders__c!=null){
            	ordersIdSet.add(pass.Orders__c);	    
            }
		}
       map<Id,Orders__c> fetchOrderswithPassengers = new map<Id,Orders__c>([SELECT Id,Name,Passenger_Quantity__c  FROM Orders__c WHERE Id IN:ordersIdSet]);
        	List<Passenger__c> oldPass = [Select Id,PIF_Finalized__c ,Orders__c  from Passenger__c where Orders__c In:fetchOrderswithPassengers.keyset() and Id Not in:oldPassengerMap.keyset()];
             boolean flag=true;       
       for(Passenger__c pass : oldPass) {
                if(pass.PIF_Finalized__c==false){
                    flag=false;
                    break;
                }
            }
       system.debug('oldPass'+oldPass);
       if(!fetchOrderswithPassengers.isEmpty()){
                for(Orders__c ord : fetchOrderswithPassengers.Values()){
                        if(flag==true){
                    	         ord.PIF_Finalized__c  = true;
                        }   
                        else{
                            ord.PIF_Finalized__c=false;
                        }
                    
                        ordersToUpdate.add(ord);
                    }}
       if(!ordersToUpdate.isEmpty()){
            update ordersToUpdate;
       }
    }
   
                                       

}