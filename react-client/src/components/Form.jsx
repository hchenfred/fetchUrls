import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      jobId: ''
    }
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleJobIdChange = this.handleJobIdChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleGetHTML = this.handleGetHTML.bind(this);
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }

  handleJobIdChange(e) {
    this.setState({jobId: e.target.value});
  }

  handleGetHTML(e) {
    e.preventDefault();
    const jobId = this.state.jobId;
    fetch(`/urls/${jobId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleFetch(e) {
    e.preventDefault();
    fetch('/urls', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.state.url
      })
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
    });
  }

  render() {
    return (<div>
      <form>
        <div>
          <input onChange={this.handleUrlChange} type="text" placeholder="Enter a URL" required/>
        </div>
        <div>
          <button onClick={this.handleFetch} type="button">Fetch</button>
        </div>
        <div>
          <input onChange={this.handleJobIdChange} type="text" placeholder="Enter a job ID" required/>
        </div>
        <div>
          <button onClick={this.handleGetHTML} type="button">GET HTML</button>
        </div>
      </form>
    </div>);
  }
}

export default Form;