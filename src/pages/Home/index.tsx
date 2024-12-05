import { useEffect, useState } from 'react';
import {
  InputChangeEventDetail,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  chevronDownCircle,
  settings,
  add,
  trashBin,
  globe,
  removeSharp,
} from 'ionicons/icons';

import './style.css';
import { priceTypes, productsType } from '@utils/constant';
import { useOrders } from '@contexts/Orders';

export const HomePage: React.FC = () => {
  // Context
  const {
    apiUrl,
    setApiUrl,
    apiKey,
    setApiKey,
    strategy,
    setStrategy,
    orders,
    setOrders,

    addOrder,
    deleteOrder,
  } = useOrders();

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

  // Handle section title change
  const handleOrderChange = (index: number, field: string, value: any) => {
    const updatedOrders = [...orders];
    let val = value;

    if (field === 'product' && !value) {
      val = productsType.MIS;
    }

    if (field === 'pricetype' && !value) {
      val === priceTypes.MARKET;
    }

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

  const renderPriceInput = (index: number, order: any) => {
    return (
      <IonCol size='12'>
        <IonInput
          type='number'
          value={order.price}
          onIonChange={(e) =>
            handleOrderChange(index, 'price', parseFloat(e.detail.value!))
          }
          label='Price'
          labelPlacement='floating'
          fill='outline'
          placeholder='Enter price'
        />
      </IonCol>
    );
  };

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
          <IonRow className='ion-padding-vertical ion-margin-horizontal'>
            <IonInput
              label='API URL'
              labelPlacement='floating'
              fill='outline'
              placeholder='Enter text'
              name='apiUrl'
              value={apiUrl}
              onIonInput={handleInputChange}
            />
          </IonRow>
          <IonRow className='ion-padding-vertical ion-margin-horizontal'>
            <IonInput
              label='API Key'
              labelPlacement='floating'
              fill='outline'
              placeholder='Enter text'
              name='apiKey'
              value={apiKey}
              onIonInput={handleInputChange}
            />
          </IonRow>
          <IonRow className='ion-padding-vertical ion-margin-horizontal'>
            <IonInput
              label='Strategy'
              labelPlacement='floating'
              fill='outline'
              placeholder='Enter text'
              name='strategy'
              value={strategy}
              onIonInput={handleInputChange}
            />
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-no-padding ion-align-items-center'>
            {orders.map((order, index) => (
              <IonCol
                key={`order-card-${index}`}
                sizeLg='4'
                sizeXl='4'
                sizeMd='6'
                size='12'
              >
                <IonCard className='ion-margin-vertical'>
                  <IonCardContent className='ion-no-padding'>
                    <IonGrid>
                      <IonRow className='ion-no-padding ion-align-items-center'>
                        <IonCol size='8'>
                          <IonInput
                            type='text'
                            value={order.symbol}
                            onIonChange={(e) =>
                              handleOrderChange(
                                index,
                                'symbol',
                                e.detail.value!
                              )
                            }
                            label='Symbol'
                            labelPlacement='floating'
                            fill='outline'
                            placeholder='Enter symbol'
                          />
                        </IonCol>

                        <IonCol size='4'>
                          <IonSelect
                            value={order.exchange}
                            onIonChange={(e) =>
                              handleOrderChange(
                                index,
                                'exchange',
                                e.detail.value
                              )
                            }
                            label='Exchange'
                            labelPlacement='floating'
                            fill='outline'
                          >
                            <IonSelectOption value='NSE'>NSE</IonSelectOption>
                            <IonSelectOption value='NFO'>NFO</IonSelectOption>
                            <IonSelectOption value='BSE'>BSE</IonSelectOption>
                            <IonSelectOption value='BFO'>BFO</IonSelectOption>
                          </IonSelect>
                        </IonCol>

                        <IonCol size='12'>
                          <IonInput
                            className='ion-padding-start'
                            type='number'
                            value={order.quantity}
                            min={25}
                            max={200}
                            onIonChange={(e) =>
                              handleOrderChange(
                                index,
                                'quantity',
                                parseInt(e.detail.value!, 10)
                              )
                            }
                            label='Quantity'
                            labelPlacement='floating'
                            fill='outline'
                            placeholder='Enter quantity'
                          />
                        </IonCol>

                        <IonCol size='6' className='ion-no-padding'>
                          <IonRadioGroup
                            value={order.product}
                            allowEmptySelection={true}
                            onClick={(e) =>
                              handleOrderChange(
                                index,
                                'product',
                                order.product === productsType.MIS
                                  ? productsType.NRML
                                  : productsType.MIS
                              )
                            }
                            // onIonChange={(e) =>
                            //   handleOrderChange(
                            //     index,
                            //     'product',
                            //     e.detail.value
                            //   )
                            // }
                          >
                            <IonItem lines='none'>
                              <IonLabel>NRML</IonLabel>
                              <IonRadio
                                slot='start'
                                value={productsType.NRML}
                              />
                            </IonItem>
                          </IonRadioGroup>
                        </IonCol>

                        <IonCol size='6' className='ion-no-padding'>
                          <IonRadioGroup
                            value={order.pricetype}
                            allowEmptySelection={true}
                            onClick={(e) =>
                              handleOrderChange(
                                index,
                                'pricetype',
                                order.pricetype === priceTypes.LIMIT
                                  ? priceTypes.MARKET
                                  : priceTypes.LIMIT
                              )
                            }
                            // onIonChange={(e) =>
                            //   handleOrderChange(
                            //     index,
                            //     'pricetype',
                            //     e.detail.value
                            //   )
                            // }
                          >
                            <IonItem lines='none'>
                              <IonLabel>Limit</IonLabel>
                              <IonRadio slot='start' value={priceTypes.LIMIT} />
                            </IonItem>
                          </IonRadioGroup>
                        </IonCol>

                        {order.pricetype === 'LIMIT' &&
                          renderPriceInput(index, order)}
                      </IonRow>

                      {/* Third Row */}
                      <IonRow>
                        <IonCol>
                          <IonButton expand='block' color='success'>
                            <IonIcon icon={add} slot='start' />
                            LE
                          </IonButton>
                        </IonCol>
                        <IonCol>
                          <IonButton
                            expand='block'
                            color='danger'
                            // onClick={() => removeOrder(index)}
                          >
                            <IonIcon icon={removeSharp} slot='start' />
                            LX
                          </IonButton>
                        </IonCol>
                        <IonCol>
                          <IonButton
                            expand='block'
                            color='secondary'
                            onClick={() => deleteOrder(index)}
                          >
                            <IonIcon icon={trashBin} slot='start' />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
