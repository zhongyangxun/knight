import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'

const testLabel = <i>33333</i>

function App() {
  return (
    <div className="App" style={{margin: '50px'}}>
      <header className="App-header">
        <Menu defaultIndex="0" onSelect={(index) => { console.log(index) }} defaultOpenSubMenus={['2']}>
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

        <Tabs className="clazz" type="card" onSelect={(index) => {console.log(index)}} >
          <TabItem label="11111">11111的内容</TabItem>
          <TabItem label="22222">22222的内容</TabItem>
          <TabItem  label={testLabel}>33333的内容</TabItem>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
