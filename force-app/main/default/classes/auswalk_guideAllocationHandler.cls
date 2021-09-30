public class auswalk_guideAllocationHandler {

        public class tripData{
            @auraenabled public Id tripId{get;set;}
            @auraenabled public string tripName{get;set;}
            @auraenabled public string tripOptionName{get;set;}
            @auraenabled public string tripOptonType{get;set;}
            @auraenabled public double tripOptonPrice{get;set;}
            @auraenabled public boolean showguides{get;set;}
            @auraenabled public List<picklistValue> guidesList{get;set;}
        }
    
    public class picklistValue
    {
        @auraenabled public Id value {get;set;}
        @auraenabled public string guideName {get;set;}
        @auraenabled public string label {get;set;}
        @auraenabled public string guidePhone{get;set;}
        @auraenabled public string guideEmail{get;set;}
    }
    
    public class guideAllocationData
    {
        @auraenabled public string tripId {get;set;}
        @auraenabled public string guideId {get;set;}
        @auraenabled public string tripName {get;set;}
        @auraenabled public string guideName{get;set;}
        @auraenabled public string guideEmail{get;set;}
        @auraenabled public string guidePhone{get;set;}
    }
    
    @auraenabled
    public static list<tripData> getData(Id tripOptionId){
    list<tripData> tripDataList = New list<tripData>();
    
    //List<Trip__c> tripOptionList = [SELECT Id,Name,Start_Location__c,No_of_Passenger__c FROM Trip__c WHERE Id =:tripOptionId];
    List<Trip_Option__c> tripOptionList = [SELECT Id,Name,Trip_Type__c,Trip__r.Name,Price__c FROM Trip_Option__c WHERE Id=:tripOptionId];
        
    system.debug('tripList Line 23 '+tripOptionList);
        
    list<Guide__c> guideList = [SELECT Id,Name,Middle_Name__c,Last_Name__c,Phone__c,Email_ID__c	 FROM Guide__c];
    system.debug('tripList Line 26 '+guideList);
    
        if(!tripOptionList.isEmpty()){
         List<picklistValue> guideDataList = New List<picklistValue>();
         for(Trip_Option__c tOption:tripOptionList){
            
             //trip option data
            tripData tData = New tripData();
            tData.tripId=tOption.Trip__c;
            tData.tripName=tOption.Trip__r.Name;
            tData.tripOptionName=tOption.Name;
            tData.tripOptonType=tOption.Trip_Type__c;
            tData.tripOptonPrice=tOption.Price__c;
             
            //guide data 
             if(!guideList.isEmpty()){
             tData.showguides=true;
             	for(Guide__c guide:guideList){
        		picklistValue gData = New picklistValue();
                gData.value=guide.Id;
                gData.guideName=guide.Name+' '+guide.Last_Name__c;
        		gData.label=guide.Name+' '+guide.Last_Name__c;
        		gData.guidePhone=guide.Phone__c;
        		gData.guideEmail=guide.Email_ID__c;
            	guideDataList.add(gData);    
       				}
          		}
            tData.guidesList=guideDataList;
            tripDataList.add(tData);
        	}    
        }
        system.debug('tripDataList '+tripDataList);
        return tripDataList;
        
    }
    @auraenabled
    public static void getGuideAllocationDate(List<guideAllocationData> AllocationData){
        List<Guide_Allocation__c> guideAllocationList = New List<Guide_Allocation__c>();
        
        system.debug('AllocationData '+AllocationData);
        for(guideAllocationData data:AllocationData){
            system.debug('data Line 82 '+data);
            Guide_Allocation__c gAllocation = New Guide_Allocation__c();
            gAllocation.Trip__c=data.tripId;
            gAllocation.Guide__c=data.guideId;
            guideAllocationList.add(gAllocation);
        }
        if(!guideAllocationList.isEmpty()){
            system.debug('guideAllocationList '+guideAllocationList);
            insert guideAllocationList;
        }
    }
}