import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonSearchbar, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Home.scss';
import points from '../server/points';
import bannerSvg from '../assets/banner.svg'
import { locationSharp } from 'ionicons/icons';

const slideOpts = {
  initialSlide: 0,
  freeMode: true,
  slidesPerView: 1.3,
  spaceBetween: 1,
  slidesOffsetBefore: 1,
};

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
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
          <img alt="" src={bannerSvg}/>

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
                <IonCard className="card">
                  
                    <img src={places.img} alt="cardImg" className="image" />
                  
                  <IonCardHeader>

                    <IonCardTitle className="title">{places.name}</IonCardTitle>
                    <IonCardSubtitle className="subtitle">{places.loc}</IonCardSubtitle>
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

export default Home;
