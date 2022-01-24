import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice, OrderData } from '../DataClass/data';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
oreders:OrderData[]=[];
ordersBackUp:OrderData[]=[]
selectedOrder:OrderData
invoice:Invoice[]=[]
loading: boolean = true;
FromDate:any
ToDate :any


config = {
  itemsPerPage: 50,
  currentPage: 1,
  totalItems: this.oreders.length
};
public maxSize: number = 7;
public directionLinks: boolean = true;
public autoHide: boolean = false;
public responsive: boolean = true;
public labels: any = {
    previousLabel: '<-',
    nextLabel: '->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
};
  constructor(private productApi : ProductApiService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
   this.productApi.getOrders().subscribe(res=>{
     this.oreders=res
     this.ordersBackUp=this.oreders
   })
  }

  filter(event:any){
    this.oreders=this.ordersBackUp;
    if(event.target.id=='fromDate'){
      
      this.FromDate=(<HTMLInputElement>document.getElementById('fromDate')).value;
      
    }else{
    this.ToDate=  (<HTMLInputElement>document.getElementById('toDate')).value}
      this.oreders=this.oreders.filter(res => res.orderDate >= this.FromDate && res.orderDate<= this.ToDate )
  }

  showOrder(orderDetails: any, inv:OrderData) {
    this.selectedOrder=inv
    this.productApi.getOrderDetails(this.selectedOrder.invno).subscribe(res=>{
      this.invoice=res
    })
    this.modalService.open(orderDetails, { centered: true , size:'xl',backdrop: 'static'});
  }
  closemodel(orderDetails:any){
    this.modalService.dismissAll(orderDetails)
  }
  onPageChange(event:any){
    this.config.currentPage = event;
  }


  placeOrder(plcOrder:any){
    this.modalService.open(plcOrder, { centered: true , size:'sm',backdrop: 'static'});
  }
  cnfrmPlaceOrder(plcOrder:any){
    
  }
}
