/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * 
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onDocumentWritten} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as  functions from 'firebase-functions';
import { TokenMessage } from "firebase-admin/lib/messaging/messaging-api";

admin.initializeApp();


export const sendNotificationOnChange = functions.firestore
  .document('availability/{docId}')
  .onWrite(async (change, context) => {
    logger.log('calling function:✅');

    // Retrieve the FCM tokens of your Angular PWA users
    const tokensSnapshot = await admin.firestore().collection('tokens').get();
    const tokens = tokensSnapshot.docs.map((doc) => doc.data().token);

    tokens.map(async token => {
      logger.log('calling function with token: 🔥', token);

      let payload:TokenMessage = {
        notification: {
          title: 'Field Changed',
          body: 'The field has been changed in the Firestore collection',
        },
       
        token: token
      };
      const message = {
        notification: payload.notification,
        token: payload.token
      };
      const res = await admin.messaging().send(message);

      logger.log('Successfully sent push notification:✅');
      logger.log('res is✨ :', JSON.stringify(res));

      return res
    });

  });





