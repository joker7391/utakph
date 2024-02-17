import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBy4A33Su884MdsKtPHvd0GUs36_6zTOUQ",
  authDomain: "utakph-55b06.firebaseapp.com",
  databaseURL:
    "https://utakph-55b06-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utakph-55b06",
  storageBucket: "utakph-55b06.appspot.com",
  messagingSenderId: "1035290443963",
  appId: "1:1035290443963:web:144b52445745008908e99e",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
