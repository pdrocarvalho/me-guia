import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSlide,
  IonSlides,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { addCircleOutline, bagHandleOutline, bedOutline, locationSharp, playCircleSharp, trailSignOutline } from 'ionicons/icons';

import './Store.scss';
import bannerSvg from '../assets/banner.svg'
import clients from '../server/clients';
import { useState } from 'react';


const Store: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar no-border>
          <IonButtons slot="start" >
            <IonMenuButton color="light"></IonMenuButton>
          </IonButtons>
          <IonTitle>

          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        {/*
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton color="danger">
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
          <IonFabList side="bottom">
            <IonFabButton href="/report"><IonIcon icon={bagHandleOutline} /></IonFabButton>
            <IonFabButton href="/report"><IonIcon icon={bedOutline} /></IonFabButton>
          </IonFabList>
        </IonFab>
        */}
        <div className="banner">
          <img alt="" src={bannerSvg} />

          <div className="heading ion-padding">
            Não esqueça <br></br>
            de levar uma lembrança!
          </div>
        </div>
        <div className="search">
          <IonSearchbar inputmode="search" animated={true} value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Pra onde quer ir...?"></IonSearchbar>
        </div>
        <IonToolbar className="navButtons">

          <IonButton routerLink="/Hostel" slot="end" size="default" fill="outline" color="danger">
            <IonIcon icon={bedOutline}></IonIcon>
            <IonLabel>
              Hospedagem
            </IonLabel>
          </IonButton>
          <IonButton routerLink="/" slot="end" size="default" fill="outline" color="danger">
            <IonIcon icon={trailSignOutline}></IonIcon>
            <IonLabel>
              Destinos
            </IonLabel>
          </IonButton>

        </IonToolbar>
        <div className="title2">
          <h2>Comércio</h2>
        </div>

        <IonList>
          {clients.map((clients, index) => {

            return (
              <IonItem className="master" key={`item_${index}`}>
                <IonLabel> 
                  <h2> {clients.name} </h2> 
                  <p> {clients.address} </p>
                  </IonLabel>
                
                <IonThumbnail slot="start" >
                <img alt="thumbnail" src={clients.img} />
                </IonThumbnail>
              </IonItem>

            )

          })}

        </IonList>



      </IonContent>
      
    </IonPage>
  );
};

export default Store;
