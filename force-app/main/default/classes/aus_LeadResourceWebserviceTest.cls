@isTest
public class aus_LeadResourceWebserviceTest {

  @isTest
    static void testHttpPutError() {
        
        
        // prepare test-data
        
        //As Per Best Practice it is important to instantiate the Rest Context
        RestRequest req = new RestRequest();
        RestResponse res = new RestResponse();
        
        req.requestURI = '/services/apexrest/leadFromBookNowForm'; //Request URL
        req.httpMethod = 'PUT';
        String putData = '{"primaryContactEmail":"muneshsinghTest@psagtechnologies.com","primaryContactPhone":"872645698773","typeOfWalkingHoliday":"Self Guided","status":"Qualified","tripOptionExternalId":"a025D00000CGxOYQA1","departureDate":"1/2/2021","preferredStartDate":"1/2/2021","alternateStartDate":"1/2/2021","noOfPax":"2","primaryContactLastName":"Singh","primaryContactFirstName":"MuneshTest","primaryContactRoomType":"Double","paxInfo":{"contactEachUserSeparately":"Yes","passengerInformation":[{"firstName":"sam","lastName":"Kumar","passengerEmail":"sam.kumar@psagtechnologeies.com","roomType":"Single","contactPassengerSeparately":true},{"firstName" : "Sumit","lastName" : "panchal","passengerEmail":"sumit.panchal@psagtechnologies.com","roomType":"Double","contactPassengerSeparately":false}]}}';
       	req.requestBody=Blob.valueof(putData);
        RestContext.request = req;
        RestContext.response= res;
        
        Test.startTest();
        aus_LeadResourceWebservice.leadIdExpose();
        Test.stopTest();
        
    }
    
     @isTest
    static void testHttpPutLeadResourceWebservice() {
      Trip__c trip = new Trip__c();
        trip.Name='Great Ocean Walk';
        insert trip;
        
        Trip_Option__c austrip = new Trip_Option__c();
        austrip.Trip_Option_External_ID__c ='a025D00000CGxOYQA1';
        austrip.Trip__c =trip.Id;
        austrip.Name ='GREAT OCEAN WALK 8 DAYS';
        insert austrip;
        
          Lead lead = new Lead();
        lead.External_ID__c ='muneshsinghTest@psagtechnologies.com#872645698773';
        lead.Trip__c =trip.Id;
        lead.Trip_Option__c =austrip.Id;
        lead.Type_Of_Walking_Holidays__c ='Self Guided';
        lead.LastName='MuneshTest';
        lead.FirstName='Singh';
        lead.Company='Auswalk';
        lead.No_Of_PAX__c=2;
        insert lead;
         
        //As Per Best Practice it is important to instantiate the Rest Context
        RestRequest req = new RestRequest();
        RestResponse res = new RestResponse();
        
        req.requestURI = '/services/apexrest/leadFromBookNowForm'; //Request URL
        req.httpMethod = 'PUT';
        String putData = '{"primaryContactEmail":"muneshsinghTest@psagtechnologies.com","primaryContactPhone":"872645698773","typeOfWalkingHoliday":"Self Guided","status":"Qualified","tripOptionExternalId":"a025D00000CGxOYQA1","departureDate":"1/2/2021","preferredStartDate":"1/2/2021","alternateStartDate":"1/2/2021","noOfPax":"2","primaryContactLastName":"Singh","primaryContactFirstName":"MuneshTest","primaryContactRoomType":"Double","paxInfo":{"contactEachUserSeparately":"Yes","passengerInformation":[{"firstName":"sam","lastName":"Kumar","passengerEmail":"sam.kumar@psagtechnologeies.com","roomType":"Single","contactPassengerSeparately":true},{"firstName" : "Sumit","lastName" : "panchal","passengerEmail":"sumit.panchal@psagtechnologies.com","roomType":"Double","contactPassengerSeparately":false}]}}';
       	req.requestBody=Blob.valueof(putData);
        RestContext.request = req;
        RestContext.response= res;
      /*  
        Trip__c trip = new Trip__c();
        trip.Name='Great Ocean Walk';
        insert trip;
    
        Trip_Option__c austrip = new Trip_Option__c();
       // austrip.Id ='GOWSG8';
        austrip.Trip__c =trip.Id;
        austrip.Name ='GREAT OCEAN WALK 8 DAYS';
        insert austrip;
        
        Lead lead = new Lead();
        lead.External_ID__c ='GOWSG8';
        lead.Trip__c =trip.Id;
        lead.Trip_Option__c =austrip.Id;
        lead.Type_Of_Walking_Holidays__c ='GOWSG8';
        lead.LastName='Munesh';
        lead.FirstName='Singh';
        lead.Company='Auswalk';
        lead.No_Of_PAX__c=2;
        insert lead; */ 
        
        Test.startTest();
        aus_LeadResourceWebservice.leadIdExpose();
        Test.stopTest();
        
    }
    
   
    
}