/* eslint-disable array-callback-return */
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
import { arrowBack, bedOutline, locationSharp, trailSignOutline } from 'ionicons/icons'

import './Store.scss'
import bannerSvg from '../../assets/banner.svg'
import { useState, useEffect } from 'react'

import { db } from '../../services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

let storeSelected: any = []

const Store: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [users, setUsers] = useState<any>([])
  const [showSpecs, setShowSpecs] = useState(false)

  const usersCollectionRef = collection(db, 'users')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      const stores = data.docs.map((doc) => ({
        //carrega os docs do firebase para [stores]
        ...doc.data(),
        id: doc.id,
      }))
      setUsers(stores.filter((store: any) => store.tag === 'Comércio')) //filtra
      console.log(stores)
    }
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showDetails = async (id: any) => {
    const store = await users.find((users: any) => users.cnpj === id)
    storeSelected = store
    await setShowSpecs(true)
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
        <div className='banner'>
          <img alt='' src={bannerSvg} />

          <div className='heading ion-padding'>
            Não esqueça <br></br>
            de levar uma lembrança!
          </div>
        </div>
        <div className='search'>
          <IonSearchbar
            inputmode='search'
            animated={true}
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder='Pra onde quer ir...?'
          ></IonSearchbar>
        </div>
        <IonToolbar className='navButtons'>
          <IonButton
            routerLink='/Hostel'
            slot='end'
            size='default'
            fill='outline'
            color='danger'
          >
            <IonIcon icon={bedOutline}></IonIcon>
            <IonLabel>Hospedagem</IonLabel>
          </IonButton>
          <IonButton
            routerLink='/'
            slot='end'
            size='default'
            fill='outline'
            color='danger'
          >
            <IonIcon icon={trailSignOutline}></IonIcon>
            <IonLabel>Destinos</IonLabel>
          </IonButton>
        </IonToolbar>
        <div className='title2'>
          <h2>Comércio</h2>
        </div>

        <IonList>
          {users
            .filter((users: any) => {
              if (searchText === '') {
                return users
              } else if (users.name.toLowerCase().includes(searchText.toLowerCase())) {
                return users
              }
            })
            .map((users: any, index: any) => {
              return (
                <IonItem
                  className='master'
                  key={`item_${index}`}
                  onClick={(e) => showDetails(`${users.cnpj}`)}
                >
                  <IonLabel>
                    <h2> {users.name} </h2>
                    <p> {users.formatted_address} </p>
                  </IonLabel>

                  <IonThumbnail slot='start'>
                    <img alt='thumbnail' src={users.img} />
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
              <img alt='' className='' src={storeSelected.img}></img>
            </div>

            <div className='background'>
              <div className='title'>
                <IonTitle>{storeSelected.name}</IonTitle>
              </div>

              <IonGrid>
                <IonRow>
                  <IonCol className='ion-align-self-center address'>
                    {storeSelected.formatted_address}
                  </IonCol>
                  <IonCol className='ion-align-self-center'>
                    <IonButton className='loc' fill='outline' href={storeSelected.url}>
                      <IonIcon slot='icon-only' color='primary' icon={locationSharp} />
                      <IonLabel>Me guia!</IonLabel>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <div className='description'>
                <IonTitle>Descrição</IonTitle>
                <IonNote>{storeSelected.description}</IonNote>
              </div>

              <div className='close ion-margin-top ion-text-center'></div>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default Store
