import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { UiconfigService } from 'src/app/services/configurations/uiconfig.service';


@Component({
  selector: 'app-uiconfig',
  templateUrl: './uiconfig.component.html',
  styleUrls: ['./uiconfig.component.css']
})
export class UiconfigComponent {

  constructor(private uiconfigService: UiconfigService){}
  public features:any[] = []
  public feature:any = {}
  public featureImageUrl:any = ''
  public activateButtons:boolean = true;
  public submitButtonDisabled:boolean = true

  ngOnInit(){
    // this.rearrangeArrayByObjectId(this.features, 3, 6);
  }


  public addFeature(){
    this.feature['id'] = this.features.length + 1
    if(this.feature.name.trim() != ''){
      this.feature.order_index = parseInt(this.feature.order_index)
      this.feature.imgUrl = this.featureImageUrl
      this.features.push(this.feature)
      setTimeout(()=>{
        const els:any = document.querySelectorAll('.cube')
        const lastCube = els[els.length - 1];
        lastCube.style.backgroundImage = `url(${this.feature.imgUrl})`;
        this.feature = {}
        this.activateButtons= true
        if(this.features.length > 0 && !this.submitActivate()){
          this.submitButtonDisabled = false
        }
      },50)
    }
    
  }

  private getObjectFromArrayByName(arr:any[],name:string){
    const obj:any = arr.find(x => x.name === name);
    return obj
  }

  private deleteObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
    let newObj:any = []
    arr.forEach((arrObj)=>{
      console.log()
      if (arrObj.id != id){
        newObj.push(arrObj)
      }
    })
    console.log(newObj)
    return newObj
  }

  onDragStart(event: DragEvent, card: string): void {
    event.dataTransfer.setData('text/plain', card);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const targetObj = this.getObjectFromArrayByName(this.features,data.replaceAll("'",""))
    const targetId = this.getObjectFromArrayByName(this.features,event.target['innerText'].replaceAll("'","")).id
    const targetIdDrag= targetObj.id
    const dropIndex = this.getObjectIndex(targetId)
    const dragIndex = this.getObjectIndex(targetIdDrag)
    const img = targetObj.image

    if (dragIndex !== -1 && dropIndex !== -1) {
      this.features.splice(dragIndex, 1);
      this.features.splice(dropIndex, 0, {name:data,id:targetIdDrag,image:img,imgUrl:targetObj.imgUrl});
      setTimeout(()=>{
        const target:any = document.getElementById(`cube-${targetIdDrag}`)
        target.style.backgroundImage = `url(${targetObj.imgUrl})`;
      },50)
    }
  }

  private getObjectIndex(id){
    var index = -1;
    for (var i = 0; i < this.features.length; i++) {
      if (this.features[i].id === id) {
        index = i;
        break; // Stop searching once found
      }
    }
    return index
  }

  onSubmit(){
    const formData = new FormData();

    // Append card data and images for each card
    console.log(this.features)
    this.features.forEach((feature, index) => {
      console.log(feature)
      formData.append(`feature-${index}`, JSON.stringify({name:feature.name,order_index:feature.order_index}));
      formData.append(`image-${index}`, feature.image, feature.image.name);
    });

    this.uiconfigService.createFeatures(formData)
  }

  handleImageUpload(event: any) {
    this.feature.image = event.target.files[0];
    this.featureImageUrl = URL.createObjectURL(this.feature.image);
    this.activateButtons = !this.featureActivateButtons()
  }

  inputKeyupButtonsActivator(){
    this.activateButtons = !this.featureActivateButtons()
    if(this.features?.length == null){
      this.submitButtonDisabled = false
    }
  }
  
  removeFeature(featureId:string){
    this.features = this.deleteObjectFromArray(this.features,parseInt(featureId))
  }

  featureActivateButtons(){
    return this.feature?.name?.trim() != '' && this.feature?.name.length > 0 && isNaN(this.feature.order_index) == false && this.feature.image != null;
  }

  submitActivate(){
    return this.feature?.name?.trim() == '' && this.feature?.name.length == 0 && isNaN(this.feature.order_index) == true && this.feature.image == null;
  }
}
