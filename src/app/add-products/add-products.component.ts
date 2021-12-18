import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  unit_list: string[]=["PIECE", "PACK", "CENTURY", "BOX", "BOTTLE", "CAN", "NOS", "DOZEN", "DRUM", 
  "KG", "GRAM", "KILOLITRE", "KM","LITRE", "QUINTAL", "MILILITRE", "METER", 
  "UNIT", "ROLL", "SET", "SQUARE FEET", "SQUARE METER", "SQUARE YARD", "TABLET",
   "TONNE", "TUBE", "YARD", "PAIR", "METRIC TON", "BUNDLE"];
   

  product:FormGroup = this.fb.group({
    productID: new FormControl(''),
    name: new FormControl('',[Validators.required,]),
    category: new FormControl('',Validators.required),
    sub_Category: new FormControl('',Validators.required),
    unit: new FormControl('',Validators.required),
    barcode: new FormControl('',Validators.required),
    hsn_Code: new FormControl('',Validators.required),
    gst: new FormControl('',Validators.required),
    cess: new FormControl('',Validators.required),
    opening_Stock: new FormControl('',Validators.required),
    current_Stock: new FormControl('',Validators.required),
    purchase_Rate: new FormControl('',Validators.required),
    cost: new FormControl('',Validators.required),
    retail_Rate: new FormControl('',Validators.required),
    whole_Rate: new FormControl('',Validators.required),
    mrp: new FormControl('',Validators.required)
    
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
    //Upload file here send a binary data
    this.http.post('../assets', this.selecetdFile)
    //.subscribe(...);
    }


  save(){
    this.product.get('productID')?.setValue(this.p_id);
    this.productService.saveProduct(this.product.value);
    console.log(this.product.value)
  }
}