import { useCallback, useState } from 'react';
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
import { add, trashBin, removeSharp } from 'ionicons/icons';

import { TradeDetails } from '@utils/interface';
import { placeOrder } from '@services/Orders';
import { useOrders } from '@contexts/Orders';
import { priceTypes, productsType } from '@utils/constant';

type Props = {
  index: number;
};

export function PlaceOrder({ index }: Props) {
  const {
    orders,
    setOrders,

    deleteOrder,
  } = useOrders();

  const [order, setOrder] = useState<TradeDetails>({
    action: '',
    symbol: '',
    quantity: 0,
    apikey: '',
    exchange: '',
    product: '',
    strategy: '',
    pricetype: '',
  });

  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setOrder((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const result = await placeOrder(order);
      setResponse(result);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Handle section title change
  const handleOrderChange = useCallback(
    (index: number, field: string, value: any) => {
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
    },
    [orders, setOrders]
  );

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
                    handleOrderChange(index, 'symbol', e.detail.value!)
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
                    handleOrderChange(index, 'exchange', e.detail.value)
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
                    <IonRadio slot='start' value={productsType.NRML} />
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

              {order.pricetype === 'LIMIT' && renderPriceInput(index, order)}
            </IonRow>

            {/* Third Row */}
            <IonRow>
              <IonCol>
                <IonButton
                  expand='block'
                  color='success'
                  onClick={() => onLEClick()}
                >
                  <IonIcon icon={add} slot='start' />
                  LE
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  expand='block'
                  color='danger'
                  onClick={() => onLXClick()}
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
  );
}

export default PlaceOrder;
