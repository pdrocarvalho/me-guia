import {
  IonButton,
  IonBackButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTextarea,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonAlert,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAuth } from '@firebase/auth'
import { collection, getDocs, deleteDoc, doc } from '@firebase/firestore'
import { db } from '../../../services/firebaseConfig'
import { arrowBack, closeOutline } from 'ionicons/icons'

import './DeletePoints.scss'

const DeletePoints: React.FC = () => {
  let history = useHistory()

  const auth = getAuth()
  const pointsCollectionRef = collection(db, 'points')
  /*State Searchbar */
  const [searchText, setSearchText] = useState('')
  /*State dos Pontos Turísticos */
  const [points, setPoints] = useState<any>([])
  /*State Modal */
  const [showSpecs, setShowSpecs] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [placeSelected, setPlaceSelected] = useState<any>([])

  useEffect(() => {
    const getPoints = async () => {
      const data = await getDocs(pointsCollectionRef) // Faz req ao Firestore
      setPoints(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPoints()
  }, [])

  const showDetail = async (id: string) => {
    const place = await points.find((place: any) => place.id === id) // Acha o card selecionado dentro do array
    setPlaceSelected(place)
    await setShowSpecs(true)
  }

  const deletePoint = async (id: string) => {
    const pointDoc = doc(db, 'points', id)
    await deleteDoc(pointDoc)
    setShowAlert(true)
  }

  return (
    <IonPage>
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          header={'Sucesso!'}
          message={'Seu ponto foi deletado com sucesso.'}
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                history.push('/admin/panel')
              },
            },
          ]}
          onDidDismiss={() => setShowSpecs(false)}
        />
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton
              defaultHref='/'
              color='primary'
              icon={arrowBack}
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <div className='titlepage'>
          <IonLabel>Escolha um ponto turístico para editar:</IonLabel>
        </div>
        <div className='searchPoint'>
          <IonSearchbar
            inputmode='search'
            animated={true}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder='Pesquise aqui!'
          ></IonSearchbar>
        </div>
        <IonList>
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
            .map((point: any, index: any) => {
              return (
                <IonItem key={index} onClick={(e) => showDetail(point.id)}>
                  <h2>{point.name}</h2>
                </IonItem>
              )
            })}
        </IonList>
        <IonModal isOpen={showSpecs} cssClass='edit-modal'>
          <IonContent className='ion-padding'>
            <div className='header-modal'>
              <IonFab vertical='top' horizontal='end'>
                <IonFabButton size='small' onClick={() => setShowSpecs(false)}>
                  <IonIcon icon={closeOutline} />
                </IonFabButton>
              </IonFab>
              <a className='info'>
                Delete as informações do ponto turístico aqui:
              </a>
            </div>
            <div className='background'>
              <div className='title'>
                <IonTitle>{placeSelected.name}</IonTitle>
              </div>
              <div className='imgHeader'>
                <img alt='' className='' src={placeSelected.img}></img>
              </div>
              <IonGrid>
                <IonRow>
                  <IonCol className='ion-align-self-center address'>
                    {placeSelected.formatted_address}
                  </IonCol>
                  <IonCol className='ion-align-self-center'></IonCol>
                </IonRow>
              </IonGrid>

              <div className='description'>
                <IonTitle>Descrição</IonTitle>
                <IonNote>{placeSelected.description}</IonNote>
              </div>

              <div className='close ion-margin-top ion-text-center'></div>
            </div>
            <IonButton
              expand='block'
              color='danger'
              onClick={() => {
                deletePoint(placeSelected.id)
              }}
            >
              DELETAR PONTO
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default DeletePoints
