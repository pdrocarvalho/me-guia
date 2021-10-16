import React, { useState } from "react";
import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import './Client.scss'



const Client: React.FC = () => {
    const [chooseType, setChooseType] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<string>('');

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" color="primary" icon={arrowBack}></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="ion-text-center titleSignup">
                    <h4> Cadastre seu comércio! </h4>
                    <p> Anuncie conosco e mostre seu comércio para o mundo! </p>
                </div>

                <IonInput placeholder="Razão social" className="primary-input"></IonInput>
                <IonInput placeholder="Nome fantasia" className="primary-input"></IonInput>
                <IonInput placeholder="CNPJ" className="primary-input"></IonInput>
                <IonInput placeholder="Endereço" className="primary-input"></IonInput>
                <IonInput placeholder="" className="primary-input"></IonInput>
                <IonTextarea rows={6} cols={20} placeholder="Descrição" className="primary-input" ></IonTextarea>


                <IonItem>
                    <IonLabel>Tipo de serviço:</IonLabel>
                    <IonSelect placeholder="Select One" value={chooseType} onIonChange={e => setChooseType(e.detail.value)}>
                        <IonSelectOption value="hostel">Hospedagem</IonSelectOption>
                        <IonSelectOption value="store">Comércio</IonSelectOption>
                    </IonSelect>
                </IonItem>


                <h4> Quais dias o estabelecimento funciona?</h4>
                <IonGrid>
                    <IonRow>
                    <IonCol>
                        <IonLabel color="danger">
                            D
                        </IonLabel> 
                        <br></br>
                        <IonCheckbox  color="danger" />
                    </IonCol>
                    <IonCol>
                        <IonLabel color="primary">
                            S
                        </IonLabel>
                        <br></br>
                        <IonCheckbox  color="primary" />
                    </IonCol>
                    <IonCol>
                        <IonLabel color="primary">
                            T
                        </IonLabel>
                        <br></br>
                        <IonCheckbox  color="primary" />
                    </IonCol>
                    <IonCol>
                        <IonLabel color="primary">
                            Q
                        </IonLabel>
                        <br></br>
                        <IonCheckbox  color="primary" />
                    </IonCol>
                    <IonCol>
                        <IonLabel color="primary">
                            Q
                        </IonLabel>
                        <br></br>
                        <IonCheckbox  color="primary" />
                    </IonCol>
                    <IonCol>
                        <IonLabel color="primary">
                            S
                        </IonLabel>
                        <br></br>
                        <IonCheckbox  color="primary" />
                    </IonCol>
                    <IonCol>
                        <IonLabel color="danger">
                            S
                        </IonLabel>
                        <br></br>
                        <IonCheckbox  color="danger" />
                    </IonCol>
                        
                    </IonRow>
                </IonGrid>

                <IonList>
                   <IonLabel color="primary">
                       <h2>Qual horário o estabelecimento abre?</h2>
                   </IonLabel>
                    <IonItem>

                        <IonLabel>Dias úteis</IonLabel>
                        <IonDatetime displayFormat="h m A" placeholder="Select Date" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Sab. Dom. e feriados</IonLabel>
                        <IonDatetime displayFormat="h m A" placeholder="Select Date" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
                    </IonItem>
                    <br></br>
                   <IonLabel color="primary">
                       <h2>Qual horário o estabelecimento abre?</h2>
                   </IonLabel>
                    <IonItem>

                   
                        <IonLabel>Dias úteis</IonLabel>
                        <IonDatetime displayFormat="h m A" placeholder="Select Date" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Sab. Dom. e feriados</IonLabel>
                        <IonDatetime displayFormat="h m A" placeholder="Select Date" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
                    </IonItem>

                </IonList>

                <IonButton expand="block" className="ion-margin-top button">ENVIAR</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Client;