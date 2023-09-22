import { Component } from '@angular/core';
import { take } from 'rxjs';
import { PaginationService } from 'src/app/services/common/pagination.service';
import { SpinnerService } from 'src/app/services/common/spinner.service';
import { RoomXService } from 'src/app/services/rooms/room-x.service';

@Component({
  selector: 'app-recent-checkout',
  templateUrl: './recent-checkout.component.html',
  styleUrls: ['./recent-checkout.component.css']
})
export class RecentCheckoutComponent {
  public rooms:any[] = []
  is_search:any;
  showSpinner:boolean = false;
  showAlert:Boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; 
  alertBackgroundColor: string = '#ffc107';

  constructor(private roomsXService: RoomXService, 
    private spinnerService: SpinnerService, private paginationService: PaginationService){}

  ngOnInit(){
    this.showSpinner = true;
    this.roomsXService.getRecentCheckedOutRooms().pipe(
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
          this.alertBackgroundColor = '#1aa51a';
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

  markAsReady(roomId:string){
    const proceed:boolean = confirm('Are you sure you intend marking this room as ready?')
    if (!proceed){return proceed}
    this.showSpinner = true
    this.roomsXService.markRoomAsReady(roomId).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.rooms = this.deleteObjectFromArray(this.rooms,parseInt(roomId))
          this.alertDuration = 3000; 
          this.alertBackgroundColor = '#1aa51a';
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
    return null
  }
}
