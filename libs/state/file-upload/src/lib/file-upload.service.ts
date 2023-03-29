import { Injectable }                            from '@angular/core';
import { AngularFireDatabase, AngularFireList }  from '@angular/fire/compat/database';
import { AngularFireStorage }                    from '@angular/fire/compat/storage';
import { Observable, finalize, BehaviorSubject } from 'rxjs';
import { IFileUpload }                           from "@cows-will-fly/interfaces/product"

@Injectable({providedIn: 'root'})

export class FileUploadService {

  private _basePath = '/uploads';
  public currentProductUrlSrc$$ = new BehaviorSubject<string>(null as any);

  constructor(private _db: AngularFireDatabase,
              private _storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: IFileUpload, path?:string): Observable<number> {
    const filePath = path ? `${this._basePath}/${path}` : `${this._basePath}/${fileUpload.file.name}`;
    const storageRef = this._storage.ref(filePath);
    const uploadTask = this._storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.currentProductUrlSrc$$.next(downloadURL);
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
  
    return uploadTask.percentageChanges() as Observable<number>;
  }

  private saveFileData(fileUpload: IFileUpload): void {
    this._db.list(this._basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<IFileUpload> {
    return this._db.list(this._basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: IFileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this._db.list(this._basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this._storage.ref(this._basePath);
    storageRef.child(name).delete();
  }

}