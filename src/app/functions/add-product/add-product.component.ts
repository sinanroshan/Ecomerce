import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductApiService } from 'src/app/service/product-api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product:FormGroup=this.fb.group({
    name:['',Validators.required],
    phone:['',[Validators.required,Validators.maxLength(11),Validators.minLength(10)]],
    address1:[''],
    address2:[''],
    mail:['',Validators.email],
    gstin:[''],
    type:['',Validators.required],
    openingbalance:['0',Validators.required],
    emptype:[''],
    username:[''],
    password:[''],
    confirmpassword:['']
  })

  SuperCategoryList:any|[]
  categoryList:any;

  constructor(private productApi : ProductApiService, 
              public fb: FormBuilder ) { }
  

  ngOnInit(): void {
    this.productApi.getSuperCategory().subscribe(res=>{
      this.SuperCategoryList=res;
      //console.log(this.SuperCategoryList)
    });
  }
getSubcategory(){
  //this.productApi.getProductByCategory(this.productName).subscribe(res=>{
   // this.category=res;
  //})
}
Submit(){
  console.log(this.product);
}

}
