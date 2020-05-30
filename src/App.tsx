import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Button from './components/Button/button'
import Alert from './components/Alert/alert'

library.add(fas)
const App: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header" style={{margin: '100px'}}>
        <Menu defaultIndex='0' onSelect={(index) => { alert(index) }}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
        <Button size="lg" onClick={() => { setShow(!show) }} > Toggle </Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
          </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
          </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
          </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
          </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
          </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-top"
          wrapper
        >
          <Button btnType="primary" size="lg">A Large Button </Button>
        </Transition>
        <Alert message="do you like your life" closable />
        <Alert message="do you like your life" closable alertType="success" />
        <Alert message="do you like your life" closable alertType="danger" />
      </header>
    </div>
  );
}

export default App;
