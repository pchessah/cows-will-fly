import { Injectable }    from "@angular/core";
import  emailjs          from "@emailjs/browser";
import { from }          from "rxjs";
import { ICart, IOrder } from "@cows-will-fly/interfaces/cart";

@Injectable({ providedIn: "root" })

export class EmailCheckoutService {

  constructor() {}

  //Function used to create a formatted list to be used in emails
  private _getProductsForAdmin = (rawProducts: ICart[]) => {

    let newVal = rawProducts.map(cart =>{
      const object = {productName: cart.product.name, quantity: cart.count}
      return object;
    });

    let final = "";

    for(let i=0; i<newVal.length; i++){
      final += ` \n Product: ${newVal[i].productName} Quantity: ${newVal[i].quantity}, `;
    }

    return final;
  };

  sendEmail = (data: IOrder) => {
    const templateParams = {
      orderNo: data.id,
      clientName: data.user.name,
      clientEmail: data.user.email,
      clientPhoneNumber: data.user.phone,
      adminEmail: "paulchesa1@gmail.com",
      items: this._getProductsForAdmin(data.cart),
    };

    return from(Promise.all([
      this._sendToAdmin(templateParams),
      this._sendToUser(templateParams),
    ]));
  };

  private _sendToUser = async (templateParams: Record<string, unknown> | undefined) => {
    return await emailjs
      .send(
        "service_m0w3v3q",
        "template_5b4625g",
        templateParams,
        "_hE2tQRjY3GSNMFee"
      )
      .then(
        function (response: { status: any; text: any }) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error: any) {
          console.log("FAILED...", error);
        }
      );
  };

  private _sendToAdmin = async (
    templateParams: Record<string, unknown> | undefined
  ) => {
    return await emailjs
      .send(
        "service_m0w3v3q",
        "template_ltz4vyl",
        templateParams,
        "_hE2tQRjY3GSNMFee"
      )
      .then(
        function (response: { status: any; text: any }) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error: any) {
          console.log("FAILED...", error);
        }
      );
  };
}
