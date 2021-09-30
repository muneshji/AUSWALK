import { LightningElement,track,api } from 'lwc';
import getAllocationData from '@salesforce/apex/auswalk_guideAllocationHandler.getData';
import guideAllocationData from '@salesforce/apex/auswalk_guideAllocationHandler.getGuideAllocationDate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class GuildeAllocation extends LightningElement {
    activeSectionMessage = 'Guide Allocation'
    
    @track allocationData;
    @track guideDataTable;
    @track showSecondaryGuide = false;
    @api recordId;
    @track list = [];
    
    activeSectionMessage='Allocate Guides';

    connectedCallback() {
        console.log("Trip option recordId", this.recordId);
        getAllocationData({
            tripOptionId:this.recordId
           //tripOptionId:'a025D00000CGxOYQA1'
        }).then(result => {
            this.allocationData=result;
            console.log('Here in line no 19 ABC------>'+JSON.stringify(this.allocationData));
        })
    }

    clickHandler(){
            console.log('After Splice This List '+JSON.stringify(this.list));

            guideAllocationData({
                AllocationData:this.list
            }).then((data)=>{
              
                const evt = new ShowToastEvent({
                   
                    message: 'Guide Allocated successfully!',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            
             
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

            if(selectValue!==this.list[m].guideId){
                this.list.splice(m,1);
            }
        }
        console.log('After Splice This List '+JSON.stringify(this.list));
        this.showSecondaryGuide=true;
    }

    secondaryGuide(event){
        let i=event.target.getAttribute('data-id1');
        let selectValue = event.target.value;
        console.log('I value '+i);
        console.log('Secondary guide Selected Value '+selectValue);

        let getGuide = this.template.querySelector(".SecondaryGuide");
        let getGuideId = getGuide.value;

        //validation for guide selection - start
        console.log('This List '+JSON.stringify(this.list));
        if(getGuideId===this.list[0].guideId){
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
    
            for(var m=1; m<this.list.length; m++){
                console.log('This List guideId '+JSON.stringify(this.list[m].guideId));
                console.log('Selected Guide Id '+JSON.stringify(selectValue));
    
                if(selectValue!==this.list[m].guideId){
                    this.list.splice(m,1);
                }
            }
            console.log('After Splice This List '+JSON.stringify(this.list));
        }
        getGuide.reportValidity();
        //validation for guide selection - End 
    }
}