import {
  IonButton,
  IonContent,
  IonPage,
  IonModal,
  IonInput,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonItem,
  IonCheckbox
} from '@ionic/react';
import React, { useState } from 'react';

import './Welcome.scss';

import meguiaLightSVG from '../assets/meguia-light.svg'
import { arrowBack } from 'ionicons/icons';


const Welcome: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" color="light" icon={arrowBack}></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding ion-text-center" color="primary">
        <img alt="" src={meguiaLightSVG} className="logo" />

        <div className="title ion-text-center">
          <h2>Bem-vindo!</h2>
          <p>Crie sua conta ou faça login</p>
        </div>

        <div className="ion-margin-top">

          <IonButton expand="block" className="ion-margin-top button" fill="outline" color="light" onClick={
            () => setShowRegister(true)}>
            CADASTRE-SE
          </IonButton>
          <IonButton expand="block" className="ion-margin-top button" color="light" onClick={
            () => setShowLogin(true)}>
            LOGIN
          </IonButton>


        </div>


        <IonModal isOpen={showLogin} cssClass='login-modal'>
          <IonContent className="ion-padding">
            <div className="title">
              <h4> LOGIN </h4>
              <p> Vamos começar </p>
            </div>

            <IonInput placeholder="Usuário" className="primary-input"></IonInput>
            <IonInput placeholder="Senha" type="password" className="primary-input"></IonInput>

            <div className="ion-margin-top ion-text-right forgot">
              <a>Esqueceu a senha?</a>
            </div>

            <IonButton expand="block" className="ion-margin-top button" color="primary">LOGIN</IonButton>

            <div className="ion-margin-top ion-text-center">
              <a onClick={() => setShowLogin(false)}> Fechar </a>
            </div>
          </IonContent>

        </IonModal>

        <IonModal isOpen={showRegister} cssClass='register-modal'>
          <IonContent className="ion-padding">
            <div className="ion-text-left titleSignup">
              <h4> Cadastre-se </h4>
              <p> Informe seus dados para continuar </p>
            </div>

            <IonInput placeholder="Nome fantasia" className="primary-input"></IonInput>
            <IonInput placeholder="CNPJ" className="primary-input" type="number"></IonInput>
            <IonInput placeholder="Senha" className="primary-input" type="password"></IonInput>
            <IonInput placeholder="Confirme a senha" className="primary-input" type="password"></IonInput>
            <IonItem>
              <p>Você concorda com os termos de uso:</p><IonCheckbox slot="end" color="primary" />
            </IonItem>
            <IonButton expand="block" className="ion-margin-top button">CADASTRAR-SE</IonButton>
            <div className="ion-margin-top ion-text-center">
              <a onClick={() => setShowRegister(false)}> Fechar </a>
            </div>
          </IonContent>



        </IonModal>





      </IonContent >
    </IonPage >
  )
}
export default Welcome;