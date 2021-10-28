import { Route } from 'react-router-dom';
import {
  IonApp,
  IonMenu,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonContent,
  IonItem,
  IonList,

} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { alertCircleOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';
import { auth } from './firebaseConfig';
import { useState } from 'react';

/* Import pages */
import Home from './pages/Home';
import Hostel from './pages/Hostel';
import Store from './pages/Store';
import Welcome from './pages/Welcome';
import Points from './pages/Register/Points';
import Client from './pages/Register/Client';
import Report from './pages/Report';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/App.scss';
import './theme/custom-tab-bar.css';

/* Import assets */
import bannerSvg from './assets/banner.svg'
import avatar from './assets/avatar.png'



const App: React.FC = () => {

  /* SHOW CURRENT USER  */
  const [userInfo, setUserInfo] = useState('')

  auth.onAuthStateChanged(function (user: any) {
    if (user) {
      setUserInfo(user.displayName)

      console.log("user logged in")
      console.log(userInfo)
    } else {
      setUserInfo('Entre com sua conta')

      console.log("user NOT logged in")
    }
  })

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
                <h2>{userInfo}</h2>
              </IonLabel>
            </div>

            <IonList lines="none">
              <IonItem>
                <IonLabel>Olá, {userInfo}!</IonLabel>
              </IonItem>

              <IonItem href="/welcome">
                <IonIcon icon={alertCircleOutline} slot="end" />
                <IonLabel>  Anuncie no nosso app! </IonLabel>
              </IonItem>

              <IonItem href='/report'>
                <IonIcon icon={chatbubbleEllipsesOutline} slot="end" />
                <IonLabel>Fale conosco</IonLabel>
              </IonItem>
            </IonList>
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
          <Route path="/register/points" component={Points} exact />
          <Route path="/register/client" component={Client} exact />
          <Route path="/report" component={Report} exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
