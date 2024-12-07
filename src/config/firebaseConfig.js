import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1Fv3F9Ux6yWxBLVkS9KKN09utSxMcMeA",
  authDomain: "coinscope-995eb.firebaseapp.com",
  projectId: "coinscope-995eb",
  storageBucket: "coinscope-995eb.firebasestorage.app",
  messagingSenderId: "837036564717",
  appId: "1:837036564717:web:251803793f1257fb402ce4",
  measurementId: "G-YKQQW7Q28R",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
