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

/* Import pages */
import Home from './pages/Home';
import Hostel from './pages/Hostel';
import Store from './pages/Store';
import Welcome from './pages/Welcome';
import Client from './pages/Client';
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
import './theme/App.css';
import './theme/custom-tab-bar.css';

/* Import assets */
import bannerSvg from './assets/banner.svg'


const App: React.FC = () => (
  <IonApp>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQTo7Wfbl5_Uw4wF22cIsQzSBI362_qO4" async defer />

    {/* SIDE MENU */}
    <IonReactRouter>
      <IonMenu menuId="menu-home" contentId="main" swipeGesture={false}>
        <IonContent>
          <div className="menu-header-bg">
            <img alt="" src={bannerSvg}></img>
           
          </div>
          <IonList lines="none">
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
        <Route path="/client" component={Client} exact />
        <Route path="/report" component={Report} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
