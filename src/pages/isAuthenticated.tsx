import { auth, db } from "../services/firebaseConfig"
import { doc, getDoc } from '@firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"

export const isAuthenticated = () => {
  onAuthStateChanged(auth, async (user: any)=> {
    
    if (user) {
      const userUid = user.uid
      const userRef = doc(db, 'users', userUid)

      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log(data.isAdm)
        return true
      } else {
        console.log('User with no data')
        return false
      }
    } else {
      console.log('user NOT logged in')
      return false
    }
  })
  
}