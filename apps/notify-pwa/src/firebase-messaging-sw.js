importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");
var functions = require ('firebase-functions');


firebase.initializeApp({
  apiKey: "AIzaSyBBwYwzl_pJPIJzzbz0H4rb2YOleOtRFuI",
  authDomain: "chessah-notify-pwa.firebaseapp.com",
  projectId: "chessah-notify-pwa",
  storageBucket: "chessah-notify-pwa.appspot.com",
  messagingSenderId: "686268554593",
  appId: "1:686268554593:web:268ca58bbd66530d95b920",
  measurementId: "G-F88QBGT2DD",
  vapidKey: "BAQmziT9Re-Vsav6kc1Vbl6K8jZ2WUazOt1GLnNe9BSNNElz8nExKAylgElzHOb2-v2ybgHJlnGhLID4QDqrM1I"
});

const messaging = firebase.messaging();

export const sendNotificationOnObjectAdd = functions.firestore
  .document('availability/{objectId}')
  .onCreate(async (snapshot, context) => {
    const objectData = snapshot.data();
    const payload = {
      notification: {
        title: 'New Object Added',
        body: `Object ID: ${context.params.objectId}`,
      },
    };

    const tokens = []; // Add recipient tokens here

    try {
      await admin.messaging().sendToDevice(tokens, payload);
      console.log('Notification sent successfully.');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  });