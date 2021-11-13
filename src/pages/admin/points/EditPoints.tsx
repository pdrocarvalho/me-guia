import {
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAuth } from '@firebase/auth'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../../../services/firebaseConfig'

const EditPoints: React.FC = () => {
  const auth = getAuth()
  const pointsCollectionRef = collection(db, 'points')

  const [placeSelected, setPlaceSelected] = useState<any>([])
  const [points, setPoints] = useState<any>([])
  const [showSpecs, setShowSpecs] = useState(false)

  useEffect(() => {
    const getPoints = async () => {
      const data = await getDocs(pointsCollectionRef) // Faz req ao Firestore
      setPoints(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPoints()
  }, [])

  const showDetail = async (id: string) => {
    const place = await points.find((place: any) => place.place_id === id) // Acha o card selecionado dentro do array
    setPlaceSelected(place)
    await setShowSpecs(true)
  }

  return (
    <IonPage>
      <IonContent>
        <IonList>
          {points.map((point: any, index: any) => {
            return (
              <IonItem key={index} onClick={(e) => showDetail(point.place_id)}>
                <h2>{point.name}</h2>
              </IonItem>
            )
          })}
        </IonList>
        <IonModal isOpen={showSpecs} cssClass="edit-modal">
          <IonContent className="ion-padding">
            <IonInput
              placeholder="Email"
              className="primary-input"
              value={placeSelected.name}
              //   onIonChange={(e: any) => setRegisterEmail(e.target.value)}
            />
            <IonInput
              placeholder="Email"
              className="primary-input"
              value={placeSelected.formatted_address}
              //   onIonChange={(e: any) => setRegisterEmail(e.target.value)}
            />
            <IonInput
              placeholder="Email"
              className="primary-input"
              value={placeSelected.description}
              //   onIonChange={(e: any) => setRegisterEmail(e.target.value)}
            />
            <IonInput
              placeholder="Email"
              className="primary-input"
              value={placeSelected.img}
              //   onIonChange={(e: any) => setRegisterEmail(e.target.value)}
            />
            <IonInput
              placeholder="Email"
              className="primary-input"
              value={placeSelected.tag}
              //   onIonChange={(e: any) => setRegisterEmail(e.target.value)}
            />
            <IonInput
              placeholder="Email"
              className="primary-input"
              value={placeSelected.url}
              //   onIonChange={(e: any) => setRegisterEmail(e.target.value)}
            />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default EditPoints
