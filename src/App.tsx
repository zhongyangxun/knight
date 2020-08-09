import React from 'react';
import Upload from './components/Upload/upload'

const App: React.FC = () => {

  return (
    <div className="App" style={{
      margin: '200px 500px'
    }}>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts/"
      />
    </div>
  )
}

export default App;
