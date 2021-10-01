import {LightningElement,api,wire,track} from 'lwc';
import getItineraryData from '@salesforce/apex/Auswalk_Logistic.getItineraryData';
import saveLogistic from '@salesforce/apex/Auswalk_Logistic.saveLogistic';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AttachLogistics extends LightningElement {
    @track tableData;
    @track itinerary;
    @api recordId;
    @track AccomodationData;
    @track TransportData;
    @track TOur_AddonData;
    @track GuideData;
    @track MealData;
    @track Aus_MiscData;
    @track NationalParkData;
    @track HscData;
    @track list=[];
    @track isChecked = false;
    @track options;
    @track selectedOliDataTable;
    

  activeSectionMessage = '';
   
    connectedCallback() {
        console.log('orderid line 27====>'+this.recordId);
        getItineraryData({
            OrderId:this.recordId
            
           
        }).then(result => {
            this.itinerary=result.ITR;
            this.options=result.OLI;
            
            console.log('Here in line no 36 ABC------>'+JSON.stringify(this.itinerary));
            console.log('Here in line no 37 OLI12------>'+JSON.stringify(result.OLI));
        })

       
       
    }

    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }

    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');

        accordion.activeSectionName = 'C';
    }
    saveClick(){
        console.log('list---55 ',JSON.stringify(this.list));
        console.log('OLI Selected Data Line 56'+JSON.stringify(this.selectedOliDataTable));
        saveLogistic({
            saveData: this.list,
            olirecordIDData:this.selectedOliDataTable.oliID,

        }).then((data)=>{
          
            const evt = new ShowToastEvent({
               
                message: 'Record is saved successfully!',
                variant: 'success',
            });
            this.dispatchEvent(evt);
        
         
            console.log('FromApex Line 71 ',JSON.stringify(data));
            
    
        }).catch((error)=>{
            console.log('FromApex Line 75',JSON.stringify(error));
        });
        this.list=[];
        
    }
    oliSelectChangeHandler(event){
        console.log('Enter to event '+JSON.stringify(event.target.checked));
        let i=event.target.getAttribute('data-id2');
        console.log('value of i 83--->'+i);
        console.log('Checked Box Values Line 84==> '+JSON.stringify(this.options[i]));

        if(event.target.checked){
        this.selectedOliDataTable = {
            oliID:this.options[i].oliRecordId,
            oliName:this.options[i].value,
        }
        console.log('Select Checkbox Data: Line 91 '+JSON.stringify(this.selectedOliDataTable));
    }
}

    handleChange(event){
        console.log('Enter to event'+event.target.checked);
       let i=event.target.getAttribute('data-id2');
       let j=event.target.getAttribute('data-id1');
       let type=event.target.getAttribute('data-id');
       console.log('value of i 100--->'+i);
       console.log('value of j 101--->'+j);
       console.log('value of type 102--->'+type);
       console.log('Iternary days===dayName. Line 103'+this.itinerary[i].dayName);
       if(event.target.checked){
 

        if(type=='Accomodation'){
            this.tableData=this.itinerary[i].Accomodation[j];  
            console.log('Accomodation ===>. 109'+JSON.stringify(this.itinerary[i].Accomodation[j])); 
            console.log('Logistics Pricing 110 ===>.'+JSON.stringify(this.itinerary[i].Accomodation[j].logisticPricing));  
        }
            if(type=='Transport'){
                this.tableData=this.itinerary[i].Transport[j];
                console.log('TransportShow 114 ===>.'+JSON.stringify(this.itinerary[i].Transport[j]));
                console.log('Logistics Pricing 115 ===>.'+JSON.stringify(this.itinerary[i].Transport[j].logisticPricing)); 
         }
         if(type=='TOur_Addon'){
            this.tableData=this.itinerary[i].TOur_Addon[j];
            console.log('TOur_Addon 119 ===>.'+JSON.stringify(this.itinerary[i].TOur_Addon[j]));
         }
         if(type=='Guide'){
            this.tableData=this.itinerary[i].Guide[j];
         }
         if(type=='Meal'){
            this.tableData=this.itinerary[i].Meal[j];
            console.log('Meal 126 ===>.'+JSON.stringify(this.itinerary[i].Meal[j].logisticPricing)); 
         }
         if(type=='Aus_Misc'){
            this.tableData=this.itinerary[i].Aus_Misc[j];
         }
         if(type=='NationalPark'){
            this.tableData=this.itinerary[i].NationalPark[j];
         }
         if(type=='Hsc'){
            this.tableData=this.itinerary[i].Hsc[j];
         } 
           
        
           
       /* this.TransportData=this.itinerary[i].type[j];*/
       console.log('Table Data 141 -->'+JSON.stringify(this.tableData));
        
        
       this.list.push({
            SupplierType: type,
            Title: this.tableData.Name,
            Information : this.tableData.Title,
            Day: this.itinerary[i].dayName,
        });
        console.log('List Details===>150'+JSON.stringify(this.list));
       }
       else{
        if(type=='Accomodation'){
            this.tableData=this.itinerary[i].Accomodation[j];  
            console.log('TransportShow 155 ===>.'+JSON.stringify(this.itinerary[i].Accomodation[j])); 
        }
            if(type=='Transport'){
                this.tableData=this.itinerary[i].Transport[j];
                console.log('TransportShow 159===>.'+JSON.stringify(this.itinerary[i].Transport[j]));
              
         }
         if(type=='TOur_Addon'){
            this.tableData=this.itinerary[i].TOur_Addon[j];
     
         }
         if(type=='Guide'){
            this.tableData=this.itinerary[i].Guide[j];
         }
         if(type=='Meal'){
            this.tableData=this.itinerary[i].Meal[j];
         }
         if(type=='Aus_Misc'){
            this.tableData=this.itinerary[i].Aus_Misc[j];
         }
         if(type=='NationalPark'){
            this.tableData=this.itinerary[i].NationalPark[j];
         }
         if(type=='Hsc'){
            this.tableData=this.itinerary[i].Hsc[j];

         }
           for(var m=0; m<this.list.length; m++)
           {
              console.log('Iternary loop 184-->'+this.itinerary[m].dayName+'List day----->'+this.list[m].Day);
              console.log('Iternary Name 185-->'+this.tableData.Name +'List Title----->'+this.list[m].Title);

           if( this.itinerary[i].dayName==this.list[m].Day && this.tableData.Name==this.list[m].Title)

           {
            console.log('list Start--');

             this.list.splice(m,1);
             console.log('listRemove 193--'+JSON.stringify(this.list));
           }
           }

       }
    }
    accLogisticPricingChangeHandler(event){
        let i=event.target.getAttribute('data-id2');
        let j=event.target.getAttribute('data-id1');
        let type=event.target.getAttribute('data-id');
        console.log('value of i Logistic Price---> line 203 '+i);
        console.log('value of j Logistic Price--->line 204 '+j);
        console.log('value of type Logistic Price--->line 205 '+type);

        let elementValue = event.target.value;
            console.log('Line 208 '+elementValue);



        if(type=='Accomodation'){
            console.log('Accomodation Price Line 213 ==>.'+JSON.stringify(this.itinerary[i].Accomodation[j]));
            console.log('Accomodation Price Line 214 ===>.'+JSON.stringify(this.itinerary[i].Accomodation[j].logisticPricing));
            console.log('Logistic Pricing This.list-->'+JSON.stringify(this.list));

            console.log('List Length 217-->'+JSON.stringify(this.list.length));

            for(var m=0;m<this.list.length;m++){
                console.log('Line 220 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].Accomodation[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('Accomodation Where We need changedata -'+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        console.log('Accomodation Logistic Pricing length '+this.itinerary[i].Accomodation[j].logisticPricing.length);
                        if(this.itinerary[i].Accomodation[j].logisticPricing.length>0){
                            for(var a=0;a<this.itinerary[i].Accomodation[j].logisticPricing.length;a++){
                                console.log('Accomodation Logistic Pricing  '+JSON.stringify(this.itinerary[i].Accomodation[j].logisticPricing[a]));
                                if(elementValue===this.itinerary[i].Accomodation[j].logisticPricing[a].value){
                                    console.log('Accomodation Price of Selected Logistic pricing '+JSON.stringify(this.itinerary[i].Accomodation[j].logisticPricing[a].price));
                                    
                                    newlist[m].Price=this.itinerary[i].Accomodation[j].logisticPricing[a].price;
                                }
                            }
                        }
                    }
                }
            console.log('Line 237 logistic price add '+JSON.stringify(this.list));
        }
        if(type=='Transport'){
            console.log('Transport Price Line 240 ==>.'+JSON.stringify(this.itinerary[i].Transport[j]));
            console.log('Transport Price Line 241 ===>.'+JSON.stringify(this.itinerary[i].Transport[j].logisticPricing));
            console.log('Transport Logistic Pricing This.list-->'+JSON.stringify(this.list));

            console.log('List Length 244-->'+JSON.stringify(this.list.length));

            for(var m=0;m<this.list.length;m++){
                console.log('Line 247 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].Transport[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('Transport Where We need changedata -'+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        console.log('Transport Logistic Pricing length '+this.itinerary[i].Transport[j].logisticPricing.length);
                        if(this.itinerary[i].Transport[j].logisticPricing.length>0){
                            for(var a=0;a<this.itinerary[i].Transport[j].logisticPricing.length;a++){
                                console.log('Transport Logistic Pricing  '+JSON.stringify(this.itinerary[i].Transport[j].logisticPricing[a]));
                                if(elementValue===this.itinerary[i].Transport[j].logisticPricing[a].value){
                                    console.log('Transport Price of Selected Logistic pricing '+JSON.stringify(this.itinerary[i].Transport[j].logisticPricing[a].price));
                                    
                                    newlist[m].Price=this.itinerary[i].Transport[j].logisticPricing[a].price;
                                }
                            }
                        }
                    }
                }
            console.log('Line 264 logistic price add '+JSON.stringify(this.list));
        }
        if(type=='Meal'){
            console.log('Meal Price Line 267 ==>.'+JSON.stringify(this.itinerary[i].Meal[j]));
            console.log('Meal Price Line 268 ===>.'+JSON.stringify(this.itinerary[i].Meal[j].logisticPricing));
            console.log('Meal Pricing This.list-->'+JSON.stringify(this.list));

            console.log('List Length 271-->'+JSON.stringify(this.list.length));

            for(var m=0;m<this.list.length;m++){
                console.log('Line 274 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].Meal[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('Meal Where We need changedata -'+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        console.log('Meal Logistic Pricing length '+this.itinerary[i].Meal[j].logisticPricing.length);
                        if(this.itinerary[i].Meal[j].logisticPricing.length>0){
                            for(var a=0;a<this.itinerary[i].Meal[j].logisticPricing.length;a++){
                                console.log('Meal Logistic Pricing  '+JSON.stringify(this.itinerary[i].Meal[j].logisticPricing[a]));
                                if(elementValue===this.itinerary[i].Meal[j].logisticPricing[a].value){
                                    console.log('Meal Price of Selected Logistic pricing '+JSON.stringify(this.itinerary[i].Meal[j].logisticPricing[a].price));
                                    
                                    newlist[m].Price=this.itinerary[i].Meal[j].logisticPricing[a].price;
                                }
                            }
                        }   
                    }
                }
            console.log('Line 291 logistic price add '+JSON.stringify(this.list));
        }

        if(type=='TOur_Addon'){
            console.log('In TOur_Addon');
            console.log('TOur_Addon Line 295 ==>.'+JSON.stringify(this.itinerary[i].TOur_Addon[j]));
            console.log('TOur_Addon Price Line 296 ===>.'+JSON.stringify(this.itinerary[i].TOur_Addon[j].logisticPricing));
            console.log('TOur_Addon Pricing This.list-->'+JSON.stringify(this.list));


            for(var m=0;m<this.list.length;m++){
                console.log('Line 302 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].TOur_Addon[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('TOur_Addon Where We need changedata -'+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        console.log('TOur_Addon Logistic Pricing length '+this.itinerary[i].TOur_Addon[j].logisticPricing.length);
                        if(this.itinerary[i].TOur_Addon[j].logisticPricing.length>0){
                            for(var a=0;a<this.itinerary[i].TOur_Addon[j].logisticPricing.length;a++){
                                console.log('TOur_Addon Logistic Pricing  '+JSON.stringify(this.itinerary[i].TOur_Addon[j].logisticPricing[a]));
                                if(elementValue===this.itinerary[i].TOur_Addon[j].logisticPricing[a].value){
                                    console.log('TOur_Addon Price of Selected Logistic pricing '+JSON.stringify(this.itinerary[i].TOur_Addon[j].logisticPricing[a].price));
                                    
                                    newlist[m].Price=this.itinerary[i].TOur_Addon[j].logisticPricing[a].price;
                                }
                            }
                        }   
                    }
                }
            console.log('Line 319 logistic price add '+JSON.stringify(this.list));
        }

    }

    roomTypeChangeHandler(event){
        let i=event.target.getAttribute('data-id2');
        let j=event.target.getAttribute('data-id1');
        let type=event.target.getAttribute('data-id');
        console.log('value of i 328--->'+i);
        console.log('value of j 329--->'+j);
        console.log('value of type 330--->'+type);


        if(type=='Accomodation'){
            console.log('TLine 334===>.'+JSON.stringify(this.itinerary[i].Accomodation[j]));
            console.log('Line 335 ===>.'+JSON.stringify(this.itinerary[i].Accomodation[j].Name));
            console.log('Line 336 ===>.'+JSON.stringify(this.itinerary[i].Accomodation[j].Roomtype.length));
            console.log('transport 337-->'+JSON.stringify(this.list));

            let elementValue = event.target.value;
            console.log('Line 134096 '+elementValue);

        console.log('transport 342-->'+JSON.stringify(this.list.length));
        for(var m=0;m<this.list.length;m++){
            console.log('Line 344 '+JSON.stringify(this.list[m].Title));
                if(this.itinerary[i].Accomodation[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                    console.log('Where We need changedata -'+JSON.stringify(this.list[m]));
                    let newlist = [...this.list];
                    newlist[m].Information=elementValue;
                        console.log('elementValue Room Type Length Line 224'+JSON.stringify(this.itinerary[i].Accomodation[j].Roomtype.length));
                        if(this.itinerary[i].Accomodation[j].Roomtype.length>0){
                            for(var a=0;a<this.itinerary[i].Accomodation[j].Roomtype.length;a++){
                                if(elementValue==this.itinerary[i].Accomodation[j].Roomtype[a].value){
                                        console.log('Line 227 Record ID Update-'+JSON.stringify(this.itinerary[i].Accomodation[j].Roomtype[a].rtRecordId));
                                        newlist[m].roomTypeRecordId=this.itinerary[i].Accomodation[j].Roomtype[a].rtRecordId;
                                }
                            }
                        }
            }
        }
        }
        console.log('transport 213-->'+JSON.stringify(this.list));
    }
    priceChangeHandler(event){
        let i=event.target.getAttribute('data-id2');
        let j=event.target.getAttribute('data-id1');
        let type=event.target.getAttribute('data-id');
        console.log('value of i 367--->'+i);
        console.log('value of j 368--->'+j);
        console.log('value of type 369--->'+type);

        let priceElement = event.target.value;
        console.log('Price Line 372 '+priceElement);

        if(type=='Accomodation'){
            console.log('TransportShow 375===>.'+JSON.stringify(this.itinerary[i].Accomodation[j]));
            console.log('TransportShow 376===>.'+JSON.stringify(this.itinerary[i].Accomodation[j].Name));
            console.log('transport 377-->'+JSON.stringify(this.list));
            console.log('transport 378-->'+JSON.stringify(this.list.length));

            for(var m=0;m<this.list.length;m++){
                console.log('Line 381 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].Accomodation[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('Where We need changedata '+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        newlist[m].Price=priceElement;
                }
            }
        }
        if(type=='Transport'){
            for(var m=0;m<this.list.length;m++){
                console.log('Line 391 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].Transport[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('Where We need changedata '+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        newlist[m].Price=priceElement;
                }
            }
        }
        if(type=='Meal'){
            for(var m=0;m<this.list.length;m++){
                console.log('Line 401 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].Meal[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('Where We need changedata '+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        newlist[m].Price=priceElement;
                }
            }
        }
        if(type=='TOur_Addon'){
            for(var m=0;m<this.list.length;m++){
                console.log('Line 411 '+JSON.stringify(this.list[m].Title));
                    if(this.itinerary[i].TOur_Addon[j].Name==this.list[m].Title && this.itinerary[i].dayName == this.list[m].Day){ 
                        console.log('Where We need changedata '+JSON.stringify(this.list[m]));
                        let newlist = [...this.list];
                        newlist[m].Price=priceElement;
                }
            }
        }
        console.log('transport 419-->'+JSON.stringify(this.list));  
    }
}