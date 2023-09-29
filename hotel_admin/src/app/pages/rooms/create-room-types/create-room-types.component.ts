import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AmenitiesService } from 'src/app/services/rooms/amenities.service';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

@Component({
  selector: 'app-create-room-types',
  templateUrl: './create-room-types.component.html',
  styleUrls: ['./create-room-types.component.css']
})
export class CreateRoomTypesComponent {
  public bedTypes = []
  public amenities = []
  public roomtype:any = {}
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  formData = {
    data: '',
    image: null,
  };

  constructor(private amenitiesService:AmenitiesService, private roomService: RoomXService){}

  ngOnInit(){
    this.amenitiesService.getAmenities().pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.amenities = response.data
      }
    })

    this.roomService.getBedtype().pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.bedTypes = response.data
      }
    })
  }
  onSubmit(){
    this.showSpinner = true
    const formData = new FormData();
    console.log(this.roomtype,this.formData.image)
    formData.append('data', JSON.stringify(this.roomtype));
    formData.append('image', this.formData.image);
    console.log(formData)

    this.roomService.createRoomtype(formData).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#423f3f'; // Alert yellow color
        }
        else{
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        }
        this.showAlert = true
      },
      (error: any) => {
        console.error('An error occurred in the subscription:', error);
        this.showSpinner = false;
        this.alertDuration = 3000; // 5 seconds
        this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        this.showAlert = true
        // Handle the error here, if needed
      }
    );
  }

  handleImageUpload(event: any) {
    this.formData.image = event.target.files[0];
    console.log(this.formData.image)
  }

}


// {    "name": "Deluxe",    "bed_type": 1,    "no_occupants": 2,    "no_children": 2,    "no_xtra_adults": 1,    "amenities": 1}
