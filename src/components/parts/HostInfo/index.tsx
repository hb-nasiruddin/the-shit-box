import { useOrders } from '@contexts/Orders';
import { IonGrid, IonInput, IonRow } from '@ionic/react'

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
  )
}

export default HostInfo