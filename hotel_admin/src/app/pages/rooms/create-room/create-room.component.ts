import { Component } from '@angular/core';
import { take } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { AmenitiesService } from 'src/app/services/rooms/amenities.service';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  public roomTypes = []
  public amenities:any = []
  public floors = []
  public room:any = {}
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  formData = {
    data: '',
    image: null,
  };

  constructor(private roomService: RoomXService, private hotelService: HotelService, private amenitiesService: AmenitiesService){}

  ngOnInit(){

    this.amenitiesService.getAmenities().pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.amenities = response.data
      }
    })

    this.hotelService.getFloors().pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.floors = response.data
      }
    })

    this.roomService.getRoomTypes().pipe(
      take(1)
    ).subscribe((response:any)=>{
      if(response.status){
        this.roomTypes = response.data
      }
    })
  }
  onSubmit(){
    this.showSpinner = true
    const formData = new FormData();
    console.log(this.room,this.formData.image)
    formData.append('data', JSON.stringify(this.room));
    formData.append('image', this.formData.image);
    console.log(formData)

    this.roomService.createroom(formData).pipe(
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


// {    "room_type": 1,    "floor": 1,    "room_no": "001",    "dial_no": "070-001"}