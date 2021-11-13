import React, { useState } from 'react'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToolbar,
} from '@ionic/react'
import { arrowBack } from 'ionicons/icons'

import './Points.scss'
import { db } from '../../services/firebaseConfig'
import { getAuth } from '@firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
// import axios from 'axios'
const axios = require('axios')
const Points: React.FC = () => {
  const auth: any = getAuth()
  const usersCollectionRef = collection(db, 'points')
  const [placeId, setPlaceId] = useState('')
  const [newName, setNewName] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newImg, setNewImg] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [tag, setTag] = useState('')
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCNnkyQyi1Im0cwqEHZb80KNoQXUF1un4k`,
    header: {},
  }
  const getPlace = async () => {
    await axios(config)
      .then(function (res: any) {
        console.log(res.data)
      })
      .catch(function (error: any) {
        console.log(error)
      })
  }
  const createPoint = async () => {
    await addDoc(usersCollectionRef, {
      place_id: placeId,
      name: newName,
      url: newUrl,
      fromated_address: newAddress,
      img: newImg,
      description: newDescription,
      tag: tag,
    })
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/"
              color="primary"
              icon={arrowBack}
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="ion-text-center titleSignup">
          <h4> Cadastre seu ponto turístico! </h4>
          <p>
            {' '}
            Preencha todas as informações disponíveis sobre o novo ponto
            turístico. Tente conseguir o máximo de informações.{' '}
          </p>
        </div>
        <IonGrid className="ion-no-margin">
          <IonRow>
            <IonCol size="8">
              <IonInput
                placeholder="ID do Google Maps"
                className="primary-input"
                onIonChange={(e: any) => setPlaceId(e.target.value)}
              ></IonInput>
            </IonCol>
            <IonCol size="2">
              <IonButton onClick={getPlace}>Checar ID</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonInput
          placeholder="Nome do ponto turístico"
          className="primary-input"
          onIonChange={(e: any) => setNewName(e.target.value)}
        ></IonInput>
        <IonInput
          placeholder="Cole aqui a url do Google Maps"
          className="primary-input"
          onIonChange={(e: any) => setNewUrl(e.target.value)}
        ></IonInput>
        <IonInput
          placeholder="Escreva aqui o endereço do ponto turístico"
          className="primary-input"
          onIonChange={(e: any) => setNewAddress(e.target.value)}
        ></IonInput>
        <IonInput
          placeholder="Url da imagem mais bonita do ponto turístico"
          className="primary-input"
          onIonChange={(e: any) => setNewImg(e.target.value)}
        ></IonInput>
        <IonTextarea
          rows={6}
          cols={20}
          placeholder="Escreva uma breve descrição do ponto turístico"
          className="primary-input"
          onIonChange={(e: any) => setNewDescription(e.target.value)}
        ></IonTextarea>
        <p />
        <IonLabel>Selecione o tipo de ponto turístico: </IonLabel>

        <IonSelect
          value={tag}
          placeholder="Escolha um"
          onIonChange={(e: any) => setTag(e.target.value)}
        >
          <IonSelectOption value="Praia">Praia</IonSelectOption>
          <IonSelectOption value="Ponto Histórico">
            Ponto Histórico
          </IonSelectOption>
        </IonSelect>
        <p />

        <h4> Quais dias o estabelecimento funciona?</h4>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel color="danger">D</IonLabel>
              <br></br>
              <IonCheckbox color="danger" />
            </IonCol>
            <IonCol>
              <IonLabel color="primary">S</IonLabel>
              <br></br>
              <IonCheckbox color="primary" />
            </IonCol>
            <IonCol>
              <IonLabel color="primary">T</IonLabel>
              <br></br>
              <IonCheckbox color="primary" />
            </IonCol>
            <IonCol>
              <IonLabel color="primary">Q</IonLabel>
              <br></br>
              <IonCheckbox color="primary" />
            </IonCol>
            <IonCol>
              <IonLabel color="primary">Q</IonLabel>
              <br></br>
              <IonCheckbox color="primary" />
            </IonCol>
            <IonCol>
              <IonLabel color="primary">S</IonLabel>
              <br></br>
              <IonCheckbox color="primary" />
            </IonCol>
            <IonCol>
              <IonLabel color="danger">S</IonLabel>
              <br></br>
              <IonCheckbox color="danger" />
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList>
          <IonLabel color="primary">
            <h2>Qual horário o estabelecimento abre?</h2>
          </IonLabel>
          <IonItem>
            <IonLabel>Dias úteis</IonLabel>
            <IonDatetime
              displayFormat="h m A"
              placeholder="Select Date"
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Sab. Dom. e feriados</IonLabel>
            <IonDatetime
              displayFormat="h m A"
              placeholder="Select Date"
            ></IonDatetime>
          </IonItem>
          <br></br>
          <IonLabel color="primary">
            <h2>Qual horário o estabelecimento abre?</h2>
          </IonLabel>
          <IonItem>
            <IonLabel>Dias úteis</IonLabel>
            <IonDatetime
              displayFormat="h m A"
              placeholder="Select Date"
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Sab. Dom. e feriados</IonLabel>
            <IonDatetime
              displayFormat="h m A"
              placeholder="Select Date"
            ></IonDatetime>
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          className="ion-margin-top button"
          onClick={createPoint}
        >
          ENVIAR
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Points
