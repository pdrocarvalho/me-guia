import {
  IonButton,
  IonBackButton,
  IonContent,
  IonInput,
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
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAuth } from '@firebase/auth'
import { collection, getDocs, updateDoc, doc } from '@firebase/firestore'
import { db } from '../../../services/firebaseConfig'
import { arrowBack, closeOutline } from 'ionicons/icons'

import "./EditPoints.scss"

const EditPoints: React.FC = () => {
  const auth = getAuth()
  const pointsCollectionRef = collection(db, 'points')
/*State Searchbar */
  const [searchText, setSearchText] = useState("")
/*State dos Pontos Turísticos */
  const [points, setPoints] = useState<any>([])
/*State Modal */
  const [showSpecs, setShowSpecs] =               useState(false)
  const [placeSelected, setPlaceSelected] =       useState<any>([])
  const [placeName, setPlaceName] =               useState("")
  const [placeAddress, setPlaceAddress] =         useState("")
  const [placeDescription, setPlaceDescription] = useState("")
  const [placeImage, setPlaceImage] =             useState("")
  const [placeTag, setPlaceTag] =                 useState("")
  const [placeUrl, setPlaceUrl] =                 useState("")


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

  const updateName = async(id:string) => {
    const pointDoc = doc(db, "points", id)
    const newData = {
      name: placeName
    }
    await updateDoc(pointDoc, newData)
  }

  const updateAddress = async(id:string) => {
    const pointDoc = doc(db, "points", id)
    const newData = {
      formatted_address: placeAddress
    }
    await updateDoc(pointDoc, newData)
  }

  const updateDescription = async(id:string) => {
    const pointDoc = doc(db, "points", id)
    const newData = {
      description: placeDescription,
    }
    await updateDoc(pointDoc, newData)
  }

  const updateImage = async(id:string) => {
    const pointDoc = doc(db, "points", id)
    const newData = {
      img: placeImage,
    }
    await updateDoc(pointDoc, newData)
  }
  
  const updateTag = async(id:string) => {
    const pointDoc = doc(db, "points", id)
    const newData = {
      tag: placeTag,
    }
    await updateDoc(pointDoc, newData)
  }

  const updateUrl = async(id:string) => {
    const pointDoc = doc(db, "points", id)
    const newData = {
      url: placeUrl
    }
    await updateDoc(pointDoc, newData)
  }

  return (
    <IonPage>
      <IonContent>
      <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/"
              color="primary"
              icon={arrowBack}
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <div className='titlepage'>
          <IonLabel>Escolha um ponto turístico para editar:</IonLabel>
        </div>
      <div className="searchPoint">
          <IonSearchbar
            inputmode="search"
            animated={true}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder="Pesquise aqui!"
          ></IonSearchbar>
        </div>
        <IonList>
          {points.filter((places: any) =>{
            if (searchText === "") {
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
        <IonModal isOpen={showSpecs} cssClass="edit-modal">
          <IonContent className="ion-padding">
            <div className='header-modal'>
              <IonFab vertical="top" horizontal="end">
                <IonFabButton size="small" onClick={() => setShowSpecs(false)}>
                  <IonIcon icon={closeOutline} />
               </IonFabButton>
              </IonFab>
              <a className='info'>Atualize as informações do ponto turístico aqui:</a>
            </div>
            <IonLabel>Nome:</IonLabel>
            <IonInput
              placeholder={placeSelected.name}
              //value={placeSelected.name}
              className="primary-input"
              
              onIonChange={(e: any) => setPlaceName(e.target.value)}
            />
            <IonButton
              expand="block"
              className="ion-margin-top button"
              onClick={() => {updateName(placeSelected.id)}}
            >
              Atualizar
            </IonButton>
            <IonLabel>Endereço:</IonLabel>
            <IonInput
              placeholder={placeSelected.formatted_address}
              className="primary-input"
              clearOnEdit={true}
              onIonChange={(e: any) => setPlaceAddress(e.target.value)}
            />
            <IonButton
              expand="block"
              className="ion-margin-top button"
              onClick={() => {updateAddress(placeSelected.id)}}
            >
              Atualizar
            </IonButton>
            <IonLabel>Descrição:</IonLabel>
            <IonTextarea
              rows={6}
              cols={20}
              placeholder={placeSelected.description}
              className="primary-input"
              //value={placeSelected.description}
              onIonChange={(e: any) => setPlaceDescription(e.target.value)}
            ></IonTextarea>
            <IonButton
              expand="block"
              className="ion-margin-top button"
              onClick={() => {updateDescription(placeSelected.id)}}
            >
              Atualizar
            </IonButton>
            <IonLabel>Imagem:</IonLabel>
            <IonInput
              placeholder={placeSelected.img}
              className="primary-input"
              //value={placeSelected.img}
              onIonChange={(e: any) => setPlaceImage(e.target.value)}
            />
            <IonButton
              expand="block"
              className="ion-margin-top button"
              onClick={() => {updateImage(placeSelected.id)}}
            >
              Atualizar
            </IonButton>
            <IonLabel>Tag:</IonLabel>
            <IonInput
              placeholder={placeSelected.tag}
              className="primary-input"
              //value={placeSelected.tag}
              onIonChange={(e: any) => setPlaceTag(e.target.value)}
            />
            <IonButton
              expand="block"
              className="ion-margin-top button"
              onClick={() => {updateTag(placeSelected.id)}}
            >
              Atualizar
            </IonButton>
            <IonLabel>URL Google Maps:</IonLabel>
            <IonInput
              placeholder={placeSelected.url}
              className="primary-input"
              //value={placeSelected.url}
              onIonChange={(e: any) => setPlaceUrl(e.target.value)}
            />

            <IonButton
              expand="block"
              className="ion-margin-top button"
              onClick={() => {updateUrl(placeSelected.id)}}
            >
              Atualizar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default EditPoints
