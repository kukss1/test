import { useState, useEffect } from "react";
import { getUserConversations, sendMessage } from "../services/messagesData";
import { Link } from "react-router-dom";

import "../components/Messages/Messenger.css";
function Messages({ match }) {
  let chatId = match.params.id;
  const [conversations, setConversations] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selected, setSelected] = useState({
    chats: {
      _id: 0,
      seller: {
        _id: "",
        avatar: "",
        name: "",
      },
      buyer: {
        _id: "",
        avatar: "",
        name: "",
      },
      conversation: [],
    },
    isBuyer: null,
    myId: 0,
  });
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(null);
  const [alertShow, setAlertShow] = useState(false);

  useEffect(() => {
    getUserConversations()
      .then((res) => {
        setConversations(res);
      })
      .catch((err) => console.log(err));
    if (isSelected) {
      setSelected(conversations.find((x) => x.chats._id === chatId));
    }
  }, [isSelected, chatId, setSelected,conversations]);

  function handleMsgSubmit(e) {
    e.preventDefault();
    sendMessage(chatId, message)
      .then((res) => {
        setAlert("Message sent!");
        setAlertShow(true);
        setMessage("");
        setSelected(
          selected,
          selected.chats.conversation.push({ message, senderId: res.sender })
        );
        setTimeout(() => {
          setAlert(null);
          setAlertShow(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="messenger_wrapper">
      <div>
        <aside>
          <h3 className="messages_header">Նամակներ</h3>
          {conversations.length >= 1 ? (
            <div className="chat_connections_wrapper">
              {conversations.map((x) => (
                <div className="chat_connections" key={x.chats._id}>
                  <Link
                    onClick={() => setIsSelected(true)}
                    to={`/messages/${x.chats._id}`}
                  >
                    {x.isBuyer ? (
                      <>
                        <img src={x.chats.seller.avatar} alt="user-avatar" />{" "}
                        <span>{x.chats.seller.name}</span>
                      </>
                    ) : (
                      <>
                        <img src={x.chats.buyer.avatar} alt="user-avatar" />{" "}
                        <span>{x.chats.buyer.name}</span>
                      </>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h5>Նամակներ առկա չեն</h5>
          )}
        </aside>
        <article className="chat_article_wrapper">
          {isSelected && (
            <>
              <div className="chat_member_wrapper">
                {selected.isBuyer ? (
                  <Link to={`/profile/${selected.chats.seller._id}`}>
                    <img src={selected.chats.seller.avatar} alt="user-avatar" />
                    <span>{selected.chats.seller.name}</span>
                  </Link>
                ) : (
                  <Link to={`/profile/${selected.chats.buyer._id}`}>
                    <img src={selected.chats.buyer.avatar} alt="user-avatar" />
                    <span>{selected.chats.buyer.name}</span>
                  </Link>
                )}
              </div>
              {alertShow && (
                <div onClose={() => setAlertShow(false)} dismissible>
                  <p>{alert}</p>
                </div>
              )}
              <div className="message_wrapper">
                {selected.chats.conversation.map((x) => (
                  <div
                    className={selected.myId === x.senderId ? "me" : "not-me"}
                    key={x._id}
                  >
                    <span className="message">{x.message}</span>
                  </div>
                ))}
              </div>
              <div>
                <form 
                className="message_write_wrapper"
                onSubmit={handleMsgSubmit}>
                  <div>
                    <div className="message_send_area">
                      <textarea
                        className="message_place"
                        placeholder="..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                      <div>
                        <button 
                        className="message_btn"
                        type="submit">Ուղարկել</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </article>
      </div>
    </div>
  );
}

export default Messages;
