/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  IonToolbar,
} from '@ionic/react'
import {
  arrowBack,
  bagHandleOutline,
  bedOutline,
  locationSharp,
} from 'ionicons/icons'
import React, { useState, useEffect, ReactNode } from 'react'
import { getAuth } from '@firebase/auth'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../../services/firebaseConfig'


//import points from '../server/points';

import './Home.scss'
import bannerSvg from '../../assets/banner.svg'



const Home: React.FC = () => {
  
  const usersCollectionRef = collection(db, 'points')

  const [searchText, setSearchText] = useState('')
  const [showSpecs, setShowSpecs] = useState(false)
  const [placeSelected, setPlaceSelected] = useState<any>([])
  const [points, setPoints] = useState<any>([])

  useEffect(() => {
    const getPoints = async () => {
      const data = await getDocs(usersCollectionRef) // Faz req ao Firestore
      setPoints(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPoints()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showDetail = async (id: string) => {
    const place = await points.find((place: any) => place.id === id) // Acha o card selecionado dentro do array
    console.log(place)
    setPlaceSelected(place)
    await setShowSpecs(true)
  }

  return (
    <IonPage>
      <IonHeader class='ion-no-border'></IonHeader>

      <IonContent fullscreen={true}>
        <div className='banner'>
          <IonToolbar no-border>
            <IonButtons slot='start'>
              <IonMenuButton color='light'></IonMenuButton>
            </IonButtons>
            <IonTitle>Olá!</IonTitle>
          </IonToolbar>
          <img alt='' src={bannerSvg} />

          <div className='heading ion-padding'>
            Descubra <br></br>
            seu caminho!
          </div>
        </div>
        <div className='search'>
          <IonSearchbar
            inputmode='search'
            animated={true}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder='Pra onde quer ir...?'
          ></IonSearchbar>
        </div>

        <div className='navButtons '>
          <IonToolbar>
            <IonButton
              routerLink='/store'
              slot='end'
              size='default'
              fill='outline'
              color='danger'
            >
              <IonIcon icon={bagHandleOutline}></IonIcon>
              <IonLabel>Comércio</IonLabel>
            </IonButton>
            <IonButton
              routerLink='/hostel'
              slot='end'
              size='default'
              fill='outline'
              color='danger'
            >
              <IonIcon icon={bedOutline}></IonIcon>
              <IonLabel>Hospedagem</IonLabel>
            </IonButton>
          </IonToolbar>
        </div>
        {/* Slides Destinos */}
        <div className='title2'>
          <h2>Destinos</h2>
        </div>

        {points
          .filter((places: any) => {
            if (searchText === '') {
              return places
            } else if (
              places.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return places
            }
          })
          .map((places: any, index: any) => {
            return (
              <IonCard
                className='card'
                key={`slide_${index}`}
                button={true}
                onClick={(e) => showDetail(`${places.id}`)}
              >
                <img src={places.img} alt='cardImg' className='image' />

                <IonCardHeader>
                  <IonCardTitle className='title'>{places.name}</IonCardTitle>
                  <IonCardSubtitle className='subtitle'>
                    {places.tag}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            )
          })}

        {/* Modal dos pontos turísticos */}

        <IonModal isOpen={showSpecs} cssClass='specs-modal'>
          <IonContent className='specs'>
            <IonFab vertical='top' horizontal='start' slot='fixed'>
              <IonFabButton size='small' onClick={() => setShowSpecs(false)}>
                <IonIcon icon={arrowBack} />
              </IonFabButton>
            </IonFab>
            <div className='imgHeader'>
              <img alt='' className='' src={placeSelected.img}></img>
            </div>

            <div className='background'>
              <div className='title'>
                <IonTitle>{placeSelected.name}</IonTitle>
              </div>

              <IonGrid>
                <IonRow>
                  <IonCol className='ion-align-self-center address'>
                    {placeSelected.formatted_address}
                  </IonCol>
                  <IonCol className='ion-align-self-center'>
                    <IonButton
                      className='loc'
                      fill='outline'
                      href={placeSelected.url}
                    >
                      <IonIcon
                        slot='icon-only'
                        color='primary'
                        icon={locationSharp}
                      />
                      <IonLabel>Me guia!</IonLabel>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <div className='description'>
                <IonTitle>Descrição</IonTitle>
                <IonNote>{placeSelected.description}</IonNote>
              </div>

              <div className='close ion-margin-top ion-text-center'></div>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
export default Home
