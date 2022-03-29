/* eslint-disable react/jsx-no-undef */
import { IonBackButton, IonButton, IonButtons, IonContent, IonPage, IonToolbar } from "@ionic/react"
import { arrowBack } from "ionicons/icons"
import React from "react"
import "./styles.scss"

const Panel: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="header-welcome ion-no-border" color="primary">
      <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/"
              color="danger"
              icon={arrowBack}
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <div className="label">
          <h2>Painel do Administrador</h2>
          <p>Bem vindo, !</p>
        </div>
        <div className="panel">
        <h2>SAC</h2>
        <div className="buttons">
          <IonButton
            expand="block"
            fill="solid"
            color="danger"
            routerLink="/admin/report"
          >
            REPORTS
          </IonButton>
        </div>
        <h2>Pontos Turísticos</h2>
        <div className="buttons">
          <IonButton
            expand="block"
            fill="solid"
            color="danger"
            routerLink="/register/points"
          >
            CADASTRAR PONTO TURISTICO
          </IonButton>
          <IonButton 
            expand="block" 
            fill="solid" 
            color="danger"
            routerLink="/admin/editpoints">
            EDITAR PONTO TURISTICO
          </IonButton>
          <IonButton 
            expand="block" 
            fill="solid" 
            color="danger"
            routerLink="/admin/deletepoints">
            EXCLUIR PONTO TURISTICO
          </IonButton>
        </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Panel
