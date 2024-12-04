import { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  add,
  trashBin,
  removeSharp
} from 'ionicons/icons';

import { TradeDetails } from '../utils/interface';
import { placeOrder } from '../services/orders';

type Props = {
  apiUrl: string;
  apiKey: string;
  strategy: string;
  addOrder: (order: any) => void;
};

export default function PlaceOrder({
  apiUrl,
  apiKey,
  strategy,
  addOrder,
}: Props) {
  const [tradeDetails, setTradeDetails] = useState<TradeDetails>({
    action: '',
    symbol: '',
    quantity: '',
    apiKey: '',
    exchange: '',
    product: '',
    hostUrl: '',
  });

  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    field: string, value: any
  ) => {
    setTradeDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const result = await placeOrder(tradeDetails);
      setResponse(result);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <IonCard className='ion-margin-vertical'>
        <IonCardContent className='ion-no-padding'>
          <IonGrid>
            {/* First Row */}
            <IonRow className='ion-no-padding ion-align-items-center'>
              <IonCol>
                <IonInput
                  type='text'
                  value={tradeDetails.symbol}
                  onIonChange={(e) =>
                    handleChange('symbol', e.detail.value!)
                  }
                  label='Symbol'
                  labelPlacement='floating'
                  fill='outline'
                  placeholder='Enter symbol'
                />
              </IonCol>
              <IonCol className='ion-no-padding'>
                <IonRadioGroup
                  value={tradeDetails.action}
                  onIonChange={(e) =>
                    handleChange('action', e.detail.value)
                  }
                >
                  <IonRow className='ion-no-padding ion-align-items-center'>
                    <IonCol className='ion-no-padding'>
                      <IonItem lines='none'>
                        <IonLabel>Buy</IonLabel>
                        <IonRadio slot='start' value='BUY' />
                      </IonItem>
                    </IonCol>
                    <IonCol className='ion-no-padding'>
                      <IonItem lines='none'>
                        <IonLabel>Sell</IonLabel>
                        <IonRadio slot='start' value='SELL' />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonRadioGroup>
              </IonCol>
              <IonCol>
                <IonSelect
                  className='ion-padding-end'
                  value={tradeDetails.exchange}
                  onIonChange={(e) =>
                    handleChange('exchange', e.detail.value)
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
              {/* </IonRow> */}

              {/* Second Row */}
              {/* <IonRow className="ion-no-padding ion-align-items-center"> */}
              <IonCol>
                <IonInput
                  className='ion-padding-start'
                  type='number'
                  value={tradeDetails.quantity}
                  min={25}
                  max={200}
                  onIonChange={(e) =>
                    handleChange(
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
              <IonCol className='ion-no-padding'>
                <IonRadioGroup
                  value={tradeDetails.product}
                  onIonChange={(e) =>
                    handleChange('product', e.detail.value)
                  }
                >
                  <IonRow className='ion-no-padding ion-align-items-center'>
                    <IonCol className='ion-no-padding'>
                      <IonItem lines='none'>
                        <IonLabel>MIS</IonLabel>
                        <IonRadio slot='start' value='MIS' />
                      </IonItem>
                    </IonCol>
                    <IonCol className='ion-no-padding'>
                      <IonItem lines='none'>
                        <IonLabel>NRML</IonLabel>
                        <IonRadio slot='start' value='NRML' />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonRadioGroup>
              </IonCol>
              <IonCol className='ion-no-padding'>
                <IonRadioGroup
                  value={tradeDetails.pricetype}
                  onIonChange={(e) =>
                    handleChange('pricetype', e.detail.value)
                  }
                >
                  <IonItem lines='none'>
                    <IonLabel>Market</IonLabel>
                    <IonRadio slot='start' value='MARKET' />
                  </IonItem>
                  <IonItem lines='none'>
                    <IonLabel>Limit</IonLabel>
                    <IonRadio slot='start' value='LIMIT' />
                  </IonItem>
                </IonRadioGroup>
              </IonCol>
              {/* Conditional Price Input */}
              {tradeDetails.pricetype === 'LIMIT' && (
                <IonCol className='ion-no-padding'>
                  <IonInput
                    type='number'
                    value={tradeDetails.price}
                    onIonChange={(e) =>
                      handleChange(
                        'price',
                        parseFloat(e.detail.value!)
                      )
                    }
                    label='Price'
                    labelPlacement='floating'
                    fill='outline'
                    placeholder='Enter price'
                  />
                </IonCol>
              )}
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
                // onClick={() => removeOrder(index)}
                >
                  <IonIcon icon={trashBin} slot='start' />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      {response && <div>Order Response: {response}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </>
  );
}
