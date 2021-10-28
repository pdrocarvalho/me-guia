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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, getAuth } from 'firebase/auth'
//import { auth } from '../firebaseConfig'


/* ASSETS */
import meguiaLightSVG from '../assets/meguia-light.svg'
import { arrowBack } from 'ionicons/icons';
import './Welcome.scss';

const Welcome: React.FC = () => {
  /* States LOGIN */
  const [ showLogin, setShowLogin ] = useState(false)

  const [ loginEmail, setLoginEmail ] = useState('')
  const [ loginPassword, setLoginPassword ] = useState('')
  const [ userInfo, setUserInfo ] = useState('')
  
  /* States SIGN IN */
  const [ showRegister, setShowRegister ] = useState(false)

  const [ registerEmail, setRegisterEmail ] = useState('')
  const [ registerPassword, setRegisterPassword ] = useState('')
  const [ registerPasswordC, setRegisterPasswordC ] = useState('')
  const [ registerDisplayName, setRegisterDisplayName ] = useState('')
  const [ buttonDisable, setButtonDisable ] = useState(true)
const auth:any = getAuth()  
  /* Functions */
  auth.onAuthStateChanged(function (user:any) {
    if (user) {
      console.log("user logged in")
      setUserInfo(user.displayName)
      console.log(userInfo)
      console.log(user.uid)
    } else {
      console.log("user NOT logged in")
    }
  })
  /*  onAuthStateChanged(auth, (currentUser:any) => {
  setUser(currentUser);
  console.log(user)
});*/
  
  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      
    } catch(error:any) {
      console.log(error.message)
    }
  }
  
  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    } catch(error:any) {
      console.log(error.message);
    }
    
  }
  
  const logoutUser = async () => {
    await signOut(auth)
  }
  
  
  return (
    <IonPage>
      <IonHeader className="header-welcome ion-no-border">
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
            onIonChange={(e:any) => setLoginEmail(e.target.value)} 
            />
            <IonInput placeholder="Senha" type="password" className="primary-input" 
            onIonChange={(e:any) => setLoginPassword(e.target.value)}
            />

            <div className="ion-margin-top ion-text-right forgot">
              <a onClick={ logoutUser }>Esqueceu a senha?</a>
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
            <IonInput placeholder="Nome de usuário" className="primary-input" type="text" 
            onIonChange={(e:any) => setRegisterDisplayName(e.target.value)}
            />
            <IonInput placeholder="Email" className="primary-input" 
            onIonChange={(e:any) => setRegisterEmail(e.target.value)}
            />
            <IonInput placeholder="Senha" className="primary-input" type="password" 
            onIonChange={(e:any) => setRegisterPassword(e.target.value)}
            />
            <IonInput placeholder="Confirme a senha" className="primary-input" type="password" 
            onIonChange={(e:any) => setRegisterPasswordC(e.target.value)}
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