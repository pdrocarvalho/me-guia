import { auth, db } from './firebaseConfig'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from '@firebase/firestore'
import { UserAdmin } from '../PrivateRoute'
import { fastFoodOutline } from 'ionicons/icons'

export const getAuthentication = async () => {
  //const auth = getAuth()
  auth.onAuthStateChanged(async function (user: any) {
    if (user) {
      const userUid = user.uid
      const userRef = doc(db, 'users', userUid)

      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        UserAdmin.setUserIsAdmin(data.isAdmin)

        //console.log(data.name)
        console.log('Doc data:', docSnap.data())
        //console.log('user logged in')
        //console.log(userInfo)
      } else {
        //console.log('User with no data')
      }
    } else {
      //console.log('user NOT logged in')
    }
  })
}
