import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Godown, SubCategory } from '../DataClass/data';
import { ProductApiService } from '../service/product-api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

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
    name: new FormControl('',[Validators.requiredTrue,Validators.minLength(4)]),
    category: new FormControl('',Validators.requiredTrue),
    sub_Category: new FormControl('',Validators.requiredTrue),
    unit: new FormControl('PIECE',Validators.requiredTrue),
    barcode: new FormControl('',Validators.required),
    hsn_Code: new FormControl('0'),
    gst: new FormControl('',Validators.requiredTrue),
    cess: new FormControl('0'),
    opening_Stock: new FormControl('0',Validators.required),
    current_Stock: new FormControl('0',Validators.requiredTrue),
    purchase_Rate: new FormControl('',Validators.requiredTrue),
    cost: new FormControl('',Validators.required),
    retail_Rate: new FormControl('',Validators.requiredTrue),
    whole_Rate: new FormControl('',Validators.requiredTrue),
    mrp: new FormControl('',Validators.requiredTrue)
    
}); 
  constructor(private productService : ProductApiService,private fb:FormBuilder,
                private http: HttpClient ) { }

  ngOnInit(): void {
    this.getCategory();
    this.pid();
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
    this.product.get('barcode')?.setValue(this.p_id);
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
    }
    chekprice(){

    }

  save(){
    
    this.product.get('productID')?.setValue(this.p_id);
    console.log(this.product.value)
    this.productService.saveProduct(this.product.value).subscribe(res=>{
      console.log(res)
    });
  }
}