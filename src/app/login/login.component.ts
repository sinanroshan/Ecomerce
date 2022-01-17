import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:FormGroup= this.fb.group({
    username:(''),
    password:('')
  })
  key:string;
  constructor(private router:Router,private fb:FormBuilder,
                private productApi : ProductApiService) { }

  ngOnInit(): void {
  }
  login(){
    let loginString=this.user.get('username')?.value+':'+this.user.get('password')?.value;
    let encodedKey=btoa(loginString)
    this.productApi.login(encodedKey).subscribe(res=>{
      if(res=="error")
      {
        localStorage.removeItem('Token');
      }else{
        this.key=btoa(res);
        sessionStorage.setItem('token', 'key');
        this.router.navigate([''],{ replaceUrl: true })
        }
      },err=>{
        console.log("failed")
      });
          
  }
  
}
