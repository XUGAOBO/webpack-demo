import React from 'react';
import Demo from './pages/demo';
import './style/index.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Demo/>
    );
  }
}

export default App;
