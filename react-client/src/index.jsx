import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Form from './components/Form.jsx';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  render () {
    return (
    <div className="container">
      <h1>Fetch HTML</h1>
      <Form />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));