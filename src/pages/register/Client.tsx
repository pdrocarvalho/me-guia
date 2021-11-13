import React, { useState } from "react"
import { useHistory } from "react-router"
import {
  IonAlert,
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
} from "@ionic/react"
import { arrowBack } from "ionicons/icons"

import "./Client.scss"
import { getAuth, updateProfile } from "@firebase/auth"
import { doc, collection, setDoc, serverTimestamp } from "@firebase/firestore"
import { db } from "../../services/firebaseConfig"

const Client: React.FC = () => {
  const auth: any = getAuth()
  const history = useHistory()
  const usersCollectionRef = collection(db, "users")
  const [chooseType, setChooseType] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [newStoreName, setNewStoreName] = useState("")
  const [newCnpj, setNewCnpj] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [newType, setNewType] = useState("")
  const [newImg, setNewImg] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)

  const updateInfo = async () => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        store_name: newStoreName,
        cnpj: newCnpj,
        address: newAddress,
        type: newType,
        img: newImg,
        description: newDescription,
        timestamp: serverTimestamp()
      })
      setShowAlert(true)
      console.log("Update success")
    } catch (error: any) {
      console.log(error.message)
    }
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
          <h4> Cadastre seu comércio! </h4>
          <p> Anuncie conosco e mostre seu comércio para o mundo! </p>
        </div>

        <IonInput
          placeholder="Nome fantasia"
          className="primary-input"
          onIonChange={(e: any) => setNewStoreName(e.target.value)}
        ></IonInput>
        <IonInput
          placeholder="CNPJ"
          className="primary-input"
          onIonChange={(e: any) => setNewCnpj(e.target.value)}
        ></IonInput>
        <IonInput
          placeholder="Endereço"
          className="primary-input"
          onIonChange={(e: any) => setNewAddress(e.target.value)}
        ></IonInput>
        <IonInput
          placeholder="Image"
          className="primary-input"
          onIonChange={(e: any) => setNewImg(e.target.value)}
        ></IonInput>
        <IonTextarea
          rows={6}
          cols={20}
          placeholder="Descrição"
          className="primary-input"
          onIonChange={(e: any) => setNewDescription(e.target.value)}
        ></IonTextarea>

        <IonItem>
          <IonLabel>Tipo de serviço:</IonLabel>
          <IonSelect
            placeholder="Select One"
            value={newType}
            onIonChange={(e) => setNewType(e.detail.value)}
          >
            <IonSelectOption value="Hospedaria">Hospedagem</IonSelectOption>
            <IonSelectOption value="Comércio">Comércio</IonSelectOption>
          </IonSelect>
        </IonItem>

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
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Sab. Dom. e feriados</IonLabel>
            <IonDatetime
              displayFormat="h m A"
              placeholder="Select Date"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
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
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Sab. Dom. e feriados</IonLabel>
            <IonDatetime
              displayFormat="h m A"
              placeholder="Select Date"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          className="ion-margin-top button"
          onClick={updateInfo}
        >
          ENVIAR
        </IonButton>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => history.push("/")}
        header={"Sucesso!"}
        subHeader={"Dados cadastrados com sucesso."}
        buttons={["OK"]}
      />
    </IonPage>
  )
}

export default Client
