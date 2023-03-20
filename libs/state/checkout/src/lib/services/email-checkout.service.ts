import { Injectable } from "@angular/core";
import emailjs from "@emailjs/browser";
import { from } from "rxjs";

import { ICart, IOrder } from "@cows-will-fly/interfaces/cart";

@Injectable({ providedIn: "root" })
export class EmailCheckoutService {
  constructor() {}

  //Function used to create a formatted list to be used in emails
  private _getProductsForAdmin = (rawProducts: ICart[]) => {
    //1 Get total of cart
    const totalCost = rawProducts
      .map((c) => {
        const price = c.product.price;
        const count = c.count;
        return price * count;
      })
      .reduce((a, b) => a + b, 0);

    //2  Convert the array to an HTML table string
    const tableString = `
  <table style="border-collapse: collapse; width: 500px">
    <tr> 
      <th style="border: 1px solid black; padding: 5px;">Your Item</th>
      <th style="border: 1px solid black; padding: 5px;">Name</th>
      <th style="border: 1px solid black; padding: 5px;">Quantity</th>
      <th style="border: 1px solid black; padding: 5px;">Cost</th>
    </tr>
    ${rawProducts
      .map(
        (item) => `
      <tr>
      <td style="border: 1px solid black; padding: 5px;"> 
        <img style="border-radius: 50%; height:30px; width: 30px;" src=${
          item.product.imageUrl
        } /> 
      </td>
        <td style="border: 1px solid black; padding: 5px;">${
          item.product.name
        }</td>
        <td style="border: 1px solid black; padding: 5px;">${item.count}</td>
        <td style="border: 1px solid black; padding: 5px;">Ksh. ${
          item.product.price * item.count
        }</td>
      </tr>
    `
      )
      .join("")}

    <tfoot>
    <tr> 
      <td style="border: 1px solid black; padding: 5px;"><strong> Total: </strong></td>
      <td style="border: 1px solid black; padding: 5px;"></td>
      <td style="border: 1px solid black; padding: 5px;"></td>
      <td style="border: 1px solid black; padding: 5px; font-size: 24px"> <strong> Ksh. ${totalCost} </strong></td>
      </tr>
    </tfoot>
  
  </table>
`;

    return tableString;
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

    return from(
      Promise.all([
        this._sendToAdmin(templateParams),
        this._sendToUser(templateParams),
      ])
    );
  };

  private _sendToUser = async (
    templateParams: Record<string, unknown> | undefined
  ) => {
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
