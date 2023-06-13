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

admin.initializeApp();

export const v1trigger =  functions.firestore
.document('availability/{docId}').onWrite(async (change, context)=>{
  const messaging = admin.messaging();

  const payload = {
    notification: {
      title: 'Field Changed',
      body: 'The field has been updated.',
      icon: 'your_notification_icon_url',
    },
  };

  logger.info("change is is 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥", change);

  try {
     const response = await messaging.sendToTopic("availability", payload)
     logger.info("response is😃😃😃😃😃😃😃😃😃😃", response);
     return response
  } catch (error) {
    logger.error("⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️ there was an error", error)
    return error
  }
})

// export const triggerNotification = onDocumentWritten("availability/{docId}", async (res) =>{
//   // const messaging = admin.messaging();

//   // const payload = {
//   //   notification: {
//   //     title: 'Field Changed',
//   //     body: 'The field has been updated.',
//   //     icon: 'your_notification_icon_url',
//   //   },
//   // };

//   // logger.info("res is is 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥", res);

//   // try {
//   //    const response = await messaging.sendToTopic("availability", payload)
//   //    logger.info("response is😃😃😃😃😃😃😃😃😃😃", response);
//   //    return response
//   // } catch (error) {
//   //   logger.error("⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️ there was an error", error)
//   //   return error
//   // }
// })
