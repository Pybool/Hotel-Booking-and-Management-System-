import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/common/auth.service';
import { PaginationService } from 'src/app/services/common/pagination.service';
import { SpinnerService } from 'src/app/services/common/spinner.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent {

  public staffs:any = []
  public staffDetails:boolean =false;
  public showSpinner:boolean = false
  public loadedStaff:any = {}
  public showComment:boolean = false;
  public commentText:string = ''
  public showCommentary = false;
  public commentaries:any[] = [];
  showingSacked:any
  staffRoles = []
  editSalaryTopUp = false
  showingArchive:boolean = false
  showAlert:boolean = false;
  is_search:boolean = false;
  alertMessage: string = 'This is a custom alert message.';
  alertDuration: number = 5000; // 5 seconds
  alertBackgroundColor: string = '#ffc107'; // Alert yellow color

  constructor(private authService:AuthService,
              private paginationService: PaginationService,
              private spinnerService:SpinnerService){

  }

  ngOnInit(){
    this.showSpinner = true;
    this.authService.getStaffRoles().pipe(take(1)).subscribe((response:any)=>{
      if(response.status){
        this.staffRoles = response.data
      }
    })
    this.authService.getStaff({}).pipe(
      take(1)
    ).subscribe(
      (response: any) => {
        console.log(response);

        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.staffs = response.data
          this.paginationService.setLinks(response.next,response.last,'staff-list','',this.is_search)
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
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
      // Here you can access the emitted data
      if(response.status){
        this.paginationService.setLinks(
                                        response.next,
                                        response.last,
                                        'staff-list',
                                        response.query,
                                        this.is_search
                                        )
        this.staffs = response.data
      }
      else{}
    });
  }

  receivePaginationData(response:any){
    // this.customers$ = of(response?.data) || []
  }

  private getObjectFromArray(arr:any[],id:number){
    console.log(arr, id)
    const obj:any = arr.find(x => x.id === id);
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

  showStaffDetails($event:any){
    this.staffDetails = true;
    this.loadedStaff = this.getObjectFromArray(this.staffs,parseInt($event.target.closest('td').id || $event.target.closest('a').id))
    console.log(this.loadedStaff)
  }

  closeStaffDetails($event:any){
    this.staffDetails = false;
  }

  storeStaff(id=''){
    console.log("Loaded staff ", this.loadedStaff)
    if(id != ''){
      this.loadedStaff = this.getObjectFromArray(this.staffs,parseInt(id))
    }
    window.localStorage.setItem('staff', JSON.stringify(this.loadedStaff))
  }

  showCommentWidget(){
    this.showComment = true;
  }

  isTyping($event:any){
    // this.commentText = commentText.textContent
  }

  addComment(){
    const commentTypeEl:any = document.getElementById('comment-select')
    const commentTextEl:any = document.getElementById('comment-text')
 
    const commentType = commentTypeEl.value
    const commentText:any = commentTextEl
    console.log(commentTextEl)
    this.commentText = commentText.textContent
    const commentary = {id:this.loadedStaff.id,comment_type:commentType, comment:this.commentText, comment_by:''}
    console.log("Commentary ===> ", commentary)

    this.authService.addCommentary(commentary).subscribe(
      (response: any) => {
        console.log(response);

        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
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

  suspendStaff(id){
    alert(`Staff ${id} suspended`)
  }

  staffCommentary(id=null){
    const idToUse = id == null ? this.loadedStaff.id : parseInt(id);

    this.authService.getStaffCommentary(idToUse).subscribe(
      (response: any) => {        
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.commentaries = response.data
          this.showCommentary = true
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
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
      }
    );
  }

  archiveStaff(reverse=false){
    this.authService.archiveStaff(this.loadedStaff.id,reverse).subscribe(
      (response: any) => {
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.staffs = this.deleteObjectFromArray(this.staffs,this.loadedStaff.id)
          this.loadedStaff.is_archived = !this.loadedStaff.is_archived
          console.log(response.is_archive)
          if (!response.is_archive){
            console.log(this.showingArchive)
            if (this.showingArchive==false){
              this.staffs.push(this.loadedStaff)
            }
            else{
              this.staffs = this.deleteObjectFromArray(this.staffs,this.loadedStaff.id)
            }
            
          }
          else{
            if (this.showingArchive==true){
              this.staffs.push(this.loadedStaff)
            }
            
          }
          this.commentaries = response.data
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
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

  filterStaff($event:any){
    this.getStaffByProperty($event.target.value)
  }

  getStaffByProperty(property){
    this.authService.getStaffByProperty(property).subscribe(
      (response: any) => {
        console.log(response);
        if(property == 'is_archived'){
          this.showingArchive = true;
        }
        
        if(property == 'is_sacked'){
          this.showingSacked = true;
        }
        
        this.showSpinner = false;
        this.alertMessage = response?.message;
        if(response.status){
          this.staffs = response.data
          this.alertDuration = 3000; // 5 seconds
          this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
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

  editInlineSalaryTopUp($event,id=''){
    if (!$event){
      this.editSalaryTopUp = !this.editSalaryTopUp
    }
    else{
      const topup = $event.target.value
      const patch = {id:id,salary_topup:topup}
      this.patchStaffRecord(patch)
      try{this.loadedStaff.salary_topup = topup}
      catch{}
    }
    
  }

  patchUpdateClientUI(patch){
    Object.keys(patch).forEach((field)=>{
      this.loadedStaff[field] = patch[field]
    })
  }

  patchStaffRecord(patch){
    this.storeStaff(patch.id)
    this.authService.patchStaff(patch).pipe(take(1)).subscribe(
      (response:any)=>{
      this.alertMessage = response?.message;
      if (response.status){
        this.patchUpdateClientUI(patch)
        this.editSalaryTopUp = false
        this.showSpinner = false;
        this.alertDuration = 3000; // 5 seconds
        this.alertBackgroundColor = '#1aa51a'; // Alert yellow color
        this.showAlert = true
      }
      else{
        this.editSalaryTopUp = false
        this.showSpinner = false;
        this.alertDuration = 3000; // 5 seconds
        this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
        this.showAlert = true
      }
    },
    (error:any)=>{
      this.alertMessage = "This was not supposed to happen,something went wrong."
      this.editSalaryTopUp = false
      this.showSpinner = false;
      this.alertDuration = 3000; // 5 seconds
      this.alertBackgroundColor = 'rgb(225 31 64)'; // Alert yellow color
      this.showAlert = true
    })
  }

  closeCommentary(){
    this.showCommentary = false;
  }

  formatNumber(value: number): string {
    return value?.toLocaleString(); // This formats the number with a thousand separator
  }

}
