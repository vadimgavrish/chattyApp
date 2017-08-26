import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    };
  }

  handleSubmit (event) {
    if(event.key === 'Enter') {
        this.props.handleSubmit(this.state.username, this.state.content);
        this.setState({
          content: ''
        });
    }
  }

  handleUsername (event) {
    if(event.key === 'Enter') {
      if(!event.target.value) {
        this.setState({
          username: "Anonymous"
        })
      } else {
        if(this.props.currentUser !== event.target.value) {
          let message = this.props.currentUser + " changed their name to " + event.target.value + "!";
          this.props.handleNameChange(event.target.value, message);
          this.setState({
            username: event.target.value
          });
        }
      }
    }
  }

  handleMessage (event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    return (
        <footer className='chatbar'>
            <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onKeyPress={this.handleUsername.bind(this)} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleMessage.bind(this)} onKeyPress={this.handleSubmit.bind(this)} />
        </footer>
    );
  }
}

export default ChatBar;