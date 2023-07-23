import { useState } from 'react';
import { io } from 'socket.io-client';

function SubmitForm({ chatId }) {
  const socket = io();
  const [text, setText] = useState("");

  function handleMsgSubmit(e) {
    e.preventDefault();
    socket.emit('chat message', text);
  }

  return (
    <div className="chat-selected-footer col-lg-12">
      <form onSubmit={handleMsgSubmit}>
        <div>
          <textarea
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default SubmitForm;
