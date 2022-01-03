import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../DataClass/data';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
companyData:Company;

  company:FormGroup= this.fb.group({
    name:new FormControl(''),
    phone:new FormControl('',[Validators.required,Validators.minLength(10)]),
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

  constructor(private productService : ProductApiService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.productService.company().subscribe(res=>{
      this.companyData=res;
       this.company.setValue(this.companyData)
       
          })

  }
  setData(){
    //this.company.setValue(JSON.stringify(this.companyData))
  }

}
