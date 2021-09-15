import { IonContent,
         IonHeader,
         IonCardHeader,
         IonCardSubtitle, 
         IonCardTitle, 
         IonPage, 
         IonTitle, 
         IonToolbar, 
         IonCard, 
         IonIcon, 
         IonItem, 
         IonLabel, 
         IonButtons,
         IonButton,
         IonCardContent, 
         IonMenuButton, 
         IonList} from '@ionic/react';
import { pin, planet } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import { menuController } from '@ionic/core';


const Tab1: React.FC = () => {
  return (
    
    <IonPage>
      <IonHeader>
                <IonToolbar color="primary">
          
          <IonButtons slot="start">
            <IonMenuButton type="button" menu="menu-home"></IonMenuButton>
            
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>  


      {/*Card MeGuia*/}
      <IonCard>
          <img src="https://cdn.discordapp.com/attachments/887103067965759488/887103117672476692/logo-meguia.jpeg" />
          <IonCardHeader>
            <IonCardTitle>OLÁ!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Quer se aventurar por Cabo Frio sem precisar de guias e burocracia? Aqui você encontra
            todas as informações que precisa para visitar os melhores pontos turísticos de Cabo Frio.
            Rotas, melhores horários para visitação, dicas de roteiro e muito mais! 
          </IonCardContent>
        </IonCard>

      
      </IonContent>
    </IonPage>
  );
};
async function openMenu() {
  await menuController.open();
}
export default Tab1;
