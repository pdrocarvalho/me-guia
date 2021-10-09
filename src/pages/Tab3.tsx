import {
  IonButton,
  IonContent,
  IonPage,
  IonModal,
  IonInput
} from '@ionic/react';
import React, { useState } from 'react';

import './Tab3.scss';

import meguiaLightSVG from '../assets/meguia-light.svg'


const Tab3: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonContent class="ion-padding ion-text-center" color="primary">
        <img alt="" src={meguiaLightSVG} className="logo" />

        <div className="title ion-text-center">
          <h2>Bem-vindo!</h2>
          <p>Crie sua conta ou faça login</p>
        </div>

        <div className="ion-margin-top">

          <IonButton expand="block" className="ion-margin-top button" fill="outline" color="light" href="/login">CADASTRE-SE</IonButton>
          <IonButton expand="block" className="ion-margin-top button" color="light" onClick={
            () => setShowModal(true)}>
            LOGIN
          </IonButton>


        </div>


        <IonModal isOpen={showModal} cssClass='login-modal'>
          <IonContent className="ion-padding">
            <div className="title">
              <h4> LOGIN </h4>
              <p> Vamos começar </p>
            </div>

            <IonInput placeholder="Username" className="primary-input"></IonInput>
            <IonInput placeholder="Password" type="password" className="primary-input"></IonInput>
          
            <div className="ion-margin-top ion-text-right forgot">
              <a>Esqueceu a senha?</a>
            </div>

            <IonButton expand="block" className="ion-margin-top button" color="primary">LOGIN</IonButton>

            <div className="ion-margin-top ion-text-center">
            <a  onClick={() => setShowModal(false)}> Close </a>
            </div>
          </IonContent>
          
        </IonModal>

        
          
        

      </IonContent>
    </IonPage>
  )
}
export default Tab3;