import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonMenu,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonItem,
  IonList
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { square, informationCircleOutline, sunny, trailSignOutline, alertCircle } from 'ionicons/icons';
import Home from './pages/Home';
import Place from './pages/Place';
import Welcome from './pages/Welcome';
import Register from './pages/Register';

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
import './theme/App.css';
import './theme/custom-tab-bar.css';
import bannerSvg from './assets/banner.svg'
const App: React.FC = () => (
  <IonApp>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQTo7Wfbl5_Uw4wF22cIsQzSBI362_qO4" async defer/>

    <IonReactRouter>
      
    <IonMenu menuId="menu-home" contentId="main" swipeGesture={false}>
      <IonContent>
          <div className="menu-header-bg">
            <img src={bannerSvg}></img>
          </div>
          <IonList>
            <IonItem href="/Welcome">
              <IonIcon icon={alertCircle} slot="end"/>
              Anuncie no nosso app!</IonItem>
            <IonItem>Contato</IonItem>
          </IonList>
      </IonContent>
    </IonMenu>
    <IonRouterOutlet id="main"></IonRouterOutlet>
</IonReactRouter>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/place">
            <Place />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
