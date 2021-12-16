import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username="";
  password="";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
login(){
  this.username= (<HTMLInputElement>document.getElementById('username')).value;
  this.password= (<HTMLInputElement>document.getElementById('password')).value;
  if(this.username && this.password =="admin"){
    this.router.navigate(['home'],{ replaceUrl: true });
  }
  
}
}
