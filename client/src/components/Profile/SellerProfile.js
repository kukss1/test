import { useState } from 'react';
import ActiveSells from './Sells/ActiveSells'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri';
import { createChatRoom } from '../../services/messagesData';

function SellerProfile({ params, history }) {
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShowMsg(false);
  const handleShow = () => setShowMsg(true);

  const handleMsgChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const onMsgSent = (e) => {
    e.preventDefault();
    createChatRoom(params._id, message)
      .then((res) => {
        history.push(`/messages`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="profile_head">
        <div className="seller_profile_wrapper">
          <div className="profile_row">
            <div>
              <img className="seller_avatar" alt="avatar" src={params.avatar} />
            </div>
            <div className="seller_profile_body">
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
                <FaSellsy /> {params.totalSells} Ընդհանուր վաճառք
              </p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
              <button className="aside_contact_seller_btn" id="btnContact" onClick={handleShow}>
                <RiMessage3Fill />
                Կապ Հաստատել
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">

        </div>
      </div>
      {showMsg && (
        <div className="modal_contact_seller" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Գրել Նամակ</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <textarea className="contact_seller_textarea" name="textarea" onChange={handleMsgChange} rows={3}></textarea>
              </div>
              <div className="seller_modal_footer">
                <button className="seller_contact_send_btn" onClick={onMsgSent}>
                  ՈՒղարկել
                </button>
                <button className="seller_contact_close_btn" onClick={handleClose}>
                  Փակել
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="col-lg-12">
            <ActiveSells params={params} />
          </div>
    </>
  );
}

export default SellerProfile;
