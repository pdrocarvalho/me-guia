/* eslint-disable jsx-a11y/anchor-is-valid */
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
  /* States LOGIN */
  const [ showLogin, setShowLogin ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  
  /* States SIGN IN */
  const [ showRegister, setShowRegister ] = useState(false)
  const [ newUsername, setNewUsername ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ newPasswordConfirmation, setNewPasswordConfirmation ] = useState('')
  const [ buttonDisable, setButtonDisable ] = useState(true)

  /* Functions */
  function loginUser() {
    console.log(username, password)
  }

  function registerUser() {
    console.log( newUsername, newPassword, newPasswordConfirmation)
  }


  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" color="light" icon={arrowBack}></IonBackButton>
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

        {/* MODAL LOGIN */}
        <IonModal isOpen={showLogin} cssClass='login-modal'>
          <IonContent className="ion-padding">
            <div className="title">
              <h4> LOGIN </h4>
              <p> Vamos começar </p>
            </div>

            <IonInput placeholder="Usuário" className="primary-input" 
            onIonChange={(e:any) => setUsername(e.target.value)} 
            />
            <IonInput placeholder="Senha" type="password" className="primary-input" 
            onIonChange={(e:any) => setPassword(e.target.value)}
            />

            <div className="ion-margin-top ion-text-right forgot">
              <a>Esqueceu a senha?</a>
            </div>

            <IonButton expand="block" className="ion-margin-top button" color="primary"
            onClick={loginUser}>
              LOGIN
              </IonButton>

            <div className="ion-margin-top ion-text-center">
              <a onClick={() => setShowLogin(false)}> Fechar </a>
            </div>
          </IonContent>

        </IonModal>

        {/* MODAL CADASTRO */}
        <IonModal isOpen={showRegister} cssClass='register-modal'>
          <IonContent className="ion-padding">
            <div className="ion-text-left titleSignup">
              <h4> Cadastre-se </h4>
              <p> Informe seus dados para continuar </p>
            </div>

            <IonInput placeholder="Nome fantasia" className="primary-input" />
            <IonInput placeholder="CNPJ" className="primary-input" type="number" />
            <IonInput placeholder="Nome de usuário" className="primary-input" 
            onIonChange={(e:any) => setNewUsername(e.target.value)}
            />
            <IonInput placeholder="Senha" className="primary-input" type="password" 
            onIonChange={(e:any) => setNewPassword(e.target.value)}
            />
            <IonInput placeholder="Confirme a senha" className="primary-input" type="password" 
            onIonChange={(e:any) => setNewPasswordConfirmation(e.target.value)}
            />
            <IonItem>
              <p>Você concorda com os termos de uso:</p><IonCheckbox slot="end" color="primary" 
              onIonChange={(e:any) => setButtonDisable(false)}
              />
            </IonItem>
            <IonButton expand="block" className="ion-margin-top button" disabled={buttonDisable}
            onClick={registerUser}
            >CADASTRAR-SE</IonButton>
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