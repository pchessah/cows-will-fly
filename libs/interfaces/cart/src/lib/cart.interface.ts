import {IProduct} from '@cows-will-fly/interfaces/product';
import {IUserDetails} from '@cows-will-fly/interfaces/user';


export interface ICart {
  product: IProduct;
  count:number;
}


export interface IOrder {
  id:string,
  cart:ICart[],
  user:IUserDetails
}