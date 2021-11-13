import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { signOut } from '@firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCNnkyQyi1Im0cwqEHZb80KNoQXUF1un4k",
    authDomain: "me-guia-326302.firebaseapp.com",
    projectId: "me-guia-326302",
    storageBucket: "me-guia-326302.appspot.com",
    messagingSenderId: "460560137799",
    appId: "1:460560137799:web:ede3468c2f31e3aaa97b62",
    measurementId: "G-LW6VWJ0Y4H"

};




const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app);


