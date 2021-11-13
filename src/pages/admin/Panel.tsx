import { IonButton, IonContent, IonPage } from "@ionic/react"
import React from "react"
import "./styles.scss"

const Panel: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="header-welcome ion-no-border" color="primary">
        <div className="label">
          <h2>Painel do Administrador</h2>
          <p>Bem vindo, !</p>
        </div>
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
          <IonButton expand="block" fill="solid" color="danger">
            EDITAR PONTO TURISTICO
          </IonButton>
          <IonButton expand="block" fill="solid" color="danger">
            EXCLUIR PONTO TURISTICO
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Panel
