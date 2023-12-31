import { Component } from '@angular/core';
import { UiconfigService } from 'src/app/services/configurations/uiconfig.service';
import Swal from 'sweetalert2'

class Feature{
  public features:any[] = []
  public feature:any = {}
  public featureImageUrl:any = ''
  public activateButtons:boolean = true;
  public submitButtonDisabled:boolean = true
  public hotelservices:any[] = []
  public hotelservice:any = {}
  public showFeatureSpinner:boolean = false;
  public showFeatureUpdateSpinner:boolean = false;
  private editMode = false;

  constructor(public uiconfigService: UiconfigService){}  

  public addFeature(){
    this.feature['id'] = this.features.length + 1
    if(this.feature.name.trim() != ''){
      this.feature.order_index = parseInt(this.feature.order_index)
      this.feature.imgUrl = this.featureImageUrl
      this.features.push(this.feature)
      setTimeout(()=>{
        const els:any = document.querySelectorAll('.feature-cube')
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

  public getObjectFromArrayByName(arr:any[],name:string){
    const obj:any = arr.find(x => x.name === name);
    return obj
  }

  public deleteObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
    let newObj:any = []
    arr.forEach((arrObj)=>{
      if (arrObj.id != id){
        newObj.push(arrObj)
      }
    })
    return newObj
  }

  public updateObjectInArray(array, idForUpdate, data) {
    return array.map((item) => {
      if (item.id === idForUpdate) {
        return { ...item, ...data };
      }
      return item;
    });
  }

  onDragStart(event: DragEvent, card: string): void {
    event.dataTransfer.setData('text/plain', card);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const displacedCube = this.getObjectFromArrayByName(this.features,event.target['innerText'].replaceAll("'",""))
    const data = event.dataTransfer.getData('text/plain');
    const targetObj = this.getObjectFromArrayByName(this.features,data.replaceAll("'",""))
    const targetId = displacedCube.id
    const targetIdDrag= targetObj.id
    const dropIndex = this.getObjectIndex(targetId)
    const dragIndex = this.getObjectIndex(targetIdDrag)
    const img = targetObj.image

    if (dragIndex !== -1 && dropIndex !== -1) {
      this.features.splice(dragIndex, 1);
      this.features.splice(dropIndex, 0, {name:data,id:targetIdDrag,image:img,imgUrl:targetObj.imgUrl || targetObj.image,order_index:dropIndex});
      setTimeout(()=>{
        this.updatePositions()
        const target:any = document.getElementById(`feature-cube-${targetIdDrag}`)
        if(this.editMode){
          target.style.backgroundImage = `url(${'http://127.0.0.1:8080/media/'+targetObj.image})`;
        }
        else{
          target.style.backgroundImage = `url(${targetObj.imgUrl || 'http://127.0.0.1:8080/media/'+targetObj.image})`;
        }
      },50)
    }
  }

  updatePositions(){
    let index = 0
    this.features.forEach((feature)=>{
      feature.order_index = index
      index += 1
    })
  }

  getObjectFromArrayById(arr,id){
    const obj:any = arr.find(x => x.id === id);
    return obj
  }

  loadFeature(id){
    this.feature = this.getObjectFromArrayById(this.features,parseInt(id))
    console.log(this.feature)
  }

  public getObjectIndex(id){
    var index = -1;
    for (var i = 0; i < this.features.length; i++) {
      if (this.features[i].id === id) {
        index = i;
        break;
      }
    }
    return index
  }

  onSubmit(){
    const formData = new FormData();
    this.features.forEach((feature, index) => {
      formData.append(`feature-${index}`, JSON.stringify({name:feature.name,order_index:feature.order_index}));
      formData.append(`image-${index}`, feature.image, feature.image.name);
    });

    this.uiconfigService.createFeatures(formData)
  }

  handleImageUpload(event: any) {
    this.feature.image = event.target.files[0];
    this.featureImageUrl = URL.createObjectURL(this.feature.image);
    this.activateButtons = !this.featureActivateButtons()

    if(this.editMode){
      // lastCube.style.backgroundImage = `url(${this.feature.imgUrl})`;
    }
  }

  inputKeyupButtonsActivator(){
    this.activateButtons = !this.featureActivateButtons()
    if(this.features?.length == null){
      this.submitButtonDisabled = false
    }
  }
  
  removeFeature(featureId:string){
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: `Remove a feature ?`,
      text:`Which action will you like to perform`,
      showConfirmButton: true, // Display the "OK" button
      showCancelButton: true, // Display the "Cancel" button
      confirmButtonText: 'Remove Option', // Text for the "OK" button
      cancelButtonText: 'Delete', // Text for the "Cancel" button
      allowOutsideClick: false,
      timer: undefined
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.features = this.deleteObjectFromArray(this.features,parseInt(featureId))
      } else if (result.isDismissed) {}
      this.updatePositions()
      console.log(this.features)
    });
  }

  featureActivateButtons(){
    return this.feature?.name?.trim() != '' && this.feature?.name.length > 0 && isNaN(this.feature.order_index) == false && this.feature.image != null;
  }

