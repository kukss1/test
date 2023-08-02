import { useState } from "react";
import { RiDeviceRecoverFill } from "react-icons/ri";
import { activateSell } from "../../services/productData";
import './DisabledCard.css'
function DisabledCard({ params, history }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    activateSell(params._id)
      .then((res) => {
        history.push(`/categories/${params.category}/${params._id}/details`);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="disabled-card">
      <div className="card">
        <img className="card-img-top" src={params.image} alt="Card" />
        <div className="card-body">
          <h5 className="card-title">{params.title}</h5>
          <p className="card-text">{params.price}֏</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            {params.addedAt} - {params.city}
            <span id="enableIcon" onClick={handleShow}>
            <h2 className="text-muted-body">Փոխել կարգավիճակը <RiDeviceRecoverFill /></h2>
              
            </span>
          </small>
        </div>
      </div>

      {show && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Վստա՞հ եք որ ուզում եք ակտիվացնել հայտարարությունը
                </h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Սեղմելով <strong>Ակտիվ</strong>, հայտարարության կարգավիճակը կփոխվի <strong>Ակտիվ</strong>, այն կկարողանան տեսնել բոլոր օգտատերերը
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Փակել
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Ակտիվացնել
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisabledCard;
