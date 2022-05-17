import { isAuthenticated } from './pages/isAuthenticated'
import { auth, db } from './services/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from '@firebase/firestore'
import { User } from './class/User'
import { Route, Redirect } from 'react-router-dom'
import { getAuthentication } from './services/getAuthentication'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  //console.log(UserAdmin)
  const authentic = true
  return (
    <Route
      {...rest}
      render={(props) =>
        authentic ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      }
    />
  )
}

export default PrivateRoute
export const UserAdmin = new User()
