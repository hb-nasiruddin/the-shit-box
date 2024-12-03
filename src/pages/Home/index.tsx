import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {
  chevronDownCircle,
  settings,
  add,
  trashBin,
  globe,
} from 'ionicons/icons';

export const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
          <IonFabButton>
            <IonIcon icon={chevronDownCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="bottom">
            <IonFabButton>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={settings}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={globe}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
        <>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonButton color="success">
                <IonIcon slot="start" icon={add}></IonIcon>
                Add
              </IonButton>
              <IonButton color="danger" >
                <IonIcon slot="start" icon={trashBin}></IonIcon>
                Delete
              </IonButton>
            </IonCardContent>

          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonButton color="success">
                <IonIcon slot="start" icon={add}></IonIcon>
                Add
              </IonButton>
              <IonButton color="danger" >
                <IonIcon slot="start" icon={trashBin}></IonIcon>
                Delete
              </IonButton>
            </IonCardContent>

          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonButton color="success">
                <IonIcon slot="start" icon={add}></IonIcon>
                Add
              </IonButton>
              <IonButton color="danger" >
                <IonIcon slot="start" icon={trashBin}></IonIcon>
                Delete
              </IonButton>
            </IonCardContent>

          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonButton color="success">
                <IonIcon slot="start" icon={add}></IonIcon>
                Add
              </IonButton>
              <IonButton color="danger" >
                <IonIcon slot="start" icon={trashBin}></IonIcon>
                Delete
              </IonButton>
            </IonCardContent>

          </IonCard>
        </>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
