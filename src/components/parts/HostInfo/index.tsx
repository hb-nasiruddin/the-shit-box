import { useOrders } from '@contexts/Orders';
import { IonGrid, IonInput, IonRow } from '@ionic/react'
import { useCallback } from 'react';

type Props = {}

export function HostInfo({ }: Props) {
  // Context
  const {
    apiUrl,
    setApiUrl,
    apiKey,
    setApiKey,
    strategy,
    setStrategy
  } = useOrders();

  // Handle input change
  const handleInputChange = useCallback((e: CustomEvent, name: string) => {
    const { value } = e.detail;
    if (name === 'apiUrl') {
      setApiUrl(value);
    } else if (name === 'apiKey') {
      setApiKey(value);
    } else if (name === 'strategy') {
      setStrategy(value);
    }
    return value;
  }, [
    apiUrl,
    apiKey,
    strategy,
  ]);

  return (
    <IonGrid>
      <IonRow className='ion-padding-vertical ion-margin-horizontal'>
        <IonInput
          label='API URL'
          labelPlacement='floating'
          fill='outline'
          placeholder='Enter text'
          name='apiUrl'
          value={apiUrl}
          onIonInput={(e) => handleInputChange(e, 'apiUrl')}
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
          onIonInput={(e) => handleInputChange(e, 'apiKey')}
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
          onIonInput={(e) => handleInputChange(e, 'strategy')}
        />
      </IonRow>
    </IonGrid>
  )
}

export default HostInfo