import {
  IonButton, IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonNote,
  IonPage,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { locationSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.scss';
import points from '../server/points';

const Tab2: React.FC = () => {
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
        <IonSlides pager={false}>

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

export default Tab2;
