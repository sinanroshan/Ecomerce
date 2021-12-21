import { Component, OnInit } from '@angular/core';
import { Editprod, Products } from 'src/app/DataClass/data';
import { ProductApiService } from 'src/app/service/product-api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  sortby:any =false;
  name:any;
  page:number = 1;

  product:Products[]=[];
  loading: boolean = true;
  constructor(private productApi : ProductApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productApi.getProductList().subscribe(res=>{
      this.product = res;
      this.loading=false;
    });
  }
  key:string='id';
  reverse:boolean=false;
    sort(key:string){
      this.key=key;
      this.reverse= !this.reverse;
  }
  search(event:any){
    this.name= event.target.value;
    console.log(this.name)
    if(this.name==""){this.getProducts()}
    else{
          this.product=this.product.filter(res=> {
          return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
          });
        }
  }
  editProduct(editProduct:Editprod){
    console.log(editProduct)
  }
}
