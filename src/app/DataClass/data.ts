export interface Products{
barcode: string,
category: string,
cess: number,
cost: number,
current_Stock: number,
gst: number,
hsn_Code: number,
kayImage: string,
mrp: number,
name: string,
opening_Stock: number,
productID: number,
purchase_Rate: "19.0",
retail_Rate: number,
sub_Category: string,
unit: string,
whole_Rate:number,
}
export interface Editprod{
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

