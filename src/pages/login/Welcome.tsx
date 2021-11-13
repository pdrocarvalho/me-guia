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
  IonCheckbox,
  IonAlert,
} from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth'

//import { auth } from '../firebaseConfig'

/* ASSETS */
import meguiaLightSVG from '../../assets/meguia-light.svg'
import { arrowBack } from 'ionicons/icons'
import './Welcome.scss'

const Welcome: React.FC = () => {
  let history = useHistory()

  /* States LOGIN */
  const [showLogin, setShowLogin] = useState(false)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [error, setError] = useState('')
  const [showAlertErrorAuth, setShowAlertErrorAuth] = useState(false)

  /* States SIGN IN */
  const [showRegister, setShowRegister] = useState(false)

  const [buttonDisable, setButtonDisable] = useState(true)
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPasswordC, setRegisterPasswordC] = useState('')
  const auth: any = getAuth()

  /* State Alert */
  const [showAlertPassword, setShowAlertPassword] = useState(false)

  /* Functions */
  auth.onAuthStateChanged(function (user: any) {
    if (user) {
      console.log('user logged in')
      setUserInfo(user.displayName)
      console.log(userInfo)
      console.log(user.uid)
    } else {
      console.log('user NOT logged in')
    }
  })
  /*  onAuthStateChanged(auth, (currentUser:any) => {
  setUser(currentUser);
  console.log(user)
});*/

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (error: any) {
      switch (error.message) {
        case 'Firebase: Error (auth/invalid-email).':
          setError('Email inválido!')

          break
        case 'Firebase: Error (auth/user-not-found).':
          setError('Usuário não encontrado!')
          break
        case 'Firebase: Error (auth/wrong-password).':
          setError('Senha incorreta!')
          break
        default:
          setError('ERROR!?')
          break
      }
      await setShowAlertErrorAuth(true)
      console.log(error.message)
    }
  }

  const registerUser = async () => {
    if (registerPassword === registerPasswordC) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        )
        await history.push('/register/client')
        setShowRegister(false)
      } catch (error: any) {
        console.log(error.message)
      }
    } else {
      setShowAlertPassword(true)
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
          <h2>Bem-vindo!</h2>
          <p>Crie sua conta ou faça login</p>
        </div>

        <div className="ion-margin-top">
          <IonButton
            expand="block"
            className="ion-margin-top button"
            fill="outline"
            color="light"
            onClick={() => setShowRegister(true)}
          >
            CADASTRE-SE
          </IonButton>
          <IonButton
            expand="block"
            className="ion-margin-top button"
            color="light"
            onClick={() => setShowLogin(true)}
          >
            LOGIN
          </IonButton>
        </div>

        {/* MODAL LOGIN */}
        <IonModal
          isOpen={showLogin}
          cssClass="login-modal"
          onDidDismiss={() => setShowLogin(false)}
        >
          <IonContent className="ion-padding">
            <div className="title">
              <h4> LOGIN </h4>
              <p> Vamos começar </p>
            </div>

            <IonInput
              placeholder="Usuário"
              className="primary-input"
              onIonChange={(e: any) => setLoginEmail(e.target.value)}
            />
            <IonInput
              placeholder="Senha"
              type="password"
              className="primary-input"
              onIonChange={(e: any) => setLoginPassword(e.target.value)}
            />

            <div className="ion-margin-top ion-text-right forgot">
              <a href="/welcome/forgotpassword">Esqueceu a senha?</a>
            </div>

            <IonButton
              expand="block"
              className="ion-margin-top button"
              color="primary"
              onClick={loginUser}
            >
              LOGIN
            </IonButton>

            <div className="ion-margin-top ion-text-center">
              <a onClick={() => setShowLogin(false)}> Fechar </a>
            </div>
          </IonContent>
        </IonModal>

        {/* MODAL CADASTRO */}
        <IonModal
          isOpen={showRegister}
          cssClass="register-modal"
          onDidDismiss={() => setShowRegister(false)}
        >
          <IonContent className="ion-padding">
            <div className="ion-text-left titleSignup">
              <h4> Cadastre-se </h4>
              <p> Informe seus dados para continuar </p>
            </div>

            <IonInput
              placeholder="Email"
              className="primary-input"
              onIonChange={(e: any) => setRegisterEmail(e.target.value)}
            />
            <IonInput
              placeholder="Senha"
              className="primary-input"
              type="password"
              onIonChange={(e: any) => setRegisterPassword(e.target.value)}
            />
            <IonInput
              placeholder="Confirme a senha"
              className="primary-input"
              type="password"
              onIonChange={(e: any) => setRegisterPasswordC(e.target.value)}
            />
            <IonItem>
              <p>Você concorda com os termos de uso:</p>
              <IonCheckbox
                slot="end"
                color="primary"
                onIonChange={(e: any) => setButtonDisable(false)}
              />
            </IonItem>
            <IonButton
              expand="block"
              className="ion-margin-top button"
              disabled={buttonDisable}
              onClick={registerUser}
            >
              CADASTRAR-SE
            </IonButton>
            <div className="ion-margin-top ion-text-center">
              <a onClick={() => setShowRegister(false)}> Fechar </a>
            </div>
          </IonContent>
        </IonModal>
        <IonAlert
          isOpen={showAlertPassword}
          onDidDismiss={() => setShowAlertPassword(false)}
          header={'ERRO'}
          message={'As senhas são diferentes!'}
          buttons={['OK']}
        />
        <IonAlert
          isOpen={showAlertErrorAuth}
          onDidDismiss={() => setShowAlertErrorAuth(false)}
          header={error}
          message={'Tente novamente'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  )
}
export default Welcome
