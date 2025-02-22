import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_nd_DtZULvhvMf6qVOXoc_bWTYvOIyUE",
    authDomain: "edvance-project.firebaseapp.com",
    projectId: "edvance-project",
    storageBucket: "edvance-project.firebasestorage.app",
    messagingSenderId: "872828630765",
    appId: "1:872828630765:web:fe8c3adda0b46f00aefee4",
    measurementId: "G-L45SM69E45"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
