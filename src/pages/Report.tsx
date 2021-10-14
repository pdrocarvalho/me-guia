import React  from "react";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput,  IonPage, IonTextarea, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons"; 

import './Report.scss'



const Register: React.FC = () => {
    
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar >
                    <IonButtons slot="start">
                    <IonBackButton  defaultHref="/" color="primary" icon={arrowBack}></IonBackButton> 
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="ion-text-center titleSignup">
                    <h4> Fale conosco! </h4>
                    <p>  </p>
                </div>

                <IonInput placeholder="Nome" className="primary-input"></IonInput>
                <IonInput placeholder="E-mail" className="primary-input"></IonInput>
                <IonTextarea rows={6} cols={20} placeholder="Deixe sua mensagem.." className="primary-input" ></IonTextarea>

                
                
                <IonButton expand="block" className="ion-margin-top button">ENVIAR</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Register;