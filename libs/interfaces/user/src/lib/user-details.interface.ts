export interface IUserDetails {
  phone:number;
  email:string;
  name:string;
  location?:IDeliveryLocation;
  deliveryDetails?:string;

}

export interface IDeliveryLocation {
  name: string;
  cost: number;
}