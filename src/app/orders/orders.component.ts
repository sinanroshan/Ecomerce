import { Component, OnInit } from '@angular/core';
import { OrderData } from '../DataClass/data';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
oreders:OrderData[]=[];
ordersBackUp:OrderData[]=[]
loading: boolean = true;
FromDate:any
ToDate:any

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
  constructor(private productApi : ProductApiService) { }

  ngOnInit(): void {
   this.productApi.getOrders().subscribe(res=>{
     this.oreders=res
     console.log(this.oreders)
   })
  }
  filter(){
    this.oreders=this.ordersBackUp;
    this.FromDate= (<HTMLInputElement>document.getElementById('fromDate')).value;
    this.ToDate= (<HTMLInputElement>document.getElementById('toDate')).value;
    console.log(this.FromDate+" ---- "+this.ToDate)
    //if(this.FromDate==""){
    //  this.oreders=this.ordersBackUp;
   // }
    //else{
          //this.oreders=this.ordersBackUp;
          this.oreders=this.oreders.filter(res => res.orderDate >=this.FromDate && res.orderDate<= this.ToDate )
       // }
       console.log(this.oreders)
  }

  onPageChange(event:any){
    this.config.currentPage = event;
  }

}
