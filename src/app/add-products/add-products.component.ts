import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Godown, SubCategory } from '../DataClass/data';
import { ProductApiService } from '../service/product-api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  url:any;
  EditProduct:boolean=false;
  updatekey:any;
  selecetdFile : any;
  imagePreview: any;
  ListGodown:Godown[]=[];
  ListSubCatgory:SubCategory[]=[];
  p_id="";
  p_nameList:any;
  unit_list: string[]=["PIECE", "PACK", "CENTURY", "BOX", "BOTTLE", "CAN", "NOS", "DOZEN", 
  "KG", "GRAM","LITRE", "MILILITRE", "METER", "SET", "TUBE", "YARD", "PAIR", "BUNDLE"];
   
  product:FormGroup = this.fb.group({
    productID: new FormControl(''),
    name: new FormControl('',[Validators.required,Validators.minLength(4)]),
    category: new FormControl(null,Validators.required),
    sub_Category: new FormControl(null,Validators.required),
    unit: new FormControl('PIECE',Validators.required),
    barcode: new FormControl(null,Validators.required),
    hsn_Code: new FormControl('0'),
    gst: new FormControl('',Validators.required),
    cess: new FormControl('0'),
    opening_Stock: new FormControl('0',Validators.required),
    current_Stock: new FormControl('0',Validators.required),
    purchase_Rate: new FormControl('',Validators.required),
    cost: new FormControl('',Validators.required),
    retail_Rate: new FormControl(null,[Validators.required]),
    whole_Rate: new FormControl('',Validators.required),
    mrp: new FormControl('',Validators.required),
    kayImage: new FormControl(''),
}); 
  constructor(private productService : ProductApiService,private fb:FormBuilder,
                private http: HttpClient,private router:Router,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.url = this.router.url;     
     this.getCategory();
    if(this.url== "/product/inventory"){
      this.pid();
    }else{
      let a:any =this.route.snapshot.paramMap.get('edit');
      this.EditProduct=true;
      this.product.setValue(JSON.parse(atob(a)))
      this.updatekey=this.product.get('name')?.value;
      console.log(this.product.value);
    }
  }
  getCategory(){
    this.productService.getSuperCategory().subscribe( res=>{
      this.ListGodown=res;
    })
  }
  getSubcategory($event:any){
    let sub=$event.target.value;
    this.productService.getSubCategory(sub).subscribe(res=>{
      this.ListSubCatgory=res;
    })
  }
 getPnameSugssion(event:any){
   let pname:string =event.target.value;
   if(pname.length>2){
   this.productService.getSugessionList(pname).subscribe(res=>{
     this.p_nameList=res;
   })
  }
 }
  pid(){
    this.productService.getProductId().subscribe(res=>{
      this.p_id=res;
    });
    this.product.get('productID')?.setValue(this.p_id);
    if(this.product.get('barcode')?.value==null){
    this.product.get('barcode')?.setValue(this.p_id);}
  }

  onFileUpload(event:any){
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
    }
    OnUploadFile() {
    this.http.post('../assets', this.selecetdFile)
    }
    setCost(){
      let prate=this.product.get('purchase_Rate')?.value;
      let tax= ((this.product.get('gst')?.value) /100 ) * prate;
      this.product.get('cost')?.setValue(prate + tax);
      //if((this.product.get('cost')?.value)>(this.product.get('retail_Rate')?.value)){
        //this.product.controls['retail_Rate'].setErrors({ 'incorrect': true});}
        //else{this.product.controls['retail_Rate'].setErrors({ 'incorrect': false});}
    }
    chekprice(){
    }
    Submit(){
      if(this.EditProduct){
        this.UpadteProduct();
      }else{
        this.save();
      }
    }
  save(){
    this.pid();
    //this.product.get('productID')?.setValue(this.p_id);
    console.log(this.product.value)
    this.productService.saveProduct(this.product.value).subscribe(res=>{
      console.log(res)
    });
  }
  UpadteProduct(){
    console.log(this.product.value)
    this.productService.UpdateProduct(this.product.value,this.updatekey).subscribe(res=>{
      console.log(res)
    });
  }

}