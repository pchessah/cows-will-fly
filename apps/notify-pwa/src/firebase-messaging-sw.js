importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");


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

