import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable, finalize, from } from "rxjs";
import { IProduct } from "@cows-will-fly/interfaces/product";

@Injectable({ providedIn: "root" })

//TODO: Add way to catch Errors
export class ProductStore {
  constructor(
    private _afs: AngularFirestore,
    private _storage: AngularFireStorage
  ) {}

  getProducts() {
    return this._afs.collection("products").valueChanges();
  }

  getOneProduct(id: string) {
    return this._afs.collection("products").doc(id).valueChanges();
  }

  addProduct(productData: Partial<IProduct>, productImage: any) {
    const id = this._afs.createId();
    let productToBeAdded: IProduct = { id: id, ...productData } as any;
    const filePath = `products/${productToBeAdded.name}`;
    const fileRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, productImage);

    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          productToBeAdded = { ...productToBeAdded, imageUrl: url };
          this._afs
            .collection("products")
            .doc(`${productToBeAdded.id}`)
            .set(productToBeAdded)
            .then(() => {
              console.log("Product added successfully!");
            });
        });
      })
    );
  }

  editProduct(productData: Partial<IProduct>, productImage?: any): Observable<any> {
    if (!!productImage) {
      const filePath = `products/${productData.name}`;
      const fileRef = this._storage.ref(filePath);
      const task = this._storage.upload(filePath, productImage);

      return task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            productData = { ...productData, imageUrl: url };
            this._afs
              .collection("products")
              .doc(`${productData.id}`)
              .update(productData)
              .then(() => {
                console.log("Product edited successfully!");
              });
          });
        })
      );
    } else {
      const edit$ = this._afs
        .collection("products")
        .doc(`${productData.id}`)
        .update(productData)
        .then(() => {
          console.log("Product edited successfully!");
        });
      return from(edit$);
    }
  }

  deleteProduct(product:IProduct){
    const delete$ = this._afs.collection("products").doc(product.id).delete();
    return from(delete$);
  }
}
