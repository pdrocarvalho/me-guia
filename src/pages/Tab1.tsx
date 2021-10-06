import { IonAvatar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useState } from 'react';
import './Tab1.scss';
import points from '../server/points';
import { locationSharp } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    
    <IonPage>
      <IonHeader className="ion-padding">
        <IonToolbar>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className="heading">
          <h1>Descubra</h1>
          <h1>seu caminho!</h1>
        </div>
        <IonSearchbar className="search" value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Pra onde quer ir...?"></IonSearchbar>

        <div className="ion-text-start">
      <h2>Dica do dia!</h2>
      </div>
      <IonSlides pager={ false }>

        { points.map((places, index) => {

          return(
            <IonSlide key={`slide_${ index }`}>
              <IonCard className="card">
                <div className="iamgeHeader">
                <img src={ places.img } alt="card" className="image" />
                </div>
                <IonCardHeader>
               
                <IonCardTitle className="title">{ places.name }</IonCardTitle>
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

export default Tab1;
