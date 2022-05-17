import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPage,
  IonRow,
  IonSearchbar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {
  arrowBack,
  bagHandleOutline,
  locationSharp,
  trailSignOutline,
} from 'ionicons/icons'

import './Hostel.scss'
import bannerSvg from '../../assets/banner.svg'
import { useState, useEffect } from 'react'

import { db } from '../../services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const Hostel: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [hostels, setHostels] = useState<any>([])
  const [hostelSelected, setHostelSelected] = useState<any>([])
  const [showSpecs, setShowSpecs] = useState(false)

  const usersCollectionRef = collection(db, 'users')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      const hostels = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setHostels(hostels.filter((hostel: any) => hostel.tag === 'Hospedagem'))
    }
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showDetails = async (id: any) => {
    const hostel = await hostels.find((users: any) => users.id === id)
    setHostelSelected(hostel)
    setShowSpecs(true)
  }
  return (
    <IonPage>
      <IonHeader class='ion-no-border'>
        <IonToolbar no-border>
          <IonButtons slot='start'>
            <IonMenuButton color='light'></IonMenuButton>
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
        <div className='banner'>
          <img alt='' src={bannerSvg} />

          <div className='heading ion-padding'>
            Durma <br></br>
            tranquilo!
          </div>
        </div>
        <div className='search'>
          <IonSearchbar
            inputmode='search'
            animated={true}
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder='Pra onde quer ir...?'
          />
        </div>
        <IonToolbar className='navButtons'>
          <IonButton
            href='/store'
            slot='end'
            size='default'
            fill='outline'
            color='danger'
          >
            <IonIcon icon={bagHandleOutline}></IonIcon>
            <IonLabel>Comércio</IonLabel>
          </IonButton>
          <IonButton href='/' slot='end' size='default' fill='outline' color='danger'>
            <IonIcon icon={trailSignOutline}></IonIcon>
            <IonLabel>Destinos</IonLabel>
          </IonButton>
        </IonToolbar>
        <div className='title2'>
          <h2>Hospedagem</h2>
        </div>

        <IonList>
          {hostels
            .filter((hostels: any) => {
              if (searchText === '') {
                return hostels
              } else if (
                hostels.name.toLowerCase().includes(searchText.toLocaleLowerCase())
              ) {
                return hostels
              }
            })
            .map((hostels: any, index: any) => {
              return (
                <IonItem
                  className='master'
                  key={`item_${index}`}
                  onClick={(e) => showDetails(`${hostels.id}`)}
                >
                  <IonLabel>
                    <h2> {hostels.name} </h2>
                    <p> {hostels.formatted_address} </p>
                  </IonLabel>

                  <IonThumbnail slot='start'>
                    <img alt='thumbnail' src={hostels.img} />
                  </IonThumbnail>
                </IonItem>
              )
            })}
        </IonList>
        <IonModal isOpen={showSpecs} cssClass='specs-modal'>
          <IonContent className='specs'>
            <IonFab vertical='top' horizontal='start' slot='fixed'>
              <IonFabButton size='small' onClick={() => setShowSpecs(false)}>
                <IonIcon icon={arrowBack} />
              </IonFabButton>
            </IonFab>
            <div className='imgHeader'>
              <img alt='' className='' src={hostelSelected.img}></img>
            </div>

            <div className='background'>
              <div className='title'>
                <IonTitle>{hostelSelected.name}</IonTitle>
              </div>

              <IonGrid>
                <IonRow>
                  <IonCol className='ion-align-self-center address'>
                    {hostelSelected.formatted_address}
                  </IonCol>
                  <IonCol className='ion-align-self-center'>
                    <IonButton className='loc' fill='outline' href={hostelSelected.url}>
                      <IonIcon slot='icon-only' color='primary' icon={locationSharp} />
                      <IonLabel>Me guia!</IonLabel>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <div className='description'>
                <IonTitle>Descrição</IonTitle>
                <IonNote>{hostelSelected.description}</IonNote>
              </div>

              <div className='close ion-margin-top ion-text-center'></div>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default Hostel
