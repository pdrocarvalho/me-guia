import {
  IonButton, IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSlide,
  IonSlides,
  IonToolbar
} from '@ionic/react';
import { locationSharp, playCircleSharp } from 'ionicons/icons';

import './Place.scss';
import points from '../server/points';


const Place: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <div className="imgHeader">
          <img alt="" src="https://prensadebabel.com.br/wp-content/uploads/2018/02/forte-s%C3%A3o-mateus-cabo-frio-800x487.jpg"></img>
        </div>
      </IonHeader>

      <IonContent className="background" fullscreen>
        
        
        
      </IonContent>
    </IonPage>
  );
};

export default Place;
