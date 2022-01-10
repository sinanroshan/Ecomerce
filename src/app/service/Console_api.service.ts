import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Company, Godown, Invoice, OrderData, Products, SubCategory } from '../DataClass/data';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  //private ip="192.168.1.2"
  private ip="localhost";
  private productApi="http://"+this.ip+":9090/";

  constructor(private http: HttpClient) { }
  login(Key:any):Observable<any>{
    return this.http.get(this.productApi+'/console/Auth/'+Key,{responseType:'text'})
  }

  company(){
    return this.http.get<Company>(this.productApi+'/api/company',{responseType:'json'})
  }
  getProductList(){
   return this.http.get<Products[]>(this.productApi+'console/Allproducts');
  }
  public getSuperCategory() {
    return this.http.get<Godown[]>(this.productApi+`api/super_category`);
  } 
  getSubCategory(sCategory: string){
    return this.http.get<SubCategory[]>(this.productApi+`api/category/`+sCategory);
  }
  getProductId(){
    return this.http.get<string>(this.productApi+'console/pid');
  }
  getSugessionList(key:string){
    return this.http.get(this.productApi+'console/keyword/'+key)
  }

  saveImg(File:File,filename:string,Type:string):Observable<any>{
    let formdata = new FormData();
    formdata.append("imageFile",File,File.name)
    formdata.append('type',Type)
    formdata.append('name',filename)

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data; charset=utf-8');
    headers.set('Accept', 'application/json');
    console.log(formdata)
    return this.http.post(this.productApi+'console/SaveImage/',formdata,{ headers : headers,
      reportProgress: true,
      responseType: 'text'})
  }
  saveProduct(Product:Products):Observable<any>{
    return this.http.post(this.productApi+'console/AddProduct',Product,{responseType: 'text'});
  }
  UpdateProduct(Product:any, key:any):Observable<any>{
    return this.http.post(this.productApi+'console/EditProduct/'+key+'/',Product,{responseType: 'text'});
  }
  getOrders(){
    return this.http.get<OrderData[]>(this.productApi+'console/orders')
  }
  getOrderDetails(invNO:any){
    return this.http.get<Invoice[]>(this.productApi+'api/getinvoice/'+invNO)
  }
  updateCompanyDetails(company:any):Observable<any>{
    return this.http.post(this.productApi+'api/editCompanyData',company,{responseType: 'text'});
  }
  getLedgerReport(pname:string){
    this.http.get(this.productApi+'console/keyword/'+pname)
  }
}
