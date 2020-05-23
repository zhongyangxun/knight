import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App" style={{margin: '50px'}}>
      <header className="App-header">
        <Menu defaultIndex="0" onSelect={(index) => { console.log(index) }} mode="vertical" defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              cool link3
            </MenuItem>
            <MenuItem>
              cool link4
            </MenuItem>
          </SubMenu>
          <MenuItem>
            hhhh
          </MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
