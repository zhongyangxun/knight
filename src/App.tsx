import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'

function App() {
  return (
    <div className="App" style={{margin: '50px'}}>
      <header className="App-header">
        {/* <Button style={{width: '100px'}}>Hello</Button> */}
        <Alert
          style={{ width: '400px' }}
          message="default"
          closable
          alertType={AlertType.Default}
          description={'This is an alert This is an alert This is an alert This is an alert'}
        />

        <Alert style={{ width: '400px' }} message="Danger" alertType={AlertType.Danger} />

        <Alert style={{ width: '400px' }} message="Success" alertType={AlertType.Success} />

        <Alert style={{ width: '400px' }} message="Warning" alertType={AlertType.Warning} />
      </header>
    </div>
  );
}

export default App;
