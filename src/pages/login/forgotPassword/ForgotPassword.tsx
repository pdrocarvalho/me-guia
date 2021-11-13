/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    IonButton,
    IonContent,
    IonPage,
    IonInput,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonAlert,
  } from "@ionic/react";
  import React, { useState } from "react";
  //import { useHistory } from "react-router";
  import {
    getAuth,
    sendPasswordResetEmail,
  } from "firebase/auth";
  //import { auth } from '../firebaseConfig'
  
  /* ASSETS */
  import meguiaLightSVG from "../../../assets/meguia-light.svg";
  import { arrowBack } from "ionicons/icons";
  //import "./Welcome.scss";
  
  const ForgotPassword: React.FC = () => {
   // let history = useHistory();
  
  
    const [emailReset, setEmailReset] = useState("");
    
    const auth: any = getAuth();
  
    /* State Alert */
    const [showAlertSent, setShowAlertSent] = useState(false);
  
    /* Functions */
    /*  onAuthStateChanged(auth, (currentUser:any) => {
    setUser(currentUser);
    console.log(user)
  });*/
  const resetPassword = async () => {
      try {
          await sendPasswordResetEmail(auth, emailReset)
      } catch (error:any) {
          console.log(error.message)
      }
  }

 
    return (
      <IonPage>
        <IonHeader className="header-welcome ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref="/"
                color="light"
                icon={arrowBack}
              ></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
  
        <IonContent class="ion-padding ion-text-center" color="primary">
          <img alt="" src={meguiaLightSVG} className="logo" />
  
          <div className="title ion-text-center">
            <h2>Esqueceu a senha?</h2>
            <p>Informe seu e-mail abaixo</p>
          </div>
  
          <div className="ion-margin-top">
          <IonInput
                placeholder="E-mail..."
                className="primary-input"
                onIonChange={(e: any) => setEmailReset(e.target.value)}
              />
            
            <IonButton
              expand="block"
              className="ion-margin-top button"
              color="danger"
              onClick={resetPassword}
            >
              Recuperar Senha
            </IonButton>
          </div>
  
          
  
          
          <IonAlert
            isOpen={showAlertSent}
            onDidDismiss={() => setShowAlertSent(false)}
            header={"ERRO"}
            message={"As senhas são diferentes!"}
            buttons={["OK"]}
          />
        </IonContent>
      </IonPage>
    );
  };
  export default ForgotPassword;
  