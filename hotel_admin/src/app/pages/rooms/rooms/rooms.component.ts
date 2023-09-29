import { Component } from '@angular/core';
import { take } from 'rxjs';
import { PaginationService } from 'src/app/services/common/pagination.service';
import { SpinnerService } from 'src/app/services/common/spinner.service';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  public rooms:any[] = []
  is_search:any;
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = '';
  alertDuration: number = 5000; 
  alertBackgroundColor: string = '#ffc107';

  constructor(private roomsXService: RoomXService, 
    private spinnerService: SpinnerService, private paginationService: PaginationService){}

  ngOnInit(){
    this.showSpinner = true;
    this.roomsXService.getrooms().pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.rooms = response.data
          for (let room of this.rooms){
            if(room.occupant == null){
              room.occupant = {}
            }
          }
          this.paginationService.setLinks(response.next,response.last,'rooms-list','',this.is_search)
          this.alertDuration = 3000; 
          this.alertBackgroundColor = '#423f3f';
        }
        else{
          this.alertDuration = 3000; 
          this.alertBackgroundColor = 'rgb(225 31 64)'; 
        }
        this.showAlert = true
      },
      (error: any) => {
        this.showSpinner = false;
        this.alertDuration = 3000;
        this.alertBackgroundColor = 'rgb(225 31 64)';
        this.showAlert = true
      }
    );
    this.paginateSubscription()
  }

  ngAfterViewInit(){
    this.spinnerService.getSpinner().subscribe((status:any)=>{
      console.log(status)
      this.showSpinner = status
    })
  }

  paginateSubscription(){
    this.paginationService.dataEvent.subscribe((response: any) => {
      if(response.status){
        this.paginationService.setLinks(
                                        response.next,
                                        response.last,
                                        'rooms-list',
                                        response.query,
                                        this.is_search
                                        )
        this.rooms = response.data
        for (let room of this.rooms){
          if(room.occupant == null){
            room.occupant = {}
          }
        }
      }
      else{}
    });
  }

  receivePaginationData(response:any){
    // this.customers$ = of(response?.data) || []
  }
}
