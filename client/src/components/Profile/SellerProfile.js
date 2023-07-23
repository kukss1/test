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
        <div className="container">
          <div className="profile-row">
            <div className="col-lg-2 col-md-5 col-sm-12">
              <img className="seller_avatar" alt="avatar" src={params.avatar} />
            </div>
            <div className="col-lg-2 col-md-3 col-sm-12">
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
                <FaSellsy /> {params.totalSells} sells in total
              </p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
              <button className="btn-dark col-lg-10" id="btnContact" onClick={handleShow}>
                <RiMessage3Fill />
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <ActiveSells params={params} />
          </div>
        </div>
      </div>
      {showMsg && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <textarea className="form-control" name="textarea" onChange={handleMsgChange} rows={3}></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn-dark" onClick={onMsgSent}>
                  Sent
                </button>
                <button className="btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SellerProfile;
