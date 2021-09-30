public class auswalk_merchantOLIApex {

    public static void createMerchantOLI(List<Order_Line_Items__c> oliRecordList){
        
        set<Id> oliIdsSet = new set<id>();
        set<string> merchantNameSet = new set<string>();
        Map<string,double> merchantPriceMap = New Map<string,double>();
        Map<string, Id> merchantAccMap = New Map<string, Id>();
        
        List<Merchant_order_line__c> merchantOLIListToInsert = New List<Merchant_order_line__c>();
        
        for(Order_Line_Items__c oli:oliRecordList){
            if(oli.Total_Amount__c>0 && oli.Total_Amount_Outstanding__c<=0 && oli.Status__c=='Secured'){
                oliIdsSet.add(oli.Id);
            }
        }
        if(!oliIdsSet.isEmpty()){
       List<Order_Line_Items__c> oliToCreateMerchant = [SELECT Id,Orders__c,AusWalk_Misc_Charge__c,Additional_Charges__c FROM Order_Line_Items__c WHERE Id IN:oliIdsSet];
       
       //auswalk merchant oli create - Start
            if(!oliToCreateMerchant.isEmpty()){
                List<account> accList = [SELECT Id,Name FROM Account WHERE Name='Auswalk' LIMIT 1];
                system.debug('Line 23 accList '+accList);
                for(Order_Line_Items__c oli:oliToCreateMerchant){
                    if(oli.AusWalk_Misc_Charge__c!=Null){
                       Merchant_order_line__c merchantOLI = New Merchant_order_line__c();
                    	merchantOLI.Orders__c=oli.Orders__c;
                    	merchantOLI.Order_Line_Items__c=oli.Id;
                        merchantOLI.Name='Auswalk';
                        if(oli.Additional_Charges__c!=null){
                        merchantOLI.Total_Amount__c=oli.Additional_Charges__c+oli.AusWalk_Misc_Charge__c;  
                        }
                        else {
                          merchantOLI.Total_Amount__c=oli.AusWalk_Misc_Charge__c;
                        }
                        for(account acc:accList){
                        merchantOLI.Account__c=acc.Id;
                        }
                        merchantOLIListToInsert.add(merchantOLI); 
                    }	
                }
            }
        //auswalk merchant oli create - End
        
       // other merchant oli create - start
       List<Order_logistics__c> orderLogisticsListWithOLI = [SELECT Id,price__c,Merchant_Name__c,Logistics_Booking__r.Order_Line_Items__c FROM Order_logistics__c WHERE Logistics_Booking__r.Order_Line_Items__c IN:oliIdsSet];
        
        system.debug('orderLogisticsListWithOLI Line 15 '+orderLogisticsListWithOLI);
            
            if(!orderLogisticsListWithOLI.isEmpty()){
                for(Order_logistics__c ol:orderLogisticsListWithOLI){
                    Merchant_order_line__c merchantOLI = New Merchant_order_line__c();
                    		if(OL.Merchant_Name__c!=Null){
                        	  merchantNameSet.add(OL.Merchant_Name__c);
                           }
            			}
            		}
            if(!merchantNameSet.isEmpty()){
                system.debug('merchantNameSet Line 59 '+ merchantNameSet);
                //convert Name Set into list
                List<string> merchantNameList = New List<string>(merchantNameSet);
                
                //get merchant account details
                List<account> accList = [SELECT Id,name From account WHERE name IN:merchantNameList];
                
                if(!accList.isEmpty()){
                    system.debug('Account List Line 39 '+accList);
                    for(account acc:accList){ 
                        //add values to account map
                        merchantAccMap.put(acc.Name,acc.Id);
                    }
                }
                
                for(integer i=0;i<merchantNameList.size();i++){
                    List<aggregateResult> sumofOL = [SELECT sum(Price__c) FROM Order_logistics__c WHERE Merchant_Name__c =:merchantNameList[i] AND Logistics_Booking__r.Order_Line_Items__c IN : oliIdsSet];
                    merchantPriceMap.put(merchantNameList[i],integer.valueOf(sumofOL[0].get('expr0')));
                }
                
                if(!merchantPriceMap.isEmpty()){
                system.debug('merchantPriceMap Line 51 '+ merchantPriceMap);
                for(Order_Line_Items__c oli:oliRecordList){
                    
                    for(integer i=0;i<merchantNameList.size();i++){
                        Merchant_order_line__c merchantOLI = New Merchant_order_line__c();
                    	merchantOLI.Orders__c=oli.Orders__c;
                    	merchantOLI.Order_Line_Items__c=oli.Id;
                        merchantOLI.Name=merchantNameList[i];
                        merchantOLI.Total_Amount__c=merchantPriceMap.get(merchantNameList[i]);
                        merchantOLI.Account__c=merchantAccMap.get(merchantNameList[i]);
                        merchantOLIListToInsert.add(merchantOLI);
                    } 
            	  }
            	}
            }
            if(!merchantOLIListToInsert.isEmpty()){
                insert merchantOLIListToInsert;
                system.debug('merchantOLIListToInsert '+merchantOLIListToInsert);
            }
    	}
	}
}