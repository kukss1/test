import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMessage3Fill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { MdArchive } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { FaSellsy } from "react-icons/fa";
import { archiveSell } from "../../../services/productData";
import { createChatRoom } from "../../../services/messagesData";
import "./Aside.css";

function Aside({ params, history }) {
  const [showMsg, setShowMdg] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setShowMdg(false);
  const handleShow = () => setShowMdg(true);

  const handleCloseArchive = () => setShowArchive(false);
  const handleShowArchive = () => setShowArchive(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    archiveSell(params._id)
      .then((res) => {
        setShowArchive(false);
        history.push(`/profile/${params.seller}`);
      })
      .catch((err) => console.log(err));
  };

  const handleMsgChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const onMsgSent = (e) => {
    e.preventDefault();
    createChatRoom(params.sellerId, message)
      .then((res) => {
        history.push(`/messages/${res.messageId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <aside>
      <div className="product_details_seller_aside">
        <div className="aside_product_price">
          <h4 className="product_price_heading">Գին - </h4>
          {params.isSeller && (
            <div className="product_edit_icons">
              <span>
                <Link to={`/categories/${params.category}/${params._id}/edit`}>
                  <GrEdit />
                </Link>
              </span>
              <span onClick={handleShowArchive}>
                <MdArchive />
              </span>
            </div>
          )}
          {params.price && (
            <h1 className="product_price_header">{params.price.toFixed(2)}֏</h1>
          )}
        </div>
        {localStorage.userData ? (
          <>
            {!params.isSeller && (
              <button className="aside_contact_seller_btn" onClick={handleShow}>
                <RiMessage3Fill />
                Հետադարձ կապ
              </button>
            )}
            <Link to={`/profile/${params.sellerId}`}>
              <div className="aside_seller_avatar">
                <img
                  className="seller_avatar"
                  src={params.avatar}
                  alt="user-avatar"
                />
              </div>
              <div className="aside_seller_body">
                <p>
                  <BsFillPersonFill /> {params.name}
                </p>
                <p>
                  <MdEmail /> {params.email}
                </p>
                <p>
                  <MdPhoneAndroid /> {params.phoneNumber}
                </p>
                <p>
                  <FaSellsy /> {params.createdSells}Ընդհանուր վաճառք
                </p>
              </div>
            </Link>
          </>
        ) : (
          <p className="guest_msg">
            <Link to="/auth/login">Մուտք</Link> կապ հաստատելու համար
          </p>
        )}
      </div>
      {showMsg && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="msg_header">Message</h5>
                <button className="btn-close" onClick={handleClose}>
                  -
                </button>
              </div>
              <div className="modal_body">
                <form className="modal_form">
                  <div className="form_group">
                    <textarea
                      className="form_control"
                      name="textarea"
                      onChange={handleMsgChange}
                      rows={3}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal_footer">
                <button className="msg_sned_btn" onClick={onMsgSent}>
                  Ուղարկել
                </button>
                <button className="msg_close_btn" onClick={handleClose}>
                  Փակել
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showArchive && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  վստա՞հ եք որ ուզում եք արխիվացնել այս հայտարարությունը{" "}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseArchive}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Սեղմելով <strong>Արխիվացնել</strong>, հայտարարության
                  կարգավիճակը կպոխվի <strong>Արխիվացվածի</strong>,ինչը նշանակում
                  է, որ ձեզանից բացի ոչ ոք չի կարողանա տեսնել այն: Դուք կարող եք
                  փոխել կարգավիճակը <strong>Ակտիվ</strong>, եթե դուք վաճառել եք
                  ապրանքը կամ այլևս չեք ցանկանում վաճառել այն:
                </p>{" "}
                <p>
                  Դուք հետագայում կարող եք փոխել կարգավիճակը ձեր անձնական էջից{" "}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseArchive}
                >
                  Փակել
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  Արխիվացնել
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Aside;
