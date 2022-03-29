import { Route } from 'react-router-dom'
import {
  IonApp,
  IonMenu,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonContent,
  IonItem,
  IonList,
  IonButton,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { alertCircleOutline, chatbubbleEllipsesOutline } from 'ionicons/icons'
import { useState } from 'react'

import { auth, db } from '../services/firebaseConfig'
import { doc, getDoc } from '@firebase/firestore'
import { signOut } from '@firebase/auth'
/* Import pages */
import Home from './home/Home'
import Hostel from './commerce/Hostel'
import Store from './commerce/Store'
import Welcome from './login/Welcome'
import ForgotPassword from './login/forgotPassword/ForgotPassword'
import Points from './register/Points'
import Client from './register/Client'
import Report from './sac/Report'
import Panel from './admin/Panel'
import ReportAdm from './admin/sac/report'
import EditPoints from './admin/points/EditPoints'
import DeletePoints from './admin/points/DeletePoints'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import '../theme/variables.css'
import '../theme/App.scss'
import '../theme/custom-tab-bar.css'

/* Import assets */
import bannerSvg from '../assets/banner.svg'
import avatar from '../assets/avatar.png'

const App: React.FC = () => {
  /* SHOW CURRENT USER  */
  const [userInfo, setUserInfo] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [admButton, setAdmButton] = useState(true)

  // useEffect(() => {
  //   const showUser = async () => {
  //     const user = auth.currentUser
  //   }
  // }, [])
  
/*LogOut e Atualiza a página */
  const logoutUser = async () => { 
    try {
      await signOut(auth)
      window.location.reload()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  auth.onAuthStateChanged(async function (user: any) {
    if (user) {
      const userUid = user.uid
      const docRef = doc(db, 'users', userUid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setUserInfo(data.isAdm)
        setDisplayName(data.store_name)
        console.log(data.store_name)
        console.log('Doc data:', docSnap.data())
        console.log('user logged in')
      } else {
        console.log('User with no data')
      }
    } else {
      setDisplayName('Entre com sua conta')

      console.log('user NOT logged in')
    }
  })

  const checkAdmin = async () => {
    if (userInfo === true) {
      setAdmButton(false)
    } else {
      setAdmButton(true)
    }
  }

  return (
    <IonApp>
      {/* SIDE MENU */}
      <IonReactRouter>
        <IonMenu menuId="menu-home" contentId="main" swipeGesture={false}>
          <IonContent>
            <div className="menu-header-bg">
              <img alt="" src={bannerSvg}></img>
            </div>
            <div className="header-content">
              <img alt="avatar" src={avatar} />
              <IonLabel>
                <h2>{displayName}</h2>
              </IonLabel>
            </div>

            <IonList lines="none">
              <IonItem onClick={checkAdmin}>
                <IonLabel>Olá, {displayName}!</IonLabel>
              </IonItem>

              <IonItem href="/welcome">
                <IonIcon icon={alertCircleOutline} slot="end" />
                <IonLabel> Anuncie no nosso app! </IonLabel>
              </IonItem>

              <IonItem href="/report">
                <IonIcon icon={chatbubbleEllipsesOutline} slot="end" />
                <IonLabel>Fale conosco</IonLabel>
              </IonItem>
              <IonItem onClick={logoutUser}>
                <IonIcon icon={chatbubbleEllipsesOutline} slot="end" />
                <IonLabel>Deslogar</IonLabel>
              </IonItem>
            </IonList>
            <IonButton
              expand="block"
              disabled={admButton}
              className="adm-button"
              fill="solid"
              href="/admin/panel"
            >
              Painel Adiminstrador
            </IonButton>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main"></IonRouterOutlet>
      </IonReactRouter>

      {/* ROTAS */}
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Home} exact />
          <Route path="/hostel" component={Hostel} exact />
          <Route path="/store" component={Store} exact />
          <Route path="/welcome" component={Welcome} exact />
          <Route
            path="/welcome/forgotpassword"
            component={ForgotPassword}
            exact
          />
          <Route path="/register/points" component={Points} exact />
          <Route path="/register/client" component={Client} exact />
          <Route path="/report" component={Report} exact />
          <Route path="/admin/panel" component={Panel} exact />
          <Route path="/admin/report" component={ReportAdm} exact />
          <Route path="/admin/editpoints" component={EditPoints} exact />
          <Route path="/admin/deletepoints" component={DeletePoints} exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
export default App
