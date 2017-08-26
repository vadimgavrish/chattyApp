import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (   
        <main className="Messages">
            {
                this.props.messages.map((message, index) => 
                    <Message message={message} key={index} />
                )
            }
        </main>
    );
  }
}
export default MessageList;