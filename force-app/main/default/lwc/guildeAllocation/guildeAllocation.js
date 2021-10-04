import { LightningElement,track,api } from 'lwc';
import getAllocationData from '@salesforce/apex/auswalk_guideAllocationHandler.getData';
import guideAllocationData from '@salesforce/apex/auswalk_guideAllocationHandler.getGuideAllocationDate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class GuildeAllocation extends NavigationMixin(LightningElement) {
    activeSectionMessage = 'Guide Allocation'
    
    @track allocationData;
    @track guideDataTable;
    @track showSecondaryGuide = false;
    @api recordId;
    @track listGuide = [];
    @track list = [];
    @track deleteGuide = [];
    
    activeSectionMessage='Allocate Guides';

    connectedCallback() {
        console.log("Trip option recordId", this.recordId);
        getAllocationData({
            tripOptionId:this.recordId
           //tripOptionId:'a025D00000CGxOYQA1'
        }).then(result => {
            this.allocationData=result;
            console.log('Here in line no 24 ABC------>'+JSON.stringify(this.allocationData));
            console.log('Here in line no 25 ABC------>'+JSON.stringify(this.allocationData[0].guideswithTrip));
            if(this.allocationData[0].guideswithTrip.length>0){
                this.listGuide = this.allocationData[0].guideswithTrip;
                this.showSecondaryGuide=true;
            }
        })
    }

    clickHandler(){
            console.log('After Splice This List '+JSON.stringify(this.list));
            console.log('Delete Allocation List '+JSON.stringify(this.deleteGuide));
            guideAllocationData({
                AllocationData:this.list,
                deleteAllocatioData:this.deleteGuide
            }).then((data)=>{
              
                const evt = new ShowToastEvent({
                   
                    message: 'Guide Allocated successfully!',
                    variant: 'success',

                });
                this.dispatchEvent(evt),
                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: this.recordId,
                            objectApiName: 'Trip_Option__c',
                            actionName: 'view'
                        }
                    });

                console.log('FromApex ',JSON.stringify(data));
                
        
            }).catch((error)=>{
                console.log('FromApex ',JSON.stringify(error));
            });
            this.list=[];
    }

    PrimaryGuide(event){
        let selectValue = event.target.value;
        let i=event.target.getAttribute('data-id1');

        console.log('Primarary guide Selected Value '+selectValue);
        console.log('I value '+i);
        
        for(var j=0;j<this.allocationData[i].guidesList.length;j++){
            if(selectValue===this.allocationData[i].guidesList[j].value){
                console.log('Line 30 Guide Data = '+JSON.stringify(this.allocationData[i].guidesList[j].value));
                console.log('Line 30 Guide Data = '+JSON.stringify(this.allocationData[i].guidesList[j]));
                this.guideDataTable =  this.allocationData[i].guidesList[j];
            }
        }
        console.log('Primary Guide Data '+JSON.stringify(this.guideDataTable));

        this.list.push({
            tripId:this.allocationData[i].tripId,
            tripName:this.allocationData[i].tripName,
            guideAllocation:'Primary Guide',
            guideId:this.guideDataTable.value,
            guideName:this.guideDataTable.guideName,
            guidePhone:this.guideDataTable.guidePhone,
            guideEmail:this.guideDataTable.guideEmail,
        });

        console.log('This List '+JSON.stringify(this.list));
        console.log('This List '+JSON.stringify(this.list.length));

        for(var m=0; m<this.list.length; m++){
            console.log('This List guideId '+JSON.stringify(this.list[m].guideId));
            console.log('Selected Guide Id '+JSON.stringify(selectValue));

            if(selectValue!==this.list[m].guideId && this.list[m].guideAllocation==='Primary Guide'){
                this.list.splice(m,1);
            }
        }
        console.log('After Splice This List '+JSON.stringify(this.list));
        this.showSecondaryGuide=true;
    }

    secondaryGuide(event){
        console.log('in Secondary guide change '+JSON.stringify(this.list));
        let i=event.target.getAttribute('data-id1');
        let selectValue = event.target.value;
        console.log('I value '+i);
        
        console.log('Secondary guide Selected Value test'+selectValue);

        //validation for guide selection - start
        console.log('This List '+JSON.stringify(this.list));
        console.log('This List '+JSON.stringify(getGuideId));

        if(selectValue===this.list[0].guideId){
            console.log(selectValue);
            getGuide.setCustomValidity('Please Select Another Guide');
        }
        else{
            getGuide.setCustomValidity('');
            for(var j=0;j<this.allocationData[i].guidesList.length;j++){
                if(selectValue===this.allocationData[i].guidesList[j].value){
                    console.log('Line 30 Guide Data = '+JSON.stringify(this.allocationData[i].guidesList[j].value));
                    console.log('Line 30 Guide Data = '+JSON.stringify(this.allocationData[i].guidesList[j]));
                    this.guideDataTable =  this.allocationData[i].guidesList[j];
                }
            }
            console.log('Primary Guide Data '+JSON.stringify(this.guideDataTable));
    
            this.list.push({
                tripId:this.allocationData[i].tripId,
                tripName:this.allocationData[i].tripName,
                guideAllocation:'Secondary Guide',
                guideId:this.guideDataTable.value,
                guideName:this.guideDataTable.guideName,
                guidePhone:this.guideDataTable.guidePhone,
                guideEmail:this.guideDataTable.guideEmail,
            });
            
            console.log('This List '+JSON.stringify(this.list));
            console.log('This List '+JSON.stringify(this.list.length));
    
            for(var m=0; m<this.list.length; m++){
                console.log('This List guideId Line 155'+JSON.stringify(this.list[m].guideId));
                console.log('Selected Guide Id '+JSON.stringify(selectValue));
    
                if(this.list[m].guideAllocation==='Secondary Guide'){
                    if(selectValue!==this.list[m].guideId){
                        console.log('This List Splice'+JSON.stringify(this.list[m].guideId));
                            this.list.splice(m,1);
                    }
                }
                console.log('After Splice This List '+JSON.stringify(this.list.length));
            }
            console.log('After Splice This List '+JSON.stringify(this.list));
        }
        getGuide.reportValidity();
        //validation for guide selection - End 
    }
    deleteGuideHandler(event){
        let i=event.target.getAttribute('data-id');
        let j=event.target.getAttribute('data-id1');

        console.log('Total Guide List to Trip '+JSON.stringify(this.listGuide));
        console.log('Delete Selected Guide '+JSON.stringify(this.listGuide[j]));
        
        this.deleteGuide.push({
            allocationId:this.listGuide[j].allocationId,
        });


        if(this.listGuide.length>0){
            this.listGuide.splice(j,1);
        }
        console.log('After Delete Guide '+JSON.stringify(this.listGuide));
        console.log('Deleted Guide '+JSON.stringify(this.deleteGuide));
    }
}
