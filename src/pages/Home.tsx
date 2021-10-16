import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import './Home.scss';
import points from '../server/points';
import bannerSvg from '../assets/banner.svg'
import { addCircleOutline, arrowBack, bagHandleOutline, bedOutline, locationSharp, logoVimeo, settings, trailSignOutline } from 'ionicons/icons';

const slideOpts = {
  initialSlide: 0,
  freeMode: true,
  slidesPerView: 1.3,
  spaceBetween: 1,
  slidesOffsetBefore: 1,
};
let placeSelected: any = [];

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showSpecs, setShowSpecs] = useState(false);

  async function showDetail(id: string) {

    const place = await points.find(place => place.place_id === id)
    placeSelected = place;
    await setShowSpecs(true)
    return (
      console.log(placeSelected.name)
    )

  }
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
            Descubra <br></br>
            seu caminho!
          </div>
        </div>
        <div className="search">
          <IonSearchbar inputmode="search" animated={true} value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Pra onde quer ir...?"></IonSearchbar>
        </div>

        <div className="navButtons ">
          <IonToolbar >
            <IonButton routerLink="/store" slot="end" size="default" fill="outline" color="danger">
              <IonIcon icon={bagHandleOutline}></IonIcon>
              <IonLabel>
                Comércio
              </IonLabel>
            </IonButton>
            <IonButton routerLink="/hostel" slot="end" size="default" fill="outline" color="danger">
              <IonIcon icon={bedOutline}></IonIcon>
              <IonLabel>
                Hospedagem
              </IonLabel>
            </IonButton>

          </IonToolbar>
        </div>
        {/* Slides Destinos */}
        <div className="title2">
          <h2>Destinos</h2>
        </div>
        <IonSlides pager={false} options={slideOpts}>


          {points.map((places, index) => {

            return (
              <IonSlide className="master" key={`slide_${index}`}>
                <IonCard className="card" button={true} onClick={e => showDetail(`${places.place_id}`)}>


                  <img src={places.img} alt="cardImg" className="image" />

                  <IonCardHeader>

                    <IonCardTitle className="title">{places.name}</IonCardTitle>
                    <IonCardSubtitle className="subtitle">{places.loc}</IonCardSubtitle>
                  </IonCardHeader>

                </IonCard>
              </IonSlide>

            )

          })}

          {/* Modal dos pontos turísticos */}

          <IonModal isOpen={showSpecs} cssClass='specs-modal'>

            <IonContent className="specs">
              <IonFab vertical="top" horizontal="start" slot="fixed">
                <IonFabButton size="small" onClick={() => setShowSpecs(false)}>
                  <IonIcon icon={arrowBack} />
                </IonFabButton>
              </IonFab>
              <div className="imgHeader">
                <img alt="" className="" src={placeSelected.img}></img>
              </div>

              <div className="background">

                <div className="title">
                  <IonTitle>{placeSelected.name}</IonTitle>
                </div>

                <IonGrid>
                  <IonRow>
                    <IonCol className="ion-align-self-center address">{placeSelected.formatted_address}</IonCol>
                    <IonCol className="ion-align-self-center">
                      <IonButton className="loc" fill="outline" href={placeSelected.url}>
                        <IonIcon slot="icon-only" color="primary" icon={locationSharp} />
                        <IonLabel>Me guia!</IonLabel>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <div className="description">
                  <IonTitle>Descrição</IonTitle>
                  <IonNote>{placeSelected.description}</IonNote>
                </div>

                <div className="close ion-margin-top ion-text-center">
                </div>

              </div>
            </IonContent>


          </IonModal>
        </IonSlides>



      </IonContent>

    </IonPage>
  );
};

export default Home;




