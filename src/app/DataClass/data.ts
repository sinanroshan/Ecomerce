export interface Products{
barcode: string,
category: string,
cess: number,
cost: number,
current_Stock: number,
gst: number,
hsn_Code: number,
KayImage: string,
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
    KayImage:string;
}

export interface Godown{
    godown_name:string,
    //godown:string
}
export interface SubCategory{
    superCategory:string,
    category:string
}

