export interface Products{
barcode: string,
category: string,
cess: number,
cost: number,
current_Stock: number,
gst: number,
hsn_Code: number,
kayImage: string,
image1:string,
image2:string,
image3:string,
image4:string,
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
    image1:string,
    image2:string,
    image3:string,
    image4:string,
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
export interface Image{
    FileName:string;
    file:any;
    Type:string;
}

export interface OrderData{
    invno:number
    customerID:number
    totalAmound:number
    orderQty:number
    orderDate:Date
    c_FullName:string
    c_phone:string
    c_place:string
    c_home:string
    c_pin:number
    c_landmark:string
    c_City:string
    orderStatus:string
}