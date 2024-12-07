import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  chevronDownCircle,
  settings,
  add,
  globe,
} from 'ionicons/icons';

import './style.css';
import { useOrders } from '@contexts/Orders';
import { PlaceOrder, HostInfo } from '@components/parts/index';
import { actions, exchanges, priceTypes, productsType } from '@utils/constant';

export const HomePage: React.FC = () => {

  // Context
  const {
    orders,
    addOrder,
  } = useOrders();


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonFab slot='fixed' vertical='top' horizontal='end' edge={true}>
          <IonFabButton>
            <IonIcon icon={chevronDownCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side='bottom'>
            <IonFabButton onClick={() => addOrder()}>
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

        <HostInfo />

        <IonGrid>
          <IonRow className='ion-no-padding ion-align-items-center'>
            {orders.map((orderItem, index) => {
              console.log(orderItem);
              return (
                <PlaceOrder key={`order-card-${index}`} index={index} />
              )
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
