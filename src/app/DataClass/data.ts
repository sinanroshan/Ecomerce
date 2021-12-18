export interface product{
    name:string,
    barcode:string,
    category:string
    unit:string,
    price:number,
    rate1:number,
    rate2:number,
    mrp:number,
    purchaseDate:string,
    tax:number,
    cess:number,
    hsn:string,
    qty:number,
    itemcode:string,
    incentives:number,
    openingstock:number,
    currentstock:number
}
export interface editprod{
    name:string,
    itemCode:string,
    hsnCode:string,
    barcode:number,
    gstp:number,
    cessp:number,
    unit:string,
    godown:string,
    category:string,
    rack:string,
    purchaseDate:string,
    purchasePrice:number,
    includingtax:boolean,
    sellingPrice:number,
    mrp:number,
    openingStock:number,
    currentStock:number,
    incentive:number,
}
export interface Godown{
    godown_name:string,
    //godown:string
}
export interface SubCategory{
    superCategory:string,
    category:string
}

