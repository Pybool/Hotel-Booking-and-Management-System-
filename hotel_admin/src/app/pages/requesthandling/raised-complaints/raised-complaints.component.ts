import { Component, Renderer2 } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/common/auth.service';
import { RoomXService } from 'src/app/services/rooms/room-x.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-raised-complaints',
  templateUrl: './raised-complaints.component.html',
  styleUrls: ['./raised-complaints.component.css']
})
export class RaisedComplaintsComponent {
  public raiseNewComplaint:boolean = false
  showAlert:boolean = false;
  is_search:boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color
  public rooms:any = []
  public staffs:any = []
  public complaints:any = []
  public complaint:any = {}
  public showSpinner:boolean = false;
  srcValues:any = []
  constructor(private roomsXService: RoomXService, 
              private authService: AuthService,
              private renderer: Renderer2,){
    this.srcValues = [
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"
    ]
  }

  toggleRaiseNewComplaint(){
    this.raiseNewComplaint = !this.raiseNewComplaint
    setTimeout(()=>{
      const selectRooms:any = document.querySelector('#rooms-select')
      console.log("==============> ",selectRooms)
     
      $(document).ready(function() {
        $('#rooms-select').select2()
    });
    },500)
  }
  
  ngOnInit(){
    this.showSpinner = true
    this.roomsXService.getrooms().pipe(take(1))
    .subscribe((response: any) => {
        this.alertMessage = response?.message;
        if(response.status){
          this.rooms = response.data
          for (let room of this.rooms){
            if(room.occupant == null){
              room.occupant = {}
            }
          }
        }
    });
    this.authService.getStaff({}).pipe(take(1))
    .subscribe((response: any) => {
        if(response.status){
          this.staffs = response.data
        }
    });

    this.roomsXService.getRaisedComplaints().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);

        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.complaints = response.data
          // this.paginationService.setLinks(response.next,response.last,'staff-list','',this.is_search)
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

  onSubmit(){
    console.log(this.complaint)
    this.roomsXService.raiseComplaint(this.complaint).pipe(take(1)).subscribe((response:any)=>{
      alert(response.message)
    })
  }


  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.srcValues.forEach((src)=>{
        this.loadScript(src);
      })
    },500)
    
  }
  loadScript(src:string) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.querySelector('#roots'), script);
  }


}
