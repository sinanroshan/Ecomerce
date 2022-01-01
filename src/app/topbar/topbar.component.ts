import { Component, OnInit } from '@angular/core';
import { Company } from '../DataClass/data';
import { ProductApiService } from '../service/Console_api.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
company:Company[]

  constructor(private productApi : ProductApiService) { }

  ngOnInit(): void {
   this.productApi.company().subscribe(res=>{
     this.company=res
     console.log(this.company)
   })

  }

}
