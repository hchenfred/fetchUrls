import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }

  handleSubmitForm(e) {
    e.preventDefault();
    console.log(this.state.url);
    fetch('/urls', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.state.url
      })
    });
  }

  render() {
    return (<div className="container-fluid">
      <form onSubmit={this.handleSubmitForm} className="myForm">
        <div className="form-inline row">
        <div className="form-group">
          <input onChange={this.handleUrlChange} className="form-control formInput" type="text" placeholder="Enter a URL" required/>
        </div>
        <div className="form-group">
          <input className="btn btn-info formInput submitBtn btn-block" type="submit" value="ADD"/>
        </div>
        </div>
      </form>
    </div>);
  }
}

export default Form;