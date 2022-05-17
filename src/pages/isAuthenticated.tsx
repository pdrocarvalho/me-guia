import { auth, db } from '../services/firebaseConfig'
import { doc, getDoc } from '@firebase/firestore'
import { getAuthentication } from '../services/getAuthentication'

export const isAuthenticated = async () => {
   await getAuthentication()
  console.log(getAuthentication())
}
