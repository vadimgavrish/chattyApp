import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001');
  }  

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
    }
    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      switch(message.type) {
        case 'incomingMessage':
          let newMessages = this.state.messages.concat(message);
          this.setState({
            messages: newMessages
          });
          break;
        case 'nameChange':
          let nameChange = this.state.messages.concat(message);
          this.setState({
            messages: nameChange
          });
          break;
      }
    }
  }
  
  handleNameChange (username, content) {
    const newMessage = {
      type: 'nameChange',
      content: content  
    }
    this.setState({
      currentUser: {
        name: username
      }
    })
    this.socket.send(JSON.stringify(newMessage));
  }

  handleSubmit (username, content) {
    const newMessage = {
      type: 'incomingMessage',
      username: username,
      content: content
    };
    this.setState({
      currentUser: {
        name: username
      }
    });
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar handleSubmit={this.handleSubmit.bind(this)} currentUser={this.state.currentUser.name} handleNameChange={this.handleNameChange.bind(this)} />
      </div>
    );
  }
}

export default App;