  submitActivate(){
    return this.feature?.name?.trim() == '' && this.feature?.name.length == 0 && isNaN(this.feature.order_index) == true && this.feature.image == null;
  }

  editFeatures(){
    this.showFeatureSpinner = true;
    this.editMode = true
    this.uiconfigService.getFeatures().subscribe(
      (response:any) => {
        this.showFeatureSpinner = false;
        this.features = response.data
        console.log('Features fetched successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }

  saveFeaturesUpdate(){
    this.showFeatureUpdateSpinner = true
    setTimeout(()=>{
      this.showFeatureUpdateSpinner = false
      this.editMode = false
    },3000)
  }

}

class Services{
  public services:any[] = []
  public service:any = {}
  public serviceImageUrl:any = ''
  public activateButtons:boolean = true;
  public submitButtonDisabled:boolean = true
  public showServiceSpinner:boolean = false;
  public showServiceUpdateSpinner:boolean = false;

  constructor(public uiconfigService: UiconfigService){}  

  public addService(){
    this.service['id'] = this.services.length + 1
    if(this.service.name.trim() != ''){
      this.service.order_index = parseInt(this.service.order_index)
      this.service.imgUrl = this.serviceImageUrl
      this.services.push(this.service)

      setTimeout(()=>{
        const els:any = document.querySelectorAll('.service-cube')
        const lastCube = els[els.length - 1];
        lastCube.style.backgroundImage = `url(${this.service.imgUrl})`;
        this.service = {}
        this.activateButtons= true
        if(this.services.length > 0 && !this.submitActivate()){
          this.submitButtonDisabled = false
        }
      },50)
    }
    
  }

  public getObjectFromArrayByName(arr:any[],name:string){
    const obj:any = arr.find(x => x.name === name);
    return obj
  }

  public deleteObjectFromArray(arr:any[],id:number){
    const obj:any = arr.find(x => x.id === id);
    let newObj:any = []
    arr.forEach((arrObj)=>{
      if (arrObj.id != obj.id){
        newObj.push(arrObj)
      }
    })
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
    const targetObj = this.getObjectFromArrayByName(this.services,data.replaceAll("'",""))
    const targetId = this.getObjectFromArrayByName(this.services,event.target['innerText'].replaceAll("'","")).id
    const targetIdDrag= targetObj.id
    const dropIndex = this.getObjectIndex(targetId)
    const dragIndex = this.getObjectIndex(targetIdDrag)
    const img = targetObj.image

    if (dragIndex !== -1 && dropIndex !== -1) {
      this.services.splice(dragIndex, 1);
      this.services.splice(dropIndex, 0, {name:data,id:targetIdDrag,image:img,imgUrl:targetObj.imgUrl});
      setTimeout(()=>{
        const target:any = document.getElementById(`service-cube-${targetIdDrag}`)
        target.style.backgroundImage = `url(${targetObj.imgUrl || 'http://127.0.0.1:8080/media/'+targetObj.image})`;
      },50)
    }
  }

  public getObjectIndex(id){
    var index = -1;
    for (var i = 0; i < this.services.length; i++) {
      if (this.services[i].id === id) {
        index = i;
        break;
      }
    }
    return index
  }

  onSubmit(){
    const formData = new FormData();
    this.services.forEach((service, index) => {
      formData.append(`service-${index}`, JSON.stringify({name:service.name,order_index:service.order_index}));
      formData.append(`image-${index}`, service.image, service.image.name);
    });
    this.uiconfigService.createServices(formData)
  }

  handleImageUpload(event: any) {
    this.service.image = event.target.files[0];
    this.serviceImageUrl = URL.createObjectURL(this.service.image);
    this.activateButtons = !this.serviceActivateButtons()
  }

  inputKeyupButtonsActivator(){
    this.activateButtons = !this.serviceActivateButtons()
    if(this.services?.length == null){
      this.submitButtonDisabled = false
    }
  }
  
  removeService(serviceId:string){
    this.services = this.deleteObjectFromArray(this.services,parseInt(serviceId))
  }

  serviceActivateButtons(){
    return this.service?.name?.trim() != '' && this.service?.name.length > 0 && isNaN(this.service.order_index) == false && this.service.image != null;
  }

  submitActivate(){
    return this.service?.name?.trim() == '' && this.service?.name.length == 0 && isNaN(this.service.order_index) == true && this.service.image == null;
  }

  editServices(){
    this.showServiceSpinner = true;
    this.uiconfigService.getServices().subscribe(
      (response:any) => {
        this.showServiceSpinner = false;
        this.services = response.data
        console.log('Services fetched successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }
}

@Component({
  selector: 'app-uiconfig',
  templateUrl: './uiconfig.component.html',
  styleUrls: ['./uiconfig.component.css']
})
export class UiconfigComponent {
  public featureCls:any
  public serviceCls:any

  constructor(public uiconfigService: UiconfigService){
    this.featureCls = new Feature(this.uiconfigService)
    this.serviceCls = new Services(this.uiconfigService)
    
  }

  ngOnInit(){
    
  }

  
}