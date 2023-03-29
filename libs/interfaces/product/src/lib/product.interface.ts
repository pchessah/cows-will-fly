export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  image:IFileUpload,
}


export interface IFileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
}