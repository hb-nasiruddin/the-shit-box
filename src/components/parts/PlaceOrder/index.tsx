import { useCallback, useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
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

import { actions, DEFAULT_ORDER_DETAILS, priceTypes, productsType } from '@utils/constant';
import { TradeDetails, TradeResponse } from '@utils/interface';
import { useOrders } from '@contexts/Orders';

type Props = {
  index: number;
};

export function PlaceOrder({ index }: Props) {
  const {
    orders,
    setOrders,
    placeOrder,
    deleteOrder,
  } = useOrders();

  const [order, setOrder] = useState<TradeDetails>(DEFAULT_ORDER_DETAILS);

  const [response, setResponse] = useState<TradeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle section title change
  const handleOrderChange = useCallback(
    (field: string, value: any) => {
      const updatedOrders = [...orders];
      let val = value;

      if (field === 'product' && !value) {
        val = productsType.MIS;
      }

      if (field === 'pricetype' && !value) {
        val === priceTypes.MARKET;
      }
      console.log('val', val);
      updatedOrders[index][field] = val;
      console.log(updatedOrders[index][field]);
      setOrders(updatedOrders);
      return updatedOrders;
    },
    [orders, setOrders]
  );

  // On LE Click event trigger placeOrder
  const onLEClick = async () => {
    console.log('LE clicked');
    try {
      const result = await placeOrder(index, {
        ...order,
        action: actions.BUY,
      });
      setResponse(result);
    } catch (error) {
      console.log('Error onLEClick', error);
    }
  };

  // On LX Click event
  const onLXClick = async () => {
    console.log('LX clicked');
    try {
      const result = await placeOrder(index, {
        ...order,
        action: actions.BUY,
      });
      setResponse(result);
    } catch (error) {
      console.log('Error onLXClick', error);
    }
  };

  useEffect(() => {
    if (orders[index]) {
      setOrder(orders[index]);
    }
    return () => {
      setOrder(DEFAULT_ORDER_DETAILS);
    }
  }, [orders]);


  const renderPriceInput = () => {
    return (
      <IonCol size='12'>
        <IonInput
          type='number'
          value={order.price}
          onIonChange={(e) =>
            handleOrderChange('price', parseFloat(e.detail.value!))
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
            {order.orderid && <IonRow className='ion-no-padding ion-align-items-start'>
              <IonCol>
                <IonChip>
                  {order.orderid}
                </IonChip>
              </IonCol>
            </IonRow>}
            <IonRow className='ion-no-padding ion-align-items-center'>
              <IonCol size='8'>
                <IonInput
                  type='text'
                  value={order.symbol}
                  onIonChange={(e) =>
                    handleOrderChange('symbol', e.detail.value!)
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
                    handleOrderChange('exchange', e.detail.value)
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
                      'product',
                      order.product === productsType.MIS
                        ? productsType.NRML
                        : productsType.MIS
                    )
                  }
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
                      'pricetype',
                      order.pricetype === priceTypes.MARKET ? priceTypes.LIMIT : priceTypes.MARKET
                    )
                  }
                >
                  <IonItem lines='none'>
                    <IonLabel>Limit</IonLabel>
                    <IonRadio slot='start' value={priceTypes.LIMIT} />
                  </IonItem>
                </IonRadioGroup>
              </IonCol>

              {order.pricetype === 'LIMIT' && renderPriceInput()}
            </IonRow>

            <IonRow>
              {
                !order.orderid && (
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
                )
              }
              {
                order.orderid && (
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
                )
              }
              <IonCol>
                <IonButton
                  expand='block'
                  color='secondary'
                  onClick={() => deleteOrder(index)}
                  disabled={!!order.orderid}
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
