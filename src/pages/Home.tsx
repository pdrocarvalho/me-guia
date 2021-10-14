import { IonBackButton, IonBackdrop, IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Home.scss';
import points from '../server/points';
import bannerSvg from '../assets/banner.svg'
import { add, arrowBack, checkmarkCircle, locationSharp, shuffle, } from 'ionicons/icons';
import Place from './Place';
import { render } from '@testing-library/react';

const slideOpts = {
  initialSlide: 0,
  freeMode: true,
  slidesPerView: 1.3,
  spaceBetween: 1,
  slidesOffsetBefore: 1,
};
let nav: any = [];

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showSpecs, setShowSpecs] = useState(false);

  async function showDetail(id: string) {

    const place = await points.find(place => place.place_id === id)
    nav = place;
    await setShowSpecs(true)
    return (
      console.log(nav.name)
    )

    //return(place);
  }
  return (


    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar no-border>
          <IonButtons slot="start" >
            <IonMenuButton color="light"></IonMenuButton>
          </IonButtons>
          <IonTitle>
            MeGuia!
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
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
                <img alt="" className="" src={nav.img}></img>
              </div>
              <div className="background">
                <div className="title">
                  <IonTitle>{nav.name}</IonTitle>
                </div>
                <IonGrid>
                  <IonRow>
                    <IonCol className="ion-align-self-center address">{nav.formatted_address}</IonCol>
                    <IonCol className="ion-align-self-center">
                      <IonButton className="loc" fill="outline" href={nav.url}>
                        <IonIcon slot="icon-only" color="primary" icon={locationSharp} />
                        <IonLabel>Me guia!</IonLabel>
                      </IonButton>
                    </IonCol>
                  </IonRow>

                </IonGrid>
                



                <div className="description">
                  <IonTitle>Descrição</IonTitle>
                  <IonNote>{nav.description}</IonNote>
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




