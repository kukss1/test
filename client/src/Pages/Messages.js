import { useState, useEffect } from "react";
import { getUserConversations, sendMessage } from "../services/messagesData";
import { Link } from "react-router-dom";

import "../components/Messages/Messenger.css";

function DismissibleAlert({ onClose, children }) {
  return (
    <div className="dismissible-alert">
      {children}
      <button className="close-button" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}

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
  }, []);

  useEffect(() => {
    if (isSelected) {
      setSelected(conversations.find((x) => x.chats._id === chatId));
    }
  }, [isSelected, chatId, conversations]);

  function handleMsgSubmit(e) {
    e.preventDefault();
    sendMessage(chatId, message)
      .then((res) => {
        setAlert("Message sent!");
        setAlertShow(true);
        setMessage("");
        setSelected((prevSelected) => ({
          ...prevSelected,
          chats: {
            ...prevSelected.chats,
            conversation: [
              ...prevSelected.chats.conversation,
              { message, senderId: res.sender },
            ],
          },
        }));
        setTimeout(() => {
          setAlert(null);
          setAlertShow(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="messages-container">
      <h3 className="messages-header">Նամակներ</h3>
      <div className="messenger-wrapper">
        <aside className="messenger_wrapper_aside">
          {conversations.length >= 1 ? (
            <div className="chat_connections_wrapper">
              {conversations.map((x) => (
                <div className="chat_connections" key={x.chats._id}>
                  <Link
                    onClick={() => setIsSelected(true)}
                    to={`/messages/${x.chats._id}`}
                  >
                    {x.chats && x.isBuyer !== undefined ? (
                      x.isBuyer ? (
                        <>
                          <img src={x.chats.seller.avatar} alt="user-avatar" />{" "}
                          <span>{x.chats.seller.name}</span>
                        </>
                      ) : (
                        <>
                          <img src={x.chats.buyer.avatar} alt="user-avatar" />{" "}
                          <span>{x.chats.buyer.name}</span>
                        </>
                      )
                    ) : (
                      <span>Missing data</span> // Подставьте здесь какое-то значение по умолчанию или обработку отсутствующих данных
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
                <Link
                  to={`/profile/${
                    selected.isBuyer
                      ? selected.chats.seller._id
                      : selected.chats.buyer._id
                  }`}
                >
                  {/* <img
                    src={
                      selected.isBuyer
                        ? selected.chats.seller.avatar
                        : selected.chats.buyer.avatar
                    }
                    alt="user-avatar"
                  /> */}
                  <span>
                    {selected.isBuyer
                      ? selected.chats.seller.name
                      : selected.chats.buyer.name}
                  </span>
                </Link>
              </div>
              {alertShow && (
                <DismissibleAlert onClose={() => setAlertShow(false)}>
                  <p>{alert}</p>
                </DismissibleAlert>
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
                  onSubmit={handleMsgSubmit}
                >
                  <div>
                    <div className="message_send_area">
                      <textarea
                        className="message_place"
                        placeholder="..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                      <div>
                        <button className="message_btn" type="submit">
                          Ուղարկել
                        </button>
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
