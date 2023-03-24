export interface IUserDetails {
  phone:number;
  email:string;
  name:string;
  location?:IDeliveryLocation;
  deliveryDetails?:string;
  promocode?:IPromoCode;

}

export interface IDeliveryLocation {
  name: string;
  cost: number;
}

export interface IPromoCode{
  name:string;
  value:number;
}