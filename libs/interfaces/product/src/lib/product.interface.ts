export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category:IProductCategory
}

export enum IProductCategory  {
  "CHAIR",
  "TABLE"
}