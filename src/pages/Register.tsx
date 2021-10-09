import React from "react";
import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonMenuButton, IonPage, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons"; 

import './Register.scss'



const Register: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar >
                    <IonButtons slot="start">
                    <IonBackButton  defaultHref="/Welcome" color="primary" icon={arrowBack}></IonBackButton> 
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="ion-text-center titleSignup">
                    <h4> SING UP </h4>
                    <p> Informe seus dados para continuar </p>
                </div>

                <IonInput placeholder="Nome fantasia" className="primary-input"></IonInput>
                <IonInput placeholder="CNPJ" className="primary-input"></IonInput>
                <IonInput placeholder="Senha" className="primary-input" type="password"></IonInput>
                <IonInput placeholder="Confirme a senha" className="primary-input" type="password"></IonInput>
                <IonItem>
                <p>Você concorda com os termos de uso:</p><IonCheckbox slot="end" color="primary" />
                </IonItem>
                <IonButton expand="block" className="ion-margin-top button">SING UP</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Register;