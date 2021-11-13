import React, { useState } from "react"
import { useHistory } from "react-router"
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTextarea,
  IonToolbar,
} from "@ionic/react"
import { arrowBack } from "ionicons/icons"

import { db } from "../../services/firebaseConfig"
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore"

import "./Report.scss"
const Register: React.FC = () => {
  let history = useHistory()
  const [name, setName] = useState("")
  
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  

  /* FUNCTIONS */
  const sendReport = async () => {
    try {
      const docRef = await addDoc(collection(db, "reports"), {
        name: name,
        email: email,
        description: description,
        timestamp: serverTimestamp(),
        date: Timestamp.now().toDate().toString(),
      })
      await setShowAlert(true)
      console.log("Report salvo com o id:", docRef.id)
    } catch (error:any) {
        
      console.error(error)
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
          <h4> Fale conosco! </h4>
          <p> Deixe sua mensagem abaixo! Não esuqeça de se identificar para que possamos retornar. </p>
        </div>

        <IonInput
          placeholder="Nome"
          className="primary-input"
          onIonChange={(e: any) => setName(e.target.value)}
        />
        <IonInput
          placeholder="E-mail"
          className="primary-input"
          onIonChange={(e: any) => setEmail(e.target.value)}
        />
        <IonTextarea
          rows={6}
          cols={20}
          placeholder="Deixe sua mensagem.."
          className="primary-input"
          onIonChange={(e: any) => setDescription(e.target.value)}
        />

        <IonButton
          expand="block"
          className="ion-margin-top button"
          onClick={sendReport}
        >
          ENVIAR
        </IonButton>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header={"Sucesso!"}
        subHeader={
          "Seu report foi enviado com sucesso e será respondido dentro de 48 horas"
        }
        buttons={["OK"]}
        onDidDismiss={() => history.push("/")}
      />
      
    </IonPage>
  )
}

export default Register
