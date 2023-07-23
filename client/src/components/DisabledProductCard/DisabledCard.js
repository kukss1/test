import { useState } from "react";
import { RiDeviceRecoverFill } from "react-icons/ri";
import { activateSell } from "../../services/productData";

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
          <p className="card-text">{params.price}€</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            {params.addedAt} - {params.city}
            <span id="enableIcon" onClick={handleShow}>
              <RiDeviceRecoverFill />
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
                  Are you sure you want to make this item active?
                </h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                By clicking <strong>Make Active</strong>, this sell will change
                its status to <strong>Active</strong>, which means that everyone
                on this website will see it.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Make Active
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
