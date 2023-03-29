export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  image:IFileUpload,
}


export class IFileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file:File){
    this.file = file;
  }
}