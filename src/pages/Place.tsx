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
import { locationSharp } from 'ionicons/icons';

import './Place.scss';
import points from '../server/points';
const slideOpts = {
  initialSlide: 0,
  slidesPerView: 1.3,
  spaceBetween: -1,
  
  
  };

const Place: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="ion-text-start">
          <h2>Dica do dia!</h2>
        </div>
        <IonSlides pager={false} options={slideOpts}>

          {points.map((places, index) => {
            return (
              <IonSlide key={`slide_${index}`}>
                <IonCard className="card">
                  <div className="iamgeHeader">
                    <img src={places.img} alt="card" className="image" />
                  </div>
                  <IonCardHeader>

                    <IonCardTitle className="title">{places.name}</IonCardTitle>
                    <IonButton expand="block" fill="clear" href={`http://maps.google.com/maps?q=${places.lat},${places.lng}`} >
                      <p>Me Guia!</p>
                      <IonIcon icon={locationSharp} />
                    </IonButton>
                  </IonCardHeader>
                </IonCard>

              </IonSlide>

            )
          })}

        </IonSlides>

      </IonContent>
    </IonPage>
  );
};

export default Place;
