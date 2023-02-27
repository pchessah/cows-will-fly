import {IProduct} from '@cows-will-fly/interfaces/product';


export interface ICart {
  product: IProduct;
  count:number;
}