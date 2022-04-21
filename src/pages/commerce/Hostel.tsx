import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { bagHandleOutline, trailSignOutline } from 'ionicons/icons'

import './Hostel.scss'
import bannerSvg from '../../assets/banner.svg'
import { useState, useEffect } from 'react'

import { db } from '../../services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'



const Hostel: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [hostels, setHostels] = useState<any>([])
  const [showSpecs, setShowSpecs] = useState(false)

  const usersCollectionRef = collection(db, 'users')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      const hostels = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id 
      }))
      setHostels(hostels.filter((hostel: any) => (hostel.type === 'hostel')))
    }
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar no-border>
          <IonButtons slot="start">
            <IonMenuButton color="light"></IonMenuButton>
          </IonButtons>
          <IonTitle></IonTitle>
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
            Durma <br></br>
            tranquilo!
          </div>
        </div>
        <div className="search">
          <IonSearchbar
            inputmode="search"
            animated={true}
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder="Pra onde quer ir...?"
          />
        </div>
        <IonToolbar className="navButtons">
          <IonButton
            routerLink="/store"
            slot="end"
            size="default"
            fill="outline"
            color="danger"
          >
            <IonIcon icon={bagHandleOutline}></IonIcon>
            <IonLabel>Comércio</IonLabel>
          </IonButton>
          <IonButton
            routerLink="/"
            slot="end"
            size="default"
            fill="outline"
            color="danger"
          >
            <IonIcon icon={trailSignOutline}></IonIcon>
            <IonLabel>Destinos</IonLabel>
          </IonButton>
        </IonToolbar>
        <div className="title2">
          <h2>Hospedagem</h2>
        </div>

        <IonList>
          {hostels.filter((hostels: any) => {
            if (searchText === '') {
              return hostels;
            } else if (
              hostels.store_name.toLowerCase().includes(searchText.toLocaleLowerCase())
            ) {
              return hostels;
            }
          }).map((hostels: any, index: any) => {
            return (
              <IonItem className="master" key={`item_${index}`}>
                <IonLabel>
                  <h2> {hostels.store_name} </h2>
                  <p> {hostels.address} </p>
                </IonLabel>

                <IonThumbnail slot="start">
                  <img alt="thumbnail" src={hostels.img} />
                </IonThumbnail>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Hostel
