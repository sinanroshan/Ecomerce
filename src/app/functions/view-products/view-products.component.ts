import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editprod, Ledger, Products } from 'src/app/DataClass/data';
import { ProductApiService } from 'src/app/service/Console_api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  sortby:any =false;
  name:any;
  page:number = 1;

  ledger:Ledger[];
  product:Products[]=[];
  productBackup:Products[]=[];
  loading: boolean = true;

  selectedProduct:Products;

  config = {
    itemsPerPage: 50,
    currentPage: 1,
    totalItems: this.product.length
  };
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<-',
      nextLabel: '->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  constructor(private productApi : ProductApiService,
              private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productApi.getProductList().subscribe(res=>{
      this.product = res;
      this.loading=false;
      this.productBackup=this.product;
    });
  }

  key:string='id';
  reverse:boolean=false;
  sort(key:string){
      this.key=key;
      //this.product=this.productBackup;
      this.reverse= !this.reverse;
  }
  search(){
    this.name= (<HTMLInputElement>document.getElementById('searchKey')).value;
    if(this.name==""){
      this.product=this.productBackup;
    }
    else{
          this.product=this.productBackup;
          this.product=this.product.filter(res=> {
          return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
          });
        }
  }
  onPageChange(event:any){
    this.config.currentPage = event;
  }
  editProduct(editProduct:Editprod){
    this.router.navigate(['/product/inventory', {edit:btoa( JSON.stringify(editProduct))}]);
  }
  showLedger(productLedger: any, Prod:Products) {
    this.selectedProduct=Prod
    this.productApi.getLedgerReport(this.selectedProduct.name).subscribe(res=>{
      this.ledger=res
    })
    this.modalService.open(productLedger, { centered: true , size:'xl',backdrop: 'static'});
  }
  closemodel(productLedger:any){
    this.modalService.dismissAll(productLedger)
  }
}
