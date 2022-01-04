import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../DataClass/data';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
companyBackup:Company;
editMode=true

  company:FormGroup= this.fb.group({
    name:new FormControl(''),
    phone:new FormControl(''),
    email:new FormControl('',[Validators.required]),
    address1:new FormControl('',[Validators.required]),
    addres2:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    //pin:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
    website:new FormControl(''),
    gstNo:new FormControl('',[Validators.required]),
    bank:new FormControl(''),
    bankBranch:new FormControl(''),
    bankIfce:new FormControl(''),
    bankAccNO:new FormControl(''),
    logo:new FormControl(''),
}); 

  constructor(private productService : ProductApiService,
                private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.productService.company().subscribe(res=>{
      this.companyBackup=res;
       this.company.setValue(res)
          })

  }
  EnableEdit(){
   this.editMode= !this.editMode;
   console.log(this.editMode)
   if(this.editMode==true){this.company.setValue(this.companyBackup) }
  }
  SetImage(event:any){
    let file;
    let FileName=this.company.get('name')?.value;
    file = event.target.files[0];
    this.productService.saveImg(file,FileName,"Logo").subscribe(res=>{
        this.company.get('logo')?.setValue(res)
    });
  }
  submit(){
    this.productService.updateCompanyDetails(this.company.value).subscribe(res=>{
      if(res=="Updated"){
        window.location.reload();
      }
    })
  }
}
