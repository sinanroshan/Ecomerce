import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {
  adds:FormGroup = this.fb.group({
    add1: new FormControl(''),
    add2: new FormControl(''),
    add3: new FormControl(''),
    add4: new FormControl(''),
    add5: new FormControl(''),})

  constructor(private fb:FormBuilder,private productService : ProductApiService) { }

  ngOnInit(): void {
  }
  SetImage(event:any){
    let file = event.target.files[0];
    let id= event.target.id;
    this.productService.saveImg(file,"Add",id).subscribe(res=>{
      switch(id){
        case "add1":{this.adds.get('add1')?.setValue(res)}
          break;
        case "add2":{this.adds.get('add2')?.setValue(res)}
          break;
        case "add3":{this.adds.get('add3')?.setValue(res)}
          break;
        case "add4":{this.adds.get('add4')?.setValue(res)}
          break;
        case "add5":{this.adds.get('add5')?.setValue(res)}
          break;
      }
    });
  }
  submit(){
    this.productService.updateAdds(this.adds.value).subscribe(res=>{
      if(res=="sved"){
        window.location.reload();
      }
    })
  }
}
