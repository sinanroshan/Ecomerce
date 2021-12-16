import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private ip="192.168.1.4"
  private product="http://"+this.ip+":9090/";

  constructor(private http: HttpClient) { }

  getProductList(){
   return this.http.get(this.product+'console/Allproducts');
  }
  getSuperCategory() :Observable<any>{
    return this.http.get(this.product+`api/super_category`);
  } 
   getProductByCategory(sCategory: string): Observable<any> {
    return this.http.get(this.product+`Allproducts/`+sCategory);
  }
}
