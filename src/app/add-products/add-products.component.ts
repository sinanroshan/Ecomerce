import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Godown, Products, SubCategory } from '../DataClass/data';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  url:any;
  EditProduct:boolean=false;
  updatekey:any;

  FileName:any;
  file:any;
  Type:any;
  productBackup:Products;

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
    barcode: new FormControl(''),
    hsn_Code: new FormControl('0'),
    gst: new FormControl('',Validators.required),
    cess: new FormControl('0'),
    opening_Stock: new FormControl(Number,Validators.required),
    current_Stock: new FormControl(0,Validators.required),
    purchase_Rate: new FormControl('',Validators.required),
    cost: new FormControl('',Validators.required),
    retail_Rate: new FormControl(null,[Validators.required]),
    whole_Rate: new FormControl('',Validators.required),
    mrp: new FormControl('',Validators.required),
    discription:new FormControl('',Validators.required),
    keyImage: new FormControl('',Validators.required),
    image1: new FormControl('',Validators.required),
    image2: new FormControl('',Validators.required),
    image3: new FormControl('',Validators.required),
    image4: new FormControl('',Validators.required)
}); 
  constructor(private productService : ProductApiService,private fb:FormBuilder,
              private router:Router,private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.productBackup=this.product.value;
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
    this.productBackup=this.product.value;
  }
  rest(){
    this.product.reset();
    this.router.navigate(['/products']);
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
    if(this.product.get('barcode')?.value==""){
    this.product.get('barcode')?.setValue(this.p_id);}
  }
    setCost(){
      let prate=this.product.get('purchase_Rate')?.value;
      let tax= ((this.product.get('gst')?.value) /100 ) * prate;
      this.product.get('cost')?.setValue(prate + tax);
      //if((this.product.get('cost')?.value)>(this.product.get('retail_Rate')?.value)){
        //this.product.controls['retail_Rate'].setErrors({ 'incorrect': true});}
        //else{this.product.controls['retail_Rate'].setErrors({ 'incorrect': false});}
    }
    SetImage(event:any){
      if(this.p_id==""){this.FileName=this.product.get('productID')?.value;}
      else{this.FileName=this.p_id}
      this.file = event.target.files[0];
      this.Type=(event.target.id);
      this.productService.saveImg(this.file,this.FileName,this.Type).subscribe(res=>{
        switch(this.Type){
          case "keyimg":{this.product.get('keyImage')?.setValue(res)}
            break;
          case "img1":{this.product.get('image1')?.setValue(res)}
            break;
          case "img2":{this.product.get('image2')?.setValue(res)}
            break;
          case "img3":{this.product.get('image3')?.setValue(res)}
            break;
          case "img4":{this.product.get('image4')?.setValue(res)}
            break;
        }
      });
    }
    Submit(){
      if(this.product.valid){
      const openingStock:number=parseInt(this.product.get('opening_Stock')?.value);
      const currentStock:number=parseInt(this.product.get('current_Stock')?.value);
      const sum:number=openingStock+currentStock
      this.product.get('current_Stock')?.setValue(sum)
      this.product.get('opening_Stock')?.setValue(0)
      if(this.EditProduct){
        this.UpadteProduct();
      }else{
        this.save();
      }}
    }
  save(){
    this.pid();
    this.productService.saveProduct(this.product.value).subscribe(res=>{
      if(res=='sved'){
        this.rest()
      }
    });
  }
  UpadteProduct(){
    this.productService.UpdateProduct(this.product.value,this.updatekey).subscribe(res=>{
      if(res=='Updated'){
        this.rest()
      }
    });
  }
  reset(){
      this.product.setValue(this.productBackup);
  }

}