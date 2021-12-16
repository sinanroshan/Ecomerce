import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/service/product-api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  product:any;
  loading: boolean = true;
  constructor(private productApi : ProductApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productApi.getProductList().subscribe(res=>{
      this.product=res;
      this.loading=false;
      console.log(this.product)
    });
  }
}
