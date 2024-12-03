import { useEffect, useState } from 'react';
import { InputChangeEventDetail, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import {
  chevronDownCircle,
  settings,
  add,
  trashBin,
  globe,
} from 'ionicons/icons';

import './style.css';


export const HomePage: React.FC = () => {

  // State
  const [apiUrl, setApiUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [strategy, setStrategy] = useState<string>('');
  const [orders, setOrders] = useState<Array<any>>([]);


  // Hooks
  // Fetch data from local storage
  useEffect(() => {
    const fetchData = async () => {
      const storedApiUrl = localStorage.getItem('apiUrl');
      const storedApiKey = localStorage.getItem('apiKey');
      const storeStrategy = localStorage.getItem('strategy');
      const storedActiveSection = localStorage.getItem('orders');

      if (storedApiUrl) setApiUrl(storedApiUrl);
      if (storedApiKey) setApiKey(storedApiKey);
      if (storeStrategy) setStrategy(storeStrategy);
      if (storedActiveSection) setOrders(JSON.parse(storedActiveSection));
    };

    fetchData();
  }, []);

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem('apiUrl', apiUrl);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('strategy', strategy);
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [apiUrl, apiKey, strategy, orders]);


  // Handle input change
  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.detail;
    if (name === 'apiUrl') {
      setApiUrl(value);
    } else if (name === 'apiKey') {
      setApiKey(value);
    } else if (name === 'strategy') {
      setStrategy(value);
    }

  };

  // Add new section
  const addOrder = () => {
    setOrders([...orders, { symbol: '', action: '' }]);
  };

  // Delete section
  const deleteOrder = (index: number) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  // Handle section title change
  const handleOrderChange = (index: number, field: string, value: any) => {
    const updatedOrders = [...orders];
    updatedOrders[index][field] = value;
    setOrders(updatedOrders);
  };


  // On LE Click event
  const onLEClick = () => {
    console.log('LE clicked');
  };

  // On LX Click event
  const onLXClick = () => {
    console.log('LX clicked');
  };



  const renderPriceInput = (index: number) => {
    return (
      <IonItem>
        <IonLabel position="stacked">Price</IonLabel>
        <IonInput
          type="number"
          value={orders[index].price}
          onIonChange={(e) =>
            handleOrderChange(index, "price", parseFloat(e.detail.value!))
          }
          placeholder="Enter price"
        />
      </IonItem>
    );
  };

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
            <IonFabButton onClick={addOrder}>
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
        <IonGrid>
          <IonRow className="ion-padding-vertical">
            <IonInput
              label="API URL"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter text"
              name="apiUrl"
              value={apiUrl}
              onIonInput={handleInputChange}
            />
          </IonRow>
          <IonRow className="ion-padding-vertical">
            <IonInput
              label="API Key"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter text"
              name="apiKey"
              value={apiKey}
              onIonInput={handleInputChange}
            />
          </IonRow>
          <IonRow className="ion-padding-vertical">
            <IonInput
              label="Strategy"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter text"
              name="strategy"
              value={strategy}
              onIonInput={handleInputChange}
            />
          </IonRow>
        </IonGrid>


        {orders.map((order, index) => (
          <IonCard key={index} className="ion-margin-vertical">
            {/* <IonCardHeader>
              <IonCardTitle>Order {index + 1}</IonCardTitle>
            </IonCardHeader> */}
            <IonCardContent className="ion-no-padding">
              <IonGrid>
                {/* First Row */}
                <IonRow className="ion-no-padding ion-align-items-center">
                  <IonCol>
                    <IonInput
                      type="text"
                      value={order.symbol}
                      onIonChange={(e) =>
                        handleOrderChange(index, "symbol", e.detail.value!)
                      }
                      label="Symbol"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Enter symbol"
                    />
                  </IonCol>
                  <IonCol className="ion-no-padding">
                    <IonRadioGroup
                      value={order.action}
                      onIonChange={(e) =>
                        handleOrderChange(index, "action", e.detail.value)
                      }
                    >
                      <IonRow className="ion-no-padding ion-align-items-center">
                        <IonCol className="ion-no-padding">
                          <IonItem lines="none">
                            <IonLabel>Buy</IonLabel>
                            <IonRadio slot="start" value="BUY" />
                          </IonItem>
                        </IonCol>
                        <IonCol className="ion-no-padding">
                          <IonItem lines="none">
                            <IonLabel>Sell</IonLabel>
                            <IonRadio slot="start" value="SELL" />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonRadioGroup>
                  </IonCol>
                  <IonCol>
                    <IonSelect
                      className="ion-padding-end"
                      value={order.exchange}
                      onIonChange={(e) =>
                        handleOrderChange(index, "exchange", e.detail.value)
                      }
                      label="Exchange"
                      labelPlacement="floating"
                      fill="outline"
                    >
                      <IonSelectOption value="NSE">NSE</IonSelectOption>
                      <IonSelectOption value="NFO">NFO</IonSelectOption>
                      <IonSelectOption value="BSE">BSE</IonSelectOption>
                      <IonSelectOption value="BFO">BFO</IonSelectOption>
                    </IonSelect>
                  </IonCol>
                  {/* </IonRow> */}

                  {/* Second Row */}
                  {/* <IonRow className="ion-no-padding ion-align-items-center"> */}
                  <IonCol>
                    <IonInput
                      className="ion-padding-start"
                      type="number"
                      value={order.quantity}
                      min={25}
                      max={200}
                      onIonChange={(e) =>
                        handleOrderChange(
                          index,
                          "quantity",
                          parseInt(e.detail.value!, 10)
                        )
                      }
                      label="Quantity"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Enter quantity"
                    />
                  </IonCol>
                  <IonCol className="ion-no-padding">
                    <IonRadioGroup
                      value={order.product}
                      onIonChange={(e) =>
                        handleOrderChange(index, "product", e.detail.value)
                      }
                    >
                      <IonRow className="ion-no-padding ion-align-items-center">
                        <IonCol className="ion-no-padding">
                          <IonItem lines="none">
                            <IonLabel>MIS</IonLabel>
                            <IonRadio slot="start" value="MIS" />
                          </IonItem>
                        </IonCol>
                        <IonCol className="ion-no-padding">
                          <IonItem lines="none">
                            <IonLabel>NRML</IonLabel>
                            <IonRadio slot="start" value="NRML" />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonRadioGroup>
                  </IonCol>
                  <IonCol className="ion-no-padding">
                    <IonRadioGroup
                      value={order.pricetype}
                      onIonChange={(e) =>
                        handleOrderChange(index, "pricetype", e.detail.value)
                      }
                    >
                      <IonItem lines="none">
                        <IonLabel>Market</IonLabel>
                        <IonRadio slot="start" value="MARKET" />
                      </IonItem>
                      <IonItem lines="none">
                        <IonLabel>Limit</IonLabel>
                        <IonRadio slot="start" value="LIMIT" />
                      </IonItem>
                    </IonRadioGroup>
                  </IonCol>
                  {/* Conditional Price Input */}
                  {order.pricetype === "LIMIT" && (
                    <IonCol className="ion-no-padding">
                      <IonInput
                        type="number"
                        value={order.price}
                        onIonChange={(e) =>
                          handleOrderChange(index, "price", parseFloat(e.detail.value!))
                        }
                        label="Price"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Enter price"
                      />
                    </IonCol>
                  )}
                </IonRow>


                {/* Third Row */}
                <IonRow>
                  <IonCol>
                    <IonButton expand="block" color="success">
                      <IonIcon icon={add} slot="start" />
                      LE
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      expand="block"
                      color="danger"
                    // onClick={() => removeOrder(index)}
                    >
                      <IonIcon icon={trashBin} slot="start" />
                      LX
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>

  );
};

export default HomePage;
