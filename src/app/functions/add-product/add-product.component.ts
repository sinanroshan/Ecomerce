import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductApiService } from 'src/app/service/product-api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProduct=true;
  UpdateProduct=false;
  SuperCategoryList:any|[]
  categoryList:any;
  
  constructor(private productApi : ProductApiService,private fb:FormBuilder,) { }
  
  
  
  ngOnInit(): void {
    this.productApi.getSuperCategory().subscribe(res=>{
      this.SuperCategoryList=res;
      console.log(this.SuperCategoryList)
    });
    
    console.log(this.SuperCategoryList)
  }
getSubcategory(){
  console.log("cliked")
  //this.productApi.getProductByCategory(this.productName).subscribe(res=>{
   // this.category=res;
  //})
}

}
