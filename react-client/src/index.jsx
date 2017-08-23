import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Form from './components/Form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
   
  }

  render () {
    return (<div>
      <h1>Fetch HTML</h1>
      <Form />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));