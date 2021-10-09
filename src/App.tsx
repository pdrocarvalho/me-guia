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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';

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
            <IonItem href="/tab3">
              <IonIcon icon={alertCircle} slot="end"/>
              Anuncie no nosso app!</IonItem>
            <IonItem>Contato</IonItem>
          </IonList>
      </IonContent>
    </IonMenu>
    <IonRouterOutlet id="main"></IonRouterOutlet>
</IonReactRouter>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={trailSignOutline} />
            
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={sunny} />
            
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={informationCircleOutline} />
            
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
